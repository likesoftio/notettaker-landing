import { MessageCircle, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

interface MobileCTAProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function MobileCTA({
  title = "Попробуйте notetaker.ru в действии",
  description = "Начните использовать ИИ для анализа ваших встреч уже сегодня. 180 минут бесплатно, кредитная карта не требуется.",
  primaryButtonText = "Попробовать бесплатно",
  primaryButtonUrl = "https://app.notetaker.ru/",
  secondaryButtonText = "Узнать больше",
  secondaryButtonUrl = "/contact",
  icon = <MessageCircle className="w-6 h-6" />,
  className = "",
}: MobileCTAProps) {
  return (
    <div className={`mobile-cta-fixed ${className}`}>
      <div className="mobile-cta-content">
        {/* Иконка */}
        <div className="mobile-cta-icon">{icon}</div>

        {/* Контент */}
        <div className="mobile-cta-text">
          <h3 className="mobile-cta-title">{title}</h3>
          <p className="mobile-cta-description">{description}</p>
        </div>

        {/* Кнопки */}
        <div className="mobile-cta-buttons">
          <Button asChild className="mobile-cta-primary-btn">
            <a href={primaryButtonUrl} target="_blank" rel="noopener">
              <ExternalLink className="w-4 h-4 mr-2" />
              {primaryButtonText}
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            className="mobile-cta-secondary-btn"
          >
            <a href={secondaryButtonUrl}>{secondaryButtonText}</a>
          </Button>
        </div>
      </div>

      <style jsx>{`
        .mobile-cta-fixed {
          position: relative;
          width: 100%;
          max-width: 100vw;
          overflow: hidden;
          box-sizing: border-box;
        }

        .mobile-cta-content {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 16px;
          padding: 1.5rem 1rem;
          margin: 0 auto;
          max-width: calc(100vw - 2rem);
          color: white;
          text-align: center;
          box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
          position: relative;
          overflow: hidden;
        }

        .mobile-cta-content::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpolygon points='20,0 40,20 20,40 0,20'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
            repeat;
          opacity: 0.2;
        }

        .mobile-cta-icon {
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem auto;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          position: relative;
          z-index: 1;
        }

        .mobile-cta-text {
          position: relative;
          z-index: 1;
          margin-bottom: 1.5rem;
        }

        .mobile-cta-title {
          font-size: 1.25rem;
          font-weight: 800;
          line-height: 1.3;
          margin-bottom: 0.75rem;
          word-wrap: break-word;
          hyphens: auto;
        }

        .mobile-cta-description {
          font-size: 0.9rem;
          line-height: 1.4;
          opacity: 0.95;
          word-wrap: break-word;
          hyphens: auto;
          margin-bottom: 0;
        }

        .mobile-cta-buttons {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          position: relative;
          z-index: 1;
        }

        .mobile-cta-primary-btn {
          background: white;
          color: #667eea;
          font-weight: 700;
          padding: 0.875rem 1.5rem;
          border-radius: 50px;
          font-size: 0.9rem;
          border: none;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          width: 100%;
          min-height: 48px;
        }

        .mobile-cta-primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .mobile-cta-secondary-btn {
          background: transparent;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.5);
          font-weight: 600;
          padding: 0.875rem 1.5rem;
          border-radius: 50px;
          font-size: 0.9rem;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          width: 100%;
          min-height: 48px;
        }

        .mobile-cta-secondary-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.8);
        }

        /* Маленькие экраны */
        @media (max-width: 480px) {
          .mobile-cta-content {
            padding: 1.25rem 0.75rem;
            margin: 0 0.5rem;
            max-width: calc(100vw - 1rem);
            border-radius: 12px;
          }

          .mobile-cta-title {
            font-size: 1.125rem;
          }

          .mobile-cta-description {
            font-size: 0.85rem;
          }

          .mobile-cta-primary-btn,
          .mobile-cta-secondary-btn {
            font-size: 0.85rem;
            padding: 0.75rem 1.25rem;
          }
        }

        /* Очень маленькие экраны */
        @media (max-width: 360px) {
          .mobile-cta-content {
            padding: 1rem 0.5rem;
            margin: 0 0.25rem;
          }

          .mobile-cta-title {
            font-size: 1rem;
          }

          .mobile-cta-description {
            font-size: 0.8rem;
          }
        }

        /* Темная тема */
        @media (prefers-color-scheme: dark) {
          .mobile-cta-content {
            background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%);
          }

          .mobile-cta-primary-btn {
            background: #1f2937;
            color: #60a5fa;
          }
        }
      `}</style>
    </div>
  );
}
