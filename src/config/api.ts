// API Configuration for DRF Backend
export const API_CONFIG = {
  // Base URL для DRF backend
  BASE_URL:
    import.meta.env.VITE_API_URL ||
    import.meta.env.REACT_APP_API_URL ||
    "http://localhost:8000",

  // API версия
  API_VERSION: "v1",

  // Endpoints
  ENDPOINTS: {
    // Auth endpoints
    AUTH: {
      LOGIN: "/api/auth/login/",
      LOGOUT: "/api/auth/logout/",
      REFRESH: "/api/auth/refresh/",
      REGISTER: "/api/auth/register/",
      USER: "/api/auth/user/",
    },

    // Blog endpoints
    BLOG: {
      POSTS: "/api/blog/posts/",
      CATEGORIES: "/api/blog/categories/",
      AUTHORS: "/api/blog/authors/",
      STATS: "/api/blog/stats/",
      UPLOAD: "/api/blog/upload/",
    },
  },

  // Request configuration
  TIMEOUT: 10000, // 10 seconds

  // Pagination
  DEFAULT_PAGE_SIZE: 20,
} as const;

// Environment-specific settings
export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;

// Build full API URL
export const buildApiUrl = (endpoint: string): string => {
  const baseUrl = API_CONFIG.BASE_URL.replace(/\/$/, ""); // Remove trailing slash
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
};

// Common headers
export const getDefaultHeaders = (): Record<string, string> => ({
  "Content-Type": "application/json",
  Accept: "application/json",
});

// Get auth headers with token
export const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem("access_token");
  return {
    ...getDefaultHeaders(),
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};
