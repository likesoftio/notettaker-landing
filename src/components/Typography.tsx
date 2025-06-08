import React from "react";
import { cn } from "../lib/utils";

// Unified typography component system for consistent fonts and styling

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

// Display typography - for hero sections and major headings
export const DisplayXL = ({
  children,
  className,
  as: Component = "h1",
}: TypographyProps) => (
  <Component
    className={cn("text-display-2xl text-gray-900 dark:text-white", className)}
  >
    {children}
  </Component>
);

export const DisplayLG = ({
  children,
  className,
  as: Component = "h1",
}: TypographyProps) => (
  <Component
    className={cn("text-display-xl text-gray-900 dark:text-white", className)}
  >
    {children}
  </Component>
);

export const DisplayMD = ({
  children,
  className,
  as: Component = "h2",
}: TypographyProps) => (
  <Component
    className={cn("text-display-lg text-gray-900 dark:text-white", className)}
  >
    {children}
  </Component>
);

// Heading typography - for section headings
export const HeadingXL = ({
  children,
  className,
  as: Component = "h2",
}: TypographyProps) => (
  <Component
    className={cn("text-heading-xl text-gray-900 dark:text-white", className)}
  >
    {children}
  </Component>
);

export const HeadingLG = ({
  children,
  className,
  as: Component = "h3",
}: TypographyProps) => (
  <Component
    className={cn("text-heading-lg text-gray-900 dark:text-white", className)}
  >
    {children}
  </Component>
);

export const HeadingMD = ({
  children,
  className,
  as: Component = "h4",
}: TypographyProps) => (
  <Component
    className={cn("text-heading-md text-gray-900 dark:text-white", className)}
  >
    {children}
  </Component>
);

// Body typography - for regular content
export const BodyLG = ({
  children,
  className,
  as: Component = "p",
}: TypographyProps) => (
  <Component
    className={cn("text-body-lg text-gray-600 dark:text-gray-300", className)}
  >
    {children}
  </Component>
);

export const BodyMD = ({
  children,
  className,
  as: Component = "p",
}: TypographyProps) => (
  <Component
    className={cn("text-body-md text-gray-600 dark:text-gray-300", className)}
  >
    {children}
  </Component>
);

// Caption typography - for small text and metadata
export const Caption = ({
  children,
  className,
  as: Component = "span",
}: TypographyProps) => (
  <Component
    className={cn("text-caption text-gray-500 dark:text-gray-400", className)}
  >
    {children}
  </Component>
);

// Special typography variants
export const Lead = ({ children, className }: Omit<TypographyProps, "as">) => (
  <p
    className={cn(
      "text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed",
      className,
    )}
  >
    {children}
  </p>
);

export const Muted = ({
  children,
  className,
  as: Component = "p",
}: TypographyProps) => (
  <Component
    className={cn("text-sm text-gray-500 dark:text-gray-400", className)}
  >
    {children}
  </Component>
);

export const Small = ({
  children,
  className,
  as: Component = "small",
}: TypographyProps) => (
  <Component className={cn("text-xs font-medium leading-none", className)}>
    {children}
  </Component>
);

// Link typography
export const LinkText = ({
  children,
  className,
  href,
  ...props
}: TypographyProps & { href?: string }) => (
  <a
    href={href}
    className={cn(
      "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors underline-offset-4 hover:underline",
      className,
    )}
    {...props}
  >
    {children}
  </a>
);

// Code typography
export const Code = ({ children, className }: Omit<TypographyProps, "as">) => (
  <code
    className={cn(
      "relative rounded bg-gray-100 dark:bg-gray-800 px-[0.3rem] py-[0.2rem] font-mono text-sm text-blue-600 dark:text-blue-400",
      className,
    )}
  >
    {children}
  </code>
);

// Blockquote typography
export const Blockquote = ({
  children,
  className,
}: Omit<TypographyProps, "as">) => (
  <blockquote
    className={cn(
      "border-l-4 border-gray-300 dark:border-gray-600 pl-6 italic text-gray-700 dark:text-gray-300",
      className,
    )}
  >
    {children}
  </blockquote>
);

// Typography utility component for maintaining consistent font family
export const TypographyProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => <div className="font-sans antialiased">{children}</div>;

// Typography configuration object for programmatic access
export const typographyConfig = {
  fontFamily: {
    sans: [
      "ui-sans-serif",
      "system-ui",
      "sans-serif",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
      "Noto Color Emoji",
    ],
  },
  fontSize: {
    "display-2xl": [
      "clamp(2.5rem, 5vw, 4rem)",
      { lineHeight: "1.1", letterSpacing: "-0.02em" },
    ],
    "display-xl": [
      "clamp(2rem, 4vw, 3rem)",
      { lineHeight: "1.2", letterSpacing: "-0.01em" },
    ],
    "display-lg": [
      "clamp(1.75rem, 3vw, 2.5rem)",
      { lineHeight: "1.2", letterSpacing: "-0.01em" },
    ],
    "heading-xl": ["clamp(1.5rem, 2.5vw, 2rem)", { lineHeight: "1.3" }],
    "heading-lg": ["clamp(1.25rem, 2vw, 1.75rem)", { lineHeight: "1.4" }],
    "heading-md": ["clamp(1.125rem, 1.5vw, 1.5rem)", { lineHeight: "1.4" }],
    "body-lg": ["clamp(1rem, 1.2vw, 1.125rem)", { lineHeight: "1.6" }],
    "body-md": ["clamp(0.875rem, 1vw, 1rem)", { lineHeight: "1.6" }],
    caption: ["clamp(0.75rem, 0.8vw, 0.875rem)", { lineHeight: "1.5" }],
  },
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
};

export default {
  DisplayXL,
  DisplayLG,
  DisplayMD,
  HeadingXL,
  HeadingLG,
  HeadingMD,
  BodyLG,
  BodyMD,
  Caption,
  Lead,
  Muted,
  Small,
  LinkText,
  Code,
  Blockquote,
  TypographyProvider,
  typographyConfig,
};
