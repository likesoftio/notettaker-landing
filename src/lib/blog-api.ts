// Blog API functions for frontend
import blogDB, {
  BlogPost,
  BlogCategory,
  BlogAuthor,
  BlogStats,
} from "./database";

export class BlogAPI {
  // Posts API
  static async getAllPosts(): Promise<BlogPost[]> {
    return await blogDB.getAllPosts();
  }

  static async getPublishedPosts(): Promise<BlogPost[]> {
    return await blogDB.getPublishedPosts();
  }

  static async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const post = await blogDB.getPostBySlug(slug);
    if (post && post.status === "published") {
      // Increment view count
      await blogDB.incrementViews(slug);
    }
    return post;
  }

  static async getPostsByCategory(
    categorySlug: string,
    limit?: number,
  ): Promise<BlogPost[]> {
    const posts = await blogDB.getPostsByCategory(categorySlug);
    return limit ? posts.slice(0, limit) : posts;
  }

  static async getFeaturedPosts(limit?: number): Promise<BlogPost[]> {
    const posts = await blogDB.getFeaturedPosts();
    return limit ? posts.slice(0, limit) : posts;
  }

  static async getLatestPosts(limit: number = 10): Promise<BlogPost[]> {
    const posts = await blogDB.getPublishedPosts();
    return posts
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      )
      .slice(0, limit);
  }

  static async getPopularPosts(limit: number = 5): Promise<BlogPost[]> {
    const posts = await blogDB.getPublishedPosts();
    return posts.sort((a, b) => b.views - a.views).slice(0, limit);
  }

  static async getRelatedPosts(
    postId: string,
    limit: number = 3,
  ): Promise<BlogPost[]> {
    const currentPost = await blogDB.getPostBySlug(postId);
    if (!currentPost) return [];

    const allPosts = await blogDB.getPublishedPosts();

    // Find related posts by category and tags
    const relatedPosts = allPosts
      .filter((post) => post.id !== currentPost.id)
      .map((post) => {
        let score = 0;

        // Same category gets higher score
        if (post.category === currentPost.category) {
          score += 10;
        }

        // Shared tags get points
        const sharedTags = post.tags.filter((tag) =>
          currentPost.tags.includes(tag),
        );
        score += sharedTags.length * 3;

        return { post, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((item) => item.post);

    return relatedPosts;
  }

  static async searchPosts(query: string): Promise<BlogPost[]> {
    return await blogDB.searchPosts(query);
  }

  // Categories API
  static async getAllCategories(): Promise<BlogCategory[]> {
    return await blogDB.getAllCategories();
  }

  static async getCategoryBySlug(slug: string): Promise<BlogCategory | null> {
    return await blogDB.getCategoryBySlug(slug);
  }

  static async getCategoriesWithPosts(): Promise<BlogCategory[]> {
    const categories = await blogDB.getAllCategories();
    return categories.filter((cat) => cat.postCount > 0);
  }

  // Authors API
  static async getAllAuthors(): Promise<BlogAuthor[]> {
    return await blogDB.getAllAuthors();
  }

  static async getAuthorById(id: string): Promise<BlogAuthor | null> {
    return await blogDB.getAuthorById(id);
  }

  static async getAuthorPosts(
    authorId: string,
    limit?: number,
  ): Promise<BlogPost[]> {
    const posts = await blogDB.getPublishedPosts();
    const authorPosts = posts.filter((post) => post.author === authorId);
    return limit ? authorPosts.slice(0, limit) : authorPosts;
  }

  // Statistics API
  static async getBlogStats(): Promise<BlogStats> {
    return await blogDB.getBlogStats();
  }

  // Utility methods
  static generateSlug(title: string): string {
    return blogDB.generateSlug(title);
  }

  static calculateReadTime(content: string): number {
    return blogDB.calculateReadTime(content);
  }

  static generateTableOfContents(
    content: string,
  ): Array<{ id: string; title: string; level: number }> {
    return blogDB.generateTableOfContents(content);
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

  // SEO helpers
  static generateSEOData(post: BlogPost) {
    return {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      keywords: post.seoKeywords || post.tags,
      image: post.heroImage,
      type: "article" as const,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      author: post.author,
      section: post.category,
      tags: post.tags,
    };
  }

  static generateBreadcrumbs(post: BlogPost, category?: BlogCategory) {
    return [
      { name: "Главная", href: "/" },
      { name: "Блог", href: "/blog" },
      ...(category
        ? [{ name: category.name, href: `/blog/category/${category.slug}` }]
        : []),
      { name: post.title, href: `/blog/${post.slug}` },
    ];
  }

  // Social sharing
  static generateSocialShareUrls(
    post: BlogPost,
    baseUrl: string = "https://mymeet.ai",
  ) {
    const postUrl = `${baseUrl}/blog/${post.slug}`;
    const text = `${post.title} - ${post.excerpt}`;

    return {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(text)}&via=mymeetai`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(text)}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${text} ${postUrl}`)}`,
      email: `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`${text}\n\n${postUrl}`)}`,
    };
  }

  // Content processing
  static processContent(content: string): string {
    // Add IDs to headings for table of contents
    return content.replace(
      /<h([1-6])([^>]*)>([^<]*)<\/h[1-6]>/g,
      (match, level, attrs, text) => {
        const id = text
          .toLowerCase()
          .replace(/[^a-zа-я0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .trim();

        if (attrs.includes("id=")) {
          return match; // Already has ID
        }

        return `<h${level}${attrs} id="${id}">${text}</h${level}>`;
      },
    );
  }

  static extractExcerpt(content: string, maxLength: number = 160): string {
    // Remove HTML tags and get plain text
    const plainText = content.replace(/<[^>]*>/g, "").trim();

    if (plainText.length <= maxLength) {
      return plainText;
    }

    // Cut at the last complete word
    const truncated = plainText.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");

    return lastSpace > 0
      ? truncated.substring(0, lastSpace) + "..."
      : truncated + "...";
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
      errors.push("Нео��ходимо добавить хотя бы один тег");
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

export default BlogAPI;
