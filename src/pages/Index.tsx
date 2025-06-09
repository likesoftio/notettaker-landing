import { HelmetProvider } from "react-helmet-async";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ProcessSteps from "../components/ProcessSteps";
import Features from "../components/Features";
import AdvantagesSection from "../components/AdvantagesSection";
import CompanyLogos from "../components/CompanyLogos";
import SecuritySection from "../components/SecuritySection";
import IntegrationsSection from "../components/IntegrationsSection";
import CallToActionSection from "../components/CallToActionSection";
import UseCasesSection from "../components/UseCasesSection";
import HowItWorksSection from "../components/HowItWorksSection";
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
// import TestimonialsEnhanced from "../components/TestimonialsEnhanced";

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
          <div className="mobile-fade-in">
            <Hero />
          </div>
          <div className="mobile-slide-up">
            <HowItWorksEnhanced />
          </div>
          <div className="mobile-fade-in">
            <TranscriptionQuality />
          </div>
          <div className="mobile-slide-up">
            <WhoIsItFor />
          </div>
          <div className="mobile-scale-in">
            <FeaturesWithTabs />
          </div>
          <div className="mobile-scale-in">
            <MeetingTypesDemo />
          </div>
          <div className="mobile-slide-right">
            <ProcessSteps />
          </div>
          <div className="mobile-fade-in">
            <Features />
          </div>
          <div className="mobile-slide-up">
            <ContinueDiscussion />
          </div>
          <div className="mobile-fade-in">
            <AdvantagesSection />
          </div>
          <div className="mobile-scale-in">
            <CompanyLogos />
          </div>
          <div className="mobile-slide-right">
            <SecurityEnhanced />
          </div>
          <div className="mobile-slide-up">
            <CallToActionSection />
          </div>
          <div className="mobile-fade-in">
            <UseCasesSection />
          </div>
          <div className="mobile-scale-in">
            <HowItWorksSection />
          </div>
          <div className="mobile-slide-right">
            <TestimonialsSection />
          </div>
          <div className="mobile-fade-in">
            <Pricing />
          </div>
          <div className="mobile-slide-up">
            <CTASection />
          </div>
          <div className="mobile-fade-in">
            <FAQ />
          </div>
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
}
