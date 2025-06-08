import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Upload } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 lg:py-24 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {t("hero.title")}
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            {t("hero.subtitle")}
          </p>
        </div>

        {/* Upload Area */}
        <Card className="max-w-4xl mx-auto p-8 lg:p-12 bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
          <div className="bg-gray-50 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-12 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
            <div className="space-y-6">
              <Button size="lg" className="px-8">
                <Upload className="w-5 h-5 mr-2" />
                {t("hero.chooseFile")}
              </Button>

              <div className="space-y-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t("hero.dragDrop")}
                </p>
                <div className="text-xs text-gray-400 dark:text-gray-500 space-y-1">
                  <p>{t("hero.supportedFormats")}</p>
                  <p>{t("hero.maxSize")}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
