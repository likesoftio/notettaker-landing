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
import { Button } from "../components/ui/button";
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
  Bookmark,
  Heart,
  Coffee,
  ThumbsUp,
} from "lucide-react";
import BlogAPI from "../lib/blog-api";
import { BlogPost, BlogCategory, BlogAuthor } from "../lib/database";
import {
  DisplayLG,
  HeadingXL,
  HeadingMD,
  HeadingLG,
  BodyLG,
  BodyMD,
  Caption,
} from "../components/Typography";

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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
          <Head title="Загрузка статьи..." />
          <Header />
          <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <BodyLG className="text-gray-600 dark:text-gray-300">
                Загрузка статьи...
              </BodyLG>
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
          <Head
            title="Статья не найдена"
            description="Запрашиваемая статья блога не найдена"
            noindex
          />
          <Header />
          <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
            <div className="text-center max-w-md">
              <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6 mx-auto">
                <MessageCircle className="w-12 h-12 text-gray-400" />
              </div>
              <HeadingXL className="mb-4">Статья не найдена</HeadingXL>
              <BodyLG className="mb-8 text-gray-600 dark:text-gray-300">
                К сожалению, запрашиваемая статья не найдена или была удалена.
              </BodyLG>
              <Link to="/blog">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
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
      <ReadingProgress />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
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
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm">
                {breadcrumbs.map((crumb, index) => (
                  <li key={crumb.href} className="flex items-center">
                    {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                    {index === breadcrumbs.length - 1 ? (
                      <span className="font-medium text-blue-600 dark:text-blue-400">
                        {crumb.name}
                      </span>
                    ) : (
                      <Link
                        to={crumb.href}
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
          <div className="mb-8">
            <Link to="/blog">
              <Button
                variant="ghost"
                className="group text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                К блогу
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* Table of Contents - Sidebar */}
            <aside className="xl:col-span-3 order-2 xl:order-1">
              {article.tableOfContents &&
                article.tableOfContents.length > 0 && (
                  <TableOfContents
                    items={article.tableOfContents}
                    className="hidden xl:block"
                  />
                )}
            </aside>

            {/* Main Content */}
            <article className="xl:col-span-6 order-1 xl:order-2">
              {/* Hero Image */}
              <div className="relative mb-12">
                <EnhancedImage
                  src={article.heroImage}
                  alt={article.title}
                  aspectRatio="wide"
                  showZoom={true}
                  showShadow={true}
                  overlay={true}
                  className="w-full"
                />

                {/* Category badge overlay */}
                {category && (
                  <div className="absolute bottom-6 left-6">
                    <span
                      className={`inline-block px-4 py-2 text-white text-sm font-medium rounded-full backdrop-blur-sm ${category.color || "bg-blue-600"}`}
                    >
                      {category.name}
                    </span>
                  </div>
                )}

                {/* Views counter overlay */}
                <div className="absolute bottom-6 right-6">
                  <div className="flex items-center gap-2 bg-black/50 text-white px-3 py-2 rounded-full backdrop-blur-sm">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {article.views.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Article Header */}
              <header className="mb-12">
                <DisplayLG className="mb-6 leading-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  {article.title}
                </DisplayLG>

                <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-8">
                  {author && (
                    <div className="flex items-center gap-3">
                      {author.avatar && (
                        <img
                          src={author.avatar}
                          alt={author.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {author.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Автор
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{BlogAPI.formatDate(article.publishedAt)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime} мин чтения</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Coffee className="w-4 h-4" />
                    <span>Сложность: средняя</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-700 dark:text-blue-300 text-sm rounded-full border border-blue-200 dark:border-blue-700 hover:shadow-md transition-shadow"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                    <BodyMD className="font-medium text-gray-900 dark:text-white">
                      Поделиться:
                    </BodyMD>
                    {shareUrls && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
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
                          className="gap-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
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
                          className="gap-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
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
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleLike}
                      className={`gap-2 transition-all ${isLiked ? "bg-red-50 border-red-200 text-red-600" : "border-gray-200 hover:bg-gray-50"}`}
                    >
                      <Heart
                        className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`}
                      />
                      <span>{isLiked ? "Нравится" : "Мне нравится"}</span>
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleBookmark}
                      className={`gap-2 transition-all ${isBookmarked ? "bg-blue-50 border-blue-200 text-blue-600" : "border-gray-200 hover:bg-gray-50"}`}
                    >
                      <Bookmark
                        className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`}
                      />
                      <span>{isBookmarked ? "Сохранено" : "Сохранить"}</span>
                    </Button>
                  </div>
                </div>
              </header>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-gray-900 dark:prose-strong:text-white prose-img:rounded-xl prose-img:shadow-lg">
                <div
                  dangerouslySetInnerHTML={{
                    __html: BlogAPI.processContent(article.content),
                  }}
                />
              </div>

              {/* Article Footer */}
              <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
                {/* Author info */}
                {author && (
                  <div className="mb-12 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl border border-blue-100 dark:border-gray-600">
                    <div className="flex items-start gap-6">
                      {author.avatar && (
                        <img
                          src={author.avatar}
                          alt={author.name}
                          className="w-20 h-20 rounded-full object-cover shadow-lg"
                        />
                      )}
                      <div className="flex-1">
                        <HeadingMD className="mb-3 text-gray-900 dark:text-white">
                          Об авторе
                        </HeadingMD>
                        <BodyLG className="font-semibold text-gray-900 dark:text-white mb-2">
                          {author.name}
                        </BodyLG>
                        {author.bio && (
                          <BodyMD className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                            {author.bio}
                          </BodyMD>
                        )}
                        {author.socialLinks && (
                          <div className="flex gap-3">
                            {author.socialLinks.twitter && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="gap-2"
                                asChild
                              >
                                <a
                                  href={author.socialLinks.twitter}
                                  target="_blank"
                                  rel="noopener"
                                >
                                  <Twitter className="w-4 h-4" />
                                  Twitter
                                </a>
                              </Button>
                            )}
                            {author.socialLinks.linkedin && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="gap-2"
                                asChild
                              >
                                <a
                                  href={author.socialLinks.linkedin}
                                  target="_blank"
                                  rel="noopener"
                                >
                                  <Linkedin className="w-4 h-4" />
                                  LinkedIn
                                </a>
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* CTA Section */}
                <div className="mb-12 p-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white shadow-xl">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <HeadingLG className="mb-3 text-white">
                        Попробуйте mymeet.ai в действии
                      </HeadingLG>
                      <BodyLG className="text-blue-100 mb-6 leading-relaxed">
                        Начните использовать ИИ для анализа ваших встреч уже
                        сегодня. 180 минут бесплатно, кредитная карта не
                        требуется.
                      </BodyLG>
                      <div className="flex gap-4">
                        <Button
                          asChild
                          className="bg-white text-blue-600 hover:bg-blue-50"
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
                        <Button
                          asChild
                          variant="outline"
                          className="border-white text-white hover:bg-white/10"
                        >
                          <a href="/contact">Узнать больше</a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </footer>
            </article>

            {/* Related Articles Sidebar */}
            <aside className="xl:col-span-3 order-3">
              {relatedArticles.length > 0 && (
                <div className="sticky top-24">
                  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6">
                    <HeadingMD className="mb-6 text-gray-900 dark:text-white">
                      Похожие статьи
                    </HeadingMD>
                    <div className="space-y-4">
                      {relatedArticles.map((relatedArticle) => (
                        <RelatedArticleCard
                          key={relatedArticle.id}
                          article={relatedArticle}
                          variant="compact"
                        />
                      ))}
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <Link to="/blog">
                        <Button variant="outline" size="sm" className="w-full">
                          <ThumbsUp className="w-4 h-4 mr-2" />
                          Все статьи блога
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </aside>
          </div>
        </main>

        <Footer />
      </div>
    </HelmetProvider>
  );
}
