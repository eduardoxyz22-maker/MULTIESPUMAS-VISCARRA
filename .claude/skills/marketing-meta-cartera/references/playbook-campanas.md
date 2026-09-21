# Playbook de campañas — estructuras, presupuesto y escalado

Todo en Bs. Mínimo diario de las cuentas BOB: **Bs 12,50**.

## Convención de nombres — ya aplicada en Spadental y Cosmetic (21/09/2026)

```
<MARCA> | <ESTADO> | <línea> | <zona o nota>
```

- **Marca**: `SPA` · `COS` · `MIR` · `FER`
- **Estado**:
  - `EV` — corriendo, es lo que vende
  - `PAUSA` — pausado pero vigente, se puede reactivar (lleva el motivo entre paréntesis)
  - `ZZ` — muerto o descartado, **con el número que lo descartó en el nombre**
- **Zona**: `Mutualista` (Spadental) · `Equipetrol` (Cosmetic)

Así quedaron las cuentas:

| Cuenta | Nombre | Estado |
|---|---|---|
| SPA | `SPA \| EV \| Blanqueamiento \| Mutualista` | 🟢 Bs 57 |
| SPA | `SPA \| EV \| Servicios (Placas+Endo+Limpieza) \| Mutualista` | 🟢 Bs 50 |
| SPA | `SPA \| PAUSA \| Placas \| revertir test` | ⏸️ |
| SPA | `SPA \| PAUSA \| Endodoncia \| revertir test` | ⏸️ |
| SPA | `SPA \| PAUSA \| Limpieza 230 \| revertir test` | ⏸️ |
| SPA | `ZZ \| SPA \| Retarget - NO USAR (Bs 29,57/conv)` | ⏸️ |
| SPA | `ZZ \| SPA \| Consulta 30 - probado (Bs 6,14/conv)` | ⏸️ |
| COS | `COS \| EV \| Carillas \| Equipetrol` | 🟢 Bs 37 |
| COS | `COS \| EV \| Capilar \| Equipetrol` | 🟢 Bs 30 |
| COS | `COS \| EV \| Blanqueamiento 3 Luces \| Equipetrol` | 🟢 Bs 30 |
| COS | `COS \| PAUSA \| Facial Expocruz (CPM Bs 49)` | ⏸️ |
| COS | `COS \| PAUSA \| Limpieza+Carillas (espera video nuevo)` | ⏸️ |
| COS | `ZZ \| COS \| Implantes - NO USAR (no sienta pacientes)` | ⏸️ |
| COS | `ZZ \| COS \| Diseno Sonrisa - probado mal (Bs 9,37/conv)` | ⏸️ |

**La regla que hace que esto valga la pena: un `ZZ` lleva el número que lo mató.** Así nadie
—ni el agente— vuelve a proponer el retargeting de Spadental ni los implantes de Cosmetic sin
ver primero por qué se descartaron. Es la defensa más barata contra repetir una prueba ya hecha.

Campañas: `<MARCA> | EV | <tema> | <zona> | <año>`, y las muertas pasan a `ZZ | … | ARCHIVO`
**y se pausan** — una campaña activa con todos sus conjuntos pausados no entrega nada pero
ensucia el tablero y hace creer que hay más corriendo de lo que hay.

## Estructura por rubro

### Salud y estética (Spadental, Cosmetic)

```
<MARCA> | EV | <servicio> | ABO | <mes-año>
└── 1 conjunto por servicio, NO por variante de público
```

- Objetivo: **Interacción → Mensajes (CTWA)**. Optimización: **conversaciones**, no clics.
- **Un conjunto por servicio, no tres por el mismo servicio.** Ese es exactamente el error que
  Meta le marca hoy a Spadental como *fragmentación*: conjuntos con públicos similares se pisan
  entre sí y suben el costo. Arreglarlo vale −17%.
- Público amplio + geo + edad dura. La segmentación detallada por salud está restringida: no
  prometas segmentar por "interés en ortodoncia", no existe.
