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

export default function TableOfContents({
  items,
  className,
}: TableOfContentsProps) {
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
              : "text-gray-600 dark:text-gray-300",
          )}
          style={{
            paddingLeft: `${item.level * 16 + 16}px`,
            animationDelay: `${index * 50}ms`,
          }}
        >
          <ArrowIcon
            direction="right"
            size="xs"
            className={cn(
              "mr-3 transition-all duration-300",
              activeSection === item.id
                ? "rotate-90 text-white animate-bounce-in"
                : "rotate-0 text-blue-500 group-hover:translate-x-1",
            )}
          />
          <span
            className={cn(
              "text-sm leading-relaxed font-medium transition-all duration-300",
              activeSection === item.id ? "text-white" : "",
            )}
          >
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
