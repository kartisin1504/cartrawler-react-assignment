# CarTrawler – React + TypeScript (Webpack)

A small front-end app that lists available cars with filters, i18n, vendor branding, a Cabforce-style card layout, and a Fare Rules modal with remote→local fallback. Built with **React + TypeScript + Webpack** (no Vite).

---

## 🚀 Quick start

### Prerequisites
- **Node.js 18+** (LTS recommended)
- **npm** (comes with Node)

### Install & run (dev)
```bash
npm install
npm run dev
# open http://localhost:3000
```

### Production build
```bash
npm run build
# output in /dist
```

---

## 📁 Project structure

```
.
├─ public/
│  ├─ index.html
│  ├─ cars.json               # optional local feed (offline fallback)
│  └─ assets/
│     └─ icons/               # svg icons (vendor + UI)
│        alamo.svg avis.svg hertz.svg partner.svg ...
├─ src/
│  ├─ components/
│  │  ├─ CarCard/
│  │  │  ├─ CarMedia.tsx
│  │  │  ├─ CarTitle.tsx
│  │  │  ├─ CarChips.tsx
│  │  │  ├─ CarPriceActions.tsx
│  │  │  └─ index.tsx         # composes the card
│  │  ├─ FareRulesModal.tsx
│  │  ├─ FiltersControls.tsx
│  │  ├─ Legend.tsx
│  │  └─ SkeletonCard.tsx
│  ├─ context/
│  │  └─ I18nContext.tsx
│  ├─ i18n/
│  │  └─ index.ts             # dictionaries (en, es, hi)
│  ├─ pages/
│  │  ├─ Home.tsx             # list + filters
│  │  └─ CarPage.tsx          # details page
│  ├─ styles/
│  │  └─ global.css           # Tailored CSS + responsive rules
│  ├─ types.ts
│  ├─ utils.ts                # data helpers, fetch fallback, date fmt, logos, seat parsing
│  ├─ App.tsx
│  ├─ index.tsx
│  └─ setupTests.ts           # jest-dom setup
├─ jest.config.js
├─ tsconfig.json
├─ package.json
└─ README.md
```

---

## 🧠 Key features

- **Data source with fallback**: tries remote URL then falls back to `/public/cars.json`.
- **Legend** with formatted pickup/return dates.
- **Filters**: sort (price/vendor/seats), fuel, transmission, **min seats with “5+” exact match**.
- **Cabforce-style cards** with vendor **logos** (ALAMO/AVIS/HERTZ).
- **Details page** with logos and spec icons.
- **Favourites** stored in `localStorage`.
- **i18n**: English, Español, हिंदी; header language selector.
- **Fare Rules modal**: queries local `/fare-rules.json` (and optionally a remote API if you add it).
- **Responsive**: tablet layout reused on desktop; ultra-small (<320px) linear cards.

---

## 📡 Data & fallback

### Remote feed
Default remote:
```
https://ajaxgeo.cartrawler.com/ctabe/cars.json
```

### Local feed (offline)
Drop a copy into `public/cars.json`. The app auto-uses it if remote fails.

### Helper
`utils.fetchFeedWithFallback()` implements the logic.

---

## 🧩 Components overview

- `Legend` – shows pickup/return with `formatDateTime`.
- `FiltersControls` – clean, stacked inputs; responsive on small screens.
- `CarCard` (composed of):
  - `CarMedia` – image
  - `CarTitle` – vendor logo + name
  - `CarChips` – passengers/bags/doors/trans/AC
  - `CarPriceActions` – price, fav toggle, Fare Rules button, View button
- `FareRulesModal` – modal dialog that displays rules.

---

## 🌍 i18n (language selector)

- Location: `src/i18n/index.ts` exports dictionaries.
- Provider: `src/context/I18nContext.tsx`.
- Usage: `const { t } = useI18n()` then `t.key`.
- Languages included: **en**, **es**, **hi**. Add more keys to dictionaries to translate new strings.

