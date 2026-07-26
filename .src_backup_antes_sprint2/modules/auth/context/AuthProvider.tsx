"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

import { authService } from "../services/auth.service";
import type {
  AuthContextData,
  AuthSession,
  AuthUser,
  LoginRequest,
} from "../types/auth.types";

const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentSession = authService.getSession();

    if (currentSession) {
      setSession(currentSession);
      setUser(currentSession.user);
    }

    setLoading(false);
  }, []);

  async function signIn(data: LoginRequest) {
    const response = await authService.signIn(data);

    const newSession: AuthSession = {
      token: response.token,
      refreshToken: response.refreshToken,
      user: response.user,
      expiresAt: Date.now() + 1000 * 60 * 60 * 8,
    };

    setSession(newSession);
    setUser(response.user);
  }

  async function signOut() {
    await authService.signOut();
    setSession(null);
    setUser(null);
  }

  async function refreshSession() {
    const currentSession = authService.getSession();

    if (currentSession) {
      setSession(currentSession);
      setUser(currentSession.user);
    }
  }

  const value = useMemo<AuthContextData>(
    () => ({
      user,
      session,
      loading,
      signIn,
      signOut,
      refreshSession,
      isAuthenticated: !!session,
    }),
    [user, session, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext deve ser utilizado dentro do AuthProvider.");
  }

  return context;
}
