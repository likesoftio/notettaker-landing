import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "../components/SEO/Head";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Search, Calendar, User, Eye, Clock } from "lucide-react";
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

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [postsData, categoriesData] = await Promise.all([
        BlogAPI.getPublishedPosts(),
        BlogAPI.getAllCategories(),
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

  const featuredPosts = filteredPosts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  if (loading) {
    return (
      <HelmetProvider>
        <div className="page-container">
          <Head
            title="Блог - Загрузка"
            description="Загрузка статей блога mymeet.ai"
          />
          <Header />
          <div className="page-main flex items-center justify-center">
            <BodyLG>Загрузка статей...</BodyLG>
          </div>
          <Footer />
        </div>
      </HelmetProvider>
    );
  }

  return (
    <HelmetProvider>
      <div className="page-container">
        <Head
          title="Блог mymeet.ai - Статьи о продуктивности встреч и ИИ"
          description="Читайте наш блог о технологиях ИИ, эффективности встреч, управлении задачами и новостях продукта mymeet.ai. Полезные советы и инсайты для профессионалов."
          keywords={[
            "блог mymeet.ai",
            "статьи об ИИ",
            "продуктивность встреч",
            "управление задачами",
            "новости продукта",
            "советы по встречам",
            "истории клиентов",
          ]}
          url="https://mymeet.ai/blog"
        />

        <Header />

        <main className="page-main">
          {/* Header */}
          <div className="page-header">
            <DisplayLG>Блог mymeet.ai</DisplayLG>
            <BodyLG className="page-subtitle">
              Статьи о технологиях ИИ, эффективности встреч и управлении
              задачами
            </BodyLG>
          </div>

          {/* Search and filters */}
          <div className="grid-responsive-2 mb-12">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Поиск статей по заголовку, содержанию или тегам..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-base pl-12"
              />
            </div>

            {/* Categories sidebar */}
            <div className="lg:order-last">
              <HeadingMD className="mb-6">Категории</HeadingMD>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                    activeCategory === "all"
                      ? "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 font-medium"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <BodyMD>Все статьи</BodyMD>
                  <Caption className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                    {posts.length}
                  </Caption>
                </button>

                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                      activeCategory === category.id
                        ? "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 font-medium"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <BodyMD>{category.name}</BodyMD>
                    <Caption className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                      {category.postCount}
                    </Caption>
                  </button>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <HeadingMD className="mb-4">Статистика блога</HeadingMD>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Caption>Всего статей:</Caption>
                    <Caption className="font-medium">{posts.length}</Caption>
                  </div>
                  <div className="flex justify-between">
                    <Caption>Рекомендуемых:</Caption>
                    <Caption className="font-medium">
                      {featuredPosts.length}
                    </Caption>
                  </div>
                  <div className="flex justify-between">
                    <Caption>Общих просмотров:</Caption>
                    <Caption className="font-medium">
                      {posts.reduce((sum, post) => sum + post.views, 0)}
                    </Caption>
                  </div>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="lg:col-span-1">
              {/* Featured posts */}
              {featuredPosts.length > 0 && (
                <>
                  <HeadingXL className="mb-8">Рекомендуемые статьи</HeadingXL>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {featuredPosts.map((post) => (
                      <FeaturedPostCard
                        key={post.id}
                        post={post}
                        categories={categories}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* All posts */}
              <div>
                <HeadingXL className="mb-8">
                  {activeCategory === "all"
                    ? "Все статьи"
                    : categories.find((cat) => cat.id === activeCategory)
                        ?.name || "Статьи"}
                </HeadingXL>

                {regularPosts.length > 0 ? (
                  <div className="grid-responsive-3">
                    {regularPosts.map((post) => (
                      <RegularPostCard
                        key={post.id}
                        post={post}
                        categories={categories}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BodyLG className="text-gray-500 dark:text-gray-400">
                      {searchTerm || activeCategory !== "all"
                        ? "Статьи не найдены. Попробуйте изменить поисковый запрос или выбрать другую категорию."
                        : "Пока нет статей в этой категории."}
                    </BodyLG>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </HelmetProvider>
  );
}

// Featured Post Card Component
function FeaturedPostCard({
  post,
  categories,
}: {
  post: BlogPost;
  categories: BlogCategory[];
}) {
  const category = categories.find((cat) => cat.id === post.category);

  return (
    <Link to={`/blog/${post.slug}`} className="group">
      <Card className="card-base card-hover h-full overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <img
            src={post.heroImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-blue-600 text-white text-caption rounded-full font-medium">
              Рекомендуем
            </span>
          </div>
          <div className="absolute bottom-4 right-4">
            <div className="flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded-full">
              <Eye className="w-3 h-3" />
              <Caption className="text-white">{post.views}</Caption>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-3">
            {category && (
              <Caption className="text-blue-600 dark:text-blue-400 font-medium">
                {category.name}
              </Caption>
            )}
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-gray-400" />
              <Caption>{post.readTime} мин чтения</Caption>
            </div>
          </div>

          <HeadingMD className="mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {post.title}
          </HeadingMD>

          <BodyMD className="text-gray-600 dark:text-gray-300 mb-4">
            {post.excerpt}
          </BodyMD>

          <div className="flex items-center justify-between">
            <Caption>{BlogAPI.formatDate(post.publishedAt)}</Caption>
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-caption rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

// Regular Post Card Component
function RegularPostCard({
  post,
  categories,
}: {
  post: BlogPost;
  categories: BlogCategory[];
}) {
  const category = categories.find((cat) => cat.id === post.category);

  return (
    <Link to={`/blog/${post.slug}`} className="group">
      <Card className="card-base card-hover h-full overflow-hidden">
        <div className="relative h-40 overflow-hidden">
          <img
            src={post.heroImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-2 right-2">
            <div className="flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded-full">
              <Eye className="w-3 h-3" />
              <Caption className="text-white">{post.views}</Caption>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-3">
            {category && (
              <Caption className="text-blue-600 dark:text-blue-400 font-medium">
                {category.name}
              </Caption>
            )}
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-gray-400" />
              <Caption>{post.readTime} мин чтения</Caption>
            </div>
          </div>

          <HeadingMD className="mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {post.title}
          </HeadingMD>

          <BodyMD className="text-gray-600 dark:text-gray-300 mb-4">
            {post.excerpt}
          </BodyMD>

          <div className="flex items-center justify-between">
            <Caption>{BlogAPI.formatDate(post.publishedAt)}</Caption>
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 1).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-caption rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
