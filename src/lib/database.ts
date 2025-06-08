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
  likes?: number;
  shares?: number;
  difficulty?: "beginner" | "intermediate" | "advanced";
  language?: string;
  series?: string;
  seriesOrder?: number;
  relatedPosts?: string[];
  tableOfContents?: Array<{
    id: string;
    title: string;
    level: number;
  }>;
  socialMedia?: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
  };
  customFields?: Record<string, any>;
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

    console.log("📚 Initializing blog database...");

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
          id: "maria-petrov",
          name: "Мария Петрова",
          email: "maria@mymeet.ai",
          avatar:
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
          bio: "Product Manager и эксперт по UX в mymeet.ai",
          socialLinks: {
            linkedin: "https://linkedin.com/in/maria-petrova",
          },
        },
        {
          id: "team-mymeet",
          name: "Команда mymeet.ai",
          email: "team@mymeet.ai",
          avatar:
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop",
          bio: "Коллективный автор от команды mymeet.ai",
        },
      ];
      this.saveData(STORAGE_KEYS.AUTHORS, sampleAuthors);
    }

    // Initialize sample posts with all new data
    const existingPostsData = localStorage.getItem(STORAGE_KEYS.POSTS);
    let existingPostsCount = 0;

    try {
      existingPostsCount = existingPostsData
        ? JSON.parse(existingPostsData).length
        : 0;
    } catch (error) {
      console.log("📊 Invalid existing posts data, will reinitialize");
      existingPostsCount = 0;
    }

    console.log(
      `📊 Found ${existingPostsCount} existing posts in localStorage`,
    );
    const shouldInitialize = existingPostsCount < 25;

    if (shouldInitialize) {
      console.log("📝 Creating sample posts...");
      const samplePosts: BlogPost[] = [
        {
          id: "9-chrome-extensions",
          title: "9 лучших расширений Chrome для преобразования речи в текст",
          slug: "9-chrome-extensions",
          content: this.getSampleContent("chrome-extensions"),
          excerpt:
            "Обзор самых эффективных браузерных расширений для транскрипции аудио в реальном времени. Сравнение функций и возможностей.",
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
            "транскрипция",
            "voice to text",
            "диктовка",
          ],
          readTime: 8,
          views: 1247,
          likes: 89,
          shares: 34,
          difficulty: "intermediate",
          language: "ru",
          relatedPosts: ["ai-future-meetings", "speech-recognition-2024"],
          socialMedia: {
            twitter:
              "Обзор 9 лучших расширений Chrome для преобразования речи в текст. Повысьте свою продуктивность! #Chrome #SpeechToText #mymeetai",
            linkedin:
              "Подробный анализ расширений Chrome для транскрипции. Какое выбрать для вашей работы?",
          },
          tableOfContents: [
            { id: "intro", title: "Введение", level: 1 },
            { id: "why-important", title: "Почему это важно", level: 2 },
            { id: "top-extensions", title: "ТОП-9 расширений", level: 1 },
            { id: "voice-in", title: "1. Voice In Voice Typing", level: 2 },
            { id: "speechify", title: "2. Speechify", level: 2 },
            {
              id: "mymeet-clipper",
              title: "3. mymeet.ai Web Clipper",
              level: 2,
            },
            { id: "comparison", title: "Сравнительная таблица", level: 1 },
            { id: "installation", title: "Установка и настройка", level: 1 },
            { id: "tips", title: "Советы по использованию", level: 1 },
            { id: "conclusion", title: "Заключение", level: 1 },
          ],
        },
        {
          id: "virtual-reality-meetings",
          title: "VR-встречи: новое измерение виртуального сотрудничества",
          slug: "virtual-reality-meetings",
          content: this.getSampleContent("vr-meetings"),
          excerpt:
            "Исследуем возможности виртуальной реальности для проведения иммерсивных встреч и командной работы.",
          heroImage:
            "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=800&h=400&fit=crop",
          category: "tech-ai",
          tags: [
            "VR",
            "виртуальная реальность",
            "иммерсивные встречи",
            "будущее",
          ],
          author: "maria-petrov",
          publishedAt: new Date("2024-12-18").toISOString(),
          updatedAt: new Date("2024-12-18").toISOString(),
          status: "published",
          featured: true,
          seoTitle:
            "VR-встречи 2024: как виртуальная реальность меняет деловые коммуникации",
          seoDescription:
            "Узнайте о преимуществах VR-встреч, лучших платформах и том, как виртуальная реальность революционизирует удаленную работу.",
          seoKeywords: [
            "VR встречи",
            "виртуальная реальность",
            "удаленная работа",
            "метавселенная",
          ],
          readTime: 12,
          views: 1876,
          likes: 156,
          shares: 67,
          difficulty: "advanced",
          language: "ru",
          series: "Технологии будущего",
          seriesOrder: 1,
          relatedPosts: ["ai-future-meetings", "effective-online-meetings"],
          socialMedia: {
            twitter:
              "VR-встречи революционизируют деловые коммуникации! Узнайте о лучших платформах и перспективах. #VR #FutureOfWork #mymeetai",
            linkedin:
              "Как виртуальная реальность меняет способы проведения деловых встреч. Полный гид по VR-платформам.",
          },
          tableOfContents: [
            { id: "intro", title: "Введение", level: 1 },
            { id: "what-is-vr", title: "Что такое VR-встречи", level: 2 },
            { id: "advantages", title: "Преимущества VR-встреч", level: 1 },
            { id: "immersion", title: "Полное погружение", level: 2 },
            {
              id: "collaboration",
              title: "Новые возможности сотрудничества",
              level: 2,
            },
            { id: "platforms", title: "Популярные VR-платформы", level: 1 },
            { id: "meta-horizon", title: "Meta Horizon Workrooms", level: 2 },
            { id: "spatial", title: "Spatial", level: 2 },
            { id: "mozilla-hubs", title: "Mozilla Hubs", level: 2 },
            { id: "implementation", title: "Внедрение в компании", level: 1 },
            { id: "challenges", title: "Вызовы и ограничения", level: 1 },
            { id: "future", title: "Будущее VR-встреч", level: 1 },
          ],
        },
      ];

      this.saveData(STORAGE_KEYS.POSTS, samplePosts);
      console.log(`Saved ${samplePosts.length} sample posts to localStorage`);
    }

    // Update category post counts after initialization
    this.updateCategoryPostCount();

    this.initialized = true;
    console.log("Blog database initialization completed");
  }

  private getSampleContent(type: string): string {
    const contentTemplates = {
      "chrome-extensions": `
        <p class="lead">В современном мире эффективность и скорость обработки информации играют ключевую роль в успехе любого бизнеса. Расширения Chrome для преобразования речи в текст стали незаменимыми инструментами для профессионалов различных сфер.</p>

        <h2 id="intro">Введение</h2>
        <p>Технологии распознавания речи значительно продвинулись за последние годы. Современные алгоритмы машинного обучения позволяют достигать точности более 95% в идеальных условиях.</p>

        <h3 id="why-important">Почему это важно</h3>
        <p>Скорость набора текста голосом в 3-4 раза превышает скорость печати на клавиатуре. Это особенно важно для:</p>
        <ul>
          <li>Журналистов и контент-менеджеров</li>
          <li>Студентов и исследователей</li>
          <li>Людей с ограниченными возможностями</li>
          <li>Профессионалов, работающих в многозадачном режиме</li>
        </ul>

        <h2 id="top-extensions">ТОП-9 расширений Chrome</h2>
        <p>Мы протестир��вали десятки расширений и выбрали лучшие по критериям точности, скорости и удобства использования.</p>

        <h3 id="voice-in">1. Voice In Voice Typing</h3>
        <div class="extension-card">
          <p><strong>Рейтинг:</strong> ⭐⭐⭐⭐⭐ (5/5)</p>
          <p>Универсальное расширение для голосового ввода в любых текстовых полях браузера. Поддерживает более 120 языков и диалектов.</p>
          <p><strong>Ключевые особенности:</strong></p>
          <ul>
            <li>Работает на любом сайте</li>
            <li>Поддержка команд пунктуации</li>
            <li>Настраиваемые горячие клавиши</li>
            <li>Автоматическая капитализация</li>
          </ul>
        </div>

        <h2 id="conclusion">Заключение</h2>
        <p>Расширения Chrome для преобразования речи в текст значительно повышают продуктивность работы. Выбор конкретного инструмента зависит от ваших потребностей и бюджета.</p>
      `,
      "vr-meetings": `
        <p class="lead">Виртуальная реальность открывает новые горизонты для деловых встреч. Современные VR-платформы позволяют создавать иммерсивные пространства для командной работы, где участники могут взаимодействовать с 3D-объектами и совместно решать задачи.</p>

        <h2 id="intro">Введение</h2>
        <p>Пандемия COVID-19 ускорила переход к удаленной работе, но традиционные видеоконференции не всегда обеспечивают достаточный уровень взаимодействия. VR-технологии предлагают революционный подход к проведению встреч, создавая ощущение физического присутствия в одном пространстве.</p>

        <h2 id="advantages">Преимущества VR-встреч</h2>
        <p>VR-технологии значительно повышают вовлеченность участников и позвол��ют создавать уникальный опыт сотрудничества, недоступный в традиционных видеоконференциях.</p>

        <h2 id="conclusion">Заключение</h2>
        <p>По прогнозам аналитиков, к 2030 году более 50% деловых встреч будут проводиться в виртуальной или смешанной реальности. Компании, которые начнут экспериментировать с этими технологиями уже сегодня, получат значительное конкурентное преимущество.</p>
      `,
      default: `
        <p>Это образец контента для статьи. В реальном приложении здесь будет полноценная статья с подробным содержанием, изображениями и структурированной информацией.</p>

        <h2>Основное содержание</h2>
        <p>Здесь располагается основная часть статьи с детальным р��скрытием темы, примерами и практическими советами.</p>

        <h2>Заключение</h2>
        <p>Подведение итогов и ключевые выводы статьи для читателей.</p>
      `,
    };

    return contentTemplates[type] || contentTemplates["default"];
  }

  // Generic data operations
  private getData<T>(key: string): T[] {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  private saveData<T>(key: string, data: T[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Update category post counts
  private updateCategoryPostCount(): void {
    const posts = this.getData<BlogPost>(STORAGE_KEYS.POSTS);
    const categories = this.getData<BlogCategory>(STORAGE_KEYS.CATEGORIES);

    const updatedCategories = categories.map((category) => ({
      ...category,
      postCount: posts.filter(
        (post) => post.category === category.id && post.status === "published",
      ).length,
    }));

    this.saveData(STORAGE_KEYS.CATEGORIES, updatedCategories);
  }

  // Public methods for data access
  getAllPosts(): BlogPost[] {
    return this.getData<BlogPost>(STORAGE_KEYS.POSTS);
  }

  getPublishedPosts(): BlogPost[] {
    return this.getAllPosts().filter((post) => post.status === "published");
  }

  getPostById(id: string): BlogPost | null {
    const posts = this.getAllPosts();
    return posts.find((post) => post.id === id) || null;
  }

  getPostBySlug(slug: string): BlogPost | null {
    const posts = this.getAllPosts();
    return posts.find((post) => post.slug === slug) || null;
  }

  getPostsByCategory(categoryId: string): BlogPost[] {
    return this.getPublishedPosts().filter(
      (post) => post.category === categoryId,
    );
  }

  getPostsByAuthor(authorId: string): BlogPost[] {
    return this.getPublishedPosts().filter((post) => post.author === authorId);
  }

  getFeaturedPosts(): BlogPost[] {
    return this.getPublishedPosts().filter((post) => post.featured);
  }

  getRelatedPosts(postId: string, limit: number = 3): BlogPost[] {
    const currentPost = this.getPostById(postId);
    if (!currentPost) return [];

    const allPosts = this.getPublishedPosts().filter(
      (post) => post.id !== postId,
    );

    // Score posts based on category and tags match
    const scoredPosts = allPosts.map((post) => {
      let score = 0;

      // Same category gets higher score
      if (post.category === currentPost.category) score += 3;

      // Shared tags
      const sharedTags = post.tags.filter((tag) =>
        currentPost.tags.includes(tag),
      );
      score += sharedTags.length;

      return { post, score };
    });

    return scoredPosts
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((item) => item.post);
  }

  getAllCategories(): BlogCategory[] {
    return this.getData<BlogCategory>(STORAGE_KEYS.CATEGORIES);
  }

  getCategoriesWithPosts(): BlogCategory[] {
    return this.getAllCategories().filter((category) => category.postCount > 0);
  }

  getCategoryById(id: string): BlogCategory | null {
    const categories = this.getAllCategories();
    return categories.find((category) => category.id === id) || null;
  }

  getCategoryBySlug(slug: string): BlogCategory | null {
    const categories = this.getAllCategories();
    return categories.find((category) => category.slug === slug) || null;
  }

  getAllAuthors(): BlogAuthor[] {
    return this.getData<BlogAuthor>(STORAGE_KEYS.AUTHORS);
  }

  getAuthorById(id: string): BlogAuthor | null {
    const authors = this.getAllAuthors();
    return authors.find((author) => author.id === id) || null;
  }

  getStats(): BlogStats {
    const posts = this.getAllPosts();
    const categories = this.getAllCategories();

    return {
      totalPosts: posts.length,
      totalViews: posts.reduce((sum, post) => sum + post.views, 0),
      totalCategories: categories.length,
      publishedPosts: posts.filter((post) => post.status === "published")
        .length,
      draftPosts: posts.filter((post) => post.status === "draft").length,
    };
  }

  // Search functionality
  searchPosts(query: string): BlogPost[] {
    const posts = this.getPublishedPosts();
    const searchTerm = query.toLowerCase();

    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
    );
  }

  // CRUD operations for posts
  createPost(post: Omit<BlogPost, "id">): BlogPost {
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString(),
    };

    const posts = this.getAllPosts();
    posts.push(newPost);
    this.saveData(STORAGE_KEYS.POSTS, posts);
    this.updateCategoryPostCount();

    return newPost;
  }

  updatePost(id: string, updates: Partial<BlogPost>): BlogPost | null {
    const posts = this.getAllPosts();
    const index = posts.findIndex((post) => post.id === id);

    if (index === -1) return null;

    posts[index] = {
      ...posts[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.saveData(STORAGE_KEYS.POSTS, posts);
    this.updateCategoryPostCount();

    return posts[index];
  }

  deletePost(id: string): boolean {
    const posts = this.getAllPosts();
    const filteredPosts = posts.filter((post) => post.id !== id);

    if (filteredPosts.length === posts.length) return false;

    this.saveData(STORAGE_KEYS.POSTS, filteredPosts);
    this.updateCategoryPostCount();
    return true;
  }

  // CRUD operations for categories
  createCategory(
    category: Omit<BlogCategory, "id" | "postCount">,
  ): BlogCategory {
    const newCategory: BlogCategory = {
      ...category,
      id: Date.now().toString(),
      postCount: 0,
    };

    const categories = this.getAllCategories();
    categories.push(newCategory);
    this.saveData(STORAGE_KEYS.CATEGORIES, categories);

    return newCategory;
  }

  updateCategory(
    id: string,
    updates: Partial<BlogCategory>,
  ): BlogCategory | null {
    const categories = this.getAllCategories();
    const index = categories.findIndex((category) => category.id === id);

    if (index === -1) return null;

    categories[index] = { ...categories[index], ...updates };
    this.saveData(STORAGE_KEYS.CATEGORIES, categories);

    return categories[index];
  }

  deleteCategory(id: string): boolean {
    const posts = this.getAllPosts();
    const hasPostsInCategory = posts.some((post) => post.category === id);

    if (hasPostsInCategory) return false; // Cannot delete category with posts

    const categories = this.getAllCategories();
    const filteredCategories = categories.filter(
      (category) => category.id !== id,
    );

    if (filteredCategories.length === categories.length) return false;

    this.saveData(STORAGE_KEYS.CATEGORIES, filteredCategories);
    return true;
  }
}

  // Utility method to calculate reading time
  calculateReadTime(content: string): number {
    const wordsPerMinute = 200; // Average reading speed
    const text = content.replace(/<[^>]*>/g, ''); // Strip HTML tags
    const wordCount = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  }
}

// Create and export database instance
const blogDatabase = new BlogDatabase();
export default blogDatabase;