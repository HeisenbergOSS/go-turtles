// src/components/Layout.tsx
import { Outlet, Link } from "react-router-dom";

export function Layout() {
  return (
    <div className="bg-slate-900 text-white min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold hover:text-cyan-400">Turtles App</Link>
          <nav className="flex gap-4">
            <Link to="/" className="text-slate-300 hover:text-white">Home</Link>
            <Link to="/login" className="text-slate-300 hover:text-white">Login</Link>
          </nav>
        </header>
        <main>
          <Outlet /> 
        </main>
      </div>
    </div>
  );
}