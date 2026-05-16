# Conventions

Git workflow, branch rules, commit messages, PR process, and code style.
Everyone follows these — no exceptions.

---

## Git workflow (daily)

### Starting a new piece of work

```bash
# 1. Always start from an up-to-date dev
git checkout dev
git pull origin dev

# 2. Cut your feature branch from dev
git checkout -b feat/page-name

# 3. Work, commit often (see commit format below)
git add .
git commit -m "feat(home): add hero section with CTA"

# 4. Push your branch
git push origin feat/page-name

# 5. Open a PR on GitHub → base: dev ← compare: feat/page-name
```

### Keeping your branch up to date with dev

If someone merged to `dev` while you were working, pull their changes in:

```bash
git checkout dev
git pull origin dev
git checkout feat/your-page
git rebase dev
```

Use `rebase` not `merge` to keep history clean.
If you get conflicts, fix them file by file, then `git rebase --continue`.

### Do this every morning before starting work

```bash
git checkout dev
git pull origin dev
git checkout feat/your-page
git rebase dev
```

---

## Branch naming

| Type             | Pattern                 | Example                        |
| ---------------- | ----------------------- | ------------------------------ |
| New page         | `feat/page-name`        | `feat/homepage`                |
| New component    | `feat/component-name`   | `feat/course-card`             |
| Bug fix          | `fix/short-description` | `fix/navbar-mobile-overlap`    |
| Styling tweak    | `style/component-name`  | `style/hero-section-spacing`   |
| Config / tooling | `chore/description`     | `chore/update-tailwind-config` |
| Documentation    | `docs/file-name`        | `docs/add-styling-guide`       |

Rules:

- Always lowercase
- Always hyphen-separated — no underscores, no spaces
- Keep it short and descriptive — under 40 characters

---

## Commit message format

```
type(scope): short description in present tense
```

| Type       | When to use                                   |
| ---------- | --------------------------------------------- |
| `feat`     | Adding new UI, a new section, a new component |
| `fix`      | Fixing a bug or broken layout                 |
| `style`    | Visual/spacing tweaks — no logic change       |
| `refactor` | Restructuring code without changing behavior  |
| `chore`    | Config, package, tooling changes              |
| `docs`     | Adding or editing documentation               |

### Scope = the page or component name

```bash
# Good examples
git commit -m "feat(home): add hero section"
git commit -m "feat(home): add stats strip and subject pills"
git commit -m "fix(catalog): correct filter sidebar overflow on mobile"
git commit -m "style(course-card): increase thumbnail border radius"
git commit -m "chore: add framer-motion dependency"
git commit -m "docs: add styling guide"

# Bad examples — too vague
git commit -m "update stuff"
git commit -m "fix"
git commit -m "changes"
git commit -m "claude cooked here!"
```

### Commit often — small, focused commits

> [!IMPORTANT]
> Do not work for 3 hours and then do one massive commit.
> Commit every time you finish a meaningful chunk — a section, a component, a fix.
> Small commits = easier code review, easier to revert if something breaks.

---

## Pull Request rules

### Before opening a PR

- [ ] The page/component renders without errors
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] No ESLint errors (`npm run lint`)
- [ ] You tested it in the browser
- [ ] You used design tokens — no hardcoded hex values

### Opening the PR

1. Go to GitHub → Pull Requests → New Pull Request
2. **Base:** `dev` ← **Compare:** `feat/your-branch`
3. Title format: `feat(home): complete homepage` or `fix(catalog): sidebar filter reset`
4. Description: briefly explain what you built and any decisions you made
5. Assign one teammate as reviewer

### Reviewing a PR

- Check it out locally: `git fetch && git checkout feat/their-branch`
- Run `npm run dev` and actually look at it in the browser
- Leave specific comments on lines — not just "looks good"
- Either **Approve** or **Request changes** — do not leave it hanging
- Do it within 24 hours of being assigned

### Merging

- Only merge after 1 approval
- Use **Squash and merge** to keep `dev` history clean
- Delete the branch after merging (GitHub will prompt you)

### `main` branch

- `main` is protected — direct push is blocked
- Only merge `dev` → `main` when a batch of features is done and tested
- Creating the `main` PR requires 1 approval from a teammate
- This represents a "release" — treat it seriously

---

## Code style rules

### TypeScript

```ts
// Always type function parameters and return values
function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

// Always type component props with an interface
interface CourseCardProps {
  course: Course;
  className?: string;
}

// Never use `any` — use `unknown` if you genuinely don't know the type
// const data: any = response
// const data: unknown = response

// Use optional chaining — don't chain without it
// user.profile.avatar
// user?.profile?.avatar
```

### Components

```tsx
// One component per file
// File name = component name (PascalCase)
// Default export for pages, named export for components

// Page (default export)
export default function CatalogPage() { ... }

// Shared component (named export)
export function CourseCard({ course, className }: CourseCardProps) { ... }

// Always use cn() for className — never string concat
import { cn } from "@/lib/cn"
<div className={cn("glass-card rounded-2xl", className)}>
```

### Imports — always in this order

```ts
// 1. React
import { useState, useEffect } from "react";

// 2. Third-party libraries
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

// 3. Internal — components
import { CourseCard } from "@/components/shared/CourseCard";
import { Button } from "@/components/ui/button";

// 4. Internal — hooks, store, services
import { useAuthStore } from "@/store/authStore";
import { getCourses } from "@/services/courses";

// 5. Internal — types
import type { Course } from "@/types";

// 6. Styles (rare — usually not needed)
import "./SomeComponent.css";
```

---

## Communication rules

- When you start a branch → message the group: "Starting feat/catalog-page"
- When you open a PR → message the group: "PR ready for catalog page — please review"
- When you merge → message the group: "Catalog page merged to dev ✓"
- If you're stuck for more than 30 minutes → ask, don't suffer in silence
- If you're changing a **shared component** → ask before changing, everyone is affected
