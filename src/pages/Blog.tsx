import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "../components/SEO/Head";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
  Search,
  Clock,
  Eye,
  Filter,
  TrendingUp,
  BookOpen,
  Sparkles,
} from "lucide-react";
import BlogAPI from "../lib/blog-api";
import { BlogPost, BlogCategory } from "../lib/database";
import "../styles/blog-mobile-enhanced.css";

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [initAttempts, setInitAttempts] = useState(0);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          <Head title="Блог - Загрузка" />
          <Header />
          <div className="flex items-center justify-center py-24">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">
                Загрузка статей...
              </p>
            </div>
          </div>
          <Footer />
        </div>
      </HelmetProvider>
    );
  }

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Head
          title="Блог notetaker.ru - Статьи о продуктивности встреч и ИИ"
          description="Читайте наш блог о технологиях ИИ, эффективности встреч, управлении задачами и новостях продукта notetaker.ru. Полезные советы и инсайты для профессионалов."
          keywords={[
            "блог notetaker.ru",
            "статьи об ИИ",
            "продуктивность встреч",
            "управление задачами",
            "новости продукта",
            "советы по встречам",
            "истории клиентов",
          ]}
          url="https://notetaker.ru/blog"
        />

        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 blog-mobile-container">
          {/* Mobile Header */}
          <div className="lg:hidden mb-6">
            <div className="blog-mobile-header blog-mobile-fade-in">
              <h1>📚 Блог notetaker.ru</h1>
              <p>Советы по встречам, ИИ-технологии и новости продукта</p>
            </div>

            {/* Mobile Search */}
            <div className="blog-mobile-search blog-mobile-slide-up">
              <Search className="w-4 h-4" />
              <Input
                type="text"
                placeholder="Поиск статей..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Mobile Categories - Horizontal Scroll */}
            <div className="blog-mobile-categories blog-mobile-slide-up">
              <div className="blog-mobile-categories-scroll">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`blog-mobile-category-pill ${
                    activeCategory === "all" ? "active" : ""
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  Все статьи
                  {activeCategory === "all" && (
                    <span className="blog-mobile-category-count">
                      {filteredPosts.length}
                    </span>
                  )}
                </button>

                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`blog-mobile-category-pill ${
                      activeCategory === category.id ? "active" : ""
                    }`}
                  >
                    {category.name}
                    <span className="blog-mobile-category-count">
                      {category.postCount}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-8">
                {/* Header */}
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    📚 Блог notetaker.ru
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Советы по эффективным встречам, ИИ-технологии и новости
                    продукта
                  </p>
                </div>

                {/* Search */}
                <div className="relative mb-8">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Поиск статей..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 py-3 rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm"
                  />
                </div>

                {/* Categories */}
                <div className="sticky top-20 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Категории
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setActiveCategory("all")}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        activeCategory === "all"
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Все статьи
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          activeCategory === "all"
                            ? "bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {posts.length}
                      </span>
                    </button>

                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          activeCategory === category.id
                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700"
                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                      >
                        <span>{category.name}</span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            activeCategory === category.id
                              ? "bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          {category.postCount}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 mt-6 border border-blue-200 dark:border-blue-700">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Статистика
                    </h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Всего статей:
                      </span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {posts.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Рекомендуемых:
                      </span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {featuredPosts.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Категорий:
                      </span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {categories.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Hero Section */}
              {filteredPosts.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 lg:mb-12">
                  {/* Large Hero Card */}
                  <div className="lg:col-span-2">
                    <Link
                      to={`/blog/${filteredPosts[0].slug}`}
                      className="group block h-full"
                    >
                      <Card className="h-full overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white border-0 hover:scale-[1.02] transition-transform duration-300 shadow-xl">
                        <div className="p-6 lg:p-8 h-full flex flex-col justify-between relative min-h-[280px] lg:min-h-[320px]">
                          <div className="absolute top-4 right-4 lg:top-6 lg:right-6">
                            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/10 rounded-full flex items-center justify-center">
                              <Sparkles className="w-5 h-5 lg:w-6 lg:h-6" />
                            </div>
                          </div>

                          <div>
                            <div className="mb-3 lg:mb-4">
                              <span className="inline-flex items-center gap-1 bg-white/20 text-white px-3 py-1 rounded-full text-xs font-medium">
                                <TrendingUp className="w-3 h-3" />
                                Рекомендуемое
                              </span>
                            </div>
                            <h2 className="text-xl lg:text-3xl font-bold mb-3 lg:mb-4 leading-tight">
                              {filteredPosts[0].title}
                            </h2>
                            <p className="text-blue-100 opacity-90 text-sm lg:text-lg leading-relaxed">
                              {filteredPosts[0].excerpt}
                            </p>
                          </div>

                          <div className="flex items-center gap-4 text-blue-100 text-xs lg:text-sm mt-4">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 lg:w-4 lg:h-4" />
                              <span>{filteredPosts[0].readTime} мин</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3 lg:w-4 lg:h-4" />
                              <span>{filteredPosts[0].views}</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </div>

                  {/* Featured Article Card */}
                  {filteredPosts[1] && (
                    <div>
                      <Link
                        to={`/blog/${filteredPosts[1].slug}`}
                        className="group block h-full"
                      >
                        <Card className="h-full overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                          <div className="p-4 lg:p-6 h-full flex flex-col min-h-[280px] lg:min-h-[320px]">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-full">
                                Новое
                              </span>
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-3 text-lg lg:text-xl leading-tight">
                              {filteredPosts[1].title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm lg:text-base mb-4 flex-1 line-clamp-3 leading-relaxed">
                              {filteredPosts[1].excerpt}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{filteredPosts[1].readTime} мин</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                <span>{filteredPosts[1].views}</span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Articles Grid */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                    {activeCategory === "all"
                      ? "Все статьи"
                      : categories.find((c) => c.id === activeCategory)?.name}
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {filteredPosts.length}{" "}
                    {filteredPosts.length === 1
                      ? "статья"
                      : filteredPosts.length < 5
                        ? "статьи"
                        : "статей"}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                  {filteredPosts
                    .slice(featuredPosts.length > 0 ? 2 : 0)
                    .map((post) => {
                      const category = categories.find(
                        (cat) => cat.id === post.category,
                      );
                      return (
                        <Link
                          key={post.id}
                          to={`/blog/${post.slug}`}
                          className="group block"
                        >
                          <Card className="h-full overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 bg-white dark:bg-gray-800">
                            {/* Article Image */}
                            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 relative overflow-hidden">
                              {post.heroImage ? (
                                <img
                                  src={post.heroImage}
                                  alt={post.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <BookOpen className="w-8 h-8 text-gray-400" />
                                </div>
                              )}
                              {post.featured && (
                                <div className="absolute top-3 left-3">
                                  <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                    <Sparkles className="w-3 h-3" />
                                    Топ
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className="p-4 lg:p-6">
                              {/* Category */}
                              {category && (
                                <div className="flex items-center gap-2 mb-3">
                                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                                    {category.name}
                                  </span>
                                </div>
                              )}

                              {/* Title */}
                              <h3 className="font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
                                {post.title}
                              </h3>

                              {/* Excerpt */}
                              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4 leading-relaxed">
                                {post.excerpt}
                              </p>

                              {/* Meta */}
                              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    <span>{post.readTime} мин</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Eye className="w-3 h-3" />
                                    <span>{post.views}</span>
                                  </div>
                                </div>
                                <div className="text-xs">
                                  {new Date(
                                    post.publishedAt,
                                  ).toLocaleDateString("ru-RU", {
                                    day: "numeric",
                                    month: "short",
                                  })}
                                </div>
                              </div>
                            </div>
                          </Card>
                        </Link>
                      );
                    })}
                </div>
              </div>

              {/* No Results */}
              {filteredPosts.length === 0 && posts.length === 0 && !loading && (
                <div className="text-center py-16 lg:py-24">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Статьи пока не загружены
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    База данных инициализируется. Попробуйте обновить страницу
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => window.location.reload()}
                      className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                    >
                      Обновить страницу
                    </button>
                    <Link
                      to="/test/blog"
                      className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors font-medium"
                    >
                      Диагностика
                    </Link>
                  </div>
                </div>
              )}

              {filteredPosts.length === 0 && posts.length > 0 && (
                <div className="text-center py-16 lg:py-24">
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

              {/* Show More Button */}
              {filteredPosts.length > 9 && (
                <div className="text-center mt-12">
                  <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-lg hover:shadow-xl transform hover:scale-105">
                    Показать больше статей
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>

        <Footer />

        <style>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    </HelmetProvider>
  );
}
