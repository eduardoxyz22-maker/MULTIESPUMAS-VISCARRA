# Novedades de Meta 2026 — qué cambió y qué hacer con eso

Relevado el 20/09/2026. Meta cambia rápido: si algo acá contradice lo que muestra el
Administrador de anuncios **hoy**, manda la interfaz. Reverificar cada trimestre.

## 1. Andromeda + GEM — el motor cambió de raíz

**Qué son.** Andromeda es el sistema de *recuperación*: decide qué anuncios son candidatos para
cada persona. **GEM** (*Generative Ads Recommendation Model*) es el de *ranking*: un modelo
fundacional entrenado a gran escala que Meta describe como ~4x más eficiente que los modelos
anteriores. GEM empezó a desplegarse a mediados de 2025 y ya está generalizado.

**Qué cambia en la práctica.** Antes se ganaba afinando segmentación. Ahora se gana dándole al
sistema **materia prima creativa variada** para que él encuentre a quién mostrarle qué.

**Qué hacer:**
- **Diversidad creativa real**: ganchos, dolores, formatos y protagonistas distintos. Cambiar el
  color del botón o el titular **ya no cuenta** como creativo nuevo.
- Apuntar a **8–12 conceptos genuinamente distintos** por campaña, con refresco cada **2–3 semanas**.
- Lo que más diferencia un video: **los primeros 3 segundos**, el protagonista y la estructura
  narrativa.
- Traducción para esta cartera: todas las cuentas corren con pocos creativos. **Ahí hay techo de
  sobra sin gastar un peso más de pauta.**

