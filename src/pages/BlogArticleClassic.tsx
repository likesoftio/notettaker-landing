import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "../components/SEO/Head";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import {
  ArrowLeft,
  Share2,
  MessageCircle,
  Twitter,
  Linkedin,
  Clock,
  User,
  Tag,
  Eye,
  Calendar,
  ExternalLink,
  ChevronRight,
  List,
} from "lucide-react";
import BlogAPI from "../lib/blog-api";
import { BlogPost, BlogCategory, BlogAuthor } from "../lib/database";

export default function BlogArticleClassic() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<BlogPost | null>(null);
  const [author, setAuthor] = useState<BlogAuthor | null>(null);
  const [category, setCategory] = useState<BlogCategory | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<BlogPost[]>([]);
  const [activeSection, setActiveSection] = useState("");
  const [readingProgress, setReadingProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (slug) {
      loadArticle(slug);
    }
  }, [slug]);

  // Track reading progress
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    const handleScroll = () => {
      updateProgress();

      // Update active section for TOC
      if (article?.tableOfContents) {
        const sections = article.tableOfContents
          .map((item) => document.getElementById(item.id))
          .filter(Boolean);

        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100) {
              setActiveSection(section.id);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    updateProgress(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, [article]);

  const loadArticle = async (articleSlug: string) => {
    setLoading(true);
    setNotFound(false);

    try {
      const post = await BlogAPI.getPostBySlug(articleSlug);

      if (!post) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setArticle(post);

      // Load related data
      const [authorData, categoryData, relatedPosts] = await Promise.all([
        BlogAPI.getAuthorById(post.author),
        BlogAPI.getCategoryBySlug(post.category),
        BlogAPI.getRelatedPosts(post.id, 3),
      ]);

      setAuthor(authorData);
      setCategory(categoryData);
      setRelatedArticles(relatedPosts);
    } catch (error) {
      console.error("Failed to load article:", error);
      setNotFound(true);
    }

    setLoading(false);
  };

  const handleTocClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  const shareUrls = article ? BlogAPI.generateSocialShareUrls(article) : null;
  const seoData = article ? BlogAPI.generateSEOData(article) : null;
  const breadcrumbs =
    article && category ? BlogAPI.generateBreadcrumbs(article, category) : [];

  if (loading) {
    return (
      <HelmetProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900">
          <Head title="Загрузка статьи..." />
          <Header />
          <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Загрузка статьи...
              </p>
            </div>
          </div>
          <Footer />
        </div>
      </HelmetProvider>
    );
  }

  if (notFound || !article) {
    return (
      <HelmetProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900">
          <Head
            title="Статья не найдена"
            description="Запрашиваемая статья блога не найдена"
            noindex
          />
          <Header />
          <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
            <div className="text-center max-w-md">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 mx-auto">
                <MessageCircle className="w-12 h-12 text-gray-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Статья не найдена
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                К сожалению, запрашиваемая статья не найдена или была удалена.
              </p>
              <Link to="/blog">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Вернуться к блогу
                </Button>
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      </HelmetProvider>
    );
  }

  return (
    <HelmetProvider>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-1 bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full bg-blue-600 transition-all duration-150 ease-out"
            style={{ width: `${readingProgress}%` }}
          />
        </div>
      </div>

      <div className="min-h-screen bg-white dark:bg-gray-900">
        {seoData && (
          <Head
            {...seoData}
            url={`https://mymeet.ai/blog/${article.slug}`}
            structuredData={{
              "@context": "https://schema.org",
              "@type": "Article",
              headline: article.title,
              description: article.excerpt,
              author: {
                "@type": "Person",
                name: author?.name || "mymeet.ai Team",
              },
              publisher: {
                "@type": "Organization",
                name: "mymeet.ai",
                logo: {
                  "@type": "ImageObject",
                  url: "https://mymeet.ai/logo.png",
                },
              },
              datePublished: article.publishedAt,
              dateModified: article.updatedAt,
              image: article.heroImage,
              url: `https://mymeet.ai/blog/${article.slug}`,
              articleSection: category?.name,
              keywords: article.tags.join(", "),
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://mymeet.ai/blog/${article.slug}`,
              },
            }}
          />
        )}

        <Header />

        <main className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <nav className="mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                {breadcrumbs.map((crumb, index) => (
                  <li key={crumb.href} className="flex items-center">
                    {index > 0 && <span className="mx-2">/</span>}
                    {index === breadcrumbs.length - 1 ? (
                      <span className="font-medium text-blue-600 dark:text-blue-400">
                        {crumb.name}
                      </span>
                    ) : (
                      <Link
                        to={crumb.href}
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {crumb.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* Back button */}
          <div className="mb-6">
            <Link to="/blog">
              <Button
                variant="ghost"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />К блогу
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Table of Contents - Sidebar */}
            <aside className="lg:col-span-1 order-2 lg:order-1">
              {article.tableOfContents &&
                article.tableOfContents.length > 0 && (
                  <div className="sticky top-24">
                    <Card className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <List className="w-5 h-5 text-blue-600" />
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                          Содержание
                        </h3>
                      </div>

                      <nav className="space-y-1">
                        {article.tableOfContents.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => handleTocClick(item.id)}
                            className={`group flex items-center w-full text-left py-2 px-3 rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                              activeSection === item.id
                                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium border-l-2 border-blue-600"
                                : "text-gray-600 dark:text-gray-300"
                            }`}
                            style={{ paddingLeft: `${item.level * 12 + 12}px` }}
                          >
                            <ChevronRight
                              className={`w-3 h-3 mr-2 transition-transform duration-200 ${
                                activeSection === item.id
                                  ? "rotate-90"
                                  : "rotate-0"
                              }`}
                            />
                            <span className="text-sm leading-relaxed">
                              {item.title}
                            </span>
                          </button>
                        ))}
                      </nav>

                      {/* Reading Progress */}
                      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                          <span>Прогресс чтения</span>
                          <span>{Math.round(readingProgress)}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 transition-all duration-300 ease-out"
                            style={{ width: `${readingProgress}%` }}
                          />
                        </div>
                      </div>
                    </Card>
                  </div>
                )}
            </aside>

            {/* Main Content */}
            <article className="lg:col-span-3 order-1 lg:order-2">
              {/* Hero Image */}
              <div className="relative mb-8 rounded-lg overflow-hidden">
                <img
                  src={article.heroImage}
                  alt={article.title}
                  className="w-full h-64 lg:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Category badge */}
                {category && (
                  <div className="absolute bottom-4 left-4">
                    <span
                      className={`inline-block px-3 py-1 text-white text-sm font-medium rounded-full ${category.color || "bg-blue-600"}`}
                    >
                      {category.name}
                    </span>
                  </div>
                )}

                {/* Views counter */}
                <div className="absolute bottom-4 right-4">
                  <div className="flex items-center gap-1 bg-black/50 text-white px-3 py-1 rounded-full">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">{article.views}</span>
                  </div>
                </div>
              </div>

              {/* Article Header */}
              <header className="mb-8">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  {article.title}
                </h1>

                {/* Meta information */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6">
                  {author && (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{author.name}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime} мин чтения</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{BlogAPI.formatDate(article.publishedAt)}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-sm rounded-full"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Social sharing */}
                {shareUrls && (
                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          Поделиться:
                        </span>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-2"
                            asChild
                          >
                            <a
                              href={shareUrls.twitter}
                              target="_blank"
                              rel="noopener"
                            >
                              <Twitter className="w-4 h-4" />
                              Twitter
                            </a>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-2"
                            asChild
                          >
                            <a
                              href={shareUrls.linkedin}
                              target="_blank"
                              rel="noopener"
                            >
                              <Linkedin className="w-4 h-4" />
                              LinkedIn
                            </a>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-2"
                            asChild
                          >
                            <a
                              href={shareUrls.telegram}
                              target="_blank"
                              rel="noopener"
                            >
                              <Share2 className="w-4 h-4" />
                              Telegram
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
              </header>

              {/* Article Content */}
              <div className="blog-content">
                <div
                  dangerouslySetInnerHTML={{
                    __html: BlogAPI.processContent(article.content),
                  }}
                />
              </div>

              {/* Article Footer */}
              <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                {/* Author info */}
                {author && (
                  <Card className="p-6 mb-8">
                    <div className="flex items-start gap-4">
                      {author.avatar && (
                        <img
                          src={author.avatar}
                          alt={author.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          Об авторе
                        </h3>
                        <p className="font-medium text-gray-900 dark:text-white mb-1">
                          {author.name}
                        </p>
                        {author.bio && (
                          <p className="text-gray-600 dark:text-gray-300 mb-3">
                            {author.bio}
                          </p>
                        )}
                        {author.socialLinks && (
                          <div className="flex gap-2">
                            {author.socialLinks.twitter && (
                              <Button size="sm" variant="outline" asChild>
                                <a
                                  href={author.socialLinks.twitter}
                                  target="_blank"
                                  rel="noopener"
                                >
                                  <Twitter className="w-4 h-4" />
                                </a>
                              </Button>
                            )}
                            {author.socialLinks.linkedin && (
                              <Button size="sm" variant="outline" asChild>
                                <a
                                  href={author.socialLinks.linkedin}
                                  target="_blank"
                                  rel="noopener"
                                >
                                  <Linkedin className="w-4 h-4" />
                                </a>
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                )}

                {/* CTA Section */}
                <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Попробуйте mymeet.ai бесплатно
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Начните использовать ИИ для анализа ваших встреч уже
                        сегодня. 180 минут бесплатно, кредитная карта не
                        требуется.
                      </p>
                      <div className="flex gap-3">
                        <Button
                          asChild
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <a
                            href="https://app.notetaker.ru/"
                            target="_blank"
                            rel="noopener"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Попробовать бесплатно
                          </a>
                        </Button>
                        <Button asChild variant="outline">
                          <a href="/contact">Узнать больше</a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                  <div className="mt-12">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Похожие статьи
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {relatedArticles.map((relatedArticle) => (
                        <Link
                          key={relatedArticle.id}
                          to={`/blog/${relatedArticle.slug}`}
                          className="group"
                        >
                          <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                            <div className="relative aspect-video overflow-hidden rounded-t-lg">
                              <img
                                src={relatedArticle.heroImage}
                                alt={relatedArticle.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                              />
                            </div>
                            <div className="p-4">
                              <div className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-2">
                                {BlogAPI.formatDateRelative(
                                  relatedArticle.publishedAt,
                                )}
                              </div>
                              <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2 mb-2">
                                {relatedArticle.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                                {relatedArticle.excerpt}
                              </p>
                            </div>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </footer>
            </article>
          </div>
        </main>

        <Footer />
      </div>
    </HelmetProvider>
  );
}
