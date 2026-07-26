export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "manager" | "employee" | "client";
  active: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  refreshToken?: string;
  user: AuthUser;
}

export interface AuthSession {
  token: string;
  refreshToken?: string;
  expiresAt?: number;
  user: AuthUser;
}

export interface AuthContextData {
  user: AuthUser | null;
  session: AuthSession | null;
  loading: boolean;

  signIn(data: LoginRequest): Promise<void>;
  signOut(): Promise<void>;
  refreshSession(): Promise<void>;
  isAuthenticated: boolean;
}
