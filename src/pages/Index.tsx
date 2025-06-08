import Header from "../components/Header";
import Hero from "../components/Hero";
import ProcessSteps from "../components/ProcessSteps";
import Features from "../components/Features";
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

export default function Index() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header />
      <main>
        <Hero />
        <ProcessSteps />
        <Features />
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
  );
}
