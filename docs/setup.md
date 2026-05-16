# Setup Guide

Everything you need to go from zero to running the project locally in under 5 minutes.

---

## Prerequisites

Make sure these are installed on your machine before anything else.

| Tool | Version | Check |
|------|---------|-------|
| Node.js | 18+ | `node -v` |
| npm | 9+ | `npm -v` |
| Git | any | `git -v` |

---

## 1. Clone the repo

```bash
# HTTP
git clone https://github.com/Cat-Div7/lr_pm.git
# SSH
git clone git@github.com:Cat-Div7/lr_pm.git

cd lr_pm
```

---

## 2. Switch to the dev branch

`main` is protected — you cannot push there directly.
All work happens on `dev` or your own feature branch cut from `dev`.

```bash
git checkout dev
git pull origin dev
```

---

## 3. Install dependencies

```bash
npm install
```

This installs everything in `package.json` including Tailwind v4,
shadcn, Zustand, TanStack Query, Framer Motion, etc.

---

## 4. Set up environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your values.
See [env.md](./env.md) for what each variable does.

---

## 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Available scripts

| Script | What it does |
|--------|-------------|
| `npm run dev` | Start local dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript compiler check (no emit) |

---

## Starting your assigned page

```bash
# Make sure dev is up to date
git checkout dev
git pull origin dev

# Cut your feature branch
git checkout -b feat/your-page-name

# Do your work, commit often
git add .
git commit -m "feat([page | feature]-name): describe what you did"

# Push and open a PR to dev on GitHub
git push origin feat/your-page-name
```

Then go to GitHub → Pull Requests → New Pull Request.
Set base to `dev`, compare to your branch.
Assign one teammate to review.

See [conventions.md](./conventions.md) for the full git workflow.