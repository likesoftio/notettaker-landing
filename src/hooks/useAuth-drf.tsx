// Authentication hook for DRF Backend
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import apiClient, { ApiClientError } from "../lib/api-client";
import { API_CONFIG } from "../config/api";
import { LoginRequest, LoginResponse } from "../types/api";

// User interface
export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "editor" | "author";
  avatar?: string;
}

// Auth context interface
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    setIsLoading(true);

    try {
      const token = apiClient.getAccessToken();
      if (!token) {
        setIsLoading(false);
        return;
      }

      // Try to get current user info
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.AUTH.USER);
      const userData = response.data;

      setUser({
        id: userData.id,
        email: userData.email,
        name:
          `${userData.first_name} ${userData.last_name}`.trim() ||
          userData.email,
        role: userData.role,
        avatar: userData.avatar,
      });
    } catch (error) {
      console.error("Auth check failed:", error);
      // Clear invalid tokens
      apiClient.clearAuthTokens();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);

      const loginData: LoginRequest = { email, password };
      const response = await apiClient.post<LoginResponse>(
        API_CONFIG.ENDPOINTS.AUTH.LOGIN,
        loginData,
      );

      const { access, refresh, user: userData } = response.data;

      // Store tokens
      apiClient.setAuthTokens(access, refresh);

      // Set user data
      setUser({
        id: userData.id,
        email: userData.email,
        name:
          `${userData.first_name} ${userData.last_name}`.trim() ||
          userData.email,
        role: userData.role,
        avatar: userData.avatar,
      });
    } catch (error) {
      console.error("Login failed:", error);

      if (error instanceof ApiClientError) {
        if (error.status === 401) {
          throw new Error("Неверный email или пароль");
        } else if (error.data?.detail) {
          throw new Error(error.data.detail);
        } else if (error.data?.non_field_errors) {
          throw new Error(error.data.non_field_errors.join(", "));
        }
      }

      throw new Error("Ошибка входа в систему");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);

      // Try to logout on server
      try {
        await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
      } catch (error) {
        // Ignore logout errors on server side
        console.warn("Server logout failed:", error);
      }

      // Clear local state and tokens
      apiClient.clearAuthTokens();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshToken = async (): Promise<void> => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.REFRESH, {
        refresh: refreshToken,
      });

      const { access } = response.data;
      localStorage.setItem("access_token", access);
    } catch (error) {
      console.error("Token refresh failed:", error);
      // Clear tokens and logout user
      apiClient.clearAuthTokens();
      setUser(null);
      throw error;
    }
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;

    // Admin has all permissions
    if (user.role === "admin") return true;

    // Define role-based permissions
    const permissions: Record<string, string[]> = {
      admin: [
        "create",
        "read",
        "update",
        "delete",
        "manage_users",
        "manage_categories",
      ],
      editor: ["create", "read", "update", "delete", "manage_categories"],
      author: ["create", "read", "update_own"],
    };

    const userPermissions = permissions[user.role] || [];
    return userPermissions.includes(permission);
  };

  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    refreshToken,
    hasPermission,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
