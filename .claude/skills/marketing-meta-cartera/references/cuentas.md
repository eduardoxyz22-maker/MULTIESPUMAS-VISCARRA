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

### Lo que está corriendo de verdad (últimos 30 días)

Una sola campaña entrega: `SPA-PRUEBA-VENTAS-Blanqueamiento-17/07` (`120249534640970636`,
OUTCOME_SALES), con **un conjunto por servicio y exactamente un anuncio en cada conjunto**:

| Conjunto | Gasto 30d | CPM | CTR | Conversaciones | Costo/conv | Frec | Anuncios |
|---|---|---|---|---|---|---|---|
| `SPA-VENTAS-Blanqueamiento-Mutualista` | Bs 1.299,94 | **Bs 8,42** | 2,07% | 559 | **Bs 2,33** | 1,88 | 1 (video) |
| `SPA-VENTAS-Placas-Acrilicas-Mutualista` | Bs 1.024,85 | Bs 12,36 | 3,24% | 347 | Bs 2,95 | 1,55 | 1 (video) |
| `SPA-VENTAS-Endodoncia-Mutualista` | Bs 289,99 | Bs 24,86 | 3,46% | 76 | Bs 3,82 | 1,48 | 1 (video) |
| `SPA-VENTAS-Limpieza230-Mutualista` (conjunto pausado) | Bs 105,96 | Bs 22,45 | 2,25% | 7 | Bs 15,14 | 1,25 | 1 |

Total activo: **~Bs 2.720 · 989 conversaciones · Bs 2,75 promedio**.

Diagnóstico de subasta (`ads_insights_auction_ranking_benchmarks`): los tres anuncios dan
*"You are all good"*. Blanqueamiento y Placas con interacción y conversión **por encima del
promedio**; Endodoncia en promedio en todo. **Los creativos no son el problema.**

La campaña vieja `Campaña Campaña de mensajes personalizada 6/7/2026` (`120249143305470636`)
tiene **todos sus conjuntos pausados**: sus Bs 4.414 y los resultados "mixed" son **historia de
julio, no una fuga activa**. En los últimos 30 días gastó ~Bs 68. Sirve como lección de por qué
no se mezclan objetivos en un conjunto, no como urgencia.

### La segmentación real de los cuatro conjuntos (leída, no supuesta)

Los cuatro apuntan al **mismo público, sin una sola diferencia**:

- Geo: lugar `Mutualista` (key `820294104758619`), **radio 4 km**, tipos `frequently_in` + `home`
  + `recent`.
- Edad **18–65**, sin filtro de género.
- `optimization_goal: CONVERSATIONS` · `billing_event: IMPRESSIONS` · `destination_type: WHATSAPP`.
- `advantage_audience: 1` en los cuatro · **sin pixel ni `promoted_object`**.

Eso vuelve la fragmentación un hecho, no una sospecha: **es un solo público partido en cuatro
presupuestos**, compitiendo consigo mismo en la subasta.

Presupuesto configurado vs. gasto real diario:

| Conjunto | Presupuesto/día | Gasta/día | Lectura |
|---|---|---|---|
| Blanqueamiento | Bs 44,00 | ~Bs 43,3 | gasta todo |
| Placas | Bs 34,50 | ~Bs 34,2 | gasta todo |
| Endodoncia | Bs 25,00 | ~Bs 9,7 | **solo el 39%** — atascado en aprendizaje |
| Limpieza 230 | Bs 25,00 | Bs 0 | pausado |

Inconsistencias entre conjuntos que conviene unificar al consolidar:

- `user_age_unknown: true` en Blanqueamiento y Endodoncia, ausente en Placas y Limpieza.
- `targeting_automation.individual_setting {age:1, gender:1, geo:0}` en Blanqueamiento y Placas;
  Endodoncia en cambio trae `targeting_optimization: "expansion_all"` (el que más abre).
- A **Limpieza le faltan ubicaciones**: no tiene Messenger ni `messenger_story`, los otros tres sí.
- Los cuatro incluyen **Audience Network con `rewarded_video`**, ubicación de baja calidad para
  campañas de conversación. Vigilarla; no tocarla en el mismo test.

### Lo pendiente, por impacto

1. **Un solo anuncio por conjunto, y todos video.** Es el techo más grande y no cuesta pauta:
   Andromeda y GEM premian diversidad creativa, y acá no hay ninguna. Meta además marca
   `mixed_formats` (−8%) en Placas Acrílicas. Subir a 4–6 anuncios por conjunto mezclando
   imagen, video y carrusel.
