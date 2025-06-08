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

export default function Index() {
  return (
    <HelmetProvider>
      <div className="page-container">
        <Head
          title="mymeet.ai - Умная транскрипция и анализ встреч с помощью ИИ"
          description="Превратите любую встречу в структурированные инсайты с помощью искусственного интеллекта. Автоматическая транскрипция, анализ задач и принятых решений. Поддержка 73 языков. 180 минут бесплатно."
          keywords={[
            "транскрипция встреч",
            "ИИ анализ встреч",
            "искусственный интеллект",
            "автоматические протоколы",
            "распознавание речи",
            "анализ совещаний",
            "mymeet.ai",
            "notetaker",
            "умный помощник для встреч",
          ]}
          type="website"
          url="https://mymeet.ai"
          structuredData={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "mymeet.ai",
            description: "ИИ платформа для анализа и транскрипции встреч",
            url: "https://mymeet.ai",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://mymeet.ai/blog?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }}
        />

        <Header />
        <main>
          <Hero />
          <ProcessSteps />
          <Features />
          <AdvantagesSection />
          <CompanyLogos />
          <SecuritySection />
          <IntegrationsSection />
          <CallToActionSection />
          <UseCasesSection />
          <HowItWorksSection />
          <TestimonialsSection />
          <Pricing />
          <CTASection />
          <FAQ />
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
}