- 4–6 anuncios por conjunto, mezclando imagen y video (Meta lo pide explícitamente: −8%).
- Spadental = volumen y precio accesible. Cosmetic = ticket alto; su métrica es **valor de
  tratamientos cerrados / inversión**, no cantidad de mensajes.

### Marca personal (Mirna)

Primero decidí qué es esta cuenta, porque cambia el KPI:

- **Si es autoridad/marca**: el KPI es alcance cualificado y crecimiento de comunidad. Entonces
  un costo por conversación de Bs 13,41 **no es el número a mirar** y hay que decirlo en el reporte.
- **Si es captación**: necesita ofrecer un servicio concreto, como las clínicas. Sin oferta
  concreta, el CPM de Bs 46,93 se explica solo.

En cualquiera de los dos casos: pasar de la campaña genérica de Interacción a una **campaña CTWA
dedicada** (−7%) y renombrarla.

### Retail / ferretería (FERROMARC) — el único rubro sin restricciones

```
FER | EV | B2C Hogar      | CBO | <mes-año>
FER | EV | B2B Obra       | ABO | <mes-año>
FER | RMK | Catálogo      | ABO | <mes-año>   ← requiere catálogo cargado
```

- **Se puede segmentar por interés y comportamiento**: construcción, herramientas, mejoras del
  hogar, oficios. En dental eso está prohibido; acá es la ventaja.
- **Se puede mostrar precio, stock y marca** sin restricción de contenido médico.
- **Catálogo + Advantage+**: `ads_catalog_create` → `ads_catalog_create_product_feed` →
  `ads_catalog_create_product_set`. Habilita anuncios dinámicos y remarketing por producto visto:
  el formato que mejor rinde en retail y que ninguna otra cuenta de la cartera puede usar.
- **B2C y B2B son dos líneas distintas.** El dueño de casa compra un taladro; el maestro albañil
  compra volumen y pregunta por precio mayorista. Mismo producto, copy opuesto.

## Lanzar una cuenta desde cero (el caso FERROMARC)

1. **Pedir los insumos** antes de prometer nada: catálogo con precios, foto y stock; márgenes por
   línea; si hay entrega; horario; y **quién contesta el WhatsApp**.
2. **Verificar la base**: página vinculada (`ads_get_pages_for_business`, no
   `ads_get_ad_account_pages`), Instagram conectado, WhatsApp Business configurado con mensaje de
   bienvenida y respuestas rápidas.
3. **Arrancar chico y medible**: Bs 30–40/día en **una sola** campaña CTWA con 2 conjuntos
   (B2C hogar / B2B obra) y 4 creativos distintos cada uno. Nada de cinco campañas el primer día.
4. **Dejar correr 4 días sin tocar nada.** Leer al día 5.
5. **Recién con datos**, cargar el catálogo y abrir la línea de remarketing.
6. Meta todavía no le asignó vertical a esta cuenta: las primeras 2 semanas el sistema está
   aprendiendo qué es el negocio. Los costos iniciales **no** son representativos.

## Cuándo el remarketing SIRVE y cuándo no

No es "siempre el público más barato". Esa regla de manual es falsa en negocios locales.

**La prueba, antes de proponerlo: compará el CPM del público de remarketing contra el del
tráfico frío de la misma cuenta.**

- Tráfico frío caro (CPM alto, público competido) → el remarketing rescata. Sirve.
- **Tráfico frío barato → el remarketing es un lujo que no rinde.** Comprar gente nueva sale
  menos que insistirle a quien ya te vio y no escribió.

Caso medido en Spadental (20/09/2026): remarketing CPM Bs 19,64 y Bs 29,57 por conversación,
contra tráfico frío CPM Bs 8,59 y Bs 2,53 por conversación. **12x más caro.** Con un radio de
4 km, el público de "ya interactuó" es tan chico que Meta cobra una fortuna por alcanzarlo.

Corolario: en una clínica o comercio de barrio con geo apretada, **asumí que el remarketing NO
va** hasta que el CPM del frío suba. Donde sí puede tener sentido es en FERROMARC, con catálogo
cargado y remarketing por producto visto — pero eso se prueba, no se da por hecho.

