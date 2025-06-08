// Blog API functions for DRF Backend
import apiClient, { ApiClientError } from "./api-client";
import { API_CONFIG } from "../config/api";
import {
  BlogPostRequest,
  BlogPostResponse,
  BlogCategoryRequest,
  BlogCategoryResponse,
  BlogAuthorResponse,
  BlogStatsResponse,
  PaginatedResponse,
  SearchRequest,
  SearchResponse,
  FileUploadResponse,
} from "../types/api";
import { BlogPost, BlogCategory, BlogAuthor, BlogStats } from "./database";

// Convert DRF response to frontend types
const convertPostFromApi = (apiPost: BlogPostResponse): BlogPost => ({
  id: apiPost.id,
  title: apiPost.title,
  content: apiPost.content,
  excerpt: apiPost.excerpt,
  slug: apiPost.slug,
  heroImage: apiPost.hero_image || "",
  category: apiPost.category.id,
  author: apiPost.author.id,
  tags: apiPost.tags,
  status: apiPost.status,
  featured: apiPost.featured,
  views: apiPost.views,
  readTime: apiPost.read_time,
  seoTitle: apiPost.seo_title,
  seoDescription: apiPost.seo_description,
  seoKeywords: apiPost.seo_keywords || [],
  publishedAt: apiPost.published_at || "",
  updatedAt: apiPost.updated_at,
  tableOfContents: [], // Will be generated on frontend
});

const convertCategoryFromApi = (
  apiCategory: BlogCategoryResponse,
): BlogCategory => ({
  id: apiCategory.id,
  name: apiCategory.name,
  slug: apiCategory.slug,
  description: apiCategory.description,
  color: apiCategory.color,
  image: apiCategory.image,
  postCount: apiCategory.post_count,
});

const convertAuthorFromApi = (apiAuthor: BlogAuthorResponse): BlogAuthor => ({
  id: apiAuthor.id,
  name: apiAuthor.name,
  email: apiAuthor.email,
  bio: apiAuthor.bio || "",
  avatar: apiAuthor.avatar,
  socialLinks: apiAuthor.social_links || {},
});

// Convert frontend types to DRF request
const convertPostToApi = (post: Partial<BlogPost>): BlogPostRequest => ({
  title: post.title || "",
  content: post.content || "",
  excerpt: post.excerpt || "",
  hero_image: post.heroImage,
  category: post.category || "",
  tags: post.tags || [],
  status: post.status || "draft",
  featured: post.featured || false,
  seo_title: post.seoTitle,
  seo_description: post.seoDescription,
  seo_keywords: post.seoKeywords,
});

class BlogAPI {
  // Posts API
  static async getAllPosts(
    page: number = 1,
    pageSize: number = API_CONFIG.DEFAULT_PAGE_SIZE,
  ): Promise<BlogPost[]> {
    try {
      const response = await apiClient.get<PaginatedResponse<BlogPostResponse>>(
        API_CONFIG.ENDPOINTS.BLOG.POSTS,
        { page, page_size: pageSize },
      );
      return response.data.results.map(convertPostFromApi);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      throw new Error("Не удалось загрузить статьи");
    }
  }

  static async getPublishedPosts(
    page: number = 1,
    pageSize: number = API_CONFIG.DEFAULT_PAGE_SIZE,
  ): Promise<BlogPost[]> {
    try {
      const response = await apiClient.get<PaginatedResponse<BlogPostResponse>>(
        API_CONFIG.ENDPOINTS.BLOG.POSTS,
        { page, page_size: pageSize, status: "published" },
      );
      return response.data.results.map(convertPostFromApi);
    } catch (error) {
      console.error("Failed to fetch published posts:", error);
      throw new Error("Не удалось загрузить опубликованные статьи");
    }
  }

