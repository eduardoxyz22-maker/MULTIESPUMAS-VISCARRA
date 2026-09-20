# Rutina operativa — qué mirar, cada cuánto, y qué reportar

Cuatro cuentas. La rutina es la misma para todas; lo que cambia es el criterio.

## Diario (3 minutos por cuenta activa)

```
ads_get_errors(ad_account_id=...)
ads_get_ad_entities(level="campaign", date_preset="yesterday",
  fields=["name","status","amount_spent","results","cost_per_result"])
```

Tres preguntas: ¿hay error que bloquee entrega? ¿gastó lo que debía? ¿el costo por conversación se
salió de su rango?

Si las tres dan bien, **no toques nada**. La mayor fuente de daño en cuentas chicas es el que
edita todos los días y nunca deja aprender al sistema.

## Semanal (30 minutos, las cuatro cuentas) — el que importa

1. **Meta, últimos 7 días**, nivel campaña y conjunto: `amount_spent`, `ctr`, `cpm`, `frequency`,
   `results`, `cost_per_result`.
2. **Opportunity Score de cada cuenta** (`ads_get_opportunity_score`): ¿apareció una recomendación
   nueva? ¿alguna de `fragmentation` o `scale_good_campaign`? Esas dos son las que mueven plata.
3. **Números del negocio**: citas, ventas y monto de la semana. Si el cliente no los da, pedilos —
   sin eso solo estás mirando la mitad del tablero (`references/medicion-cierre.md`).
4. **Calcular CAC por cuenta** y compararlo contra el ticket promedio.
5. **Decidir una sola cosa por cuenta.** Un cambio por semana, medible. No cinco a la vez: después
   no se sabe cuál funcionó.

Diagnóstico por síntoma:

| Lo que ves | Dónde está el problema | Qué hacer |
|---|---|---|
| CPM sube y CTR baja | Creativo cansado | Concepto nuevo, no presupuesto |
| Frecuencia > 3,5 | Público saturado | Creativos nuevos o ampliar público |
| CTR alto, pocas conversaciones | Optimización o promesa del anuncio | Verificar que optimice por conversaciones; revisar si el copy promete lo que el anuncio no cumple |
| Resultados "mixed" | Conjunto con objetivos mezclados | Separarlo. Estás gastando sin poder medir |
| Conjuntos con costo dispar en la misma campaña | Fragmentación | Consolidar |
| Muchas conversaciones, pocas citas | **Seguimiento del negocio** | No es pauta. Decilo igual |
| Todo bien y las ventas caen | Precio, agenda o competencia | `ads_library_search` |

## Mensual (1 hora)

- Cerrar el mes por cuenta: inversión, conversaciones, costo por conversación, citas, ventas, CAC
  y ROAS.
- Comparar contra los dos meses previos. **La tendencia importa más que el valor absoluto.**
- **Rotar creativos**: retirar los de más de 3 semanas, entrar con 3–4 conceptos nuevos.
- Revisar públicos personalizados contra la base actualizada del cliente.
- `ads_account_get_activity_logs`: quién cambió qué durante el mes.
- **Decidir la repartición del próximo mes entre las cuatro cuentas**, con el CAC en la mano.

## Formato de reporte al cliente

Corto, en Bs, y con una decisión al final. Nunca una lista de métricas sin conclusión.

```
📣 PAUTA META — <cuenta> — <mes> (al día <N>)

Inversión:        Bs X
Conversaciones:   N  (Bs Y c/u)
Citas / ventas:   N  /  N   ·  Bs W facturado
CAC:              Bs V por venta   |   ROAS: Kx

🔎 Lo que pasó: <una frase>
⚠️ El cuello de botella: <una frase, con número>
✅ La decisión de la semana: <una sola acción>
```

Si falta el dato de ventas, se dice explícitamente: *"sin datos de cierre del negocio, el CAC no
se puede calcular"*. No se inventa, no se estima en silencio.

## Guardarraíles antes de ejecutar

Estas acciones mueven plata real. **Siempre confirmación explícita, nunca por iniciativa propia:**

- crear, activar o pausar campañas, conjuntos o anuncios
- cambiar presupuestos
- cambiar públicos o geo
- subir o reemplazar creativos

Y después de cada escritura, **una lectura que la confirme**: el conector pausa conjuntos al
editarlos sin avisar.

**Las cuentas espejo (Heaven, MultiEspumas, Sueña) no se tocan nunca.** Son de otra empresa. Se
leen para aprender y nada más.

## Errores ya cometidos — no repetirlos

- Editar un conjunto, que el conector lo deje pausado, y no enterarse hasta días después.
- Afirmar "no hay nada creado" mirando la API mientras el borrador estaba en pantalla.
- Diagnosticar "la página no está vinculada" porque `ads_get_ad_account_pages` volvió vacía.
- Aceptar la sugerencia de Meta de pasar a formularios de clientes potenciales.
- Dejar correr una campaña con resultados "mixed": Bs 4.414 gastados sin costo por resultado
  legible.

Ninguno se repite si se cumple la regla: **verificar siempre después de escribir, y mirar el
tablero completo antes de opinar.**
