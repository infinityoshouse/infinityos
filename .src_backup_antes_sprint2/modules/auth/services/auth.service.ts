import type {
  AuthSession,
  LoginRequest,
  LoginResponse,
} from "../types/auth.types";

const SESSION_KEY = "infinityos.session";
const COOKIE_NAME = "infinity.token";

class AuthService {
  async signIn(data: LoginRequest): Promise<LoginResponse> {
    // TODO: Integrar com a API do Infinity O.S.

    const response: LoginResponse = {
      success: true,
      token: crypto.randomUUID(),
      refreshToken: crypto.randomUUID(),
      user: {
        id: crypto.randomUUID(),
        name: "Administrador",
        email: data.email,
        role: "admin",
        active: true,
      },
    };

    const session: AuthSession = {
      token: response.token,
      refreshToken: response.refreshToken,
      user: response.user,
      expiresAt: Date.now() + 1000 * 60 * 60 * 8,
    };

    this.saveSession(session);

    return response;
  }

  async signOut(): Promise<void> {
    if (typeof window === "undefined") return;

    localStorage.removeItem(SESSION_KEY);

    document.cookie = `${COOKIE_NAME}=; Max-Age=0; Path=/; SameSite=Lax`;
  }

  getSession(): AuthSession | null {
    if (typeof window === "undefined") return null;

    const session = localStorage.getItem(SESSION_KEY);

    if (!session) {
      return null;
    }

    try {
      return JSON.parse(session) as AuthSession;
    } catch {
      localStorage.removeItem(SESSION_KEY);

      document.cookie = `${COOKIE_NAME}=; Max-Age=0; Path=/; SameSite=Lax`;

      return null;
    }
  }

  saveSession(session: AuthSession): void {
    if (typeof window === "undefined") return;

    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify(session)
    );

    document.cookie =
      `${COOKIE_NAME}=${session.token}; ` +
      "Path=/; " +
      "SameSite=Lax; " +
      `Max-Age=${60 * 60 * 8}`;
  }

  isAuthenticated(): boolean {
    const session = this.getSession();

    if (!session) {
      return false;
    }

    if (
      session.expiresAt &&
      session.expiresAt < Date.now()
    ) {
      this.signOut();
      return false;
    }

    return true;
  }
}

export const authService = new AuthService();
