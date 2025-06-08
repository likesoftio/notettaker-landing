import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and tailwind-merge
 * This ensures proper Tailwind CSS class merging and deduplication
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Design system configuration for consistent styling
 */
export const designTokens = {
  colors: {
    primary: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
    },
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
  },
  spacing: {
    sectionPadding: "py-16 lg:py-24",
    containerPadding: "px-4 sm:px-6 lg:px-8",
    containerMaxWidth: "max-w-7xl mx-auto",
    contentMaxWidth: "max-w-4xl mx-auto",
    proseMaxWidth: "max-w-3xl mx-auto",
  },
  typography: {
    fontFamily:
      'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    display: {
      "2xl": "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight",
      xl: "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight",
      lg: "text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight",
    },
    heading: {
      xl: "text-xl sm:text-2xl lg:text-3xl font-semibold",
      lg: "text-lg sm:text-xl lg:text-2xl font-semibold",
      md: "text-base sm:text-lg lg:text-xl font-semibold",
    },
    body: {
      lg: "text-base sm:text-lg leading-relaxed",
      md: "text-sm sm:text-base leading-relaxed",
    },
    caption: "text-xs sm:text-sm text-gray-600 dark:text-gray-400",
  },
  components: {
    pageContainer: "min-h-screen bg-white dark:bg-gray-900 transition-colors",
    pageMain: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24",
    pageHeader: "text-center mb-12",
    pageTitle:
      "text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4",
    pageSubtitle:
      "text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto",
    cardBase:
      "bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm",
    cardHover:
      "hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200",
    buttonPrimary:
      "bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
    buttonSecondary:
      "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium px-6 py-3 rounded-lg transition-colors",
    inputBase:
      "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
    gridResponsive2: "grid grid-cols-1 lg:grid-cols-2 gap-8",
    gridResponsive3: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
    gridResponsive4:
      "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
    proseContent:
      "prose prose-gray dark:prose-invert max-w-none prose-lg prose-headings:font-semibold prose-headings:text-gray-900 dark:prose-headings:text-white prose-h1:text-4xl sm:prose-h1:text-5xl prose-h2:text-2xl sm:prose-h2:text-3xl prose-h3:text-xl sm:prose-h3:text-2xl prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800",
  },
};

/**
 * Helper functions for common patterns
 */
export const createResponsiveClasses = (
  mobile: string,
  tablet?: string,
  desktop?: string,
) => {
  let classes = mobile;
  if (tablet) classes += ` md:${tablet}`;
  if (desktop) classes += ` lg:${desktop}`;
  return classes;
};

export const createThemeClasses = (light: string, dark: string) => {
  return `${light} dark:${dark}`;
};

/**
 * Validation helpers
 */
export const isValidColor = (color: string) => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
};

export const isValidBreakpoint = (breakpoint: string) => {
  return ["sm", "md", "lg", "xl", "2xl"].includes(breakpoint);
};

/**
 * Accessibility helpers
 */
export const getFocusClasses = () => {
  return "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900";
};

export const getVisuallyHiddenClasses = () => {
  return "sr-only";
};

/**
 * Animation helpers
 */
export const getTransitionClasses = () => {
  return "transition-colors duration-300";
};

export const getHoverEffectClasses = () => {
  return "transform hover:scale-105 transition-transform duration-200";
};
