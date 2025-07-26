import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "../components/SEO/Head";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Clock,
  Eye,
  Calendar,
  User,
  ArrowLeft,
  Share2,
  BookOpen,
  Heart,
  Bookmark,
  ChevronRight,
  Play,
  FileText,
  Sparkles,
} from "lucide-react";
import BlogAPI from "../lib/blog-api-switcher";
import { BlogPost, BlogCategory, BlogAuthor } from "../lib/database";

export default function BlogArticleV2() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [category, setCategory] = useState<BlogCategory | null>(null);
  const [author, setAuthor] = useState<BlogAuthor | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (slug) {
      loadPostData();
    }
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(scrollProgress, 100));

      // Update active section
      if (post?.tableOfContents) {
        const sections = post.tableOfContents.map((item) =>
          document.getElementById(item.id),
        );
        let currentSection = "";

        sections.forEach((section, index) => {
          if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              currentSection = post.tableOfContents[index].id;
            }
          }
        });

        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [post]);

  const loadPostData = async () => {
    try {
      const postData = await BlogAPI.getPostBySlug(slug!);
      if (!postData) {
        setLoading(false);
        return;
      }

      setPost(postData);

      const [categoryData, authorData, relatedData] = await Promise.all([
        BlogAPI.getCategoryBySlug(postData.category),
        BlogAPI.getAuthorById(postData.author),
        BlogAPI.getRelatedPosts(postData.id, 3),
      ]);

      setCategory(categoryData);
      setAuthor(authorData);
      setRelatedPosts(relatedData);
    } catch (error) {
      console.error("Failed to load post:", error);
    }
    setLoading(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const shareArticle = () => {
    if (navigator.share && post) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <HelmetProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Head title="Загрузка статьи..." />
          <Header />
          <div className="flex items-center justify-center py-24">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">
                Загрузка статьи...
              </p>
            </div>
          </div>
          <Footer />
        </div>
      </HelmetProvider>
    );
  }

  if (!post) {
    return (
      <HelmetProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Head title="Статья не найдена" />
          <Header />
          <div className="max-w-4xl mx-auto px-4 py-24 text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Статья не найдена
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              К сожалению, запрашиваемая статья не существует или была удалена.
            </p>
            <Button asChild>
              <Link to="/blog">Вернуться к блогу</Link>
            </Button>
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
          title={post.seoTitle || post.title}
          description={post.seoDescription || post.excerpt}
          keywords={post.seoKeywords || post.tags}
          image={post.heroImage}
          url={`https://mymeet.ai/blog/v2/${post.slug}`}
          type="article"
          publishedTime={post.publishedAt}
          modifiedTime={post.updatedAt}
        />

        <Header />

        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
          <div
            className="h-full bg-blue-600 transition-all duration-150 ease-out"
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Left Sidebar - Table of Contents */}
            <aside className="w-80 flex-shrink-0 sticky top-24 self-start">
              <div className="space-y-6">
                {/* Back Navigation */}
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="w-full justify-start"
                >
                  <Link to="/blog">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Назад
                  </Link>
                </Button>

                {/* Table of Contents */}
                <Card className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2" />
                    СОДЕРЖАНИЕ
                  </h3>

                  <nav className="space-y-1">
                    {post.tableOfContents?.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left px-3 py-2 rounded text-sm transition-all ${
                          activeSection === item.id
                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium border-l-2 border-blue-600"
                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                        }`}
                        style={{
                          paddingLeft: `${12 + (item.level - 1) * 16}px`,
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="line-clamp-2">{item.title}</span>
                          {activeSection === item.id && (
                            <ChevronRight className="w-3 h-3 flex-shrink-0" />
                          )}
                        </div>
                      </button>
                    ))}
                  </nav>
                </Card>

                {/* Article Actions */}
                <Card className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <div className="space-y-3">
                    <button
                      onClick={toggleLike}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        isLiked
                          ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                          : "bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`}
                      />
                      <span>{isLiked ? "Понравилось" : "Нравится"}</span>
                    </button>

                    <button
                      onClick={toggleBookmark}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        isBookmarked
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                          : "bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                      }`}
                    >
                      <Bookmark
                        className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`}
                      />
                      <span>{isBookmarked ? "Сохранено" : "Сохранить"}</span>
                    </button>

                    <button
                      onClick={shareArticle}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Поделиться</span>
                    </button>
                  </div>
                </Card>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 max-w-none">
              <article className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Article Header */}
                <div className="p-8 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-4">
                    {category && (
                      <Badge
                        variant="secondary"
                        className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                      >
                        {category.name}
                      </Badge>
                    )}
                    {post.difficulty && (
                      <Badge variant="outline">
                        {post.difficulty === "beginner" && "Начинающий"}
                        {post.difficulty === "intermediate" && "Средний"}
                        {post.difficulty === "advanced" && "Продвинутый"}
                      </Badge>
                    )}
                    {post.featured && (
                      <Badge
                        variant="outline"
                        className="border-yellow-300 text-yellow-700"
                      >
                        <Sparkles className="w-3 h-3 mr-1" />
                        Рекомендуемая
                      </Badge>
                    )}
                  </div>

                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                    {post.title}
                  </h1>

                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Article Meta */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    {author && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{author.name}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{BlogAPI.formatDate(post.publishedAt)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime} мин чтения</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span>{post.views} просмотров</span>
                    </div>
                  </div>
                </div>

                {/* Hero Image */}
                {post.heroImage && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.heroImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Article Content */}
                <div className="p-8">
                  <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{
                      __html: BlogAPI.processContent(post.content),
                    }}
                  />
                </div>

                {/* Article Tags */}
                <div className="px-8 pb-8">
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                      Теги:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </article>

              {/* Related Articles */}
              {relatedPosts.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Похожие статьи
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <Card
                        key={relatedPost.id}
                        className="overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <Link
                          to={`/blog/v2/${relatedPost.slug}`}
                          className="block"
                        >
                          <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                            {relatedPost.heroImage ? (
                              <img
                                src={relatedPost.heroImage}
                                alt={relatedPost.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <FileText className="w-8 h-8 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                              {relatedPost.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                              {relatedPost.excerpt}
                            </p>
                            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                              <span>{relatedPost.readTime} мин</span>
                              <span>{relatedPost.views} просмотров</span>
                            </div>
                          </div>
                        </Link>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </main>

            {/* Right Sidebar - CTA */}
            <aside className="w-80 flex-shrink-0 sticky top-24 self-start">
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="w-8 h-8 text-white fill-current" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Попробуйте mymeet.ai в деле.
                  </h3>

                  <p className="text-blue-700 dark:text-blue-300 font-medium mb-4">
                    Бесплатно.
                  </p>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-3">
                    Зарегистрироваться
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full text-blue-600 dark:text-blue-400"
                  >
                    ✨ Оставить заявку
                  </Button>

                  <div className="grid grid-cols-3 gap-2 mt-6 text-xs text-gray-600 dark:text-gray-400">
                    <div className="text-center">
                      <Clock className="w-4 h-4 mx-auto mb-1" />
                      <span>180 минут бесплатно</span>
                    </div>
                    <div className="text-center">
                      <FileText className="w-4 h-4 mx-auto mb-1" />
                      <span>Без привязки карты</span>
                    </div>
                    <div className="text-center">
                      <Sparkles className="w-4 h-4 mx-auto mb-1" />
                      <span>Все данные защищены</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Meeting Widget Preview */}
              <Card className="mt-6 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
                    <div className="w-full h-32 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Превью встречи
                      </span>
                    </div>
                  </div>

                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Мои встречи
                  </h4>

                  <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                    <div className="flex justify-between">
                      <span>Окт 9, 2024</span>
                      <span className="text-blue-600">Обработан</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Окт 4, 2024</span>
                      <span className="text-green-600">Новый</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Авг 17, 2024</span>
                      <span className="text-blue-600">Обработан</span>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-4 text-blue-600 dark:text-blue-400"
                  >
                    📁 Загрузка аудио или видео файла
                  </Button>
                </div>
              </Card>
            </aside>
          </div>
        </div>

        <Footer />
      </div>
    </HelmetProvider>
  );
}
