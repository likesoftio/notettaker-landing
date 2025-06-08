import { useState } from "react";
import { Button } from "../ui/button";
import { DesktopLogo } from "../Logo";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  Twitter,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ChevronUp,
  Heart,
} from "lucide-react";

interface MobileFooterProps {
  className?: string;
  variant?: "default" | "minimal";
}

export default function MobileFooter({
  className = "",
  variant = "default",
}: MobileFooterProps) {
  const { t } = useLanguage();
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Show/hide back to top button based on scroll
  useState(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const footerLinks = {
    company: [
      { href: "/about", label: "О нас" },
      { href: "/careers", label: "Карьера" },
      { href: "/contact", label: "Контакты" },
      { href: "/blog", label: "Блог" },
    ],
    product: [
      { href: "/features", label: "Возможности" },
      { href: "/pricing", label: "Тарифы" },
      { href: "/integrations", label: "Интеграции" },
      { href: "/api", label: "API" },
    ],
    support: [
      { href: "/help", label: "Помощь" },
      { href: "/docs", label: "Документация" },
      { href: "/tutorials", label: "Уроки" },
      { href: "/status", label: "Статус сервиса" },
    ],
    legal: [
      { href: "/terms", label: "Условия использования" },
      { href: "/privacy", label: "Политика конфиденциальности" },
      { href: "/cookies", label: "Использование файлов cookie" },
    ],
  };

  const socialLinks = [
    {
      href: "https://twitter.com/notetaker_ru",
      icon: Twitter,
      label: "Twitter",
    },
    {
      href: "https://linkedin.com/company/notetaker-ru",
      icon: Linkedin,
      label: "LinkedIn",
    },
    { href: "https://github.com/notetaker-ru", icon: Github, label: "GitHub" },
  ];

  if (variant === "minimal") {
    return (
      <footer className={`bg-gray-900 text-white py-8 ${className}`}>
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <DesktopLogo className="h-8 w-auto mx-auto brightness-0 invert" />
          </div>
          <p className="text-gray-400 text-sm mb-4">
            © 2024 notetaker.ru. Все права защищены.
          </p>
          <div className="flex justify-center space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors p-2"
              >
                <social.icon className="w-5 h-5" />
                <span className="sr-only">{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </footer>
    );
  }

  return (
    <>
      <footer className={`bg-gray-900 text-white ${className}`}>
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <DesktopLogo className="h-10 w-auto mx-auto brightness-0 invert" />
            </div>
            <p className="text-gray-300 text-sm max-w-sm mx-auto">
              Умная транскрипция и анализ встреч с помощью ИИ. Превратите каждую
              встречу в ценные инсайты.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              asChild
            >
              <a
                href="https://app.notetaker.ru/"
                target="_blank"
                rel="noopener"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Попробовать
              </a>
            </Button>
            <Button
              variant="outline"
              className="border-gray-600 text-white hover:bg-gray-800"
              asChild
            >
              <a href="/contact">
                <Mail className="w-4 h-4 mr-2" />
                Связаться
              </a>
            </Button>
          </div>

          {/* Links Sections */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="font-semibold text-white mb-3">Продукт</h3>
              <ul className="space-y-2">
                {footerLinks.product.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3">Поддержка</h3>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3">Компания</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3">Документы</h3>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-800 rounded-lg p-4 mb-8">
            <h3 className="font-semibold text-white mb-3 text-center">
              Свяжитесь с нами
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-gray-300 text-sm">
                <Mail className="w-4 h-4" />
                <a
                  href="mailto:support@notetaker.ru"
                  className="hover:text-white"
                >
                  support@notetaker.ru
                </a>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-300 text-sm">
                <Phone className="w-4 h-4" />
                <a href="tel:+78001234567" className="hover:text-white">
                  8 (800) 123-45-67
                </a>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4 mb-8">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
              >
                <social.icon className="w-5 h-5" />
                <span className="sr-only">{social.label}</span>
              </a>
            ))}
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-800 pt-6 text-center">
            <p className="text-gray-400 text-sm mb-2">
              © 2024 notetaker.ru. Все права защищены.
            </p>
            <p className="text-gray-500 text-xs flex items-center justify-center gap-1">
              Сделано с <Heart className="w-3 h-3 text-red-500" /> в России
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg z-50 p-0"
        >
          <ChevronUp className="w-5 h-5" />
          <span className="sr-only">Наверх</span>
        </Button>
      )}
    </>
  );
}
