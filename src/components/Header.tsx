import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import LanguageSelector from "./LanguageSelector";
import ThemeSelector from "./ThemeSelector";
import { useLanguage } from "../contexts/LanguageContext";
import { ChevronDown, Calendar } from "lucide-react";

export default function Header() {
  const { t } = useLanguage();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors">
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
          <nav className="hidden md:flex items-center">
            {/* Solutions Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-normal"
                >
                  {t("header.solutions")}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem asChild>
                  <a href="/solutions/transcription" className="w-full">
                    {t("solutions.transcription")}
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/solutions/analysis" className="w-full">
                    {t("solutions.analysis")}
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/solutions/integrations" className="w-full">
                    {t("solutions.integration")}
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/solutions/api" className="w-full">
                    {t("solutions.api")}
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Resources Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-normal"
                >
                  {t("header.resources")}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem asChild>
                  <a href="/blog" className="w-full">
                    {t("resources.blog")}
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/help" className="w-full">
                    {t("resources.helpCenter")}
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/docs" className="w-full">
                    {t("resources.documentation")}
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/tutorials" className="w-full">
                    {t("resources.tutorials")}
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Pricing Link */}
            <Button variant="ghost" asChild>
              <a
                href="#pricing"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-normal"
              >
                {t("header.pricing")}
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
                {t("header.login")}
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
                {t("header.bookDemo")}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
