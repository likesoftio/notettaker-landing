import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "../components/SEO/Head";
import ReadingProgress from "../components/ReadingProgress";
import TableOfContents from "../components/TableOfContents";
import EnhancedImage from "../components/EnhancedImage";
import RelatedArticleCard from "../components/RelatedArticleCard";
import {
  FadeInWhenVisible,
  MagneticElement,
  GlowingBorder,
  FloatingElement,
} from "../components/AnimatedElements";
import {
  ReadingIcon,
  TimeIcon,
  AuthorIcon,
  ViewsIcon,
  TagIcon,
  CalendarIcon,
  HeartIcon,
  BookmarkIcon,
  ShareIcon,
  ArrowIcon,
  ExternalLinkIcon,
  CoffeeIcon,
  SparkleIcon,
  TocIcon,
} from "../components/ModernIcons";
import { Button } from "../components/ui/button";
import { MessageCircle, Twitter, Linkedin, ThumbsUp } from "lucide-react";
import BlogAPI from "../lib/blog-api";
import { BlogPost, BlogCategory, BlogAuthor } from "../lib/database";

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<BlogPost | null>(null);
  const [author, setAuthor] = useState<BlogAuthor | null>(null);
  const [category, setCategory] = useState<BlogCategory | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (slug) {
      loadArticle(slug);
    }
  }, [slug]);

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

      // Check bookmarks and likes from localStorage
      const bookmarks = JSON.parse(
        localStorage.getItem("blog_bookmarks") || "[]",
      );
      const likes = JSON.parse(localStorage.getItem("blog_likes") || "[]");
      setIsBookmarked(bookmarks.includes(post.id));
      setIsLiked(likes.includes(post.id));
    } catch (error) {
      console.error("Failed to load article:", error);
      setNotFound(true);
    }

    setLoading(false);
  };

  const handleBookmark = () => {
    if (!article) return;

    const bookmarks = JSON.parse(
      localStorage.getItem("blog_bookmarks") || "[]",
    );
    const newBookmarks = isBookmarked
      ? bookmarks.filter((id: string) => id !== article.id)
      : [...bookmarks, article.id];

    localStorage.setItem("blog_bookmarks", JSON.stringify(newBookmarks));
    setIsBookmarked(!isBookmarked);
  };

  const handleLike = () => {
    if (!article) return;

    const likes = JSON.parse(localStorage.getItem("blog_likes") || "[]");
    const newLikes = isLiked
      ? likes.filter((id: string) => id !== article.id)
      : [...likes, article.id];

    localStorage.setItem("blog_likes", JSON.stringify(newLikes));
    setIsLiked(!isLiked);
  };

  const shareUrls = article ? BlogAPI.generateSocialShareUrls(article) : null;
  const seoData = article ? BlogAPI.generateSEOData(article) : null;
  const breadcrumbs =
    article && category ? BlogAPI.generateBreadcrumbs(article, category) : [];

  if (loading) {
    return (
      <HelmetProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
          <Head title="Загрузка статьи..." />
          <Header />
          <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
            <FadeInWhenVisible>
              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin"></div>
                  <div className="absolute inset-2 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <SparkleIcon className="absolute inset-6 text-blue-600 animate-pulse" />
                </div>
                <h2 className="heading-lg text-gray-700 dark:text-gray-300 mb-2">
                  Загружаем статью
                </h2>
                <p className="body-md text-gray-500 dark:text-gray-400">
                  Подготавливаем для вас интересный контент...
                </p>
              </div>
            </FadeInWhenVisible>
          </div>
          <Footer />
        </div>
      </HelmetProvider>
    );
  }

  if (notFound || !article) {
    return (
      <HelmetProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
          <Head
            title="Статья не найдена"
            description="Запрашиваемая статья блога не ��айдена"
            noindex
          />
          <Header />
          <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
            <FadeInWhenVisible>
              <div className="text-center max-w-md">
                <FloatingElement>
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                    <MessageCircle className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                  </div>
                </FloatingElement>
                <h1 className="display-md gradient-text-blue mb-4">
                  Статья не найдена
                </h1>
                <p className="body-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  К сожалению, запрашиваемая статья не найдена или была удалена.
                </p>
                <MagneticElement>
                  <Link to="/blog">
                    <Button className="btn-magnetic bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl shadow-lg">
                      <ArrowIcon direction="left" className="mr-2" />
                      Вернуться к блогу
                    </Button>
                  </Link>
                </MagneticElement>
              </div>
            </FadeInWhenVisible>
          </div>
          <Footer />
        </div>
      </HelmetProvider>
    );
  }

  return (
    <HelmetProvider>
      <ReadingProgress />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
        {seoData && (
          <Head
            {...seoData}
            url={`https://notetaker.ru/blog/${article.slug}`}
            structuredData={{
              "@context": "https://schema.org",
              "@type": "Article",
              headline: article.title,
              description: article.excerpt,
              author: {
                "@type": "Person",
                name: author?.name || "notetaker.ru Team",
              },
              publisher: {
                "@type": "Organization",
                name: "notetaker.ru",
                logo: {
                  "@type": "ImageObject",
                  url: "https://notetaker.ru/logo.png",
                },
              },
              datePublished: article.publishedAt,
              dateModified: article.updatedAt,
              image: article.heroImage,
              url: `https://notetaker.ru/blog/${article.slug}`,
              articleSection: category?.name,
              keywords: article.tags.join(", "),
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://notetaker.ru/blog/${article.slug}`,
              },
            }}
          />
        )}

        <Header />

        <main className="container mx-auto px-4 py-8">
          {/* Breadcrumbs - скрыты на мобильных */}
          {breadcrumbs.length > 0 && (
            <FadeInWhenVisible>
              <nav className="mb-8 hidden md:block" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2 text-sm">
                  {breadcrumbs.map((crumb, index) => (
                    <li key={crumb.href} className="flex items-center">
                      {index > 0 && (
                        <span className="mx-2 text-gray-400">/</span>
                      )}
                      {index === breadcrumbs.length - 1 ? (
                        <span className="font-medium text-blue-600 dark:text-blue-400">
                          {crumb.name}
                        </span>
                      ) : (
                        <Link
                          to={crumb.href}
                          className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hover-float"
                        >
                          {crumb.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            </FadeInWhenVisible>
          )}

          {/* Back button - скрыта на мобильных */}
          <FadeInWhenVisible>
            <div className="mb-8 hidden md:block">
              <div>
                <Link to="/blog">
                  <Button
                    variant="ghost"
                    className="group text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 rounded-xl px-4 py-2"
                  >
                    <ArrowIcon direction="left" className="mr-2" />К блогу
                  </Button>
                </Link>
              </div>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* Table of Contents - Sidebar */}
            <aside className="xl:col-span-3 order-2 xl:order-1">
              {article.tableOfContents &&
                article.tableOfContents.length > 0 && (
                  <FadeInWhenVisible direction="left" delay={200}>
                    <div className="hidden xl:block">
                      <GlowingBorder color="blue" intensity={0.5}>
                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-xl p-6 sticky top-24">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg">
                              <TocIcon className="text-white" size="sm" />
                            </div>
                            <h3 className="heading-md text-gray-900 dark:text-white">
                              Содержание
                            </h3>
                          </div>

                          <TableOfContents items={article.tableOfContents} />

                          {/* Reading stats */}
                          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
                              <span className="label">Прогресс чтения</span>
                              <span className="font-medium">
                                {Math.round(
                                  ((article.tableOfContents.findIndex(
                                    (item) =>
                                      document
                                        .getElementById(item.id)
                                        ?.getBoundingClientRect().top! <= 120,
                                  ) +
                                    1) /
                                    article.tableOfContents.length) *
                                    100,
                                )}
                                %
                              </span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 ease-out rounded-full"
                                style={{
                                  width: `${
                                    ((article.tableOfContents.findIndex(
                                      (item) =>
                                        document
                                          .getElementById(item.id)
                                          ?.getBoundingClientRect().top! <= 120,
                                    ) +
                                      1) /
                                      article.tableOfContents.length) *
                                    100
                                  }%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </GlowingBorder>
                    </div>
                  </FadeInWhenVisible>
                )}
            </aside>

            {/* Main Content */}
            <article className="xl:col-span-6 order-1 xl:order-2">
              {/* Hero Image */}
              <FadeInWhenVisible>
                <div className="relative mb-12">
                  <GlowingBorder color="purple" intensity={0.3}>
                    <EnhancedImage
                      src={article.heroImage}
                      alt={article.title}
                      aspectRatio="wide"
                      showZoom={true}
                      showShadow={true}
                      overlay={true}
                      className="w-full rounded-2xl overflow-hidden"
                    />
                  </GlowingBorder>

                  {/* Category badge overlay */}
                  {category && (
                    <FloatingElement>
                      <div className="absolute bottom-6 left-6">
                        <span
                          className={`inline-flex items-center gap-2 px-4 py-2 text-white text-sm font-medium rounded-full backdrop-blur-sm shadow-lg ${category.color || "bg-blue-600"} hover-float`}
                        >
                          <SparkleIcon size="xs" />
                          {category.name}
                        </span>
                      </div>
                    </FloatingElement>
                  )}

                  {/* Views counter overlay */}
                  <FloatingElement delay={0.5}>
                    <div className="absolute bottom-6 right-6">
                      <div className="flex items-center gap-2 bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-sm shadow-lg hover-float">
                        <ViewsIcon size="sm" />
                        <span className="text-sm font-medium">
                          {article.views.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </FloatingElement>
                </div>
              </FadeInWhenVisible>

              {/* Article Header */}
              <FadeInWhenVisible delay={100}>
                <header className="mb-12">
                  <h1 className="display-lg gradient-text-blue mb-6 leading-tight font-bold">
                    {article.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-8">
                    {author && (
                      <MagneticElement>
                        <div className="flex items-center gap-3 hover-float">
                          {author.avatar && (
                            <img
                              src={author.avatar}
                              alt={author.name}
                              className="w-12 h-12 rounded-full object-cover shadow-lg ring-2 ring-blue-500/20"
                            />
                          )}
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white body-md">
                              {author.name}
                            </div>
                            <div className="caption text-gray-500 dark:text-gray-400">
                              Автор
                            </div>
                          </div>
                        </div>
                      </MagneticElement>
                    )}

                    <div className="flex items-center gap-2 hover-float">
                      <CalendarIcon size="sm" color="rgb(59 130 246)" />
                      <span className="body-sm">
                        {BlogAPI.formatDate(article.publishedAt)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 hover-float">
                      <TimeIcon size="sm" color="rgb(59 130 246)" />
                      <span className="body-sm">
                        {article.readTime} мин чтения
                      </span>
                    </div>

                    <div className="flex items-center gap-2 hover-float">
                      <CoffeeIcon size="sm" color="rgb(59 130 246)" />
                      <span className="body-sm">Средний уровень</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-3 mb-8">
                    {article.tags.map((tag, index) => (
                      <FadeInWhenVisible key={tag} delay={index * 50}>
                        <MagneticElement>
                          <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-700 dark:text-blue-300 text-sm rounded-full border border-blue-200 dark:border-blue-700 hover:shadow-lg transition-all duration-300 hover-float">
                            <TagIcon size="xs" />
                            {tag}
                          </span>
                        </MagneticElement>
                      </FadeInWhenVisible>
                    ))}
                  </div>
                </header>
              </FadeInWhenVisible>

              {/* Article Content */}
              <FadeInWhenVisible delay={200}>
                <div className="blog-content">
                  <div
                    className="animate-fade-in"
                    dangerouslySetInnerHTML={{
                      __html: BlogAPI.processContent(article.content),
                    }}
                  />
                </div>
              </FadeInWhenVisible>

              {/* Article Footer */}
              <FadeInWhenVisible delay={300}>
                <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
                  {/* Author info */}
                  {author && (
                    <GlowingBorder color="purple" intensity={0.3}>
                      <div className="mb-12 p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 rounded-2xl border border-blue-100 dark:border-gray-600 shadow-xl">
                        <div className="flex items-start gap-6">
                          {author.avatar && (
                            <MagneticElement>
                              <img
                                src={author.avatar}
                                alt={author.name}
                                className="w-20 h-20 rounded-full object-cover shadow-xl ring-4 ring-white dark:ring-gray-700 hover-float"
                              />
                            </MagneticElement>
                          )}
                          <div className="flex-1">
                            <h3 className="heading-lg text-gray-900 dark:text-white mb-3">
                              Об авторе
                            </h3>
                            <h4 className="heading-md text-gray-900 dark:text-white mb-2">
                              {author.name}
                            </h4>
                            {author.bio && (
                              <p className="body-lg text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                                {author.bio}
                              </p>
                            )}
                            {author.socialLinks && (
                              <div className="flex gap-3">
                                {author.socialLinks.twitter && (
                                  <MagneticElement>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="gap-2 rounded-xl btn-magnetic"
                                      asChild
                                    >
                                      <a
                                        href={author.socialLinks.twitter}
                                        target="_blank"
                                        rel="noopener"
                                      >
                                        <Twitter size={16} />
                                        Twitter
                                      </a>
                                    </Button>
                                  </MagneticElement>
                                )}
                                {author.socialLinks.linkedin && (
                                  <MagneticElement>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="gap-2 rounded-xl btn-magnetic"
                                      asChild
                                    >
                                      <a
                                        href={author.socialLinks.linkedin}
                                        target="_blank"
                                        rel="noopener"
                                      >
                                        <Linkedin size={16} />
                                        LinkedIn
                                      </a>
                                    </Button>
                                  </MagneticElement>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </GlowingBorder>
                  )}

                  {/* CTA Section */}
                  <div className="mb-12 hidden md:block">
                    <GlowingBorder color="blue" intensity={0.5}>
                      <div className="p-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl text-white shadow-2xl animate-gradient">
                        <div className="flex items-start gap-6">
                          <FloatingElement>
                            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xl">
                              <MessageCircle size={32} className="text-white" />
                            </div>
                          </FloatingElement>
                          <div className="flex-1">
                            <h3 className="heading-xl text-white mb-3 text-glow">
                              Попробуйте notetaker.ru в действии
                            </h3>
                            <p className="body-lg text-blue-100 mb-6 leading-relaxed">
                              Начните использовать ИИ для анализа ваших встреч
                              уже сегодня. 180 минут бесплатно, кредитная карта
                              не требуется.
                            </p>
                            <div className="flex gap-4">
                              <MagneticElement>
                                <Button
                                  asChild
                                  className="bg-white text-blue-600 hover:bg-blue-50 rounded-xl px-6 py-3 font-semibold btn-magnetic"
                                >
                                  <a
                                    href="https://app.notetaker.ru/"
                                    target="_blank"
                                    rel="noopener"
                                  >
                                    <ExternalLinkIcon
                                      className="mr-2"
                                      size="sm"
                                    />
                                    Попробовать бесплатно
                                  </a>
                                </Button>
                              </MagneticElement>
                              <MagneticElement>
                                <Button
                                  asChild
                                  variant="outline"
                                  className="border-white text-white hover:bg-white/10 rounded-xl px-6 py-3 btn-magnetic"
                                >
                                  <a href="/contact">Узнать больше</a>
                                </Button>
                              </MagneticElement>
                            </div>
                          </div>
                        </div>
                      </div>
                    </GlowingBorder>
                  </div>

                  {/* Mobile CTA Section */}
                  <div className="mb-12 md:hidden">
                    <div className="px-4">
                      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white text-center shadow-xl">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 backdrop-filter backdrop-blur-sm">
                          <MessageCircle className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 leading-tight">
                          Попробуйте notetaker.ru в действии
                        </h3>
                        <p className="text-blue-100 mb-6 text-sm leading-relaxed">
                          Начните использовать ИИ для анализа ваших встреч уже
                          сегодня. 180 минут бесплатно, кредитная карта не
                          требуется.
                        </p>
                        <div className="space-y-3">
                          <Button
                            asChild
                            className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 rounded-xl"
                          >
                            <a
                              href="https://app.notetaker.ru/"
                              target="_blank"
                              rel="noopener"
                            >
                              <ExternalLinkIcon className="w-4 h-4 mr-2" />
                              Попробовать бесплатно
                            </a>
                          </Button>
                          <Button
                            asChild
                            variant="outline"
                            className="w-full border-white text-white hover:bg-white/10 py-3 rounded-xl"
                          >
                            <a href="/contact">Узнать больше</a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </footer>
              </FadeInWhenVisible>
            </article>

            {/* Related Articles Sidebar */}
            <aside className="xl:col-span-3 order-3">
              {relatedArticles.length > 0 && (
                <FadeInWhenVisible direction="right" delay={400}>
                  <div className="sticky top-24">
                    <GlowingBorder color="purple" intensity={0.3}>
                      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg shadow-lg">
                            <ReadingIcon className="text-white" size="sm" />
                          </div>
                          <h3 className="heading-md text-gray-900 dark:text-white">
                            Похожие статьи
                          </h3>
                        </div>

                        <div className="space-y-4">
                          {relatedArticles.map((relatedArticle, index) => (
                            <FadeInWhenVisible
                              key={relatedArticle.id}
                              delay={index * 100}
                            >
                              <RelatedArticleCard
                                article={relatedArticle}
                                variant="compact"
                                className="hover-float"
                              />
                            </FadeInWhenVisible>
                          ))}
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                          <MagneticElement>
                            <Link to="/blog">
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full rounded-xl btn-magnetic"
                              >
                                <ThumbsUp size={16} className="mr-2" />
                                Все статьи блога
                              </Button>
                            </Link>
                          </MagneticElement>
                        </div>
                      </div>
                    </GlowingBorder>
                  </div>
                </FadeInWhenVisible>
              )}
            </aside>
          </div>
        </main>

        <Footer />
      </div>
    </HelmetProvider>
  );
}
