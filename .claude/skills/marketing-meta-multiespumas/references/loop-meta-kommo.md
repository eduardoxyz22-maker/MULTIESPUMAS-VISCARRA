# El circuito cerrado: Meta → Kommo → venta en Bs

Meta te dice lo que **cuesta una conversación**. Kommo te dice lo que **vale**. Ninguna de las
dos, sola, sirve para decidir presupuesto. Este archivo es el puente.

## Los cinco pasos del circuito

```
Inversión (Bs)  →  Conversación WhatsApp  →  Lead en Kommo  →  1ª respuesta  →  Visita  →  COMPRO
     Meta              Meta                    panel/Kommo       panel           —          panel
```

En cada flecha se pierde gente. El trabajo es saber **en cuál flecha** se está perdiendo más,
porque ahí está el dinero.

## De dónde sale cada dato

**Lado Meta** — conector, cuenta `3475940726049285`:

```
ads_get_ad_entities(level="campaign", date_preset="this_month",
  fields=["name","status","amount_spent","impressions","ctr","cpm",
          "results","cost_per_result","reach","frequency"])
```

**Lado ventas** — el panel ya trae todo calculado. No vuelvas a llamar a Kommo:

```bash
python3 - <<'PY'
import re, json
html = open('index.html', encoding='utf-8').read()
d = json.loads(re.search(r'window\.PANEL_DATA\s*=\s*(\{.*?\});\s*\n', html, re.S).group(1))
fb = next(c for c in d['channels'] if 'Facebook' in c['name'])
print(d['month'], d['year'], '| actualizado', d['updated'], '| día', d['curDay'])
print('Global :', d['global'])
print('FB Ads :', {k: fb[k] for k in ('leads','cierres','conv','ticket','pipeline')})
print('Backlog:', d['metrics']['backlog'], 'fichas +72h ·',
      d['metrics']['criticos7d'], '+7d · 1ª resp', d['metrics']['promPrimera'])
PY
```

Claves útiles de `PANEL_DATA`: `global`, `channels` (con `byV` por vendedor), `metrics`
(backlog, tiempos de respuesta, leads dentro/fuera de horario), `history` (meses anteriores),
`productos`, `funnel2`, `wsp` (el resumen ya redactado para WhatsApp).

## Las fórmulas

```
Costo por conversación   = inversión / conversaciones iniciadas        → lo que reporta Meta
Tasa de registro         = leads Kommo "Facebook Ads" / conversaciones → cuánto llega al CRM
Costo por lead en CRM    = inversión / leads Kommo de Facebook Ads
Conversión del canal     = cierres / leads del canal (cohorte del mes)
CAC por venta            = inversión / cierres atribuibles a Facebook Ads
Ingreso atribuible       = cierres × ticket del canal
ROAS                     = ingreso atribuible / inversión
```

⚠️ **El panel cuenta la conversión por cohorte**: los cierres de un canal son solo los de leads
entrados **ese mismo mes**. Los cierres de meses anteriores van aparte, en el canal
"Cerrados de meses anteriores". Para un colchón, que se compara y se piensa, eso **subestima**
el retorno real. Cuando midas ROAS de verdad, sumá el carry: en septiembre fueron 26 cierres
extra, 17 de ellos de Facebook Ads.

## Números de arranque (20/09/2026 — envejecen, recalculá)

| Métrica | Valor | Lectura |
|---|---|---|
| Inversión (1–20 sep) | Bs 2.237,83 | Bs ~112/día entre dos campañas |
| Conversaciones | 2.084 | Bs 1,07 c/u |
| Leads en Kommo (FB Ads) | 1.675 | **tasa de registro 80%** — se pierde 1 de cada 5 |
| Conversión lead → venta | 2% | contra 5,8% del negocio completo |
| Cierres | 39 | de una cohorte de 1.675 |
| Ingreso atribuible | Bs 42.410 | ticket Bs 1.087 |
| **CAC** | **Bs 57** | contra un ticket de Bs 1.087 |
| **ROAS** | **≈19x** | sin contar el carry de meses anteriores |

Comparación de canales del mismo mes, que es donde está la historia:

| Canal | Leads | Cierres | Conversión |
|---|---|---|---|
| Facebook Ads | 1.675 | 39 | **2%** |
| Walk-in (tienda) | 21 | 21 | **100%** |
| TikTok | 9 | 9 | **100%** |
| Referido | 6 | 5 | 83% |

TikTok y Walk-in cierran al 100% porque son pocos leads cargados a mano por gente que ya vino o
ya decidió. **No son comparables con Facebook Ads** y no significan "TikTok convierte mejor".
Lo que sí dicen: **el que pisa la tienda, compra**. Por eso vale la pena una línea de campaña
que empuje visita, no solo conversación.

## El cuello de botella real

Con Bs 1 por conversación, Meta no es el problema. El problema está en la flecha siguiente:

- **1.239 fichas (72%) sin tocar hace más de 72 h.** 882 llevan más de 7 días. 89 nunca se
  tocaron.
- **1ª respuesta: 37 min** promedio. Por sucursal: Mutualista 31 min, Carmelo Ortiz 53 min,
  **Calle Charcas 9,3 h**.
- **1.009 leads (59%) entran fuera del horario de atención.**
- El 98% de los leads entra por bot y cierra al **3%**; el 2% cargado a mano cierra al **100%**.

Cuentas rápidas que hay que poner sobre la mesa:

> Rescatar 100 fichas del backlog y cerrarlas al 2% = **2 ventas ≈ Bs 2.174**.
> Con esa misma plata de pauta (Bs 2.238) se compran ~2.000 conversaciones más
> que, al ritmo actual de seguimiento, terminan también en el backlog.
>
> Bajar la 1ª respuesta de Calle Charcas de 9,3 h a menos de 15 min vale más que
> duplicar el presupuesto.

## La palanca que Meta ya está pidiendo

La recomendación #1 del Opportunity Score de esta cuenta es **compartir eventos de compra de
WhatsApp** (estimado por Meta: −24% de costo por compra). Hoy Meta optimiza hacia *quien
escribe*; con el evento de compra conectado optimiza hacia *quien compra*. Es exactamente la
diferencia entre el 2% y el 5,8%. Y **no cuesta presupuesto adicional**: es configuración.

Segunda palanca, del mismo tablero: una **campaña de mensajes dedicada** (−7% de costo por
conversación) y las **mejoras creativas Advantage+** (−3% de costo por resultado, 6 puntos de
score).

## Antes de recomendar subir presupuesto — checklist

1. ¿El backlog +72 h bajó de 1.239? Si no, **no subas**.
2. ¿La 1ª respuesta de las tres sucursales está bajo 30 min?
3. ¿Hay respuesta automática cubriendo las horas fuera de horario (59% de los leads)?
4. ¿La frecuencia de 30 días está bajo 3,5?
5. ¿Hay creativos nuevos listos, o se va a poner más plata sobre el mismo anuncio cansado?

Si las cinco dan bien, escalá **+20–30% semanal**, nunca de un salto.
