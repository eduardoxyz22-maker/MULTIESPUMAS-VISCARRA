# La cuenta de Meta — IDs, convenciones y trampas del conector

Verificado el 20/09/2026 contra la cuenta real. Leer antes de tocar nada.

## Identidad de la cuenta

| Qué | Valor |
|---|---|
| Cuenta publicitaria | **`3475940726049285`** — "MultiEspumas CP \| Blah" |
| Business | `301658315633376` — **MultiEspumas Viscarra SRL** |
| Moneda | **BOB (Bs)** · presupuesto mínimo diario Bs 12,50 |
| Estado | ACTIVE · consultable por MCP · con método de pago |
| Instagram vinculado | `17841460708484603` — **@colchonessuena_bo** |
| Vertical que Meta le asigna | Retail → **Home, Furniture and Office** |
| Opportunity Score | **87/100** (20/09/2026) |

**Cuentas que NO son esta** y aparecen en el mismo usuario — no confundirlas nunca:
`4086398341690339` Colchones Heaven BO (marca hermana, otra cuenta),
`1551786946119762` FERROMARC, `1082730624499580` AKME ESTUDIO,
`315846888` Eduardo Añez (**UNSETTLED**, no consultable),
y las cuatro cuentas dentales (Spadental, Cosmetic, Mirna marca personal).

## Convención de nombres de campaña

La cuenta ya usa un prefijo de etapa. Respetarlo al crear:

```
<ETAPA> | <canal o tema> | <marca> | <estructura> | <año>
```

- `EV |` = eventos / conversación (lo que vende). Ej.: `EV | Promociones v2 | ABO | Blah | 2026`
- `CV |` = conversión con promo puntual. Ej.: `CV | WhatsApp | Promo Agosto | Blah`
- `PRE |` = presencia / seguidores. **No es línea de venta.** Ej.: `PRE | Seguidores FB | Sueña | 2026`
- `ABO` / `CBO` = presupuesto por conjunto o por campaña.
- `Blah` es la agencia/operador histórico que quedó en los nombres.

Al crear algo nuevo, seguí el patrón. Un nombre suelto rompe el filtrado y el reporte.

## Estado de campañas (20/09/2026)

Solo **dos campañas activas**, ambas `OUTCOME_ENGAGEMENT` (mensajes):

| Campaña | Estado | Gasto sep (1–20) | CTR | CPM | Conversaciones | Costo/conv |
|---|---|---|---|---|---|---|
| `WhatsApp \| B2C \| 2025` | ACTIVE | Bs 1.373,18 | 5,39% | Bs 13,47 | 1.144 | Bs 1,20 |
| `EV \| Promociones v2 \| ABO \| Blah \| 2026` | ACTIVE | Bs 864,65 | 5,54% | Bs 11,50 | 940 | Bs 0,92 |

Acumulado 90 días: **Bs 10.760** de inversión, **8.374 conversaciones**, CPM promedio ≈ Bs 11.
La campaña `WhatsApp | B2C | 2025` lleva **frecuencia 3,66 en 90 días** — está cerca de saturar
su público. Eso se arregla con creativos nuevos, no con más plata.

## Qué SÍ puede el conector

- Leer todo: campañas, conjuntos, anuncios, insights, series por día (`time_increment: "1"`),
  desgloses (`breakdowns`), borradores (`object_state: "draft"`).
- `ads_get_opportunity_score` → puntaje y recomendaciones priorizadas con puntos de mejora.
- `ads_insights_advertiser_context` → cómo clasifica Meta el negocio y en qué etapa del embudo
  está el gasto (hoy: **embudo único, 70%+ en consideración**).
- `ads_insights_auction_ranking_benchmarks` → rankings de calidad, interacción y conversión.
- `ads_insights_industry_benchmark` → comparación contra anunciantes similares.
- `ads_get_errors` → lo que bloquea entrega.
- `ads_get_ad_preview` → vista previa real por ubicación. **Usar siempre para verificar.**
- `ads_library_search` → ver qué está pauteando la competencia.
- **Crear**: campañas, conjuntos (`ads_create_ad_set`), creativos, anuncios, públicos
  personalizados, catálogos y feeds de producto.
- **Modificar**: `ads_update_entity` (presupuesto, nombre, estado) · `ads_activate_entity`.
- `ads_account_get_activity_logs` → quién cambió qué y cuándo.

## Trampas verificadas

1. **`ads_update_entity` pausa el conjunto al editarlo.** Devuelve `status_forced_to_paused`.
   Reactivar con `ads_activate_entity` y **verificar con una lectura**. Si no se verifica, queda
   un conjunto apagado sin que nadie se entere.
2. **Los borradores no aparecen en consultas `live`.** Usar `object_state: "draft"` o preguntar.
   "No aparece" ≠ "no existe".
3. **`ads_get_ad_account_pages` solo lista páginas promocionadas.** Vacío ≠ desvinculada.
   Para la verdad: `ads_get_pages_for_business`.
4. **`ads_get_ad_images` devuelve solo hash y name** si no le pasás `hashes`.
5. **Las etiquetas de optimización son inconsistentes**: `REPLIES` y `CONVERSATIONS` son lo
   mismo. En la interfaz se llama "Maximizar el número de conversaciones con mensajes".
6. **La vista previa reporta campos vacíos que sí están.** Abrir la `preview_url` y mirarla.
7. **El objetivo de optimización de un conjunto ya creado no se cambia.** Se duplica.
8. **La campaña es el interruptor maestro**: pausada, no entrega nada aunque conjuntos y
   anuncios estén activos. Es buena red de seguridad al armar.

## Carteles de la interfaz que hay que rechazar

- **"Maximizar el número de clics en el enlace"** → es el default y el peor de los tres para
  CTWA. Trae gente que toca y no escribe.
- **THRUPLAY** en campañas con video → optimiza para que miren, no para que escriban.
- **"Cambiar a la configuración recomendada"** → deshace los controles duros de público.

## Público: qué es límite duro y qué es decoración

**Duros** (Meta los respeta incluso con Advantage+): ubicación; edad mínima, pero solo desde
"Limitar aún más tu público" → "Llegar a un público restringido" y con **"Usar como sugerencia"
DESMARCADO**; y desmarcar **"Incluir personas en WhatsApp cuya edad se desconoce"**.

**Decoración** (Advantage+ los ignora): el rango de edad sugerido, el sexo y la segmentación
detallada por intereses.

Para colchones, público **amplio funciona**: el producto lo compra cualquier adulto con casa.
Lo que filtra de verdad es la **geo por sucursal**.

## Flujo para crear una campaña nueva

1. `ads_create_campaign` sin presupuesto de campaña (para que lo tenga el conjunto) y **pausada**.
2. `ads_create_ad_set` con destino WhatsApp, optimización de conversaciones, geo por sucursal,
   edad dura y presupuesto en Bs.
3. `ads_create_creative` + `ads_create_ad`.
4. `ads_get_ad_preview` en Feed, Stories y Reels → abrir la URL y mirarla.
5. Mostrar la preview al usuario y **esperar sí explícito**.
6. `ads_activate_entity` en los tres niveles.
7. Verificar con `ads_get_ad_entities` que quedó activo y con el presupuesto correcto.
