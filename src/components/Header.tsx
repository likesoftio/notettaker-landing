import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import LanguageSelector from "./LanguageSelector";
import ThemeSelector from "./ThemeSelector";
import { DesktopLogo } from "./Logo";
import MobileHeader from "./mobile/MobileHeader";
import { useLanguage } from "../contexts/LanguageContext";
import {
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
} from "lucide-react";

export default function Header() {
  const { t } = useLanguage();

  const menuItems = {
    solutions: [
      {
        href: "/solutions/transcription",
        icon: Mic,
        label: t("solutions.transcription") || "Транскрипция",
      },
      {
        href: "/solutions/analysis",
        icon: BarChart3,
        label: t("solutions.analysis") || "Анализ",
      },
      {
        href: "/solutions/integrations",
        icon: Plug,
        label: t("solutions.integration") || "Интеграции",
      },
      {
        href: "/solutions/api",
        icon: Code,
        label: t("solutions.api") || "API",
      },
    ],
    resources: [
      {
        href: "/blog",
        icon: PenTool,
        label: t("resources.blog") || "Блог",
      },
      // {
      //   href: "/help",
      //   icon: HelpCircle,
      //   label: t("resources.helpCenter") || "Помощь",
      // },
      // {
      //   href: "/docs",
      //   icon: FileText,
      //   label: t("resources.documentation") || "Документация",
      // },
      // {
      //   href: "/tutorials",
      //   icon: PlayCircle,
      //   label: t("resources.tutorials") || "Уроки",
      // },
    ],
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:block bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            {/* Desktop Logo */}
            <div className="flex items-center flex-1">
              <a href="/" className="flex items-center gap-2">
                <DesktopLogo />
              </a>
            </div>

            {/* Navigation */}
            <nav className="flex items-center">
              {/* Solutions Dropdown */}
              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-normal"
                  >
                    {t("header.solutions") || "Решения"}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  side="bottom"
                  className="w-56 mt-2 shadow-lg border-gray-200 dark:border-gray-700"
                >
                  {menuItems.solutions.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <a
                        href={item.href}
                        className="w-full flex items-center gap-3 cursor-pointer"
                      >
                        <item.icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        {item.label}
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu> */}

              {/* Resources Dropdown */}
              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-normal"
                  >
                    {t("header.resources") || "Ресурсы"}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  side="bottom"
                  className="w-56 mt-2 shadow-lg border-gray-200 dark:border-gray-700"
                >
                  {menuItems.resources.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <a
                        href={item.href}
                        className="w-full flex items-center gap-3 cursor-pointer"
                      >
                        <item.icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        {item.label}
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu> */}

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
              {/* <Button variant="ghost" size="sm" asChild>
                <a
                  href="https://app.notetaker.ru/"
                  target="_blank"
                  rel="noopener"
                >
                  {t("header.login") || "Войти"}
                </a>
              </Button> */}

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
      <MobileHeader />
    </>
  );
}
