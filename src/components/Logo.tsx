interface LogoProps {
  variant?: "desktop" | "mobile" | "menu";
  className?: string;
}

const LOGO_SOURCES = {
  // Полный логотип для десктопа
  desktop:
    "https://framerusercontent.com/images/Mcs1qDPkdgWKjbdQ985Mr4CXq7U.png",

  // Квадратная иконка для мобильных (когда будет готова отдельная версия)
  // Пока используем тот же источник, но с квадратными размерами
  mobile:
    "https://framerusercontent.com/images/Mcs1qDPkdgWKjbdQ985Mr4CXq7U.png",

  // Иконка для меню
  menu: "https://framerusercontent.com/images/Mcs1qDPkdgWKjbdQ985Mr4CXq7U.png",
};

const LOGO_STYLES = {
  desktop: "h-8 w-auto", // Полный логотип
  mobile: "w-9 h-9 rounded-lg", // Квадратная иконка
  menu: "w-7 h-7 rounded-md", // Мале��ькая иконка для меню
};

export default function Logo({
  variant = "desktop",
  className = "",
}: LogoProps) {
  const src = LOGO_SOURCES[variant];
  const defaultStyles = LOGO_STYLES[variant];
  const finalClassName = className || defaultStyles;

  return <img src={src} alt="notetaker.ru" className={finalClassName} />;
}

// Готовые компоненты для разных случаев
export function DesktopLogo({ className }: { className?: string }) {
  return <Logo variant="desktop" className={className} />;
}

export function MobileLogo({ className }: { className?: string }) {
  return <Logo variant="mobile" className={className} />;
}

export function MenuLogo({ className }: { className?: string }) {
  return <Logo variant="menu" className={className} />;
}
