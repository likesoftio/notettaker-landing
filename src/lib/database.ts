// Database configuration and connection
// Using localStorage for demo purposes - in production use SQLite/PostgreSQL

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  heroImage: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  status: "draft" | "published" | "archived";
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  readTime: number;
  views: number;
  tableOfContents?: Array<{
    id: string;
    title: string;
    level: number;
  }>;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  postCount: number;
}

export interface BlogAuthor {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface BlogStats {
  totalPosts: number;
  totalViews: number;
  totalCategories: number;
  publishedPosts: number;
  draftPosts: number;
}

// Storage keys
const STORAGE_KEYS = {
  POSTS: "blog_posts",
  CATEGORIES: "blog_categories",
  AUTHORS: "blog_authors",
  SETTINGS: "blog_settings",
} as const;

// Database class for blog management
class BlogDatabase {
  private initialized = false;

  constructor() {
    this.initializeData();
  }

  // Initialize with sample data if empty
  private initializeData() {
    if (this.initialized) return;

    // Initialize sample categories
    if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
      const sampleCategories: BlogCategory[] = [
        {
          id: "tech-ai",
          name: "Технологии и ИИ",
          slug: "tech-ai",
          description: "Статьи о новых технологиях и искусственном интеллекте",
          color: "bg-blue-600",
          postCount: 0,
        },
        {
          id: "task-management",
          name: "Управление задачами",
          slug: "task-management",
          description:
            "Методы и инструменты для эффективного управления задачами",
          color: "bg-green-600",
          postCount: 0,
        },
        {
          id: "product-news",
          name: "Новости продукта",
          slug: "product-news",
          description: "Обновления и новые функции mymeet.ai",
          color: "bg-purple-600",
          postCount: 0,
        },
        {
          id: "meeting-tips",
          name: "Советы по встречам",
          slug: "meeting-tips",
          description: "Практические советы для проведения эффективных встреч",
          color: "bg-orange-600",
          postCount: 0,
        },
        {
          id: "customer-stories",
          name: "Истории клиентов",
          slug: "customer-stories",
          description: "Реальные кейсы использования mymeet.ai",
          color: "bg-indigo-600",
          postCount: 0,
        },
        {
          id: "sales-art",
          name: "Искусство продаж",
          slug: "sales-art",
          description: "Техники и стратегии успешных продаж",
          color: "bg-red-600",
          postCount: 0,
        },
      ];
      this.saveData(STORAGE_KEYS.CATEGORIES, sampleCategories);
    }

    // Initialize sample authors
    if (!localStorage.getItem(STORAGE_KEYS.AUTHORS)) {
      const sampleAuthors: BlogAuthor[] = [
        {
          id: "andrey-shcherbina",
          name: "Андрей Щербина",
          email: "andrey@mymeet.ai",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
          bio: "Ведущий разработчик и эксперт по ИИ в mymeet.ai",
          socialLinks: {
            twitter: "https://twitter.com/andrey_ai",
            linkedin: "https://linkedin.com/in/andrey-shcherbina",
          },
        },
        {
          id: "team-mymeet",
          name: "Команда mymeet.ai",
          email: "team@mymeet.ai",
          avatar: "https://mymeet.ai/team-avatar.jpg",
          bio: "Коллективный автор от команды mymeet.ai",
        },
      ];
      this.saveData(STORAGE_KEYS.AUTHORS, sampleAuthors);
    }

