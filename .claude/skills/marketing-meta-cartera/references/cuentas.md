# Las cuentas — IDs, estado real y plan pendiente

Verificado contra el conector el 20/09/2026. Los números envejecen: reconsultá antes de decidir.

## Mapa rápido

| Cuenta | ID | Moneda | Mín. diario | ¿La manejamos? |
|---|---|---|---|---|
| Ezequiel Spa Dental BOB | `27625985473759051` | BOB | Bs 12,50 | ✅ sí |
| COSMETIC BOB | `1010573671517161` | BOB | Bs 12,50 | ✅ sí |
| MIRNA - MARCA PERSONAL | `4565775887031504` | BOB | Bs 12,50 | ✅ sí |
| FERROMARC (Ferro Todo) | `1551786946119762` | BOB | Bs 12,50 | ✅ sí — **sin usar** |
| Ezequiel Spa Dental (USD) | `1360245352043819` | USD | — | ⚠️ activa con pago, **no usar** |
| Cosmetic (USD) | `1184230583314659` | USD | — | ⚠️ **no usar** |
| Spadental (Read-Only) | `1023188800162418` | USD | — | sin método de pago |
| Eduardo Añez | `315846888` | BOB | — | 🔴 UNSETTLED, no consultable |
| Colchones Heaven BO | `4086398341690339` | BOB | — | ❌ espejo, otra empresa |
| MultiEspumas CP \| Blah | `3475940726049285` | BOB | — | ❌ espejo, otra empresa |

**Regla dura**: cada marca tiene una cuenta BOB y una USD. **Siempre la BOB.** Pautar en la USD
rompe el reporte, el presupuesto mínimo y la comparación de costos.

---

## 1. Ezequiel SPADENTAL — `27625985473759051`

Dental clase media, Mercado Mutualista, 3er anillo. WhatsApp como canal de conversión.
**Opportunity Score: 90/100.**

Campañas activas (histórico completo):

| Campaña | Objetivo | Gasto | CPM | CTR | Conversaciones | Costo/conv | Frec |
|---|---|---|---|---|---|---|---|
| `SPA-PRUEBA-VENTAS-Blanqueamiento-17/07` | OUTCOME_SALES | Bs 4.440,50 | Bs 9,98 | 2,26% | 1.562 | **Bs 2,84** | 2,40 |
| `Campaña Campaña de mensajes personalizada 6/7/2026` | OUTCOME_ENGAGEMENT | Bs 4.413,91 | Bs 17,20 | 2,00% | **"mixed"** | **no medible** | 2,35 |

**Lo pendiente, por impacto:**

1. **Fragmentación (−17% costo por conversación, 6 pts).** Meta detecta conjuntos con públicos
   similares dentro de la misma campaña: se están pisando entre sí y le muestran el mismo anuncio
   a la misma gente. Afecta a las campañas `120250956797460636` y `120250352884220636`.
   **Es la mejora de mayor impacto de toda la cartera.** Consolidar conjuntos.
2. **`Campaña Campaña de mensajes personalizada 6/7/2026` tiene Bs 4.414 gastados y resultados
   "mixed"** — el conjunto mezcla objetivos y Meta no puede reportar un costo por resultado.
   Está gastando casi lo mismo que la campaña que sí mide, a ciegas. Separar por objetivo.
   De paso, el nombre duplicado (`Campaña Campaña…`) es el default: renombrar.
3. **Mezclar imagen y video en el conjunto** (−8% costo por conversación, 3 pts).
4. **Escalar la campaña `120249545266610636`** — Meta estima +81% más conversiones con más
   presupuesto. Entrega estable y costo por resultado más bajo que sus pares.

Bs 2,84 por conversación con CPM de Bs 9,98 es el mejor número de la cartera. Esta cuenta compra
barato: lo que falta es ordenarla para que no compita consigo misma.

---

## 2. COSMETIC Dental & Face Center — `1010573671517161`

Premium: diseño de sonrisa, implantes, armonización facial, capilar. Equipetrol Norte.
**Opportunity Score: 99/100** — la cuenta más limpia de la cartera.

| Campaña | Objetivo | Gasto | CPM | CTR | Conversaciones | Costo/conv | Frec |
|---|---|---|---|---|---|---|---|
| `COSMETIC - Dental Premium - Mensajes 16/07/2026` | OUTCOME_ENGAGEMENT | Bs 5.941,02 | Bs 24,85 | 2,35% | 1.102 | Bs 5,39 | 2,37 |
| `COS-VENTAS-Capilar-24/07` | OUTCOME_SALES | Bs 1.462,38 | Bs 22,87 | 2,03% | 241 | Bs 6,07 | **3,33** ⚠ |

**Lo pendiente:**

1. **Capilar está saturando: frecuencia 3,33.** La misma persona ya vio el anuncio más de tres
   veces. Creativos nuevos o ampliar público. **No subir presupuesto en esa campaña.**
