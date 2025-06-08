import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Head from "../components/SEO/Head";
import { MobileLayout } from "../components/mobile";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ArrowLeft, Search, Calendar, User, Tag } from "lucide-react";
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
        <div className="container mx-auto px-4 py-8">
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
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Категория не найдена
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Запрашиваемая категория не существует или была удалена.
            </p>
            <Button asChild>
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

      <main className="container mx-auto px-4 py-6 sm:py-8">
        {/* Navigation */}
        <div className="mb-6">
          <Button
            variant="ghost"
            asChild
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <Link to="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Вернуться к блогу
            </Link>
          </Button>
        </div>

        {/* Category Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {category.name}
            </h1>
          </div>

          {category.description && (
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              {category.description}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Tag className="w-4 h-4" />
              <span>
                {posts.length} {posts.length === 1 ? "статья" : "статей"}
              </span>
            </div>
          </div>
        </header>

        {/* Search */}
        {posts.length > 0 && (
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Поиск статей..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        )}

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
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
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {post.title}
                    </h2>

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
        ) : (
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
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  Очистить поиск
                </Button>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Пока нет статей
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  В категории "{category.name}" пока нет опубликованных статей.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </MobileLayout>
  );
}
