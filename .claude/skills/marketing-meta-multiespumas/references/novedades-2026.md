# Novedades de Meta 2026 — qué cambió y qué hacer con eso

Relevado el 20/09/2026. Meta cambia rápido: si algo acá contradice lo que muestra el
Administrador de anuncios **hoy**, manda la interfaz. Reverificar cada trimestre.

## 1. Andromeda + GEM — el motor cambió de raíz

**Qué son.** Andromeda es el sistema de *recuperación* (decide qué anuncios son candidatos para
cada persona). **GEM** (*Generative Ads Recommendation Model*) es el modelo de *ranking*: un
modelo fundacional entrenado a escala, que Meta describe como ~4x más eficiente que los modelos
anteriores. Empezó a desplegarse a mediados de 2025 y ya está generalizado.

**Qué cambia en la práctica.** Antes, el anunciante ganaba afinando segmentación. Ahora gana
dándole al sistema **materia prima creativa variada** para que encuentre a quién mostrarle qué.

**Qué hacer:**
- **Diversidad creativa real**: ganchos, dolores, formatos y protagonistas distintos. Cambiar el
  color del botón o el titular ya no cuenta como creativo nuevo.
- El consenso de la industria ronda los **8–12 conceptos genuinamente distintos** por campaña,
  con refresco cada **2–3 semanas**.
- Lo que más mueve la aguja al diferenciar un video: **los primeros 3 segundos**, el protagonista
  y la estructura narrativa.
- Traducción para esta cuenta: hay **2 campañas y pocos creativos**. Ahí hay techo de sobra.

