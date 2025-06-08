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
// import ContinueDiscussion from "../components/ContinueDiscussion";
// import FeaturesWithTabs from "../components/FeaturesWithTabs";
// import TestimonialsEnhanced from "../components/TestimonialsEnhanced";
// import SecurityEnhanced from "../components/SecurityEnhanced";

export default function Index() {
  return (
    <HelmetProvider>
      <div className="page-container">
        <Head
          title="notetaker.ru - Умная транскрипция и анализ встреч с помощью ИИ"
          description="Превратите л��бую встречу в структурированные инсайты с помощью искусственного интеллекта. Автоматическая транскрипция, анализ задач и принятых решений. Поддержка 73 языков. 180 минут бесплатно."
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
        <main>
          <Hero />
          <HowItWorksEnhanced />
          <TranscriptionQuality />
          <FeaturesWithTabs />
          <ProcessSteps />
          <Features />
          <ContinueDiscussion />
          <AdvantagesSection />
          <CompanyLogos />
          <SecurityEnhanced />
          <IntegrationsSection />
          <CallToActionSection />
          <UseCasesSection />
          <HowItWorksSection />
          <TestimonialsEnhanced />
          <Pricing />
          <CTASection />
          <FAQ />
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
}
