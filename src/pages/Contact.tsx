import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { ArrowLeft, Calendar, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("common.toHome")}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <div className="mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Записаться на демо
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Узнайте, как Notetaker может помочь вашей команде повысить
                продуктивность встреч и сохранить важную информацию.
              </p>
            </div>

            <Card className="p-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Имя
                    </label>
                    <Input
                      id="firstName"
                      placeholder="Введите ваше имя"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Фамилия
                    </label>
                    <Input
                      id="lastName"
                      placeholder="Введите вашу фамилию"
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Компания
                  </label>
                  <Input
                    id="company"
                    placeholder="Название вашей компании"
                    className="w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Телефон (опционально)
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+7 (XXX) XXX-XX-XX"
                    className="w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Расскажите о ваших потребностях
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Опишите, как вы планируете использовать Notetaker..."
                    rows={4}
                    className="w-full"
                  />
                </div>

                <Button size="lg" className="w-full">
                  <Calendar className="w-5 h-5 mr-2" />
                  Отправить заявку на демо
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Свяжитесь с нами
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Email
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      hi@notetaker.ru
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Ответим в течение 24 часов
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Телефон
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      8 (985) 621-92-21
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Пн-Пт, 9:00-18:00 МСК
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Адрес
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Гашека 12
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Россия
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Demo Information */}
            <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Что включает демо?
              </h3>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Персональная демонстрация возможностей Notetaker
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Обсуждение ваших потребностей в транскрипции
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Ответы на вопросы о интеграции и ценах
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Пробный период для вашей команды
                </li>
              </ul>
            </Card>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Полезные ссылки
              </h3>
              <div className="space-y-2">
                <Link
                  to="/blog"
                  className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  Блог и кейсы использования
                </Link>
                <Link
                  to="/pricing"
                  className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  Тарифы и цены
                </Link>
                <Link
                  to="/privacy-policy"
                  className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  Политика конфиденциальности
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
