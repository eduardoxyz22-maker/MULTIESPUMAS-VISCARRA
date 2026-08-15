# Placas dentales — reel Remotion

Reel vertical (1080×1920, 30 fps, 34 s) sobre **placas dentales removibles**
(prótesis parcial), pensado para Instagram / TikTok / estados de WhatsApp.

Hecho con [Remotion](https://remotion.dev). Todo es código: no hay assets
externos ni fuentes descargadas, así que renderiza sin red.

## Composiciones

| Composición                | Marca                          | Acento     |
| -------------------------- | ------------------------------ | ---------- |
| `PlacasDentales-Spadental` | Ezequiel Spadental             | verde lima |
| `PlacasDentales-Cosmetic`  | Cosmetic Dental & Face Center  | dorado     |

Las dos usan el mismo guion y componentes; solo cambia el tema
(`src/theme.ts`).

## Guion (frames a 30 fps)

| Escena       | Frames      | Contenido                                              |
| ------------ | ----------- | ------------------------------------------------------ |
| `Hook`       | 0 – 130     | Hilera de dientes donde una pieza se cae y deja el hueco |
| `Senales`    | 120 – 296   | 4 señales de que vivir con espacios te cuesta          |
| `Solucion`   | 286 – 496   | La placa se dibuja sola: acrílico, dientes y ganchos   |
| `Proceso`    | 486 – 672   | 3 pasos unidos por un riel que se va llenando          |
| `Beneficios` | 662 – 846   | Masticar · sonreír · cuidar los dientes que quedan     |
| `Cta`        | 836 – 1020  | Agenda tu valoración + WhatsApp (botón con ondas)      |

Las escenas se solapan ~10 frames: la que sale se desplaza mientras la que
entra ya está llegando. Los tiempos viven en `TIMELINE`
(`src/PlacasDentales.tsx`) y la dirección de cada transición se pasa como
`dir` a `<Scene>`.

## Animaciones

Todo el movimiento es procedural, sin librerías de animación:

- **`SonrisaHueco`** — hilera de dientes en curva de sonrisa; una pieza se
  afloja, gira, cae y deja un hueco que late.
- **`PlacaRemovible`** — el acrílico se dibuja con `strokeDashoffset`, los
  dientes caen escalonados sobre la arcada, enganchan los ganchos metálicos y
  un destello barre la placa. Después queda flotando e inclinándose apenas.
- **`Particulas`** — puntos de luz que suben en loop (aleatoriedad
  determinista, nunca `Math.random`, que rompería el render por frames).
- **`Background`** — dos manchas de luz que se mueven con seno/coseno.
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
  components/         Background, Particulas, Scene, Icons,
                      PlacaRemovible, SonrisaHueco
  scenes/             Hook, Senales, Solucion, Proceso, Beneficios, Cta
```
