# Repository Guidelines

## Project Structure & Module Organization
- `logiXpress_client/src` holds all React code. Feature pages live under `src/pages`, layouts inside `src/layouts`, auth context under `src/context/authContext`, and reusable logic in `src/hooks`. Static assets and JSON fixtures sit in `src/assets`.
- `logiXpress_server/index.js` is the entire Express API; keep new route handlers or helpers in sibling modules (e.g., `db/`, `routes/`) if the file grows.
- Public HTML and static files reside in `logiXpress_client/public`. Vite outputs builds to `logiXpress_client/dist`.

## Build, Test, and Development Commands
- Client:
  - `npm run dev` — starts Vite with React Fast Refresh at http://localhost:5173.
  - `npm run build` — bundles to `dist/` using the Vite config and Tailwind pipeline.
  - `npm run preview` — serves the production build as a smoke test.
  - `npm run lint` — runs the flat ESLint config (`eslint.config.js`) used by CI checks.
- Server:
  - `node index.js` — bootstraps Express after loading `.env`.
  - `PORT=5000 node index.js` — override the default listener for local port clashes.

## Coding Style & Naming Conventions
- React files use PascalCase (`CreateParcel.jsx`) while hooks remain camelCase (`useAxios.jsx`). Keep component folders self-contained with matching CSS or asset files if needed.
- Favor functional components with hooks, two-space indentation, and Tailwind utilities for styling; reach for DaisyUI classes before adding custom CSS.
- The Axios wrapper and AuthProvider centralize API access—add new endpoints by extending those helpers instead of duplicating fetch logic.
- On the server, stick with CommonJS (`require`, `module.exports`) and async/await. Group MongoDB queries inside dedicated functions for readability.

## Testing Guidelines
- No automated tests ship today, so linting plus manual UI/API smoke checks are mandatory before pushing.
- When adding coverage, colocate files as `Component.test.jsx` or `hook.test.js` under the same directory and run them with Vitest (`npx vitest run`) or Jest.
- For the API, prefer Supertest-powered integration suites stored under `logiXpress_server/tests`. Target ≥80% critical-path coverage and document any gaps in the PR.

## Commit & Pull Request Guidelines
- Recent commits favor short, imperative phrases in lowercase (e.g., `dashboard function done with crud oparation`). Follow that pattern and include the affected surface (“auth”, “api”, “docs”).
- Each PR should describe the motivation, list key changes, reference related issues, and attach screenshots or terminal output for UI or API alterations.
- Re-run `npm run lint`, `npm run build`, and the API server locally before requesting review. Mention any failing checks and why they are acceptable.

## Environment & Security Tips
- Keep secrets in `logiXpress_client/.env.local` for Firebase and `logiXpress_server/.env` for `MONGO_URI`/`PORT`. Never commit these files.
- Update `src/hooks/useAxios.jsx` or add a `VITE_API_URL` variable when pointing to non-local servers, and mirror the value in the server CORS allowlist.
- Rotate MongoDB credentials and Firebase keys when onboarding new contributors; document the rotation in the PR notes.
