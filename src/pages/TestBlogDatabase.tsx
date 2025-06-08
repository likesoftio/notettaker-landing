import React, { useState, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "../components/SEO/Head";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import BlogAPI from "../lib/blog-api";
import blogDatabase, {
  BlogPost,
  BlogCategory,
  BlogAuthor,
  BlogStats,
} from "../lib/database";

export default function TestBlogDatabase() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [authors, setAuthors] = useState<BlogAuthor[]>([]);
  const [stats, setStats] = useState<BlogStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [localStorageData, setLocalStorageData] = useState<any>(null);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("🔍 Starting database diagnostics...");

      // Check localStorage directly
      const postsData = localStorage.getItem("blog_posts");
      const categoriesData = localStorage.getItem("blog_categories");
      const authorsData = localStorage.getItem("blog_authors");

      console.log("📦 LocalStorage data:", {
        posts: postsData ? JSON.parse(postsData).length : 0,
        categories: categoriesData ? JSON.parse(categoriesData).length : 0,
        authors: authorsData ? JSON.parse(authorsData).length : 0,
      });

      setLocalStorageData({
        posts: postsData ? JSON.parse(postsData) : [],
        categories: categoriesData ? JSON.parse(categoriesData) : [],
        authors: authorsData ? JSON.parse(authorsData) : [],
      });

      // Test direct database access
      console.log("🔍 Testing direct database access...");
      const directPosts = blogDatabase.getAllPosts();
      const directCategories = blogDatabase.getAllCategories();
      const directAuthors = blogDatabase.getAllAuthors();
      const directStats = blogDatabase.getBlogStats();

      console.log("🔗 Direct database results:", {
        posts: directPosts.length,
        categories: directCategories.length,
        authors: directAuthors.length,
        stats: directStats,
      });

      // Test BlogAPI
      console.log("🔍 Testing BlogAPI access...");
      const apiPosts = await BlogAPI.getAllPosts();
      const apiPublishedPosts = await BlogAPI.getPublishedPosts();
      const apiCategories = await BlogAPI.getAllCategories();
      const apiAuthors = await BlogAPI.getAllAuthors();
      const apiStats = await BlogAPI.getBlogStats();

      console.log("📡 BlogAPI results:", {
        allPosts: apiPosts.length,
        publishedPosts: apiPublishedPosts.length,
        categories: apiCategories.length,
        authors: apiAuthors.length,
        stats: apiStats,
      });

      setPosts(apiPublishedPosts);
      setCategories(apiCategories);
      setAuthors(apiAuthors);
      setStats(apiStats);
    } catch (err) {
      console.error("❌ Error during diagnostics:", err);
      setError(err instanceof Error ? err.message : String(err));
    }

    setLoading(false);
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("blog_posts");
    localStorage.removeItem("blog_categories");
    localStorage.removeItem("blog_authors");
    console.log("🧹 LocalStorage cleared, reloading...");
    window.location.reload();
  };

  const reinitializeDatabase = () => {
    clearLocalStorage();
  };

  if (loading) {
    return (
      <HelmetProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900">
          <Head title="Диагностика базы данных блога" />
          <Header />
          <div className="flex items-center justify-center py-24">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p>Выполняется диагностика...</p>
            </div>
          </div>
          <Footer />
        </div>
      </HelmetProvider>
    );
  }

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Head title="Диагностика базы данных блога" />
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              🔍 Диагностика базы данных блога
            </h1>
            <div className="flex gap-4">
              <Button onClick={loadAllData}>Перезагрузить данные</Button>
              <Button variant="outline" onClick={reinitializeDatabase}>
                Переинициализировать БД
              </Button>
            </div>
          </div>

          {error && (
            <Card className="p-6 mb-6 border-red-200 bg-red-50 dark:bg-red-900/20">
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                ❌ Ошибка
              </h3>
              <p className="text-red-700 dark:text-red-300">{error}</p>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                📝 С��атьи
              </h3>
              <div className="text-2xl font-bold text-blue-600">
                {posts.length}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Опубликованных статей
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                📁 Категории
              </h3>
              <div className="text-2xl font-bold text-green-600">
                {categories.length}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Активных категорий
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                👥 Авторы
              </h3>
              <div className="text-2xl font-bold text-purple-600">
                {authors.length}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Зарегистрированных авторов
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                👁️ Просмотры
              </h3>
              <div className="text-2xl font-bold text-orange-600">
                {stats?.totalViews || 0}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Всего просмотров
              </p>
            </Card>
          </div>

          {/* LocalStorage Data */}
          <Card className="p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              💾 Данные в LocalStorage
            </h3>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto">
              {JSON.stringify(
                {
                  posts: localStorageData?.posts?.length || 0,
                  categories: localStorageData?.categories?.length || 0,
                  authors: localStorageData?.authors?.length || 0,
                  samplePost: localStorageData?.posts?.[0]
                    ? {
                        id: localStorageData.posts[0].id,
                        title: localStorageData.posts[0].title,
                        status: localStorageData.posts[0].status,
                      }
                    : null,
                },
                null,
                2,
              )}
            </pre>
          </Card>

          {/* Articles List */}
          <Card className="p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              📚 Список статей
            </h3>
            <div className="space-y-3">
              {posts.length > 0 ? (
                posts.map((post, index) => (
                  <div
                    key={post.id}
                    className="border-l-4 border-blue-500 pl-4"
                  >
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {index + 1}. {post.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      ID: {post.id} | Slug: {post.slug} | Status: {post.status}{" "}
                      | Views: {post.views} | Category: {post.category}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  ❌ Статьи не найдены
                </p>
              )}
            </div>
          </Card>

          {/* Categories List */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              📁 Список категорий
            </h3>
            <div className="space-y-2">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <div
                    key={category.id}
                    className="border-l-4 border-green-500 pl-4"
                  >
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {category.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      ID: {category.id} | Slug: {category.slug} | Posts:{" "}
                      {category.postCount}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  ❌ Категории не найдены
                </p>
              )}
            </div>
          </Card>
        </main>

        <Footer />
      </div>
    </HelmetProvider>
  );
}
