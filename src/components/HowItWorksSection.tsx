import { Upload, Sparkles, Edit3, Mail, FileText, Share2 } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function HowItWorksSection() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: Upload,
      title: "Добавьте встречу",
      titleEn: "Add Meeting",
      description:
        "Загрузите файл в любом формате или пригласите бота на встречу. Подключите Telegram или календарь, чтобы записывать каждую встречу автоматически",
      descriptionEn:
        "Upload a file in any format or invite the bot to a meeting. Connect Telegram or calendar to record every meeting automatically",
    },
    {
      icon: Sparkles,
      title: "Получите инсайты",
      titleEn: "Get Insights",
      description:
        "Обработанная встреча состоит из транскрипта с разделением на главы и спикеров, выбранного AI Отчета и задач с ответственными и дедлайнами",
      descriptionEn:
        "A processed meeting consists of a transcript with chapter and speaker division, selected AI Report, and tasks with assignees and deadlines",
    },
    {
      icon: Edit3,
      title: "Отредактируйте и поделитесь",
      titleEn: "Edit and Share",
      description:
        "Переименуйте спикеров и отредактируйте транскрипт. Итоговый отчёт можно отправить команде на почту или скачать в нужном формате",
      descriptionEn:
        "Rename speakers and edit the transcript. The final report can be sent to the team via email or downloaded in the desired format",
    },
  ];

  const integrationIcons = [
    { name: "Webex", color: "bg-gray-800" },
    { name: "Zoom", color: "bg-blue-500" },
    { name: "Google Meet", color: "bg-green-600" },
    { name: "Teams", color: "bg-purple-600" },
    { name: "Telegram", color: "bg-blue-400" },
  ];

  const outputFormats = [
    { label: "AI Отчет", subLabel: "Задачи", color: "bg-blue-600" },
    { label: "Транскрипт", color: "bg-gray-600" },
    { label: "Email", icon: Mail },
    { label: "DOCX", icon: FileText },
    { label: "Share", icon: Share2 },
    { label: "Edit", icon: Edit3 },
    { label: "MD", color: "bg-gray-500" },
    { label: "JSON", color: "bg-gray-700" },
    { label: "PDF", color: "bg-red-600" },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t("howItWorks.title") || "Как работает mymeet.ai?"}
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <step.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                {t(`howItWorks.step${index + 1}.title`) || step.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t(`howItWorks.step${index + 1}.description`) ||
                  step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Integration icons */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-6 mb-8">
            {integrationIcons.map((integration, index) => (
              <div
                key={index}
                className={`w-12 h-12 ${integration.color} rounded-lg flex items-center justify-center`}
              >
                <div className="w-6 h-6 bg-white rounded-sm opacity-90"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Output formats visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Process flow */}
          <div className="space-y-8">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4 text-center">
                  <div className="w-8 h-8 bg-blue-600 rounded mx-auto mb-2"></div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    как бы
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4 text-center">
                  <div className="w-8 h-8 bg-blue-600 rounded mx-auto mb-2"></div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    так сказать
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4 text-center">
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    короче
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    в принципе
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {t("howItWorks.cleanup.title") || "Очистка транскрипта"}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t("howItWorks.cleanup.description") ||
                    'Убираем из транскрипта "ну", "мда" и прочие слова-паразиты'}
                </p>
              </div>
            </div>

            <div className="bg-blue-600 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="font-semibold mb-2">
                  {t("howItWorks.speed.title") || "Высокая скорость обработки"}
                </h4>
                <p className="text-sm text-blue-100">
                  {t("howItWorks.speed.description") ||
                    "Умеем обрабатывать быстро: часовая встреча превратится в транскрипт за 5 минут"}
                </p>
              </div>
              <div className="absolute right-4 top-4 w-16 h-16 bg-white bg-opacity-20 rounded-lg"></div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                {t("howItWorks.aiEnhancement.title") ||
                  "AI-улучшение звука встречи"}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {t("howItWorks.aiEnhancement.description") ||
                  "Используем отдельную модель для очистки дорожки от шумов и посторонних звуков перед обработкой"}
              </p>
            </div>
          </div>

          {/* Right side - Output formats */}
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                {t("howItWorks.multilingual.title") || "Мультиязычность"}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t("howItWorks.multilingual.description") ||
                  "Поддерживаем обработку на 73 языках, это не влияет на скорость и качество результата"}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {outputFormats.map((format, index) => (
                <div
                  key={index}
                  className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {format.icon ? (
                    <format.icon className="w-6 h-6 mx-auto mb-1 text-gray-600 dark:text-gray-300" />
                  ) : (
                    <div
                      className={`w-6 h-6 ${format.color || "bg-gray-500"} rounded mx-auto mb-1`}
                    ></div>
                  )}
                  <div className="text-xs font-medium text-gray-900 dark:text-white">
                    {format.label}
                  </div>
                  {format.subLabel && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {format.subLabel}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">
                    {t("howItWorks.waveform.title") ||
                      "Поддерживаем обработку на 73 языках"}
                  </h4>
                  <p className="text-sm text-blue-100">
                    {t("howItWorks.waveform.description") ||
                      "Это не влияет на скорость и качество результата"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