Fuentes: [Meta for Business — AI innovation in ads ranking](https://www.facebook.com/business/news/ai-innovation-in-metas-ads-ranking-driving-advertiser-performance) ·
[Search Engine Land — Inside Meta's AI-driven advertising system](https://searchengineland.com/meta-ai-driven-advertising-system-andromeda-gem-468020)

## 2. Advantage+ unificado (feb 2026)

Meta fusionó el flujo "manual" y el de Advantage+ en **una sola creación de campaña**. Las
automatizaciones (público, ubicaciones, presupuesto, creativo) vienen **prendidas por defecto** y
se apagan individualmente.

**Qué hacer:**
- **Dejar prendido**: ubicaciones automáticas, público Advantage+ (acá el público amplio va bien),
  presupuesto de campaña cuando hay varios conjuntos comparables.
- **Revisar una por una las mejoras creativas Advantage+** antes de aceptarlas: hay un previsualizador
  al lado de la opción que muestra el original contra cada modificación. Retoques visuales y
  mejoras de texto suelen sumar; superposiciones automáticas sobre una foto que ya tiene precio
  escrito la arruinan.
- **Nunca aceptar** el cartel de "cambiar a la configuración recomendada" si eso afloja el filtro
  de edad o de geo por sucursal.

Fuentes: [Meta for Business — Advantage+ creative](https://www.facebook.com/business/ads/meta-advantage-plus/creative) ·
[Guía 2026 de Advantage+ Creative](https://adsuploader.com/blog/advantage-plus-creative-enhancements)

## 3. Opportunity Score — el tablero que Meta te regala

Puntaje **0–100** a nivel de cuenta que mide cuántas recomendaciones aplicaste, ponderadas por
impacto estimado. Se lee con `ads_get_opportunity_score`.

**Estado de esta cuenta (20/09/2026): 87/100.** Pendientes, por puntos:

| Recomendación | Puntos | Beneficio estimado por Meta |
|---|---|---|
| Mejoras estándar Advantage+ creativas | 6 | −3% costo por resultado |
| Campaña de mensajes dedicada (CTWA) | 3 | −7% costo por conversación |
| Mezclar formatos imagen + video en el conjunto | 3 | más conversiones por Bs |
| **Compartir eventos de compra de WhatsApp** | 1 | **−24% costo por compra** |

Ojo con la trampa: la de eventos de compra vale **solo 1 punto de score** pero es, de lejos, **la
de mayor impacto real** para este negocio. El score mide obediencia, no rentabilidad. Priorizá
por impacto, no por puntos.

## 4. Señal de conversión: eventos de compra de WhatsApp

Es la palanca #1 disponible hoy. Sin ella, Meta optimiza hacia *quien escribe*. Con ella,
optimiza hacia *quien compra*. Se configura enviando el evento de compra desde WhatsApp Business
o desde el socio de mensajería (Kommo actúa como ese socio).

Contexto general: en 2026 las cuentas que dependen solo del píxel pierden eficiencia frente a las
que mandan señal del lado servidor (**Conversions API**), con deduplicación y eventos de embudo
completo. Para un negocio 100% WhatsApp como este, el equivalente es el evento de compra de
WhatsApp — no hace falta web ni píxel.

## 5. Medición: atribución incremental, lift y MMM

- **Atribución incremental** (ajuste dentro del Administrador): usa grupos de control
  aleatorizados para estimar qué conversiones causó realmente el anuncio, y optimiza hacia las
  incrementales en vez de las fáciles.
- **Pruebas de lift / incrementalidad**: grupo expuesto contra grupo retenido. Meta indica
  resultados confiables en 2–3 semanas con volumen alto; 6+ semanas con volumen bajo.
- **MMM** integrado al Administrador para decisiones de presupuesto.

**Para esta cuenta**: con ~Bs 2.200/mes no hay volumen para una prueba de lift seria. Anotarlo
como meta para cuando la inversión suba. Mientras tanto, la prueba de incrementalidad casera es
**apagar una campaña una semana y mirar los leads de Kommo** — sucia, pero honesta.

## 6. Divulgación obligatoria de contenido con IA

Si el creativo se **generó o modificó sustancialmente** con IA (imagen de producto generada,
fondo reemplazado, voz sintética, video creado con IA), hay que **declararlo al subir el anuncio**.
Meta detecta metadatos C2PA y artefactos visuales. No declararlo se paga con rechazo y strike.

**Qué hacer**: si se usa Freepik, Firefly, Cloudinary generativo o cualquier herramienta de IA
para un creativo de esta cuenta — y se usan — **marcar la casilla siempre**. Un filtro de color o
un recorte no cuentan; reemplazar el fondo de una foto de colchón, sí.

> Esta regla se relevó en prensa especializada, no en la política oficial. Antes de apoyarse en
> los detalles de sanción, confirmar en el Centro de ayuda de políticas publicitarias de Meta.

## 7. WhatsApp: precio por mensaje y la ventana gratis de 72 h

- Desde el **1 de julio de 2025** WhatsApp Business cobra **por mensaje**, no por ventana de
  conversación de 24 h.
- Las conversaciones que nacen de un anuncio **CTWA** traen **72 h de mensajería gratuita**.

**Traducción para esta cuenta**: responder rápido no es solo mejor conversión, es **más barato**.
Cada ficha que se contesta al cuarto día sale de la ventana gratis y encima llega fría. Con 1.239
fichas paradas +72 h, se está pagando el peor de los dos mundos.

Fuentes: [Guía CTWA 2026 — AsisteClick](https://asisteclick.com/en/blog/click-to-whatsapp-ads-ctwa-conversion-2026/) ·
[Precios WhatsApp Cloud API 2026](https://bluechat.lat/blog/precios-costos-whatsapp-cloud-api-2026)

## 8. Formatos y herramientas creativas que vale probar

- **Generación creativa de Meta**: imagen a video, música con IA, doblaje, variaciones de texto,
  expansión de imagen. Barato para producir diversidad — con la casilla de IA marcada.
- **Reels verticales 9:16** siguen siendo la ubicación con mejor costo para este rubro.
- **Catálogo + Advantage+**: esta cuenta **no tiene catálogo cargado**. Con ~15 SKUs de colchón
  (`ads_catalog_create` + `ads_catalog_product_create`) se abren anuncios dinámicos y remarketing
  por producto visto. Es la mejora estructural pendiente más grande después de la señal de compra.
- **Biblioteca de anuncios** (`ads_library_search`): mirar qué están pauteando Heaven, Rosen,
  Sognare y las importadoras locales antes de decidir ángulo y oferta.

## Qué NO hacer aunque Meta lo sugiera

- **Cambiar el objetivo a "clientes potenciales"** (formulario) por un cartel de "24% más barato":
  leads más baratos y mucho más flojos. Para colchones en Bolivia, WhatsApp le gana.
- **Optimizar por clics en el enlace** en campañas CTWA. Trae gente que toca y no escribe.
- **THRUPLAY** en campañas con video que buscan conversación.
- **Campañas de seguidores** como línea principal. En esta cuenta ya consumieron meses de
  presupuesto sin producir una venta medible.