Fuentes: [Meta for Business — AI innovation in ads ranking](https://www.facebook.com/business/news/ai-innovation-in-metas-ads-ranking-driving-advertiser-performance) ·
[Search Engine Land — Andromeda y GEM](https://searchengineland.com/meta-ai-driven-advertising-system-andromeda-gem-468020)

## 2. Advantage+ unificado (feb 2026)

Meta fusionó el flujo "manual" y el de Advantage+ en **una sola creación de campaña**. Las
automatizaciones (público, ubicaciones, presupuesto, creativo) vienen **prendidas por defecto** y
se apagan una por una.

**Qué hacer:**
- **Dejar prendido**: ubicaciones automáticas siempre; público Advantage+ donde el público amplio
  sirve (Spadental, FERROMARC); presupuesto de campaña cuando hay varios conjuntos comparables.
- **Controlar de cerca** en Cosmetic y Mirna: público angosto y caro, donde Advantage+ abre la
  puerta a gente que escribe y no compra.
- **Revisar una por una las mejoras creativas Advantage+** antes de aceptarlas: hay un
  previsualizador al lado de la opción que muestra el original contra cada modificación. Retoques
  visuales y mejoras de texto suelen sumar; una superposición automática sobre una foto que ya
  tiene el precio escrito la arruina.
- **Nunca aceptar** "cambiar a la configuración recomendada" si afloja la edad o la geo.

Fuentes: [Meta Advantage+ Creative](https://www.facebook.com/business/ads/meta-advantage-plus/creative) ·
[Guía 2026 de Advantage+ Creative](https://adsuploader.com/blog/advantage-plus-creative-enhancements)

## 3. Opportunity Score — el tablero gratis

Puntaje **0–100 por cuenta** que mide cuántas recomendaciones aplicaste, ponderadas por impacto
estimado. Se lee con `ads_get_opportunity_score`.

Estado de la cartera (20/09/2026): **Cosmetic 99 · Mirna 94 · Spadental 90.**

**La trampa**: el score mide obediencia, no rentabilidad. Una recomendación de 1 punto puede valer
+81% de conversiones y una de 6 puntos puede ser cosmética. **Priorizá por el impacto estimado que
trae cada recomendación, no por los puntos.** Y rechazá las que llevan a formularios de clientes
potenciales o a optimizar por clics.

Tipos que aparecen seguido y qué significan de verdad:

| Tipo | Qué dice | Qué hacer |
|---|---|---|
| `fragmentation` | Conjuntos con públicos similares compitiendo entre sí | **Consolidar. Suele ser el de mayor impacto real** |
| `scale_good_campaign` | Una campaña rinde y está sub-financiada | Mover presupuesto ahí, +20–30% semanal |
| `mixed_formats` | Falta mezclar imagen y video en el conjunto | Barato y rápido: duplicar anuncio y cambiar formato |
| `ctx_creation_package` | Falta una campaña CTWA dedicada | Sí, si el negocio vende por WhatsApp |
| `aplusc_standard_enhancements_bundle` | Mejoras creativas automáticas | Revisar una por una en el previsualizador |
| `messaging_events` | Falta mandar eventos de compra de WhatsApp | **Hacerlo. Es la palanca más grande** |

## 4. Señal de conversión: eventos de compra / cita de WhatsApp

Sin esta señal, Meta optimiza hacia *quien escribe*. Con ella, optimiza hacia *quien compra*.
Meta estima hasta **−24% de costo por compra**. Se configura mandando el evento desde WhatsApp
Business o desde el socio de mensajería (un CRM tipo Kommo puede actuar como ese socio).

Contexto general: en 2026 las cuentas que dependen solo del píxel pierden eficiencia frente a las
que mandan señal del lado servidor (**Conversions API**), con deduplicación y eventos de embudo
completo. Para un negocio 100% WhatsApp no hace falta web ni píxel: el equivalente es el evento de
compra de WhatsApp.

**Para esta cartera es la deuda pendiente más grande.** Hoy medimos hasta la conversación y ahí
nos quedamos, en las cuatro cuentas.

## 5. Medición: atribución incremental, lift y MMM

- **Atribución incremental** (ajuste dentro del Administrador): usa grupos de control
  aleatorizados para estimar qué conversiones causó realmente el anuncio, y optimiza hacia las
  incrementales en vez de las fáciles.
- **Pruebas de lift**: grupo expuesto contra grupo retenido. Meta indica resultados confiables en
  2–3 semanas con volumen alto; 6+ semanas con volumen bajo.
- **MMM** integrado al Administrador para decisiones de presupuesto.

**Para esta cartera**: con presupuestos de Bs 1.500–6.000/mes no hay volumen para una prueba de
lift seria. Anotarlo como meta. Mientras tanto, la prueba casera y honesta es **apagar una campaña
una semana y mirar qué pasa con las consultas reales**.

## 6. Divulgación obligatoria de contenido con IA

Si el creativo se **generó o modificó sustancialmente** con IA — imagen generada, fondo
reemplazado, voz sintética, video creado con IA — hay que **declararlo al subir el anuncio**. Meta
detecta metadatos C2PA y artefactos visuales; no declararlo se paga con rechazo y strike.

**Qué hacer**: cualquier creativo hecho con Freepik, Firefly, Cloudinary generativo o similar
lleva la casilla marcada. Un filtro de color o un recorte no cuentan; reemplazar el fondo de una
foto, sí.

> Los detalles de sanción se relevaron en prensa especializada, no en la política oficial. Antes
> de apoyarse en ellos, confirmar en el Centro de ayuda de políticas publicitarias de Meta.

## 7. WhatsApp: precio por mensaje y la ventana gratis de 72 h

- Desde el **1 de julio de 2025** WhatsApp Business cobra **por mensaje**, no por ventana de 24 h.
- Las conversaciones nacidas de un anuncio **CTWA** traen **72 h de mensajería gratuita**.

**Traducción**: responder rápido no es solo mejor conversión, es **más barato**. La ficha que se
contesta al cuarto día sale de la ventana gratis y encima llega fría.

Fuentes: [Guía CTWA 2026 — AsisteClick](https://asisteclick.com/en/blog/click-to-whatsapp-ads-ctwa-conversion-2026/) ·
[Precios WhatsApp Cloud API 2026](https://bluechat.lat/blog/precios-costos-whatsapp-cloud-api-2026)

## 8. Formatos y herramientas que vale probar

- **Generación creativa de Meta**: imagen a video, música con IA, doblaje, variaciones de texto,
  expansión de imagen. Es la forma barata de producir diversidad — con la casilla de IA marcada.
- **Reels verticales 9:16**: la ubicación con mejor costo en estos rubros.
- **Catálogo + Advantage+**: aplica a **FERROMARC**, no a las cuentas de salud. Con el catálogo
  cargado se abren anuncios dinámicos y remarketing por producto visto.
- **Biblioteca de anuncios** (`ads_library_search`): mirar qué pautea la competencia antes de
  decidir ángulo y oferta. Para dental, las clínicas de Equipetrol y del 3er anillo; para Ferro
  Todo, las ferreterías e importadoras locales.

## Qué NO hacer aunque Meta lo sugiera

- **Cambiar a "clientes potenciales"** (formulario) por un cartel de "24% más barato": leads más
  baratos y mucho más flojos.
- **Optimizar por clics en el enlace** en campañas CTWA.
- **THRUPLAY** en campañas con video que buscan conversación.
- **Campañas de seguidores como línea principal.** Compran likes, no consultas.
