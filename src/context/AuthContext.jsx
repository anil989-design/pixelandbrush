import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getSession, onAuthStateChange } from "../services/authService";

/**
 * Auth state for the protected area (login, client portal, admin).
 * `session`: undefined = still loading · null = signed out · object = signed in.
 */
const AuthContext = createContext({ session: undefined });

export function AuthProvider({ children }) {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    let active = true;

    getSession()
      .then(({ data }) => active && setSession(data.session))
      .catch(() => active && setSession(null)); // never get stuck on "Authenticating..."

    const { data: listener } = onAuthStateChange((_event, nextSession) => setSession(nextSession));

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  // Stable value → consumers only re-render when the session really changes.
  const value = useMemo(() => ({ session }), [session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
