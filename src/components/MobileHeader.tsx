import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import LanguageSelector from "./LanguageSelector";
import ThemeSelector from "./ThemeSelector";
import { useLanguage } from "../contexts/LanguageContext";
import {
  Menu,
  X,
  ChevronRight,
  Calendar,
  Mic,
  BarChart3,
  Plug,
  Code,
  PenTool,
  HelpCircle,
  FileText,
  PlayCircle,
  Home,
  DollarSign,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export default function MobileHeader() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  // Закрытие меню при изменении размера экрана
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
        setActiveSubmenu(null);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  // Закрытие меню при клике на ссылку
  const handleLinkClick = () => {
    setIsOpen(false);
    setActiveSubmenu(null);
  };

  // Переключение подменю
  const toggleSubmenu = (menu: string) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  const menuItems = {
    solutions: [
      {
        href: "/solutions/transcription",
        icon: Mic,
        label: t("solutions.transcription") || "Транскрипция",
        description: "ИИ-транскрипция встреч",
      },
      {
        href: "/solutions/analysis",
        icon: BarChart3,
        label: t("solutions.analysis") || "Анализ",
        description: "Умный анализ встреч",
      },
      {
        href: "/solutions/integrations",
        icon: Plug,
        label: t("solutions.integration") || "Интеграции",
        description: "Подключение к вашим инструментам",
      },
      {
        href: "/solutions/api",
        icon: Code,
        label: t("solutions.api") || "API",
        description: "Для разработчиков",
      },
    ],
    resources: [
      {
        href: "/blog",
        icon: PenTool,
        label: t("resources.blog") || "Блог",
        description: "Статьи и советы",
      },
      {
        href: "/help",
        icon: HelpCircle,
        label: t("resources.helpCenter") || "Помощь",
        description: "Центр поддержки",
      },
      {
        href: "/docs",
        icon: FileText,
        label: t("resources.documentation") || "Документация",
        description: "Техническая документация",
      },
      {
        href: "/tutorials",
        icon: PlayCircle,
        label: t("resources.tutorials") || "Уроки",
        description: "Видео и руководства",
      },
    ],
  };

  return (
    <>
      {/* Desktop Header - скрыт на мобильных */}
      <header className="hidden md:block bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center flex-1">
              <a href="/" className="flex items-center gap-2">
                <img
                  src="https://framerusercontent.com/images/Mcs1qDPkdgWKjbdQ985Mr4CXq7U.png"
                  alt="Notetaker"
                  className="h-8 w-auto"
                />
              </a>
            </div>

            {/* Navigation - остается как было */}
            <nav className="flex items-center">
              {/* ... Ваше существующее меню для desktop */}
            </nav>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <LanguageSelector />
              <ThemeSelector />
              <div className="w-2" />
              <Button variant="ghost" size="sm" asChild>
                <a
                  href="https://app.notetaker.ru/"
                  target="_blank"
                  rel="noopener"
                >
                  {t("header.login")}
                </a>
              </Button>
              <Button
                size="sm"
                className="bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200"
                asChild
              >
                <a href="/contact" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {t("header.bookDemo")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50 transition-colors">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <img
                src="https://framerusercontent.com/images/Mcs1qDPkdgWKjbdQ985Mr4CXq7U.png"
                alt="Notetaker"
                className="h-8 w-auto"
              />
              <span className="font-bold text-lg text-gray-900 dark:text-white">
                notetaker.ru
              </span>
            </a>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2">
              {/* Theme & Language in compact form */}
              <div className="flex items-center gap-1">
                <LanguageSelector />
                <ThemeSelector />
              </div>

              {/* Hamburger Menu */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="touch-target mobile-touch-optimization p-2"
                  >
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Открыть меню</span>
                  </Button>
                </SheetTrigger>

                <SheetContent
                  side="right"
                  className="w-full sm:w-80 p-0 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700"
                >
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2">
                        <img
                          src="https://framerusercontent.com/images/Mcs1qDPkdgWKjbdQ985Mr4CXq7U.png"
                          alt="Notetaker"
                          className="h-6 w-auto"
                        />
                        <span className="font-semibold text-gray-900 dark:text-white">
                          notetaker.ru
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsOpen(false)}
                        className="touch-target mobile-touch-optimization p-2"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto p-4">
                      <div className="space-y-2">
                        {/* Home */}
                        <a
                          href="/"
                          onClick={handleLinkClick}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mobile-touch-optimization"
                        >
                          <Home className="h-5 w-5 text-blue-600" />
                          <span className="font-medium text-gray-900 dark:text-white">
                            Главная
                          </span>
                        </a>

                        {/* Solutions */}
                        <div>
                          <button
                            onClick={() => toggleSubmenu("solutions")}
                            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mobile-touch-optimization"
                          >
                            <div className="flex items-center gap-3">
                              <Sparkles className="h-5 w-5 text-blue-600" />
                              <span className="font-medium text-gray-900 dark:text-white">
                                {t("header.solutions") || "Решения"}
                              </span>
                            </div>
                            <ChevronRight
                              className={`h-4 w-4 text-gray-400 transition-transform ${
                                activeSubmenu === "solutions" ? "rotate-90" : ""
                              }`}
                            />
                          </button>

                          {activeSubmenu === "solutions" && (
                            <div className="ml-8 mt-2 space-y-1 mobile-fade-in">
                              {menuItems.solutions.map((item) => (
                                <a
                                  key={item.href}
                                  href={item.href}
                                  onClick={handleLinkClick}
                                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors mobile-touch-optimization"
                                >
                                  <item.icon className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <div className="font-medium text-gray-900 dark:text-white text-sm">
                                      {item.label}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                      {item.description}
                                    </div>
                                  </div>
                                </a>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Resources */}
                        <div>
                          <button
                            onClick={() => toggleSubmenu("resources")}
                            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mobile-touch-optimization"
                          >
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-blue-600" />
                              <span className="font-medium text-gray-900 dark:text-white">
                                {t("header.resources") || "Ресурсы"}
                              </span>
                            </div>
                            <ChevronRight
                              className={`h-4 w-4 text-gray-400 transition-transform ${
                                activeSubmenu === "resources" ? "rotate-90" : ""
                              }`}
                            />
                          </button>

                          {activeSubmenu === "resources" && (
                            <div className="ml-8 mt-2 space-y-1 mobile-fade-in">
                              {menuItems.resources.map((item) => (
                                <a
                                  key={item.href}
                                  href={item.href}
                                  onClick={handleLinkClick}
                                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors mobile-touch-optimization"
                                >
                                  <item.icon className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <div className="font-medium text-gray-900 dark:text-white text-sm">
                                      {item.label}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                      {item.description}
                                    </div>
                                  </div>
                                </a>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Pricing */}
                        <a
                          href="#pricing"
                          onClick={handleLinkClick}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mobile-touch-optimization"
                        >
                          <DollarSign className="h-5 w-5 text-blue-600" />
                          <span className="font-medium text-gray-900 dark:text-white">
                            {t("header.pricing") || "Тарифы"}
                          </span>
                        </a>
                      </div>
                    </nav>

                    {/* Footer Actions */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                      {/* Login Button */}
                      <Button
                        variant="outline"
                        className="w-full btn-mobile btn-mobile-secondary mobile-touch-optimization"
                        asChild
                      >
                        <a
                          href="https://app.notetaker.ru/"
                          target="_blank"
                          rel="noopener"
                          onClick={handleLinkClick}
                          className="flex items-center gap-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          {t("header.login") || "Войти"}
                        </a>
                      </Button>

                      {/* Demo Button */}
                      <Button
                        className="w-full btn-mobile btn-mobile-primary mobile-touch-optimization"
                        asChild
                      >
                        <a
                          href="/contact"
                          onClick={handleLinkClick}
                          className="flex items-center gap-2"
                        >
                          <Calendar className="h-4 w-4" />
                          {t("header.bookDemo") || "Записаться на демо"}
                        </a>
                      </Button>

                      {/* Contact Info */}
                      <div className="pt-3 text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          © 2024 notetaker.ru
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          ИИ для умных встреч
                        </p>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
