import React, { useEffect, useRef, useState } from "react";
import {
  Volume2,
  CheckCircle,
  Globe,
  Zap,
  Users,
  Settings,
} from "lucide-react";

export default function TranscriptionQuality() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleElements, setVisibleElements] = useState<boolean[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-index") || "0",
            );
            setVisibleElements((prev) => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          }
        });
      },
      { threshold: 0.1 },
    );

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el, index) => {
      el.setAttribute("data-index", index.toString());
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const languages = [
    { code: "🇷🇺", name: "Русский", accuracy: "98%" },
    { code: "🇺🇸", name: "English", accuracy: "99%" },
    { code: "🇩🇪", name: "Deutsch", accuracy: "97%" },
    { code: "🇫🇷", name: "Français", accuracy: "96%" },
    { code: "🇪🇸", name: "Español", accuracy: "97%" },
    { code: "🇮🇹", name: "Italiano", accuracy: "96%" },
    { code: "🇯🇵", name: "日本語", accuracy: "95%" },
    { code: "🇨🇳", name: "中文", accuracy: "94%" },
    { code: "🇰🇷", name: "한국어", accuracy: "93%" },
    { code: "🇳🇱", name: "Nederlands", accuracy: "96%" },
    { code: "🇵🇹", name: "Português", accuracy: "95%" },
    { code: "🇸🇪", name: "Svenska", accuracy: "94%" },
  ];

  const features = [
    {
      icon: Volume2,
      title: "Определение и деление на спикеров",
      description:
        "Можно указать количество спикеров, чтобы результат получился точнее",
      color: "blue",
    },
    {
      icon: CheckCircle,
      title: "Очистка транскрипта",
      description: 'Убираем из транскрипта "ну", "мда" и прочие слова-паразиты',
      color: "green",
    },
    {
      icon: Zap,
      title: "Высокая скорость обработки",
      description:
        "Умеем обрабатывать быстро: часовая встреча превратится в транскрипт за 5 минут",
      color: "yellow",
    },
    {
      icon: Settings,
      title: "AI-улучшение звука встречи",
      description:
        "Используем отдельную модель для очистки дорожки от шумов и посторонних звуков перед обработкой",
      color: "purple",
    },
  ];

  const waveformData = Array.from({ length: 50 }, () => Math.random() * 100);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-white dark:bg-gray-900 overflow-hidden"
    >
      {/* Фоновые элементы */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-blue-500"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="text-center mb-20 animate-on-scroll">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Volume2 className="w-4 h-4" />
            Транскрипт
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Транскрибация русского языка{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              с высокой точностью
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Преобразуем запись в детальный транскрипт за минуты: сохраним знаки,
            уберём слова-паразиты и разделим текст по участникам
          </p>
        </div>

        {/* Основной блок с демонстрацией */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Левая часть - спикеры и транскрипт */}
          <div className="animate-on-scroll">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 border border-blue-200 dark:border-gray-600">
              {/* Участники */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Елизавета 1:54
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Полина 1:54
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Алексей 1:54
                  </span>
                </div>
              </div>

              {/* Визуализация звуковой волны */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-center gap-1 h-16">
                  {waveformData.map((height, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-full transition-all duration-300"
                      style={{
                        width: "4px",
                        height: `${height}%`,
                        animationDelay: `${i * 50}ms`,
                      }}
                    />
                  ))}
                </div>

                {/* Текущий фрагмент */}
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-1">
                    Сейчас говорит: Елизавета
                  </div>
                  <div className="text-gray-800 dark:text-gray-200 font-mono text-sm">
                    "Привет! Как дела у всех?"
                  </div>
                </div>
              </div>

              {/* Демо транскрипта */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    Е
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Елизавета • 00:15
                    </div>
                    <div className="text-gray-800 dark:text-gray-200">
                      Привет! Как дела у всех? Готовы обсуждать новые стратегии?
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    П
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Полина • 00:23
                    </div>
                    <div className="text-gray-800 dark:text-gray-200">
                      Да, отлично! У меня есть несколько идей по маркетингу...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Правая часть - многоязычность */}
          <div className="animate-on-scroll">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Многоязычность
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
              Поддерживаем обработку на 73 язык��х, это не влияет на скорость и
              качество результата
            </p>

            {/* Языки сеткой */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              {languages.map((lang, index) => (
                <div
                  key={lang.name}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{lang.code}</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {lang.name}
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400 font-semibold">
                      {lang.accuracy}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Демо мультиязычности */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg mb-1">你好！</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Китайский
                  </div>
                </div>
                <div>
                  <div className="text-lg mb-1">¡Hola!</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Испанский
                  </div>
                </div>
                <div>
                  <div className="text-lg mb-1">مرحبا</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Арабский
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Особенности */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`animate-on-scroll bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-500 hover:scale-105 ${
                visibleElements[index + 2]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-${feature.color}-50 dark:bg-${feature.color}-900/20`}
              >
                <feature.icon
                  className={`w-6 h-6 text-${feature.color}-600 dark:text-${feature.color}-400`}
                />
              </div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 animate-on-scroll">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            Попробовать бесплатно →
          </button>
        </div>
      </div>
    </section>
  );
}
