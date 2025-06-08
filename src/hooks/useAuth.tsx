import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import authService, { AuthState, User } from "../lib/auth";

interface AuthContextType extends AuthState {
  login: (
    username: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (
    updates: Partial<User>,
  ) => Promise<{ success: boolean; error?: string }>;
  hasPermission: (role?: "admin" | "editor") => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Initialize auth state
    const currentState = authService.getAuthState();
    setAuthState({ ...currentState, isLoading: false });

    // Subscribe to auth changes
    const unsubscribe = authService.subscribe((newState) => {
      setAuthState({ ...newState, isLoading: false });
    });

    return unsubscribe;
  }, []);

  const login = async (username: string, password: string) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    const result = await authService.login(username, password);
    if (!result.success) {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
    return result;
  };

  const logout = () => {
    authService.logout();
  };

  const updateProfile = async (updates: Partial<User>) => {
    return await authService.updateProfile(updates);
  };

  const hasPermission = (role: "admin" | "editor" = "editor") => {
    return authService.hasPermission(role);
  };

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
    updateProfile,
    hasPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Higher-order component for protecting routes
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  requiredRole: "admin" | "editor" = "editor",
) {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, isLoading, hasPermission } = useAuth();

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Загрузка...</p>
          </div>
        </div>
      );
    }

    if (!isAuthenticated || !hasPermission(requiredRole)) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600 dark:text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Доступ запрещен
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              У вас нет прав для просмотра этой страницы
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              На главную
            </button>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}

export default useAuth;
