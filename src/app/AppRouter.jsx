import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorBoundary from "../components/common/ErrorBoundary";
import PageSkeleton from "../components/common/PageSkeleton";
import HomePage from "../features/landing/HomePage";

/**
 * Route-level code splitting:
 * - `/` (landing) is the only eager route and does NOT pull in Supabase or the auth code.
 * - Everything that needs auth/Supabase (login, client portal, admin) is one lazy chunk group.
 */
const AuthArea = lazy(() => import("./AuthArea"));
const AboutPage = lazy(() => import("../features/about/AboutPage"));

export default function AppRouter() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/*" element={<AuthArea />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
