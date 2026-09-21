# Medición — del costo por conversación hasta la venta en Bs

Meta te dice lo que **cuesta una conversación**. Nunca te dice lo que **vale**. Ninguna de las dos
cosas, sola, sirve para decidir presupuesto.

## El circuito

```
Inversión (Bs) → Conversación → Respuesta → Cita/cotización → Se presenta → Venta (Bs)
    Meta            Meta          negocio      negocio          negocio       negocio
```

Meta solo ve los dos primeros pasos. **Los cuatro que faltan son los que deciden si la pauta sirve
o no**, y hoy en las cuatro cuentas nos quedamos en el paso 2.

## Las fórmulas

```
Costo por conversación = inversión / conversaciones iniciadas      ← lo que reporta Meta
Tasa de respuesta      = conversaciones contestadas / conversaciones
Tasa de agenda         = citas agendadas / conversaciones contestadas
Show rate              = se presentaron / citas agendadas
Cierre                 = ventas / se presentaron
CAC                    = inversión / ventas
ROAS                   = ingreso atribuible / inversión
```

El único número que importa de verdad: **CAC contra ticket promedio**. Si el CAC es menor que el
ingreso de la primera visita, la pauta se paga sola y hay que escalar. Si no, no hay creativo que
lo salve.

## Por qué el costo por conversación solo engaña

La lección más cara de todas, y sale gratis porque la pagó otro: hay una cuenta espejo en este
mismo conector que compra conversaciones a **~Bs 1** —tres veces más barato que Spadental— y aun
así cierra solo el **2%**, porque el **72% de las fichas queda sin contestar más de 72 horas**.

Puesto en una tabla:

| | Conversación a Bs 1 | Conversación a Bs 6 |
|---|---|---|
| Cierra al 2% | CAC = Bs 50 | CAC = Bs 300 |
| Cierra al 30% | CAC = Bs 3,33 | **CAC = Bs 20** |

**Una conversación cara que se contesta vale más que una barata que se abandona.** Antes de
celebrar los Bs 2,84 de Spadental o de criticar los Bs 13,41 de Mirna, hay que saber qué pasó
después del mensaje.

## En Cosmetic el costo por conversación MIENTE — caso Implantes

Dato del cliente, 21/09/2026. `COS-Implantes-Entrada-17/07` acumuló **393 conversaciones a
Bs 4,31** con CPM de Bs 18,95 — el segundo mejor costo de toda la cuenta. **Se pausó porque no
dejaba paciente en la silla.**

O sea: el conjunto que el tablero de Meta señalaba como uno de los mejores era, en el negocio,
el peor. No es que la métrica sea imperfecta: **está invertida.**

La explicación que encaja: un implante cuesta miles de Bs. Un anuncio que hace barata la
conversación atrae a quien pregunta "¿cuánto sale?" y desaparece con el precio. **Conversación
barata en tratamiento de ticket alto = curioso de precio, no paciente.**

**Reglas que salen de esto:**

1. **Nunca ordenar los conjuntos de Cosmetic por costo por conversación.** Ahí el orden puede
   ser exactamente al revés del orden de rentabilidad.
2. **El patrón NO es "ticket alto = curioso".** Se sospechó de `COS-VENTAS-Carillas-Sep` por
   tener el mismo perfil que Implantes (estético, ticket alto, CTR 3,57%, conversación a
   Bs 5,04) y Eduardo confirmó el 21/09 que **Carillas sí genera pacientes**. O sea que el
   problema era de Implantes en particular, no de la categoría. **No le toques el anuncio a
   Carillas: funciona como está.**
3. **Calificar por precio dentro del anuncio es una prueba, no una regla.** Decir el "desde"
   filtra al curioso antes de que escriba: sube el costo por conversación y mejora el paciente.
   Tiene sentido probarlo donde se repita el patrón de Implantes — conversación barata sin
   paciente — y en ningún otro lado. Nunca sobre un conjunto que ya sienta gente.
