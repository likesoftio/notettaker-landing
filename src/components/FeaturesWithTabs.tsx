import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  FileText,
  BarChart3,
  Settings,
  Users,
  Zap,
  CheckCircle,
  ArrowRight,
  Play,
  Download,
} from "lucide-react";

export default function FeaturesWithTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const tabs = [
    {
      id: "chat",
      icon: MessageSquare,
      title: "AI Чат",
      subtitle: "Интерактивное общение",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
      features: [
        "Задавайте вопросы по встречам",
        "Получайте инсайты и рекомендации",
        "Анализ контекста разговора",
        "Персонализированные ответы",
      ],
      color: "blue",
    },
    {
      id: "reports",
      icon: FileText,
      title: "AI Отчеты",
      subtitle: "Умные саммари",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      features: [
        "Автоматические протоколы встреч",
        "Выделение ключевых решений",
        "Список задач с дедлайнами",
        "Экспорт в разных форматах",
      ],
      color: "green",
    },
    {
      id: "transcription",
      icon: BarChart3,
      title: "Транскрипт",
      subtitle: "Точная расшифровка",
      image:
        "https://images.unsplash.com/photo-1553484771-371a605b060b?w=600&h=400&fit=crop",
      features: [
        "Распознавание 73 языков",
        "Разделение по спикерам",
        "Очистка от слов-паразитов",
        "Временные метки",
      ],
      color: "purple",
    },
    {
      id: "integrations",
      icon: Settings,
      title: "Интеграции",
      subtitle: "Подключение к системам",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      features: [
        "Zoom, Teams, Google Meet",
        "CRM системы",
        "Календари и планировщики",
        "Telegram и Slack боты",
      ],
      color: "orange",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % tabs.length);
    }, 5000); // Автопереключение каждые 5 секунд

    return () => clearInterval(interval);
  }, [tabs.length]);

  const currentTab = tabs[activeTab];
  const IconComponent = currentTab.icon;

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gray-50 dark:bg-gray-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Полный набор{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI инструментов
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Все необходимые функции для работы с встречами в одной платформе
          </p>
        </div>

        {/* Табы */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab, index) => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeTab === index
                    ? "bg-blue-600 text-white shadow-xl"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <TabIcon className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-bold">{tab.title}</div>
                  <div className="text-xs opacity-80">{tab.subtitle}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Контент активного таба */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Левая часть - описание */}
            <div className="p-8 lg:p-12">
              <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <IconComponent className="w-4 h-4" />
                {currentTab.title}
              </div>

              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {currentTab.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
                {currentTab.subtitle} для максимальной эффективности ваших
                встреч
              </p>

              {/* Список особенностей */}
              <div className="space-y-4 mb-8">
                {currentTab.features.map((feature, index) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Кнопки действий */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <Play className="w-5 h-5" />
                  Посмотреть демо
                </button>
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl transition-all duration-300">
                  <Download className="w-5 h-5" />
                  Скачать пример
                </button>
              </div>
            </div>

            {/* Правая часть - изображение/демо */}
            <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

              {/* Заглушка изображения */}
              <div className="h-full min-h-[400px] flex items-center justify-center">
                <div className="text-center text-blue-600 dark:text-blue-400">
                  <IconComponent className="w-24 h-24 mx-auto mb-4 opacity-50" />
                  <div className="text-lg font-semibold opacity-70">
                    {currentTab.title} Demo
                  </div>
                  <div className="text-sm opacity-50 mt-2">
                    Интерактивный интерфейс
                  </div>
                </div>
              </div>

              {/* Плавающие элементы */}
              <div className="absolute top-4 right-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
              <div className="absolute bottom-4 left-4">
                <div className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full backdrop-blur-sm">
                  Активно
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Индикаторы прогресса */}
        <div className="flex justify-center gap-2 mt-8">
          {tabs.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeTab === index
                  ? "bg-blue-600 scale-125"
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              }`}
            />
          ))}
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              4
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              Основных модуля
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              73
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              Языка поддержки
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              20+
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              Интеграций
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              24/7
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              Доступность
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
