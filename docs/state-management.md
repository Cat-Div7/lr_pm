# State Management

How we use Zustand for global state and when NOT to use it.

---

## The core rule

> If only one component needs the data → `useState` inside that component.
> If a page needs the data → `useState` at the page level, passed as props.
> If multiple pages or unrelated components need the data → Zustand store.

Do not put everything in Zustand. Most state is local.

---

## What lives in Zustand

| Store file             | What it holds                                           |
| ---------------------- | ------------------------------------------------------- |
| `store/authStore.ts`   | Logged-in user, auth token, login/logout actions        |
| `store/playerStore.ts` | Current playing lesson, playback position, is playing   |
| `store/uiStore.ts`     | Sidebar open/closed, active theme, global loading state |

That's it. If you think you need a new store, ask first.

---

## Store files

### `src/store/authStore.ts`

```ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";

interface AuthStore {
  user: User | null;
  token: string | null;
  setUser: (user: User, token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      setUser: (user, token) => set({ user, token }),

      logout: () => set({ user: null, token: null }),

      // Derived value — call as a function: store.isAuthenticated()
      isAuthenticated: () => get().token !== null,
    }),
    {
      name: "luminary-auth", // key in localStorage
      partialize: (state) => ({ user: state.user, token: state.token }),
    },
  ),
);
```

### `src/store/playerStore.ts`

```ts
import { create } from "zustand";

interface PlayerStore {
  lessonId: string | null;
  courseId: string | null;
  isPlaying: boolean;
  currentTime: number;
  setLesson: (lessonId: string, courseId: string) => void;
  setIsPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  lessonId: null,
  courseId: null,
  isPlaying: false,
  currentTime: 0,

  setLesson: (lessonId, courseId) =>
    set({ lessonId, courseId, currentTime: 0 }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentTime: (currentTime) => set({ currentTime }),
}));
```

### `src/store/uiStore.ts`

```ts
import { create } from "zustand";

interface UIStore {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
```

---

## How to use a store in a component

```tsx
import { useAuthStore } from "@/store/authStore";

export function Navbar() {
  // Select only what you need — not the whole store
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  // Never do this — causes re-renders on every store change
  // const store = useAuthStore()

  return (
    <nav>
      {user ? (
        <>
          <span>{user.name}</span>
          <button onClick={logout}>Sign out</button>
        </>
      ) : (
        <a href="/auth/login">Sign in</a>
      )}
    </nav>
  );
}
```

---

## What does NOT go in Zustand

```
Form values            → use React Hook Form
API/server data        → use TanStack Query
Component open/closed  → useState in that component
Hover/focus state      → useState in that component
Filter selections      → useState in the catalog page
Modal open state       → useState in the parent that controls it
```
