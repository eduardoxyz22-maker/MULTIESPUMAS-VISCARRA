/* 🎄 EL TEMA DE NAVIDAD EN EL DASHBOARD DE SUEÑA (27/10/2026; el dueño, por la Navidad del panel de Heaven: «arranca»). Es el
   mismo bloque que el dashboard de Heaven (repo MULTIESPUMAS, bitácora §4nc) con los ajustes de la marca en TEXTO, como el de
   Halloween: solo apariencia, y solo en diciembre con la fecha de Bolivia (UTC−4). Se prende el 1/12 a las 00:00 y se apaga
   solo el 1/1. La prueba arma el dashboard como generar.py (la plantilla con el bloque de datos del index.html publicado) y
   mira la caja de la marca de pino con el 🎄, la guirnalda y el ítem elegido del menú en verde, en tema claro y oscuro, con el
   aparato en UTC; y que en octubre siga Halloween y en noviembre no haya ninguno.

   Se corre:  node tests/test_navidad.js      Dientes: TEMPLATE=/ruta/panel_template_viejo.html node tests/test_navidad.js */
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path'), fs = require('fs'), os = require('os');
let PASS=0, FAIL=0;
const chk=(l,c,extra)=>{ c?PASS++:FAIL++; console.log((c?'✓':'✗'), l, extra!=null?('· '+(typeof extra==='string'?extra:JSON.stringify(extra))):''); };
const TEMPLATE = process.env.TEMPLATE || path.resolve('panel_template.html');

function armarDashboard(){
  const idx = fs.readFileSync(path.resolve('index.html'), 'utf8');
  const m = idx.match(/window\.PANEL_DATA\s*=\s*(\{[\s\S]*?\});/);
  const tpl = fs.readFileSync(TEMPLATE, 'utf8');
  const f = path.join(os.tmpdir(), 'test_navidad_dash.html');
  fs.writeFileSync(f, tpl.replace('__PANEL_DATA__', 'window.PANEL_DATA = ' + m[1] + ';'));
  return f;
}

(async () => {
  const browser = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args:['--no-sandbox'] });
  const errores=[];
  const dash = armarDashboard();
  const tablero = async (cuando, tema) => {
    const page = await browser.newPage({ viewport:{ width:1300, height:700 }, timezoneId:'UTC' });
    page.on('pageerror', e=>errores.push(e.message));
    await page.route(/^https?:/, r=>r.abort());
    await page.clock.setFixedTime(new Date(cuando));
    if (tema) await page.addInitScript(t => { try{ localStorage.setItem('heaven_theme', t); }catch(e){} }, tema);
    await page.goto('file://' + dash, { waitUntil:'load' });
    await page.waitForTimeout(1500);
    const out = await page.evaluate(() => {
      var b=document.querySelector('.rail .brand'), a=document.querySelector('.rail .ni.active'), h=b && b.querySelector('.h');
      return { nav:document.documentElement.classList.contains('tema-navidad'), hw:document.documentElement.classList.contains('tema-halloween'),
               oscuro:document.documentElement.getAttribute('data-theme')==='dark',
               arbol:b?getComputedStyle(b,'::before').content:'', guirnalda:b?getComputedStyle(b,'::after').backgroundImage:'',
               fondo:b?getComputedStyle(b).backgroundImage:'', menu:a?getComputedStyle(a).backgroundImage:'',
               multi:h?getComputedStyle(h).color:'', datos:!!document.querySelector('.rail .ni') };
    });
    await page.close();
    return out;
  };
  console.log('\n── Dashboard de Sueña: Navidad solo en diciembre ──');
  let r = await tablero('2026-12-10T10:00:00-04:00');
  chk('10/12, tema claro: la caja de la marca de pino con el 🎄', r.nav && !r.hw && /🎄/.test(r.arbol) && /11, 59, 44/.test(r.fondo), [r.nav, r.arbol, r.fondo.slice(0,60)]);
  chk('…la guirnalda de luces arriba y MULTI en blanco', /svg/.test(r.guirnalda) && /255, 255, 255/.test(r.multi), [r.guirnalda.slice(0,40), r.multi]);
  chk('…y el ítem elegido del menú en verde', /21, 128, 61/.test(r.menu), r.menu.slice(0,80));
  r = await tablero('2026-12-10T10:00:00-04:00', 'dark');
  chk('10/12, tema oscuro: igual', r.oscuro && r.nav && /🎄/.test(r.arbol) && /11, 59, 44/.test(r.fondo), [r.oscuro, r.nav]);
  r = await tablero('2026-12-01T00:01:00-04:00');
  chk('1/12 a las 00:01 de Bolivia (04:01 UTC): ya es Navidad', r.nav, r.nav);
  r = await tablero('2026-12-31T23:59:00-04:00');
  chk('31/12 a las 23:59 de Bolivia (03:59 UTC del 1/1): sigue', r.nav, r.nav);
  r = await tablero('2027-01-01T00:01:00-04:00');
  chk('1/1: el dashboard como siempre (sin 🎄, sin el pino)', !r.nav && !r.hw && !/🎄/.test(r.arbol) && !/11, 59, 44/.test(r.fondo) && r.datos, [r.nav, r.arbol]);
  r = await tablero('2026-11-15T10:00:00-04:00');
  chk('15/11: ninguno de los dos temas', !r.nav && !r.hw && r.datos, [r.nav, r.hw]);
  r = await tablero('2026-10-15T10:00:00-04:00');
  chk('15/10: sigue Halloween, no Navidad', r.hw && !r.nav, [r.hw, r.nav]);
  chk('sin errores de la página', errores.length===0, errores);
  await browser.close();
  console.log('\n'+PASS+' bien · '+FAIL+' mal');
  process.exit(FAIL?1:0);
})().catch(e=>{ console.error(e); process.exit(1); });
