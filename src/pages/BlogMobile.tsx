import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "../components/SEO/Head";
import { Input } from "../components/ui/input";
import {
  Search,
  Clock,
  Eye,
  BookOpen,
  Sparkles,
  TrendingUp,
  Filter,
  RefreshCw,
} from "lucide-react";
import BlogAPI from "../lib/blog-api";
import { BlogPost, BlogCategory } from "../lib/database";
import "../styles/blog-mobile-enhanced.css";

export default function BlogMobile() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visiblePosts, setVisiblePosts] = useState(6);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("📱 Loading mobile blog data...");

      const [postsData, categoriesData] = await Promise.all([
        BlogAPI.getPublishedPosts(),
        BlogAPI.getCategoriesWithPosts(),
      ]);

      console.log(
        `✅ Mobile: Loaded ${postsData.length} posts and ${categoriesData.length} categories`,
      );

      setPosts(postsData);
      setCategories(categoriesData);

      if (postsData.length === 0) {
        setError("Статьи пока не загружены. Попробуйте обновить страницу.");
      }
    } catch (error) {
      console.error("❌ Failed to load mobile blog data:", error);
      setError(
        "Не удалось загрузить статьи. Проверьте подключение к интернету.",
      );
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

  const displayedPosts = filteredPosts.slice(0, visiblePosts);
  const hasMore = filteredPosts.length > visiblePosts;
  const featuredPost = filteredPosts.find((post) => post.featured);

  const handleLoadMore = () => {
    setVisiblePosts((prev) => prev + 6);
  };

  const handleRetry = () => {
    setVisiblePosts(6);
    loadData();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "short",
    });
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  if (loading) {
    return (
      <HelmetProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Head title="Блог - Загрузка" />
          <Header />
          <div className="blog-mobile-container">
            <div className="flex items-center justify-center py-24">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-300 font-medium">
                  Загрузка статей...
                </p>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </HelmetProvider>
    );
  }

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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

        <main className="blog-mobile-container">
          {/* Мобильный заголовок */}
          <div className="blog-mobile-header blog-mobile-fade-in">
            <h1>📚 Блог notetaker.ru</h1>
            <p>Советы по встречам, ИИ-технологии и новости продукта</p>
          </div>

          {/* Поиск */}
          <div className="blog-mobile-search blog-mobile-slide-up">
            <Search className="w-4 h-4" />
            <Input
              type="text"
              placeholder="Поиск статей..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Категории */}
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

          {/* Контент */}
          {error ? (
            <div className="blog-mobile-empty blog-mobile-fade-in">
              <div className="blog-mobile-empty-icon">
                <RefreshCw className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="blog-mobile-empty-title">Что-то пошло не так</h3>
              <p className="blog-mobile-empty-description">{error}</p>
              <button
                onClick={handleRetry}
                className="blog-mobile-empty-button"
              >
                Попробовать снова
              </button>
            </div>
          ) : filteredPosts.length === 0 && posts.length === 0 ? (
            <div className="blog-mobile-empty blog-mobile-fade-in">
              <div className="blog-mobile-empty-icon">
                <BookOpen className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="blog-mobile-empty-title">Статьи загружаются</h3>
              <p className="blog-mobile-empty-description">
                База данных инициализируется. Пожалуйста, подождите немного.
              </p>
              <button
                onClick={handleRetry}
                className="blog-mobile-empty-button"
              >
                Обновить
              </button>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="blog-mobile-empty blog-mobile-fade-in">
              <div className="blog-mobile-empty-icon">
                <Search className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="blog-mobile-empty-title">Статьи не найдены</h3>
              <p className="blog-mobile-empty-description">
                Попробуйте изменить поисковый запрос или выбрать другую
                категорию.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("all");
                }}
                className="blog-mobile-empty-button"
              >
                Сбросить фильтры
              </button>
            </div>
          ) : (
            <div className="blog-mobile-grid">
              {/* Рекомендуемая статья */}
              {featuredPost && (
                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="blog-mobile-hero-card blog-mobile-scale-in"
                >
                  <div className="blog-mobile-hero-badge">
                    <TrendingUp className="w-3 h-3" />
                    Рекомендуемое
                  </div>
                  <h2 className="blog-mobile-hero-title">
                    {featuredPost.title}
                  </h2>
                  <p className="blog-mobile-hero-excerpt">
                    {featuredPost.excerpt}
                  </p>
                  <div className="blog-mobile-hero-meta">
                    <div className="blog-mobile-hero-meta-item">
                      <Clock className="w-3 h-3" />
                      {featuredPost.readTime} мин
                    </div>
                    <div className="blog-mobile-hero-meta-item">
                      <Eye className="w-3 h-3" />
                      {formatViews(featuredPost.views)}
                    </div>
                  </div>
                </Link>
              )}

              {/* Обычные статьи */}
              {displayedPosts
                .filter((post) => !post.featured)
                .map((post, index) => {
                  const category = categories.find(
                    (cat) => cat.id === post.category,
                  );
                  return (
                    <Link
                      key={post.id}
                      to={`/blog/${post.slug}`}
                      className="blog-mobile-article-card blog-mobile-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="blog-mobile-article-image">
                        {post.heroImage ? (
                          <img src={post.heroImage} alt={post.title} />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="w-12 h-12 text-white opacity-60" />
                          </div>
                        )}
                        {post.featured && (
                          <div className="blog-mobile-article-badge featured">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Топ
                          </div>
                        )}
                        {post.publishedAt &&
                          new Date(post.publishedAt) >
                            new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                            <div className="blog-mobile-article-badge new">
                              Новое
                            </div>
                          )}
                      </div>
                      <div className="blog-mobile-article-content">
                        {category && (
                          <div className="blog-mobile-article-category">
                            {category.name}
                          </div>
                        )}
                        <h3 className="blog-mobile-article-title">
                          {post.title}
                        </h3>
                        <p className="blog-mobile-article-excerpt">
                          {post.excerpt}
                        </p>
                        <div className="blog-mobile-article-meta">
                          <div className="blog-mobile-article-meta-left">
                            <div className="blog-mobile-article-meta-item">
                              <Clock className="w-3 h-3" />
                              {post.readTime} мин
                            </div>
                            <div className="blog-mobile-article-meta-item">
                              <Eye className="w-3 h-3" />
                              {formatViews(post.views)}
                            </div>
                          </div>
                          <div className="blog-mobile-article-date">
                            {formatDate(post.publishedAt)}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          )}

          {/* Кнопка "Показать больше" */}
          {hasMore && (
            <div className="blog-mobile-load-more blog-mobile-fade-in">
              <button onClick={handleLoadMore}>Показать больше статей</button>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </HelmetProvider>
  );
}
