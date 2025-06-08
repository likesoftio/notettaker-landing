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

      <p>Прежде чем перейти к расширениям Chrome, стоит упомянуть о mymeet.ai — одном из ведущих решений для преобразования речи в текст с феноменальной точностью распознавания русского языка — 95%.</p>

      <div class="article-image">
        <img src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&h=400&fit=crop" alt="mymeet.ai интерфейс" />
        <p class="image-caption">Сервис предлагает AI-ассистента для транскрипции встреч, с интеллектуальной обработкой записанного аудио, автоматическим определением спикеров и созданием структурированных отчетов.</p>
      </div>

      <div class="article-image">
        <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=400&fit=crop" alt="Пример транскрипции" />
        <p class="image-caption">Пример автоматической транскрипции встречи с выделением ключевых моментов и структурированием по темам.</p>
      </div>

      <h2 id="top-extensions">ТОП лучших расширений Chrome для преобразования речи в текст в 2025 году</h2>

      <p>После тщательного тестирования мы составили рейтинг лучших расширений Chrome для речевого ввода:</p>

      <h3>1. Voice In Voice Typing</h3>
      <p>Самое популярное и функциональное расширение с поддержкой более 120 языков и голосовых команд.</p>

      <h3>2. Speechnotes</h3>
      <p>Простое и надежное решение для быстрой диктовки с автоматической пунктуацией.</p>

      <h3>3. VoiceNote II</h3>
      <p>Продвинутое расширение с возможностью сохранения заметок и синхронизации между устройствами.</p>

      <h2 id="comparison-table">Сравнительная таблица расширений по ключевым параметрам</h2>

      <p>Мы сравнили основные характеристики лучших расширений по важнейшим критериям:</p>

      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>Расширение</th>
              <th>Точность</th>
              <th>Языки</th>
              <th>Цена</th>
              <th>Особенности</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Voice In</td>
              <td>95%</td>
              <td>120+</td>
              <td>Freemium</td>
              <td>Голосовые команды</td>
            </tr>
            <tr>
              <td>Speechnotes</td>
              <td>92%</td>
              <td>60+</td>
              <td>Бесплатно</td>
              <td>Автопунктуация</td>
            </tr>
            <tr>
              <td>VoiceNote II</td>
              <td>90%</td>
              <td>40+</td>
              <td>$5/мес</td>
              <td>Синхронизация</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="specialized-extensions">Расширения для специализированных задач</h2>

      <p>Некоторые расширения созданы для решения конкретных задач:</p>

      <h3>Для студентов и исследователей</h3>
      <p>Расширения с возможностью создания конспектов лекций и автоматического форматирования научных текстов.</p>

      <h3>Для бизнеса</h3>
      <p>Решения для транскрипции деловых встреч с интеграцией в корпоративные системы.</p>

      <h2 id="effectiveness-tips">Советы по эффективному использованию расширений для преобразования речи в текст</h2>

      <p>Чтобы получить максимальную отдачу от расширений, следуйте этим рекомендациям:</p>

      <ol>
        <li>Говорите четко и с нормальной скоростью</li>
        <li>Используйте качественный микрофон</li>
        <li>Проговаривайте знаки препинания</li>
        <li>Регулярно обновляйте расширения</li>
        <li>Настройте горячие клавиши для быстрого доступа</li>
      </ol>

      <h2 id="limitations">Ограничения и подводные камни</h2>

      <p>Несмотря на прогресс в области ИИ, расширения для преобразования речи в текст имеют свои ограничения:</p>

      <ul>
        <li>Зависимость от качества интернет-соединения</li>
        <li>Сложности с техническими терминами</li>
        <li>Необходимость постобработки текста</li>
        <li>Проблемы с акцентами и диалектами</li>
      </ul>

      <h2 id="future-technologies">Будущее технологии преобразования речи в текст в браузерах</h2>

      <p>Технология продолжает развиваться. В ближайшем будущем мы увидим:</p>

      <ul>
        <li>Еще более высокую точность распознавания</li>
        <li>Поддержку редких языков и диалектов</li>
        <li>Интеграцию с ИИ-помощниками</li>
        <li>Обработку речи в реальном времени без задержек</li>
      </ul>

      <h2 id="conclusion">Заключение</h2>

      <p>Расширения Chrome для преобразования речи в текст значительно упрощают работу с текстовым контентом. Выбор конкретного решения зависит от ваших потребностей: для простой диктовки подойдет Speechnotes, для профессиональной работы — Voice In, а для корпоративных задач стоит рассмотреть специализированн��е решения.</p>

      <h2 id="faq">Часто задаваемые вопросы</h2>

      <h3>Какое расширение лучше всего работает с русским языком?</h3>
      <p>Voice In показывает лучшие результаты для русского языка с точностью до 95%.</p>

      <h3>Можно ли использовать расширения офлайн?</h3>
      <p>Большинство расширений требуют интернет-соединения, так как используют облачные сервисы для обработки речи.</p>

      <h3>Безопасно ли использовать расширения для конфиденциальной информации?</h3>
      <p>Рекомендуется внимательно изучать политику конфиденциальности каждого расширения перед использованием с чувствительными данными.</p>
    `,
  },
};

export default function BlogArticle() {
  const { slug } = useParams();
  const [activeSection, setActiveSection] = useState("");

  // Get article data (in real app would fetch from API)
  const article = articleData[slug as keyof typeof articleData];

  if (!article) {
    return <div>Статья не найдена</div>;
  }

  // Handle scroll to update active section in TOC
  useEffect(() => {
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
  }, [article.tableOfContents]);

  const handleTOCClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Table of Contents Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">СОДЕРЖАНИЕ</h3>
                <nav className="space-y-2">
                  {article.tableOfContents.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleTOCClick(item.id)}
                      className={`block w-full text-left text-sm py-2 px-3 rounded-md transition-colors ${
                        activeSection === item.id
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      {item.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Article Header */}
            <div className="mb-8">
              <div className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
                {article.category}
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {article.title}
              </h1>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {article.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {article.author}
                    </p>
                    <p className="text-sm text-gray-500">{article.date}</p>
                  </div>
                </div>
              </div>

              {/* Social Share */}
              <div className="flex items-center space-x-3 pb-6 border-b">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Поделиться
                </Button>
                <Button variant="outline" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Комментарии
                </Button>
                <Button variant="outline" size="sm">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Linkedin className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="mb-8">
              <div className="relative bg-blue-600 rounded-2xl overflow-hidden h-64 lg:h-80">
                <img
                  src={article.heroImage}
                  alt={article.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-2xl lg:text-3xl font-bold text-white">
                    Speech-to-Text расширения
                  </h2>
                </div>
                <div className="absolute top-6 right-6">
                  <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <img
                      src="https://framerusercontent.com/images/Mcs1qDPkdgWKjbdQ985Mr4CXq7U.png"
                      alt="N"
                      className="w-8 h-4 object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{
                __html: article.content.replace(/\n\s*/g, "").trim(),
              }}
            />
          </div>

          {/* Right Sidebar - AI Assistant Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-xl mx-auto flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      ИИ-ассистент для встреч
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      180 минут бесплатно
                    </p>
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Попробовать →
                  </Button>
                </div>

                {/* Mock interface preview */}
                <div className="mt-6 bg-white rounded-lg p-3 border">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <div className="text-xs text-gray-600">Интервью</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div className="text-xs text-gray-600">Совещания</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <div className="text-xs text-gray-600">Вебинары</div>
                    </div>
                    <div className="text-xs text-gray-500 mt-3">
                      🎯 95% точность
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .prose h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: rgb(17, 24, 39);
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }

        .prose h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: rgb(17, 24, 39);
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        .prose p {
          color: rgb(55, 65, 81);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .prose ul,
        .prose ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }

        .prose li {
          color: rgb(55, 65, 81);
          line-height: 1.7;
          margin-bottom: 0.5rem;
        }

        .prose strong {
          font-weight: 600;
          color: rgb(17, 24, 39);
        }

        .article-image {
          margin: 2rem 0;
        }

        .article-image img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: 1rem;
          margin-bottom: 1rem;
        }

        .image-caption {
          font-size: 0.875rem;
          color: rgb(107, 114, 128);
          text-align: center;
          font-style: italic;
        }

        .comparison-table {
          margin: 2rem 0;
          overflow-x: auto;
        }

        .comparison-table table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }

        .comparison-table th {
          background: rgb(249, 250, 251);
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          color: rgb(17, 24, 39);
          border-bottom: 1px solid rgb(229, 231, 235);
        }

        .comparison-table td {
          padding: 1rem;
          color: rgb(55, 65, 81);
          border-bottom: 1px solid rgb(229, 231, 235);
        }

        .comparison-table tr:last-child td {
          border-bottom: none;
        }
      `}</style>
    </div>
  );
}
