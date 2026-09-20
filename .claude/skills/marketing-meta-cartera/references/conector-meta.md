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

1. **`ads_update_entity` PAUSA el conjunto al editarlo.** Devuelve `status_forced_to_paused`.
   Siempre reactivar con `ads_activate_entity` **y verificar con una lectura**. Ya pasó dos veces
   en Spadental: quedó un conjunto apagado sin que nadie se enterara.
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