4. **Antes de escalar cualquier conjunto de esta cuenta, la pregunta no es cuánto cuesta la
   conversación: es si esa conversación se sienta en el sillón.** Eduardo lo sabe; la API no.

## La pregunta que va ANTES de subir un solo peso

No es cuánto cuesta la conversación. Es **en cuánto tiempo se contesta.**

| | Conversación a Bs 1 (espejo) | Conversación a Bs 2,84 (Spadental) |
|---|---|---|
| Cierra al 2% | **CAC Bs 50** | CAC Bs 142 |
| Cierra al 30% | CAC Bs 3,33 | **CAC Bs 9,47** |

La cuenta espejo compró ~8.000 conversaciones en 90 días y **cerca de 6.000 personas escribieron
sin que nadie les contestara a tiempo** (72% de fichas paradas +72 h). Su costo por conversación
es el mejor de las seis cuentas y su negocio es el peor.

**Ese número —el tiempo de primera respuesta— no lo tenemos para ninguna de nuestras tres
cuentas.** Es el verdadero cuello de botella de la cartera y no está en la pauta.

## Lo que falta montar (la deuda de la cartera)

Ninguna de las cuatro cuentas cierra el circuito hoy. Dos formas de arreglarlo, en orden de
esfuerzo:

**1. Eventos de compra/cita de WhatsApp (lo que sirve para Meta).**
Mandar el evento desde WhatsApp Business o desde el socio de mensajería hace que Meta optimice
hacia *quien compra* y no hacia *quien escribe*. Meta estima hasta **−24% de costo por compra**.
No cuesta presupuesto adicional: es configuración. **Es la palanca más grande disponible.**

**2. Una planilla semanal de 6 columnas (lo que sirve para decidir).**
Mientras el evento no esté, con esto alcanza para calcular CAC de verdad:

| Semana | Cuenta | Inversión Bs | Conversaciones | Citas | Ventas | Monto Bs |
|---|---|---|---|---|---|---|

La llena el negocio, no Meta. Con seis números por semana ya se puede decir en cuál de las cuatro
cuentas conviene poner el próximo peso — que es la pregunta que realmente importa.

## Números que hay que pedirle a cada cliente

Sin esto, cualquier recomendación de presupuesto es opinión:

- **Ticket promedio de la primera visita** y ticket promedio del tratamiento/venta completa.
- **Tasa de cierre en sillón o en mostrador** (de los que llegan, cuántos compran).
- **Quién contesta el WhatsApp, en qué horario**, y en cuánto tiempo.
- **Cuánto factura el negocio al mes** — para chequear que la pauta esté en el 5–10% sano.

## Benchmarks propios (20/09/2026 — reconsultar antes de usar)

| Cuenta | CPM | CTR | Costo/conversación | Frecuencia |
|---|---|---|---|---|
| Spadental — Blanqueamiento | Bs 9,98 | 2,26% | Bs 2,84 | 2,40 |
| Cosmetic — Dental Premium | Bs 24,85 | 2,35% | Bs 5,39 | 2,37 |
| Cosmetic — Capilar | Bs 22,87 | 2,03% | Bs 6,07 | 3,33 ⚠ |
| Mirna — marca personal | Bs 46,93 | 3,30% | Bs 13,41 | 1,84 |
| FERROMARC | — | — | — | sin datos: cuenta virgen |

Rangos de alerta para estos rubros en Bolivia:

- **CTR** < 1% = creativo muerto · > 2% sano · > 3% muy bueno.
- **Frecuencia 30d** > 3,5 = público saturado.
- **Costo por conversación**: Spadental sobre Bs 20 sostenido es alarma; Cosmetic sobre Bs 70
  también, pero por otra razón (público demasiado angosto).
- **Show rate** con recordatorio el día antes y el mismo día: ≥ 80% es lo esperable.
- **Conversación → cita**: 30–40% es sano. Menos que eso, el problema está en quien contesta.
