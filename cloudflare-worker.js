/* ============================================================================
 * MULTIESPUMAS · SUEÑA — Puente del Panel  (Cloudflare Worker)
 *
 * Le da vida a dos botones del panel público, sin exponer ningún token:
 *   1) "Actualizar"  →  action "refresh" / "refresh_status":
 *        dispara el GitHub Action (panel.yml) que RE-JALA datos de Kommo y
 *        republica el panel; el botón espera a que termine y recarga (~2-3 min).
 *   2) Seguimiento ✓ / 🕐  →  action "done" / "snooze" (opcional):
 *        crea una TAREA en Kommo asignada al responsable del lead.
 *
 * ── Secretos/Variables a configurar en el Worker (Settings → Variables and Secrets):
 *      GITHUB_TOKEN     (Secret)          = PAT fino con permiso "Actions: Read and write"
 *                                            SOLO sobre el repo MULTIESPUMAS-VISCARRA
 *      KOMMO_TOKEN      (Secret, opcional)= token largo de Kommo (para ✓ / 🕐)
 *      KOMMO_SUBDOMAIN  (Text,  opcional) = gerenciamultiespumasviscarra
 *      GH_OWNER / GH_REPO / GH_WORKFLOW / GH_REF (Text, opcionales — defaults abajo)
 * ========================================================================== */
const ALLOWED_ORIGIN = "https://eduardoxyz22-maker.github.io";

export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
      "Vary": "Origin",
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method === "GET") return json({ ok: true, service: "suena-panel-bridge", up: true }, 200, cors);
    if (request.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405, cors);

    const origin = request.headers.get("Origin") || "";
    if (origin && origin !== ALLOWED_ORIGIN) return json({ ok: false, error: "forbidden_origin" }, 403, cors);

    let body;
    try { body = await request.json(); } catch { return json({ ok: false, error: "bad_json" }, 400, cors); }
    const action = body.action;

    const OWNER = (env.GH_OWNER || "eduardoxyz22-maker").trim();
    const REPO  = (env.GH_REPO  || "MULTIESPUMAS-VISCARRA").trim();
    const WF    = (env.GH_WORKFLOW || "panel.yml").trim();
    const REF   = (env.GH_REF || "main").trim();
    const gh = {
      "Authorization": `Bearer ${env.GITHUB_TOKEN}`,
      "Accept": "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "suena-panel-bridge",
      "Content-Type": "application/json",
    };
    const runsUrl = `https://api.github.com/repos/${OWNER}/${REPO}/actions/workflows/${WF}/runs?per_page=1`;

    // ── Botón "Actualizar" → disparar el workflow ──
    if (action === "refresh") {
      if (!env.GITHUB_TOKEN) return json({ ok: false, error: "missing_github_token" }, 500, cors);
      let since = null;
      try {
        const r0 = await fetch(runsUrl, { headers: gh });
        if (r0.ok) { const d0 = await r0.json(); since = (d0.workflow_runs && d0.workflow_runs[0] && d0.workflow_runs[0].created_at) || null; }
      } catch {}
      const disp = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/actions/workflows/${WF}/dispatches`,
        { method: "POST", headers: gh, body: JSON.stringify({ ref: REF }) });
      if (disp.status !== 204) {
        const t = await disp.text().catch(() => "");
        return json({ ok: false, error: "dispatch_failed", status: disp.status, detail: t.slice(0, 300) }, 502, cors);
      }
      return json({ ok: true, since }, 200, cors);
    }
    if (action === "refresh_status") {
      if (!env.GITHUB_TOKEN) return json({ ok: false, error: "missing_github_token" }, 500, cors);
      try {
        const r = await fetch(runsUrl, { headers: gh });
        const d = await r.json();
        const run = (d.workflow_runs && d.workflow_runs[0]) || {};
        return json({ created_at: run.created_at || null, status: run.status || null, conclusion: run.conclusion || null }, 200, cors);
      } catch (e) {
        return json({ error: "status_failed" }, 200, cors);
      }
    }

    // ── Seguimiento ✓ / 🕐 → crear tarea en Kommo (opcional) ──
    if (action === "done" || action === "snooze") {
      const token = env.KOMMO_TOKEN;
      const sub = (env.KOMMO_SUBDOMAIN || "gerenciamultiespumasviscarra").trim();
      if (!token) return json({ ok: false, error: "missing_kommo_token" }, 500, cors);
      const leadId = parseInt(body.leadId, 10);
      const days = Math.min(30, Math.max(1, parseInt(body.days || (action === "snooze" ? 3 : 1), 10)));
      if (!leadId) return json({ ok: false, error: "bad_params" }, 400, cors);
      const base = `https://${sub}.kommo.com/api/v4`;
      const kh = { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" };
      let uid = null;
      try { const r = await fetch(`${base}/leads/${leadId}`, { headers: kh }); if (r.ok) { const d = await r.json(); uid = d.responsible_user_id || null; } } catch {}
      const due = new Date(Date.now() + days * 86400000); due.setUTCHours(22, 0, 0, 0); // 18:00 Bolivia
      const text = action === "done"
        ? "✅ Seguimiento solicitado desde el panel — contactar al cliente hoy."
        : `🕐 Reprogramar seguimiento (+${days} días) — solicitado desde el panel.`;
      const task = [{ text, complete_till: Math.floor(due.getTime() / 1000), entity_id: leadId, entity_type: "leads", ...(uid ? { responsible_user_id: uid } : {}) }];
      try {
        const r = await fetch(`${base}/tasks`, { method: "POST", headers: kh, body: JSON.stringify(task) });
        const d = await r.json().catch(() => ({}));
        if (!r.ok) return json({ ok: false, error: "kommo_error", status: r.status, detail: d }, 502, cors);
        return json({ ok: true, taskId: (d && d._embedded && d._embedded.tasks && d._embedded.tasks[0] && d._embedded.tasks[0].id) || null, leadId, responsibleUserId: uid }, 200, cors);
      } catch (e) { return json({ ok: false, error: "fetch_failed", detail: String(e) }, 502, cors); }
    }

    return json({ ok: false, error: "unknown_action" }, 400, cors);
  },
};

function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json", ...cors } });
}
