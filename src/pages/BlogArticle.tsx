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
} from "lucide-react";
import BlogAPI from "../lib/blog-api";
import { BlogPost, BlogCategory, BlogAuthor } from "../lib/database";
import {
  DisplayLG,
  HeadingXL,
  HeadingMD,
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
  const [activeSection, setActiveSection] = useState("");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (slug) {
      loadArticle(slug);
    }
  }, [slug]);

  // Track scroll position for table of contents
  useEffect(() => {
    if (!article?.tableOfContents) return;

    const handleScroll = () => {
      const sections = article.tableOfContents
        ?.map((item) => document.getElementById(item.id))
        .filter(Boolean);

      if (!sections) return;

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
    };

    window.addEventListener("scroll", handleScroll);
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

  const shareUrls = article ? BlogAPI.generateSocialShareUrls(article) : null;
  const seoData = article ? BlogAPI.generateSEOData(article) : null;
  const breadcrumbs =
    article && category ? BlogAPI.generateBreadcrumbs(article, category) : [];

  if (loading) {
    return (
      <HelmetProvider>
        <div className="page-container">
          <Head title="Загрузка статьи..." />
          <Header />
          <div className="page-main flex items-center justify-center">
            <BodyLG>Загрузка статьи...</BodyLG>
          </div>
          <Footer />
        </div>
      </HelmetProvider>
    );
  }

  if (notFound || !article) {
    return (
      <HelmetProvider>
        <div className="page-container">
          <Head
            title="Статья не найдена"
            description="Запрашиваемая статья блога не найдена"
            noindex
          />
          <Header />
          <div className="page-main flex items-center justify-center">
            <div className="text-center">
              <HeadingXL className="mb-4">Статья не найдена</HeadingXL>
              <BodyLG className="mb-6">
                К сожалению, запрашиваемая статья не найдена или была удалена.
              </BodyLG>
              <Link to="/blog">
                <Button>
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
      <div className="page-container">
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

        <main className="page-main">
          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <nav className="mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                {breadcrumbs.map((crumb, index) => (
                  <li key={crumb.href} className="flex items-center">
                    {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                    {index === breadcrumbs.length - 1 ? (
                      <Caption className="font-medium">{crumb.name}</Caption>
                    ) : (
                      <Link to={crumb.href}>
                        <Caption className="hover:text-blue-600 dark:hover:text-blue-400">
                          {crumb.name}
                        </Caption>
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
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />К блогу
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <article className="lg:col-span-3">
              {/* Hero Image */}
              <div className="relative mb-8 rounded-lg overflow-hidden">
                <img
                  src={article.heroImage}
                  alt={article.title}
                  className="w-full h-48 sm:h-64 lg:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                  {category && (
                    <span className="inline-block px-3 py-1 bg-blue-600 text-white text-caption font-medium rounded-full mb-2">
                      {category.name}
                    </span>
                  )}
                </div>
                <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
                  <div className="flex items-center gap-1 bg-black/50 text-white px-3 py-1 rounded-full">
                    <Eye className="w-4 h-4" />
                    <Caption className="text-white">
                      {article.views} просмотров
                    </Caption>
                  </div>
                </div>
              </div>

              {/* Article Header */}
              <div className="mb-8">
                <DisplayLG className="mb-6">{article.title}</DisplayLG>

                {/* Meta information */}
                <div className="flex flex-wrap items-center gap-6 text-caption text-gray-600 dark:text-gray-400 mb-6">
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
                      className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-caption rounded-full"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Social sharing */}
                {shareUrls && (
                  <div className="flex items-center gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
                    <BodyMD className="font-medium text-gray-900 dark:text-white">
                      Поделиться:
                    </BodyMD>
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
                )}
              </div>

              {/* Article Content */}
              <div
                className="prose-content"
                dangerouslySetInnerHTML={{
                  __html: BlogAPI.processContent(article.content),
                }}
              />

              {/* Author info */}
              {author && (
                <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-start gap-4">
                    {author.avatar && (
                      <img
                        src={author.avatar}
                        alt={author.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <HeadingMD className="mb-2">Об авторе</HeadingMD>
                      <BodyMD className="font-medium text-gray-900 dark:text-white mb-1">
                        {author.name}
                      </BodyMD>
                      {author.bio && (
                        <BodyMD className="text-gray-600 dark:text-gray-300 mb-3">
                          {author.bio}
                        </BodyMD>
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
                </div>
              )}

              {/* AI Assistant Widget */}
              <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <HeadingMD className="mb-2">
                      Попробуйте mymeet.ai бесплатно
                    </HeadingMD>
                    <BodyMD className="text-gray-600 dark:text-gray-300 mb-4">
                      Начните использовать ИИ для анализа ваших встреч уже
                      сегодня. 180 минут бесплатно, не требуется карта.
                    </BodyMD>
                    <div className="flex gap-3">
                      <Button asChild className="button-primary">
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
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              {/* Table of Contents */}
              {article.tableOfContents &&
                article.tableOfContents.length > 0 && (
                  <div className="card-base p-6 mb-8 sticky top-8">
                    <HeadingMD className="mb-4">Содержание</HeadingMD>
                    <nav className="space-y-2">
                      {article.tableOfContents.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className={`block text-body-md py-2 px-3 rounded transition-colors ${
                            activeSection === item.id
                              ? "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 font-medium"
                              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                          style={{ paddingLeft: `${item.level * 8 + 12}px` }}
                        >
                          {item.title}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}

              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <div className="card-base p-6">
                  <HeadingMD className="mb-4">Похожие статьи</HeadingMD>
                  <div className="space-y-4">
                    {relatedArticles.map((relatedArticle) => (
                      <Link
                        key={relatedArticle.id}
                        to={`/blog/${relatedArticle.slug}`}
                        className="block group"
                      >
                        <div className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          <div className="flex gap-3">
                            <img
                              src={relatedArticle.heroImage}
                              alt={relatedArticle.title}
                              className="w-16 h-12 object-cover rounded flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <Caption className="text-blue-600 dark:text-blue-400 font-medium mb-1">
                                {BlogAPI.formatDateRelative(
                                  relatedArticle.publishedAt,
                                )}
                              </Caption>
                              <BodyMD className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                {relatedArticle.title}
                              </BodyMD>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Link to="/blog">
                      <Button variant="outline" size="sm" className="w-full">
                        Все статьи блога
                      </Button>
                    </Link>
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
