# MULTIESPUMAS VISCARRA — Dashboard de Ventas

Panel automático del pipeline de ventas de **MultiEspumas · Viscarra**, publicado en
GitHub Pages y actualizado desde **Kommo CRM** (cuenta `gerenciamultiespumasviscarra`).

Es un clon del panel de Heaven Colchones, adaptado a **otra cuenta de Kommo** y a
**otro embudo**. Misma mecánica: `generar.py` jala datos en vivo e inyecta
`window.PANEL_DATA` en `panel_template.html`.

## Arquitectura

- **`generar.py`** (stdlib pura): llama a la API de Kommo, calcula KPIs (conversión por
  cohorte, canales, ranking por vendedor, pipeline en Bs) y escribe `index.html`,
  `panel.html` y `panel_YYYY_MM.html`.
- **`panel_template.html`**: template React (JSX precompilado a `React.createElement`).
- **`.github/workflows/panel.yml`**: crons 14:00 y 21:00 UTC (10:00/17:00 Bolivia) +
  botón manual. El bot `viscarra-bot` commitea el HTML regenerado.

## Cuenta / credenciales Kommo

- Subdominio: **`gerenciamultiespumasviscarra`** (cuenta id 34486243)
- Pipeline objetivo: **`10989127`** ("Embudo de ventas", `is_main`)
- Token: **long-lived** de una integración privada. En CI vive como secret
  **`KOMMO_TOKEN_VISCARRA`** (NO en el código). Expira ~2027-12 (exp del JWT).
- Local: `generar.py` también lee el token del archivo **`.kommo_token`** (gitignored).

## Etapas del pipeline (10989127)

`Incoming leads` → `Nuevo Mensaje` → `Cotizacion enviada (Seguimiento)` → `Visita`
→ **`COMPRO`** (venta ganada) · `No responde - CANCELADO` · `Pedido cancelado – perdido`

- La etapa ganada es **"COMPRO"** (no "Compradores"). El clasificador incluye `"compro"`
  en la regla `compradores` — sin eso, el panel mostraría 0 ventas.
- No hay campo "Fecha contrato" → las ventas se cuentan por **etapa actual COMPRO** del
  mes (fallback del generador).

## Campos clave (por-lead)

- **Canal** (id 805818, select): TikTok, Meta, Instagram, Facebook, Referido, Recompra,
  CALLE/TRANSEUNTE. Se fuerza este id como `source_field` (evita que `utm_*` lo pise).
- **Sucursal** (id 641860, select): Calle Charcas, Av. Carmelo Ortiz, Av. Mutualista.
  A diferencia de Heaven, la sucursal es **por lead** (no se deduce del vendedor).
- **Valor Venta** (id 802671, numeric) y **Productos Vendido** (id 802669) existen, pero
  el monto principal sale del campo estándar `price` del lead.

## Vendedores (equipo activo)

Fernando Peinado Charcas, Mauricio Merida (15141820), Alberto Pareja.
Definidos en `VENDOR_CFG` de `generar.py`. **Las metas (metaCierres/metaMonto) son
PLACEHOLDER** — reemplazar con las metas mensuales reales de gerencia.

## Moneda

**Bs (Boliviano).** `PANEL_CURRENCY=Bs`. El template ya rotula "Bs". Si la cuenta cambia
de moneda, ajustar `PANEL_CURRENCY` (y las etiquetas estáticas del template).

## Para actualizar manualmente

GitHub → Actions → **Generar Panel Viscarra** → **Run workflow** (month/year vacíos = mes
en curso). El botón "Actualizar" del dashboard solo recarga la página.

## Reglas de oro / gotchas

- En **Windows** correr con `PYTHONUTF8=1` (la consola cp1252 no imprime los emojis del
  script). En CI (Linux) no hace falta, pero el workflow lo pone igual.
- NO pushear a `main` mientras el workflow corre (el push del bot puede fallar).
- Validar `generar.py` con `python -m py_compile` antes de pushear.
- El token es como la contraseña del CRM: nunca commitear `.kommo_token`.
