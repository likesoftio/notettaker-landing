import { Button } from "./ui/button";
import { Clock, CreditCard, Shield } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function CallToActionSection() {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: Clock,
      text: "180 минут бесплатно",
      textEn: "180 minutes for free",
    },
    {
      icon: CreditCard,
      text: "Без привязки карты",
      textEn: "No card required",
    },
    {
      icon: Shield,
      text: "Все данные защищены",
      textEn: "All data is protected",
    },
  ];

  return null;

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8">
              {t("cta.title") || "Попробуйте notetaker.ru в деле."}{" "}
              <span className="text-blue-600">
                {t("cta.subtitle") || "Бесплатно."}
              </span>
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
                asChild
              >
                <a
                  href="https://app.notetaker.ru/"
                  target="_blank"
                  rel="noopener"
                >
                  {t("cta.register") || "Зарегистрироваться"}
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex items-center gap-2"
                asChild
              >
                <a href="/contact">
                  <div className="w-5 h-5 text-gray-600">✦</div>
                  {t("cta.leaveRequest") || "Оставить заявку"}
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <benefit.icon className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-600 dark:text-gray-300 text-sm">
                    {t(`cta.benefit${index}`) || benefit.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right content - Dashboard preview */}
          <div className="relative">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
              {/* Mock dashboard interface */}
              <div className="bg-white dark:bg-gray-700 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">M</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    notetaker.ru
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-600 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          Oct 9, 2024
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Планирование с командой
                        </div>
                      </div>
                    </div>
                    <Button size="sm" className="bg-blue-600 text-white">
                      обработан
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-600 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          Oct 4, 2024
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Встреча с новым клиентом - Соливжде
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Новый
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-600 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          Apr 17, 2024
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          1-1 с Елизаветой
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      обработан
                    </Button>
                  </div>
                </div>

                <div className="mt-6 p-4 border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-lg text-center">
                  <div className="text-blue-600 mb-2">📁</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {t("cta.uploadFile") || "Загрузка аудио или видео файла"}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {t("cta.selectFile") || "Выберите файл или перетащите его"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
