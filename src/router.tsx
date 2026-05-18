import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route
        path="/"
        element={
          <div className="flex min-h-screen items-center justify-center">
            <div className="bg-surface-dark text-ink font-display text-2xl rounded-pill px-6 py-3 bg-brand-purple">
              Token test
            </div>
            <Button variant="outline">Button</Button>
          </div>
        }
      />
    </Route>,
  ),
);