2. **Fragmentación (−17%, 6 pts).** Los tres conjuntos apuntan al mismo público de Mutualista,
   separados solo por servicio: compiten entre sí en la subasta. Consolidar en **un conjunto con
   los servicios como anuncios distintos**. Bonus: Endodoncia, con 76 conversaciones en 30 días
   (~18/semana), **nunca sale de fase de aprendizaje**; dentro del conjunto grande sí.
3. **El remarketing NO funciona en esta cuenta. Ya se probó.**
   `SPA-RETARGET-Consulta30-FB365` (`120250385380820636`), historial completo: Bs 59,13 ·
   3.010 impresiones · **CPM Bs 19,64** · CTR 2,69% · **2 conversaciones a Bs 29,57**.
   Contra los Bs 2,53 de Blanqueamiento: **12x más caro**. Eduardo reporta tres intentos
   fallidos de remarketing, y el dato lo respalda.
   **No volver a sugerirlo acá sin una razón nueva.** El motivo no es mala ejecución: el CTR de
   2,69% es de los mejores de la cuenta, o sea que el anuncio engancha. El problema es el
   **CPM de Bs 19,64 contra Bs 8,59 del tráfico frío** — el público que ya interactuó, dentro de
   un radio de 4 km, es demasiado chico y Meta cobra caro por alcanzarlo.

4. **Escalar Blanqueamiento** (`120249545266610636`): Meta estima +81% más conversiones. Es el
   conjunto con CPM más bajo (Bs 8,42) y frecuencia 1,88 — hay espacio. +20–30% semanal.
5. **Limpieza Bs 230 quedó en limbo**: conjunto pausado con el anuncio activo, Bs 15,14 por
   conversación sobre apenas Bs 106 de gasto. Nunca tuvo chance real. O entra como un anuncio más
   del conjunto consolidado, o se descarta — pero no se deja a medias.
6. **Limpieza de cuenta**: hay una docena de `ZZ-ARCHIVO-*` y `ZZ-JUL-*`, y
   `ZZ-ARCHIVO-BLANQUEAMIENTO (error DCO, jul)` figura **ACTIVE** dentro de un conjunto pausado.
   No entrega, pero ensucia toda lectura de la cuenta.
7. **Falta el dato del negocio.** 989 conversaciones en 30 días: ¿cuántas terminaron en cita?
   ¿cuántas se presentaron? Sin eso no hay CAC y no se puede decidir cuánto escalar.

Bs 2,33 por conversación con CPM de Bs 8,42 es el mejor número de la cartera. Esta cuenta compra
barato: lo que falta es ordenarla y darle creativos.

## 2. COSMETIC Dental & Face Center — `1010573671517161`

Premium: diseño de sonrisa, implantes, armonización facial, capilar. Equipetrol Norte.
**Opportunity Score: 99/100** — la cuenta más limpia de la cartera.

| Campaña | Objetivo | Gasto | CPM | CTR | Conversaciones | Costo/conv | Frec |
|---|---|---|---|---|---|---|---|
| `COSMETIC - Dental Premium - Mensajes 16/07/2026` | OUTCOME_ENGAGEMENT | Bs 5.941,02 | Bs 24,85 | 2,35% | 1.102 | Bs 5,39 | 2,37 |
| `COS-VENTAS-Capilar-24/07` | OUTCOME_SALES | Bs 1.462,38 | Bs 22,87 | 2,03% | 241 | Bs 6,07 | **3,33** ⚠ |

**Lo pendiente:**

1. **Capilar NO está saturado — la alarma de 3,33 era un error de lectura.** Ese número es la
   frecuencia **lifetime** (desde el 24/07). En 30 días es **2,54** y en 7 días **1,92**. Parte
   de esa acumulación se explica porque el conjunto estuvo pausado del 27/08 al 07/09.
   **Frecuencia siempre a 7 y 30 días; la lifetime no mide saturación actual.**
2. **Escalar Blanqueamiento `120251119317480272`** — Meta estima +79% más conversiones. Ahí sí va
   el presupuesto que no va a Capilar. Subilo con la regla de siempre, +20–30% semanal.
