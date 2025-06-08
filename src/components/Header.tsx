import { Button } from "./ui/button";
import LanguageSelector from "./LanguageSelector";
import ThemeSelector from "./ThemeSelector";
import { useLanguage } from "../contexts/LanguageContext";

export default function Header() {
  const { t } = useLanguage();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <img
                src="https://framerusercontent.com/images/Mcs1qDPkdgWKjbdQ985Mr4CXq7U.png"
                alt="Notetaker"
                className="h-8 w-auto"
              />
            </a>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#howitworks"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
            >
              {t("header.howItWorks")}
            </a>
            <a
              href="#pricing"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
            >
              {t("header.pricing")}
            </a>
            <a
              href="/blog"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
            >
              {t("header.blog")}
            </a>
            <a
              href="#faq"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
            >
              {t("header.faq")}
            </a>
          </nav>

          {/* Controls and Action Buttons */}
          <div className="flex items-center space-x-3">
            <LanguageSelector />
            <ThemeSelector />
            <Button variant="outline" size="sm" asChild>
              <a
                href="https://app.notetaker.ru/"
                target="_blank"
                rel="noopener"
              >
                {t("header.addFile")}
              </a>
            </Button>
            <Button size="sm" asChild>
              <a
                href="https://app.notetaker.ru/"
                target="_blank"
                rel="noopener"
              >
                {t("header.login")}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
