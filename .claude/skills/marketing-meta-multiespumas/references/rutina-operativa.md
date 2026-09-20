# Rutina operativa — qué mirar, cada cuánto, y qué reportar

## Diario (3 minutos)

```
ads_get_errors(ad_account_id="3475940726049285")
ads_get_ad_entities(level="campaign", date_preset="yesterday",
  fields=["name","status","amount_spent","results","cost_per_result"])
```

Tres preguntas: ¿hay algún error que bloquee entrega? ¿gastó lo que debía gastar? ¿el costo por
conversación se salió del rango (Bs 0,90–2,50)?

Si las tres dan bien, no toques nada. La mayor fuente de daño en cuentas chicas es el que edita
todos los días y nunca deja aprender al sistema.

## Semanal (20 minutos) — el que importa

1. **Meta, últimos 7 días**, nivel campaña y conjunto:
   `amount_spent`, `ctr`, `cpm`, `frequency`, `results`, `cost_per_result`.
2. **Panel de ventas**: correr el bloque de `loop-meta-kommo.md` y anotar leads de Facebook Ads,
   cierres, backlog +72 h y tiempo de 1ª respuesta por sucursal.
3. **Calcular el circuito completo**: tasa de registro, costo por lead en CRM, CAC, ROAS.
4. **Opportunity Score**: `ads_get_opportunity_score` — ver si apareció una recomendación nueva.
5. **Decidir una sola cosa.** Un cambio por semana, medible. No cinco a la vez: después no se
   sabe cuál funcionó.

Diagnóstico por síntoma:

| Lo que ves | Dónde está el problema | Qué hacer |
|---|---|---|
| CPM sube y CTR baja | Creativo cansado | Concepto nuevo, no presupuesto |
| CTR alto y pocas conversaciones | Optimización o promesa del anuncio | Verificar que optimice por conversaciones; revisar si el copy promete algo que el anuncio no cumple |
| Muchas conversaciones y pocos leads en Kommo | Integración o duplicados | Revisar tasa de registro y el detector de duplicados |
| Muchos leads y pocos cierres | **Seguimiento** | Backlog y tiempos de respuesta — no es pauta |
| Frecuencia > 3,5 | Público saturado | Creativos nuevos o ampliar geo |
| Todo bien y las ventas caen | Precio, stock o competencia | `ads_library_search` para ver qué está ofreciendo la competencia |

## Mensual (1 hora)

- Cerrar el mes: inversión total, conversaciones, leads, cierres, CAC, ROAS **con el carry de
  cohortes anteriores incluido**.
- Comparar contra los dos meses previos con `history` de `PANEL_DATA`.
  Referencia: Jul-26 conversión 7,3% · Ago-26 5,8% · Sep-26 5,8% (parcial al día 20).
  **La conversión viene cayendo. Es la métrica a vigilar, no el costo por conversación.**
- Rotar creativos: retirar los que llevan más de 3 semanas, entrar con 3–4 conceptos nuevos.
- Revisar públicos personalizados contra la base actualizada de Kommo.
- Revisar `ads_account_get_activity_logs` — quién cambió qué durante el mes.

## Formato de reporte a gerencia

Corto, en Bs, y con una decisión al final. Nunca una lista de métricas sin conclusión.

```
📣 PAUTA META — <mes> (al día <N>)

Inversión:        Bs X
Conversaciones:   N  (Bs Y c/u)
Leads en CRM:     N  (tasa de registro Z%)
Ventas del canal: N  ·  Bs W cerrado
CAC:              Bs V por venta   |   ROAS: Kx

🔎 Lo que pasó: <una frase>
⚠️ El cuello de botella: <una frase, con número>
✅ La decisión de la semana: <una sola acción>
```

## Guardarraíles antes de ejecutar

Estas acciones cambian plata real. **Siempre confirmación explícita, nunca por iniciativa propia:**

- crear, activar o pausar campañas, conjuntos o anuncios
- cambiar presupuestos
- cambiar públicos o geo
- subir o reemplazar creativos

Y después de cada escritura: **una lectura que la confirme.** El conector pausa conjuntos al
editarlos sin avisar.

## Errores que ya se cometieron en cuentas de este mismo usuario

- Editar un conjunto, que quede pausado por el conector y no darse cuenta hasta días después.
- Afirmar "no hay nada creado" mirando la API mientras el usuario tenía el borrador en pantalla.
- Diagnosticar "la página no está vinculada" porque `ads_get_ad_account_pages` volvió vacía.
- Aceptar la sugerencia de Meta de pasar a formularios de clientes potenciales: leads más
  baratos y mucho más flojos.

Ninguno se repite si se cumple la regla: **verificar siempre después de escribir.**
