/* 👯 LA TABLA DE DUPLICADOS DEL PANEL TIENE QUE DECIR CUÁL FICHA ES DE QUIÉN.

   Misma falla que la del aviso de duplicadas de pedidos de Heaven, en este panel: la tabla decía «Fernando Peinado Charcas · Mauricio Merida» en una columna y
   «Visita · COMPRO» en otra, y no había forma de saber cuál ficha era
   de quién sin abrir las dos en Kommo. Y con un solo vendedor mostraba su nombre
   una sola vez, que se leía como si el duplicado fuera con otra persona.

   ⚠️ LO QUE ESTE TEST CUIDA: que la tabla alcance para resolverlo sin salir a buscar,
   y que separe los dos casos, porque NO son el mismo problema:
     · Choque         → dos vendedores sobre el mismo cliente (disputa de cartera).
     · Auto-duplicado → un vendedor duplicando su propia ficha (forma de registrar).

   Arma un panel con el template de verdad y datos de mentira, y lo mira en Chromium.

   Se corre:  node tests/test_paneldup.js   (desde la raíz del repo) */
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path'), os = require('os');
let PASS = 0, FAIL = 0;
const chk = (l, c, e) => { c ? PASS++ : FAIL++; console.log((c ? '✓' : '✗'), l, e != null ? ('· ' + e) : ''); };

const RAIZ = path.join(__dirname, '..');

const DATOS = {
  month: "Agosto", year: 2026, prevMonth: "Julio", curDay: 31, daysInMonth: 31,
  updated: "31/08 15:45", archives: [{ label: "Agosto 2026", url: "#" }],
  kommoBase: "https://gerenciamultiespumasviscarra.kommo.com",
  global: { leads: 100, prevLeads: 90, cierres: 10, pipeline: 1000, cerrado: 900, ticket: 90, unidades: 11 },
  metrics: {
    promPrimera: "10 min", promPrimeraMin: 10, respWeekly: [1, 1, 1, 1, 1], respPct: 90,
    noResp: 5, noRespPct: 5, backlog: 10, backlogPct: 10, criticos7d: 2, nuncaTocados: 0,
    sinSucursalFichas: 0, sinSucursalPct: 0, abiertosSinValor: 3, abiertosSinValorPct: 3,
    duplicadosTel: 2, duplicadosFichas: 4, duplicadosChoques: 1, duplicadosAuto: 1,
    interesado: 1, agendado: 1, cotizaciones: 1, leadsEnHorario: 50, leadsFueraHorario: 50,
    leadsHorarioPorSuc: [], leadsEnHorarioFijo: 50, leadsFueraHorarioFijo: 50
  },
  dupRows: [
    { phone: "+591 70407799", phoneNorm: "70407799", fichas: 2, tipo: "Choque",
      vendedoras: "Fernando Peinado Charcas · Mauricio Merida", etapas: "Visita · COMPRO",
      leadIds: [38575888, 38956404], estado: "Fusionar",
      detalle: [{ id: 38575888, vend: "Fernando Peinado Charcas", etapa: "Visita" },
                { id: 38956404, vend: "Mauricio Merida", etapa: "COMPRO" }] },
    { phone: "77099803", phoneNorm: "77099803", fichas: 2, tipo: "Auto-duplicado",
      vendedoras: "Alberto Pareja", etapas: "COMPRO",
      leadIds: [33803894, 33804426], estado: "Fusionar",
      detalle: [{ id: 33803894, vend: "Alberto Pareja", etapa: "COMPRO" },
                { id: 33804426, vend: "Alberto Pareja", etapa: "COMPRO" }] }
  ],
  leadsMomPct: 11,
  // el panel calcula la que más cierra sobre D.team, así que no puede ir vacío
  team: [{ ini: "FP", name: "Fernando Peinado Charcas", suc: "Calle Charcas", color: "#00B5AD", leads: 50, cierres: 6 },
         { ini: "AP", name: "Alberto Pareja", suc: "Av. Mutualista", color: "#D98300", leads: 50, cierres: 4 }],
  funnel: [], funnel2: [], stagesGlobal: [], stagesByV: {},
  origin: [], channels: [], lossReasons: [], backlogRows: [], alerts: [],
  nav: [{ id: "resumen", label: "Resumen" }, { id: "datos", label: "Datos" }],
  productos: { total: 0, conProducto: 0, sinProducto: 0, items: [] }, history: [], wsp: {}
};

