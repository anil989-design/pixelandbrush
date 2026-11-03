import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PageSkeleton from "../components/common/PageSkeleton";
import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "../features/auth/ProtectedRoute";

const LoginPage = lazy(() => import("../features/auth/LoginPage"));
const ClientDashboardPage = lazy(() => import("../features/dashboard/ClientDashboardPage"));
const AdminDashboardPage = lazy(() => import("../features/admin/AdminDashboardPage"));

/** Everything behind (or leading to) authentication. Mounted under `/*`. */
export default function AuthArea() {
  return (
    <AuthProvider>
      <Suspense fallback={<PageSkeleton />}>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <ClientDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin"
            element={
              <ProtectedRoute requireAdmin>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          {/* Unknown URL → home (previously a blank page). */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}
