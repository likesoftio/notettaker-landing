import { Button } from "./ui/button";
import { BarChart3, Users, Search, Star } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function UseCasesSection() {
  const { t } = useLanguage();

  const useCases = [
    {
      icon: BarChart3,
      title: "Продажи",
      titleEn: "Sales",
      description: "Анализ звонков и встреч для повышения конверсии",
      descriptionEn: "Call and meeting analysis to improve conversion",
    },
    {
      icon: Users,
      title: "Рекрутмент",
      titleEn: "Recruitment",
      description: "Оценка кандидатов и стандартизация процессов найма",
      descriptionEn: "Candidate evaluation and hiring process standardization",
    },
    {
      icon: Search,
      title: "Исследования",
      titleEn: "Research",
      description: "Анализ интервью и фокус-групп для получения инсайтов",
      descriptionEn: "Interview and focus group analysis for insights",
    },
    {
      icon: Star,
      title: "Менеджмент",
      titleEn: "Management",
      description: "Управление командой и повышение эффективности встреч",
      descriptionEn: "Team management and meeting efficiency improvement",
      featured: true,
    },
  ];

  return null;

  return (
    <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Users className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {t("useCases.label") || "Для кого?"}
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t("useCases.title") ||
              "Продукт создан для решения задач профессионалов из разных индустрий"}
          </h2>
        </div>

        {/* Use cases grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className={`relative group cursor-pointer ${
                useCase.featured ? "lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <div
                className={`h-full p-6 bg-white dark:bg-gray-700 rounded-2xl border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300 ${
                  useCase.featured
                    ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white border-0"
                    : "hover:border-blue-300 dark:hover:border-blue-600"
                }`}
              >
                {useCase.featured && (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl">
                    <div className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl"></div>
                    <div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        backgroundImage:
                          'url("https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80")',
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-black bg-opacity-60 rounded-2xl"></div>
                  </div>
                )}

                <div className="relative z-10">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                      useCase.featured
                        ? "bg-white bg-opacity-20"
                        : "bg-gray-100 dark:bg-gray-600"
                    }`}
                  >
                    <useCase.icon
                      className={`w-6 h-6 ${
                        useCase.featured
                          ? "text-white"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    />
                  </div>

                  <h3
                    className={`text-xl font-semibold mb-3 ${
                      useCase.featured
                        ? "text-white"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {t(`useCases.${index}.title`) || useCase.title}
                  </h3>

                  {useCase.featured && (
                    <div className="space-y-4">
                      <p className="text-white text-opacity-90">
                        {t("useCases.management.description") ||
                          "Разделим встречу на проекты, определим статус и блокеры. Составим задачи для участников — комплють и отправлять в чаты"}
                      </p>
                      <Button variant="secondary" size="sm">
                        {t("useCases.learnMore") || "Узнать больше"}
                      </Button>
                    </div>
                  )}

                  {!useCase.featured && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {t(`useCases.${index}.description`) ||
                        useCase.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="text-center">
          <blockquote className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-4xl mx-auto">
            «
            {t("useCases.testimonial") ||
              "Сначала пользовался сам, потом принес в компанию. Достаточно удобно для таких вещей, когда много встреч, это спасает. Сокращает время на записи, постшиты и прочее очень"}
            »
          </blockquote>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                alt="Дзись-Войнаровский Федор"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-900 dark:text-white">
                {t("useCases.testimonial.name") || "Дзись-Войнаровский Федор"}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {t("useCases.testimonial.role") || "Руководитель продукта"}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
              <a
                href="https://app.notetaker.ru/"
                target="_blank"
                rel="noopener"
              >
                {t("useCases.register") || "Зарегистрироваться"}
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/contact">
                {t("useCases.leaveRequest") || "Оставить заявку"}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
