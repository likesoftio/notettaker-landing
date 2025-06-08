interface LogoProps {
  variant?: "desktop" | "mobile" | "menu";
  className?: string;
}

const LOGO_SOURCES = {
  // Полный логотип для десктопа
  desktop:
    "https://framerusercontent.com/images/Mcs1qDPkdgWKjbdQ985Mr4CXq7U.png",

  // Квадратная иконка для мобильных - новый URL без фона
  mobile:
    "https://cdn.builder.io/api/v1/image/assets%2Fd3e6c3e469bf4359bcff15eeac24fd04%2Ff3164cd251b24a75be1293b1a463daef",

  // Иконка для меню - тоже используем новый URL
  menu: "https://cdn.builder.io/api/v1/image/assets%2Fd3e6c3e469bf4359bcff15eeac24fd04%2Ff3164cd251b24a75be1293b1a463daef",
};
const LOGO_STYLES = {
  desktop: "h-8 w-auto", // Полный логотип
  mobile: "w-9 h-9 rounded-lg", // Квадратная иконка
  menu: "w-7 h-7 rounded-md", // Маленькая иконка для меню
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
