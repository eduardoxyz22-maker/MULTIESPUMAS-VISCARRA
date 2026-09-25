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

4. **La imagen `carillas 1 .jpeg` (`c7df6a00195f33948cf1dd343f9428b5`) ya falló.** Corrió en
   `COS-Carillas` (`120250846507250272`): Bs 147,01 · 3.201 impresiones · CTR 2,09 % ·
   **CPM Bs 45,93** · 14 conversaciones a **Bs 10,50** — el doble que el video de Carillas
   (Bs 5,24) con CPM 17 % más alto. Eduardo la pausó por eso.
   **No reusar esa imagen.** El ángulo de las tres preguntas necesita una pieza propia,
   diseñada con las preguntas en pantalla. El anuncio `120251962480610272`, creado el 21/09
   sobre esa misma imagen, quedó PAUSADO con Bs 0 gastados y **no se activa**.
5. **Diseño de Sonrisa ya se probó y anduvo mal**: Bs 515,22 · 55 conversaciones · **Bs 9,37**,
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

**La cuenta se abrió el 08/09/2026.** No existe historia anterior: es cuenta nueva, sin
aprendizaje acumulado de ningún tipo.

Historia completa (10–25/09, releída el 25/09): **Bs 866,23 · 74 conversaciones · Bs 11,71 c/u**
· CPM 45,49 · CTR 3,18%. Una sola campaña: `MIR | EV | Estetica | Santa Cruz | 2026`
(`120257388963040151`), CONVERSATIONS con destino WhatsApp.

### Es la cuenta más rentable de la cartera, no la más cara

Dato del negocio (Eduardo, 25/09): **labios Bs 1.800, cierra ~2 de cada 10 conversaciones.**

| | Labios-Limpio |
|---|---|
| Bs por conversación | 10,08 |
| 10 conversaciones | Bs 100,80 |
| 2 ventas × Bs 1.800 | Bs 3.600 |
| **Retorno** | **~35 a 1** · CAC Bs 50,40 (2,8% del ticket) |

Hasta el peor día de la cuenta (19/09, Bs 37,38/conv, en pleno corte de pago) da ~9,6 a 1.

**Error que cometí y no hay que repetir:** comparé los Bs 13,71 de Mirna contra los Bs 3,60 de
Spadental y la llamé "la cuenta problema". Una limpieza de Spadental son Bs 230; un labio son
Bs 1.800. **El costo por conversación sin el ticket al lado no dice si una cuenta está cara.**

### Lo que se vende es la valoración abierta, no el tratamiento

Hay dos creativos, los dos venden una valoración y mandan al mismo WhatsApp:

- **Labios**: nombra el tratamiento ("ácido hialurónico", volumen, definición).
- **Expocruz**: *no nombra ningún tratamiento ni precio* — "rostro más fresco, armónico y
  cuidado… en la valoración te orientaré sobre el tratamiento más adecuado". Expocruz es solo la
  fecha límite.

Según Eduardo, **la mayoría no termina comprando labios sino "el de Expocruz"** — es decir, lo
que Mirna recomienda en la valoración. Sin confirmar todavía si esos compradores llegan desde ese
anuncio o desde los dos por igual (él cree que desde los dos; lo revisa el sábado 26/09).

