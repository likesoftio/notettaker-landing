import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import LanguageSelector from "./LanguageSelector";
import ThemeSelector from "./ThemeSelector";
import { useLanguage } from "../contexts/LanguageContext";
import {
  Menu,
  X,
  ChevronRight,
  ChevronDown,
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

export default function HeaderMobile() {
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
      {/* Desktop Header */}
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

            {/* Navigation */}
            <nav className="flex items-center">
              {/* Solutions Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-normal"
                  >
                    {t("header.solutions") || "Решения"}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {menuItems.solutions.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <a
                        href={item.href}
                        className="w-full flex items-center gap-3"
                      >
                        <item.icon className="h-4 w-4 text-gray-600" />
                        {item.label}
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Resources Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-normal"
                  >
                    {t("header.resources") || "Ресурсы"}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {menuItems.resources.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <a
                        href={item.href}
                        className="w-full flex items-center gap-3"
                      >
                        <item.icon className="h-4 w-4 text-gray-600" />
                        {item.label}
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Pricing Link */}
              <Button variant="ghost" asChild>
                <a
                  href="#pricing"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-normal"
                >
                  {t("header.pricing") || "Тарифы"}
                </a>
              </Button>
            </nav>

            {/* Controls and Action Buttons */}
            <div className="flex items-center gap-2">
              <LanguageSelector />
              <ThemeSelector />

              {/* Spacer */}
              <div className="w-2" />

              {/* Login Button */}
              <Button variant="ghost" size="sm" asChild>
                <a
                  href="https://app.notetaker.ru/"
                  target="_blank"
                  rel="noopener"
                >
                  {t("header.login") || "Войти"}
                </a>
              </Button>

              {/* Book Demo Button */}
              <Button
                size="sm"
                className="bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200"
                asChild
              >
                <a href="/contact" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {t("header.bookDemo") || "Записаться на демо"}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden bg-white/98 dark:bg-gray-900/98 backdrop-blur-xl border-b border-gray-200/80 dark:border-gray-700/80 sticky top-0 z-50 transition-colors">
        <div className="px-3 py-2.5">
          <div className="flex items-center justify-between">
            {/* Mobile Logo - только иконка */}
            <a href="/" className="flex items-center">
              <img
                src="https://framerusercontent.com/images/Mcs1qDPkdgWKjbdQ985Mr4CXq7U.png"
                alt="notetaker.ru"
                className="w-10 h-10"
              />
            </a>

            {/* Mobile Controls */}
            <div className="flex items-center gap-1">
              {/* Компактные селекторы */}
              <div className="flex items-center">
                <div className="scale-90">
                  <ThemeSelector />
                </div>
              </div>

              {/* Hamburger Menu */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-10 h-10 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Открыть меню</span>
                  </Button>
                </SheetTrigger>

                <SheetContent
                  side="right"
                  className="w-full sm:w-80 p-0 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700"
                >
                  <div className="flex flex-col h-full">
                    {/* Menu Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <img
                            src="https://framerusercontent.com/images/Mcs1qDPkdgWKjbdQ985Mr4CXq7U.png"
                            alt="notetaker.ru"
                            className="w-5 h-5"
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white text-sm">
                            notetaker.ru
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            ИИ для встреч
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsOpen(false)}
                        className="w-8 h-8 p-0 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto p-3">
                      <div className="space-y-1">
                        {/* Home */}
                        <a
                          href="/"
                          onClick={handleLinkClick}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-white"
                        >
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                            <Home className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="font-medium">Главная</span>
                        </a>

                        {/* Solutions */}
                        <div>
                          <button
                            onClick={() => toggleSubmenu("solutions")}
                            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-white"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                                <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                              </div>
                              <span className="font-medium">
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
                            <div className="ml-11 mt-1 space-y-1">
                              {menuItems.solutions.map((item) => (
                                <a
                                  key={item.href}
                                  href={item.href}
                                  onClick={handleLinkClick}
                                  className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-gray-700 dark:text-gray-300"
                                >
                                  <item.icon className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <div className="font-medium text-sm">
                                      {item.label}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
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
                            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-white"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                <FileText className="h-4 w-4 text-green-600 dark:text-green-400" />
                              </div>
                              <span className="font-medium">
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
                            <div className="ml-11 mt-1 space-y-1">
                              {menuItems.resources.map((item) => (
                                <a
                                  key={item.href}
                                  href={item.href}
                                  onClick={handleLinkClick}
                                  className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-gray-700 dark:text-gray-300"
                                >
                                  <item.icon className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <div className="font-medium text-sm">
                                      {item.label}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
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
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-white"
                        >
                          <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                            <DollarSign className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                          </div>
                          <span className="font-medium">
                            {t("header.pricing") || "Тарифы"}
                          </span>
                        </a>
                      </div>
                    </nav>

                    {/* Footer Actions */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                      <div className="space-y-2">
                        {/* Login Button */}
                        <Button
                          variant="outline"
                          className="w-full justify-center text-sm font-medium"
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
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium"
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
                      </div>

                      {/* Language selector at bottom */}
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                        <div className="flex justify-center">
                          <LanguageSelector />
                        </div>
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
