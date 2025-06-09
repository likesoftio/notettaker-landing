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

// Стили переходов
import "../styles/section-transitions.css";

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
            "искусственный интеллект",
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
          <section className="section-light section-padding-lg section-animate">
            <Hero />
          </section>

          <div className="section-transition">
            <div
              className="section-transition-wave"
              style={{ color: "#f1f5f9" }}
            ></div>
          </div>

          {/* 2. Как это работает - объясняем продукт */}
          <section className="section-light-alt section-padding section-animate">
            <HowItWorksEnhanced />
          </section>

          <div className="section-transition">
            <div
              className="section-transition-curve"
              style={{ color: "#667eea" }}
            ></div>
          </div>

          {/* 3. Для кого - целевая аудитория */}
          <section className="section-gradient-blue section-padding section-animate">
            <WhoIsItFor />
          </section>

          <div className="section-transition">
            <div
              className="section-transition-diagonal"
              style={{ color: "#a8edea" }}
            ></div>
          </div>

          {/* 4. Качество транскрипции - доказательства */}
          <section className="section-gradient-purple section-padding section-animate">
            <TranscriptionQuality />
          </section>

          <div className="section-transition">
            <div
              className="section-transition-wave"
              style={{ color: "#ffffff" }}
            ></div>
          </div>

          {/* 5. Функции с табами - основные возможности */}
          <section className="section-light section-padding section-animate">
            <FeaturesWithTabs />
          </section>

          <div className="section-transition">
            <div
              className="section-transition-curve"
              style={{ color: "#d299c2" }}
            ></div>
          </div>

          {/* 6. Демо типов встреч - практические примеры */}
          <section className="section-gradient-teal section-padding section-animate">
            <MeetingTypesDemo />
          </section>

          <div className="section-transition">
            <div className="section-transition-wave" style={{ color: '#ffffff' }}></div>
          </div>

          {/* 7. Демо видеозвонка - интерфейс в действии */}
          <section className="section-light section-padding section-animate">
            <VideoCallDemo />
          </section>

          <div className="section-transition">
            <div className="section-transition-diagonal" style={{ color: '#1e293b' }}></div>
          </div>
          </div>

          {/* 8. Безопасность - снимаем возражения */}
          <section className="section-dark section-padding section-animate">
            <SecurityEnhanced />
          </section>

          <div className="section-transition">
            <div
              className="section-transition-wave"
              style={{ color: "#fa709a" }}
            ></div>
          </div>

          {/* 8. Процесс работы - пошаговое объяснение */}
          <section className="section-gradient-orange section-padding section-animate">
            <ProcessSteps />
          </section>

          <div className="section-transition">
            <div
              className="section-transition-curve"
              style={{ color: "#f8fafc" }}
            ></div>
          </div>

          {/* 9. Дополнительные возможности */}
          <section className="section-light section-padding-sm section-animate">
            <Features />
          </section>

          <div className="section-transition">
            <div
              className="section-transition-diagonal"
              style={{ color: "#a8e6cf" }}
            ></div>
          </div>

          {/* 10. Преимущества */}
          <section className="section-gradient-mint section-padding section-animate">
            <AdvantagesSection />
          </section>

          <div className="section-transition">
            <div
              className="section-transition-wave"
              style={{ color: "#ffffff" }}
            ></div>
          </div>

          {/* 11. Логотипы компаний - доверие */}
          <section className="section-light section-padding-sm section-animate">
            <CompanyLogos />
          </section>

          <div className="section-transition">
            <div
              className="section-transition-curve"
              style={{ color: "#ffecd2" }}
            ></div>
          </div>

          {/* 12. Отзывы - социальное доказательство */}
          <section className="section-gradient-lavender section-padding section-animate">
            <TestimonialsSection />
          </section>

          <div className="section-transition">
            <div
              className="section-transition-diagonal"
              style={{ color: "#f1f5f9" }}
            ></div>
          </div>

          {/* 13. Тарифы - продажа */}
          <section className="section-light-alt section-padding section-animate">
            <Pricing />
          </section>

          <div className="section-transition">
            <div
              className="section-transition-wave"
              style={{ color: "#667eea" }}
            ></div>
          </div>

          {/* 14. Призыв к действию - конверсия */}
          <section className="section-gradient-blue section-padding section-animate">
            <CallToActionSection />
          </section>

          <div className="section-transition">
            <div
              className="section-transition-curve"
              style={{ color: "#a8edea" }}
            ></div>
          </div>

          {/* 15. Продолжение общения - ретаргетинг */}
          <section className="section-gradient-purple section-padding-sm section-animate">
            <ContinueDiscussion />
          </section>

          <div className="section-transition">
            <div
              className="section-transition-diagonal"
              style={{ color: "#ffffff" }}
            ></div>
          </div>

          {/* 16. Финальный призыв к действию */}
          <section className="section-light section-padding section-animate">
            <CTASection />
          </section>

          <div className="section-transition">
            <div
              className="section-transition-wave"
              style={{ color: "#f1f5f9" }}
            ></div>
          </div>

          {/* 17. FAQ - снимаем последние возражения */}
          <section className="section-light-alt section-padding section-animate">
            <FAQ />
          </section>
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
}