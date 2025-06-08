import { Link } from "react-router-dom";
import { Clock, Eye, Calendar } from "lucide-react";
import { BlogPost } from "../lib/database";
import BlogAPI from "../lib/blog-api";
import { cn } from "../lib/utils";

interface RelatedArticleCardProps {
  article: BlogPost;
  className?: string;
  variant?: "compact" | "featured";
}

export default function RelatedArticleCard({
  article,
  className,
  variant = "compact",
}: RelatedArticleCardProps) {
  if (variant === "featured") {
    return (
      <Link
        to={`/blog/${article.slug}`}
        className={cn(
          "group block bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700",
          className,
        )}
      >
        <div className="relative aspect-video overflow-hidden">
          <img
            src={article.heroImage}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 text-white/90 text-sm mb-2">
              <Clock className="w-4 h-4" />
              <span>{article.readTime} мин</span>
              <Eye className="w-4 h-4 ml-2" />
              <span>{article.views}</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2 mb-3">
            {article.title}
          </h3>

          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <Calendar className="w-3 h-3" />
              <span>{BlogAPI.formatDateRelative(article.publishedAt)}</span>
            </div>

            <div className="flex flex-wrap gap-1">
              {article.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/blog/${article.slug}`}
      className={cn(
        "group block p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200",
        className,
      )}
    >
      <div className="flex gap-4">
        <div className="relative w-20 h-16 flex-shrink-0 rounded-lg overflow-hidden">
          <img
            src={article.heroImage}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">
            {BlogAPI.formatDateRelative(article.publishedAt)}
          </div>

          <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2 text-sm mb-2">
            {article.title}
          </h4>

          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{article.readTime} мин</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{article.views}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
