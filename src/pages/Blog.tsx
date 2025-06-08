import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "../components/SEO/Head";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Search, Clock, Eye } from "lucide-react";
import BlogAPI from "../lib/blog-api";
import { BlogPost, BlogCategory } from "../lib/database";
import {
  DisplayLG,
  BodyLG,
  HeadingXL,
  HeadingMD,
  BodyMD,
  Caption,
} from "../components/Typography";

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [initAttempts, setInitAttempts] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);

    try {
      console.log("📚 Loading blog data...");

      // Get data using BlogAPI
      const [postsData, categoriesData] = await Promise.all([
        BlogAPI.getPublishedPosts(),
        BlogAPI.getCategoriesWithPosts(),
      ]);

      console.log(
        `✅ Loaded ${postsData.length} posts and ${categoriesData.length} categories`,
      );

      setPosts(postsData);
      setCategories(categoriesData);

      // If no posts and this is first attempt, try to reinitialize ONCE
      if (postsData.length === 0 && initAttempts === 0) {
        console.log("❌ No posts found, attempting ONE reinitialization...");
        setInitAttempts(1);

        // Clear and try to reinitialize
        localStorage.removeItem("blog_posts");
        localStorage.removeItem("blog_categories");
        localStorage.removeItem("blog_authors");

        // Wait and try again
        setTimeout(async () => {
          try {
            const freshPosts = await BlogAPI.getPublishedPosts();
            const freshCategories = await BlogAPI.getCategoriesWithPosts();

            console.log(`🔄 Retry loaded ${freshPosts.length} posts`);
            setPosts(freshPosts);
            setCategories(freshCategories);
            setLoading(false);
          } catch (retryError) {
            console.error("❌ Retry failed:", retryError);
            setLoading(false);
          }
        }, 1000);

        return; // Don't set loading to false yet
      }
    } catch (error) {
      console.error("❌ Failed to load blog data:", error);
    }

    setLoading(false);
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    const matchesCategory =
      activeCategory === "all" || post.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);
  const latestPosts = filteredPosts.slice(0, 6);

  if (loading) {
    return (
      <HelmetProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
          <Head title="Блог - Загрузка" />
          <Header />
          <div className="flex items-center justify-center py-24">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <BodyLG>Загрузка статей...</BodyLG>
            </div>
          </div>
          <Footer />
        </div>
      </HelmetProvider>
    );
  }

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <Head
          title="Блог mymeet.ai - Статьи о продуктивности встреч и ИИ"
          description="Читайте наш блог о технологиях ИИ, эффективности встреч, управлении задачами и новостях продукта mymeet.ai. Полезные советы и инсайты для профессионалов."
          keywords={[
            "блог mymeet.ai",
            "статьи об ИИ",
            "продуктивность встреч",
            "уп��авление задачами",
            "новости продукта",
            "советы по встречам",
            "истории клиентов",
          ]}
          url="https://mymeet.ai/blog"
        />

        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Left Sidebar */}
            <aside className="w-80 flex-shrink-0">
              <div className="sticky top-8">
                {/* Header */}
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Статьи и обновления
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Советы по эффективным встречам, ИИ-технологии и новости
                    продукта
                  </p>
                </div>

                {/* Search */}
                <div className="relative mb-8">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="П��иск"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-50 dark:bg-gray-800 border-0 focus:bg-white dark:focus:bg-gray-700 transition-colors"
                  />
                </div>

                {/* Categories */}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Последние статьи
                  </h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => setActiveCategory("all")}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeCategory === "all"
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                    >
                      Все статьи
                    </button>

                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          activeCategory === category.id
                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium"
                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Hero Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                {/* Large Hero Card */}
                <div className="lg:col-span-2">
                  <Link
                    to="/blog/9-chrome-extensions"
                    className="group block h-full"
                  >
                    <Card className="h-full overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white border-0 hover:scale-[1.02] transition-transform duration-300">
                      <div className="p-8 h-full flex flex-col justify-center relative">
                        <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2L2 7v10c0 5.55 3.84 9.739 9 9.949 5.16-.21 9-4.399 9-9.949V7l-10-5z" />
                          </svg>
                        </div>
                        <h2 className="text-3xl font-bold mb-4">
                          Начало работы
                          <br />в mymeet.ai
                        </h2>
                        <p className="text-blue-100 text-lg opacity-90">
                          Полное руководство по использованию ИИ для анализа
                          встреч
                        </p>
                      </div>
                    </Card>
                  </Link>
                </div>

                {/* Right Article Card */}
                <div>
                  {featuredPosts.slice(0, 1).map((post) => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.slug}`}
                      className="group block h-full"
                    >
                      <Card className="h-full overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                        <div className="p-6 h-full flex flex-col">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-full">
                              Первые шаги
                            </span>
                          </div>
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                            Как начать работу с mymeet.ai: руководство для
                            новичков
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-1">
                            Пошаговое руководство по mymeet.ai. Узнайте, как
                            записывать встречи, создавать транскрипты,
                            использовать AI Отчеты и чат для эффективной работы
                            с информацией из онлайн-встреч.
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{post.readTime} мин</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              <span>{post.views}</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Featured Articles Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {latestPosts.slice(0, 3).map((post) => {
                  const category = categories.find(
                    (cat) => cat.id === post.category,
                  );
                  return (
                    <Link
                      key={post.id}
                      to={`/blog/${post.slug}`}
                      className="group block"
                    >
                      <Card className="h-full overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300">
                        <div className="relative">
                          <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                            <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                              <svg
                                className="w-5 h-5 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2L2 7v10c0 5.55 3.84 9.739 9 9.949 5.16-.21 9-4.399 9-9.949V7l-10-5z" />
                              </svg>
                            </div>
                            <h4 className="text-white text-lg font-medium px-4 text-center">
                              {post.title.length > 50
                                ? post.title.substring(0, 50) + "..."
                                : post.title}
                            </h4>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                              {category?.name}
                            </span>
                          </div>
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{post.readTime} мин</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              <span>{post.views}</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>

              {/* Latest Articles Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                  Последние статьи
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {latestPosts.slice(3, 6).map((post) => {
                    const category = categories.find(
                      (cat) => cat.id === post.category,
                    );
                    const gradientClasses = [
                      "from-blue-500 to-blue-600",
                      "from-gray-600 to-gray-700",
                      "from-indigo-500 to-indigo-600",
                    ];
                    const gradientClass =
                      gradientClasses[
                        latestPosts.indexOf(post) % gradientClasses.length
                      ];

                    return (
                      <Link
                        key={post.id}
                        to={`/blog/${post.slug}`}
                        className="group block"
                      >
                        <Card className="h-full overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300">
                          <div className="relative">
                            <div
                              className={`h-48 bg-gradient-to-br ${gradientClass} flex items-center justify-center p-6`}
                            >
                              <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                <svg
                                  className="w-5 h-5 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 2L2 7v10c0 5.55 3.84 9.739 9 9.949 5.16-.21 9-4.399 9-9.949V7l-10-5z" />
                                </svg>
                              </div>
                              <h4 className="text-white text-lg font-medium text-center">
                                {post.title.length > 40
                                  ? post.title.substring(0, 40) + "..."
                                  : post.title}
                              </h4>
                            </div>
                          </div>
                          <div className="p-6">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                                {category?.name}
                              </span>
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{post.readTime} мин</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                <span>{post.views}</span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Show More Button */}
              {filteredPosts.length > 6 && (
                <div className="text-center mt-12">
                  <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                    Показать больше статей
                  </button>
                </div>
              )}

              {/* No Results */}
              {filteredPosts.length === 0 && posts.length === 0 && !loading && (
                <div className="text-center py-24">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Статьи пока не загружены
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    База данных инициализируется. Попробуйте обновить страницу
                    или перейдите на /test/blog для диагностики.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => window.location.reload()}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Обновить страницу
                    </button>
                    <a
                      href="/test/blog"
                      className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                      Диагностика
                    </a>
                  </div>
                </div>
              )}

              {filteredPosts.length === 0 && posts.length > 0 && (
                <div className="text-center py-24">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Статьи не найдены
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Попробуйте изменить поисковый запрос или выбрать другую
                    категорию
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </HelmetProvider>
  );
}
