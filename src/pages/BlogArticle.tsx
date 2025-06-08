import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import {
  ArrowLeft,
  Share2,
  MessageCircle,
  Twitter,
  Linkedin,
  Clock,
  User,
  Tag,
} from "lucide-react";

// Sample article data - in a real app this would come from an API
const articleData = {
  "9-chrome-extensions": {
    id: "9-chrome-extensions",
    title: "9 лучших расширений Chrome для преобразования речи в текст",
    category: "Технологии и ИИ",
    author: "Андрей Щербина",
    date: "30 мая 2025 г.",
    readTime: "8 мин чтения",
    heroImage:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
    tableOfContents: [
      {
        id: "use-cases",
        title:
          "Основные сценарии использования расширений для преобразования речи в текст",
        level: 1,
      },
      {
        id: "mymeet-ai",
        title: "mymeet.ai — лидер в транскрипции и распознавании речи",
        level: 1,
      },
      {
        id: "top-extensions",
        title:
          "ТОП лучших расширений Chrome для преобразования речи в текст в 2025 году",
        level: 1,
      },
      {
        id: "comparison-table",
        title: "Сравнительная таблица расширений по ключевым параметрам",
        level: 1,
      },
      {
        id: "conclusion",
        title: "Заключение",
        level: 1,
      },
    ],
    content: `
      <p>В современном мире эффективность и скорость обработки информации играют ключевую роль в успехе любого бизнеса. Расширения Chrome для преобразования речи в текст стали незаменимыми инструментами для профессионалов различных сфер.</p>

      <h2 id="use-cases">Основные сценарии использования расширений для преобразования речи в текст</h2>
      
      <p>Расширения для транскрипции аудио нашли применение в множестве областей:</p>
      
      <ul>
        <li><strong>Ведение протоколов встреч</strong> — автоматическая фиксация ключевых моментов совещаний</li>
        <li><strong>Создание субтитров</strong> — быстрое добавление текстового сопровождения к видеоконтенту</li>
        <li><strong>Написание статей и заметок</strong> — диктовка текста вместо набора на клавиатуре</li>
        <li><strong>Обучение и лекции</strong> — конспектирование учебных материалов</li>
        <li><strong>Журналистика</strong> — расшифровка интервью и пресс-конференций</li>
      </ul>

      <h2 id="mymeet-ai">mymeet.ai — лидер в транскрипции и распознавании речи</h2>
      
      <p>Среди представленных решений особое место занимает <strong>mymeet.ai</strong> — передовая платформа, которая не только транскрибирует речь, но и анализирует содержание встреч с помощью искусственного интеллекта.</p>

      <h3>Ключевые преимущества mymeet.ai:</h3>
      
      <ul>
        <li>Поддержка 73 языков с высокой точностью распознавания</li>
        <li>ИИ-анализ встреч с выделением ключевых решений и задач</li>
        <li>Интеграция со всеми популярными платформами видеосвязи</li>
        <li>Корпоративный уровень безопасности данных</li>
        <li>Автоматическое создание протоколов и отчетов</li>
      </ul>

      <h2 id="top-extensions">ТОП лучших расширений Chrome для преобразования речи в текст в 2025 году</h2>

      <h3>1. Voice In Voice Typing</h3>
      <p>Универсальное расширение для голосового ввода в любых текстовых полях браузера.</p>

      <h3>2. Speechify</h3>
      <p>Мощный инструмент для преобразования текста в речь и обратно.</p>

      <h3>3. Web Speech API</h3>
      <p>Встроенная технология браузера для распознавания речи.</p>

      <h3>4. Dictation.io</h3>
      <p>Простой и эффективный инструмент для диктовки.</p>

      <h3>5. SpeechTexter</h3>
      <p>Многоязычный инструмент с поддержкой командного управления.</p>

      <h2 id="comparison-table">Сравнительная таблица расширений по ключевым параметрам</h2>

      <p>При выборе расширения важно учитывать следующие критерии:</p>

      <ul>
        <li><strong>Точность распознавания</strong> — качество преобразования речи в текст</li>
        <li><strong>Языковая поддержка</strong> — количество поддерживаемых языков</li>
        <li><strong>Скорость обработки</strong> — время отклика системы</li>
        <li><strong>Интеграции</strong> — совместимость с другими сервисами</li>
        <li><strong>Цена</strong> — стоимость использования</li>
      </ul>

      <h2 id="conclusion">Заключение</h2>

      <p>Расширения Chrome для преобразования речи в текст значительно упрощают работу с аудиоконтентом. Выбор конкретного инструмента зависит от ваших потребностей и бюджета.</p>

      <p>Для комплексного решения задач транскрипции и анализа встреч рекомендуем попробовать <strong>mymeet.ai</strong> — это не просто расширение, а полноценная платформа для повышения эффективности деловых коммуникаций.</p>
    `,
  },
};

