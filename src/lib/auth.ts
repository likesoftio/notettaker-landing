// Authentication system for admin panel
export interface User {
  id: string;
  username: string;
  email: string;
  role: "admin" | "editor";
  name: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Storage keys
const AUTH_STORAGE_KEY = "admin_auth_token";
const USER_STORAGE_KEY = "admin_user_data";

// Default admin credentials (in production, use secure backend)
const DEFAULT_ADMIN = {
  username: "admin",
  password: "admin123",
  user: {
    id: "admin-1",
    username: "admin",
    email: "admin@mymeet.ai",
    role: "admin" as const,
    name: "Администратор",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
};

// Additional editor account
const DEFAULT_EDITOR = {
  username: "editor",
  password: "editor123",
  user: {
    id: "editor-1",
    username: "editor",
    email: "editor@mymeet.ai",
    role: "editor" as const,
    name: "Редактор",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
  },
};

class AuthService {
  private static instance: AuthService;
  private authListeners: Array<(state: AuthState) => void> = [];

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Subscribe to auth state changes
  subscribe(listener: (state: AuthState) => void): () => void {
    this.authListeners.push(listener);

    // Return unsubscribe function
    return () => {
      const index = this.authListeners.indexOf(listener);
      if (index > -1) {
        this.authListeners.splice(index, 1);
      }
    };
  }

  // Notify all listeners about auth state changes
  private notifyListeners(state: AuthState): void {
    this.authListeners.forEach((listener) => listener(state));
  }

  // Get current auth state
  getAuthState(): AuthState {
    const token = localStorage.getItem(AUTH_STORAGE_KEY);
    const userData = localStorage.getItem(USER_STORAGE_KEY);

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        return {
          user,
          isAuthenticated: true,
          isLoading: false,
        };
      } catch (error) {
        console.error("Error parsing user data:", error);
        this.logout();
      }
    }

    return {
      user: null,
      isAuthenticated: false,
      isLoading: false,
    };
  }

  // Login with username and password
  async login(
    username: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      let user: User | null = null;

      // Check admin credentials
      if (
        username === DEFAULT_ADMIN.username &&
        password === DEFAULT_ADMIN.password
      ) {
        user = DEFAULT_ADMIN.user;
      }
      // Check editor credentials
      else if (
        username === DEFAULT_EDITOR.username &&
        password === DEFAULT_EDITOR.password
      ) {
        user = DEFAULT_EDITOR.user;
      }

      if (!user) {
        return {
          success: false,
          error: "Неверный логин или пароль",
        };
      }

      // Generate auth token (in production, use JWT from backend)
      const token = this.generateToken(user);

      // Save to localStorage
      localStorage.setItem(AUTH_STORAGE_KEY, token);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));

      // Notify listeners
      this.notifyListeners({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: "Ошибка при входе в систему",
      };
    }
  }

  // Logout
  logout(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);

    this.notifyListeners({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }

  // Check if user has permission
  hasPermission(requiredRole: "admin" | "editor" = "editor"): boolean {
    const { user, isAuthenticated } = this.getAuthState();

    if (!isAuthenticated || !user) {
      return false;
    }

    if (requiredRole === "admin") {
      return user.role === "admin";
    }

    return user.role === "admin" || user.role === "editor";
  }

  // Generate auth token (simplified)
  private generateToken(user: User): string {
    const payload = {
      userId: user.id,
      username: user.username,
      role: user.role,
      iat: Date.now(),
      exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    };

    // In production, use proper JWT library
    return btoa(JSON.stringify(payload));
  }

  // Verify token
  verifyToken(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token));
      return payload.exp > Date.now();
    } catch {
      return false;
    }
  }

  // Get available demo credentials
  getDemoCredentials() {
    return [
      {
        username: DEFAULT_ADMIN.username,
        password: DEFAULT_ADMIN.password,
        role: "Администратор",
        description: "Полный доступ ко всем функциям",
      },
      {
        username: DEFAULT_EDITOR.username,
        password: DEFAULT_EDITOR.password,
        role: "Редактор",
        description: "Управление контентом блога",
      },
    ];
  }

  // Update user profile
  async updateProfile(
    updates: Partial<User>,
  ): Promise<{ success: boolean; error?: string }> {
    const { user, isAuthenticated } = this.getAuthState();

    if (!isAuthenticated || !user) {
      return { success: false, error: "Пользователь не авторизован" };
    }

    try {
      const updatedUser = { ...user, ...updates };
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));

      this.notifyListeners({
        user: updatedUser,
        isAuthenticated: true,
        isLoading: false,
      });

      return { success: true };
    } catch (error) {
      console.error("Profile update error:", error);
      return { success: false, error: "Ошибка при обновлении профиля" };
    }
  }

  // Change password
  async changePassword(
    currentPassword: string,
    newPassword: string,
  ): Promise<{ success: boolean; error?: string }> {
    const { user } = this.getAuthState();

    if (!user) {
      return { success: false, error: "Пользователь не авторизован" };
    }

    // In production, verify current password with backend
    if (
      user.username === DEFAULT_ADMIN.username &&
      currentPassword !== DEFAULT_ADMIN.password
    ) {
      return { success: false, error: "Неверный текущий пароль" };
    }

    if (
      user.username === DEFAULT_EDITOR.username &&
      currentPassword !== DEFAULT_EDITOR.password
    ) {
      return { success: false, error: "Неверный текущий пароль" };
    }

    // In production, update password in backend
    // For demo, just show success message
    return { success: true };
  }
}

// Export singleton instance
export const authService = AuthService.getInstance();
export default authService;