(async () => {
  const tpl = fs.readFileSync(path.join(RAIZ, 'panel_template.html'), 'utf8');
  const html = tpl.replace('__PANEL_DATA__', 'window.PANEL_DATA = ' + JSON.stringify(DATOS) + ';');
  const tmp = path.join(os.tmpdir(), 'panel_dup_viscarra.html');
  fs.writeFileSync(tmp, html);

  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1500, height: 1000 } });
  const errors = []; page.on('pageerror', e => errors.push(e.stack || e.message));
  // la tabla de duplicados vive en la vista "Datos"; el panel recuerda la vista en
  // localStorage, así que se abre ahí directo sin pasar por el resumen
  await page.addInitScript(() => localStorage.setItem('heaven_view', 'datos'));
  await page.goto('file://' + tmp);
  await page.waitForTimeout(1400);
  chk('la vista de calidad de datos abre', /Salud del CRM|Duplicados/i.test(await page.evaluate(() => document.body.innerText)));

  const txt = await page.evaluate(() => document.body.innerText);

  chk('el panel carga sin errores de JavaScript', errors.length === 0, errors[0]);
  chk('la tabla tiene la columna que dice de quién es cada ficha', /Qui[eé]n tiene cada ficha/i.test(txt));

  // ── el choque: las dos vendedoras Y su etapa, cada una en su renglón ──
  chk('el choque se marca como Choque', /Choque/.test(txt));
  chk('y aclara que son dos vendedores', /dos vendedores/.test(txt));
  chk('nombra a Fernando con SU etapa', /Fernando Peinado Charcas\s*·\s*Visita/.test(txt), txt.match(/Fernando[^\n]*/));
  chk('nombra a Mauricio con SU etapa', /Mauricio Merida\s*·\s*COMPRO/.test(txt), txt.match(/Mauricio[^\n]*/));

  // ── el auto-duplicado: no se lee como si fuera con otra persona ──
  chk('el vendedor que se duplica solo se marca Auto-duplicado', /Auto-duplicado/.test(txt));
  chk('y aclara que es el mismo vendedor', /el mismo vendedor/.test(txt));
  const pareja = (txt.match(/Alberto Pareja/g) || []).length;
  chk('Alberto Pareja aparece una vez por cada ficha suya, no una sola', pareja >= 2, pareja + ' veces');

  // ── cada nombre lleva a SU ficha, no todos a la primera del grupo ──
  const hrefs = await page.evaluate(() =>
    [...document.querySelectorAll('a.lead-link')].map(a => a.getAttribute('href')));
  chk('el nombre de cada vendedor abre su propia ficha',
    hrefs.includes('https://gerenciamultiespumasviscarra.kommo.com/leads/detail/38575888') &&
    hrefs.includes('https://gerenciamultiespumasviscarra.kommo.com/leads/detail/38956404'),
    hrefs.join(' '));

  // ── el resumen de la tarjeta separa los dos casos ──
  chk('el encabezado dice cuántos son choques y cuántos auto-duplicados',
    /1 es un choque entre dos vendedores/.test(txt) &&
    /1 es el mismo vendedor duplicando su propia ficha/.test(txt));
  chk('la nota al pie avisa que el número se compara normalizado', /normalizado/.test(txt));

  await browser.close();
  console.log(`\n${PASS} bien · ${FAIL} mal`);
  process.exit(FAIL ? 1 : 0);
})();
