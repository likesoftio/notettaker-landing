import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Head from "../components/SEO/Head";
import { MobileLayout } from "../components/mobile";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import {
  ArrowLeft,
  Search,
  Calendar,
  User,
  Tag,
  BookOpen,
  Filter,
  Clock,
  Eye,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import BlogAPI from "../lib/blog-api";
import { BlogPost, BlogCategory } from "../lib/database";

export default function BlogCategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [category, setCategory] = useState<BlogCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadCategoryData = async () => {
      if (!categorySlug) return;

      try {
        setLoading(true);

        // Load category info and posts
        const [categoryData, allPosts] = await Promise.all([
          BlogAPI.getCategoryBySlug(categorySlug),
          BlogAPI.getAllPosts(),
        ]);

        if (categoryData) {
          setCategory(categoryData);
          // Filter posts by category
          const categoryPosts = allPosts.filter(
            (post) =>
              post.category === categoryData.id && post.status === "published",
          );
          setPosts(categoryPosts);
        }
      } catch (error) {
        console.error("Failed to load category data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategoryData();
  }, [categorySlug]);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) {
    return (
      <MobileLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Загрузка...</p>
          </div>
        </div>
      </MobileLayout>
    );
  }

  if (!category) {
    return (
      <MobileLayout>
        <Head
          title="Категория не найдена - mymeet.ai"
          description="Запрашиваемая категория блога не найдена."
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Категория не найдена
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Запрашиваемая категория не существует или была удалена.
            </p>
            <Button asChild variant="outline">
              <Link to="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Вернуться к блогу
              </Link>
            </Button>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <Head
        title={`${category.name} - Блог mymeet.ai`}
        description={
          category.description || `Статьи в категории ${category.name}`
        }
        keywords={[category.name, "блог", "статьи", "mymeet.ai"]}
        url={`https://mymeet.ai/blog/category/${category.slug}`}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 blog-mobile-container">
        {/* Mobile Header */}
        <div className="lg:hidden mb-6">
          <div className="blog-mobile-header blog-mobile-fade-in">
            <div className="mb-4">
              <Button
                variant="ghost"
                asChild
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 p-0"
              >
                <Link to="/blog">
                  <ArrowLeft className="w-4 h-4 mr-2" />К блогу
                </Link>
              </Button>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
              <h1>{category.name}</h1>
            </div>
            <p>
              {category.description || `Статьи в категории ${category.name}`}
            </p>
          </div>

          {/* Mobile Search */}
          {posts.length > 0 && (
            <div className="blog-mobile-search blog-mobile-slide-up">
              <Search className="w-4 h-4" />
              <Input
                type="text"
                placeholder="Поиск статей..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-8">
              {/* Header */}
              <div className="mb-8">
                <div className="mb-4">
                  <Button
                    variant="ghost"
                    asChild
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 p-0"
                  >
                    <Link to="/blog">
                      <ArrowLeft className="w-4 h-4 mr-2" />К блогу
                    </Link>
                  </Button>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-4 h-4 rounded-full ${category.color}`}
                  ></div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {category.name}
                  </h1>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {category.description ||
                    `Статьи в категории ${category.name}`}
                </p>
              </div>

              {/* Search */}
              {posts.length > 0 && (
                <div className="relative mb-8">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Поиск статей..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 py-3 rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm"
                  />
                </div>
              )}

              {/* Category Stats */}
              <div className="sticky top-20 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Статистика категории
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      Всего статей:
                    </span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {posts.length}
                    </span>
                  </div>
                  {searchQuery && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Найдено:
                      </span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {filteredPosts.length}
                      </span>
                    </div>
                  )}
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
                    <Card
                      className={`h-full overflow-hidden ${category.color.replace("bg-", "bg-gradient-to-br from-").replace("-600", "-600 via-").replace("600", "700 to-").replace("700", "800")} text-white border-0 hover:scale-[1.02] transition-transform duration-300 shadow-xl`}
                    >
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
                              {category.name}
                            </span>
                          </div>
                          <h2 className="text-xl lg:text-3xl font-bold mb-3 lg:mb-4 leading-tight">
                            {filteredPosts[0].title}
                          </h2>
                          <p className="text-white/90 opacity-90 text-sm lg:text-lg leading-relaxed">
                            {filteredPosts[0].excerpt}
                          </p>
                        </div>

                        <div className="flex items-center gap-4 text-white/80 text-xs lg:text-sm mt-4">
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

                {/* Sidebar Cards */}
                <div className="space-y-6">
                  {filteredPosts.slice(1, 3).map((post) => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.slug}`}
                      className="group block"
                    >
                      <Card className="overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
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
            )}

            {/* Articles Grid */}
            {filteredPosts.length > 3 ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Все статьи
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {filteredPosts.length}{" "}
                    {filteredPosts.length === 1 ? "статья" : "статей"}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.slice(3).map((post) => (
                    <article
                      key={post.id}
                      className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      <Link to={`/blog/${post.slug}`} className="block">
                        {/* Image */}
                        {post.featuredImage && (
                          <div className="aspect-video overflow-hidden">
                            <img
                              src={post.featuredImage}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>
                        )}

                        {/* Content */}
                        <div className="p-6">
                          {/* Category Badge */}
                          <div className="mb-3">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-white rounded-full ${category.color}`}
                            >
                              {category.name}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                            {post.title}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>

                          {/* Meta */}
                          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <time dateTime={post.publishedAt}>
                                {new Date(post.publishedAt).toLocaleDateString(
                                  "ru-RU",
                                  {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  },
                                )}
                              </time>
                            </div>

                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              <span>{post.author}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              </>
            ) : (
              filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  {searchQuery ? (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Ничего не найдено
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        По запросу "{searchQuery}" в категории "{category.name}"
                        статей не найдено.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => setSearchQuery("")}
                      >
                        Очистить поиск
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Пока нет статей
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        В категории "{category.name}" пока нет опубликованных
                        статей.
                      </p>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </main>
    </MobileLayout>
  );
}
