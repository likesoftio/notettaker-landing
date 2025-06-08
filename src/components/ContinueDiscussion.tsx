import React, { useEffect, useRef } from "react";
import {
  MessageCircle,
  Users,
  Clock,
  Lightbulb,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function ContinueDiscussion() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.3;

      const parallaxElements =
        sectionRef.current.querySelectorAll(".parallax-bg");
      sectionRef.current.querySelectorAll(".parallax-element");
      parallaxElements.forEach((element, index) => {
        const speed = 0.3 + index * 0.1;
        (element as HTMLElement).style.transform =
          `translateY(${rate * speed}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: MessageCircle,
      title: "Общение с чатом",
      description:
        "Задавайте любые вопросы по встречам — ИИ проанализирует транскрипт, найдёт ответы и инсайты",
      color: "blue",
    },
    {
      icon: Lightbulb,
      title: "AI рекомендации",
      description:
        "Рекомендации создаются к каждому ответу. Они учитывают контекст встречи и предыдущих вопросов",
      color: "purple",
    },
    {
      icon: CheckCircle,
      title: "Комплексные ответы",
      description:
        "Чат отвечает не только текстом, но и создаёт списки, этапы проектов и таблицы",
      color: "green",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 dark:from-indigo-900 dark:via-blue-900 dark:to-cyan-900 overflow-hidden"
    >
      {/* Параллакс фон */}
      <div className="parallax-element absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="parallax-element absolute top-40 right-20 w-64 h-64 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="parallax-element absolute bottom-20 left-1/3 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <MessageCircle className="w-4 h-4" />
            AI Чат
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Продолжайте обсуждение{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              после завершения встречи
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Спрашивайте у AI Чата уточняющие вопросы по встрече. Соберём
            статусы, тезисы и блокеры в один ответ
          </p>
        </div>

        {/* Основной блок с демонстрацией */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Левая часть - демо чата */}
          <div className="order-2 lg:order-1">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Заголовок чата */}
              <div className="bg-gradient-to-r from-indigo-600 to-cyan-600 p-6 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Чат</h3>
                    <p className="text-indigo-100 text-sm">
                      Встреча от 15 декабря 2024
                    </p>
                  </div>
                </div>
              </div>

              {/* Сообщения */}
              <div className="p-6 space-y-4 h-96 overflow-y-auto">
                {/* Вопрос пользователя */}
                <div className="flex justify-end">
                  <div className="bg-indigo-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-xs">
                    <p className="text-sm">
                      Какие стратегии для upselling обсуждались на встрече?
                    </p>
                  </div>
                </div>

                {/* Ответ AI */}
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-md">
                    <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">
                      notetaker.ru
                    </div>
                    <div className="text-sm space-y-2">
                      <p>
                        В ходе встречи обсуждались несколько стратегий для
                        upselling:
                      </p>
                      <div className="space-y-1">
                        <p>
                          <strong>
                            1. Работа с существующей базой клиентов
                          </strong>
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 pl-3">
                          Илья отметил, что "основная работа связана с работой
                          внутри базы по апселлингу"
                        </p>
                        <p>
                          <strong>2. Консультативный подход</strong>
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 pl-3">
                          Илья также упомянул необходимость "более
                          персонализированного подхода к клиентам"
                        </p>
                        <p>
                          <strong>3. Обработка входящих заявок</strong>
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 pl-3">
                          В идеальном мире "реагирует за 5 минут, выставляет
                          счёт, консультирует и продаёт"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Рекомендуемые вопросы */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Рекомендуемые вопросы:
                    </span>
                  </div>
                  <div className="space-y-2">
                    <button className="w-full text-left p-2 text-sm text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors">
                      ✨ Какие методы практического обучения вы рассматриваете?
                    </button>
                    <button className="w-full text-left p-2 text-sm text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors">
                      ✨ Как вы планируете улучшить базу знаний?
                    </button>
                  </div>
                </div>
              </div>

              {/* Поле ввода */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 rounded-xl p-3">
                  <input
                    type="text"
                    placeholder="Какие стратегии вы рассматриваете для upselling?"
                    className="flex-1 bg-transparent text-sm focus:outline-none text-gray-900 dark:text-white placeholder-gray-500"
                    disabled
                  />
                  <button className="bg-indigo-600 text-white rounded-lg p-2 hover:bg-indigo-700 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Правая часть - особенности */}
          <div className="order-1 lg:order-2 space-y-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="flex items-start gap-4 group"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${feature.color}-50 dark:bg-${feature.color}-900/20 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon
                    className={`w-6 h-6 text-${feature.color}-600 dark:text-${feature.color}-400`}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Статистики */}
        <div className="parallax-element bg-white dark:bg-gray-800 rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                95%
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Точность ответов
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">
                &lt;30s
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Время ответа
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                ∞
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Количество вопросов
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            Задать вопрос AI →
          </button>
          <p className="text-gray-500 dark:text-gray-400 mt-4">Подробнее →</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}