  static async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const response = await apiClient.get<BlogPostResponse>(
        `${API_CONFIG.ENDPOINTS.BLOG.POSTS}${slug}/`,
      );
      return convertPostFromApi(response.data);
    } catch (error) {
      if (error instanceof ApiClientError && error.status === 404) {
        return null;
      }
      console.error("Failed to fetch post:", error);
      throw new Error("Не удалось загрузить статью");
    }
  }

  static async getPostsByCategory(
    categorySlug: string,
    limit?: number,
  ): Promise<BlogPost[]> {
    try {
      const params: any = { category: categorySlug };
      if (limit) params.page_size = limit;

      const response = await apiClient.get<PaginatedResponse<BlogPostResponse>>(
        API_CONFIG.ENDPOINTS.BLOG.POSTS,
        params,
      );
      return response.data.results.map(convertPostFromApi);
    } catch (error) {
      console.error("Failed to fetch posts by category:", error);
      throw new Error("Не удалось загрузить статьи категории");
    }
  }

  static async getFeaturedPosts(limit?: number): Promise<BlogPost[]> {
    try {
      const params: any = { featured: true };
      if (limit) params.page_size = limit;

      const response = await apiClient.get<PaginatedResponse<BlogPostResponse>>(
        API_CONFIG.ENDPOINTS.BLOG.POSTS,
        params,
      );
      return response.data.results.map(convertPostFromApi);
    } catch (error) {
      console.error("Failed to fetch featured posts:", error);
      throw new Error("Не удалось загрузить рекомендуемые статьи");
    }
  }

  static async getLatestPosts(limit: number = 10): Promise<BlogPost[]> {
    try {
      const response = await apiClient.get<PaginatedResponse<BlogPostResponse>>(
        API_CONFIG.ENDPOINTS.BLOG.POSTS,
        { page_size: limit, ordering: "-published_at" },
      );
      return response.data.results.map(convertPostFromApi);
    } catch (error) {
      console.error("Failed to fetch latest posts:", error);
      throw new Error("Не удалось загрузить последние статьи");
    }
  }

  static async getPopularPosts(limit: number = 5): Promise<BlogPost[]> {
    try {
      const response = await apiClient.get<PaginatedResponse<BlogPostResponse>>(
        API_CONFIG.ENDPOINTS.BLOG.POSTS,
        { page_size: limit, ordering: "-views" },
      );
      return response.data.results.map(convertPostFromApi);
    } catch (error) {
      console.error("Failed to fetch popular posts:", error);
      throw new Error("Не удалось загрузить популярные статьи");
    }
  }

  static async getRelatedPosts(
    postId: string,
    limit: number = 3,
  ): Promise<BlogPost[]> {
    try {
      const response = await apiClient.get<BlogPostResponse[]>(
        `${API_CONFIG.ENDPOINTS.BLOG.POSTS}${postId}/related/`,
        { limit },
      );
      return response.data.map(convertPostFromApi);
    } catch (error) {
      console.error("Failed to fetch related posts:", error);
      return [];
    }
  }

  static async searchPosts(
    query: string,
    filters?: Partial<SearchRequest>,
  ): Promise<BlogPost[]> {
    try {
      const searchParams: SearchRequest = {
        query,
        ...filters,
      };

      const response = await apiClient.get<SearchResponse>(
        `${API_CONFIG.ENDPOINTS.BLOG.POSTS}search/`,
        searchParams,
      );
      return response.data.results.map(convertPostFromApi);
    } catch (error) {
      console.error("Failed to search posts:", error);
      throw new Error("Не удалось выполнить поиск");
    }
  }

  // CRUD operations for posts
  static async createPost(post: Omit<BlogPost, "id">): Promise<BlogPost> {
    try {
      const postData = convertPostToApi(post);
      const response = await apiClient.post<BlogPostResponse>(
        API_CONFIG.ENDPOINTS.BLOG.POSTS,
        postData,
      );
      return convertPostFromApi(response.data);
    } catch (error) {
      console.error("Failed to create post:", error);
      if (error instanceof ApiClientError) {
        const errors = Object.values(error.data).flat();
        throw new Error(`Ошибка создания статьи: ${errors.join(", ")}`);
      }
      throw new Error("Не удалось создать статью");
    }
  }

  static async updatePost(
    id: string,
    updates: Partial<BlogPost>,
  ): Promise<BlogPost | null> {
    try {
      const updateData = convertPostToApi(updates);
      const response = await apiClient.patch<BlogPostResponse>(
        `${API_CONFIG.ENDPOINTS.BLOG.POSTS}${id}/`,
        updateData,
      );
      return convertPostFromApi(response.data);
    } catch (error) {
      console.error("Failed to update post:", error);
      if (error instanceof ApiClientError) {
        if (error.status === 404) return null;
        const errors = Object.values(error.data).flat();
        throw new Error(`Ошибка обновления статьи: ${errors.join(", ")}`);
      }
      throw new Error("Не удалось обновить статью");
    }
  }

  static async deletePost(id: string): Promise<boolean> {
    try {
      await apiClient.delete(`${API_CONFIG.ENDPOINTS.BLOG.POSTS}${id}/`);
      return true;
    } catch (error) {
      console.error("Failed to delete post:", error);
      if (error instanceof ApiClientError && error.status === 404) {
        return false;
      }
      throw new Error("Не удалось удалить статью");
    }
  }

  // Categories API
  static async getAllCategories(): Promise<BlogCategory[]> {
    try {
      const response = await apiClient.get<
        PaginatedResponse<BlogCategoryResponse>
      >(API_CONFIG.ENDPOINTS.BLOG.CATEGORIES);
      return response.data.results.map(convertCategoryFromApi);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      throw new Error("Не удалось загрузить категории");
    }
  }

  static async getCategoriesWithPosts(): Promise<BlogCategory[]> {
    try {
      const response = await apiClient.get<
        PaginatedResponse<BlogCategoryResponse>
      >(API_CONFIG.ENDPOINTS.BLOG.CATEGORIES, { has_posts: true });
      return response.data.results.map(convertCategoryFromApi);
    } catch (error) {
      console.error("Failed to fetch categories with posts:", error);
      throw new Error("Не удалось загрузить категории с статьями");
    }
  }

  static async getCategoryBySlug(slug: string): Promise<BlogCategory | null> {
    try {
      const response = await apiClient.get<BlogCategoryResponse>(
        `${API_CONFIG.ENDPOINTS.BLOG.CATEGORIES}${slug}/`,
      );
      return convertCategoryFromApi(response.data);
    } catch (error) {
      if (error instanceof ApiClientError && error.status === 404) {
        return null;
      }
      console.error("Failed to fetch category:", error);
      throw new Error("Не удалось загрузить категорию");
    }
  }

  // CRUD operations for categories
  static async createCategory(
    category: Omit<BlogCategory, "id" | "postCount">,
  ): Promise<BlogCategory> {
    try {
      const categoryData: BlogCategoryRequest = {
        name: category.name,
        description: category.description,
        color: category.color,
        image: category.image,
      };

      const response = await apiClient.post<BlogCategoryResponse>(
        API_CONFIG.ENDPOINTS.BLOG.CATEGORIES,
        categoryData,
      );
      return convertCategoryFromApi(response.data);
    } catch (error) {
      console.error("Failed to create category:", error);
      if (error instanceof ApiClientError) {
        const errors = Object.values(error.data).flat();
        throw new Error(`Ошибка создания категории: ${errors.join(", ")}`);
      }
      throw new Error("Не удалось создать категорию");
    }
  }

  static async updateCategory(
    id: string,
    updates: Partial<BlogCategory>,
  ): Promise<BlogCategory | null> {
    try {
      const updateData: Partial<BlogCategoryRequest> = {
        name: updates.name,
        description: updates.description,
        color: updates.color,
        image: updates.image,
      };

      const response = await apiClient.patch<BlogCategoryResponse>(
        `${API_CONFIG.ENDPOINTS.BLOG.CATEGORIES}${id}/`,
        updateData,
      );
      return convertCategoryFromApi(response.data);
    } catch (error) {
      console.error("Failed to update category:", error);
      if (error instanceof ApiClientError) {
        if (error.status === 404) return null;
        const errors = Object.values(error.data).flat();
        throw new Error(`Ошибка обновления категории: ${errors.join(", ")}`);
      }
      throw new Error("Не удалось обновить категорию");
    }
  }

  static async deleteCategory(id: string): Promise<boolean> {
    try {
      await apiClient.delete(`${API_CONFIG.ENDPOINTS.BLOG.CATEGORIES}${id}/`);
      return true;
    } catch (error) {
      console.error("Failed to delete category:", error);
      if (error instanceof ApiClientError && error.status === 404) {
        return false;
      }
      throw new Error("Не удалось удалить категорию");
    }
  }

  // Authors API
  static async getAllAuthors(): Promise<BlogAuthor[]> {
    try {
      const response = await apiClient.get<
        PaginatedResponse<BlogAuthorResponse>
      >(API_CONFIG.ENDPOINTS.BLOG.AUTHORS);
      return response.data.results.map(convertAuthorFromApi);
    } catch (error) {
      console.error("Failed to fetch authors:", error);
      throw new Error("Не удалось загрузить авторов");
    }
  }

  static async getAuthorById(id: string): Promise<BlogAuthor | null> {
    try {
      const response = await apiClient.get<BlogAuthorResponse>(
        `${API_CONFIG.ENDPOINTS.BLOG.AUTHORS}${id}/`,
      );
      return convertAuthorFromApi(response.data);
    } catch (error) {
      if (error instanceof ApiClientError && error.status === 404) {
        return null;
      }
      console.error("Failed to fetch author:", error);
      throw new Error("Не удалось загрузить автора");
    }
  }

  static async getAuthorPosts(
    authorId: string,
    limit?: number,
  ): Promise<BlogPost[]> {
    try {
      const params: any = { author: authorId };
      if (limit) params.page_size = limit;

      const response = await apiClient.get<PaginatedResponse<BlogPostResponse>>(
        API_CONFIG.ENDPOINTS.BLOG.POSTS,
        params,
      );
      return response.data.results.map(convertPostFromApi);
    } catch (error) {
      console.error("Failed to fetch author posts:", error);
      throw new Error("Не удалось загрузить статьи автора");
    }
  }

  // Statistics API
  static async getBlogStats(): Promise<BlogStats> {
    try {
      const response = await apiClient.get<BlogStatsResponse>(
        API_CONFIG.ENDPOINTS.BLOG.STATS,
      );

      const stats = response.data;
      return {
        totalPosts: stats.total_posts,
        publishedPosts: stats.published_posts,
        draftPosts: stats.draft_posts,
        totalViews: stats.total_views,
        totalCategories: stats.total_categories,
        totalAuthors: stats.total_authors,
      };
    } catch (error) {
      console.error("Failed to fetch blog stats:", error);
      throw new Error("Не удалось загрузить статистику");
    }
  }

  // File upload
  static async uploadImage(
    file: File,
    onProgress?: (progress: number) => void,
  ): Promise<string> {
    try {
      const response = await apiClient.uploadFile(
        API_CONFIG.ENDPOINTS.BLOG.UPLOAD,
        file,
        onProgress,
      );
      const uploadResponse: FileUploadResponse = response.data;
      return uploadResponse.url;
    } catch (error) {
      console.error("Failed to upload image:", error);
      throw new Error("Не удалось загрузить изображение");
    }
  }

  // Utility methods (keep same as original)
  static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-zа-я0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }

  static calculateReadTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  }

  static generateTableOfContents(
    content: string,
  ): Array<{ id: string; title: string; level: number }> {
    const headings: Array<{ id: string; title: string; level: number }> = [];
    const headingRegex = /<h([1-6])[^>]*id="([^"]*)"[^>]*>([^<]*)<\/h[1-6]>/gi;
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      headings.push({
        level: parseInt(match[1]),
        id: match[2],
        title: match[3].trim(),
      });
    }

    return headings;
  }

  static formatDate(dateString: string, locale: string = "ru-RU"): string {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  static formatDateRelative(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "вчера";
    if (diffDays < 7) return `${diffDays} дней назад`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} недель назад`;
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} месяцев назад`;
    return `${Math.ceil(diffDays / 365)} лет назад`;
  }

  // Validation
  static validatePost(post: Partial<BlogPost>): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!post.title || post.title.trim().length < 5) {
      errors.push("Заголовок должен содержать минимум 5 символов");
    }

    if (!post.content || post.content.trim().length < 100) {
      errors.push("Контент должен содержать минимум 100 символов");
    }

    if (!post.excerpt || post.excerpt.trim().length < 50) {
      errors.push("Краткое описание должно содержать минимум 50 символов");
    }

    if (!post.category) {
      errors.push("Необходимо выбрать категорию");
    }

    if (!post.author) {
      errors.push("Необходимо указать автора");
    }

    if (!post.tags || post.tags.length === 0) {
      errors.push("Необходимо добавить хотя бы один тег");
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

export { BlogAPI };
export default BlogAPI;
