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

    // Force clear and reinitialize for demo
    // Remove these lines in production
    console.log("Initializing blog database...");

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

    // Initialize sample posts (force reload for demo)
    const existingPosts = localStorage.getItem(STORAGE_KEYS.POSTS);
    if (!existingPosts || JSON.parse(existingPosts).length === 0) {
      const samplePosts: BlogPost[] = [
        // Технологии и ИИ (6 статей)
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
            "9 лучших расширений Chrome для преобразования речи в тек��т 2024",
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
          tableOfContents: [
            { id: "intro", title: "Введение", level: 1 },
            { id: "top-extensions", title: "ТОП-9 расширений", level: 1 },
            { id: "comparison", title: "Сравнительная таблица", level: 1 },
          ],
        },
        {
          id: "ai-future-meetings",
          title: "Будущее встреч: как ИИ изменит деловые коммуникации",
          slug: "ai-future-meetings",
          content: this.getSampleContent("ai-future"),
          excerpt:
            "Исследуем, как искусственный интеллект революционизирует способы проведения встреч и деловых пере��оворов.",
          heroImage:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
          category: "tech-ai",
          tags: ["ИИ", "будущее", "встречи", "технологии", "инновации"],
          author: "andrey-shcherbina",
          publishedAt: new Date("2024-12-10").toISOString(),
          updatedAt: new Date("2024-12-10").toISOString(),
          status: "published",
          featured: true,
          readTime: 12,
          views: 2156,
        },
        {
          id: "speech-recognition-2024",
          title: "Технологии распознавания речи в 2024: что нового?",
          slug: "speech-recognition-2024",
          content: this.getSampleContent("speech-tech"),
          excerpt:
            "Обзор последних достижений в области распознавания речи и их применение в бизнесе.",
          heroImage:
            "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=400&fit=crop",
          category: "tech-ai",
          tags: ["распознавание речи", "ИИ", "2024", "технологии"],
          author: "maria-petrov",
          publishedAt: new Date("2024-12-05").toISOString(),
          updatedAt: new Date("2024-12-05").toISOString(),
          status: "published",
          readTime: 10,
          views: 1834,
        },
        {
          id: "machine-learning-transcription",
          title: "Машинное обучение в транскрипции: от теории к практике",
          slug: "machine-learning-transcription",
          content: this.getSampleContent("ml-transcription"),
          excerpt:
            "Как алгоритмы машинного обучения улучшают качество автоматической транскрипции речи.",
          heroImage:
            "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
          category: "tech-ai",
          tags: ["машинное обучение", "транскрипция", "алгоритмы", "ИИ"],
          author: "andrey-shcherbina",
          publishedAt: new Date("2024-11-28").toISOString(),
          updatedAt: new Date("2024-11-28").toISOString(),
          status: "published",
          readTime: 15,
          views: 987,
        },
        {
          id: "nlp-meeting-analysis",
          title: "NLP для анализа встреч: извлекаем смы��л из разговоров",
          slug: "nlp-meeting-analysis",
          content: this.getSampleContent("nlp-analysis"),
          excerpt:
            "Применение обработки естественного языка для автоматического анализа содержания встреч.",
          heroImage:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
          category: "tech-ai",
          tags: ["NLP", "анализ", "встречи", "обработка языка"],
          author: "andrey-shcherbina",
          publishedAt: new Date("2024-11-20").toISOString(),
          updatedAt: new Date("2024-11-20").toISOString(),
          status: "published",
          readTime: 11,
          views: 1456,
        },
        {
          id: "api-integration-guide",
          title: "Интеграция API mymeet.ai: пошаговое руководство",
          slug: "api-integration-guide",
          content: this.getSampleContent("api-guide"),
          excerpt:
            "Подробная инструкция по интеграции API mymeet.ai в ваши приложения и рабочие процессы.",
          heroImage:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
          category: "tech-ai",
          tags: ["API", "интеграция", "разработка", "руководство"],
          author: "andrey-shcherbina",
          publishedAt: new Date("2024-11-15").toISOString(),
          updatedAt: new Date("2024-11-15").toISOString(),
          status: "published",
          readTime: 18,
          views: 756,
        },

        // Управление задачами (4 статьи)
        {
          id: "task-automation-meetings",
          title:
            "Автоматизация задач после встреч: больше никаких забытых договоренностей",
          slug: "task-automation-meetings",
          content: this.getSampleContent("task-automation"),
          excerpt:
            "Как автоматически извлекать и создавать задачи из записей встреч для повышения продуктивности команды.",
          heroImage:
            "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop",
          category: "task-management",
          tags: ["автоматизация", "задачи", "продуктивность", "встречи"],
          author: "maria-petrov",
          publishedAt: new Date("2024-12-08").toISOString(),
          updatedAt: new Date("2024-12-08").toISOString(),
          status: "published",
          featured: true,
          readTime: 9,
          views: 1654,
        },
        {
          id: "project-management-ai",
          title: "ИИ-помощники в управлении проектами: реальность или будущее?",
          slug: "project-management-ai",
          content: this.getSampleContent("pm-ai"),
          excerpt:
            "Обзор современных ИИ-инструментов для проект-менеджеров и их практическое применение.",
          heroImage:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
          category: "task-management",
          tags: ["проект-менеджмент", "ИИ", "инструменты", "планирование"],
          author: "maria-petrov",
          publishedAt: new Date("2024-11-25").toISOString(),
          updatedAt: new Date("2024-11-25").toISOString(),
          status: "published",
          readTime: 13,
          views: 1234,
        },
        {
          id: "agile-retrospectives-ai",
          title: "Agile-ретроспективы с ИИ: новый уровень анализа команды",
          slug: "agile-retrospectives-ai",
          content: this.getSampleContent("agile-retro"),
          excerpt:
            "Как использовать ИИ для более глубокого анализа ретроспективных встреч в Agile-командах.",
          heroImage:
            "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=400&fit=crop",
          category: "task-management",
          tags: ["Agile", "ретроспективы", "ИИ", "команда"],
          author: "maria-petrov",
          publishedAt: new Date("2024-11-10").toISOString(),
          updatedAt: new Date("2024-11-10").toISOString(),
          status: "published",
          readTime: 8,
          views: 892,
        },
        {
          id: "deadline-tracking-smart",
          title:
            "Умное отслеживание дедлайнов: как не пропустить важные задачи",
          slug: "deadline-tracking-smart",
          content: this.getSampleContent("deadline-tracking"),
          excerpt:
            "Методы и инструменты для эффективного контроля сроков выполнения задач в команде.",
          heroImage:
            "https://images.unsplash.com/photo-1506784693919-ef06d93c28ba?w=800&h=400&fit=crop",
          category: "task-management",
          tags: ["дедлайны", "планирование", "контроль", "задачи"],
          author: "team-mymeet",
          publishedAt: new Date("2024-10-30").toISOString(),
          updatedAt: new Date("2024-10-30").toISOString(),
          status: "published",
          readTime: 7,
          views: 743,
        },

        // Новости продукта (3 статьи)
        {
          id: "mymeet-ai-2024-updates",
          title: "Обновления mymeet.ai 2024: новые функции и улучшения",
          slug: "mymeet-ai-2024-updates",
          content: this.getSampleContent("product-updates"),
          excerpt:
            "Обзор всех новых функций и улучшений, добавленных в mymeet.ai в течение 2024 года.",
          heroImage:
            "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop",
          category: "product-news",
          tags: ["обновления", "новые функции", "2024", "продукт"],
          author: "team-mymeet",
          publishedAt: new Date("2024-12-12").toISOString(),
          updatedAt: new Date("2024-12-12").toISOString(),
          status: "published",
          featured: true,
          readTime: 6,
          views: 2345,
        },
        {
          id: "mobile-app-launch",
          title: "Запуск мобильного приложения mymeet.ai: встречи в кармане",
          slug: "mobile-app-launch",
          content: this.getSampleContent("mobile-app"),
          excerpt:
            "Представляем новое мобильное приложение mymeet.ai для iOS и Android с полным функционалом.",
          heroImage:
            "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop",
          category: "product-news",
          tags: ["мобильное приложение", "iOS", "Android", "запуск"],
          author: "team-mymeet",
          publishedAt: new Date("2024-11-18").toISOString(),
          updatedAt: new Date("2024-11-18").toISOString(),
          status: "published",
          readTime: 5,
          views: 1876,
        },
        {
          id: "enterprise-features-release",
          title: "Корпоративные функции: mymeet.ai для больших команд",
          slug: "enterprise-features-release",
          content: this.getSampleContent("enterprise-features"),
          excerpt:
            "Новый набор корпоративных функций для управления встречами в крупных организациях.",
          heroImage:
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop",
          category: "product-news",
          tags: ["корпоративные функции", "большие команды", "управление"],
          author: "maria-petrov",
          publishedAt: new Date("2024-10-25").toISOString(),
          updatedAt: new Date("2024-10-25").toISOString(),
          status: "published",
          readTime: 9,
          views: 1123,
        },

        // Советы по встречам (4 статьи)
        {
          id: "effective-online-meetings",
          title: "10 секретов эффективных онлайн-встреч в 2024 году",
          slug: "effective-online-meetings",
          content: this.getSampleContent("online-meetings"),
          excerpt:
            "Проверенные стратегии для проведения продуктивных видеоконференций и удаленных встреч.",
          heroImage:
            "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&h=400&fit=crop",
          category: "meeting-tips",
          tags: [
            "онлайн встречи",
            "эффективность",
            "видеоконференции",
            "советы",
          ],
          author: "maria-petrov",
          publishedAt: new Date("2024-12-01").toISOString(),
          updatedAt: new Date("2024-12-01").toISOString(),
          status: "published",
          featured: true,
          readTime: 11,
          views: 2987,
        },
        {
          id: "meeting-preparation-guide",
          title: "Подготовка к встрече: чек-лист для организаторов",
          slug: "meeting-preparation-guide",
          content: this.getSampleContent("meeting-prep"),
          excerpt:
            "Полный чек-лист для подготовки к встречам: от планирования повестки до настройки техники.",
          heroImage:
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=400&fit=crop",
          category: "meeting-tips",
          tags: ["подготовка", "планирование", "чек-лист", "организация"],
          author: "maria-petrov",
          publishedAt: new Date("2024-11-12").toISOString(),
          updatedAt: new Date("2024-11-12").toISOString(),
          status: "published",
          readTime: 8,
          views: 1567,
        },
        {
          id: "difficult-conversations-guide",
          title: "Сложные разговоры: как проводить неприятные встречи",
          slug: "difficult-conversations-guide",
          content: this.getSampleContent("difficult-talks"),
          excerpt:
            "Практические советы по ведению сложных переговоров и решению конфликтных ситуаций.",
          heroImage:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=400&fit=crop",
          category: "meeting-tips",
          tags: [
            "сложные разговоры",
            "конфликты",
            "переговоры",
            "коммуникация",
          ],
          author: "team-mymeet",
          publishedAt: new Date("2024-10-20").toISOString(),
          updatedAt: new Date("2024-10-20").toISOString(),
          status: "published",
          readTime: 12,
          views: 1345,
        },
        {
          id: "meeting-note-taking-tips",
          title: "Искусство ведения заметок: лучшие практики для встреч",
          slug: "meeting-note-taking-tips",
          content: this.getSampleContent("note-taking"),
          excerpt:
            "Техники эффективного ведения заметок во время встреч для лучшего запоминания информации.",
          heroImage:
            "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
          category: "meeting-tips",
          tags: ["заметки", "ведение записей", "память", "техники"],
          author: "maria-petrov",
          publishedAt: new Date("2024-10-05").toISOString(),
          updatedAt: new Date("2024-10-05").toISOString(),
          status: "published",
          readTime: 9,
          views: 987,
        },

        // Истории клиентов (2 статьи)
        {
          id: "startup-success-story",
          title: "Как стартап увеличил эффективность встреч на 60% с mymeet.ai",
          slug: "startup-success-story",
          content: this.getSampleContent("startup-story"),
          excerpt:
            "История успеха технологического стартапа, который революционизировал свои рабочие процессы.",
          heroImage:
            "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop",
          category: "customer-stories",
          tags: ["кейс", "стартап", "эффективность", "успех"],
          author: "team-mymeet",
          publishedAt: new Date("2024-11-22").toISOString(),
          updatedAt: new Date("2024-11-22").toISOString(),
          status: "published",
          featured: true,
          readTime: 7,
          views: 1789,
        },
        {
          id: "enterprise-transformation",
          title: "Цифровая трансформация встреч в крупной корпорации",
          slug: "enterprise-transformation",
          content: this.getSampleContent("enterprise-story"),
          excerpt:
            "Как международная компания с 1000+ сотрудниками внедрила ИИ-анализ встреч по всей организации.",
          heroImage:
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop",
          category: "customer-stories",
          tags: ["корпорация", "трансформация", "внедрение", "масштаб"],
          author: "team-mymeet",
          publishedAt: new Date("2024-10-15").toISOString(),
          updatedAt: new Date("2024-10-15").toISOString(),
          status: "published",
          readTime: 10,
          views: 1456,
        },

        // Искусство продаж (1 статья)
        {
          id: "sales-call-analysis",
          title: "Анализ продажных звонков с ИИ: находим точки роста",
          slug: "sales-call-analysis",
          content: this.getSampleContent("sales-analysis"),
          excerpt:
            "Как использовать ИИ-анализ для улучшения техник продаж и повышения конверсии.",
          heroImage:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
          category: "sales-art",
          tags: ["продажи", "анализ звонков", "конверсия", "ИИ"],
          author: "andrey-shcherbina",
          publishedAt: new Date("2024-11-05").toISOString(),
          updatedAt: new Date("2024-11-05").toISOString(),
          status: "published",
          readTime: 14,
          views: 2134,
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
        <p>В современном мире эффективность и скорость обработки информации играют ключевую роль в успехе любого бизнеса. Расширения Chrome для преобразования речи в текст стали незаменимыми инструментами для профессионалов различных сфер.</p>

        <h2 id="intro">Введение</h2>
        <p>Технологии распознавания речи значительно продвинулись за последние годы. Современные алгоритмы машинного обучения позволяют достигать точности более 95% в идеальных условиях.</p>

        <h2 id="top-extensions">ТОП-9 расширений Chrome</h2>

        <h3>1. Voice In Voice Typing</h3>
        <p>Универсальное расширение для голосового ввода в любых текстовых полях браузера. Поддерживает более 120 языков и диалектов.</p>

        <h3>2. Speechify</h3>
        <p>Мощный инструмент для преобразования текста в речь и обратно. Особенно полезен для людей с дислексией.</p>

        <h3>3. mymeet.ai Web Clipper</h3>
        <p>Наше собственное расширение для быстрой транскрипции встреч прямо в браузере. Интегрируется со всеми популярными платформами видеосвязи.</p>

        <h2 id="comparison">Сравнительная таблица</h2>
        <p>Ниже представлено сравнение ключевых характеристик рассмотренных расширений.</p>
      `,
      "ai-future": `
        <p>Искусственный интеллект уже сегодня меняет способы проведения деловых встреч. От автоматической транскрипции до анализа эмоций участников — ИИ открывает новые возможности для повышения эффективности коммуникаций.</p>

        <h2>Текущие тренды</h2>
        <p>Современные ИИ-инструменты позволяют автоматически создавать протоколы встреч, выделять ключевые решения и даже анализировать настроение участников.</p>

        <h2>Что ждет нас в будущем</h2>
        <p>Прогнозируется развитие технологий реального времени перевода, эмоционального анализа и автоматического планирования встреч.</p>
      `,
      // Добавим остальные шаблоны контента...
      default: `
        <p>Это образец контента для статьи. В реальном приложении здесь будет полноценная статья с подробным содержанием, изображениями и структурированной информацией.</p>

        <h2>Основное содержание</h2>
        <p>Здесь располагается основная часть статьи с детальным раскрытием темы, примерами и практическими советами.</p>

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

  async getCategoriesWithPosts(): Promise<BlogCategory[]> {
    const categories = await this.getAllCategories();
    return categories.filter((cat) => cat.postCount > 0);
  }

  async getCategoryBySlug(slug: string): Promise<BlogCategory | null> {
    const categories = await this.getAllCategories();
    return categories.find((cat) => cat.slug === slug) || null;
  }

  async createCategory(
    category: Omit<BlogCategory, "id" | "postCount">,
  ): Promise<BlogCategory> {
    const categories = await this.getAllCategories();
    const newCategory: BlogCategory = {
      ...category,
      id: this.generateId(),
      postCount: 0,
    };

    categories.push(newCategory);
    this.saveData(STORAGE_KEYS.CATEGORIES, categories);

    return newCategory;
  }

  async updateCategory(
    id: string,
    updates: Partial<BlogCategory>,
  ): Promise<BlogCategory | null> {
    const categories = await this.getAllCategories();
    const index = categories.findIndex((cat) => cat.id === id);

    if (index === -1) return null;

    const updatedCategory = {
      ...categories[index],
      ...updates,
    };

    categories[index] = updatedCategory;
    this.saveData(STORAGE_KEYS.CATEGORIES, categories);

    return updatedCategory;
  }

  async deleteCategory(id: string): Promise<boolean> {
    const categories = await this.getAllCategories();
    const posts = await this.getAllPosts();

    // Check if category has posts
    const hasPosts = posts.some((post) => post.category === id);
    if (hasPosts) {
      throw new Error("Нельзя удалить категорию, содержащую статьи");
    }

    const filteredCategories = categories.filter((cat) => cat.id !== id);

    if (categories.length === filteredCategories.length) return false;

    this.saveData(STORAGE_KEYS.CATEGORIES, filteredCategories);

    return true;
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
