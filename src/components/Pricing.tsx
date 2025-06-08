import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { Check } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function Pricing() {
  const { t } = useLanguage();
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Базовый",
      nameEn: "Basic",
      subtitle: "Идеально для начинающих",
      subtitleEn: "Perfect for beginners",
      monthlyPrice: null,
      yearlyPrice: null,
      monthlyMinutes: "180 бесплатных минут",
      yearlyMinutes: "180 бесплатных минут",
      isPopular: false,
      buttonText: "Попробовать — это бесплатно",
      buttonTextEn: "Try for free",
      href: "https://app.notetaker.ru/",
      features: [
        {
          text: "180 бесплатных минут",
          textEn: "180 free minutes",
          included: true,
        },
        {
          text: "10 промптов с AI Чатом",
          textEn: "10 AI Chat prompts",
          included: true,
        },
        {
          text: "Интеграция со всеми ВКС",
          textEn: "Integration with all VCS",
          included: true,
        },
        {
          text: "Интеграция с GCalendar",
          textEn: "GCalendar integration",
          included: true,
        },
        {
          text: "Транскрипт по спикерам",
          textEn: "Speaker-based transcript",
          included: true,
        },
        {
          text: "ИИ-краткое содержание и задачи",
          textEn: "AI summary and tasks",
          included: true,
        },
        {
          text: "Ограниченное хранилище",
          textEn: "Limited storage",
          included: true,
        },
        {
          text: "Авто-отправка участникам",
          textEn: "Auto-send to participants",
          included: true,
        },
        {
          text: "Экспорт в PDF, DOCX, MD и JSON",
          textEn: "Export to PDF, DOCX, MD and JSON",
          included: true,
        },
        {
          text: "Файлы размера 1 ГБ",
          textEn: "1 GB file size",
          included: true,
        },
      ],
    },
    {
      name: "Lite",
      nameEn: "Lite",
      subtitle: "500 минут",
      subtitleEn: "500 minutes",
      monthlyPrice: 850,
      yearlyPrice: 680,
      monthlyMinutes: "500 мин в месяц для файлов",
      yearlyMinutes: "500 мин в месяц для файлов",
      isPopular: false,
      buttonText: "Купить",
      buttonTextEn: "Buy",
      href: "https://app.notetaker.ru/upgrade",
      features: [
        {
          text: "500 мин в месяц для файлов",
          textEn: "500 min per month for files",
          included: true,
        },
        {
          text: "10 промптов с AI Чатом",
          textEn: "10 AI Chat prompts",
          included: true,
        },
        {
          text: "Интеграция со всеми ВКС",
          textEn: "Integration with all VCS",
          included: true,
        },
        {
          text: "Интеграция с GCalendar",
          textEn: "GCalendar integration",
          included: true,
        },
        {
          text: "Транскрипт по спикерам",
          textEn: "Speaker-based transcript",
          included: true,
        },
        {
          text: "ИИ-краткое содержание и задачи",
          textEn: "AI summary and tasks",
          included: true,
        },
        {
          text: "Бесконечное хранилище",
          textEn: "Unlimited storage",
          included: true,
        },
        {
          text: "Авто-отправка участникам",
          textEn: "Auto-send to participants",
          included: true,
        },
        {
          text: "Экспорт в PDF, DOCX, MD и JSON",
          textEn: "Export to PDF, DOCX, MD and JSON",
          included: true,
        },
        {
          text: "Файлы размера 1 ГБ",
          textEn: "1 GB file size",
          included: true,
        },
      ],
    },
    {
      name: "Pro",
      nameEn: "Pro",
      subtitle: "Безлимит для онлайн-встреч и 2000 минут на загрузку",
      subtitleEn: "Unlimited for online meetings and 2000 minutes for uploads",
      monthlyPrice: 2490,
      yearlyPrice: 1992,
      monthlyMinutes: "2000 мин в месяц для файлов",
      yearlyMinutes: "2000 мин в месяц для файлов",
      isPopular: true,
      buttonText: "Купить",
      buttonTextEn: "Buy",
      href: "https://app.notetaker.ru/upgrade",
      features: [
        {
          text: "Бесплатные минуты для ВКС",
          textEn: "Free minutes for VCS",
          included: true,
        },
        {
          text: "2000 мин в месяц для файлов",
          textEn: "2000 min per month for files",
          included: true,
        },
        {
          text: "AI Чат без ограничений",
          textEn: "Unlimited AI Chat",
          included: true,
        },
        {
          text: "Улучшенные AI Отчеты",
          textEn: "Enhanced AI Reports",
          included: true,
        },
        {
          text: "AI-улучшение транскрипта",
          textEn: "AI transcript enhancement",
          included: true,
        },
        {
          text: "Файлы размера 3 ГБ",
          textEn: "3 GB file size",
          included: true,
        },
        {
          text: "Интеграция с GCalendar",
          textEn: "GCalendar integration",
          included: true,
        },
        {
          text: "Транскрипт по спикерам",
          textEn: "Speaker-based transcript",
          included: true,
        },
        {
          text: "ИИ-краткое содержание �� задачи",
          textEn: "AI summary and tasks",
          included: true,
        },
        {
          text: "Бесконечное хранилище",
          textEn: "Unlimited storage",
          included: true,
        },
        {
          text: "Авто-отправка участникам",
          textEn: "Auto-send to participants",
          included: true,
        },
        {
          text: "Экспорт в PDF, DOCX, MD и JSON",
          textEn: "Export to PDF, DOCX, MD and JSON",
          included: true,
        },
      ],
    },
    {
      name: "Ultra",
      nameEn: "Ultra",
      subtitle: "Безлимит для онлайн-встреч и 5000 минут на загрузку",
      subtitleEn: "Unlimited for online meetings and 5000 minutes for uploads",
      monthlyPrice: 4290,
      yearlyPrice: 3432,
      monthlyMinutes: "5000 мин в месяц для файлов",
      yearlyMinutes: "5000 мин в месяц для файлов",
      isPopular: false,
      buttonText: "Купить",
      buttonTextEn: "Buy",
      href: "https://app.notetaker.ru/upgrade",
      features: [
        {
          text: "Бесплатные минуты для ВКС",
          textEn: "Free minutes for VCS",
          included: true,
        },
        {
          text: "5000 мин в месяц для файлов",
          textEn: "5000 min per month for files",
          included: true,
        },
        {
          text: "AI Чат без ограничений",
          textEn: "Unlimited AI Chat",
          included: true,
        },
        {
          text: "Улучшенные AI Отчеты",
          textEn: "Enhanced AI Reports",
          included: true,
        },
        {
          text: "AI-улучшение транскрипта",
          textEn: "AI transcript enhancement",
          included: true,
        },
        {
          text: "Файлы размера 3 ГБ",
          textEn: "3 GB file size",
          included: true,
        },
        {
          text: "Интеграция с GCalendar",
          textEn: "GCalendar integration",
          included: true,
        },
        {
          text: "Транскрипт по спикерам",
          textEn: "Speaker-based transcript",
          included: true,
        },
        {
          text: "ИИ-краткое содержание и задачи",
          textEn: "AI summary and tasks",
          included: true,
        },
        {
          text: "Бесконечное хранилище",
          textEn: "Unlimited storage",
          included: true,
        },
        {
          text: "Авто-отправка участникам",
          textEn: "Auto-send to participants",
          included: true,
        },
        {
          text: "Экспорт в PDF, DOCX, MD и JSON",
          textEn: "Export to PDF, DOCX, MD and JSON",
          included: true,
        },
      ],
    },
  ];

  const getPlanColor = (planName: string) => {
    switch (planName) {
      case "Базовый":
        return "text-gray-600";
      case "Lite":
        return "text-orange-500";
      case "Pro":
        return "text-blue-500";
      case "Ultra":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  };

  const getCurrentPrice = (plan: any) => {
    if (!plan.monthlyPrice) return null;
    return isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  };

  return (
    <section id="pricing" className="py-16 lg:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header with billing toggle */}
        <div className="flex flex-col items-center gap-12 mb-16">
          <div className="flex items-center gap-4">
            <span
              className={`text-lg font-medium ${!isYearly ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
            >
              {t("pricing.monthly") || "Ежемесячно"}
            </span>
            <div className="relative">
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
                className="w-16 h-8 data-[state=checked]:bg-gray-600 data-[state=unchecked]:bg-gray-300"
              />
            </div>
            <span
              className={`text-lg font-medium ${isYearly ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
            >
              {t("pricing.biannual") || "На 6 месяцев"}
            </span>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative p-6 h-full flex flex-col ${
                plan.isPopular
                  ? "border-2 border-blue-500 shadow-xl scale-105"
                  : "border border-gray-200 dark:border-gray-700"
              } bg-white dark:bg-gray-800`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {t("pricing.popular") || "Популярный"}
                  </span>
                </div>
              )}

              <div className="flex-1">
                {/* Plan header */}
                <div className="text-center mb-6">
                  <h3
                    className={`text-lg font-semibold mb-2 ${getPlanColor(plan.name)}`}
                  >
                    {t(`pricing.${plan.name.toLowerCase()}`) || plan.name}
                  </h3>

                  {getCurrentPrice(plan) ? (
                    <div className="mb-4">
                      <div className="text-4xl font-bold text-gray-900 dark:text-white">
                        {getCurrentPrice(plan)?.toLocaleString()}
                      </div>
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">
                        ₽/мес
                      </div>
                    </div>
                  ) : (
                    <div className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      {t("pricing.free") || "Начальный"}
                    </div>
                  )}

                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {t(`pricing.${plan.name.toLowerCase()}.subtitle`) ||
                      plan.subtitle}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                    {t("pricing.features.included") ||
                      "Доступ к платформе, включая:"}
                  </p>
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-start gap-3"
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          <Check
                            className={`w-5 h-5 ${
                              feature.included
                                ? "text-green-500"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        </div>
                        <span
                          className={`text-sm ${
                            feature.included
                              ? "text-gray-700 dark:text-gray-300"
                              : "text-gray-400 dark:text-gray-500"
                          }`}
                        >
                          {t(`pricing.features.${featureIndex}`) ||
                            feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA button */}
              <Button
                className={`w-full ${
                  plan.isPopular
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white dark:border-gray-600"
                }`}
                asChild
              >
                <a href={plan.href} target="_blank" rel="noopener">
                  {t(`pricing.${plan.name.toLowerCase()}.button`) ||
                    plan.buttonText}
                </a>
              </Button>
            </Card>
          ))}
        </div>

        {/* Additional info */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {t("pricing.discount.info") ||
              "Экономьте до 20% при оплате на 6 месяцев вперед"}
          </p>
        </div>
      </div>
    </section>
  );
}
