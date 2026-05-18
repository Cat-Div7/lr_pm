import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <nav className="flex items-center justify-center pt-2">Navbar</nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}
