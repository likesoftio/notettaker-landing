import React, { useState } from "react";
import {
  ArrowRight,
  FileText,
  BarChart3,
  Users,
  Calendar,
  MessageSquare,
  Target,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

export default function AIAnalyticsDemo() {
  const [activeTab, setActiveTab] = useState("report");

  const meetingTypes = [
    { icon: Calendar, label: "Планерка" },
    { icon: BarChart3, label: "Отчет" },
    { icon: MessageSquare, label: "Презентация" },
    { icon: Target, label: "Обзор" },
    { icon: Users, label: "Собеседование" },
    { icon: FileText, label: "Встреча" },
    { icon: CheckCircle, label: "Ретро" },
    { icon: AlertCircle, label: "Онбординг" },
    { icon: TrendingUp, label: "Рост" },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16">
          <div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-gray-900 dark:text-white leading-tight mb-6">
              Углубленная AI-аналитика по типу встречи с помощью встроенных
              шаблонов
            </h2>
          </div>

          <div className="lg:pl-8">
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
              AI Отчеты помогают находить инсайты в интервью, оценивать
              эффективность менеджеров и синхронизировать работу команд
            </p>

            <a
              href="https://app.notetaker.ru"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:gap-3 transition-all duration-200"
            >
              <span>Попробовать</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Meeting Types */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Собеседование с HR
            </span>
          </div>

          <div className="flex flex-wrap gap-2 lg:gap-4">
            {meetingTypes.map((type, index) => {
              const IconComponent = type.icon;
              const isActive = index === 4; // Собеседование активно

              return (
                <div
                  key={index}
                  className={`
                    flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-lg
                    transition-all duration-200 cursor-pointer
                    ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }
                  `}
                >
                  <IconComponent className="w-4 h-4 lg:w-5 lg:h-5" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Report Demo */}
        <div className="bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 rounded-2xl shadow-xl overflow-hidden relative">
          {/* Background blur effect */}
          <div className="absolute inset-0 bg-gray-500/80 backdrop-blur-sm"></div>

          {/* Tabs */}
          <div className="relative z-10">
            <div className="bg-gray-700/90 dark:bg-gray-900/90 px-6 py-4 backdrop-blur-sm">
              <div className="flex gap-4">
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === "meeting"
                      ? "bg-gray-600 text-white"
                      : "text-gray-300 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("meeting")}
                >
                  Обычная встреча
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === "report"
                      ? "bg-gray-600 text-white"
                      : "text-gray-300 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("report")}
                >
                  Пример отчета
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-6 lg:p-8 max-h-[600px] overflow-y-auto">
            {activeTab === "report" && (
              <div className="space-y-8">
                {/* Краткое содержание */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Супер краткое содержание
                    </h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Проведено собеседование с кандидатом на позицию
                    бизнес-аналитика. Обсуждена квалификация кандидата, опыт
                    работы с процессами моделирования и аналитическими
                    инструментами. Кандидат продемонстрировал хорошие знания в
                    области системного анализа и управления проектами.
                  </p>
                </div>

                {/* Краткое содержание по темам */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Краткое содержание по темам
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        Технические навыки и опыт
                      </h4>
                      <ul className="text-gray-700 dark:text-gray-300 space-y-1 ml-4">
                        <li>
                          • Опыт работы с методами моделирования процессов
                          (BPMN, UML)
                        </li>
                        <li>
                          • Владение инструментами для управления проектами
                        </li>
                        <li>• Навыки сбора и анализа требований</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        Коммуникационные навыки
                      </h4>
                      <ul className="text-gray-700 dark:text-gray-300 space-y-1 ml-4">
                        <li>
                          • Уверенное взаимодействие с командой разработки
                        </li>
                        <li>• Эффективная коммуникация с бизнес-стороной</li>
                        <li>• Опыт презентации результатов анализа</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Сильные стороны */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Сильные стороны кандидата
                    </h3>
                  </div>
                  <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Уверенное владение методами моделирования процессов (BPMN,
                      UML)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Хорошие навыки взаимодействия с разработкой и бизнесом
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Опыт работы с различными инструментами для управления
                      проектами
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Способность собирать требования и анализировать их
                    </li>
                  </ul>
                </div>

                {/* Слабые стороны */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-orange-600" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Слабые стороны кандидата
                    </h3>
                  </div>
                  <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      Отсутствие практического опыта в приоритизации задач
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      Не всегда учитывает ограничения и риски на этапе сбора
                      требований
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      Не использует Customer Journey Map в своей практике
                    </li>
                  </ul>
                </div>

                {/* Задачи */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Задачи
                    </h3>
                  </div>
                  <ul className="text-gray-700 dark:text-gray-300 space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        Включить кандидата в список рассылки по электронной
                        почте для уведомлений о запланированном техническом
                        обслуживании. (Исполнитель: Сергей)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        Обсудить с заинтересованными сторонами приоритетность
                        подготовки команды (Исполнитель: Костя)
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Рекомендация */}
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-5 h-5 text-green-600" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Рекомендация для HR
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-medium text-green-700 dark:text-green-400">
                      Рекомендуется нанять
                    </span>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Кандидат продемонстрировал хорошие аналитические навыки и
                    опыт работы в различных проектах. Несмотря на некоторые
                    пробелы в практике, его знания и уверенность в ответах
                    делают его подходящим кандидатом для позиции бизнес- и
                    системного аналитика. Рекомендуется провести дополнительное
                    обучение по приоритизации задач и методам сбора требований
                    для улучшения его компетенций.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "meeting" && (
              <div className="text-center py-16">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Обычная встреча
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Стандартный анализ встречи без специализированных шаблонов
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
