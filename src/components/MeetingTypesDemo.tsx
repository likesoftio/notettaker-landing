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
  Clock,
  DollarSign,
  Coffee,
} from "lucide-react";

interface MeetingContent {
  summary: string;
  topics: {
    title: string;
    points: string[];
  }[];
  tasks: string[];
  insights?: {
    positive: string[];
    areas: string[];
  };
}

export default function MeetingTypesDemo() {
  const [activeMeetingType, setActiveMeetingType] = useState("regular");
  const [activeTab, setActiveTab] = useState("report");

  const meetingTypes = [
    {
      id: "regular",
      label: "Обычная встреча",
      icon: Calendar,
      color: "bg-blue-600",
    },
    {
      id: "hr",
      label: "HR Interview",
      icon: Users,
      color: "bg-green-600",
    },
    {
      id: "sales",
      label: "Встреча по продажам",
      icon: DollarSign,
      color: "bg-purple-600",
    },
    {
      id: "daily",
      label: "Daily Meeting",
      icon: Coffee,
      color: "bg-orange-600",
    },
  ];

  const meetingContent: Record<string, MeetingContent> = {
    regular: {
      summary:
        "Проведено совещание по обзору спринта для представления результатов спринта для проекта по маркетплейсу. Обсуждена цель спринта по предоставлению доступа для входа пользователей и представлены три истории пользователей, связанные с аутентификацией пользователей, видимостью паролей и регистрацией.",
      topics: [
        {
          title: "Цели и достижения спринта",
          points: [
            "Достигнута цель спринта по предоставлению доступа к приложению маркетплейса",
            "Успешно реализованы функции входа в систему и регистрации",
          ],
        },
        {
          title: "Истории пользователей и реализованные функции",
          points: [
            "Реализована пользовательская история для существующих пользователей",
            "Разработана функция регистрации для новых пользователей: поля для имени, адреса почты и пароля",
          ],
        },
      ],
      tasks: [
        "Включить всех членов команды в список рассылки по электронной почте для уведомлений о запланированном техническом обслуживании. (Исполнитель: Сергей)",
        "Обсудить с заинтересованными сторонами приоритетность подготовки команды (Исполнитель: Костя)",
      ],
    },
    hr: {
      summary:
        "Проведено собеседование с кандидатом на позицию бизнес-аналитика. Обсуждена квалификация кандидата, опыт работы с процессами моделирования и аналитическими инструментами. Кандидат продемонстрировал хорошие знания в области системного анализа и управления проектами.",
      topics: [
        {
          title: "Технические навыки и опыт",
          points: [
            "Опыт работы с методами моделирования процессов (BPMN, UML)",
            "Владение инструментами для управления проектами",
            "Навыки сбора и анализа требований",
          ],
        },
        {
          title: "Коммуникационные навыки",
          points: [
            "Уверенное взаимодействие с командой разработки",
            "Эффективная коммуникация с бизнес-стороной",
            "Опыт презентации результатов анализа",
          ],
        },
      ],
      tasks: [
        "Провести техническое интервью с кандидатом (Исполнитель: Техлид)",
        "Проверить рекомендации с предыдущих мест работы (Исполнитель: HR)",
      ],
      insights: {
        positive: [
          "Уверенное владение методами моделирования процессов (BPMN, UML)",
          "Хорошие навыки взаимодействия с разработкой и бизнесом",
          "Опыт работы с различными инструментами для управления проектами",
          "Способность собирать требования и анализировать их",
        ],
        areas: [
          "Отсутствие практического опыта в приоритизации задач",
          "Не всегда учитывает ограничения и риски на этапе сбора требований",
          "Не использует Customer Journey Map в своей практике",
        ],
      },
    },
    sales: {
      summary:
        "Проведена презентация решения для потенциального клиента в сфере e-commerce. Обсуждены потребности в автоматизации процессов обработки заказов, интеграции с платежными системами и аналитике продаж. Клиент проявил заинтересованность в комплексном решении.",
      topics: [
        {
          title: "Потребности клиента",
          points: [
            "Автоматизация процесса обработки заказов до 1000 заказов в день",
            "Интеграция с существующими платежными системами (Stripe, PayPal)",
            "Детальная аналитика продаж и поведения клиентов",
          ],
        },
        {
          title: "Предложенное решение",
          points: [
            "Внедрение системы управления заказами с автоматическими уведомлениями",
            "Настройка API интеграций с топ-5 платежными провайдерами",
            "Создание дашборда с real-time аналитикой и прогнозированием",
          ],
        },
      ],
      tasks: [
        "Подготовить детальное коммерческое предложение с ценообразованием (Исполнитель: Менеджер продаж)",
        "Организовать техническую встречу с IT-командой клиента (Исполнитель: Техлид)",
        "Предоставить демо-доступ к системе на 14 дней (Исполнитель: DevOps)",
      ],
      insights: {
        positive: [
          "Клиент готов инвестировать в долгосрочное решение",
          "Есть выделенный бюджет на автоматизацию в текущем квартале",
          "Заинтересованность в дополнительных модулях (CRM, склад)",
          "Возможность стать референс-клиентом в их индустрии",
        ],
        areas: [
          "Клиент сравнивает с 2 другими поставщиками",
          "Ограниченные технические ресурсы для внедрения",
          "Необходимость обучения команды новым процессам",
        ],
      },
    },
    daily: {
      summary:
        "Ежедневный стендап команды разработки. Обсужден прогресс по текущим задачам, выявлены блокеры и запланированы активности на день. Команда работает над релизом версии 2.3 с новым функционалом аутентификации.",
      topics: [
        {
          title: "Прогресс по задачам",
          points: [
            "Frontend: завершена интеграция с новым API аутентификации (90%)",
            "Backend: исправлены критические баги в системе уведомлений",
            "QA: проведено тестирование пользовательских сценариев",
          ],
        },
        {
          title: "Блокеры и риски",
          points: [
            "Ожидание ответа от команды DevOps по настройке production сервера",
            "Необходимо уточнить требования к логированию пользовательских действий",
            "Задержка в получении дизайн-макетов для мобильной версии",
          ],
        },
      ],
      tasks: [
        "Связаться с DevOps по вопросу настройки сервера до 14:00 (Исполнитель: Тимлид)",
        "Уточнить требования к логированию у Product Owner (Исполнитель: Backend разработчик)",
        "Запросить обновленные макет�� у дизайнера (Исполнитель: Frontend разработчик)",
      ],
    },
  };

  const iconTypes = [
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

  const currentContent = meetingContent[activeMeetingType];

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                AI Отчеты
              </span>
            </div>

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

            <button className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:gap-3 transition-all duration-200">
              <span>Подробнее</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Meeting Type Selector */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 mb-6">
            {meetingTypes.map((type) => {
              const IconComponent = type.icon;
              const isActive = activeMeetingType === type.id;

              return (
                <button
                  key={type.id}
                  onClick={() => setActiveMeetingType(type.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
                    ${
                      isActive
                        ? `${type.color} text-white shadow-lg`
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }
                  `}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="text-sm">{type.label}</span>
                </button>
              );
            })}
          </div>

          {/* Icon Types */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {meetingTypes.find((t) => t.id === activeMeetingType)?.label}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 lg:gap-4">
            {iconTypes.map((type, index) => {
              const IconComponent = type.icon;
              const isActive = index === 4; // Example active state

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
                    {currentContent.summary}
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
                    {currentContent.topics.map((topic, index) => (
                      <div key={index}>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                          {topic.title}
                        </h4>
                        <ul className="text-gray-700 dark:text-gray-300 space-y-1 ml-4">
                          {topic.points.map((point, pointIndex) => (
                            <li key={pointIndex}>• {point}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Insights для HR и Sales */}
                {currentContent.insights && (
                  <>
                    {/* Сильные стороны / Положительные моменты */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {activeMeetingType === "hr"
                            ? "Сильные стороны кандидата"
                            : activeMeetingType === "sales"
                              ? "Возможности"
                              : "Положительные моменты"}
                        </h3>
                      </div>
                      <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                        {currentContent.insights.positive.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Слабые стороны / Области для улучшения */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <TrendingDown className="w-5 h-5 text-orange-600" />
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {activeMeetingType === "hr"
                            ? "Слабые стороны кандидата"
                            : activeMeetingType === "sales"
                              ? "Риски и вызовы"
                              : "Области для улучшения"}
                        </h3>
                      </div>
                      <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                        {currentContent.insights.areas.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                {/* Задачи */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Задачи
                    </h3>
                  </div>
                  <ul className="text-gray-700 dark:text-gray-300 space-y-3">
                    {currentContent.tasks.map((task, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Рекомендация для HR */}
                {activeMeetingType === "hr" && (
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
                      системного аналитика. Рекомендуется провести
                      дополнительное обучение по приоритизации задач и методам
                      сбора требований для улучшения его компетенций.
                    </p>
                  </div>
                )}
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
