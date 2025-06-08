import { Lock, Shield, Archive } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function SecuritySection() {
  const { t } = useLanguage();

  const securityFeatures = [
    {
      icon: Lock,
      title: "Шифрование",
      titleEn: "Encryption",
      description:
        "Передаваемые данные шифруются с использованием TLS 1.2+, а при хранении — с использованием стандартного алгоритма AES-256",
      descriptionEn:
        "Data transmission is encrypted using TLS 1.2+, and storage uses the standard AES-256 algorithm",
    },
    {
      icon: Shield,
      title: "Доступ и хранение",
      titleEn: "Access and Storage",
      description:
        "Все аккаунты имеют требования аутентификации, чтобы защитить данные в вашем личном кабинете. Ваши данные не передаются третьим лицам",
      descriptionEn:
        "All accounts have authentication requirements to protect data in your personal cabinet. Your data is not shared with third parties",
    },
    {
      icon: Archive,
      title: "Резервное копирование",
      titleEn: "Backup",
      description:
        "Данные автоматически сохраняются на серверах посредством облачных резервных копий с усовершенствованным шифрованием и надежными протоколами хранения",
      descriptionEn:
        "Data is automatically saved on servers through cloud backups with advanced encryption and reliable storage protocols",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center">
                <Lock className="w-6 h-6 text-white dark:text-gray-900" />
              </div>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t("security.title") || "Безопасность"}
            </h2>

            <div className="space-y-8">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-900 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {t(`security.${index}.title`) || feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t(`security.${index}.description`) ||
                        feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right content */}
          <div className="lg:pl-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                {t("security.highlight") ||
                  "Защита данных пользователей — приоритет. Для сервиса используются методы обеспечения безопасности корпоративного уровня"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
