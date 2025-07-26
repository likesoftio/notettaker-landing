import { Clock, Brain, Globe, Zap, Users2, Shield } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function AdvantagesSection() {
  const { t } = useLanguage();

  const advantages = [
    {
      icon: Clock,
      title: "Экономия времени",
      titleEn: "Time Saving",
      description:
        "Сокращаем время на обработку встреч на 80%. Автоматическая расшифровка и анализ за минуты",
      descriptionEn:
        "Reduce meeting processing time by 80%. Automatic transcription and analysis in minutes",
      stats: "80%",
    },
    {
      icon: Brain,
      title: "ИИ-анализ",
      titleEn: "AI Analysis",
      description:
        "Умный алгоритм выделяет ключевые моменты, решения и задачи из ваших встреч",
      descriptionEn:
        "Smart algorithm highlights key moments, decisions and tasks from your meetings",
      stats: "73",
    },
    {
      icon: Globe,
      title: "Мультиязычность",
      titleEn: "Multilingual",
      description:
        "Поддержка 73 языков с высокой точностью распознавания речи и контекста",
      descriptionEn:
        "Support for 73 languages with high accuracy in speech recognition and context",
      stats: "99%",
    },
    {
      icon: Zap,
      title: "Мгновенный результат",
      titleEn: "Instant Results",
      description:
        "Получайте готовые протоколы и задачи сразу после завершения встречи",
      descriptionEn:
        "Get ready protocols and tasks immediately after meeting completion",
      stats: "<5мин",
    },
    {
      icon: Users2,
      title: "Командная работа",
      titleEn: "Team Collaboration",
      description:
        "Делитесь результатами с командой, назначайте задачи и отслеживайте прогресс",
      descriptionEn: "Share results with team, assign tasks and track progress",
      stats: "∞",
    },
    {
      icon: Shield,
      title: "Безопасность данных",
      titleEn: "Data Security",
      description:
        "Корпоративный уровень защиты. Все данные шифруются и хранятся безопасно",
      descriptionEn:
        "Enterprise-level security. All data is encrypted and stored securely",
      stats: "AES-256",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        {/* <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
              {t("advantages.label") || "Преимущества"}
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t("advantages.title") || "Почему выбирают mymeet.ai?"}
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("advantages.subtitle") ||
              "Передовые технологии искусственного интеллекта для максимальной эффективности ваших встреч"}
          </p>
        </div> */}

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t("advantages.cta.title") ||
                "Готовы повысить эффективность встреч?"}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              {t("advantages.cta.description") ||
                "Присоединяйтесь к тысячам профессионалов, которые уже используют mymeet.ai для оптимизации своих рабочих процессов"}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://app.notetaker.ru/"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                {t("advantages.cta.start") || "Начать бесплатно"}
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors"
              >
                {t("advantages.cta.demo") || "Заказать демо"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