---

## 🧮 Filters & “5+” logic

- `parseSeatMin("5+")` → `{ min: 5, openEnded: true }`
- If the user selects **“5+”**, we **strictly match** `passengerQuantity === "5+"`.
- If the user selects **“5”**, we show cars with `min >= 5`.

Seat options are generated from raw feed values to include `"5+"` exactly.

---

## 📜 Fare Rules Enhancement

1) Create a local map at `public/fare-rules.json`:

```json
{
  "ALAMO:IFAR": {
    "cancellation": { "freeUntilHours": 24, "feeAfter": "GBP 50" },
    "fuelPolicy": "Full-to-full",
    "mileage": { "limitPerDay": 200, "excessPerMile": "GBP 0.25" },
    "deposit": "Credit card deposit GBP 200 at counter."
  }
}
```

2) Ensure `Car` includes `code` (SIPP), and `flattenCars()` sets it from `@Code`.

3) `getFareRules(vendor, code)` reads `/fare-rules.json`.  
   (Optionally extend it to try a remote API first.)

4) `CarPriceActions` opens `FareRulesModal` and shows parsed rules.

---

## 🧪 Testing

### Install test deps
```bash
npm i -D jest ts-jest jest-environment-jsdom \
  @testing-library/react @testing-library/jest-dom @testing-library/user-event \
  @types/jest
```

### Minimal config

**`jest.config.js`**
```js
export default {
  testEnvironment: 'jsdom',
  transform: { '^.+\\.(t|j)sx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }] },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
}
```

**`src/setupTests.ts`**
```ts
import '@testing-library/jest-dom'
```

### Run tests
```bash
npm test
```

> If you see  
> `Test environment jest-environment-jsdom cannot be found`  
> run: `npm i -D jest-environment-jsdom`

---

## 🎨 Styling & responsive notes

- **2 cards per row** on desktop: `.card { grid-column: span 6 }`.
- **Keep tablet layout on desktop**:
  ```css
  .cabforce-card { grid-template-columns: 120px 1fr }
  .cabforce-card .card-price { grid-column: 1 / -1; }
  ```
- **Ultra-small (≤320px)** linear card:
  ```css
  @media (max-width: 320px) { .cabforce-card{display:block} /* image → chips → buttons */ }
  ```
- **Language selector on tiny screens (<375px)**: cap width and allow wrapping in header.

---

## 🛠 Troubleshooting

**1) `Module not found: Can't resolve '/assets/icons/angle-down.svg'`**  
Make sure icons exist at **`public/assets/icons/*.svg`** and referenced as **`/assets/icons/...`** (leading slash, resolves from `public` root).

**2) Jest jsdom error**  
Install: `npm i -D jest-environment-jsdom` and set `testEnvironment: 'jsdom'`.

**3) “View” button disappears**  
We prevent shrinking in CSS:
```css
.card .card-price { display:flex; flex-direction:column; align-items:flex-end; min-width:220px }
.btn-primary{ display:inline-flex; align-items:center; justify-content:center }
```

**4) 5+ filter shows all cars**  
Ensure the filter logic checks **exact “5+”** match when the selected value ends with `+`.

**5) No data offline**  
Place a copy of the feed at `public/cars.json`.

---

## 🔧 Scripts

`package.json` commonly includes:
```json
{
  "scripts": {
    "dev": "webpack serve --mode development",
    "build": "webpack --mode production",
    "test": "jest --watchAll"
  }
}
```

---

## ✏️ Customizing

- **Add vendors**: put logo in `public/assets/icons/` and map in `vendorLogo()` inside `utils.ts`.
- **New languages**: extend dictionaries in `src/i18n/index.ts`.
- **Cards layout**: tweak `.cabforce-card` grid columns or chip styles in `global.css`.
- **Fare rules source**: point `getFareRules` to your API, keep local JSON as fallback.

---

## 📄 License

MIT 
