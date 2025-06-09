import React from "react";
import { Lock, Eye, Package, Shield } from "lucide-react";

export default function SecurityEnhanced() {
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
    <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 md:p-8 lg:p-12">
          {/* Header Section */}
          <div className="mb-12 lg:mb-16">
            {/* Security Icon */}
            <div className="mb-8">
              <div className="w-9 h-12 relative">
                <Shield className="w-full h-full text-gray-900 dark:text-white" />
              </div>
            </div>

            {/* Title and Description */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div className="w-full lg:w-[56%]">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 dark:text-white leading-tight">
                  Безопасность
                </h2>
              </div>

              <div className="w-full lg:w-[32%]">
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  Защита данных пользователей — приоритет. Для сервиса
                  используются методы обеспечения безопасности корпоративного
                  уровня
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="mb-12 lg:mb-16">
            <div className="h-px bg-gray-200 dark:bg-gray-700 w-full"></div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-20">
            {securityFeatures.map((feature, index) => {
              const IconComponent = feature.icon;

              return (
                <div key={feature.id} className="flex flex-col gap-4 group">
                  {/* Icon */}
                  <div className="w-9 h-9 bg-gray-900 dark:bg-white rounded flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-5 h-5 text-white dark:text-gray-900" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg md:text-xl font-medium text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
