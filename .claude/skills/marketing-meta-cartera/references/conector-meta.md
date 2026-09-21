# El conector de Meta Ads — qué puede, qué no, y dónde muerde

Aprendido a los golpes operando estas cuentas. Leer antes de tocar nada.

## Lo que SÍ puede

- **Leer todo**: campañas, conjuntos, anuncios, insights, series por día (`time_increment: "1"`),
  desgloses (`breakdowns`), y borradores (`object_state: "draft"`).
- **Leer la segmentación completa de un conjunto.** Campo `targeting` a nivel `adset` (alias
  `targeting_spec`): devuelve geo con radio y coordenadas, `age_min`/`age_max`, ubicaciones
  efectivas, `targeting_automation` (Advantage+ y qué dimensiones expande) y `user_age_unknown`.
  Junto con `daily_budget`, `optimization_goal`, `billing_event`, `destination_type` y
  `promoted_object` alcanza para **clonar un conjunto sin pedirle nada al usuario**.
  ⚠️ Los subcampos sueltos (`geo_locations`, `age_min`) **no** existen como campo propio: hay que
  pedir `targeting` entero. Verificado el 20/09/2026 en Spadental — una nota vieja decía que no se
  podía leer y era falsa.
- `ads_get_opportunity_score` → puntaje 0–100 por cuenta y recomendaciones priorizadas, cada una
  con su impacto estimado. **Mirarlo en cada revisión semanal: es gratis.**
- `ads_insights_advertiser_context` → cómo clasifica Meta el negocio y en qué etapa del embudo
  está el gasto.
- `ads_insights_auction_ranking_benchmarks` → rankings de calidad, interacción y conversión, con
  la cohorte y el evento exacto donde cayó cada conjunto.
- `ads_insights_industry_benchmark` → comparación contra anunciantes similares.
- `ads_insights_anomaly_signal` → saltos raros de métrica.
- `ads_get_errors` → lo que bloquea entrega.
- `ads_get_ad_preview` → vista previa real por ubicación. **Usar siempre para verificar.**
- `ads_library_search` → qué está pauteando la competencia.
- **Crear**: campañas, conjuntos (`ads_create_ad_set`), creativos, anuncios, públicos
  personalizados, catálogos y feeds de producto.
- **Modificar**: `ads_update_entity` (presupuesto, nombre, estado) · `ads_activate_entity`.
- `ads_account_get_activity_logs` → quién cambió qué y cuándo.

## Trampas verificadas — cada una costó tiempo o casi costó plata

1. **`ads_update_entity` PAUSA el conjunto al editarlo — a veces.** Devuelve
   `status_forced_to_paused`. Siempre reactivar con `ads_activate_entity` **y verificar con una
   lectura**. Ya pasó dos veces en Spadental: quedó un conjunto apagado sin que nadie se enterara.
   **Es inconsistente y no se puede predecir**: el 21/09/2026 el mismo cambio de presupuesto
   pausó el conjunto en Spadental (`true`) y no lo pausó en Cosmetic (`false`), con minutos de
   diferencia. Por eso la verificación no es opcional aunque la respuesta diga que no pausó.
2. **Los borradores no existen para una consulta `live`.** Usar `object_state: "draft"` o
   preguntar. **"No aparece" ≠ "no existe"** — ya se afirmó "no hay nada creado" mirando la API
   mientras el borrador estaba en pantalla.
3. **`ads_get_ad_account_pages` solo lista páginas PROMOCIONADAS.** Devuelve vacío si la cuenta no
   tiene anuncios corriendo, aunque la página esté perfectamente vinculada. **Vacío ≠
   desvinculada.** Para la verdad: `ads_get_pages_for_business`.
4. **`ads_get_ad_images` devuelve solo hash y name** si no le pasás `hashes`. Pasar `fields` sin
   `hashes` no sirve.
5. **Las etiquetas de optimización son inconsistentes.** `REPLIES` y `CONVERSATIONS` son lo mismo,
   y para el mismo conjunto sin tocarlo puede salir una u otra. En la interfaz se llama
   **"Maximizar el número de conversaciones con mensajes"** — `REPLIES` no aparece ahí, no la busques.
