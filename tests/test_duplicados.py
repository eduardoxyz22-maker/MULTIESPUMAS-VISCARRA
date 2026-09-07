#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
👯 EL DETECTOR DE DUPLICADOS TIENE QUE DECIR QUÉ Y CON QUIÉN.

Misma lección que la del aviso de duplicadas del panel de pedidos de Heaven: un
aviso que dice "hay dos fichas" y obliga a buscar a mano cuál es de quién es medio aviso.

Comprueba dos cosas sobre `build_panel_data`:

1. **Normalización de teléfonos** — que '+591 69118641', '69118641' y '691-18641' sean el
   MISMO cliente. Antes se comparaba el texto crudo y salían tres clientes distintos.
2. **Responsable ficha por ficha** — que `dupRows[].detalle` diga qué vendedora tiene cada
   ficha y en qué etapa, y que `tipo` separe los dos casos que NO son el mismo problema:
   un vendedor que se duplica a sí mismo (método de registro) de dos vendedores sobre el
   mismo cliente (disputa de cartera).

No toca la red: arma leads y contactos de mentira y llama a la función de verdad.

Se corre solo (no es Playwright, no entra en ./tests/correr.sh):
    python3 tests/test_duplicados.py
"""
import os, sys, time

os.environ.setdefault("KOMMO_TOKEN", "tok_de_mentira_1234567890")
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import generar

BIEN = MAL = 0
def ok(nombre, cond, detalle=""):
    global BIEN, MAL
    if cond:
        BIEN += 1; print(f"✓ {nombre}")
    else:
        MAL += 1; print(f"✗ {nombre}" + (f"\n    {detalle}" if detalle else ""))

# ── Kommo de mentira ─────────────────────────────────────────────────────────
COMPRO, VISITA, NORESP = 101, 102, 103
STAGE_MAP = {
    COMPRO: {"name": "COMPRO",           "cls": "compradores", "main": True},
    VISITA: {"name": "Visita",            "cls": "agendado",    "main": True},
    NORESP: {"name": "No responde - CANCELADO", "cls": "perdido", "main": True},
}
USER_MAP = {1: "Fernando Peinado Charcas", 2: "Mauricio Merida",
            3: "Alberto Pareja"}
AHORA = int(time.time())

def lead(lid, user_id, status_id, contact_id):
    return {"id": lid, "responsible_user_id": user_id, "status_id": status_id,
            "price": 1000, "created_at": AHORA - 3600, "updated_at": AHORA,
            "custom_fields_values": [],
            "_embedded": {"tags": [], "contacts": [{"id": contact_id}]}}

def correr(leads, contact_phone):
    return generar.build_panel_data(
        leads, [], STAGE_MAP, USER_MAP, {}, None, contact_phone=contact_phone,
        won=[], won_prev=[])

def fila(pd, tel):
    for r in pd["dupRows"]:
        if r["phoneNorm"] == tel:
            return r
    return None

# ── 1. El mismo número escrito de tres formas es UN cliente ──────────────────
print("\n── El mismo teléfono escrito distinto no son clientes distintos ──")
for crudo, esperado in [("+591 69118641", "69118641"), ("69118641", "69118641"),
                        ("691-18641", "69118641"), ("00591 69118641", "69118641"),
                        ("(591) 7040 7799", "70407799"), ("070407799", "70407799")]:
    got = generar.norm_phone(crudo)
    ok(f"«{crudo}» → {esperado}", got == esperado, f"salió {got!r}")

ok("un teléfono corto o basura no arma grupo", generar.norm_phone("123") is None
   and generar.norm_phone("") is None and generar.norm_phone("sin número") is None)

leads = [lead(9001, 2, VISITA, 501), lead(9002, 2, NORESP, 502)]
telefonos = {501: [("69118641", "+591 69118641")], 502: [("69118641", "691-18641")]}
pd = correr(leads, telefonos)
ok("dos fichas con el mismo número escrito distinto salen como UN duplicado",
   len(pd["dupRows"]) == 1 and pd["dupRows"][0]["fichas"] == 2,
   f"dupRows={pd['dupRows']}")
ok("y el panel muestra el teléfono como lo escribieron, no la clave pelada",
   pd["dupRows"][0]["phone"] == "+591 69118641", pd["dupRows"][0]["phone"])

# ── 2. Dice qué ficha es de quién ────────────────────────────────────────────
print("\n── Dice qué ficha es de quién ──")
leads = [
    # choque: Isabel y Mirian sobre el mismo cliente
    lead(9101, 1, VISITA, 601), lead(9102, 2, COMPRO, 602),
    # auto-duplicado: Maria Flores dos veces sobre el mismo cliente
    lead(9201, 3, COMPRO, 603), lead(9202, 3, COMPRO, 604),
]
telefonos = {601: [("70407799", "70407799")], 602: [("70407799", "+591 70407799")],
             603: [("77099803", "77099803")], 604: [("77099803", "77099803")]}
pd = correr(leads, telefonos)

choque = fila(pd, "70407799")
ok("el choque entre dos vendedores existe", choque is not None)
ok("y cada ficha dice su vendedor y su etapa",
   sorted((d["id"], d["vend"], d["etapa"]) for d in choque["detalle"]) ==
   [(9101, "Fernando Peinado Charcas", "Visita"), (9102, "Mauricio Merida", "COMPRO")],
   str(choque["detalle"]))
ok("el choque se marca como Choque", choque["tipo"] == "Choque", choque["tipo"])

auto = fila(pd, "77099803")
ok("el vendedor que se duplica a sí mismo se marca Auto-duplicado, no Choque",
   auto["tipo"] == "Auto-duplicado", auto["tipo"])
ok("y sus dos fichas son de él",
   [d["vend"] for d in auto["detalle"]] == ["Alberto Pareja", "Alberto Pareja"],
   str(auto["detalle"]))
ok("los choques van primero en la tabla", pd["dupRows"][0]["tipo"] == "Choque",
   str([r["tipo"] for r in pd["dupRows"]]))
ok("el resumen cuenta 1 choque y 1 auto-duplicado",
   pd["metrics"]["duplicadosChoques"] == 1 and pd["metrics"]["duplicadosAuto"] == 1,
   f"choques={pd['metrics']['duplicadosChoques']} auto={pd['metrics']['duplicadosAuto']}")
ok("sigue diciendo los vendedores juntos, para lo que ya lo usaba el panel",
   choque["vendedoras"] == "Fernando Peinado Charcas · Mauricio Merida", choque["vendedoras"])

# ── 3. Lo que NO tiene que marcar ────────────────────────────────────────────
print("\n── Falsos positivos ──")
pd = correr([lead(9301, 1, VISITA, 701), lead(9302, 2, VISITA, 702)],
            {701: [("70000001", "70000001")], 702: [("70000002", "70000002")]})
ok("dos clientes con teléfonos distintos no son duplicado", pd["dupRows"] == [],
   str(pd["dupRows"]))

pd = correr([lead(9401, 1, VISITA, 801)], {801: [("70000003", "70000003")]})
ok("una sola ficha no es duplicado", pd["dupRows"] == [], str(pd["dupRows"]))

pd = correr([lead(9501, 1, VISITA, 901), lead(9502, 2, VISITA, 902)], {})
ok("sin teléfonos leídos, la tabla queda vacía y no inventa", pd["dupRows"] == [],
   str(pd["dupRows"]))

# ── 4. Un lead con dos teléfonos no infla el conteo de fichas ────────────────
print("\n── El conteo de fichas cuenta fichas, no apariciones ──")
leads = [lead(9601, 1, VISITA, 1001), lead(9602, 2, COMPRO, 1002),
         lead(9603, 3, COMPRO, 1003)]
telefonos = {1001: [("70111111", "70111111"), ("70222222", "70222222")],
             1002: [("70111111", "70111111")],
             1003: [("70222222", "70222222")]}
pd = correr(leads, telefonos)
ok("un lead que cae en dos grupos se cuenta una sola vez",
   pd["metrics"]["duplicadosTel"] == 2 and pd["metrics"]["duplicadosFichas"] == 3,
   f"tel={pd['metrics']['duplicadosTel']} fichas={pd['metrics']['duplicadosFichas']}")

print(f"\n{BIEN} bien · {MAL} mal")
sys.exit(1 if MAL else 0)
