import React, { useState, useRef, useCallback } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import {
  Upload,
  X,
  Image as ImageIcon,
  Link as LinkIcon,
  Check,
  AlertCircle,
  Camera,
  FileImage,
} from "lucide-react";
import { cn } from "../lib/utils";

export interface UploadedImage {
  id: string;
  url: string;
  name: string;
  size: number;
  type: string;
  thumbnail?: string;
}

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onImagesChange?: (images: UploadedImage[]) => void;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // in MB
  acceptedTypes?: string[];
  className?: string;
  placeholder?: string;
  label?: string;
  description?: string;
}

// Demo image storage (in production, use cloud storage like S3/Cloudinary)
class ImageStorage {
  private static images: UploadedImage[] = [];

  static async uploadImage(file: File): Promise<UploadedImage> {
    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Create object URL for demo (in production, upload to cloud)
    const url = URL.createObjectURL(file);

    const uploadedImage: UploadedImage = {
      id: Date.now().toString(),
      url,
      name: file.name,
      size: file.size,
      type: file.type,
      thumbnail: url, // In production, generate thumbnail
    };

    this.images.push(uploadedImage);
    return uploadedImage;
  }

  static async uploadFromUrl(url: string): Promise<UploadedImage> {
    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const uploadedImage: UploadedImage = {
      id: Date.now().toString(),
      url,
      name: url.split("/").pop() || "image",
      size: 0,
      type: "image/jpeg",
      thumbnail: url,
    };

    this.images.push(uploadedImage);
    return uploadedImage;
  }

  static getImages(): UploadedImage[] {
    return this.images;
  }

  static deleteImage(id: string): void {
    this.images = this.images.filter((img) => img.id !== id);
  }
}