3. **El pico de CPM de mediados de septiembre NO fue canibalización: fue el mercado.**
   Se creyó que prender un cuarto conjunto (`COS-Facial-Expocruz`) había disparado el CPM de
   toda la cuenta. El control entre cuentas lo desmiente — las tres subieron igual, en las
   mismas fechas, y Spadental no tiene ningún conjunto de Expocruz:

   | CPM promedio | Spadental | Cosmetic | Mirna |
   |---|---|---|---|
   | 6–12 sep | Bs 11,47 | Bs 23,52 | Bs 36,77 |
   | 13–15 sep | Bs 19,18 | Bs 38,69 | Bs 66,26 |
   | 17–19 sep | Bs 9,91 | Bs 17,82 | Bs 41,41 |
   | Salto | ×1,67 | ×1,64 | ×1,80 |

   Coincide con la ventana de Expocruz: toda la plaza pujando encarece a todos. Pausar Facial
   igual fue correcto por su propio rendimiento (CPM Bs 49,13, Bs 7,60 por conversación), pero
   no envenenaba la cuenta.

4. **Diseño de Sonrisa ya se probó y anduvo mal**: Bs 515,22 · 55 conversaciones · **Bs 9,37**,
   el peor costo de la cuenta. No proponerlo de nuevo sin un ángulo o creativo distinto.
5. **Facial Expocruz**: Bs 7,60 por conversación con CPM de Bs 49,13, y encima canibaliza.
   Si se reactiva por la feria, es a cambio de apagar otro.
3. Con score 99 no hay deuda técnica: la mejora acá es **creativa y comercial**, no de
   configuración. Lo que falta medir es qué pasa después de la conversación — cuántas de esas
   1.102 conversaciones terminaron en tratamiento cerrado y por cuánto.

**Recordatorio de criterio**: Bs 5–6 por conversación en premium **está bien**. La métrica de esta
cuenta es *valor de tratamientos cerrados / inversión*, no volumen de mensajes.

---

## 3. MIRNA - MARCA PERSONAL — `4565775887031504`

La marca personal de la Dra. Mirna Veizaga, separada de sus dos clínicas.
**Opportunity Score 96** — y ver el punto 16 de `conector-meta.md` antes de darle peso.

Historia completa (11 días, 10–20/09): Bs 545,09 · 42 conversaciones · **Bs 12,98 c/u**.
Una sola campaña: `MIR | EV | Estetica | Santa Cruz | 2026` (`120257388963040151`).

### Meta NO la clasifica como salud

| Cuenta | Vertical que le asigna Meta |
|---|---|
| **Mirna** | **Publishing · Online Only Publications** |
| Spadental | Healthcare · Health Systems and Practitioners |
| Cosmetic | Healthcare · Health Systems and Practitioners |

Meta la lee como **un medio de contenido**, no como una profesional de la salud. Eso define
contra quién puja en la subasta y explica parte del CPM.

### Dos hipótesis mías que los datos MATARON

**1. "El presupuesto está sobredimensionado y eso infla el CPM." FALSO.**
Correlación entre gasto diario y CPM: **0,289** (0,141 sacando el día parcial de arranque).
El contraejemplo es letal: el 12/09 Labios llenó el **138%** de su presupuesto y tuvo **su CPM
más barato (Bs 31,91)**; el 14/09 Expocruz llegó apenas al 87,5% y marcó **Bs 97,25**, el más
caro de la cuenta. Y el 18/09 el consolidado llegó al 91,8% de los Bs 66: **el público sí puede
llenarlo.** → **NO bajar el presupuesto.**

**2. "El anuncio que convierte mejor recibe menos plata." FALSO, igual que en Cosmetic.**
Labios Bs 10,56/conv (12 conversaciones) contra Expocruz Bs 10,09 (**4 conversaciones**).
Diferencia del 4,5% medida sobre 4 casos: una conversación más o menos lo mueve a Bs 8,07 o
Bs 13,45. `auction_ranking_benchmarks` devuelve "Not Yet Available" para los dos — **ni Meta
tiene volumen para rankearlos.** Y Meta no lo apagó por capricho: el CTR de Expocruz se derrumbó
3,66% → 1,75% → **0,00%** con CPM 40% más caro. Apostó bien.

### Lo que SÍ explicaba el CPM alto

Del registro de actividad, **14/09 a las 22:47**: alguien pausó el conjunto Labios y le subió el
presupuesto a Expocruz. Verificado: **el 15 y el 16/09 Labios entregó Bs 0,00 y cero
impresiones.** La cuenta pasó dos días corriendo **solo el ángulo caro de Expocruz**, en plena
feria. De ahí salen los Bs 72,19 y Bs 76,81 que dispararon la alarma.