    // Initialize sample posts
    if (!localStorage.getItem(STORAGE_KEYS.POSTS)) {
      const samplePosts: BlogPost[] = [
        {
          id: "9-chrome-extensions",
          title: "9 лучших расширений Chrome для преобразования речи в текст",
          slug: "9-chrome-extensions",
          content: this.getSampleContent(),
          excerpt:
            "Обзор самых эффективных браузерных расширений для транскрипции аудио в реальном времени",
          heroImage:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
          category: "tech-ai",
          tags: ["Chrome", "расширения", "транскрипция", "речь в текст", "ИИ"],
          author: "andrey-shcherbina",
          publishedAt: new Date("2024-12-15").toISOString(),
          updatedAt: new Date("2024-12-15").toISOString(),
          status: "published",
          featured: true,
          seoTitle:
            "9 лучших расширений Chrome для преобразования речи в текст 2024",
          seoDescription:
            "Полный обзор лучших расширений Chrome для транскрипции речи в текст. Сравнение функций, точности и удобства использования.",
          seoKeywords: [
            "Chrome расширения",
            "речь в текст",
            "тра��скрипция",
            "voice to text",
            "диктовка",
          ],
          readTime: 8,
          views: 1247,
          tableOfContents: [
            { id: "intro", title: "Введение", level: 1 },
            { id: "top-extensions", title: "ТОП-9 расширений", level: 1 },
            { id: "comparison", title: "Сравнительная таблица", level: 1 },
            { id: "conclusion", title: "Заключение", level: 1 },
          ],
        },
      ];
      this.saveData(STORAGE_KEYS.POSTS, samplePosts);
    }

    this.initialized = true;
  }

  private getSampleContent(): string {
    return `
      <p>В современном мире эффективность и скорость обработки информации играют ключевую роль в успехе любого бизнеса. Расширения Chrome для преобразования речи в текст стали незаменимыми инструментами для профессионалов различных сфер.</p>

      <h2 id="intro">Введение</h2>
      <p>Технологии распознавания речи значительно продвинулись за последние годы. Современные алгоритмы машинного обучения позволяют достигать точности более 95% в идеальных условиях.</p>

      <h2 id="top-extensions">ТОП-9 расширений Chrome</h2>
      
      <h3>1. Voice In Voice Typing</h3>
      <p>Универсальное расширение для голосового ввода в любых текстовых полях браузера. Поддерживает более 120 языков и диалектов.</p>

      <h3>2. Speechify</h3>
      <p>Мощный инструмент для преобразования текста в речь и обратно. Особенно полезен для людей с дислексией.</p>

      <h3>3. mymeet.ai Web Clipper</h3>
      <p>Наше собственное расширение для быстрой транскрипции встреч прямо в браузере. Интегрируется со всеми популярными платформами видео��вязи.</p>

      <h2 id="comparison">Сравнительная таблица</h2>
      <p>Ниже представлено сравнение ключевых характеристик рассмотренных расширений:</p>
      
      <table>
        <thead>
          <tr>
            <th>Расширение</th>
            <th>Точность</th>
            <th>Языки</th>
            <th>Цена</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Voice In</td>
            <td>95%</td>
            <td>120+</td>
            <td>Бесплатно</td>
          </tr>
          <tr>
            <td>Speechify</td>
            <td>92%</td>
            <td>30+</td>
            <td>$11.58/мес</td>
          </tr>
          <tr>
            <td>mymeet.ai</td>
            <td>97%</td>
            <td>73</td>
            <td>От 680₽/мес</td>
          </tr>
        </tbody>
      </table>

      <h2 id="conclusion">Заключение</h2>
      <p>Выбор расширения зависит от ваших конкретных потребностей. Для профессионального использования рекомендуем попробовать mymeet.ai с его расширенными возможностями анализа.</p>
    `;
  }

