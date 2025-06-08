import { Button } from "./ui/button";
import { useLanguage } from "../contexts/LanguageContext";

export default function IntegrationsSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-gray-900 dark:bg-white rounded-sm flex items-center justify-center">
                <div className="w-3 h-3 bg-white dark:bg-gray-900 rounded-sm"></div>
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t("integrations.label") || "Интеграции"}
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t("integrations.title") ||
                "Интеграция с Zoom, Google Meet и другими рабочими инструментами"}
            </h2>

            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
              {t("integrations.description") ||
                "Подключаемся к Zoom, Microsoft Teams, Google Meet, Я Телемост, Skype, Jazz, TrueConf, amoCRM и Telegram"}
            </p>

            <Button asChild>
              <a href="#" className="inline-flex items-center gap-2">
                {t("integrations.tryFree") || "Попробовать бесплатно"}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </Button>
          </div>

          {/* Right content - Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Top row - Zoom and Google Meet icons */}
            <div className="col-span-2 flex justify-center gap-8 mb-4">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M8.5 12l3 3 5-5"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
              <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M8.5 12l3 3 5-5"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
            </div>

            {/* Middle row - Teams and Codebeamer */}
            <div className="col-span-2 flex justify-center gap-8 mb-4">
              <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M8.5 12l3 3 5-5"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M8.5 12l3 3 5-5"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
            </div>

            {/* First card */}
            <div className="bg-gray-900 dark:bg-gray-700 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-semibold mb-3">
                {t("integrations.card1.title") ||
                  "Теперь не нужно записывать встречи"}
              </h3>
              <p className="text-gray-300 text-sm">
                {t("integrations.card1.description") ||
                  "Наш бот подключится к вашей встрече и запишет все сам. А все ваши встречи в виде транскриптов с задачами и кратким содержанием сохраняются в удобном интерфейсе"}
              </p>
            </div>

            {/* Second card */}
            <div className="bg-gray-900 dark:bg-gray-700 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-semibold mb-3">
                {t("integrations.card2.title") ||
                  "Синхронизированно с вашим календарем"}
              </h3>
              <p className="text-gray-300 text-sm">
                {t("integrations.card2.description") ||
                  "Подключите google-календарь, чтобы мы автоматически подключались на все ваши встречи"}
              </p>
            </div>

            {/* Third card */}
            <div className="bg-gray-900 dark:bg-gray-700 rounded-2xl p-6 text-white col-span-2 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  {t("integrations.card3.title") ||
                    "Всё, то же самое, но прямо в Telegram"}
                </h3>
                <p className="text-gray-300 text-sm">
                  {t("integrations.card3.description") ||
                    "Телеграмм бот с полным функционалом mymeet.ai. Можно добавить в беседу, чтобы все отчеты были прямо в командном чате"}
                </p>
              </div>
              <div className="ml-6">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M8.5 12l3 3 5-5"
                      stroke="white"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Google Calendar integration */}
            <div className="col-span-2 flex justify-center">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
                <div className="text-white text-xs font-bold">31</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