El control entre cuentas lo confirma: el 14/09 subieron las tres juntas (mercado), pero el 15 y
16 Spadental y Cosmetic bajaron y Mirna no (6,69x Spadental el 16). Eso fue la cuenta.

**El CPM real de esta cuenta no es Bs 46,93. Es Bs 34,30** (20/09, limpia). Está en 3,3–3,4x
Spadental, no en 5x. Sigue siendo la más cara, pero no es el público.

### Lo pendiente

1. **No tocar el presupuesto 7 días.** El conjunto nació el 17/09 y lleva 16 conversaciones;
   necesita 50 en 7 días para salir de aprendizaje. El subgasto es aprendizaje, no falta de
   gente. **Se declara techo de público solo si al 28/09, con Expocruz apagado y Bs 66/día, el
   CPM sigue arriba de Bs 45.**
2. **Falta un número en el anuncio.** Los dos creativos dicen "Agendá tu valoración" sin precio,
   sin servicio cerrado, sin zona y sin número de WhatsApp. CTR 3,29% (el mejor de la cartera:
   el contenido gusta) con la conversación más cara de la cartera. Ese desajuste es el
   diagnóstico.
3. **Postura sobre qué es esta cuenta**: hoy **no es marca de autoridad, es una tercera clínica
   mal disfrazada.** Ya optimiza por CONVERSATIONS y manda a WhatsApp — eso es captación. El
   copy, en cambio, es de marca pura. Hay que elegir captación y darle una oferta concreta.
   KPI propuesto hasta tener dato del negocio: **costo por valoración agendada**.
4. **~36 horas en gracia / pago pendiente entre el 18 y el 19/09.** Cuatro eventos en 10 días.
   El umbral de facturación es muy bajo para el ritmo de gasto.

## 4. FERROMARC## 4. FERROMARC / Ferro Todo — `1551786946119762`

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

## Las tres cuentas se quedaron sin método de pago en septiembre

Del registro de actividad, verificado el 21/09/2026:

| Cuenta | Cortes | El peor |
|---|---|---|
| Spadental | 3 en 25 días | 27/08, **16 horas** — ese día gastó Bs 48,92 contra una mediana de Bs 88 |
| Cosmetic | 2 | 06/09, ~3 horas |
| Mirna | 4 en 10 días | 18–19/09, **~36 horas** en gracia |

Cada corte frena la entrega y puede empujar los conjuntos de vuelta a fase de aprendizaje.
**Es la única mejora de la cartera que no requiere criterio: tarjeta de respaldo y subir el
umbral de facturación.** Y contamina cualquier lectura diaria — antes de explicar una caída,
mirar si ese día la cuenta estuvo cortada.

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

### Lo que NO se copia, con el número

1. **Campañas de seguidores.** MultiEspumas tiene ocho (`PRE | Seguidores FB`, ago-2024 a
   feb-2025 más Sueña 2026): **~Bs 3.357** en likes a Bs 0,38–0,60, cero ventas rastreables. Es
   su segundo destino de plata y no produjo nada medible.
2. **Formularios de clientes potenciales.** Sus tres campañas B2B: Bs 1.152,93 por 195 leads a
   **Bs 5,05–6,05**, mientras en la misma cuenta y las mismas fechas la conversación de WhatsApp
   costaba Bs 1,43–1,71. **3–4x más caro y con un lead más flojo.** Es el cartel que Meta nos
   muestra y que hay que rechazar.
3. **Su frecuencia.** La campaña madre acumula **7,42** en dos años y va en 2,8–3,9 mensual,
   pegada al techo. Con un radio de 4 km como el de Spadental, esa presión satura en semanas.
4. **Su desorden.** Heaven tiene más de 40 anuncios en ACTIVE y solo ~10 gastan; 23 conjuntos
   ACTIVE y 12 en Bs 0,00. Ensucia toda lectura y se terminan tomando decisiones sobre números
   que no existen.
5. **El volumen sin el otro lado del mostrador.** Ver la tabla de `medicion-cierre.md`: compran a
   Bs 1 y cierran al 2% porque nadie contesta. **La cuenta "peor" es la nuestra solo si mirás la
   primera columna.**

Lo que **no** se copia: su estructura de campañas (embudo único, casi todo en consideración) ni
sus campañas de seguidores, que consumieron meses de presupuesto sin producir venta medible.
