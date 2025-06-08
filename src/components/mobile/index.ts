// Экспорт всех мобильных компонентов из одного места
export { default as MobileHeader } from "./MobileHeader";
export { default as MobileFooter } from "./MobileFooter";
export { default as MobileLayout } from "./MobileLayout";
export { MobileNavigation } from "./MobileNavigation";

// Типы для удобства использования
export interface MobileLayoutConfig {
  header?: {
    showBorder?: boolean;
    className?: string;
  };
  footer?: {
    variant?: "default" | "minimal";
    className?: string;
  };
  showDesktop?: {
    header?: boolean;
    footer?: boolean;
  };
}
