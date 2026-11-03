import { Navigate } from "react-router-dom";
import PageSkeleton from "../../components/common/PageSkeleton";
import { useAuth } from "../../context/AuthContext";
import { isAdminUser } from "../../services/authService";

/** Gate for authenticated routes. `requireAdmin` additionally checks the admin role. */
export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { session } = useAuth();

  if (session === undefined) return <PageSkeleton label="Authenticating…" />;
  if (!session) return <Navigate to="/login" replace />;
  if (requireAdmin && !isAdminUser(session.user)) return <Navigate to="/dashboard" replace />;

  return children;
}
