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
  image?: string;
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
          image:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
          postCount: 0,
        },
        {
          id: "task-management",
          name: "Управление задачами",
          slug: "task-management",
          description:
            "Методы и инструменты для эффективного управления задачами",
          color: "bg-green-600",
          image:
            "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop",
          postCount: 0,
        },
        {
          id: "product-news",
          name: "Новости продукта",
          slug: "product-news",
          description: "Обновления и новые функции mymeet.ai",
          color: "bg-purple-600",
          image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
          postCount: 0,
        },
        {
          id: "meeting-tips",
          name: "Советы по встречам",
          slug: "meeting-tips",
          description: "Практические советы для проведения эффективных встреч",
          color: "bg-orange-600",
          image:
            "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=400&fit=crop",
          postCount: 0,
        },
        {
          id: "customer-stories",
          name: "Истории клиентов",
          slug: "customer-stories",
          description: "Реальные кейсы использования mymeet.ai",
          color: "bg-indigo-600",
          image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
          postCount: 0,
        },
        {
          id: "sales-art",
          name: "Искусство продаж",
          slug: "sales-art",
          description: "Техники и стратегии успешных продаж",
          color: "bg-red-600",
          image:
            "https://images.unsplash.com/photo-1556745753-b2904692b3cd?w=800&h=400&fit=crop",
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
        {
          id: "ai-future-meetings",
          title: "Как ИИ меняет будущее деловых встреч",
          slug: "ai-future-meetings",
          content: this.getSampleContent("default"),
          excerpt:
            "Исследование роли искусственного интеллекта в автоматизации встреч, анализе данных и повышении эффективности коммуникаций.",
          heroImage:
            "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
          category: "tech-ai",
          tags: ["ИИ", "автоматизация встреч", "машинное обучение", "будущее"],
          author: "andrey-shcherbina",
          publishedAt: new Date("2024-12-10").toISOString(),
          updatedAt: new Date("2024-12-10").toISOString(),
          status: "published",
          featured: false,
          readTime: 7,
          views: 1432,
          likes: 124,
          shares: 45,
          difficulty: "intermediate",
          language: "ru",
          series: "Технологии будущего",
          seriesOrder: 2,
          tableOfContents: [
            { id: "intro", title: "Введение", level: 1 },
            { id: "current-state", title: "Современное состояние", level: 1 },
            { id: "ai-benefits", title: "Преимущества ИИ", level: 1 },
            { id: "implementation", title: "Внедрение в компании", level: 1 },
            { id: "future-trends", title: "Будущие тренды", level: 1 },
          ],
        },
        {
          id: "productivity-tools-2024",
          title: "15 инструментов продуктивности, которые изменят ваш 2024 год",
          slug: "productivity-tools-2024",
          content: this.getSampleContent("default"),
          excerpt:
            "Подборка лучших приложений и сервисов для повышения личной и командной продуктивности в новом году.",
          heroImage:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
          category: "task-management",
          tags: ["продуктивность", "приложения", "планирование", "организация"],
          author: "maria-petrov",
          publishedAt: new Date("2024-12-05").toISOString(),
          updatedAt: new Date("2024-12-05").toISOString(),
          status: "published",
          featured: true,
          readTime: 10,
          views: 2156,
          likes: 198,
          shares: 87,
          difficulty: "beginner",
          language: "ru",
          tableOfContents: [
            { id: "intro", title: "Введение", level: 1 },
            { id: "task-managers", title: "Менеджеры задач", level: 1 },
            { id: "time-tracking", title: "Учет времени", level: 1 },
            { id: "automation", title: "Автоматизация", level: 1 },
            { id: "conclusion", title: "Заключение", level: 1 },
          ],
        },
        {
          id: "effective-online-meetings",
          title: "Секреты эффективных онлайн-встреч: гид для руководителей",
          slug: "effective-online-meetings",
          content: this.getSampleContent("default"),
          excerpt:
            "Практические сов��ты по организации продуктивных виртуальных встреч и управлению удаленными командами.",
          heroImage:
            "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=400&fit=crop",
          category: "meeting-tips",
          tags: [
            "онлайн встречи",
            "удаленная работа",
            "руководство",
            "управление",
          ],
          author: "team-mymeet",
          publishedAt: new Date("2024-12-08").toISOString(),
          updatedAt: new Date("2024-12-08").toISOString(),
          status: "published",
          featured: false,
          readTime: 6,
          views: 987,
          likes: 76,
          shares: 23,
          difficulty: "beginner",
          language: "ru",
          tableOfContents: [
            { id: "intro", title: "Введение", level: 1 },
            { id: "preparation", title: "Подготовка к встрече", level: 1 },
            { id: "during-meeting", title: "Во время встречи", level: 1 },
            { id: "follow-up", title: "После встречи", level: 1 },
          ],
        },
        {
          id: "mymeet-ai-release-v2",
          title: "mymeet.ai 2.0: революционные обновления для умных встреч",
          slug: "mymeet-ai-release-v2",
          content: this.getSampleContent("default"),
          excerpt:
            "Обзор нововведений в mymeet.ai 2.0: улучшенный ИИ-помощник, новые интеграции и расширенная аналитика встреч.",
          heroImage:
            "https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&h=400&fit=crop",
          category: "product-news",
          tags: ["mymeet.ai", "обновления", "новые функции", "ИИ-помощник"],
          author: "team-mymeet",
          publishedAt: new Date("2024-12-12").toISOString(),
          updatedAt: new Date("2024-12-12").toISOString(),
          status: "published",
          featured: true,
          readTime: 5,
          views: 3421,
          likes: 287,
          shares: 134,
          difficulty: "beginner",
          language: "ru",
          tableOfContents: [
            { id: "intro", title: "Что нового", level: 1 },
            { id: "ai-improvements", title: "Улучшения ИИ", level: 1 },
            { id: "integrations", title: "Новые инт��грации", level: 1 },
            { id: "analytics", title: "Расширенная аналитика", level: 1 },
            { id: "migration", title: "Как обновиться", level: 1 },
          ],
        },
        {
          id: "sales-psychology-masterclass",
          title: "Психология продаж: как читать клиентов и закрывать сделки",
          slug: "sales-psychology-masterclass",
          content: this.getSampleContent("default"),
          excerpt:
            "Мастер-класс по психологическим приемам в продажах. Изучаем поведенческие паттерны клиентов и техники влияния.",
          heroImage:
            "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop",
          category: "sales-art",
          tags: ["психология продаж", "клиенты", "переговоры", "техники"],
          author: "maria-petrov",
          publishedAt: new Date("2024-12-07").toISOString(),
          updatedAt: new Date("2024-12-07").toISOString(),
          status: "published",
          featured: false,
          readTime: 15,
          views: 1876,
          likes: 156,
          shares: 67,
          difficulty: "advanced",
          language: "ru",
          series: "Мастерство продаж",
          seriesOrder: 1,
          tableOfContents: [
            { id: "intro", title: "Введение в психологию продаж", level: 1 },
            { id: "reading-clients", title: "Чтение клиентов", level: 1 },
            { id: "influence-techniques", title: "Техники влияния", level: 1 },
            {
              id: "objection-handling",
              title: "Работа с возражениями",
              level: 1,
            },
            { id: "closing", title: "Закрытие сделки", level: 1 },
          ],
        },
        {
          id: "startup-success-story-techcorp",
          title:
            "История успеха: как TechCorp увеличила продажи на 300% с mymeet.ai",
          slug: "startup-success-story-techcorp",
          content: this.getSampleContent("default"),
          excerpt:
            "Реальный кейс использования mymeet.ai в технологическом стартапе. Подробный анализ результатов и рекомендации.",
          heroImage:
            "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop",
          category: "customer-stories",
          tags: ["кейс", "стартап", "увеличение продаж", "результаты"],
          author: "team-mymeet",
          publishedAt: new Date("2024-12-14").toISOString(),
          updatedAt: new Date("2024-12-14").toISOString(),
          status: "published",
          featured: false,
          readTime: 8,
          views: 1234,
          likes: 98,
          shares: 42,
          difficulty: "intermediate",
          language: "ru",
          tableOfContents: [
            { id: "company-background", title: "О компании", level: 1 },
            { id: "challenges", title: "Вызовы", level: 1 },
            { id: "solution", title: "Решение", level: 1 },
            { id: "results", title: "Результаты", level: 1 },
            { id: "lessons", title: "Выводы", level: 1 },
          ],
        },
        {
          id: "remote-team-management-guide",
          title: "Полное руководство по управлению удаленными командами",
          slug: "remote-team-management-guide",
          content: this.getSampleContent("default"),
          excerpt:
            "Комплексный гид по построению эффективных процессов в распределенных командах. От найма до культуры.",
          heroImage:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
          category: "task-management",
          tags: [
            "удаленная работа",
            "управление командой",
            "процессы",
            "культура",
          ],
          author: "maria-petrov",
          publishedAt: new Date("2024-12-06").toISOString(),
          updatedAt: new Date("2024-12-06").toISOString(),
          status: "published",
          featured: false,
          readTime: 18,
          views: 1567,
          likes: 134,
          shares: 56,
          difficulty: "advanced",
          language: "ru",
          tableOfContents: [
            { id: "intro", title: "Введение", level: 1 },
            { id: "hiring", title: "Найм удаленных сотрудников", level: 1 },
            { id: "processes", title: "Настройка процессов", level: 1 },
            { id: "culture", title: "Корпоративная культура", level: 1 },
            { id: "tools", title: "Инструменты", level: 1 },
            { id: "challenges", title: "Типичные проблемы", level: 1 },
          ],
        },
        {
          id: "ai-transcription-accuracy-study",
          title: "Исследование точности ИИ-транскрипции: сравнение 10 платформ",
          slug: "ai-transcription-accuracy-study",
          content: this.getSampleContent("default"),
          excerpt:
            "Научное исследование точности различных систем автоматической транскрипции речи. Методология и результаты.",
          heroImage:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
          category: "tech-ai",
          tags: ["ИИ", "транскрипция", "исследование", "сравнение", "точность"],
          author: "andrey-shcherbina",
          publishedAt: new Date("2024-12-11").toISOString(),
          updatedAt: new Date("2024-12-11").toISOString(),
          status: "published",
          featured: false,
          readTime: 12,
          views: 923,
          likes: 87,
          shares: 29,
          difficulty: "advanced",
          language: "ru",
          tableOfContents: [
            { id: "methodology", title: "Методология", level: 1 },
            { id: "platforms", title: "Тестируемые платформы", level: 1 },
            { id: "results", title: "Результаты", level: 1 },
            { id: "analysis", title: "Анализ", level: 1 },
            { id: "recommendations", title: "Рекомендации", level: 1 },
          ],
        },
        {
          id: "meeting-fatigue-solutions",
          title: "Усталость от встреч: диагностика и практические решения",
          slug: "meeting-fatigue-solutions",
          content: this.getSampleContent("default"),
          excerpt:
            "Изучаем феномен meeting fatigue и предлагаем конкретные стратегии для снижения нагрузки на сотрудников.",
          heroImage:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=400&fit=crop",
          category: "meeting-tips",
          tags: ["усталость", "встречи", "wellness", "продуктивность"],
          author: "maria-petrov",
          publishedAt: new Date("2024-12-09").toISOString(),
          updatedAt: new Date("2024-12-09").toISOString(),
          status: "published",
          featured: false,
          readTime: 9,
          views: 1345,
          likes: 112,
          shares: 38,
          difficulty: "intermediate",
          language: "ru",
          tableOfContents: [
            {
              id: "problem-definition",
              title: "Определение проблемы",
              level: 1,
            },
            { id: "causes", title: "Причины усталости", level: 1 },
            { id: "solutions", title: "Практические решения", level: 1 },
            { id: "prevention", title: "Профилактика", level: 1 },
          ],
        },
        {
          id: "crm-integration-best-practices",
          title: "Интеграция CRM и систем видеоконференций: лучшие практики",
          slug: "crm-integration-best-practices",
          content: this.getSampleContent("default"),
          excerpt:
            "Руководство по объединению данных о встречах с CRM-системами для повышения эффективности продаж.",
          heroImage:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
          category: "tech-ai",
          tags: ["CRM", "интеграция", "продажи", "автоматизация"],
          author: "andrey-shcherbina",
          publishedAt: new Date("2024-12-13").toISOString(),
          updatedAt: new Date("2024-12-13").toISOString(),
          status: "published",
          featured: false,
          readTime: 11,
          views: 1123,
          likes: 95,
          shares: 31,
          difficulty: "intermediate",
          language: "ru",
          tableOfContents: [
            { id: "intro", title: "Введение", level: 1 },
            { id: "benefits", title: "Преимущества интеграции", level: 1 },
            { id: "implementation", title: "Этапы внедрения", level: 1 },
            { id: "best-practices", title: "Лучшие практики", level: 1 },
            { id: "common-mistakes", title: "Частые ошибки", level: 1 },
          ],
        },
        {
          id: "sales-objections-handbook",
          title: "Справочник по работе с возражениями: 50 типичных ситуаций",
          slug: "sales-objections-handbook",
          content: this.getSampleContent("default"),
          excerpt:
            "Исчерпывающий справочник для продажников: типичные возражения клиентов и проверенные методы их преодоления.",
          heroImage:
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
          category: "sales-art",
          tags: ["возражения", "продажи", "справочник", "техники"],
          author: "maria-petrov",
          publishedAt: new Date("2024-12-04").toISOString(),
          updatedAt: new Date("2024-12-04").toISOString(),
          status: "published",
          featured: false,
          readTime: 20,
          views: 2134,
          likes: 189,
          shares: 78,
          difficulty: "intermediate",
          language: "ru",
          series: "Мастерство продаж",
          seriesOrder: 2,
          tableOfContents: [
            { id: "intro", title: "Введение", level: 1 },
            { id: "price-objections", title: "Возражения по цене", level: 1 },
            {
              id: "timing-objections",
              title: "Возражения по времени",
              level: 1,
            },
            {
              id: "authority-objections",
              title: "Возражения по полномочиям",
              level: 1,
            },
            {
              id: "need-objections",
              title: "Возражения по потребности",
              level: 1,
            },
            {
              id: "advanced-techniques",
              title: "Продвинутые техники",
              level: 1,
            },
          ],
        },
        {
          id: "enterprise-security-meetings",
          title: "Безопасность корпоративных встреч: комплексный подход",
          slug: "enterprise-security-meetings",
          content: this.getSampleContent("default"),
          excerpt:
            "Руководство по обеспечению информационной безопасности в корпоративных видеоконференциях и защите конфиденциальных данных.",
          heroImage:
            "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop",
          category: "tech-ai",
          tags: [
            "безопасность",
            "корпоративные встречи",
            "шифрование",
            "конфиденциальность",
          ],
          author: "andrey-shcherbina",
          publishedAt: new Date("2024-12-03").toISOString(),
          updatedAt: new Date("2024-12-03").toISOString(),
          status: "published",
          featured: false,
          readTime: 14,
          views: 876,
          likes: 72,
          shares: 25,
          difficulty: "advanced",
          language: "ru",
          tableOfContents: [
            { id: "threat-landscape", title: "Угрозы и риски", level: 1 },
            { id: "encryption", title: "Шифрование", level: 1 },
            { id: "access-control", title: "Контроль доступа", level: 1 },
            { id: "compliance", title: "Соответствие требованиям", level: 1 },
            { id: "best-practices", title: "Лучшие практики", level: 1 },
          ],
        },
        {
          id: "agile-retrospectives-virtual",
          title: "Виртуальные ретроспективы в Agile: инструменты и методики",
          slug: "agile-retrospectives-virtual",
          content: this.getSampleContent("default"),
          excerpt:
            "Как проводить эффективные ретроспективы в распределенных Agile-командах. Инструменты, форматы и лучшие практики.",
          heroImage:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
          category: "task-management",
          tags: ["Agile", "ретроспективы", "удаленная работа", "методологии"],
          author: "team-mymeet",
          publishedAt: new Date("2024-12-02").toISOString(),
          updatedAt: new Date("2024-12-02").toISOString(),
          status: "published",
          featured: false,
          readTime: 10,
          views: 1456,
          likes: 118,
          shares: 44,
          difficulty: "intermediate",
          language: "ru",
          tableOfContents: [
            {
              id: "agile-basics",
              title: "Основы Agile ретроспектив",
              level: 1,
            },
            {
              id: "virtual-challenges",
              title: "Вызовы виртуального формата",
              level: 1,
            },
            { id: "tools", title: "Инструменты", level: 1 },
            { id: "formats", title: "Форматы проведения", level: 1 },
            { id: "facilitation", title: "Фасилитация", level: 1 },
          ],
        },
        {
          id: "voice-analytics-insights",
          title: "Голосовая аналитика: как извлечь инсайты из записей встреч",
          slug: "voice-analytics-insights",
          content: this.getSampleContent("default"),
          excerpt:
            "Руководство по использованию технологий анализа речи для получения ценных данных о поведении и эмоциях участников встреч.",
          heroImage:
            "https://images.unsplash.com/photo-1589254065909-42ca5e6bf5de?w=800&h=400&fit=crop",
          category: "tech-ai",
          tags: ["голосовая аналитика", "анализ речи", "эмоции", "поведение"],
          author: "andrey-shcherbina",
          publishedAt: new Date("2024-12-01").toISOString(),
          updatedAt: new Date("2024-12-01").toISOString(),
          status: "published",
          featured: false,
          readTime: 13,
          views: 734,
          likes: 63,
          shares: 19,
          difficulty: "advanced",
          language: "ru",
          tableOfContents: [
            { id: "intro", title: "Что такое голосовая аналитика", level: 1 },
            { id: "technologies", title: "Технологии", level: 1 },
            { id: "sentiment-analysis", title: "Анализ тональности", level: 1 },
            { id: "stress-detection", title: "Детекция стресса", level: 1 },
            { id: "applications", title: "Применение", level: 1 },
            { id: "ethics", title: "Этические аспекты", level: 1 },
          ],
        },
        {
          id: "b2b-sales-discovery-questions",
          title: "140 открывающих вопросов для B2B продаж",
          slug: "b2b-sales-discovery-questions",
          content: this.getSampleContent("default"),
          excerpt:
            "Большая коллекция проверенных вопросов для этапа исследования потребностей в B2B продажах. Категории и примеры использования.",
          heroImage:
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
          category: "sales-art",
          tags: [
            "B2B продажи",
            "открывающие вопросы",
            "исследование потребностей",
            "техники",
          ],
          author: "maria-petrov",
          publishedAt: new Date("2024-11-30").toISOString(),
          updatedAt: new Date("2024-11-30").toISOString(),
          status: "published",
          featured: true,
          readTime: 16,
          views: 2987,
          likes: 243,
          shares: 98,
          difficulty: "intermediate",
          language: "ru",
          series: "Мастерство продаж",
          seriesOrder: 3,
          tableOfContents: [
            {
              id: "discovery-importance",
              title: "Важность этапа исследования",
              level: 1,
            },
            { id: "question-types", title: "Типы вопросов", level: 1 },
            { id: "business-questions", title: "Вопросы о бизнесе", level: 1 },
            { id: "pain-questions", title: "Вопросы о проблемах", level: 1 },
            {
              id: "decision-questions",
              title: "Вопросы о принятии решений",
              level: 1,
            },
            { id: "budget-questions", title: "Вопросы о бюджете", level: 1 },
          ],
        },
        {
          id: "meeting-room-optimization",
          title: "Оптимизация переговорных комнат для гибридных встреч",
          slug: "meeting-room-optimization",
          content: this.getSampleContent("default"),
          excerpt:
            "Практическое руководство по обустройству переговорных для эффективного проведения гибридных встреч с участием удаленных сотрудников.",
          heroImage:
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop",
          category: "meeting-tips",
          tags: ["переговорные", "гибридные встречи", "оборудование", "дизайн"],
          author: "team-mymeet",
          publishedAt: new Date("2024-11-29").toISOString(),
          updatedAt: new Date("2024-11-29").toISOString(),
          status: "published",
          featured: false,
          readTime: 11,
          views: 1234,
          likes: 89,
          shares: 32,
          difficulty: "beginner",
          language: "ru",
          tableOfContents: [
            {
              id: "hybrid-challenges",
              title: "Вызовы гибридного формата",
              level: 1,
            },
            {
              id: "audio-video",
              title: "Аудио и видео оборудование",
              level: 1,
            },
            { id: "lighting", title: "Освещение", level: 1 },
            { id: "furniture", title: "Мебель и планировка", level: 1 },
            { id: "software", title: "Программное обеспечение", level: 1 },
          ],
        },
        {
          id: "customer-retention-strategies",
          title: "Стратегии удержания клиентов в B2B: полное руководство",
          slug: "customer-retention-strategies",
          content: this.getSampleContent("default"),
          excerpt:
            "Комплексный подход к удержанию корпоративных клиентов. Метрики, стратегии и тактики для долгосрочных отношений.",
          heroImage:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
          category: "customer-stories",
          tags: ["удержание клиентов", "B2B", "стратегии", "лояльность"],
          author: "maria-petrov",
          publishedAt: new Date("2024-11-28").toISOString(),
          updatedAt: new Date("2024-11-28").toISOString(),
          status: "published",
          featured: false,
          readTime: 17,
          views: 1567,
          likes: 134,
          shares: 51,
          difficulty: "advanced",
          language: "ru",
          tableOfContents: [
            { id: "retention-metrics", title: "Метрики удержания", level: 1 },
            { id: "customer-journey", title: "Путь клиента", level: 1 },
            { id: "onboarding", title: "Онбординг", level: 1 },
            { id: "success-management", title: "Customer Success", level: 1 },
            {
              id: "renewal-strategies",
              title: "Стратегии продления",
              level: 1,
            },
          ],
        },
        {
          id: "meeting-analytics-dashboard",
          title:
            "Создание аналитического дашборда для встреч: пошаговое руководство",
          slug: "meeting-analytics-dashboard",
          content: this.getSampleContent("default"),
          excerpt:
            "Как построить информативный дашборд для анализа эффективности встреч в организации. Инстру��енты и метрики.",
          heroImage:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
          category: "tech-ai",
          tags: [
            "аналитика",
            "дашборд",
            "метрики встреч",
            "визуализация данных",
          ],
          author: "andrey-shcherbina",
          publishedAt: new Date("2024-11-27").toISOString(),
          updatedAt: new Date("2024-11-27").toISOString(),
          status: "published",
          featured: false,
          readTime: 14,
          views: 945,
          likes: 78,
          shares: 26,
          difficulty: "advanced",
          language: "ru",
          tableOfContents: [
            { id: "dashboard-goals", title: "Цели дашборда", level: 1 },
            { id: "key-metrics", title: "Ключевые метрики", level: 1 },
            { id: "data-sources", title: "Источники данных", level: 1 },
            { id: "visualization", title: "Визуализация", level: 1 },
            { id: "implementation", title: "Внедрение", level: 1 },
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
        <p>Мы протестировали десятки расширений и выбрали лучшие по критериям точности, скорости и удобства использования.</p>

        <h3 id="voice-in">1. Voice In Voice Typing</h3>
        <div class="extension-card">
          <p><strong>Рейтинг:</strong> ⭐⭐⭐⭐⭐ (5/5)</p>
          <p>Универсальное расширение для голосового ввода в любых текстовых полях браузера. Поддерживает более 120 я��ыков и диалектов.</p>
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
        <p>VR-технологии значительно повышают вовлеченность участников и позволяют создавать уникальный опыт сотрудничества, недоступный в традиционных видеоконференциях.</p>

        <h2 id="conclusion">Заключение</h2>
        <p>По прогнозам аналитиков, к 2030 году более 50% деловых встреч будут проводиться в виртуальной или смешанной реальности. Компании, которые начнут экспериментировать с этими технологиями уже сегодня, получат значительное конкурентное преимущество.</p>
      `,
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
    const now = new Date().toISOString();
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString(),
      views: 0,
      publishedAt: post.status === "published" ? now : "",
      updatedAt: now,
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

    const currentPost = posts[index];
    const now = new Date().toISOString();

    // If status is changing to published and was not published before, set publishedAt
    const shouldSetPublishedAt =
      updates.status === "published" &&
      currentPost.status !== "published" &&
      !currentPost.publishedAt;

    posts[index] = {
      ...currentPost,
      ...updates,
      updatedAt: now,
      ...(shouldSetPublishedAt && { publishedAt: now }),
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

  // Utility method to calculate reading time
  calculateReadTime(content: string): number {
    const wordsPerMinute = 200; // Average reading speed
    const text = content.replace(/<[^>]*>/g, ""); // Strip HTML tags
    const wordCount = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  }

  // Method to increment views
  incrementViews(slug: string): void {
    const posts = this.getAllPosts();
    const postIndex = posts.findIndex((post) => post.slug === slug);

    if (postIndex !== -1) {
      posts[postIndex].views = (posts[postIndex].views || 0) + 1;
      this.saveData(STORAGE_KEYS.POSTS, posts);
    }
  }

  // Method to get blog statistics
  getBlogStats(): BlogStats {
    return this.getStats();
  }

  // Method to generate slug from title
  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-zа-яё0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }

  // Method to generate table of contents
  generateTableOfContents(
    content: string,
  ): Array<{ id: string; title: string; level: number }> {
    const toc: Array<{ id: string; title: string; level: number }> = [];
    const headingRegex = /<h([1-6])[^>]*>([^<]*)<\/h[1-6]>/gi;
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = parseInt(match[1]);
      const title = match[2].trim();
      const id = title
        .toLowerCase()
        .replace(/[^a-zа-яё0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();

      toc.push({ id, title, level });
    }

    return toc;
  }
}

// Create and export database instance
const blogDatabase = new BlogDatabase();
export default blogDatabase;
