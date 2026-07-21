#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
introspect_viscarra.py  ·  Lectura SOLO-LECTURA de la cuenta Kommo nueva
========================================================================
Muestra la estructura real del pipeline objetivo para adaptar el generador
con precisión (etapas, vendedores, campos de monto/canal/fecha-contrato).

- NO escribe nada en Kommo (solo GET).
- NO imprime el token.
- NO vuelca datos personales de clientes (nombres/telefonos). Solo estructura
  y conteos agregados.

El token se lee de la variable de entorno KOMMO_TOKEN_VISCARRA.
Salida: JSON legible por stdout + copia en 'viscarra_introspect.json'.
"""
import os, sys, json, time, calendar, datetime
from collections import Counter
from urllib import request as _rq, parse as _ps, error as _er

SUBDOMAIN       = (os.environ.get("KOMMO_SUBDOMAIN_VISCARRA") or "gerenciamultiespumasviscarra").strip()
TOKEN           = (os.environ.get("KOMMO_TOKEN_VISCARRA") or "").strip()
TARGET_PIPELINE = int(os.environ.get("KOMMO_PIPELINE_VISCARRA") or "10989127")
TARGET_USER     = (os.environ.get("KOMMO_MAIN_USER_VISCARRA") or "15141820").strip()
BASE            = f"https://{SUBDOMAIN}.kommo.com/api/v4"

# Fallback: archivo local '.kommo_token' (gitignored) junto al script, por si el
# token JWT es demasiado largo para setx (limite ~1024 chars).
if not TOKEN:
    _tf = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".kommo_token")
    if os.path.exists(_tf):
        try:
            TOKEN = open(_tf, encoding="utf-8").read().strip()
        except Exception:
            pass

if not TOKEN:
    sys.exit("X Falta el token: pon KOMMO_TOKEN_VISCARRA con setx, o crea el archivo "
             "'.kommo_token' con el token dentro, junto a este script.")

def api_get(path, params=None, _retry=0):
    url = BASE + path + ("?" + _ps.urlencode(params) if params else "")
    req = _rq.Request(url, headers={"Authorization": "Bearer " + TOKEN,
                                    "Content-Type": "application/json"})
    try:
        with _rq.urlopen(req, timeout=40) as r:
            if r.status == 204:
                return {}
            return json.loads(r.read().decode("utf-8"))
    except _er.HTTPError as e:
        if e.code == 429 and _retry < 4:
            time.sleep(2 ** _retry * 3)
            return api_get(path, params, _retry + 1)
        body = ""
        try:
            body = e.read().decode("utf-8")[:400]
        except Exception:
            pass
        print(f"HTTP {e.code} en {path}: {body}", file=sys.stderr)
        if e.code in (401, 403):
            sys.exit("X Token invalido o sin permisos (401/403). Revisa el token de larga duracion.")
        raise
    except Exception as e:
        if _retry < 2:
            time.sleep(2); return api_get(path, params, _retry + 1)
        raise

def paginated(path, params, key, max_pages=8):
    out, page = [], 1
    while page <= max_pages:
        p = dict(params); p["page"] = page; p.setdefault("limit", 250)
        data = api_get(path, p)
        batch = (data.get("_embedded", {}) or {}).get(key, [])
        if not batch:
            break
        out.extend(batch)
        if "next" not in (data.get("_links", {}) or {}):
            break
        page += 1; time.sleep(0.15)
    return out

def enum_values(c):
    out = []
    for e in (c.get("enums") or []):
        out.append(e.get("value") if isinstance(e, dict) else e)
    return out[:25]

report = {"subdomain": SUBDOMAIN, "target_pipeline_id": TARGET_PIPELINE, "target_user_id": TARGET_USER}

# 1) Cuenta (self-test del token) ------------------------------------------------
acct = api_get("/account")
report["account"] = {"id": acct.get("id"), "name": acct.get("name"),
                     "subdomain": acct.get("subdomain"), "country": acct.get("country"),
                     "currency": acct.get("currency")}

# 2) Pipelines + etapas del pipeline objetivo -----------------------------------
pls = paginated("/leads/pipelines", {}, "pipelines", max_pages=5)
report["pipelines"] = [{"id": p["id"], "name": p.get("name"), "is_main": p.get("is_main")} for p in pls]
target = next((p for p in pls if p["id"] == TARGET_PIPELINE), None)
if target:
    sts = (target.get("_embedded", {}) or {}).get("statuses", [])
    report["target_pipeline"] = {
        "id": target["id"], "name": target.get("name"),
        "statuses": [{"id": s["id"], "name": s.get("name"), "type": s.get("type"),
                      "sort": s.get("sort"), "color": s.get("color")} for s in sts],
    }
    status_names = {s["id"]: s.get("name") for s in sts}
else:
    report["target_pipeline"] = None
    status_names = {}
    print(f"! ADVERTENCIA: el pipeline {TARGET_PIPELINE} no aparece en la lista.", file=sys.stderr)

# 3) Usuarios --------------------------------------------------------------------
users = paginated("/users", {}, "users", max_pages=5)
user_names = {u["id"]: u.get("name") for u in users}
report["users"] = [{"id": u["id"], "name": u.get("name")} for u in users]

# 4) Campos personalizados de leads ---------------------------------------------
cfs = paginated("/leads/custom_fields", {}, "custom_fields", max_pages=8)
report["lead_custom_fields"] = [{"id": c["id"], "name": c.get("name"), "code": c.get("code"),
                                 "type": c.get("type"), "enums": enum_values(c)} for c in cfs]

# 5) Muestra de leads del mes en curso en el pipeline objetivo (solo estructura) -
now = datetime.datetime.utcnow() - datetime.timedelta(hours=4)   # hora Bolivia
YEAR, MONTH = now.year, now.month
DIM = calendar.monthrange(YEAR, MONTH)[1]
m_start = datetime.datetime(YEAR, MONTH, 1)
m_end   = datetime.datetime(YEAR, MONTH, DIM, 23, 59, 59)
leads = paginated("/leads", {
    "filter[pipeline_id]": TARGET_PIPELINE,
    "filter[created_at][from]": int(m_start.timestamp()),
    "filter[created_at][to]":   int(m_end.timestamp())}, "leads", max_pages=8)

by_status, by_user, cf_fill = Counter(), Counter(), Counter()
price_pos = 0; price_sum = 0.0
for ld in leads:
    by_status[ld.get("status_id")] += 1
    by_user[ld.get("responsible_user_id")] += 1
    pr = ld.get("price") or 0
    if pr > 0:
        price_pos += 1; price_sum += pr
    for f in (ld.get("custom_fields_values") or []):
        cf_fill[f.get("field_name") or f.get("field_id")] += 1

report["month_sample"] = {
    "month": f"{YEAR}-{MONTH:02d}",
    "lead_count": len(leads),
    "leads_with_price": price_pos,
    "price_sum": round(price_sum, 2),
    "by_status": [{"status_id": k, "name": status_names.get(k), "count": v} for k, v in by_status.most_common()],
    "by_user":   [{"user_id": k, "name": user_names.get(k), "count": v} for k, v in by_user.most_common()],
    "custom_field_fill": [{"field": k, "count": v} for k, v in cf_fill.most_common(30)],
}

# ¿aparece el TARGET_USER en la muestra?
try:
    tu = int(TARGET_USER)
    report["target_user_present"] = {"id": tu, "name": user_names.get(tu),
                                     "leads_this_month": by_user.get(tu, 0)}
except Exception:
    report["target_user_present"] = None

out = json.dumps(report, ensure_ascii=False, indent=2)
print(out)
try:
    with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "viscarra_introspect.json"),
              "w", encoding="utf-8") as fh:
        fh.write(out)
except Exception:
    pass
