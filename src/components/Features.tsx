import { Card } from "./ui/card";
import { useLanguage } from "../contexts/LanguageContext";

export default function Features() {
  const { t } = useLanguage();

  const features = [
    {
      titleKey: "features.crossPlatform.title",
      descriptionKey: "features.crossPlatform.description",
    },
    {
      titleKey: "features.security.title",
      descriptionKey: "features.security.description",
    },
    {
      titleKey: "features.languages.title",
      descriptionKey: "features.languages.description",
    },
    {
      titleKey: "features.formats.title",
      descriptionKey: "features.formats.description",
    },
    {
      titleKey: "features.ai.title",
      descriptionKey: "features.ai.description",
    },
    {
      titleKey: "features.accuracy.title",
      descriptionKey: "features.accuracy.description",
    },
  ];

  return null;

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 dark:from-blue-700 dark:via-blue-800 dark:to-blue-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            {t("features.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {t(feature.titleKey)}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t(feature.descriptionKey)}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
