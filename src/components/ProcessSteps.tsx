import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useLanguage } from "../contexts/LanguageContext";

export default function ProcessSteps() {
  const { t } = useLanguage();

  const steps = [
    {
      number: 1,
      titleKey: "steps.step1.title",
      descriptionKey: "steps.step1.description",
      image:
        "https://framerusercontent.com/images/Nw3uRs9rv9ifFYveJP5eAdNJ5wE.png",
    },
    {
      number: 2,
      titleKey: "steps.step2.title",
      descriptionKey: "steps.step2.description",
      image:
        "https://framerusercontent.com/images/YvJ5hfSmKe4iM1HbIfnhChXEY8.png",
    },
    {
      number: 3,
      titleKey: "steps.step3.title",
      descriptionKey: "steps.step3.description",
      image:
        "https://framerusercontent.com/images/yB3OgcHkASC4Ssxb3VonaxqF4dI.png",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t("steps.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-12">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="mb-6">
                <img
                  src={step.image}
                  alt={t(step.titleKey)}
                  className="w-full h-48 object-contain mx-auto"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                  {step.number}. {t(step.titleKey)}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t(step.descriptionKey)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" asChild>
            <a href="https://app.notetaker.ru/" target="_blank" rel="noopener">
              {t("steps.convert")}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
