# API & Data Fetching

How we fetch data using TanStack Query and the services layer.

---

## The pattern

```
Component
  → calls useQuery / useMutation
    → which calls a function from services/
      → which calls fetch() / axios
        → returns typed data
```

Components never call `fetch()` directly.
Components never use `useEffect` for data fetching.
Always go through TanStack Query.

---

## Setup

`src/main.tsx` wraps the app in `QueryClientProvider`:

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes — don't refetch if data is fresh
      retry: 1, // retry once on failure
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);
```

---

## Service files (the API layer)

Each file in `src/services/` contains plain async functions.
No hooks here — just functions that fetch and return typed data.

### `src/services/courses.ts`

```ts
import type { Course } from "@/types";
import { mockCourses } from "@/lib/mockData";

const BASE_URL = import.meta.env.VITE_API_URL;

// While backend doesn't exist — return mock data
export async function getCourses(): Promise<Course[]> {
  // TODO: replace with real API call when backend is ready
  // const res = await fetch(`${BASE_URL}/courses`)
  // if (!res.ok) throw new Error("Failed to fetch courses")
  // return res.json()
  return Promise.resolve(mockCourses);
}

export async function getCourseById(id: string): Promise<Course> {
  const course = mockCourses.find((c) => c.id === id);
  if (!course) throw new Error(`Course ${id} not found`);
  return Promise.resolve(course);
}

export async function getCoursesByCategory(
  category: string,
): Promise<Course[]> {
  return Promise.resolve(mockCourses.filter((c) => c.category === category));
}
```

---

## Using TanStack Query in components

### Fetching a list

```tsx
import { useQuery } from "@tanstack/react-query";
import { getCourses } from "@/services/courses";
import type { Course } from "@/types";

export function CatalogPage() {
  const {
    data: courses,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["courses"], // unique cache key
    queryFn: getCourses,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage />;

  return (
    <div className="grid grid-cols-3 gap-6">
      {courses?.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
```

### Fetching a single item

```tsx
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCourseById } from "@/services/courses";

export function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data: course, isLoading } = useQuery({
    queryKey: ["course", id], // key includes the id — separate cache per course
    queryFn: () => getCourseById(id!),
    enabled: !!id, // don't run if id is undefined
  });

  if (isLoading) return <LoadingSpinner />;
  if (!course) return <NotFound />;

  return <CourseDetail course={course} />;
}
```

### Mutations (POST / PUT / DELETE)

```tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enrollInCourse } from "@/services/courses";

export function EnrollButton({ courseId }: { courseId: string }) {
  const queryClient = useQueryClient();

  const { mutate: enroll, isPending } = useMutation({
    mutationFn: () => enrollInCourse(courseId),
    onSuccess: () => {
      // Invalidate the courses cache so it refetches with enrolled status
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });

  return (
    <button
      onClick={() => enroll()}
      disabled={isPending}
      className="bg-brand-purple rounded-pill px-6 py-3"
    >
      {isPending ? "Enrolling..." : "Enroll Now"}
    </button>
  );
}
```

---

## Query key conventions

Query keys must be consistent — they are the cache identifier.

| Data                    | Key                         |
| ----------------------- | --------------------------- |
| All courses             | `["courses"]`               |
| Courses by category     | `["courses", { category }]` |
| Single course           | `["course", id]`            |
| Current user            | `["user", "me"]`            |
| User's enrolled courses | `["user", "me", "courses"]` |

---

## Mock data

`src/lib/mockData.ts` is the fake database until the backend exists.
All service functions import from here while in development.

```ts
// src/lib/mockData.ts
import type { Course, User, Instructor } from "@/types";

export const mockInstructors: Instructor[] = [
  {
    id: "inst-1",
    name: "Sarah Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    rating: 4.9,
    studentCount: 84300,
    courseCount: 8,
    bio: "Senior Product Designer with 12 years at Google and Airbnb.",
  },
];

export const mockCourses: Course[] = [
  {
    id: "course-1",
    title: "Complete UI/UX Design Masterclass",
    description: "From wireframes to polished interfaces.",
    thumbnail: "https://picsum.photos/seed/uiux/640/360",
    instructor: mockInstructors[0],
    price: 799,
    rating: 4.8,
    reviewCount: 12400,
    duration: 2280, // minutes
    lessonCount: 210,
    level: "intermediate",
    category: "Design",
    enrolled: false,
  },
];
```

When the real API is ready: update the service function to call `fetch()` and remove the mock import. The component doesn't change at all.
