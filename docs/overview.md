# Chalkies NFT Projekta Pārskats

## Projekta Apraksts
Unikāla NFT kolekcijas minting mājaslapa ar krītiņu/chalk art zīmējumu stilu. Mājaslapa atdarina ar rokām zīmētu estētiku ar resnām melnām kontūrām, pasteļtoņu krāsām un rotaļīgiem elementiem.

## Projekta Struktūra

### Dokumentācija
- `docs/prd.md` - Projekta prasību dokuments, definē vīziju un funkcionalitāti
- `docs/todo.md` - Aktīvais uzdevumu saraksts (PABEIGTS)
- `docs/overview.md` - Šis fails, projekta arhitektūras pārskats

### Stili
- `src/styles/globals.css` - Krītiņu stila custom CSS ar:
  - `.doodle-border` - Resnas melnas kontūras
  - `.doodle-shadow` - Handdrawn ēnas efekts
  - `.cloud-shape` - Mākoņu formas
  - `.btn-doodle` - Krītiņu stila pogas
  - `.card-doodle` - Krītiņu stila kartes
  - `.grass-pattern` - Zālītes tekstūra
  - Rokraksta fonti: Comic Neue, Permanent Marker
  
- `tailwind.config.ts` - Pasteļtoņu krāsu paletes konfigurācija:
  - Sky Blue (Fons): `hsl(200, 70%, 85%)`
  - Pastel Pink: `hsl(350, 100%, 85%)`
  - Pastel Green: `hsl(120, 50%, 85%)`
  - Pastel Yellow: `hsl(55, 100%, 85%)`
  - Pastel Purple: `hsl(280, 60%, 85%)`
  - Pastel Orange: `hsl(25, 100%, 85%)`
  - Doodle Black: `hsl(0, 0%, 10%)`

### Lapas
- `src/pages/home.tsx` - Galvenā NFT minting lapa ar:
  - **Hero Section**: Galvenais banner ar animētu Chalkies personāžu, CTA pogām un statistiku
  - **Mint Section**: Integrēts nfts2.me widget ar krītiņu stila rāmi, 100% FREE mint
  - **Gallery Section**: 6 NFT piemēri grid izkārtojumā ar hover efektiem
  - **Roadmap Section**: 4 fāzes ar ikonām un statusiem
  - **FAQ Section**: Accordion ar atbildēm uz populāriem jautājumiem
  - **Footer**: Social links un copyright

### Komponentes
Izmanto shadcn/ui komponentes:
- `Button` - Modificēts ar `.btn-doodle` stilu
- `Card` - Modificēts ar `.card-doodle` stilu
- `Accordion` - FAQ sekcijai

### Dekoratīvie Elementi
- **Mākoņi**: 3 animēti mākoņi ar `float` animāciju
- **Karodziņu Garland**: Krāsaini trīsstūri augšmalā
- **Zālītes**: Zaļa josla ar animētām zālītēm hero sekcijas apakšā
- **Chalkies Personāži**: Vienkārši, jautri chalk art zīmējumi ar lielām acīm

## Dizaina Sistēma

### Vizu Princips
"Handdrawn Crayon Doodle" - Viss izskatās, kā būtu zīmēts ar krītiņiem vai bieziem marķeriem uz papīra.

### Galvenās Īpašības
1. **Thick Black Outlines**: 3-4px melnas, nedaudz nevienmērīgas kontūras visam
2. **Pastel Colors**: Maigi, gaiši toņi
3. **Playful Shapes**: Asimetriskas, nedaudz neprecīzas formas
4. **Fun Animations**: Bounce, float, wiggle efekti
5. **Hand-written Typography**: Comic Neue un Permanent Marker fonti

### Responsīvs Dizains
- Mobile first pieeja
- Grid sistēma ar Tailwind
- Visi elementi pielāgojas mobilajām ierīcēm

## Tehniskā Stack
- **Frontend**: React 19 + TypeScript
- **Backend**: Node.js + Hono.js
- **Styling**: Tailwind CSS + Custom CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Animations**: Tailwind + Custom keyframes
- **Fonts**: Google Fonts (Comic Neue, Permanent Marker)
- **Minting Widget**: nfts2.me iframe integration
- **Deployment**: Vercel (Node.js runtime)

## Servera Konfigurācija
- `src/server/app.node.ts` - Node.js production serveris Vercel deployment
- `rsbuild.config.node.ts` - Node.js servera build konfigurācija
- `vercel.json` - Vercel deployment konfigurācija

## Funkcionalitāte (V1)
- ✅ Vizuāla interface ar krītiņu stilu
- ✅ Integrēts nfts2.me minting widget
- ✅ NFT galerija ar piemēriem
- ✅ Roadmap prezentācija
- ✅ FAQ sekcija
- ✅ Pilnībā responsive

## Mint Integrācija
- **Platform**: nfts2.me
- **Contract**: 0x877f53ec1a6257e78b3b656e7612cc19df05615f (Chain 143)
- **Widget**: Classic widget ar hidden banner
- **Style**: Ietverts krītiņu stila rāmī ar doodle border un shadow

## Nākamie Soļi (Ārpus V1 Scope)
- Custom wallet connection UI
- Backend API
- Database NFT metadatai
- Admin dashboard
- Rarity system
- Secondary market integration

## Stila Īpatnības
- Viss ir "nedaudz neprecīzs" - tā ir īpatnība!
- Resnas kontūras visur
- Pasteļtoņi ar melnām kontūrām
- Rotaļīga, neformāla atmosfēra
- Bērnišķīgs, bet profesionāls
