/* 🎯 LAS METAS MÍNIMAS DEL PANEL TIENEN QUE SER EDITABLES Y PERSISTIR.

   El panel dejaba editar en línea solo el OBJETIVO (presupuesto); la meta
   MÍNIMA venía fija de generar.py y no se podía tocar. Ahora la mínima es
   editable igual que el objetivo, guardada aparte en localStorage
   (suena_metas_min_v1) para que una NO pise a la otra.

   ⚠️ LO QUE ESTE TEST CUIDA: que la lógica REAL de panel_template.html
     · lea la mínima de los datos como base,
     · persista y relea el valor editado,
     · el stepper (± 5000) funcione,
     · y que objetivo y mínima usen claves separadas (editar una no toca la otra).

   Se corre:  node tests/test_metamin.js   (desde la raíz del repo) */
const fs = require("fs"), vm = require("vm"), path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "panel_template.html"), "utf8");

function fn(name) {
  const i = src.indexOf("function " + name + "(");
  if (i < 0) throw new Error("no encontré function " + name);
  const b = src.indexOf("{", i); let d = 0, e = -1, ins = false, esc = false, q = "";
  for (let k = b; k < src.length; k++) {
    const c = src[k];
    if (ins) { if (esc) esc = false; else if (c === "\\") esc = true; else if (c === q) ins = false; }
    else { if (c === '"' || c === "'" || c === "`") { ins = true; q = c; } else if (c === "{") d++; else if (c === "}") { d--; if (d === 0) { e = k + 1; break; } } }
  }
  return src.slice(i, e);
}
function chunk(startStr, endStr) {
  const i = src.indexOf(startStr); const e = src.indexOf(endStr, i) + endStr.length;
  return src.slice(i, e);
}

const consts = chunk('const META_KEY = "suena_metas_monto_v1"', "META_STEP = 5000;");
const metaMinOf = chunk("window.metaMinOf = function (name)", "};");
const code = [consts, fn("readMetas"), fn("setMetaVal"), fn("readMetasMin"), fn("setMetaMinVal"), fn("bumpMetaMinVal"), metaMinOf].join("\n");

const store = {};
const sandbox = {
  console,
  localStorage: { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); } },
  CustomEvent: function () {},
  window: { dispatchEvent: () => {}, PANEL_DATA: { team: [{ name: "A", metaMin: 70000, metaMonto: 115000 }, { name: "B", metaMin: 100000, metaMonto: 145000 }] } },
};
sandbox.window.localStorage = sandbox.localStorage;
sandbox.D = { team: sandbox.window.PANEL_DATA.team };
vm.createContext(sandbox);
vm.runInContext(code + "\nglobalThis.__api = { readMetas, setMetaVal, readMetasMin, setMetaMinVal, bumpMetaMinVal, metaMinOf: window.metaMinOf };", sandbox);
const A = sandbox.__api;

let pass = 0, fail = 0;
const chk = (l, c, got) => { c ? pass++ : fail++; console.log((c ? "✓" : "✗"), l, c ? "" : "· got " + JSON.stringify(got)); };

chk("base: readMetasMin lee metaMin de los datos", A.readMetasMin().A === 70000 && A.readMetasMin().B === 100000, A.readMetasMin());
A.setMetaMinVal("A", "90,000");
chk("setMetaMinVal persiste (limpia comas)", JSON.parse(store["suena_metas_min_v1"] || "{}").A === 90000, store["suena_metas_min_v1"]);
chk("readMetasMin refleja el override", A.readMetasMin().A === 90000, A.readMetasMin().A);
chk("metaMinOf('A') devuelve el editado", A.metaMinOf("A") === 90000, A.metaMinOf("A"));
chk("metaMinOf('B') sigue en su base", A.metaMinOf("B") === 100000, A.metaMinOf("B"));
A.bumpMetaMinVal("A", 1);
chk("bumpMetaMinVal +1 = +5000", A.metaMinOf("A") === 95000, A.metaMinOf("A"));
A.bumpMetaMinVal("A", -1);
chk("bumpMetaMinVal -1 vuelve", A.metaMinOf("A") === 90000, A.metaMinOf("A"));
A.setMetaVal("A", "120000");
chk("objetivo y mínima son claves separadas", A.metaMinOf("A") === 90000 && A.readMetas().A === 120000, { min: A.metaMinOf("A"), obj: A.readMetas().A });

console.log(`\n${pass} bien · ${fail} mal`);
process.exit(fail ? 1 : 0);
