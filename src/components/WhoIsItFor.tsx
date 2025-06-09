import React from "react";
import { Users, Target, Search, Settings } from "lucide-react";

export default function WhoIsItFor() {
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

  return (
    <section className="py-20 px-8 bg-white dark:bg-gray-900 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-gray-50 dark:bg-gray-800">
              <Users className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Для кого?
              </span>
            </div>
          </div>

          <div className="max-w-4xl">
            <h2 className="text-4xl lg:text-5xl font-medium text-gray-900 dark:text-white leading-tight">
              Продукт создан для решения задач профессионалов из разных
              индустрий
            </h2>
          </div>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 h-[464px]">
          {useCases.map((useCase, index) => {
            const IconComponent = useCase.icon;

            return (
              <div
                key={useCase.id}
                className={`
                  relative rounded-lg p-6 flex flex-col justify-between h-full
                  ${useCase.background}
                  ${index === 1 ? "lg:col-span-1" : ""}
                  transition-all duration-300 hover:scale-[1.02] hover:shadow-lg
                `}
                style={{
                  backgroundImage: useCase.image
                    ? `url(${useCase.image})`
                    : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Overlay for featured card */}
                {useCase.featured && (
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 to-emerald-600/40 rounded-lg" />
                )}

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-between h-full">
                  {/* Top section with icon and title */}
                  <div className="flex flex-col gap-3">
                    <IconComponent className={`w-6 h-6 ${useCase.textColor}`} />
                    <h3 className={`text-2xl font-medium ${useCase.textColor}`}>
                      {useCase.title}
                    </h3>
                  </div>

                  {/* Bottom section with description and optional CTA */}
                  <div className="flex flex-col gap-8">
                    <p
                      className={`text-sm leading-relaxed ${useCase.textColor} opacity-90`}
                    >
                      {useCase.description}
                    </p>

                    {useCase.link && (
                      <a
                        href={useCase.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-4 py-3 bg-white/20 backdrop-blur-sm rounded border border-white/20 text-white text-sm font-medium hover:bg-white/30 transition-all duration-200"
                      >
                        Узнать больше
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
