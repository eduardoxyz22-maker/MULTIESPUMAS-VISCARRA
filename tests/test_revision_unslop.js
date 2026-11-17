/* 🔎 LA REVISIÓN DEL 17/11 (unslop, solo los arreglos que pidió el dueño: «Ok hazlo»).

   Arma la página con panel_template.html + los datos que ya trae index.html (mismo
   formato que escribe generar.py) y mira, en la página dibujada:
     1. Datos → «Ventana por sucursal» dice los horarios de SUEÑA (no Mia Plaza / Central / Bs Aires).
     2. «La oportunidad #1» solo aparece si lo dormido vale al menos Bs 1.000.
     3. El hallazgo ya no dice «el canal manual rinde N× más».
     4. Presentación: «Pipeline total» = el pipeline (no lo cerrado otra vez).
     6. Análisis IA: sin el texto técnico «generar.py lo hornea».
     7. Resumen: la conversión no se repite en la ficha de la derecha.
     8. Miles con punto (Bs 58.805), como en Bolivia.
     9. «Leads por etapa» con las etapas de este embudo, no las de Heaven.
   Se corre:  node tests/test_revision_unslop.js   (desde la raíz del repo) */
const fs = require("fs"), path = require("path"), os = require("os");
const { chromium } = require("playwright");
const raiz = path.join(__dirname, "..");
const tpl = fs.readFileSync(path.join(raiz, "panel_template.html"), "utf8");
const idx = fs.readFileSync(path.join(raiz, "index.html"), "utf8");
const m = idx.match(/window\.PANEL_DATA\s*=\s*(\{[\s\S]*?\});\n/);
if (!m) throw new Error("index.html sin PANEL_DATA");
const BASE = JSON.parse(m[1]);

let bien = 0, mal = 0;
const ok = (c, t, extra) => { if (c) { bien++; console.log("✓ " + t); } else { mal++; console.log("✗ " + t + (extra ? " · " + extra : "")); } };

function armar(D) {
  const f = path.join(os.tmpdir(), "rev_unslop_" + Math.random().toString(36).slice(2) + ".html");
  fs.writeFileSync(f, tpl.replace("__PANEL_DATA__", "window.PANEL_DATA = " + JSON.stringify(D) + ";"));
  return f;
}
async function abrir(b, D) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  p._errs = [];
  p.on("pageerror", e => p._errs.push(e.message));
  await p.route(/^https:\/\/(?!fonts|cdnjs|cdn\.jsdelivr|unpkg)/, r => r.abort());
  await p.goto("file://" + armar(D));
  await p.waitForTimeout(1200);
  return p;
}
const ir = async (p, tab) => { await p.locator("button").filter({ hasText: new RegExp("^" + tab) }).first().click(); await p.waitForTimeout(500); };
const texto = p => p.evaluate(() => document.body.innerText);

(async () => {
  const b = await chromium.launch();
  try {
    // Pocos «no responden»: la banda no sale
    const D1 = JSON.parse(JSON.stringify(BASE));
    D1.metrics.noResp = 1;
    let p = await abrir(b, D1);
    let t = await texto(p);
    ok(!/oportunidad #1/i.test(t), "2 · con poco dormido, sin «La oportunidad #1»");
    ok(!/rinde\s*\d+\s*×/.test(t) && !/rinde \d+× más/.test(t), "3 · sin «el canal manual rinde N× más»");
    ok(/Dónde está el margen/.test(t), "3 · el hallazgo dice dónde está el margen");
    const der = await p.locator(".rhero-stats .diag2-l").allInnerTexts();
    ok(!der.some(x => /Conversi/i.test(x)) && der.some(x => /Cerrado en el mes/.test(x)), "7 · la ficha de la derecha muestra lo cerrado, no repite la conversión", der.join(" | "));
    const fm = await p.evaluate(() => window.fmtMoney(58805));
    ok(fm === "Bs 58.805", "8 · miles con punto: " + fm);
    ok(!/Bs \d{1,3},\d{3}/.test(t), "8 · ningún monto con coma de miles en Resumen");

    await ir(p, "Datos");
    t = await texto(p);
    ok(/Ventana por sucursal: Av\. Mutualista y Calle Charcas/.test(t) && /Av\. Carmelo Ortiz lun/.test(t), "1 · Datos dice los horarios de Sueña");
    ok(!/Mia Plaza|Bs Aires/.test(t), "1 · sin Mia Plaza ni Bs Aires en Datos");

    await ir(p, "Análisis IA");
    t = await texto(p);
    ok(!/lo hornea|generar\.py/.test(t), "6 · Análisis IA sin el texto técnico");

    await ir(p, "Presentación");
    const pipe = await p.evaluate(() => {
      const l = [...document.querySelectorAll(".pstat")].find(x => /Pipeline total/i.test(x.innerText));
      return l ? l.querySelector(".pstat-v").innerText : null;
    });
    const pipeEsp = window_fmt(BASE.team.reduce((a, v) => a + (v.pipeline || 0), 0));
    ok(pipe === pipeEsp, "4 · Presentación: Pipeline total = el pipeline (" + pipe + ")", "esperaba " + pipeEsp);
    const etapas = await p.locator("table.pres-matrix tbody td.rowhead").allInnerTexts();
    const esperadas = (BASE.stagesGlobal || []).map(s => s.name);
    ok(esperadas.length > 0 && esperadas.every(n => etapas.some(e => e.includes(n))), "9 · Leads por etapa con las etapas del embudo", etapas.slice(0, 6).join(" | "));
    ok(p._errs.length === 0, "sin errores de la página", p._errs.join(" | "));
    await p.close();

    // Mucho dormido: la banda sí sale
    const D2 = JSON.parse(JSON.stringify(BASE));
    D2.metrics.noResp = 200;
    p = await abrir(b, D2);
    t = await texto(p);
    ok(/oportunidad #1/i.test(t), "2 · con mucho dormido, la banda sigue apareciendo");
    await p.close();
  } finally { await b.close(); }
  console.log("\n" + bien + " bien · " + mal + " mal");
  process.exit(mal ? 1 : 0);
})();
function window_fmt(n) { return "Bs " + Math.round(n).toLocaleString("de-DE"); }
