# Environment Variables

---

## Setup

```bash
cp .env.example .env
```

Fill in `.env` with your local values. Never commit `.env` — it is in `.gitignore`.
Only commit `.env.example` with empty or placeholder values.

---

## Variables

| Variable | Required | Example | Description |
|----------|----------|---------|-------------|
| `VITE_API_URL` | Yes | `http://localhost:3000/api` | Base URL for all API calls |
| `VITE_APP_NAME` | No | `Luminary` | App name used in titles |

---

## Rules

- Every environment variable must start with `VITE_` — otherwise Vite will not expose it to the browser
- Access them in code as `import.meta.env.VITE_VARIABLE_NAME`
- Add TypeScript types for them in `src/vite-env.d.ts`:

```ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

---

## `.env.example` (commit this)

```
VITE_API_URL=
VITE_APP_NAME=Luminary
```