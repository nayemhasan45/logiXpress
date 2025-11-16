# logiXpress Client

## Overview
logiXpress is the Vite-powered React front end for the parcel delivery platform. It lets senders create and track parcels, riders request onboarding, and visitors explore coverage data. The UI consumes the companion Express API in `../logiXpress_server`, so keep both apps running locally for a complete workflow.

## Tech Stack
- React 19 + Vite 7 with React Router 7 for routing and code-splitting layouts.
- Tailwind CSS 4 paired with DaisyUI themes for styling.
- TanStack Query 5, Axios, and a custom `useAxios` hook for API access with token-aware headers.
- Firebase Authentication initialized inside `src/firebase/firebase.config.js`.
- Supporting UI tooling: React Hook Form, Toastify, SweetAlert2, Swiper, AOS, Leaflet, Framer Motion, and Stripe client libs.

## Directory Layout
```
src/
  assets/                Static images, icons, map data, Tailwind presets
  context/authContext/   AuthProvider plus hooks exposing Firebase auth
  firebase/              Firebase config bootstrapped via Vite env vars
  hooks/                 Reusable hooks such as useAxios and auth helpers
  layouts/               Public and dashboard layout shells
  pages/                 Feature areas (auth, dashboard, rider, coverage, shared)
  routes/Router.jsx      Route definitions + guards
main.jsx, index.css      App entry and Tailwind layer config
```
Server code resides in `../logiXpress_server/index.js`; add helpers under `routes/` or `db/` when API logic grows.

## Getting Started
1. **Prereqs:** Node.js 18+, npm 10+, and the Express server running on `http://localhost:3000` (or provide `PORT=5000 node ../logiXpress_server/index.js`).
2. **Install:** `npm install`
3. **Run dev mode:** `npm run dev` (opens `http://localhost:5173` with Fast Refresh).

## Environment Setup
Create `.env.local` in `logiXpress_client/` (never commit secrets) and paste Firebase settings plus optional API URL overrides:
```
VITE_apiKey=...
VITE_authDomain=...
VITE_projectId=...
VITE_storageBucket=...
VITE_messagingSenderId=...
VITE_appId=...
# optional
VITE_API_URL=http://localhost:3000
```
`src/hooks/useAxios.jsx` reads these values when constructing the Axios instance; mirror the host inside the server’s CORS allowlist.

## Development & Scripts
| Command | Description |
| --- | --- |
| `npm run dev` | Launches Vite with React Fast Refresh. |
| `npm run build` | Generates an optimized bundle in `dist/`. |
| `npm run preview` | Serves the production bundle for smoke tests. |
| `npm run lint` | Runs the flat ESLint config (`eslint.config.js`). |
| `node ../logiXpress_server/index.js` | Starts the Express API (set `PORT` if needed). |

## Working with the API & Auth
- `src/context/authContext/AuthProvider.jsx` exposes the Firebase user and JWT tokens to child components.
- `useAxios` automatically appends the token to outbound requests; pair it with React Query (e.g., parcel list queries) for caching and background refreshes.
- Shared parcel form logic lives in `src/pages/dashboard/.../ParcelForm.jsx`, so UI changes flow through both create/edit flows.
- Leaflet-powered coverage pages reference data in `src/assets/`; keep maps lightweight to avoid bundle bloat.

## Quality Checklist
- Run `npm run lint` and `npm run build` before pushing; Tailwind + DaisyUI styles are validated during the build step.
- Perform manual UI flows (parcel creation, rider registration, dashboard filtering) and confirm API requests succeed against the Express server.
- Document any intentionally skipped cases (e.g., missing Supertest suites) inside your PR description.
