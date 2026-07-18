<div align="center">
  <img src="/Geo-Scope.png" alt="GeoScope Logo" width="120" />
  <h1 align="center">GeoScope</h1>
  <p align="center">
    Explore countries around the world with detailed information, population insights, and interactive visualizations.
  </p>
  <p align="center">
    <a href="https://geoscope-nine.vercel.app/" target="_blank"><strong>Live Demo →</strong></a>
  </p>
  <br/>
  <p align="center">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind"/>
    <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router"/>
    <img src="https://img.shields.io/badge/Zustand-764ABC?style=for-the-badge&logo=react&logoColor=white" alt="Zustand"/>
    <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios"/>
    <img src="https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white" alt="Chart.js"/>
    <img src="https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white" alt="Leaflet"/>
  </p>
</div>

---

## Overview

**GeoScope** is a modern, fully responsive country exploration app built with React and React Router. It leverages the **REST Countries v5 API** to provide real-time, normalized country data including demographics, geography, currencies, languages, bordering nations, and more — all wrapped in a sleek glassmorphism UI with full dark/light theme support.

### Features

- **Browse All Countries** — Paginated infinite-scroll list of 200+ countries with flag cards
- **Search** — Real-time client-side filtering by country name or ISO code (CCA3)
- **Region Filter** — Filter by continent (Asia, Europe, Africa, Americas, Oceania, Antarctic)
- **Country Details** — Flag, official name, capital, population, region, subregion, continent, currencies, languages, area, calling codes, TLD, timezone with live clock, landlocked status
- **Interactive Map** — Leaflet-powered GeoJSON map highlighting the selected country
- **Border Navigation** — Click bordering country codes to instantly jump to that country's details
- **Population Comparison** — Bar chart comparing country population against Indian states and global regions
- **Dark / Light Theme** — Persisted via Zustand with smooth toggle animation
- **Smooth Scrolling** — Powered by Lenis for a polished scroll experience
- **Fully Responsive** — Adapts seamlessly from mobile to desktop

---

## Architecture

```
src/
├── Api/
│   └── restCountries.js      # Centralized API layer (Axios, auth, normalization)
├── Charts/
│   └── chartSetup.js          # Chart.js global configuration
├── Components/
│   ├── AllCountries.jsx       # Home page — infinite-scroll country grid
│   ├── BorderCountry.jsx      # Border country detail page
│   ├── ByRegion.jsx           # Region-filtered country list
│   ├── CalculateTime.jsx      # Live timezone clock component
│   ├── Card.jsx               # Country card (flag, name, capital, population)
│   ├── CountryDataOnClick.jsx # Country detail view
│   ├── CountryPageShimmer.jsx # Detail page loading skeleton
│   ├── Footer.jsx             # App footer with social links
│   ├── InputBySearch.jsx      # Search input field
│   ├── NativeDropdown.jsx     # Region filter dropdown
│   ├── Navbar.jsx             # Top navigation bar
│   ├── Scrolling.jsx          # Lenis smooth scroll wrapper
│   ├── ShimmerMain.jsx        # Card grid loading skeleton
│   ├── SingleCountry.jsx      # Country detail page wrapper
│   ├── ThemeSync.jsx          # Theme persistence and hydration
│   ├── ZustandState.js        # Global state (Zustand + persist)
│   └── Population/
│       ├── PopulationChart.jsx         # Population bar chart
│       └── StatesPopulationIndia.json  # Indian states population data
├── CountryMap.jsx             # Leaflet map component
├── ThemeToggle.jsx            # (reserved for future use)
├── App.jsx                    # Root application component
├── main.jsx                   # Entry point with React Router
└── index.css                  # Global styles + dark mode
```

### API Layer Design

The `src/Api/restCountries.js` module is a centralized, reusable API layer that:

- Creates an **Axios instance** with the v5 base URL and Bearer token authentication
- Provides **typed helper functions** (`getAllCountriesPage`, `getCountryByName`, `getCountryByCode`, `getCountriesByRegion`)
- **Normalizes** the v5 JSON:API response structure into a v3.1-compatible shape so the rest of the app is decoupled from API changes
- Uses **`response_fields`** query parameters for efficient payloads
- Implements **centralized error handling** with descriptive messages
- Filters out entries without flags for a polished experience

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 18 |
| **Build Tool** | Vite 8 |
| **Routing** | React Router 7 |
| **State Management** | Zustand 5 (with persist middleware) |
| **HTTP Client** | Axios 1 |
| **Styling** | Tailwind CSS 4 |
| **Charts** | Chart.js 4 + react-chartjs-2 |
| **Maps** | Leaflet + react-leaflet |
| **Icons** | react-icons |
| **Smooth Scroll** | Lenis |
| **API** | REST Countries v5 |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- REST Countries API key (free at [restcountries.com/sign-up](https://restcountries.com/sign-up))

### Installation

```bash
# Clone the repository
git clone https://github.com/DIPAK-DUBEY/WhereInWorld.git
cd WhereInWorld

# Install dependencies
npm install

# Create environment file
echo "VITE_REST_COUNTRIES_API_KEY=your_api_key_here" > .env

# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## API Migration: v3.1 → v5

This project was migrated from the deprecated REST Countries v3.1 API to the v5 API. Key changes:

| Aspect | v3.1 (old) | v5 (new) |
|--------|-----------|---------|
| **Base URL** | `restcountries.com/v3.1` | `api.restcountries.com/countries/v5` |
| **Auth** | None | Bearer token required |
| **Response format** | Plain array | JSON:API (`data.objects`) |
| **Field names** | `name.common` | `names.common` |
| **Flags** | `flags.svg` | `flag.url_svg` |
| **ISO codes** | `cca3` | `codes.alpha_3` |
| **Capital** | `["Ottawa"]` | `[{name: "Ottawa", ...}]` |
| **Coordinates** | `latlng: [45, -75]` | `coordinates: {lat: 45, lng: -75}` |
| **Languages** | `{"eng": "English"}` | `[{bcp47: "en", name: "English"}]` |
| **Currencies** | `{"USD": {name, symbol}}` | `[{code: "USD", name, symbol}]` |
| **Pagination** | Not supported | `limit` + `offset` params |
| **Field selection** | `?fields=name,flags` | `?response_fields=names.common,flag.url_svg` |

The migration includes a **normalization layer** (`normalizeCountry` in `restCountries.js`) that transforms v5 responses back to a v3.1-compatible shape, ensuring existing components work without modification.

---

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Connect

<div align="center">
  <p>
    <a href="https://github.com/DIPAK-DUBEY" target="_blank">
      <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
    </a>
    <a href="https://www.linkedin.com/in/dipak-dubey-81775924b/" target="_blank">
      <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
    </a>
    <a href="https://x.com/Dipakdu59626304" target="_blank">
      <img src="https://img.shields.io/badge/X-000000?style=for-the-badge&logo=x&logoColor=white" alt="X"/>
    </a>
  </p>
  <p>
    Built by <strong>Dipak Dubey</strong>
  </p>
</div>
