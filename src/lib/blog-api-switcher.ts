// Blog API Switcher - Toggle between localStorage and DRF
import { isDevelopment } from "../config/api";

// Import both API implementations
import LocalStorageBlogAPI from "./blog-api";
import DRFBlogAPI from "./blog-api-drf";

// Determine which API to use based on environment variable
const useDRF =
  process.env.REACT_APP_USE_DRF === "true" ||
  process.env.REACT_APP_API_URL !== undefined;

// Export the appropriate API
const BlogAPI = useDRF ? DRFBlogAPI : LocalStorageBlogAPI;

export default BlogAPI;

// Export API status for debugging
export const getApiStatus = () => ({
  backend: useDRF ? "DRF" : "localStorage",
  apiUrl: process.env.REACT_APP_API_URL || "Not configured",
  isDevelopment,
  useDRF,
});

// Helper function to switch APIs at runtime (for testing)
export const switchApi = (toDRF: boolean) => {
  if (toDRF) {
    if (!process.env.REACT_APP_API_URL) {
      console.warn(
        "DRF API URL not configured. Please set REACT_APP_API_URL environment variable.",
      );
      return false;
    }
    window.localStorage.setItem("use_drf_api", "true");
  } else {
    window.localStorage.removeItem("use_drf_api");
  }

  // Reload page to apply changes
  window.location.reload();
  return true;
};
