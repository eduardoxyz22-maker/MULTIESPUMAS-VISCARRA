# MultiEspumas Viscarra — Dashboard de Ventas

Panel comercial automático del embudo de ventas de **MultiEspumas · Viscarra**,
alimentado en vivo desde **Kommo CRM** y publicado en **GitHub Pages**.

- **URL** (una vez publicado): `https://<usuario>.github.io/<repo>/`
- **Mes en curso**: `index.html` (se regenera solo 2×/día).
- **Meses cerrados**: botón *Historial* → `panel_YYYY_MM.html`.

Detalles de arquitectura, credenciales, etapas del pipeline y gotchas en
[`CLAUDE.md`](CLAUDE.md).

## Puesta en marcha (una sola vez)

1. Crear el repo en GitHub y subir estos archivos.
2. **Settings → Secrets and variables → Actions → New repository secret**:
   `KOMMO_TOKEN_VISCARRA` = token long-lived de la integración de Kommo.
3. **Settings → Pages → Build and deployment → Source: Deploy from a branch →
   Branch: `main` / root**.
4. **Actions → Generar Panel Viscarra → Run workflow** (deja month/year vacíos).

## Generar localmente

```bash
# token en el entorno o en el archivo .kommo_token (gitignored)
PYTHONUTF8=1 python generar.py
```
