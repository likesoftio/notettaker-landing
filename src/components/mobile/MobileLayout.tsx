import { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";
import Header from "../Header";
import Footer from "../Footer";
import MobileHeader from "./MobileHeader";
import MobileFooter from "./MobileFooter";
import Head from "../SEO/Head";

interface MobileLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  keywords?: string[];
  url?: string;
  image?: string;
  type?: string;
  structuredData?: any;
  headerProps?: {
    showBorder?: boolean;
    className?: string;
  };
  footerProps?: {
    variant?: "default" | "minimal";
    className?: string;
  };
  showDesktopHeader?: boolean;
  showDesktopFooter?: boolean;
  className?: string;
}

export default function MobileLayout({
  children,
  title,
  description,
  keywords,
  url,
  image,
  type,
  structuredData,
  headerProps = {},
  footerProps = {},
  showDesktopHeader = true,
  showDesktopFooter = true,
  className = "",
}: MobileLayoutProps) {
  return (
    <HelmetProvider>
      <div
        className={`min-h-screen bg-white dark:bg-gray-900 transition-colors ${className}`}
      >
        {/* SEO Head */}
        {(title || description) && (
          <Head
            title={title}
            description={description}
            keywords={keywords}
            url={url}
            image={image}
            type={type}
            structuredData={structuredData}
          />
        )}

        {/* Desktop Header - скрыт на мобильных */}
        {showDesktopHeader && (
          <div className="hidden md:block">
            <Header />
          </div>
        )}

        {/* Mobile Header - показан только на мобильных */}
        <MobileHeader {...headerProps} />

        {/* Main Content */}
        <main className="mobile-safe-area">{children}</main>

        {/* Desktop Footer - скрыт на мобильных */}
        {showDesktopFooter && (
          <div className="hidden md:block">
            <Footer />
          </div>
        )}

        {/* Mobile Footer - показан только на мобильных */}
        <div className="md:hidden">
          <MobileFooter {...footerProps} />
        </div>
      </div>
    </HelmetProvider>
  );
}
