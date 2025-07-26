import React, { useState } from "react";
import { Users, Target, Search, Settings, ArrowRight } from "lucide-react";

export default function WhoIsItFor() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const useCases = [
    {
      id: "sales",
      icon: Target,
      title: "Продажи",
      description:
        "Анализируем клиентские встречи, выявляем потребности и возражения. Формируем инсайты для повышения конверсии.",
      background: "bg-gray-100 dark:bg-gray-800",
      textColor: "text-gray-900 dark:text-white",
    },
    {
      id: "recruitment",
      icon: Users,
      title: "Рекрутмент",
      description:
        "Транскрибируем встречу, выявим мотивацию, навыки и опыт. Проанализируем ответы и сформируем инсайты для коллег.",
      background: "bg-gradient-to-br from-emerald-600 to-emerald-800",
      textColor: "text-white",
      featured: true,
      image:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop&auto=format",
      link: "https://mymeet.ai/ru/recruitment",
    },
    {
      id: "research",
      icon: Search,
      title: "Исследования",
      description:
        "Структурируем интервью и фокус-группы. Выделяем ключевые инсайты и паттерны из обратной связи пользователей.",
      background: "bg-gray-100 dark:bg-gray-800",
      textColor: "text-gray-900 dark:text-white",
    },
    {
      id: "management",
      icon: Settings,
      title: "Менеджмент",
      description:
        "Фиксируем решения, задачи и следующие шаги. Автоматически создаем протоколы совещаний и трекинг задач.",
      background: "bg-gray-100 dark:bg-gray-800",
      textColor: "text-gray-900 dark:text-white",
    },
  ];

  return null;

  return (
    <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 bg-white dark:bg-gray-900 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-12 lg:mb-16">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-gray-50 dark:bg-gray-800">
              <Users className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Для кого?
              </span>
            </div>
          </div>

          <div className="max-w-4xl">
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium text-gray-900 dark:text-white leading-tight">
              Продукт создан для решения задач профессионалов из разных
              индустрий
            </h2>
          </div>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-2">
          {useCases.map((useCase, index) => {
            const IconComponent = useCase.icon;
            const isHovered = hoveredCard === useCase.id;

            return (
              <div
                key={useCase.id}
                className={`
                  relative rounded-lg p-6 flex flex-col justify-between
                  h-[320px] md:h-[400px] lg:h-[464px]
                  group cursor-pointer
                  ${useCase.background}
                  transition-all duration-500 ease-out
                  ${isHovered ? "scale-[1.03] shadow-2xl -translate-y-2" : "hover:scale-[1.02] hover:shadow-lg"}
                  ${useCase.featured ? "md:col-span-1" : ""}
                `}
                style={{
                  backgroundImage: useCase.image
                    ? `url(${useCase.image})`
                    : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                onMouseEnter={() => setHoveredCard(useCase.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Overlay for featured card */}
                {useCase.featured && (
                  <div
                    className={`
                    absolute inset-0 rounded-lg transition-all duration-500
                    ${
                      isHovered
                        ? "bg-gradient-to-t from-emerald-900/90 to-emerald-600/50"
                        : "bg-gradient-to-t from-emerald-900/80 to-emerald-600/40"
                    }
                  `}
                  />
                )}

                {/* Glow effect on hover */}
                <div
                  className={`
                  absolute inset-0 rounded-lg transition-all duration-500
                  ${isHovered ? "ring-2 ring-blue-400/50 ring-offset-2 ring-offset-white dark:ring-offset-gray-900" : ""}
                  ${useCase.featured && isHovered ? "ring-emerald-400/50" : ""}
                `}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-between h-full">
                  {/* Top section with icon and title */}
                  <div className="flex flex-col gap-3">
                    <div
                      className={`
                      transition-all duration-300
                      ${isHovered ? "transform scale-110" : ""}
                    `}
                    >
                      <IconComponent
                        className={`w-6 h-6 ${useCase.textColor}`}
                      />
                    </div>
                    <h3
                      className={`
                      text-2xl font-medium transition-all duration-300
                      ${useCase.textColor}
                      ${isHovered ? "transform translate-x-1" : ""}
                    `}
                    >
                      {useCase.title}
                    </h3>
                  </div>

                  {/* Bottom section with description and optional CTA */}
                  <div className="flex flex-col gap-8">
                    <p
                      className={`
                      text-sm leading-relaxed opacity-90 transition-all duration-300
                      ${useCase.textColor}
                      ${isHovered ? "opacity-100" : ""}
                    `}
                    >
                      {useCase.description}
                    </p>

                    {useCase.link && (
                      <a
                        href={useCase.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                          inline-flex items-center justify-center gap-2 px-4 py-3 rounded
                          bg-white/20 backdrop-blur-sm border border-white/20
                          text-white text-sm font-medium
                          transition-all duration-300
                          ${
                            isHovered
                              ? "bg-white/30 border-white/30 transform translate-x-1"
                              : "hover:bg-white/25"
                          }
                        `}
                      >
                        <span>Узнать больше</span>
                        <ArrowRight
                          className={`
                          w-4 h-4 transition-transform duration-300
                          ${isHovered ? "transform translate-x-1" : ""}
                        `}
                        />
                      </a>
                    )}
                  </div>
                </div>

                {/* Subtle pattern overlay for non-featured cards */}
                {!useCase.featured && (
                  <div
                    className={`
                    absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500
                    bg-gradient-to-br from-blue-50/10 to-purple-50/10
                    ${isHovered ? "opacity-100" : ""}
                  `}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
