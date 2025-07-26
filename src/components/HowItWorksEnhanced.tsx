import React, { useEffect, useRef } from "react";
import {
  Upload,
  Sparkles,
  FileText,
  BarChart3,
  Users,
  MessageSquare,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HowItWorksEnhanced() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;

      // Применяем параллакс только к фоновым элементам
      const parallaxElements =
        sectionRef.current.querySelectorAll(".parallax-bg");
      parallaxElements.forEach((element, index) => {
        const speed = 0.3 + index * 0.1;
        (element as HTMLElement).style.transform =
          `translateY(${rate * speed}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const steps = [
    {
      id: 1,
      icon: Upload,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
      title: t("howItWorks.step1.title") || "Добавьте встречу",
      description:
        t("howItWorks.step1.description") ||
        "Загрузите файл в любом формате или пригласите бота на встречу. Подключите Telegram или календарь, чтобы записывать каждую встречу автоматически",
      image:
        "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&h=400&fit=crop",
    },
    {
      id: 2,
      icon: Sparkles,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
      title: t("howItWorks.step2.title") || "Получите инсайты",
      description:
        t("howItWorks.step2.description") ||
        "Обработанная встреча состоит из транскрипта с разделением на главы и спикеров, выбранного AI Отчета и задач с ответственными и дедлайнами",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    },
    {
      id: 3,
      icon: FileText,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
      title: t("howItWorks.step3.title") || "Отредактируйте и поделитесь",
      description:
        t("howItWorks.step3.description") ||
        "Переименуйте спикеров и отредактируйте транскрипт. Итоговым отчётом можно поделиться с командой или скачать в нужном формате",
      image:
        "https://images.unsplash.com/photo-1553484771-371a605b060b?w=600&h=400&fit=crop",
    },
  ];

  const integrations = [
    { name: "Zoom", logo: "/icons/zoom.svg" },
    { name: "Google Meet", logo: "/icons/google-meet.svg" },
    { name: "Yandex Telemost", logo: "/icons/telemost.svg" },
    { name: "Telegram", logo: "/icons/telegram.svg" },
    { name: "Calendar", logo: "/icons/google-calendar.svg" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 overflow-hidden z-0"
    >
      {/* Параллакс фон */}
      <div className="parallax-bg absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="parallax-bg absolute top-10 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="parallax-bg absolute bottom-10 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {t("howItWorks.title") || "Как работает Notetaker"}{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              notetaker.ru
            </span>
            {language === "en" && <span>{" " + t("howItWorks.work")}</span>}?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t("howItWorks.description") ||
              "Три простых шага для превращения хаотичных обсуждений в структурированные инсайты"}
          </p>
        </div>

        {/* Схема работы */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 mb-20">
          {steps.map((step, index) => (
            <div key={step.id} className="relative group">
              {/* Соединительная линия */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-700 z-0">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                </div>
              )}

              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-105 border border-gray-200 dark:border-gray-700">
                {/* Номер шага */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {step.id}
                </div>

                {/* Иконка */}
                <div
                  className={`w-16 h-16 ${step.bgColor} dark:bg-gray-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <step.icon
                    className={`w-8 h-8 ${step.iconColor} dark:text-gray-300`}
                  />
                </div>

                {/* Контент */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Изображение */}
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Интеграции */}
        <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-200 dark:border-gray-700 z-10">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t("howItWorks.integrations.title") ||
                "Работаем с популярными платформами"}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              {t("howItWorks.integrations.description") ||
                "Подключайтесь к любимым инструментам одним кликом"}
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
            {integrations.map((integration, index) => (
              <div
                key={integration.name}
                className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 px-6 py-4 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300 hover:scale-105 transform"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={integration.logo}
                  alt={integration.name}
                  className="w-10 h-10"
                />
                <span className="font-semibold text-gray-900 dark:text-white">
                  {integration.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="https://app.notetaker.ru"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <MessageSquare className="w-6 h-6 inline mr-2" />
            {t("howItWorks.cta") || "Попробовать бесплатно"}
          </a>
          <p className="text-gray-500 dark:text-gray-400 mt-4">
            {t("howItWorks.ctaDescription") ||
              "180 минут бесплатно • Без привязки карты • Мгновенная настройка"}
          </p>
        </div>
      </div>

      <style>{`
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
