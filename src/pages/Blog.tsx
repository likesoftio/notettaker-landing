import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Search } from "lucide-react";

const categories = [
  { name: "Последние статьи", count: 12, active: true },
  { name: "Технологии и ИИ", count: 8 },
  { name: "Управление задачами", count: 5 },
  { name: "Новости продукта", count: 3 },
  { name: "Советы по встречам", count: 7 },
  { name: "Истории клиентов", count: 4 },
  { name: "Искусство продаж", count: 6 },
];

const blogPosts = [
  {
    id: 1,
    slug: "9-chrome-extensions",
    title: "9 лучших расширений Chrome для преобразования речи в текст",
    category: "Технологии и ИИ",
    description:
      "Обзор самых эффективных браузерных расширений для транскрипции аудио в реальном времени",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop",
    featured: true,
    color: "bg-blue-600",
  },
  {
    id: 2,
    slug: "video-transcription-guide",
    title: "Как извлечь максимум из видео: транскрибация, перевод, конспекты",
    category: "Технологии и ИИ",
    description:
      "Полное руководство по работе с видеоконтентом и его трансформации в полезные материалы",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=500&h=300&fit=crop",
    featured: true,
    color: "bg-gray-600",
  },
  {
    id: 3,
    slug: "video-translation-methods",
    title: "Как перевести видео: 7 лучших способов для разных языков",
    category: "Технологии и ИИ",
    description:
      "Подробный гид по методам перевода видеоконтента с примерами инструментов и техник",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=500&h=300&fit=crop",
    color: "bg-green-600",
  },
  {
    id: 4,
    slug: "meeting-productivity-tips",
    title: "10 советов для более продуктивных встреч",
    category: "Советы по встречам",
    description:
      "Практические рекомендации по организации и проведению эффективных совещаний",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500&h=300&fit=crop",
    color: "bg-purple-600",
  },
  {
    id: 5,
    slug: "ai-meeting-analysis",
    title: "Как ИИ анализирует ваши встречи и улучшает результаты",
    category: "Технологии и ИИ",
    description:
      "Разбираем возможности искусственного интеллекта в анализе деловых переговоров",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop",
    color: "bg-indigo-600",
  },
  {
    id: 6,
    slug: "customer-success-story",
    title: "История успеха: как компания увеличила продажи на 40%",
    category: "Истории клиентов",
    description:
      "Реальный кейс использования mymeet.ai для анализа и улучшения процессов продаж",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
    color: "bg-orange-600",
  },
];

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Последние статьи");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "Последние статьи" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page-container">
      <Header />

      <main className="page-main">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">Блог Notetaker</h1>
          <p className="page-subtitle">
            Новости, советы и истории о том, как сделать встречи более
            эффективными
          </p>
        </div>

        {/* Search and filters */}
        <div className="grid-responsive-2 mb-12">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Поиск статей..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-base pl-12"
            />
          </div>

          {/* Categories sidebar */}
          <div className="lg:order-last">
            <h3 className="text-heading-md text-gray-900 dark:text-white mb-6">
              Категории
            </h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                    activeCategory === category.name
                      ? "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 font-medium"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <span className="text-body-md">{category.name}</span>
                  <span className="text-caption bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-1">
            {/* Featured posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {filteredPosts
                .filter((post) => post.featured)
                .map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="group"
                  >
                    <Card className="card-base card-hover h-full overflow-hidden">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-blue-600 text-white text-caption rounded-full font-medium">
                            Рекомендуем
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="text-caption text-blue-600 dark:text-blue-400 font-medium mb-2">
                          {post.category}
                        </div>
                        <h3 className="text-heading-md text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-body-md text-gray-600 dark:text-gray-300">
                          {post.description}
                        </p>
                      </div>
                    </Card>
                  </Link>
                ))}
            </div>

            {/* All posts */}
            <div>
              <h2 className="text-heading-xl text-gray-900 dark:text-white mb-8">
                {activeCategory === "Последние статьи"
                  ? "Все статьи"
                  : activeCategory}
              </h2>

              <div className="grid-responsive-3">
                {filteredPosts
                  .filter((post) => !post.featured)
                  .map((post) => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.slug}`}
                      className="group"
                    >
                      <Card className="card-base card-hover h-full overflow-hidden">
                        <div className="relative h-40 overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-6">
                          <div className="text-caption text-blue-600 dark:text-blue-400 font-medium mb-2">
                            {post.category}
                          </div>
                          <h3 className="text-heading-md text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-body-md text-gray-600 dark:text-gray-300">
                            {post.description}
                          </p>
                        </div>
                      </Card>
                    </Link>
                  ))}
              </div>
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-body-lg text-gray-500 dark:text-gray-400">
                  Статьи не найдены. Попробуйте изменить поисковый запрос или
                  выбрать другую категорию.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
