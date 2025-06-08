// HTTP Client for Django REST Framework API
import {
  ApiClientResponse,
  ApiError,
  RequestConfig,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from "../types/api";
import {
  API_CONFIG,
  buildApiUrl,
  getAuthHeaders,
  getDefaultHeaders,
} from "../config/api";

// Custom error class for API errors
export class ApiClientError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data: ApiError,
    public url: string,
  ) {
    super(`API Error: ${status} ${statusText}`);
    this.name = "ApiClientError";
  }
}

// Token management
class TokenManager {
  private isRefreshing = false;
  private refreshPromise: Promise<string> | null = null;

  getAccessToken(): string | null {
    return localStorage.getItem("access_token");
  }

  getRefreshToken(): string | null {
    return localStorage.getItem("refresh_token");
  }

  setTokens(access: string, refresh: string): void {
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
  }

  clearTokens(): void {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }

  async refreshAccessToken(): Promise<string> {
    if (this.isRefreshing && this.refreshPromise) {
      return this.refreshPromise;
    }

    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    this.isRefreshing = true;
    this.refreshPromise = this.performTokenRefresh(refreshToken);

    try {
      const newToken = await this.refreshPromise;
      this.isRefreshing = false;
      this.refreshPromise = null;
      return newToken;
    } catch (error) {
      this.isRefreshing = false;
      this.refreshPromise = null;
      this.clearTokens();
      throw error;
    }
  }

  private async performTokenRefresh(refreshToken: string): Promise<string> {
    const response = await fetch(
      buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.REFRESH),
      {
        method: "POST",
        headers: getDefaultHeaders(),
        body: JSON.stringify({ refresh: refreshToken } as RefreshTokenRequest),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const data: RefreshTokenResponse = await response.json();
    localStorage.setItem("access_token", data.access);
    return data.access;
  }
}

const tokenManager = new TokenManager();

// Main API Client class
export class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  // Generic request method
  async request<T = any>(config: RequestConfig): Promise<ApiClientResponse<T>> {
    const url = config.url.startsWith("http")
      ? config.url
      : buildApiUrl(config.url);
    const headers = {
      ...getDefaultHeaders(),
      ...config.headers,
    };

    // Add auth header if token exists
    const token = tokenManager.getAccessToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const requestConfig: RequestInit = {
      method: config.method,
      headers,
      signal: AbortSignal.timeout(config.timeout || this.timeout),
    };

    // Add body for non-GET requests
    if (config.data && config.method !== "GET") {
      if (config.data instanceof FormData) {
        // Don't set Content-Type for FormData, let browser set it
        delete headers["Content-Type"];
        requestConfig.body = config.data;
      } else {
        requestConfig.body = JSON.stringify(config.data);
      }
    }

    // Add query parameters for GET requests
    if (config.params && config.method === "GET") {
      const searchParams = new URLSearchParams();
      Object.entries(config.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      const paramString = searchParams.toString();
      if (paramString) {
        const separator = url.includes("?") ? "&" : "?";
        config.url = `${url}${separator}${paramString}`;
      }
    }

    try {
      const response = await fetch(url, requestConfig);
      const responseData = await this.parseResponse<T>(response);

      return {
        data: responseData,
        status: response.status,
        statusText: response.statusText,
        headers: this.parseHeaders(response.headers),
      };
    } catch (error) {
      if (error instanceof ApiClientError && error.status === 401) {
        // Try to refresh token and retry request
        try {
          await tokenManager.refreshAccessToken();
          // Retry request with new token
          headers["Authorization"] = `Bearer ${tokenManager.getAccessToken()}`;
          const retryResponse = await fetch(url, { ...requestConfig, headers });
          const retryData = await this.parseResponse<T>(retryResponse);

          return {
            data: retryData,
            status: retryResponse.status,
            statusText: retryResponse.statusText,
            headers: this.parseHeaders(retryResponse.headers),
          };
        } catch (refreshError) {
          // Refresh failed, redirect to login
          window.location.href = "/admin/login";
          throw refreshError;
        }
      }
      throw error;
    }
  }

  // Convenience methods
  async get<T = any>(
    url: string,
    params?: Record<string, any>,
  ): Promise<ApiClientResponse<T>> {
    return this.request<T>({ method: "GET", url, params });
  }

  async post<T = any>(url: string, data?: any): Promise<ApiClientResponse<T>> {
    return this.request<T>({ method: "POST", url, data });
  }

  async put<T = any>(url: string, data?: any): Promise<ApiClientResponse<T>> {
    return this.request<T>({ method: "PUT", url, data });
  }

  async patch<T = any>(url: string, data?: any): Promise<ApiClientResponse<T>> {
    return this.request<T>({ method: "PATCH", url, data });
  }

  async delete<T = any>(url: string): Promise<ApiClientResponse<T>> {
    return this.request<T>({ method: "DELETE", url });
  }

  // File upload with progress
  async uploadFile(
    url: string,
    file: File,
    onProgress?: (progress: number) => void,
  ): Promise<ApiClientResponse> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      formData.append("file", file);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && onProgress) {
          const progress = (event.loaded / event.total) * 100;
          onProgress(progress);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            resolve({
              data,
              status: xhr.status,
              statusText: xhr.statusText,
              headers: this.parseXHRHeaders(xhr),
            });
          } catch (error) {
            reject(new Error("Failed to parse response"));
          }
        } else {
          reject(
            new ApiClientError(
              xhr.status,
              xhr.statusText,
              JSON.parse(xhr.responseText),
              url,
            ),
          );
        }
      };

      xhr.onerror = () => {
        reject(new Error("Upload failed"));
      };

      xhr.open("POST", buildApiUrl(url));

      // Add auth header
      const token = tokenManager.getAccessToken();
      if (token) {
        xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      }

      xhr.send(formData);
    });
  }

  // Parse response and handle errors
  private async parseResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get("content-type");
    let data: any;

    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw new ApiClientError(
        response.status,
        response.statusText,
        data,
        response.url,
      );
    }

    return data;
  }

  // Parse response headers
  private parseHeaders(headers: Headers): Record<string, string> {
    const parsed: Record<string, string> = {};
    headers.forEach((value, key) => {
      parsed[key] = value;
    });
    return parsed;
  }

  // Parse XHR headers
  private parseXHRHeaders(xhr: XMLHttpRequest): Record<string, string> {
    const headers: Record<string, string> = {};
    const headerString = xhr.getAllResponseHeaders();

    if (headerString) {
      headerString.split("\n").forEach((line) => {
        const [key, value] = line.split(": ");
        if (key && value) {
          headers[key.toLowerCase()] = value.trim();
        }
      });
    }

    return headers;
  }

  // Token management methods
  setAuthTokens(access: string, refresh: string): void {
    tokenManager.setTokens(access, refresh);
  }

  clearAuthTokens(): void {
    tokenManager.clearTokens();
  }

  getAccessToken(): string | null {
    return tokenManager.getAccessToken();
  }

  isAuthenticated(): boolean {
    return !!tokenManager.getAccessToken();
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;
