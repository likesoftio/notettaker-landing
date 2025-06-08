// Sitemap generator for SEO
import BlogAPI from "./blog-api-switcher";

export interface SitemapUrl {
  url: string;
  lastModified?: string;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
}

export class SitemapGenerator {
  private baseUrl: string;

  constructor(baseUrl: string = "https://notetaker.ru") {
    this.baseUrl = baseUrl.replace(/\/$/, ""); // Remove trailing slash
  }

  // Generate sitemap URLs for all pages
  async generateSitemap(): Promise<SitemapUrl[]> {
    const urls: SitemapUrl[] = [];

    // Static pages
    urls.push(
      {
        url: this.baseUrl,
        changeFrequency: "weekly",
        priority: 1.0,
      },
      {
        url: `${this.baseUrl}/blog`,
        changeFrequency: "daily",
        priority: 0.9,
      },
      {
        url: `${this.baseUrl}/contact`,
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: `${this.baseUrl}/terms-and-conditions`,
        changeFrequency: "yearly",
        priority: 0.3,
      },
      {
        url: `${this.baseUrl}/privacy-policy`,
        changeFrequency: "yearly",
        priority: 0.3,
      },
      {
        url: `${this.baseUrl}/oferta`,
        changeFrequency: "yearly",
        priority: 0.3,
      },
    );

    // Blog posts
    try {
      const posts = await BlogAPI.getPublishedPosts();
      const categories = await BlogAPI.getAllCategories();

      // Add blog posts
      posts.forEach((post) => {
        urls.push({
          url: `${this.baseUrl}/blog/${post.slug}`,
          lastModified: post.updatedAt,
          changeFrequency: "monthly",
          priority: post.featured ? 0.8 : 0.7,
        });
      });

      // Add category pages
      categories.forEach((category) => {
        if (category.postCount > 0) {
          urls.push({
            url: `${this.baseUrl}/blog/category/${category.slug}`,
            changeFrequency: "weekly",
            priority: 0.6,
          });
        }
      });
    } catch (error) {
      console.error("Error generating blog URLs for sitemap:", error);
    }

    return urls;
  }

  // Generate XML sitemap
  async generateXmlSitemap(): Promise<string> {
    const urls = await this.generateSitemap();

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    urls.forEach((urlData) => {
      xml += "  <url>\n";
      xml += `    <loc>${urlData.url}</loc>\n`;

      if (urlData.lastModified) {
        xml += `    <lastmod>${new Date(urlData.lastModified).toISOString().split("T")[0]}</lastmod>\n`;
      }

      if (urlData.changeFrequency) {
        xml += `    <changefreq>${urlData.changeFrequency}</changefreq>\n`;
      }

      if (urlData.priority !== undefined) {
        xml += `    <priority>${urlData.priority.toFixed(1)}</priority>\n`;
      }

      xml += "  </url>\n";
    });

    xml += "</urlset>";
    return xml;
  }

  // Generate robots.txt content
  generateRobotsTxt(): string {
    return `User-agent: *
Allow: /

# Blog
Allow: /blog/
Allow: /blog/*

# Static pages
Allow: /contact
Allow: /terms-and-conditions
Allow: /privacy-policy
Allow: /oferta

# Disallow admin pages
Disallow: /admin/
Disallow: /admin/*

# Sitemap
Sitemap: ${this.baseUrl}/sitemap.xml

# Crawl delay
Crawl-delay: 1`;
  }

  // Generate JSON-LD structured data for the website
  generateWebsiteStructuredData() {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "notetaker.ru",
      description: "ИИ платформа для анализа и транскрипции встреч",
      url: this.baseUrl,
      publisher: {
        "@type": "Organization",
        name: "notetaker.ru",
        logo: {
          "@type": "ImageObject",
          url: `${this.baseUrl}/logo.png`,
        },
      },
      potentialAction: {
        "@type": "SearchAction",
        target: `${this.baseUrl}/blog?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
      sameAs: [
        "https://twitter.com/mymeetai",
        "https://linkedin.com/company/mymeetai",
      ],
    };
  }

  // Save sitemap to public directory (for build process)
  async saveSitemap(outputPath: string = "public/sitemap.xml"): Promise<void> {
    const xml = await this.generateXmlSitemap();

    // In a real application, you would write to file system
    // For demo purposes, we'll log it
    console.log("Generated sitemap.xml:", xml);

    // Also save robots.txt
    const robotsTxt = this.generateRobotsTxt();
    console.log("Generated robots.txt:", robotsTxt);
  }
}

// Export singleton instance
export const sitemapGenerator = new SitemapGenerator();

// Utility functions for SEO
export const SEOUtils = {
  // Generate canonical URL
  generateCanonicalUrl(
    path: string,
    baseUrl: string = "https://notetaker.ru",
  ): string {
    return `${baseUrl.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
  },

  // Generate Open Graph image URL
  generateOGImage(
    title: string,
    baseUrl: string = "https://mymeet.ai",
  ): string {
    // In a real application, this could generate dynamic OG images
    // For now, return a default image
    return `${baseUrl}/og-image.jpg`;
  },

  // Generate meta description from content
  generateMetaDescription(content: string, maxLength: number = 160): string {
    const plainText = content.replace(/<[^>]*>/g, "").trim();

    if (plainText.length <= maxLength) {
      return plainText;
    }

    const truncated = plainText.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");

    return lastSpace > 0
      ? truncated.substring(0, lastSpace) + "..."
      : truncated + "...";
  },

  // Validate meta tags
  validateSEOData(data: {
    title?: string;
    description?: string;
    keywords?: string[];
  }): { valid: boolean; warnings: string[] } {
    const warnings: string[] = [];

    if (!data.title) {
      warnings.push("Отсутствует заголовок страницы");
    } else if (data.title.length > 60) {
      warnings.push(
        `Заголовок слишком длинный (${data.title.length} символов). Рекомендуется до 60.`,
      );
    } else if (data.title.length < 30) {
      warnings.push(
        `Заголовок слишком короткий (${data.title.length} символов). Рекомендуется от 30.`,
      );
    }

    if (!data.description) {
      warnings.push("Отсутствует описание страницы");
    } else if (data.description.length > 160) {
      warnings.push(
        `Описани�� слишком длинное (${data.description.length} символов). Рекомендуется до 160.`,
      );
    } else if (data.description.length < 120) {
      warnings.push(
        `Описание слишком короткое (${data.description.length} символов). Рекомендуется от 120.`,
      );
    }

    if (!data.keywords || data.keywords.length === 0) {
      warnings.push("Отсутствуют ключевые слова");
    } else if (data.keywords.length > 10) {
      warnings.push(
        `Слишком много ключевых слов (${data.keywords.length}). Рекомендуется до 10.`,
      );
    }

    return {
      valid: warnings.length === 0,
      warnings,
    };
  },
};

export default SitemapGenerator;
