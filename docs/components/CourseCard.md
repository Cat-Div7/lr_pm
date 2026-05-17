# CourseCard

Location: `src/components/shared/CourseCard.tsx`
Used by: Catalog page, Dashboard, Home page course showcase

---

## Props

```ts
interface CourseCardProps {
  course: Course
  className?: string
  showProgress?: boolean   // show progress bar — for enrolled courses in dashboard
  compact?: boolean        // smaller version for recommendation strips
}
```

## Usage

```tsx
import { CourseCard } from "@/components/shared/CourseCard"

// Standard card in catalog
<CourseCard course={course} />

// With progress (dashboard)
<CourseCard course={course} showProgress />

// Compact (home recommendation strip)
<CourseCard course={course} compact />
```

## Design notes

- Uses `.glass-card` for background
- Thumbnail is 16:9 ratio with category-color gradient fallback
- On hover: border glows (`hover:shadow-glow`), card lifts `hover:-translate-y-1`
- Progress bar (when `showProgress`) is 6px thick, purple fill, rounded-full
- Price shows original crossed out if `course.originalPrice` exists