6. **La vista previa reporta campos vacíos que sí están.** Puede devolver `body: ""` y
   `link_url: ""` con el anuncio completo. **Abrir la `preview_url` y mirarla.**
   **La captura de un anuncio con video suele salir en negro**, porque el reproductor no arrancó
   todavía: el video reproduce bien al darle play. No es un defecto del creativo y no hay que
   reportarlo como problema — verificado el 20/09/2026 en Spadental, donde dos de tres capturas
   salieron negras y los tres videos estaban sanos. Sale inconsistente: el mismo llamado puede
   renderizar un frame real en un anuncio y negro en otro.
7. **El objetivo de optimización de un conjunto ya creado no se cambia.** Queda fijo. Si está mal,
   se duplica el conjunto: en el borrador sí es editable.
8. **La campaña es el interruptor maestro.** Con la campaña pausada no entrega nada aunque el
   conjunto y los anuncios estén activos. Es una buena red de seguridad al armar.
9. **Resultados "mixed"**: si un conjunto mezcla objetivos, Meta no reporta costo por resultado.
   Le pasa hoy a una campaña de Spadental con Bs 4.414 gastados. **Gastar sin poder medir es lo
   mismo que no gastar.**
10. **`ads_get_ig_accounts` no está habilitada en todas las cuentas** — Meta la libera de a poco.

11. **Al crear un conjunto, Meta le mete defaults que vos no pediste.** Verificado el 20/09/2026
    creando `SPA-VENTAS-Servicios-Mutualista`: se pidió solo geo + edad + `advantage_audience: 1`,
    y volvió además con `targeting_optimization: "expansion_all"` y `user_age_unknown: true`.
    También convirtió `age_min`/`age_max` en `age_min_suggestion`/`age_max_suggestion`, porque con
    Advantage+ la edad es sugerencia y no tope. **Para edad dura hay que mandar
    `targeting_automation.advantage_audience: 0` explícito.**
12. **Las ubicaciones efectivas de un conjunto nuevo pueden no coincidir con las del que clonaste.**
    En el mismo caso, el conjunto nuevo salió sin `messenger` en `effective_publisher_platforms`
    aunque el conjunto de origen sí lo tenía. Se derivan del destino y de la configuración de la
    página, no de lo que mandaste. **Verificar en la interfaz antes de activar.**

13. **`last_30d` te hace afirmar que algo "nunca corrió".** Un conjunto que gastó en julio sale
    con Bs 0 en una consulta de 30 días. **Antes de decir que algo no se probó, consultá
    `date_preset: "maximum"`.** Pasó el 20/09/2026 con `COS-Diseno-Sonrisa-16/07`: se reportó
    "nunca se prendió" cuando había gastado Bs 515,22 y traído 55 conversaciones a Bs 9,37 — el
    peor costo de la cuenta. El cliente lo sabía y el agente no.

14. **Una sola cuenta no prueba nada: usá las otras como grupo de control.** La cartera tiene
    cuatro cuentas en la misma plaza. Antes de atribuirle a un cambio la subida o bajada de una
    métrica, **corré la misma serie diaria en las otras cuentas y en las mismas fechas.** Si se
    mueven todas, es el mercado de Santa Cruz; si se mueve una sola, es la cuenta. Es gratis y
    evita el error más caro de todos: explicar con una causa interna algo que fue estacional.
    Verificado el 21/09/2026: un pico de CPM que se había atribuido a canibalización en Cosmetic
    resultó ser ×1,6–1,8 en las TRES cuentas a la vez, ventana de Expocruz.
    Lo mismo vale para comparar antes/después de un cambio: **si los dos períodos no son las
    mismas fechas, no son comparables.** Un supuesto −25% por consolidar en Mirna era, en
    realidad, la caída general del CPM de la cuenta entre esos dos períodos.

15. **El Opportunity Score NO detecta canibalización entre conjuntos.** Su alerta
    `fragmentation` compara definiciones de público parecidas, no colisión real en la subasta.
    Su alerta `fragmentation` compara definiciones de público parecidas, no colisión real en la
    subasta, así que **nunca digas "Meta no ve que compitan, entonces no compiten"**. Pero la
    prueba tampoco es el CPM de una cuenta sola — ver el punto 14. Es la serie diaria de CPM de
    la cuenta **contrastada con las otras cuentas de la cartera**:
    `ads_get_ad_entities(level="ad_account", time_increment="1", fields=["cpm","impressions"])`.
    Correrla cada vez que se prende o se apaga un conjunto, y antes de sumar uno nuevo.

