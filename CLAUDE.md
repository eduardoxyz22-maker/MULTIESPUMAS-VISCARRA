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

- **Fernando Peinado Charcas** (id 13129427) → Calle Charcas
- **Mauricio Merida** (id 15141820) → Av. Mutualista
- **Juan Pablo** (id **13073611**) → Av. Carmelo Ortiz

Definidos en `VENDOR_CFG` de `generar.py` (color, iniciales, metas reales de MONTO:
`metaMin` mínima y `metaMonto` objetivo, en Bs).

⚠️ **Juan Pablo = user id 13073611.** El NOMBRE de esa cuenta en Kommo es editable y ya
lo cambiaron varias veces (`Alberto Pareja` → `FERNANDO` → `JUAN PABLO`), lo que rompía
su nombre/metas/color en el panel y hacía aparecer **"dos Fernando"**. Por eso el rename
es **por ID** (`USER_RENAME_ID = {13073611: "Juan Pablo"}`, prioritario sobre el de
por-nombre `USER_RENAME`). No lo cambies a por-nombre: aunque en Kommo le pongan
cualquier cosa, el panel debe seguir mostrando "Juan Pablo".

## Moneda

**Bs (Boliviano).** `PANEL_CURRENCY=Bs`. El template ya rotula "Bs". Si la cuenta cambia
de moneda, ajustar `PANEL_CURRENCY` (y las etiquetas estáticas del template).

## Para actualizar manualmente

GitHub → Actions → **Generar Panel Viscarra** → **Run workflow** (month/year vacíos = mes
en curso). El botón "Actualizar" del dashboard solo recarga la página.

## 🎃 Tema de Halloween (03/10/2026, pedido del dueño)

Clase `tema-halloween` en `<html>` SOLO en octubre con la fecha de Bolivia (script de una línea al final del `<head>` de
`panel_template.html`); se apaga sola el 1/11 y vuelve cada octubre. Solo CSS: la caja de la marca de noche (MULTI en
blanco, 🎃, telaraña) y el ítem elegido del menú en morado. Es el mismo bloque que el panel de Heaven (repo MULTIESPUMAS,
bitácora §4hm), con los ajustes para la marca en TEXTO. `tests/test_halloween.js`.
**Risa de bruja** (03/10, mismo pedido): `halloween-risa.mp3` = el archivo que mandó el dueño, ENTERO y tal cual (9,6 s, tres
risas, 230 KB, en la raíz del repo; dueño: «mejor no la recortes, que suene entera»). Suena con el PRIMER toque, clic o tecla
después de abrir la página (los navegadores no dejan sonar al abrir), una vez por apertura y sin tope por día. Solo con el tema
prendido. Es el mismo bloque que en el repo MULTIESPUMAS (bitácora §4hm). 🚫 No recortar el MP3 por cuadros desde el medio: el
recorte que se publicó primero sonaba en la compu y en el iPad NO (Safari rechaza un cuadro que depende de los anteriores).
⚠️ Si se cambia el archivo, subir el `?v=` de `hwRisaArchivo` en `panel_template.html` (hoy `?v=2`).

## 🎄 Tema de Navidad (27/10/2026, el mismo pedido que el panel de Heaven: «arranca»)

Clase `tema-navidad` en `<html>` SOLO en diciembre con la fecha de Bolivia (el mismo script de Halloween, al final del `<head>` de
`panel_template.html`); se apaga sola el 1/1 y vuelve cada diciembre. Solo CSS: la caja de la marca de pino con una guirnalda de luces
que titilan, el 🎄 y el ítem elegido del menú en verde. Es el mismo bloque que el dashboard de Heaven (repo MULTIESPUMAS, bitácora §4nc),
con los ajustes de la marca en TEXTO (MULTI en blanco, el 🎄 a la derecha), como Halloween. Sin sonido. `tests/test_navidad.js`.

## Reglas de oro / gotchas

- En **Windows** correr con `PYTHONUTF8=1` (la consola cp1252 no imprime los emojis del
  script). En CI (Linux) no hace falta, pero el workflow lo pone igual.
- NO pushear a `main` mientras el workflow corre (el push del bot puede fallar).
- Validar `generar.py` con `python -m py_compile` antes de pushear, y correr los tests:
  `python3 tests/test_duplicados.py` (detector de duplicados) y `node tests/test_paneldup.js`
  (la tabla como se ve en el panel). Todo test nuevo va en `tests/` y se commitea con el cambio.
- El token es como la contraseña del CRM: nunca commitear `.kommo_token`.

## 🔎 Revisión del 17/11/2026 (con unslop, solo lo que el dueño aprobó: «Ok hazlo»)

- Datos → «Ventana por sucursal» y el contexto del análisis IA (página y `generar.py`) dicen las sucursales y horarios de **Sueña**
  (Av. Mutualista y Calle Charcas = `SCHED_MF`, Av. Carmelo Ortiz = `SCHED_JP`); venían copiados de Heaven (Mia Plaza / Central / Bs Aires).
  Los colores por sucursal también van con los nombres de Sueña. ⚠️ Un texto que nombre sucursales sale de las de este repo, nunca de Heaven.
- «La oportunidad #1» (banda roja de «No responden») solo aparece con **Bs 1.000** o más de potencial.
- El hallazgo «el canal manual rinde N× más» se fue: el canal «manual» es Walk-in (gente que ya vino a comprar). Ahora dice dónde está el margen
  (el canal de anuncios) y cuántas ventas da un punto más de conversión.
- Presentación: «Cerrado en el mes» = `v.value` (exacto) y «Pipeline total» = `v.pipeline` (antes era lo cerrado otra vez); el mes anterior no
  guarda pipeline, así que esa ficha va sin comparación (`prev:false` en `PStat`).
- Resumen: la ficha de la derecha muestra «Cerrado en el mes» en vez de repetir la conversión, y el renglón de arriba ya no repite el pipeline.
- Análisis IA sin el texto técnico («generar.py lo hornea»). La IA horneada no corre en el workflow.
- **Miles con punto** (`toLocaleString("de-DE")`, «Bs 58.805»), como el panel de pedidos y el resumen de WhatsApp. Los decimales siguen con punto.
- «Leads por etapa» usa las etapas de este embudo (`D.stagesGlobal`); antes eran las de Heaven y salía todo en 0. «Visitas» se esconde si está en 0 los dos meses.
- El chip con la dirección de Kommo arriba se esconde hasta 1680 px (cortaba el título «Resumen ejecutivo — Noviembre 2…»).
- Pendiente con el dueño: si «Cotización enviada (Seguimiento)» cuenta como «sin seguimiento» (hoy 1250 en rojo).
- `tests/test_revision_unslop.js` (13; 11 rojas contra lo de antes).