export default function ImageUpload({
  value = "",
  onChange,
  onImagesChange,
  multiple = false,
  maxFiles = 5,
  maxSize = 5, // 5MB
  acceptedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"],
  className,
  placeholder = "Введите URL изображения или загрузите файл",
  label = "Изображение",
  description,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [urlInput, setUrlInput] = useState(value);
  const [error, setError] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file validation
  const validateFile = (file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return `Неподдерживаемый тип файла. Разрешены: ${acceptedTypes.join(", ")}`;
    }

    if (file.size > maxSize * 1024 * 1024) {
      return `Файл слишком большой. Максимальный размер: ${maxSize}MB`;
    }

    return null;
  };

  // Handle file upload
  const handleFileUpload = useCallback(
    async (files: FileList) => {
      setError("");
      const fileArray = Array.from(files);

      // Validate file count
      if (!multiple && fileArray.length > 1) {
        setError("Можно загрузить только один файл");
        return;
      }

      if (multiple && fileArray.length > maxFiles) {
        setError(`Максимальное количество файлов: ${maxFiles}`);
        return;
      }

      // Validate each file
      for (const file of fileArray) {
        const validationError = validateFile(file);
        if (validationError) {
          setError(validationError);
          return;
        }
      }

      setIsUploading(true);

      try {
        const uploadPromises = fileArray.map(async (file) => {
          // Update progress
          setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }));

          // Simulate progress
          const progressInterval = setInterval(() => {
            setUploadProgress((prev) => ({
              ...prev,
              [file.name]: Math.min((prev[file.name] || 0) + 20, 90),
            }));
          }, 200);

          try {
            const uploadedImage = await ImageStorage.uploadImage(file);

            // Complete progress
            clearInterval(progressInterval);
            setUploadProgress((prev) => ({ ...prev, [file.name]: 100 }));

            return uploadedImage;
          } catch (error) {
            clearInterval(progressInterval);
            throw error;
          }
        });

        const results = await Promise.all(uploadPromises);

        if (multiple) {
          setUploadedImages((prev) => [...prev, ...results]);
          onImagesChange?.(uploadedImages.concat(results));
        } else {
          const firstImage = results[0];
          onChange(firstImage.url);
          setUrlInput(firstImage.url);
        }

        // Clear progress after delay
        setTimeout(() => {
          setUploadProgress({});
        }, 1000);
      } catch (error) {
        console.error("Upload error:", error);
        setError("Ошибка при загрузке файла");
      } finally {
        setIsUploading(false);
      }
    },
    [multiple, maxFiles, onChange, onImagesChange, uploadedImages],
  );

  // Handle URL input
  const handleUrlSubmit = async () => {
    if (!urlInput.trim()) return;

    setError("");
    setIsUploading(true);

    try {
      const uploadedImage = await ImageStorage.uploadFromUrl(urlInput);

      if (multiple) {
        setUploadedImages((prev) => [...prev, uploadedImage]);
        onImagesChange?.(uploadedImages.concat(uploadedImage));
      } else {
        onChange(urlInput);
      }
    } catch (error) {
      console.error("URL upload error:", error);
      setError("Ошибка при загрузке изображения по URL");
    } finally {
      setIsUploading(false);
    }
  };

  // Handle drag and drop
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFileUpload(files);
      }
    },
    [handleFileUpload],
  );

  // Remove uploaded image
  const removeImage = (imageId: string) => {
    if (multiple) {
      const filtered = uploadedImages.filter((img) => img.id !== imageId);
      setUploadedImages(filtered);
      onImagesChange?.(filtered);
    } else {
      onChange("");
      setUrlInput("");
    }
    ImageStorage.deleteImage(imageId);
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className={cn("space-y-4", className)}>
      {label && (
        <div>
          <Label className="text-sm font-medium">{label}</Label>
          {description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {description}
            </p>
          )}
        </div>
      )}

      {/* URL Input */}
      <div className="flex gap-2">
        <div className="flex-1">
          <div className="relative">
            <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="url"
              placeholder={placeholder}
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="pl-10"
              onKeyPress={(e) => e.key === "Enter" && handleUrlSubmit()}
            />
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={handleUrlSubmit}
          disabled={!urlInput.trim() || isUploading}
        >
          <Check className="w-4 h-4" />
        </Button>
      </div>

      {/* Drag and Drop Area */}
      <Card
        className={cn(
          "border-2 border-dashed transition-colors p-6",
          isDragging
            ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
            : "border-gray-300 dark:border-gray-600",
          isUploading && "pointer-events-none opacity-60",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
            {isUploading ? (
              <Upload className="h-6 w-6 text-gray-400 animate-pulse" />
            ) : (
              <Camera className="h-6 w-6 text-gray-400" />
            )}
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              {isUploading ? "Загрузка..." : "Перета��ите изображения сюда"}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              или{" "}
              <button
                type="button"
                className="text-blue-600 hover:text-blue-500 font-medium"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                выберите файлы
              </button>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {acceptedTypes.map((type) => type.split("/")[1]).join(", ")} до{" "}
              {maxSize}MB
              {multiple && ` (до ${maxFiles} файлов)`}
            </p>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={acceptedTypes.join(",")}
          multiple={multiple}
          onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
        />
      </Card>

      {/* Upload Progress */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="space-y-2">
          {Object.entries(uploadProgress).map(([fileName, progress]) => (
            <div key={fileName} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400 truncate">
                  {fileName}
                </span>
                <span className="text-gray-500">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          ))}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
          <AlertCircle className="w-4 h-4 text-red-500" />
          <span className="text-sm text-red-700 dark:text-red-400">
            {error}
          </span>
        </div>
      )}

      {/* Uploaded Images Preview */}
      {(multiple ? uploadedImages.length > 0 : value) && (
        <div className="space-y-3">
          <Label className="text-sm font-medium">Загруженные изображения</Label>
          <div
            className={cn(
              "grid gap-3",
              multiple
                ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                : "grid-cols-1",
            )}
          >
            {multiple ? (
              uploadedImages.map((image) => (
                <ImagePreview
                  key={image.id}
                  image={image}
                  onRemove={() => removeImage(image.id)}
                />
              ))
            ) : value ? (
              <ImagePreview
                image={{
                  id: "current",
                  url: value,
                  name: "Current image",
                  size: 0,
                  type: "image/jpeg",
                }}
                onRemove={() => onChange("")}
              />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

// Image Preview Component
function ImagePreview({
  image,
  onRemove,
}: {
  image: UploadedImage;
  onRemove: () => void;
}) {
  return (
    <div className="relative group">
      <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
        <img
          src={image.thumbnail || image.url}
          alt={image.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            e.currentTarget.src =
              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IiNmM2Y0ZjYiLz48Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIzIiBmaWxsPSIjZTVlN2ViIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+";
          }}
        />
      </div>

      {/* Remove button */}
      <button
        type="button"
        onClick={onRemove}
        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="w-3 h-3" />
      </button>

      {/* Image info */}
      <div className="mt-2">
        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
          {image.name}
        </p>
        {image.size > 0 && (
          <p className="text-xs text-gray-400">{formatFileSize(image.size)}</p>
        )}
      </div>
    </div>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
