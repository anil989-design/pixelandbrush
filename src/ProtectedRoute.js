import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { session } = useAuth();

  if (session === undefined) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#060912",
        color: "#60a5fa",
        fontFamily: "'Outfit', sans-serif"
      }}>
        Authenticating...
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin) {
    const isAdmin = session.user?.user_metadata?.role === "admin";
    if (!isAdmin) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
}