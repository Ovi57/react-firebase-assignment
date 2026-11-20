import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth, firebaseConfigured } from "../firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    if (!firebaseConfigured || !auth) {
      setLoading(false);
      return undefined;
    }

    let active = true;
    let unsubscribe;

    async function observeAuthState() {
      try {
        // Explicitly keep the signed-in session in this browser across refreshes.
        await setPersistence(auth, browserLocalPersistence);
        if (!active) return;

        unsubscribe = onAuthStateChanged(
          auth,
          (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            setAuthError("");
          },
          (error) => {
            setAuthError(error.message);
            setLoading(false);
          }
        );
      } catch (error) {
        if (!active) return;
        setAuthError(error.message || "Could not initialize Firebase Authentication.");
        setLoading(false);
      }
    }

    observeAuthState();

    return () => {
      active = false;
      if (unsubscribe) unsubscribe();
    };
  }, []);

  async function register(email, password) {
    if (!auth) throw new Error("Firebase is not configured. Follow the setup instructions in README.md.");
    return createUserWithEmailAndPassword(auth, email, password);
  }

  async function login(email, password) {
    if (!auth) throw new Error("Firebase is not configured. Follow the setup instructions in README.md.");
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function logout() {
    if (!auth) throw new Error("Firebase is not configured. Follow the setup instructions in README.md.");
    return signOut(auth);
  }

  const value = useMemo(
    () => ({ user, loading, authError, register, login, logout }),
    [user, loading, authError]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider.");
  }
  return context;
}
