import { HelmetProvider } from "react-helmet-async";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ProcessSteps from "../components/ProcessSteps";
import Features from "../components/Features";
import AdvantagesSection from "../components/AdvantagesSection";
import CompanyLogos from "../components/CompanyLogos";
import CallToActionSection from "../components/CallToActionSection";
import TestimonialsSection from "../components/TestimonialsSection";
import Pricing from "../components/Pricing";
import CTASection from "../components/CTASection";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Head from "../components/SEO/Head";

// Новые компоненты
import HowItWorksEnhanced from "../components/HowItWorksEnhanced";
import TranscriptionQuality from "../components/TranscriptionQuality";
import ContinueDiscussion from "../components/ContinueDiscussion";
import FeaturesWithTabs from "../components/FeaturesWithTabs";
import WhoIsItFor from "../components/WhoIsItFor";
import SecurityEnhanced from "../components/SecurityEnhanced";
import MeetingTypesDemo from "../components/MeetingTypesDemo";
import VideoCallDemo from "../components/VideoCallDemo";

export default function Index() {
  return (
    <HelmetProvider>
      <div className="page-container">
        <Head
          title="notetaker.ru - Умная транскрипция и анализ встреч с помощью ИИ"
          description="Превратите любую встречу в структурированные инсайты с помощью искусственного интеллекта. Автоматическая транскрипция, анализ задач и принятых решений. Поддержка 73 языков. 180 минут бесплатно."
          keywords={[
            "транскрипция встреч",
            "ИИ анализ встреч",
            "Исскусственный интеллект",
            "автоматические протоколы",
            "распознавание речи",
            "анализ совещаний",
            "notetaker.ru",
            "notetaker",
            "умный помощник для встреч",
          ]}
          type="website"
          url="https://notetaker.ru"
          structuredData={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "notetaker.ru",
            description: "ИИ платформа для анализа и транскрипции встреч",
            url: "https://notetaker.ru",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://notetaker.ru/blog?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }}
        />

        <Header />
        <main className="mobile-safe-area">
          {/* 1. Hero - Главный экран */}
          <div className="mobile-fade-in">
            <Hero />
          </div>

          {/* 2. Как это работает - объясняем продукт */}
          <div className="mobile-slide-up">
            <HowItWorksEnhanced />
          </div>

          {/* 3. Для кого - целевая аудитория */}
          <div className="mobile-slide-up">
            <WhoIsItFor />
          </div>

          {/* 4. Качество транскрипции - доказательства */}
          <div className="mobile-fade-in">
            <TranscriptionQuality />
          </div>

          {/* 5. Функции с табами - основные возможности */}
          <div className="mobile-scale-in">
            <FeaturesWithTabs />
          </div>

          {/* 6. Демо типов встреч - практические примеры */}
          <div className="mobile-scale-in">
            <MeetingTypesDemo />
          </div>

          {/* 7. Демо видеозвонка - интерфейс в действии */}
          <div className="mobile-fade-in">
            <VideoCallDemo />
          </div>

          {/* 8. Безопасность - снимаем возражения */}
          <div className="mobile-slide-right">
            <SecurityEnhanced />
          </div>

          {/* 9. Процесс работы - пошаговое объяснение */}
          <div className="mobile-slide-right">
            <ProcessSteps />
          </div>

          {/* 10. Дополнительные возможности */}
          <div className="mobile-fade-in">
            <Features />
          </div>

          {/* 11. Преимущества */}
          <div className="mobile-fade-in">
            <AdvantagesSection />
          </div>

          {/* 12. Логотипы компаний - доверие */}
          <div className="mobile-scale-in">
            <CompanyLogos />
          </div>

          {/* 13. Отзывы - социальное доказательство */}
          <div className="mobile-slide-right">
            <TestimonialsSection />
          </div>

          {/* 14. Тарифы - продажа */}
          <div className="mobile-fade-in">
            <Pricing />
          </div>

          {/* 15. Призыв к действию - конверсия */}
          <div className="mobile-slide-up">
            <CallToActionSection />
          </div>

          {/* 16. Продолжение общения - ретаргетинг */}
          <div className="mobile-slide-up">
            <ContinueDiscussion />
          </div>

          {/* 17. Финальный призыв к действию */}
          <div className="mobile-slide-up">
            <CTASection />
          </div>

          {/* 18. FAQ - снимаем последние возражения */}
          <div className="mobile-fade-in">
            <FAQ />
          </div>
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
}
