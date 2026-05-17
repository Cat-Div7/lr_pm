# Pages

Who owns each page, its route, and current status.

---

## Page ownership

| Page | Route | Owner | Status | Branch |
|------|-------|-------|--------|--------|
| Landing / Home | `/` | — | 🟡 In progress | `feat/homepage` |
| Course Catalog | `/courses` | — | ⬜ Not started | — |
| Course Detail | `/courses/:id` | — | ⬜ Not started | — |
| Student Dashboard | `/dashboard` | — | ⬜ Not started | — |
| Video Player | `/courses/:id/lesson/:lessonId` | — | ⬜ Not started | — |
| Instructor Profile | `/instructors/:id` | — | ⬜ Not started | — |
| Checkout | `/checkout` | — | ⬜ Not started | — |
| Certificate | `/certificate/:id` | — | ⬜ Not started | — |
| Pricing | `/pricing` | — | ⬜ Not started | — |
| Sign Up / Login | `/auth/signup` `/auth/login` | — | ⬜ Not started | — |

**Update this table** when you start and finish a page — change the status emoji and add your branch name.

Status legend: ⬜ Not started · 🟡 In progress · 🟢 Done (merged to dev) · 🔴 Blocked

---

## Per-page docs

Each page has its own doc file explaining what data it needs,
what components it uses, and any special notes.

- [home.md](./home.md) | In Future

Add a doc file for your page when you start it.
Copy the template below.

---

## Page doc template

```md
# Page Name

Route: `/your-route`
Owner: Your name
Branch: `feat/your-page`

## What it does
One paragraph describing the page.

## Components used
- `Navbar` (layout)
- `CourseCard` (shared)
- `HeroSection` (local to this page)

## Data needed
- List of courses → `useQuery(["courses"])`
- Current user → `useAuthStore`

## Notes
Any tricky parts, decisions made, or things to be aware of.
```