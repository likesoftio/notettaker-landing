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
      "Подробный обзор методов перевода видеоконтента с субтитрами и озвучкой",
    image:
      "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?w=500&h=300&fit=crop",
    featured: false,
  },
  {
    id: 4,
    slug: "meeting-notes-ai",
    title: "ИИ для заметок встреч: революция в корпоративном общении",
    category: "Управление задачами",
    description:
      "Как искусственный интеллект меняет подход к ведению протоколов встреч",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=500&h=300&fit=crop",
    featured: false,
  },
  {
    id: 5,
    slug: "productivity-tips",
    title: "10 советов для повышения продуктивности удаленных встреч",
    category: "Советы по встречам",
    description:
      "Практические рекомендации для эффективного проведения онлайн-совещаний",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop",
    featured: false,
  },
  {
    id: 6,
    slug: "client-success-story",
    title: "Как Компания X увеличила продажи на 40% с помощью транскрипции",
    category: "Истории клиентов",
    description:
      "Реальная история успеха клиента и его результаты от использования ИИ-транскрипции",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=500&h=300&fit=crop",
    featured: false,
  },
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("Последние статьи");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "Последние статьи" ||
      post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
          {/* Sidebar */}
          <aside className="xl:w-72 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Поиск статей..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Категории
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full flex items-center justify-between p-2 sm:p-3 rounded-lg text-left transition-colors ${
                      selectedCategory === category.name
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <span className="text-sm">{category.name}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        selectedCategory === category.name
                          ? "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Блог
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                Последние новости, советы и истории о транскрипции и ИИ
              </p>
            </div>

            {/* Featured Articles */}
            {featuredPosts.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Рекомендуемые статьи
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {featuredPosts.map((post) => (
                    <Link key={post.id} to={`/blog/${post.slug}`}>
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                        <div className="relative">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-40 sm:h-48 object-cover"
                          />
                          <div
                            className={`absolute top-3 sm:top-4 left-3 sm:left-4 px-2 sm:px-3 py-1 rounded-full text-xs font-medium text-white ${post.color}`}
                          >
                            {post.category}
                          </div>
                        </div>
                        <div className="p-4 sm:p-6">
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                            {post.description}
                          </p>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Regular Articles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
              {regularPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-32 sm:h-40 object-cover"
                    />
                    <div className="p-3 sm:p-4">
                      <div className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-2">
                        {post.category}
                      </div>
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm line-clamp-3">
                        {post.description}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
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