2. **Escalar `120251119317480272`** — Meta estima +79% más conversiones. Ahí sí va el presupuesto
   que no va a Capilar.
3. Con score 99 no hay deuda técnica: la mejora acá es **creativa y comercial**, no de
   configuración. Lo que falta medir es qué pasa después de la conversación — cuántas de esas
   1.102 conversaciones terminaron en tratamiento cerrado y por cuánto.

**Recordatorio de criterio**: Bs 5–6 por conversación en premium **está bien**. La métrica de esta
cuenta es *valor de tratamientos cerrados / inversión*, no volumen de mensajes.

---

## 3. MIRNA - MARCA PERSONAL — `4565775887031504`

La marca personal de la Dra. Mirna Veizaga, separada de las dos clínicas.
**Opportunity Score: 94/100.**

| Campaña | Objetivo | Gasto | CPM | CTR | Conversaciones | Costo/conv | Frec |
|---|---|---|---|---|---|---|---|
| `Nueva campaña de Interacción` | OUTCOME_ENGAGEMENT | Bs 536,35 | **Bs 46,93** | 3,30% | 40 | **Bs 13,41** | 1,84 |

**Lo pendiente:**

1. **Pasar a una campaña CTWA dedicada** (−7% costo por conversación, 4 pts). Hoy es una campaña
   genérica de Interacción: Meta optimiza hacia interacción, no hacia conversación.
2. **El nombre es el default de Meta.** Renombrar con la convención de la cartera.
3. **Mejoras de texto Advantage+** (−3% costo por resultado, 2 pts).
4. **El CPM de Bs 46,93 es 4,7x el de Spadental.** Público muy angosto. Antes de meter más plata,
   definir qué vende esta cuenta: si es autoridad/marca, el KPI no es costo por conversación y
   hay que decirlo; si es captación, tiene que ofrecer un servicio concreto como las clínicas.

El CTR de 3,30% es el más alto de la cartera: **el contenido gusta**. El problema no es el
creativo, es la estructura y la definición del objetivo.

---

## 4. FERROMARC / Ferro Todo — `1551786946119762`

Ferretería e importadora (`importadoratotal.bo`). Cuenta **ACTIVE, con método de pago, y cero
campañas en toda su historia**. Meta no le asignó ni vertical (`\N`).

**Es la oportunidad más grande de la cartera** y la única cuenta sin restricciones de salud:

- **Se puede segmentar por interés y comportamiento** (construcción, herramientas, hogar, oficios)
  — en dental eso está prohibido o degradado.
- **Se puede mostrar precio, stock y catálogo** sin las restricciones de contenido médico.
- **Entra catálogo + Advantage+**: `ads_catalog_create` + `ads_catalog_create_product_feed`.
  Con el catálogo cargado se abren anuncios dinámicos y remarketing por producto visto — el
  formato que mejor rinde en retail y que ninguna otra cuenta de la cartera puede usar.
- **B2B y B2C a la vez**: el maestro albañil y el dueño de casa compran distinto. Son dos líneas
  de campaña, no una.

**Antes de lanzar, hay que pedir:** catálogo de productos con precios, foto y stock; qué margen
deja cada línea; si hay entrega a domicilio; horario de atención; y quién contesta el WhatsApp.
Sin eso, cualquier plan es invento.

Plan de arranque sugerido en `references/playbook-campanas.md`, sección "Lanzar una cuenta desde
cero".

---

## Cuentas espejo — qué copiar y qué no

Heaven, MultiEspumas y Sueña las lleva **otra empresa**. No se tocan: no se crea, no se edita, no
se pausa nada. Solo se leen para aprender. Lo que vale la pena copiar:

1. **El método del circuito cerrado.** Esa operación cruza la pauta de Meta contra su CRM y llega
   hasta CAC y ROAS en Bs por canal. Es el estándar al que hay que llevar nuestras cuentas —
   hoy medimos hasta la conversación y ahí nos quedamos. Ver `references/medicion-cierre.md`.
2. **La convención de nombres de campaña** con prefijo de etapa (`EV |`, `CV |`, `PRE |`). Sirve:
   permite filtrar y reportar. Tres de nuestras cuatro cuentas tienen nombres por defecto.
3. **La lección más cara, gratis**: esa cuenta compra conversaciones a ~Bs 1 y aun así cierra solo
   el 2%, porque el 72% de las fichas queda sin contestar más de 72 h. **El costo por conversación
   barato no salva a nadie si nadie contesta.** Aplicá esa vara a nuestras cuentas antes de
   celebrar los Bs 2,84 de Spadental.

Lo que **no** se copia: su estructura de campañas (embudo único, casi todo en consideración) ni
sus campañas de seguidores, que consumieron meses de presupuesto sin producir venta medible.
