import { Helmet } from "react-helmet-async";

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  locale?: string;
  siteName?: string;
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  noindex?: boolean;
  nofollow?: boolean;
  canonical?: string;
  alternateLanguages?: Array<{ lang: string; href: string }>;
  structuredData?: Record<string, any>;
}

const DEFAULT_SEO = {
  siteName: "notetaker.ru - ИИ для анализа встреч",
  title: "notetaker.ru - Умная транскрипция и анализ встреч с помощью ИИ",
  description:
    "Превратите любую встречу в структурированные инсайты с помощью искусственного интеллекта. Автоматическая транскрипция, анализ задач и принятых решений. Поддержка 73 языков.",
  keywords: [
    "транскрипция встреч",
    "ИИ анализ",
    "искусственный интеллект",
    "автоматические протоколы",
    "распознавание речи",
    "анализ совещаний",
    "мымит ai",
    "notetaker ru",
  ],
  image: "https://notetaker.ru/og-image.jpg",
  url: "https://notetaker.ru",
  locale: "ru_RU",
  twitterCard: "summary_large_image" as const,
};

export default function Head({
  title,
  description = DEFAULT_SEO.description,
  keywords = DEFAULT_SEO.keywords,
  image = DEFAULT_SEO.image,
  url = DEFAULT_SEO.url,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  section,
  tags,
  locale = DEFAULT_SEO.locale,
  siteName = DEFAULT_SEO.siteName,
  twitterCard = DEFAULT_SEO.twitterCard,
  noindex = false,
  nofollow = false,
  canonical,
  alternateLanguages,
  structuredData,
}: SEOProps) {
  // Construct full title
  const fullTitle = title ? `${title} | ${siteName}` : DEFAULT_SEO.title;

  // Construct canonical URL
  const canonicalUrl = canonical || url;

  // Generate robots meta content
  const robots = [
    noindex ? "noindex" : "index",
    nofollow ? "nofollow" : "follow",
  ].join(", ");

  // Generate structured data for articles
  const articleStructuredData = type === "article" && {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    author: {
      "@type": "Person",
      name: author || "notetaker.ru Team",
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: {
        "@type": "ImageObject",
        url: "https://notetaker.ru/logo.png",
      },
    },
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    image: image,
    url: canonicalUrl,
    articleSection: section,
    keywords: tags?.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };

  // Organization structured data
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "notetaker.ru",
    description: "ИИ платформа для анализа и транскрипции встреч",
    url: "https://notetaker.ru",
    logo: "https://notetaker.ru/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+7-xxx-xxx-xxxx",
      contactType: "customer service",
      availableLanguage: ["Russian", "English"],
    },
    sameAs: [
      "https://twitter.com/mymeetai",
      "https://linkedin.com/company/mymeetai",
    ],
  };

  // Website structured data
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    description,
    url: DEFAULT_SEO.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${DEFAULT_SEO.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  // Software application structured data
  const softwareStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "notetaker.ru",
    description:
      "ИИ платформа для анализа встреч и автоматической транскрипции",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      priceCurrency: "RUB",
      price: "0",
      description: "180 минут бесплатно, затем от 680₽/месяц",
    },
    featureList: [
      "Автоматическая транскрипция на 73 языках",
      "ИИ-анализ встреч и выделение ключевых моментов",
      "Интеграция с Zoom, Google Meet, Microsoft Teams",
      "Автоматическое создание протоколов и задач",
      "Корпоративный уровень безопасности",
    ],
    screenshot: image,
    url: DEFAULT_SEO.url,
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta name="robots" content={robots} />
      <meta name="language" content={locale} />
      <meta name="author" content={author || "notetaker.ru Team"} />

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Alternate Languages */}
      {alternateLanguages?.map(({ lang, href }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={href} />
      ))}

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />

      {/* Article specific Open Graph tags */}
      {type === "article" && (
        <>
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags?.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@mymeetai" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationStructuredData)}
      </script>

      {type === "website" && (
        <>
          <script type="application/ld+json">
            {JSON.stringify(websiteStructuredData)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(softwareStructuredData)}
          </script>
        </>
      )}

      {type === "article" && articleStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(articleStructuredData)}
        </script>
      )}

      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}

      {/* Additional Meta Tags for Better SEO */}
      <meta name="theme-color" content="#2563eb" />
      <meta name="msapplication-TileColor" content="#2563eb" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, viewport-fit=cover"
      />

      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="dns-prefetch" href="https://app.notetaker.ru" />
    </Helmet>
  );
}
