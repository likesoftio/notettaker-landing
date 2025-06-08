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
        id: "specialized-extensions",
        title: "Расширения для специализированных задач",
        level: 1,
      },
      {
        id: "effectiveness-tips",
        title:
          "Советы по эффективному использованию расширений для преобразования речи в текст",
        level: 1,
      },
      {
        id: "limitations",
        title: "Ограничения и подводные камни",
        level: 1,
      },
      {
        id: "future-technologies",
        title: "Будущее технологии преобразования речи в текст в браузерах",
        level: 1,
      },
      {
        id: "conclusion",
        title: "Заключение",
        level: 1,
      },
      {
        id: "faq",
        title: "Часто задаваемые вопросы",
        level: 1,
      },
    ],
    content: `
      <p>Говорить в 3-4 раза быстрее, чем печатать — доказанный факт. При этом набирать текст руками многим проще, чем пользоваться устройством для диктовки, потому что мало кто умеет быстро и четко говорить не клавиатуру. Неудивительно, что расширения для браузеров, преобразующие речь в текст, переживают настоящий бум популярности.</p>

      <p>Chrome как самый популярный браузер предлагает десятки таких решений. Мы протестировали более 30 расширений и выбрали 10 лучших, которые действительно работают в 2025 году. От диктовки электронных писем до транскрипции важных встреч — у нас есть решение для любой задачи.</p>

      <h2 id="use-cases">Основные сценарии использования расширений для преобразования речи в текст</h2>

      <p>Прежде чем рассматривать конкретные расширения, важно понять, какие задачи они решают:</p>

      <ul>
        <li><strong>Быстрая диктовка</strong> — электронные письма, сообщения, заметки</li>
        <li><strong>Транскрипция видеоконференций</strong> — Zoom, Google Meet, Microsoft Teams</li>
        <li><strong>Многоязычный ввод</strong> — общение на иностранных языках</li>
        <li><strong>Создание контента</strong> — статьи, записи в блог, учебные материалы</li>
        <li><strong>Доступность</strong> — помощь людям с ограниченными возможностями</li>
      </ul>

      <p>В зависимости от ваших потребностей, одни расширения подойдут лучше других. Давайте рассмотрим лучшие варианты для каждого сценария.</p>

      <h2 id="mymeet-ai">mymeet.ai — лидер в транскрипции и распознавании речи</h2>

      <p>Наше расширение mymeet.ai предлагает наиболее точную и быструю транскрипцию для встреч и видеоконференций. Основные преимущества:</p>

      <ul>
        <li>Поддержка 19 языков с высокой точностью</li>
        <li>Автоматическое определение спикеров</li>
        <li>ИИ-анализ и создание кратких резюме</li>
        <li>Интеграция с популярными платформами для встреч</li>
        <li>Экспорт в различные форматы</li>
      </ul>

      <h2 id="top-extensions">ТОП лучших расширений Chrome для преобразования речи в текст в 2025 году</h2>

      <p>Мы протестирова��и десятки расширений и составили рейтинг лучших решений:</p>

      <ol>
        <li><strong>mymeet.ai</strong> — лучшее для встреч и видеоконференций</li>
        <li><strong>Voice In</strong> — универсальный диктант для веб-форм</li>
        <li><strong>SpeechTexter</strong> — простое решение для коротких заметок</li>
        <li><strong>LipSurf</strong> — голосовое управление браузером</li>
        <li><strong>Dictanote</strong> — заметки с голосовым вводом</li>
        <li><strong>Speeko</strong> — анализ речи и улучшение навыков</li>
        <li><strong>Otter.ai</strong> — транскрипция встреч</li>
        <li><strong>Read&Write</strong> — инструменты для людей с дислексией</li>
        <li><strong>Dragon Anywhere</strong> — профессиональная диктовка</li>
      </ol>

      <p>Каждое из этих расширений имеет свои сильные стороны и лучше всего подходит для определенных задач.</p>

      <h2 id="conclusion">Заключение</h2>

      <p>Расширения Chrome для преобразования речи в текст значительно ускоряют работу и делают интернет более доступным. Выбор конкретного решения зависит от ваших потребностей:</p>

      <ul>
        <li>Для встреч и видеоконференций — mymeet.ai</li>
        <li>Для универсальной диктовки — Voice In</li>
        <li>Для быстрых заметок — SpeechTexter</li>
        <li>Для голосового управления — LipSurf</li>
      </ul>

      <p>Попробуйте несколько вариантов и выберите тот, который лучше всего соответствует вашему рабочему процессу.</p>
    `,
  },
};

const relatedArticles = [
  {
    id: "video-transcription-guide",
    title: "Как извлечь максимум из видео: транскрибация, перевод, конспекты",
    category: "Технологии и ИИ",
    readTime: "6 мин",
  },
  {
    id: "meeting-notes-ai",
    title: "ИИ для заметок встреч: революция в корпоративном общении",
    category: "Управление задачами",
    readTime: "5 мин",
  },
  {
    id: "productivity-tips",
    title: "10 советов для повышения продуктивности удаленных встреч",
    category: "Советы по встречам",
    readTime: "7 мин",
  },
];

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const [activeSection, setActiveSection] = useState("");

  const article = articleData[slug as keyof typeof articleData];

  useEffect(() => {
    if (!article) return;

    const handleScroll = () => {
      const sections = article.tableOfContents
        .map((item) => document.getElementById(item.id))
        .filter(Boolean);

      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(article.tableOfContents[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Статья не найдена
            </h1>
            <Link to="/blog">
              <Button>Вернуться к блогу</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
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
                <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs sm:text-sm font-medium rounded-full mb-2">
                  {article.category}
                </span>
              </div>
            </div>

            {/* Article Header */}
            <header className="mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-600 dark:text-gray-400">
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

              {/* Social Share */}
              <div className="flex items-center gap-3 mt-6">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Поделиться:
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="p-2">
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="p-2">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="p-2">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </header>

            {/* Article Content */}
            <div
              className="prose prose-gray dark:prose-invert max-w-none prose-lg prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:mb-4 prose-ul:mb-4 prose-ol:mb-4 prose-li:mb-2"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* AI Assistant Widget */}
            <Card className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    ИИ-помощник mymeet.ai
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Есть вопросы по статье? Спросите нашего ИИ-помощника о
                    транскрипции, встречах или любых других темах из статьи.
                  </p>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Задать вопрос ИИ
                  </Button>
                </div>
              </div>
            </Card>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* Table of Contents - Sticky */}
            <div className="sticky top-24">
              <Card className="p-4 sm:p-6 mb-6 bg-white dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Содержание
                </h3>
                <nav className="space-y-2">
                  {article.tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block text-sm py-1 px-2 rounded transition-colors ${
                        activeSection === item.id
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
                          : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </Card>

              {/* Related Articles */}
              <Card className="p-4 sm:p-6 bg-white dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Похожие статьи
                </h3>
                <div className="space-y-4">
                  {relatedArticles.map((relatedArticle) => (
                    <Link
                      key={relatedArticle.id}
                      to={`/blog/${relatedArticle.id}`}
                      className="block group"
                    >
                      <div className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1 line-clamp-2">
                          {relatedArticle.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <span>{relatedArticle.category}</span>
                          <span>•</span>
                          <span>{relatedArticle.readTime}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
