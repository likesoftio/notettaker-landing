// API Types for DRF Integration

// Common API Response structure
export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
  success: boolean;
}

// Paginated response from DRF
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Error response from DRF
export interface ApiError {
  detail?: string;
  non_field_errors?: string[];
  [key: string]: string | string[] | undefined;
}

// Authentication types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: "admin" | "editor" | "author";
    avatar?: string;
  };
}

export interface RefreshTokenRequest {
  refresh: string;
}

export interface RefreshTokenResponse {
  access: string;
}

// Blog Post API types (matching DRF serializers)
export interface BlogPostRequest {
  title: string;
  content: string;
  excerpt: string;
  hero_image?: string;
  category: string; // Category ID
  tags: string[];
  status: "draft" | "published" | "archived";
  featured: boolean;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
}

export interface BlogPostResponse {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  hero_image?: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  tags: string[];
  status: "draft" | "published" | "archived";
  featured: boolean;
  views: number;
  read_time: number;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
  published_at?: string;
  created_at: string;
  updated_at: string;
}

// Blog Category API types
export interface BlogCategoryRequest {
  name: string;
  description?: string;
  color?: string;
  image?: string;
}

export interface BlogCategoryResponse {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  image?: string;
  post_count: number;
  created_at: string;
  updated_at: string;
}

// Blog Author API types
export interface BlogAuthorResponse {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  social_links?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  post_count: number;
  created_at: string;
  updated_at: string;
}

// Blog Stats API types
export interface BlogStatsResponse {
  total_posts: number;
  published_posts: number;
  draft_posts: number;
  total_views: number;
  total_categories: number;
  total_authors: number;
  recent_posts: BlogPostResponse[];
  popular_posts: BlogPostResponse[];
  top_categories: Array<{
    category: BlogCategoryResponse;
    post_count: number;
  }>;
}

// File upload types
export interface FileUploadResponse {
  url: string;
  filename: string;
  size: number;
  content_type: string;
}

// Search types
export interface SearchRequest {
  query: string;
  category?: string;
  tags?: string[];
  status?: string;
  page?: number;
  page_size?: number;
}

export interface SearchResponse {
  results: BlogPostResponse[];
  count: number;
  query: string;
  facets?: {
    categories: Array<{ id: string; name: string; count: number }>;
    tags: Array<{ name: string; count: number }>;
  };
}

// HTTP Method types
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// Request configuration
export interface RequestConfig {
  method: HttpMethod;
  url: string;
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;
}

// API Client response
export interface ApiClientResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}
