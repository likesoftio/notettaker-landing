import React, { useState } from "react";
import { Lock, Eye, Package, Shield } from "lucide-react";

export default function SecurityEnhanced() {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  const securityFeatures = [
    {
      id: "encryption",
      icon: Lock,
      title: "Шифрование",
      description:
        "Передаваемые данные шифруются с использованием TLS 1.2+, а при хранении — с использованием стандартного алгоритма AES-256",
    },
    {
      id: "access",
      icon: Eye,
      title: "Доступ и хранение",
      description:
        "Все аккаунты имеют требования аутентификации, чтобы защитить данные в вашем личном кабинете. Ваши данные не передаются третьим лицам",
    },
    {
      id: "backup",
      icon: Package,
      title: "Резервное копирование",
      description:
        "Данные автоматически сохраняются на серверах посредством облачных резервных копий с усовершенствованным шифрованием и надежными протоколами хранения",
    },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 bg-white dark:bg-gray-900 overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-transparent to-purple-100 dark:from-blue-900 dark:to-purple-900"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200 dark:bg-blue-800 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-200 dark:bg-purple-800 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 md:p-8 lg:p-12 border border-gray-100 dark:border-gray-800">
          {/* Header Section */}
          <div className="mb-12 lg:mb-16">
            {/* Security Icon */}
            <div className="mb-8 group">
              <div className="w-9 h-12 relative transform transition-transform duration-500 group-hover:scale-110">
                <Shield className="w-full h-full text-gray-900 dark:text-white" />
              </div>
            </div>

            {/* Title and Description */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 overflow-hidden">
              <div className="w-full lg:w-[56%]">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 dark:text-white leading-tight">
                  Безопасность
                </h2>
              </div>

              <div className="w-full lg:w-[32%]">
                <div className="overflow-hidden">
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 text-left">
                    Защита данных пользователей — приоритет. Для сервиса
                    используются методы обеспечения безопасности корпоративного
                    уровня
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Divider */}
          <div className="mb-12 lg:mb-16">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-700 w-full"></div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-20">
            {securityFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              const isHovered = hoveredFeature === feature.id;

              return (
                <div
                  key={feature.id}
                  className="flex flex-col gap-4 group cursor-pointer p-4 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-all duration-300"
                  onMouseEnter={() => setHoveredFeature(feature.id)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  onClick={() =>
                    setHoveredFeature(
                      hoveredFeature === feature.id ? null : feature.id,
                    )
                  }
                >
                  {/* Icon */}
                  <div
                    className={`
                    w-9 h-9 rounded flex items-center justify-center
                    transition-all duration-300 ease-out
                    ${
                      isHovered
                        ? "bg-blue-600 dark:bg-blue-500 scale-110 shadow-lg"
                        : "bg-gray-900 dark:bg-white group-hover:scale-105"
                    }
                  `}
                  >
                    <IconComponent
                      className={`
                      w-5 h-5 transition-colors duration-300
                      ${
                        isHovered
                          ? "text-white"
                          : "text-white dark:text-gray-900"
                      }
                    `}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-2">
                    <h3
                      className={`
                      text-lg md:text-xl font-medium transition-all duration-300
                      ${
                        isHovered
                          ? "text-blue-600 dark:text-blue-400 transform translate-x-1"
                          : "text-gray-900 dark:text-white"
                      }
                    `}
                    >
                      {feature.title}
                    </h3>

                    <p
                      className={`
                      text-sm leading-relaxed transition-all duration-300
                      ${
                        isHovered
                          ? "text-gray-700 dark:text-gray-300"
                          : "text-gray-600 dark:text-gray-400"
                      }
                    `}
                    >
                      {feature.description}
                    </p>
                  </div>

                  {/* Hover indicator */}
                  <div
                    className={`
                    h-0.5 bg-gradient-to-r from-blue-600 to-purple-600
                    transition-all duration-300 ease-out
                    ${isHovered ? "w-12 opacity-100" : "w-0 opacity-0"}
                  `}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
