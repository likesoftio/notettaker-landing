import { useState } from "react";
import { cn } from "../lib/utils";

interface EnhancedImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: "video" | "square" | "wide" | "portrait";
  showZoom?: boolean;
  showShadow?: boolean;
  overlay?: boolean;
  caption?: string;
}

export default function EnhancedImage({
  src,
  alt,
  className,
  aspectRatio = "video",
  showZoom = true,
  showShadow = true,
  overlay = false,
  caption,
}: EnhancedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const aspectRatioClasses = {
    video: "aspect-video",
    square: "aspect-square",
    wide: "aspect-[21/9]",
    portrait: "aspect-[3/4]",
  };

  return (
    <figure className={cn("group relative", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-lg",
          aspectRatioClasses[aspectRatio],
          showShadow &&
            "shadow-lg group-hover:shadow-xl transition-shadow duration-300",
        )}
      >
        {/* Loading placeholder */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
          </div>
        )}

        {/* Error placeholder */}
        {hasError && (
          <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <svg
                className="w-12 h-12 mx-auto mb-2 opacity-50"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm">Изображение не загружено</p>
            </div>
          </div>
        )}

        {/* Main image */}
        <img
          src={src}
          alt={alt}
          className={cn(
            "w-full h-full object-cover transition-transform duration-500",
            showZoom && "group-hover:scale-105",
            !isLoaded && "opacity-0",
            isLoaded && "opacity-100",
          )}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />

        {/* Overlay gradient */}
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        )}

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Zoom icon */}
        {showZoom && isLoaded && !hasError && (
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-2 rounded-full shadow-lg">
              <svg
                className="w-4 h-4 text-gray-700 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Caption */}
      {caption && (
        <figcaption className="mt-3 text-sm text-gray-600 dark:text-gray-400 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
