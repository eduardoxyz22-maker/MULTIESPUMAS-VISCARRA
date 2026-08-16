# Placas dentales — reel Remotion

Reel vertical (1080×1920, 30 fps, 38 s) sobre **placas dentales removibles**
(prótesis parcial), pensado para Instagram / TikTok / estados de WhatsApp.
El objetivo es captar pacientes: gancho en el primer segundo, promesa visual
(antes/después), cómo se hace, dónde queda y CTA a WhatsApp.

Hecho con [Remotion](https://remotion.dev). Todo es código: la única
dependencia externa es la tipografía, y va embebida en base64, así que
renderiza sin red.

## Composiciones

| Composición                | Marca                          | Acento     |
| -------------------------- | ------------------------------ | ---------- |
| `PlacasDentales-Spadental` | Ezequiel Spadental             | verde lima |
| `PlacasDentales-Cosmetic`  | Cosmetic Dental & Face Center  | dorado     |

Las dos usan el mismo guion y componentes; solo cambia el tema
(`src/theme.ts`).

## Guion (frames a 30 fps)

| Escena         | Frames      | Contenido                                                |
| -------------- | ----------- | -------------------------------------------------------- |
| `Hook`         | 0 – 116     | Una pieza se cae, la cámara se sacude y queda el hueco    |
| `Senales`      | 106 – 242   | 3 señales de que vivir con espacios te cuesta            |
| `Solucion`     | 232 – 492   | Showcase completo de la placa (ver abajo)                |
| `AntesDespues` | 482 – 654   | El hueco se llena y la sonrisa se completa               |
| `Proceso`      | 644 – 800   | 3 pasos unidos por un riel que se va llenando            |
| `Ubicacion`    | 790 – 976   | Mapa con ruta + fachada con pacientes entrando           |
| `Cta`          | 966 – 1136  | Agenda tu valoración + WhatsApp (botón con ondas)        |

Las escenas se solapan ~10 frames: la que sale se desplaza mientras la que
entra ya está llegando. Los tiempos viven en `TIMELINE`
(`src/PlacasDentales.tsx`) y la dirección de cada transición se pasa como
`dir` a `<Scene>`.

## Dirección de arte

Lo que separa esto de una plantilla:

- **Tipografía real.** Inter variable (100–900) embebida en base64 en
  `src/fonts/inter.css`. Sin esto el render cae al stack del sistema
  (DejaVu Sans), que es lo que hace ver amateur cualquier pieza.
- **Escala tipográfica con corrección óptica** (`src/design.ts`): el
  interletrado se cierra a medida que crece el cuerpo.
- **Curvas de animación propias.** Expo-out para entradas en vez de un
  spring genérico: arranca rapidísimo y frena largo. Un spring igual para
  todo es lo que hace que una pieza se sienta "de plantilla".
- **Revelado por máscara** (`Titular`): cada línea sube desde detrás de su
  propio borde, escalonada. No hay fades de texto en todo el reel.
- **Grano, viñeta y fugas de luz** (`Background`): el grano se genera con
  `feTurbulence` en un data URI y solo se mueve el fondo, así que sale
  barato aunque cubra los 1080×1920 de cada frame.
- **Composición editorial**: filas con filete y numeración en vez de
  tarjetas con borde redondeado en todas partes.

## Animaciones

Todo el movimiento es procedural, sin librerías de animación:

- **`SonrisaHueco`** — hilera de dientes en curva de sonrisa. En `modo="cae"`
  una pieza se afloja, gira y cae; en `modo="repara"` la pieza nueva baja al
  hueco y un destello barre la sonrisa completa.
- **`Persona` / `Fachada`** — pacientes caminando (ciclo de marcha con senos)
  que llegan al consultorio y entran. La puerta se abre sola: su apertura es
  la suma de campanas gaussianas centradas en cada persona, así que se abre
  justo cuando alguien llega.
- **`MapaPin`** — mini mapa donde la ruta se dibuja y el pin cae sobre el
  consultorio, con onda en bucle.
- **`PlacaRemovible`** — la escena estrella. Coreografía en frames locales:

  | Frames  | Qué pasa                                                    |
  | ------- | ----------------------------------------------------------- |
  | 0–34    | el acrílico se dibuja con `strokeDashoffset`                |
  | 26–70   | caen los dientes escalonados, cada uno suelta un anillo     |
  | 70–92   | enganchan los ganchos metálicos                             |
  | 60–112  | un destello barre la placa                                  |
  | 100–152 | **la placa se inclina en 3D** (vista oclusal → frontal)     |
  | 122–158 | se dibujan los llamados a las partes                        |
  | 196–246 | acercamiento sobre la placa terminada                       |
  | siempre | flota, se mece, late el halo, orbitan destellos y ondas     |

  El giro 3D sale gratis: toda la geometría se calcula desde una media elipse,
  así que basta animar el radio vertical (`ry`) para que la arcada gire en
  perspectiva y los dientes acompañen solos. La placa además tiene reflejo
  sobre la superficie (el mismo cuerpo, espejado y con máscara de degradado).
  Los dientes llevan silueta anatómica (incisivos planos al frente, molares
  con cúspides atrás), encía festoneada en el cuello y brillo especular.
- **`Corte`** — barrido de color, solo en los dos cambios de capítulo
  (entrada al producto y al cierre): en todos los cortes, cansa.
- Micro-movimiento en iconos, chips y el botón de WhatsApp (ondas que salen
  del botón en bucle).

## Comandos

```bash
npm i
npm run dev     # Remotion Studio (previsualizar y ajustar)
npm run lint    # eslint + tsc
```

Renderizar:

```bash
npx remotion render PlacasDentales-Spadental out/placas-spadental.mp4
npx remotion render PlacasDentales-Cosmetic  out/placas-cosmetic.mp4
```

En este contenedor la descarga de Chrome Headless Shell está bloqueada por el
egress, así que hay que apuntar al Chromium ya instalado:

```bash
npx remotion render PlacasDentales-Spadental out/placas.mp4 \
  --browser-executable=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell
```

## Antes de publicar

- `whatsapp` y `direccion` en `src/theme.ts` son **PLACEHOLDER** (`+591 700 00000`).
  Reemplazar por los datos reales de cada clínica.
- `referencia` (el punto de referencia del mapa) y `promesa` ("te respondemos
  por WhatsApp") también viven en `src/theme.ts`. La promesa se muestra en el
  CTA: solo dejarla si el equipo la puede cumplir.
- El reel no incluye cifras de pacientes ni testimonios: no invento datos. Si
  la clínica tiene números reales, es el mejor lugar para sumar prueba social.
- El texto es informativo y no promete resultados clínicos ni precios; si se
  agrega una promesa o un precio, revisar que cumpla las políticas de salud
  de Meta.
- Los plazos ("prueba y ajuste", "se fabrica a tu medida") no dan una cantidad
  de días a propósito. Si gerencia quiere prometer un plazo, va en
  `src/scenes/Proceso.tsx`.

## Estructura

```
src/
  index.ts            registerRoot
  Root.tsx            las 2 composiciones (formato 1080×1920)
  PlacasDentales.tsx  timeline + marca fija + barra de progreso
  theme.ts            paletas y datos de contacto por clínica
  layout.ts           margen seguro del reel
  anim.ts             helpers de spring / fade / pulse
  design.ts           curvas de animación y escala tipográfica
  fonts/inter.css     Inter variable embebida (OFL)
  components/         Background, Scene, Corte, Titular, Icons,
                      PlacaRemovible, SonrisaHueco, Persona, Fachada, MapaPin
  scenes/             Hook, Senales, Solucion, AntesDespues, Proceso,
                      Ubicacion, Cta
```
