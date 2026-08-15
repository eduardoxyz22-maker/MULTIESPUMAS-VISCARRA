# Placas dentales — reel Remotion

Reel vertical (1080×1920, 30 fps, 26 s) sobre **placas dentales de descarga**
(bruxismo), pensado para Instagram / TikTok / estados de WhatsApp.

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

| Escena       | Frames    | Contenido                                            |
| ------------ | --------- | ---------------------------------------------------- |
| `Hook`       | 0 – 106   | "¿Amaneces con la mandíbula tensa?"                  |
| `Sintomas`   | 96 – 262  | 4 señales de bruxismo                                |
| `Solucion`   | 252 – 428 | Qué es la placa de descarga + animación diente/placa |
| `Beneficios` | 418 – 606 | Protege el esmalte · alivia tensión · duermes mejor  |
| `Cta`        | 596 – 780 | Agenda tu valoración + WhatsApp                      |

Las escenas se solapan ~10 frames para que los fades encadenen sin negros.
Los tiempos viven en `TIMELINE` (`src/PlacasDentales.tsx`).

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
- El texto es informativo y no promete resultados clínicos; si se agrega una
  promesa o un precio, revisar que cumpla las políticas de salud de Meta.

## Estructura

```
src/
  index.ts            registerRoot
  Root.tsx            las 2 composiciones (formato 1080×1920)
  PlacasDentales.tsx  timeline + marca fija + barra de progreso
  theme.ts            paletas y datos de contacto por clínica
  layout.ts           margen seguro del reel
  anim.ts             helpers de spring / fade / pulse
  components/         Background, Scene (fade), Icons, ToothGuard
  scenes/             Hook, Sintomas, Solucion, Beneficios, Cta
```
