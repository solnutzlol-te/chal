# Chalkies NFT - Vercel Deployment Instrukcijas

## Izmaiņas Vercel Kompatibilitātei

Projekts ir atjaunināts, lai darbotos ar Vercel platformu, izmantojot Node.js runtime (nevis Deno).

### Galvenās Izmaiņas

1. **Jauns Node.js Serveris**: `src/server/app.node.ts`
   - Izmanto `@hono/node-server` (nevis `Deno.serve`)
   - Apkalpo statiskos failus no `web/` direktorijas
   - Atbalsta SPA routing (visus ne-API ceļus nosūta uz `index.html`)

2. **Atjaunināta Build Konfigurācija**: `rsbuild.config.node.ts`
   - Būvē Node.js-compatible servera failu
   - Output: `dist/server.cjs`

3. **Atjaunināts package.json**:
   - Build komanda: `npm run build` (būvē gan client, gan server)
   - Start komanda: `node ./dist/server.cjs`

4. **Vercel Konfigurācija**: `vercel.json`
   - Definē Node.js runtime
   - Visi maršruti tiek novirzīti uz serveri

## Vercel Projekta Iestatījumi

### Dashboard Iestatījumi (vercel.com)

1. Atveriet sava projekta **Settings** → **General**

2. Pārbaudiet šādus iestatījumus:

   **Framework Preset:**
   ```
   Other
   ```

   **Build Command** (Override):
   ```
   npm run build
   ```

   **Output Directory:**
   ```
   [ATSTĀJIET TUKŠU - neievadiet neko!]
   ```

   **Install Command:**
   ```
   npm install
   ```

3. **Root Directory**: `./` (default, bez izmaiņām)

4. **Node.js Version**: 22.x (vai jaunāka)

### Kāpēc Output Directory ir tukšs?

Mūsu serveris (`app.node.ts`) pats apkalpo visus failus:
- API pieprasījumi → `/api/*` routes
- Statiskie faili → no `web/` direktorijas  
- SPA routing → visi pārējie ceļi atgriež `index.html`

Ja Output Directory būtu iestatīts (piemēram, `dist/web`), Vercel mēģinātu pasniegt failus pats, radot konfliktu ar mūsu serveri.

## Lokālā Testēšana

### Izstrādes Režīms
```bash
npm run dev
```
- Pogas: http://localhost:3000
- Hot reload enabled

### Production Build Lokāli
```bash
# Būvēt
npm run build

# Palaist
npm start
```
- Serveris: http://localhost:3000
- Šis ir tas pats, ko palaida Vercel

## Deployment Process

### 1. Caur Git (Ieteicams)
```bash
git add .
git commit -m "Fixed Vercel deployment - switched to Node.js"
git push origin main
```
Vercel automātiski uzbūvēs un publicēs jūsu projektu.

### 2. Caur Vercel CLI
```bash
npm i -g vercel
vercel --prod
```

### 3. Caur Vercel Dashboard
- Aiziet uz **Deployments** tab
- Noklikšķiniet **Redeploy**

## Problēmu Risināšana

### "NOT_FOUND" kļūda
**Cēlonis**: Output Directory nav tukšs vai build process failed

**Risinājums**:
1. Pārbaudiet, vai Output Directory lauks ir **PILNĪGI TUKŠS**
2. Pārbaudiet build logs Vercel dashboard
3. Pārliecinieties, ka `npm run build` strādā lokāli

### "Module not found" kļūda
**Cēlonis**: Trūkst dependencies vai nepareizs import path

**Risinājums**:
1. Palaidiet `npm install` lokāli
2. Pārbaudiet, vai visas dependencies ir `package.json`
3. Pārbaudiet import paths serverī (nedrīkst būt Deno-specific)

### Serveris neizdodas startēt
**Cēlonis**: Port konflikts vai nepareiza Node.js versija

**Risinājums**:
1. Pārbaudiet Vercel logs: Settings → Functions → View Logs
2. Pārliecinieties, ka Node.js versija ir 22.x vai jaunāka
3. Vercel automātiski iestatīs `PORT` environment variable

## Environment Variables

Ja jums ir nepieciešami environment variables (piemēram, API keys):

1. Aiziet uz **Settings** → **Environment Variables**
2. Pievienojiet katru variable:
   - Key: `YOUR_VAR_NAME`
   - Value: `your-value`
   - Environments: Production, Preview, Development (izvēlieties vajadzīgos)
3. Redeploy projektu

## Pārbaudes Checklist

✅ Output Directory ir **tukšs**  
✅ Build Command ir `npm run build`  
✅ Framework Preset ir `Other`  
✅ Node.js version ir 22.x+  
✅ `vercel.json` fails pastāv projekta root direktorijā  
✅ Lokāli `npm run build && npm start` strādā bez kļūdām  

## Papildu Resursi

- [Vercel Node.js Documentation](https://vercel.com/docs/runtimes/node-js)
- [Hono on Vercel](https://hono.dev/docs/getting-started/vercel)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)

---

**Ja problēmas turpinās**, lūdzu:
1. Pārbaudiet Vercel build logs pilnībā
2. Pārliecinieties, ka visi izmainītie faili ir commit'oti un push'oti
3. Mēģiniet "Clear Cache" Vercel deployment settings
