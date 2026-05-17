# Luminary — Learning Platform

> "Master anything. From anywhere."

A premium K-12 / general learning platform built with React, Vite, TypeScript, and Tailwind v4.

---

## Quick links

| Doc | What it covers |
|-----|----------------|
| [docs/setup.md](./docs/setup.md) | Clone, install, run — first thing to read |
| [docs/architecture.md](./docs/architecture.md) | Folder structure and where everything lives |
| [docs/styling.md](./docs/styling.md) | Colors, tokens, fonts, utility classes |
| [docs/conventions.md](./docs/conventions.md) | Git flow, branch names, commit messages, PR rules |
| [docs/state-management.md](./docs/state-management.md) | Zustand stores — what goes where |
| [docs/api.md](./docs/api.md) | TanStack Query, services, mock data |
| [docs/env.md](./docs/env.md) | Environment variables |
| [docs/components/](./docs/components/) | Docs for every shared component |
| [docs/pages/](./docs/pages/) | Docs for every page — who owns it, what it needs |

---

## Tech stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 19+ | UI |
| Vite | 5 | Build tool |
| TypeScript | 6 | Type safety |
| Tailwind CSS | 4+ | Styling |
| shadcn/ui | latest | Radix component library |
| Zustand | 5 | Global state |
| TanStack Query | 5 | Server state / data fetching |
| React Router | 6 | Routing |
| React Hook Form | 7 | Form handling |
| Zod | 3 | Schema validation |
| Framer Motion | 11 | Animations |

---

## Branch rules

- `main` → production. **Direct push is blocked. Requires 1 approval PR.**
- `dev` → integration branch. Everyone merges here first.
- Feature branches → always cut from `dev`, always PR back to `dev`.

Never push directly to `main`. Ever.