  // Generic data operations
  private getData<T>(key: string): T[] {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  private saveData<T>(key: string, data: T[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Blog Posts operations
  async getAllPosts(): Promise<BlogPost[]> {
    return this.getData<BlogPost>(STORAGE_KEYS.POSTS);
  }

  async getPublishedPosts(): Promise<BlogPost[]> {
    const posts = await this.getAllPosts();
    return posts.filter((post) => post.status === "published");
  }

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const posts = await this.getAllPosts();
    return posts.find((post) => post.slug === slug) || null;
  }

  async getPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
    const posts = await this.getPublishedPosts();
    return posts.filter((post) => post.category === categorySlug);
  }

  async getFeaturedPosts(): Promise<BlogPost[]> {
    const posts = await this.getPublishedPosts();
    return posts.filter((post) => post.featured);
  }

  async searchPosts(query: string): Promise<BlogPost[]> {
    const posts = await this.getPublishedPosts();
    const lowercaseQuery = query.toLowerCase();

    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowercaseQuery) ||
        post.excerpt.toLowerCase().includes(lowercaseQuery) ||
        post.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
    );
  }

  async createPost(
    post: Omit<BlogPost, "id" | "publishedAt" | "updatedAt" | "views">,
  ): Promise<BlogPost> {
    const posts = await this.getAllPosts();
    const newPost: BlogPost = {
      ...post,
      id: this.generateId(),
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
    };

    posts.push(newPost);
    this.saveData(STORAGE_KEYS.POSTS, posts);
    await this.updateCategoryPostCount();

    return newPost;
  }

  async updatePost(
    id: string,
    updates: Partial<BlogPost>,
  ): Promise<BlogPost | null> {
    const posts = await this.getAllPosts();
    const index = posts.findIndex((post) => post.id === id);

    if (index === -1) return null;

    const updatedPost = {
      ...posts[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    posts[index] = updatedPost;
    this.saveData(STORAGE_KEYS.POSTS, posts);
    await this.updateCategoryPostCount();

    return updatedPost;
  }

  async deletePost(id: string): Promise<boolean> {
    const posts = await this.getAllPosts();
    const filteredPosts = posts.filter((post) => post.id !== id);

    if (posts.length === filteredPosts.length) return false;

    this.saveData(STORAGE_KEYS.POSTS, filteredPosts);
    await this.updateCategoryPostCount();

    return true;
  }

  async incrementViews(slug: string): Promise<void> {
    const posts = await this.getAllPosts();
    const post = posts.find((p) => p.slug === slug);

    if (post) {
      post.views += 1;
      this.saveData(STORAGE_KEYS.POSTS, posts);
    }
  }

  // Categories operations
  async getAllCategories(): Promise<BlogCategory[]> {
    return this.getData<BlogCategory>(STORAGE_KEYS.CATEGORIES);
  }

  async getCategoryBySlug(slug: string): Promise<BlogCategory | null> {
    const categories = await this.getAllCategories();
    return categories.find((cat) => cat.slug === slug) || null;
  }

  private async updateCategoryPostCount(): Promise<void> {
    const categories = await this.getAllCategories();
    const posts = await this.getPublishedPosts();

    const updatedCategories = categories.map((category) => ({
      ...category,
      postCount: posts.filter((post) => post.category === category.id).length,
    }));

    this.saveData(STORAGE_KEYS.CATEGORIES, updatedCategories);
  }

  // Authors operations
  async getAllAuthors(): Promise<BlogAuthor[]> {
    return this.getData<BlogAuthor>(STORAGE_KEYS.AUTHORS);
  }

  async getAuthorById(id: string): Promise<BlogAuthor | null> {
    const authors = await this.getAllAuthors();
    return authors.find((author) => author.id === id) || null;
  }

  // Statistics
  async getBlogStats(): Promise<BlogStats> {
    const posts = await this.getAllPosts();
    const categories = await this.getAllCategories();

    return {
      totalPosts: posts.length,
      totalViews: posts.reduce((sum, post) => sum + post.views, 0),
      totalCategories: categories.length,
      publishedPosts: posts.filter((post) => post.status === "published")
        .length,
      draftPosts: posts.filter((post) => post.status === "draft").length,
    };
  }

  // Utility methods
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-zа-я0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }

  calculateReadTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }

  generateTableOfContents(
    content: string,
  ): Array<{ id: string; title: string; level: number }> {
    const headingRegex = /<h([1-6])[^>]*id="([^"]*)"[^>]*>([^<]*)<\/h[1-6]>/g;
    const toc: Array<{ id: string; title: string; level: number }> = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      toc.push({
        id: match[2],
        title: match[3],
        level: parseInt(match[1]),
      });
    }

    return toc;
  }
}

// Export singleton instance
export const blogDB = new BlogDatabase();
export default blogDB;
