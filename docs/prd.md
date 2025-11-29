# Chalkies NFT Mājaslapas PRD (Product Requirements Document)

## Projekta Apraksts
Chalkies NFT kolekcijas minting mājaslapa ar unikālu krītiņu/chalk art zīmējumu stilu. Mājaslapa atdarina ar rokām zīmētu estētiku ar resnām melnām kontūrām, pasteļtoņu krāsām un rotaļīgiem elementiem.

## Mērķauditorija
- NFT kolekcjionāri
- Kripto entuziasti
- Jaunas paaudzes digitālās mākslas fani
- Cilvēki, kas meklē unikālus, jautrus NFT projektus

## Galvenās Funkcijas (V1)

### 1. Hero Sekcija
- Liels virsraksts ar roku rakstīta fonta stilu
- NFT raksturlietotne (līdzīga bildē redzamajai purpura personāžai)
- "Mint Now" CTA poga ar krītiņu stilu
- Dekoratīvi elementi: mākoņi, zālīte, karodziņi

### 2. Mint Sekcija
- Integrēts nfts2.me minting widget
- 100% FREE mint informācija
- Krītiņu stila rāmis ap widget
- Wallet connection caur widget

### 3. Kolekcijas Galerija
- 6 NFT piemēri grid izkārtojumā
- Katra karte ar krītiņu rāmi
- Hover efekti (viegla animācija)

### 4. Roadmap
- 4 roadmap punkti
- Ikoniski ar rokās zīmēti simboli
- Rotaļīgs izkārtojums

### 5. FAQ Sekcija
- Accordion stils
- Jautājumi par minting procesu

## Dizaina Prasības

### Vizuālais Stils
- **Stils**: Krītiņu/marker zīmējumi, "doodle" estētika
- **Kontūras**: Resnas (3-4px), melnas, nedaudz nevienmērīgas
- **Krāsas**: Pasteļtoņi
  - Fons: Gaiši zils (#B8E6F5 vai līdzīgs)
  - Pasteļrozā: #FFB3C1
  - Pasteļzaļa: #B4E7B4
  - Pasteļdzeltena: #FFF4A3
  - Pasteļpurpura: #D4A5E0
- **Fonts**: Roku rakstīts vai rounded stils (Comic Sans alternatīva, Permanent Marker, vai līdzīgs)
- **Elementi**: 
  - Mākoņi ar nevienmērīgām kontūrām
  - Zālītes "štriķi"
  - Karodziņi
  - Konfeti
  - Nevienmērīgas līnijas un formas

### Tehniskās Prasības
- React + TypeScript
- Tailwind CSS custom klases krītiņu stilam
- Responsive dizains
- Framer Motion animācijas (bounce, wiggle efekti)
- nfts2.me widget integrācija

## Mint Integrācija
- **Platform**: nfts2.me
- **Contract**: 0x877f53ec1a6257e78b3b656e7612cc19df05615f (Chain 143)
- **Widget Type**: Classic
- **Banner**: Hidden
- **Style**: Wrapped in doodle-style frame

## Success Kritēriji
- Mājaslapa pilnībā atdarina krītiņu stilu
- Widget integrēts kvalitatīvi ar konsekventu dizainu
- Mobile responsive
- Ātra ielāde (<3s)
- Fun, playful user experience
- Skaidra minting flow
