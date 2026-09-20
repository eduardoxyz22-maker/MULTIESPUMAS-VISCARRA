# Playbook de campañas — estructuras, presupuesto y escalado

Todo en Bs. Mínimo diario de la cuenta: Bs 12,50.

## La estructura que debería tener la cuenta

Hoy hay 2 campañas de mensajes corriendo contra todo. La estructura objetivo son **tres líneas
con trabajos distintos**, que no compiten entre sí:

### Línea 1 — Conversación (el motor) · 60–65% del presupuesto
```
EV | WhatsApp | Sueña | CBO | <año>
├── Charcas    — geo radio 4 km sobre Calle Charcas
├── Mutualista — geo radio 4 km sobre Av. Mutualista
└── Carmelo    — geo radio 4 km sobre Av. Carmelo Ortiz
```
- Objetivo: **Interacción → Mensajes (CTWA)**. Optimización: conversaciones, **no clics**.
- Un conjunto por sucursal: así se sabe qué tienda recibe qué y se puede apagar la que no
  contesta. Hoy es imposible saberlo porque todo entra mezclado.
- Público amplio + edad dura 25–60 · 4–6 anuncios por conjunto, formatos mezclados.

### Línea 2 — Visita a tienda (la mina sin explotar) · 20–25%
```
EV | Visita Tienda | Sueña | ABO | <año>
└── un conjunto por sucursal, radio 3 km, horario comercial
```
- El que pisa la tienda **cierra al 100%** (21/21 en septiembre). No hay ninguna campaña
  empujando eso.
- Creativo: la tienda, el colchón que se puede probar, la dirección y el horario en pantalla.
- Se mide con leads de canal `CALLE/TRANSEUNTE` y con lo que reporten los vendedores.

### Línea 3 — Recompra y referidos (la más barata) · 10–15%
```
EV | Recompra | Sueña | ABO | <año>
└── público personalizado desde la base de Kommo (compradores 12–36 meses)
```
- 26 cierres del mes vinieron de cohortes anteriores. Esa gente ya compró y responde.
- Ángulos: almohadas, protector, segundo colchón, cambio por desgaste, referido con beneficio.
- Se carga con `ads_create_custom_audience` + `ads_update_custom_audience_users`.

### Lo que se apaga
`PRE | Seguidores FB | …` — compra likes. Si se quiere presencia, sale del orgánico, no de pauta.

## Escenarios de presupuesto

| Escenario | Bs/día | Bs/mes | Para qué sirve |
|---|---|---|---|
| Piso técnico | 12,50 | ~375 | Mantener una campaña viva. No aprende. |
| **Actual** | **~112** | **~3.350** | 2 campañas, ~3.100 conversaciones/mes |
| Recomendado corto plazo | ~112 | ~3.350 | **Igual, pero redistribuido en 3 líneas.** No subir hasta arreglar el backlog |
| Escalado sano | 145 | ~4.350 | +30% sobre el actual, con backlog < 400 y 1ª respuesta < 30 min |
| Temporada (dic / aguinaldo) | 200–250 | 6.000–7.500 | Solo con equipo reforzado para contestar |

**La recomendación real hoy no es subir el presupuesto: es repartir el mismo.** Con la
conversión en 2% y 1.239 fichas paradas, cada Bs adicional compra backlog.

## Fase de aprendizaje

- Un conjunto sale de aprendizaje con ~**50 conversiones por semana**. Con conversaciones a
  Bs 1 eso se cumple fácil — es el lujo de esta cuenta y hay que aprovecharlo con conjuntos
  separados por sucursal.
- **Días 1–4 de una campaña nueva: no tocar nada.** Cada edición reinicia el aprendizaje.
- Lectura recién al día 5. Apagar el anuncio perdedor entre el día 7 y el 10, nunca antes.

## Reglas de escalado

- **+20–30% semanal como máximo.** Un salto de 2x reinicia el aprendizaje y sube el CPM.
- Escalar **solo** si el checklist de `loop-meta-kommo.md` da verde.
- Escalar duplicando el conjunto ganador con público nuevo rinde más que subir el presupuesto
  del mismo conjunto cuando la frecuencia ya pasó de 3.
- **Bajar** presupuesto cuando: frecuencia 30d > 3,5 · costo por conversación duplica su media de
  30 días tres días seguidos · el backlog de Kommo crece dos semanas seguidas.

## Cuándo apagar algo

| Señal | Acción |
|---|---|
| Frecuencia > 3,5 en 30 días | Creativos nuevos, no más presupuesto |
| CTR < 1% con más de 5.000 impresiones | Creativo muerto, reemplazar |
| Costo por conversación > Bs 4 sostenido una semana | Revisar público y creativo |
| CAC > Bs 200 por venta | Revisar el embudo entero, no la campaña |
| 0 conversaciones en 3 días con gasto | Revisar `ads_get_errors` y la vista previa |

## Estacionalidad del rubro en Santa Cruz

- **Diciembre (aguinaldo)**: el mes fuerte. Reforzar pauta desde la segunda semana de noviembre.
- **Enero–febrero**: baja. Bajar pauta, sostener orgánico y recompra.
- **Día de la Madre y Día del Padre**: ángulo de regalo, funciona con combos colchón + almohada.
- **Fin de mes / quincena**: los leads de sueldo entran concentrados. Vale subir puja esos días.

## Antes de lanzar cualquier campaña — checklist

1. ¿El nombre sigue la convención `<ETAPA> | <tema> | <marca> | <estructura> | <año>`?
2. ¿La optimización es "conversaciones con mensajes" y no clics ni ThruPlay?
3. ¿La edad quedó como límite duro (casilla "usar como sugerencia" desmarcada)?
4. ¿La geo apunta a la sucursal correcta?
5. ¿Hay al menos 4 anuncios distintos de verdad en el conjunto, mezclando imagen y video?
6. ¿Si algún creativo se hizo con IA, está declarado?
7. ¿Se miró la vista previa abierta, en Feed, Stories y Reels?
8. ¿Hay alguien del otro lado para contestar en los horarios en que la campaña entrega?
