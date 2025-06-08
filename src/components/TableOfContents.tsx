import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { ArrowIcon } from "./ModernIcons";

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
  className?: string;
}

export default function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      // Update active section
      const sections = items
        .map((item) => document.getElementById(item.id))
        .filter(Boolean);

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  if (!items || items.length === 0) return null;

  const activeIndex = items.findIndex(item => item.id === activeSection);
  const progressPercentage = activeIndex >= 0 ? ((activeIndex + 1) / items.length) * 100 : 0;

  return (
    <nav className={cn("space-y-1", className)}>
      {items.map((item, index) => (
        <button
          key={item.id}
          onClick={() => handleClick(item.id)}
          className={cn(
            "group flex items-center w-full text-left py-3 px-4 rounded-xl transition-all duration-300",
            "hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:shadow-md hover-float",
            activeSection === item.id
              ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105"
              : "text-gray-600 dark:text-gray-300"
          )}
          style={{
            paddingLeft: `${item.level * 16 + 16}px`,
            animationDelay: `${index * 50}ms`
          }}
        >
          <ArrowIcon
            direction="right"
            size="xs"
            className={cn(
              "mr-3 transition-all duration-300",
              activeSection === item.id
                ? "rotate-90 text-white animate-bounce-in"
                : "rotate-0 text-blue-500 group-hover:translate-x-1"
            )}
          />
          <span className={cn(
            "text-sm leading-relaxed font-medium transition-all duration-300",
            activeSection === item.id ? "text-white" : ""
          )}>
            {item.title}
          </span>

          {/* Active indicator */}
          {activeSection === item.id && (
            <div className="ml-auto">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>
          )}
        </button>
      ))}
    </nav>
  );
}
  const [activeSection, setActiveSection] = useState("");
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if TOC should be sticky
      const scrollTop = window.scrollY;
      setIsSticky(scrollTop > 200);

      // Update active section
      const sections = items
        .map((item) => document.getElementById(item.id))
        .filter(Boolean);

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <nav
      className={cn(
        "transition-all duration-300",
        isSticky ? "sticky top-24" : "",
        className,
      )}
    >
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg backdrop-blur-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <List className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
            Содержание
          </h3>
        </div>

        <div className="space-y-1">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={cn(
                "group flex items-center w-full text-left py-2 px-3 rounded-lg transition-all duration-200",
                "hover:bg-gray-50 dark:hover:bg-gray-800",
                activeSection === item.id
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium border-l-2 border-blue-600"
                  : "text-gray-600 dark:text-gray-300",
              )}
              style={{ paddingLeft: `${item.level * 12 + 12}px` }}
            >
              <ChevronRight
                className={cn(
                  "w-3 h-3 mr-2 transition-transform duration-200",
                  activeSection === item.id ? "rotate-90" : "rotate-0",
                )}
              />
              <span className="text-sm leading-relaxed">{item.title}</span>
            </button>
          ))}
        </div>

        {/* Reading progress indicator */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Прогресс чтения</span>
            <span>
              {Math.round(
                ((items.findIndex((item) => item.id === activeSection) + 1) /
                  items.length) *
                  100,
              )}
              %
            </span>
          </div>
          <div className="mt-2 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 ease-out"
              style={{
                width: `${((items.findIndex((item) => item.id === activeSection) + 1) / items.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}