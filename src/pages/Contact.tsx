import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Calendar,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Clock,
  Users,
  Zap,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    demoType: "standard",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const features = [
    {
      icon: Clock,
      title: "Быстрая обработка",
      description: "Часовая встреча обрабатывается за 5 минут",
    },
    {
      icon: Users,
      title: "Поддержка 19 языков",
      description: "Высокая точн��сть распознавания речи",
    },
    {
      icon: Zap,
      title: "ИИ-анализ",
      description: "Автоматическое создание отчетов и задач",
    },
  ];

  return (
    <div className="page-container">
      <Header />

      <main className="page-main">
        {/* Header */}
        <div className="page-header">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="page-title">Свяжитесь с нами</h1>
          </div>
          <p className="page-subtitle">
            Готовы узнать, как mymeet.ai может улучшить ваши встречи? Оставьте
            заявку на демонстрацию или свяжитесь с нами любым удобным способом
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <Card className="p-6 sm:p-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                Забронировать демо
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Имя *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    placeholder="Ваше имя"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    placeholder="email@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Компания
                  </label>
                  <Input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    placeholder="Название компании"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Телефон
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Тип демонстрации
                </label>
                <select
                  name="demoType"
                  value={formData.demoType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="standard">
                    Стандартная демонстрация (30 мин)
                  </option>
                  <option value="extended">
                    Расширенная демонстрация (60 мин)
                  </option>
                  <option value="custom">Индивидуальная презентация</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Комментарий
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  placeholder="Расскажите о ваших потребностях, команде и ожиданиях от встречи..."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                size="lg"
              >
                Забронировать демонстрацию
              </Button>

              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Мы свяжемся с вами в течение 24 часов для подтверждения встречи
              </p>
            </form>
          </Card>

          {/* Info Section */}
          <div className="space-y-6 lg:space-y-8">
            {/* Contact Info */}
            <Card className="p-6 sm:p-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Контактная информация
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Email
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      support@mymeet.ai
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Телефон
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      +7 (800) 123-45-67
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Telegram
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      @mymeet_support
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Адрес
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      Москва, Россия
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Features */}
            <Card className="p-6 sm:p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 border-blue-200 dark:border-blue-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Что вы получите на демо
              </h3>

              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-400 text-sm font-bold">
                      ✓
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong className="text-gray-900 dark:text-white">
                      Бесплатный пробный период
                    </strong>{" "}
                    — начните использовать mymeet.ai сразу после демонстрации
                  </p>
                </div>
              </div>
            </Card>

            {/* Quick Start */}
            <Card className="p-6 sm:p-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Хотите начать прямо сейчас?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Зарегистрируйтесь и получите 180 минут бесплатной транскрипции
                без привязки карты
              </p>
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                asChild
              >
                <a
                  href="https://app.notetaker.ru/"
                  target="_blank"
                  rel="noopener"
                >
                  Начать бесплатно
                </a>
              </Button>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
