import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import LanguageSelector from "../LanguageSelector";
import ThemeSelector from "../ThemeSelector";
import { MobileLogo } from "../Logo";
import { MobileNavigation } from "./MobileNavigation";
import { useLanguage } from "../../contexts/LanguageContext";
import { Menu } from "lucide-react";

interface MobileHeaderProps {
  className?: string;
  showBorder?: boolean;
}

export default function MobileHeader({
  className = "",
  showBorder = true,
}: MobileHeaderProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  // Закрытие меню при изменении размера экрана
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  // Закрытие меню при клике на ссылку
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header
      className={`
        md:hidden 
        bg-white/98 dark:bg-gray-900/98 
        backdrop-blur-xl 
        ${showBorder ? "border-b border-gray-200/80 dark:border-gray-700/80" : ""} 
        sticky top-0 z-50 
        transition-colors
        ${className}
      `}
    >
      <div className="px-3 py-2.5">
        <div className="flex items-center justify-between">
          {/* Mobile Logo */}
          <a href="/" className="flex items-center">
            <MobileLogo />
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
                <MobileNavigation onLinkClick={handleLinkClick} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