## Escenarios de presupuesto

| Escenario | Bs/día | Bs/mes | Para qué sirve |
|---|---|---|---|
| Piso técnico | 12,50 | ~375 | Mantener una campaña viva. No aprende |
| Arranque de cuenta nueva | 30–40 | 900–1.200 | Aprender qué funciona sin quemar plata |
| Cuenta en régimen (Spadental) | 90–150 | 2.700–4.500 | Volumen con costo por conversación sano |
| Premium (Cosmetic) | 50–120 | 1.500–3.600 | Menos volumen, ticket alto. Mínimo Bs 50/día o los datos son basura |
| Temporada (jul y dic, aguinaldo) | +50% sobre la base | — | Solo con equipo reforzado para contestar |

**Regla transversal**: presupuesto sano de un negocio = **5–10% de sus ingresos mensuales**.

## Fase de aprendizaje

- Un conjunto sale de aprendizaje con ~**50 conversiones por semana**.
- **Días 1–4 de una campaña nueva: no tocar nada.** Cada edición lo reinicia.
- Leer al día 5. Apagar el anuncio perdedor entre el día 7 y el 10, nunca antes.

## Reglas de escalado

- **+20–30% semanal como máximo.** Un salto de 2x reinicia el aprendizaje y sube el CPM.
- Escalar **primero donde Meta ya avisó** que hay margen (`scale_good_campaign`): hoy Cosmetic
  `120251119317480272` (+79%) y Spadental `120249545266610636` (+81%).
- Con la frecuencia ya sobre 3, duplicar el conjunto ganador con público nuevo rinde más que subir
  el presupuesto del mismo conjunto.
- **Bajar** presupuesto cuando: frecuencia 30d > 3,5 · el costo por conversación duplica su media
  de 30 días tres días seguidos · nadie está contestando los mensajes que ya entraron.

## Cuándo apagar o corregir algo

| Señal | Acción |
|---|---|
| Frecuencia > 3,5 en 30 días | Creativos nuevos, **no** más presupuesto (hoy: Capilar 3,33) |
| CTR < 1% con +5.000 impresiones | Creativo muerto: reemplazar |
| Resultados "mixed" | El conjunto mezcla objetivos: separarlo. Estás gastando a ciegas |
| CPM sube y CTR baja | Creativo cansado |
| CTR alto y pocas conversaciones | Optimización mal puesta (¿clics?) o promesa que el anuncio no cumple |
| Muchas conversaciones y pocas citas | **Seguimiento**, no pauta |
| 0 conversaciones en 3 días con gasto | `ads_get_errors` + vista previa |

## Estacionalidad boliviana

- **Julio y diciembre (aguinaldo)**: los dos meses fuertes. Reforzar tratamientos grandes en las
  clínicas y campañas de regalo/herramienta en Ferro Todo. Preparar desde 2 semanas antes.
- **Enero–febrero**: baja. Bajar pauta, sostener orgánico y remarketing sobre la base existente.
- **Día de la Madre / Día del Padre**: ángulo regalo. Funciona en las cuatro cuentas.
- **Quincena y fin de mes**: los sueldos entran concentrados; vale reforzar esos días.

## Checklist antes de lanzar cualquier campaña

1. ¿El nombre sigue la convención `<MARCA> | <ETAPA> | <línea> | <estructura> | <mes-año>`?
2. ¿Es la cuenta **BOB** y no la USD de la misma marca?
3. ¿La optimización es "conversaciones con mensajes" y no clics ni ThruPlay?
4. ¿La edad quedó como límite duro (casilla "usar como sugerencia" desmarcada)?
5. ¿Hay al menos 4 anuncios distintos de verdad, mezclando imagen y video?
6. ¿Ningún conjunto de esta campaña compite con otro por el mismo público?
7. ¿Si algún creativo se hizo con IA, está declarado?
8. ¿Se abrió la vista previa en Feed, Stories y Reels y se miró con los ojos?
9. ¿Hay alguien del otro lado para contestar en los horarios en que la campaña entrega?