const relatedArticles = [
  {
    title: "Как настроить ИИ-помощника для анализа встреч",
    url: "/blog/ai-assistant-setup",
    category: "Технологии и ИИ",
  },
  {
    title: "5 способов улучшить продуктивность команды",
    url: "/blog/team-productivity",
    category: "Управление задачами",
  },
  {
    title: "Автоматизация рабочих процессов в 2025 году",
    url: "/blog/workflow-automation",
    category: "Новости продукта",
  },
];

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const [activeSection, setActiveSection] = useState("");

  const article = slug ? articleData[slug as keyof typeof articleData] : null;

  // Track scroll position for table of contents
  useEffect(() => {
    if (!article) return;

    const handleScroll = () => {
      const sections = article.tableOfContents
        .map((item) => document.getElementById(item.id))
        .filter(Boolean);

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [article]);

  if (!article) {
    return (
      <div className="page-container flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-heading-xl text-gray-900 dark:text-white mb-4">
            Статья не найдена
          </h1>
          <Link to="/blog" className="text-blue-600 hover:text-blue-700">
            Вернуться к блогу
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Header />

      <main className="page-main">
        {/* Back button */}
        <div className="mb-6">
          <Link to="/blog">
            <Button
              variant="ghost"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />К блогу
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-3">
            {/* Hero Image */}
            <div className="relative mb-8 rounded-lg overflow-hidden">
              <img
                src={article.heroImage}
                alt={article.title}
                className="w-full h-48 sm:h-64 lg:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                <span className="inline-block px-3 py-1 bg-blue-600 text-white text-caption font-medium rounded-full mb-2">
                  {article.category}
                </span>
              </div>
            </div>

            {/* Article Header */}
            <div className="mb-8">
              <h1 className="text-display-xl text-gray-900 dark:text-white mb-6">
                {article.title}
              </h1>

              {/* Meta information */}
              <div className="flex flex-wrap items-center gap-6 text-caption text-gray-600 dark:text-gray-400 mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  <span>{article.date}</span>
                </div>
              </div>

              {/* Social sharing */}
              <div className="flex items-center gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
                <span className="text-body-md font-medium text-gray-900 dark:text-white">
                  Поделиться:
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="gap-2">
                    <Twitter className="w-4 h-4" />
                    Twitter
                  </Button>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </Button>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Share2 className="w-4 h-4" />
                    Поделиться
                  </Button>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div
              className="prose-content"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* AI Assistant Widget */}
            <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-heading-md text-gray-900 dark:text-white mb-2">
                    Попробуйте mymeet.ai бесплатно
                  </h3>
                  <p className="text-body-md text-gray-600 dark:text-gray-300 mb-4">
                    Начните использовать ИИ для анализа ваших встреч уже
                    сегодня. 180 минут бесплатно, не требуется карта.
                  </p>
                  <div className="flex gap-3">
                    <Button asChild className="button-primary">
                      <a
                        href="https://app.notetaker.ru/"
                        target="_blank"
                        rel="noopener"
                      >
                        Попробовать бесплатно
                      </a>
                    </Button>
                    <Button asChild variant="outline">
                      <a href="/contact">Узнать больше</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* Table of Contents */}
            <div className="card-base p-6 mb-8 sticky top-8">
              <h3 className="text-heading-md text-gray-900 dark:text-white mb-4">
                Содержание
              </h3>
              <nav className="space-y-2">
                {article.tableOfContents.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block text-body-md py-2 px-3 rounded transition-colors ${
                      activeSection === item.id
                        ? "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 font-medium"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>

            {/* Related Articles */}
            <div className="card-base p-6">
              <h3 className="text-heading-md text-gray-900 dark:text-white mb-4">
                Похожие статьи
              </h3>
              <div className="space-y-4">
                {relatedArticles.map((relatedArticle, index) => (
                  <Link
                    key={index}
                    to={relatedArticle.url}
                    className="block group"
                  >
                    <div className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <div className="text-caption text-blue-600 dark:text-blue-400 font-medium mb-1">
                        {relatedArticle.category}
                      </div>
                      <h4 className="text-body-md font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {relatedArticle.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