⚠️ Esto **contradice** lo que este archivo recomendaba antes ("hay que ponerle precio, servicio
cerrado, oferta concreta"). Con el dato del negocio, cerrar la oferta sería matar la puerta
abierta que vende. **No se le pone precio ni tratamiento al anuncio de valoración.**

### Separados vs consolidados — separados no fracasaron por estar separados

| Período | Estructura | Gasto | Conv | Bs/conv |
|---|---|---|---|---|
| 10–13/09 | Labios solo en su conjunto | 93,77 | 8 | 11,72 |
| 10–13/09 | Expocruz solo en su conjunto | 98,10 | 9 | 10,90 |
| **14–17/09** | **Expocruz solo, Labios pausado** | 154,50 | 7 | **22,07** |
| 17–25/09 | Consolidado (Bs 66 = 30 + 36) | 488,23 | 48 | **10,17** |

Los cuatro primeros días separados rindieron igual que el consolidado de hoy. Lo que los rompió
fue el **14/09 22:47**: se pausó Labios y se subió Expocruz de Bs 30 a Bs 36 sobre el mismo
público → CPM de Expocruz 66 → **97** al día siguiente y nunca bajó de 67 hasta que se apagó.
Además el consolidado se comió los dos cortes de pago grandes y aun así ganó.

**Lección:** no es "separar malo / juntar bueno". Lo destructivo es **pausar uno de dos
conjuntos hermanos y cargarle la plata al otro.** El consolidado a Bs 10,17 es la mejor
estructura que tuvo la cuenta: no se rompe sin dato.

### Meta optimiza por conversación barata, no por venta

Desde el 19/09 Meta le da a Expocruz-Limpio Bs 0,46–1,98 por día (19–58 impresiones): Labios le
sale más barato por conversación (10,08 vs 11,21) y se quedó con todo. Desde la conversación,
Meta hizo bien. Pero **Meta no sabe cuál cierra.** Si los compradores vienen del anuncio de la
valoración abierta, Meta optimiza en contra del negocio y lo seguirá haciendo con cualquier
creativo nuevo de ese tipo — ahí sí se justifica un conjunto aparte (sin pausar nada, sin mover
plata entre ellos). Si llegan de los dos por igual, se queda todo junto.

### Hipótesis mías que los datos mataron (se mantienen)

**"El presupuesto está sobredimensionado y eso infla el CPM." FALSO.**
Correlación gasto diario / CPM: 0,289. El 12/09 Labios llenó el 138% de su presupuesto con su
CPM más barato (31,91); el 14/09 Expocruz llegó al 87,5% y marcó 97,25. El público llena los
Bs 66. → **NO bajar el presupuesto.**

### Dónde se va la plata (conjunto consolidado, hasta 25/09)

| Ubicación | Gasto | CPM | Conv | Bs/conv |
|---|---|---|---|---|
| Facebook Feed | 227,04 (47%) | 47,28 | 17 | 13,36 |
| Facebook Reels | 102,59 | 49,13 | 16 | 6,41 |
| WhatsApp Status | 37,33 | 15,69 | 7 | 5,33 |
| IG Stories / FB Stories | 68,93 | 46,6 / 79,9 | 6 | ~11,5 |
| IG Feed | 28,02 | 56,60 | 1 | 28,02 |
| IG Reels | 16,38 | 41,04 | 0 | — |

Dato para mirar, **no** para forzar ubicaciones: al sacar ubicaciones el CPM de las baratas
suele subir porque la subasta deja de elegir.

Edad/sexo: mujeres Bs 11,16/conv (33), hombres Bs 8,67 (13, muestra chica). Peor celda: mujeres
45–54, Bs 77,76 por 5 conversaciones (Bs 15,55).

### Los cortes de pago explican la serie diaria

| Cayó | Volvió | Duración |
|---|---|---|
| 11/09 15:45 | 11/09 16:00 | 15 min |
| 16/09 06:42 | 16/09 06:44 | 2 min |
| 18/09 04:05 | 19/09 15:56 | **~36 h** ("Payment Needed") |
| 22/09 21:59 | 23/09 18:31 | **~20,5 h** |

El 19/09 (dentro del corte) es el peor día: Bs 37,38 por una conversación. El 22/09, único día
entero con presupuesto de recuperación (gastó Bs 98 contra Bs 66), es el mejor: **19
conversaciones a Bs 5,17.**

### Lo pendiente (al 25/09)

1. **Tarjeta de respaldo.** Primero que todo.
2. **El gancho Expocruz caduca con la feria (fin de septiembre).** Hace falta un creativo nuevo
   de valoración abierta con la MISMA estructura (pregunta que abre, "rostro más fresco y
   armónico", valoración donde Mirna orienta, sin tratamiento ni precio) y otro motivo para
   escribir hoy. Va **adentro del conjunto consolidado**, mismo presupuesto; el de Expocruz se
   apaga cuando el nuevo esté aprobado. Si en 4–5 días Meta lo ahoga a ~Bs 1/día, recién ahí se
   habla de separarlo.
3. **Respuesta de Eduardo del sábado 26/09**: ¿los que compran vienen del anuncio de valoración
   o de los dos? Y precio del tratamiento que eligen en la valoración.
4. **Antes de subir presupuesto:** ¿Mirna contesta 15–20 WhatsApp por día? El 22/09 entraron 19
   en un día. Si se contesta tarde, el 2 de 10 se cae y el 35 a 1 con él.

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

## Las tres cuentas se quedaron sin método de pago en septiembre

Del registro de actividad, verificado el 21/09/2026:

| Cuenta | Cortes | El peor |
|---|---|---|
| Spadental | 3 en 25 días | 27/08, **16 horas** — ese día gastó Bs 48,92 contra una mediana de Bs 88 |
| Cosmetic | 2 | 06/09, ~3 horas |
| Mirna | 4 en 18 días | 18–19/09, **~36 horas** en gracia; 22–23/09 otras **~20,5 h** |

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