16. **El Opportunity Score correlaciona AL REVÉS con el rendimiento real.** Medido el
    21/09/2026 sobre las seis cuentas del conector:

    | Cuenta | Score | Bs por conversación |
    |---|---|---|
    | MultiEspumas (espejo) | **87** | **Bs 0,82** |
    | Heaven (espejo) | **87** | Bs 2,65 |
    | Spadental | 90 → 100 | Bs 2,53 |
    | Mirna | 96 | Bs 12,98 |
    | Cosmetic | **99** | Bs 5,51 |

    Las dos cuentas más baratas de todas tienen el peor puntaje; la más cara de las nuestras
    tiene 99. **El score mide cuántas recomendaciones aceptaste, y aceptarlas todas no es lo
    mismo que rendir.** Sirve para detectar configuración rota (fragmentación, formatos, señal
    de conversión). No sirve para decir si una cuenta va bien ni para decidir presupuesto.

## Carteles de la interfaz que hay que rechazar

- **"Puedes obtener un costo por cliente potencial un 24% más bajo si actualizas tu objetivo"** →
  lleva a formularios de clientes potenciales. El número es cierto y **esa es la trampa**: leads
  más baratos y mucho más flojos. Para salud y para servicios locales en Bolivia, WhatsApp gana.
- **THRUPLAY recomendado** en campañas con video → optimiza para que miren, no para que escriban.
- **"Maximizar el número de clics en el enlace"** es el default y el peor de los tres para CTWA.
  Ya pasó: el carrusel de Spadental tuvo el mejor CTR de su conjunto (2,90%) y **cero
  conversaciones**. La gente tocaba y no escribía.
- **"Cambiar a la configuración recomendada"** → deshace los controles duros de público y devuelve
  la edad a "sugerencia".

## Público: qué es límite duro y qué es decoración

**Límites DUROS** (Meta los respeta incluso con Advantage+):
- Ubicación.
- **Edad mínima**, pero solo desde "Limitar aún más tu público" → "Llegar a un público
  restringido", con la casilla **"Usar como sugerencia" DESMARCADA**.
- La casilla **"Incluir personas en WhatsApp cuya edad se desconoce"** también hay que
  desmarcarla, o el filtro de edad se afloja solo.

**Decoración** (Advantage+ los ignora): el rango de edad sugerido, el sexo y la segmentación
detallada por intereses. Meta lo dice explícito: *"también llegaremos a personas fuera de la
configuración que definiste si es probable que mejore el rendimiento"*.

**Criterio por cuenta:**
- **Spadental** (público amplio, servicio masivo): Advantage+ funciona. Dejarlo trabajar.
- **Cosmetic** (público angosto y caro): Advantage+ es un riesgo — infla la estimación y deja
  entrar gente que escribe gratis y no compra. Controlar con límites duros.
- **Mirna**: el CPM alto ya avisa que el público es angosto. Advantage+ acá abre, no cierra.
- **FERROMARC**: es el único rubro donde **sí** se puede segmentar por interés y comportamiento
  sin restricción de salud. Aprovechalo.

## Dónde está la biblioteca de imágenes

**NO** es Business Suite → Biblioteca multimedia (esa es de contenido orgánico y la cuenta
publicitaria no la ve). **La correcta**: Administrador de anuncios → cuenta correcta → subir la
imagen desde el paso del creativo mientras se arma el anuncio.

**Renombrar los archivos ANTES de subir.** `WhatsApp Image 2026-09-20 at 13.08` no sirve para
reportar nada. Usar `SPA-Blanqueamiento-01`, `COS-Implantes-01`, `FER-Taladro-Bosch-01`.

## Flujo seguro para crear una campaña

1. `ads_create_campaign` **sin** presupuesto de campaña (para que lo tenga el conjunto) y
   **pausada**.
2. `ads_create_ad_set`: destino WhatsApp, optimización de conversaciones, geo, edad dura,
   presupuesto en Bs.
3. `ads_create_creative` + `ads_create_ad`.
4. `ads_get_ad_preview` en Feed, Stories y Reels → **abrir la URL y mirarla**.
5. Mostrarle la vista previa al usuario y **esperar sí explícito**.
6. `ads_activate_entity` en los tres niveles: campaña, conjunto, anuncios.
7. `ads_get_ad_entities` para confirmar que quedó activo con el presupuesto correcto.

## Regla de oro

**Verificar siempre después de escribir.** Cada `ads_update_entity` y cada `ads_create_*` se
confirma con una consulta. El conector hace cosas que no pide nadie (pausar al editar) y reporta
cosas que no son (campos vacíos, páginas ausentes). No des por hecho lo que devuelve.
