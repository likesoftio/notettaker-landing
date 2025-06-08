import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "../components/ui/card";
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
import MobileLayout from "../components/mobile/MobileLayout";
import BlogAPI from "../lib/blog-api";
import { BlogPost, BlogCategory } from "../lib/database";

export default function BlogWithMobileLayout() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [postsData, categoriesData] = await Promise.all([
        BlogAPI.getPublishedPosts(),
        BlogAPI.getCategoriesWithPosts(),
      ]);
      setPosts(postsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Failed to load blog data:", error);
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

  if (loading) {
    return (
      <MobileLayout title="Блог - Загрузка">
        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300 font-medium">
              Загрузка статей...
            </p>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout
      title="Блог notetaker.ru - Статьи о продуктивности встреч и ИИ"
      description="Читайте наш блог о технологиях ИИ, эффективности встреч, управлении задачами и новостях продукта notetaker.ru."
      keywords={[
        "блог notetaker.ru",
        "статьи об ИИ",
        "продуктивность встреч",
        "управление задачами",
      ]}
      url="https://notetaker.ru/blog"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Mobile Header для блога */}
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

          {/* Mobile Categories */}
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

        {/* Desktop Sidebar & Content */}
        <div className="flex gap-8">
          {/* Desktop Sidebar - скрыт на мобильных */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  📚 Блог notetaker.ru
                </h1>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Советы по эффективным встречам, ИИ-технологии и новости
                  продукта
                </p>
              </div>

              <div className="relative mb-8">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Поиск статей..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-3 rounded-xl"
                />
              </div>

              {/* Desktop Categories */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Категории
                </h3>
                {/* Categories list here */}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Hero Section для фичерных статей */}
            {filteredPosts.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 lg:mb-12">
                {/* Здесь будут фичерные статьи */}
              </div>
            )}

            {/* Articles Grid */}
            <div className="blog-mobile-grid">
              {filteredPosts.map((post, index) => {
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
                    {/* Article content */}
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
                            {post.views}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Empty state */}
            {filteredPosts.length === 0 && (
              <div className="blog-mobile-empty blog-mobile-fade-in">
                <div className="blog-mobile-empty-icon">
                  <Search className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="blog-mobile-empty-title">Статьи не найдены</h3>
                <p className="blog-mobile-empty-description">
                  Попробуйте изменить поисковый запрос или выбрать другую
                  категорию.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
