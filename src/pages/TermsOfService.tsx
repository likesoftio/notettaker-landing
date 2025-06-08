import React from "react";
import Head from "../components/SEO/Head";
import { MobileLayout } from "../components/mobile";
import { Button } from "../components/ui/button";
import {
  ArrowLeft,
  Download,
  Mail,
  Phone,
  MapPin,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function TermsOfService() {
  return (
    <MobileLayout
      headerProps={{ showBorder: true }}
      footerProps={{ variant: "minimal" }}
    >
      <Head
        title="Пользовательское соглашение - mymeet.ai"
        description="Пользовательское соглашение и условия использования сервиса mymeet.ai для анализа встреч с помощью искусственного интеллекта."
        keywords={[
          "пользовательское соглашение",
          "условия использования",
          "mymeet.ai",
          "юридические документы",
          "terms of service",
        ]}
        url="https://mymeet.ai/terms"
      />

      <main className="container mx-auto px-4 py-6 sm:py-8 lg:py-12 max-w-4xl">
        {/* Навигация назад */}
        <div className="mb-6">
          <Button
            variant="ghost"
            asChild
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              На главную
            </Link>
          </Button>
        </div>

        {/* Заголовок страницы */}
        <header className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Пользовательское соглашение
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            Условия использования сервиса mymeet.ai
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 italic">
            Последнее обновление: 20 декабря 2024 года
          </p>

          {/* Кнопка для скачивания */}
          <div className="mt-6">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Скачать PDF
            </Button>
          </div>
        </header>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          {/* Оглавление */}
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4 mt-0">Содержание</h3>
            <ul className="space-y-2 mb-0">
              <li>
                <a
                  href="#general"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  1. Общие положения
                </a>
              </li>
              <li>
                <a
                  href="#definitions"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  2. Определения
                </a>
              </li>
              <li>
                <a
                  href="#registration"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  3. Регистрация и учетная запись
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  4. Описание сервиса
                </a>
              </li>
              <li>
                <a
                  href="#user-rights"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  5. Права и обязанности пользователя
                </a>
              </li>
              <li>
                <a
                  href="#company-rights"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  6. Права и обязанности компании
                </a>
              </li>
              <li>
                <a
                  href="#payment"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  7. Оплата и возврат средств
                </a>
              </li>
              <li>
                <a
                  href="#data-protection"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  8. Защита персональных данных
                </a>
              </li>
              <li>
                <a
                  href="#liability"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  9. Ответственность
                </a>
              </li>
              <li>
                <a
                  href="#changes"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  10. Изменения соглашения
                </a>
              </li>
              <li>
                <a
                  href="#contacts"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  11. Контактная информация
                </a>
              </li>
            </ul>
          </div>

          {/* Версия документа */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-8">
            <p className="text-sm font-medium mb-0">
              <strong>Версия документа:</strong> 2.1 от 20.12.2024
            </p>
          </div>

          <section id="general">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              1. Общие положения
            </h2>

            <p>
              Настоящее Пользовательское соглашение (далее — «Соглашение»)
              регулирует отношения между ООО «MyMeet AI» (далее — «Компания»,
              «Мы») и физическими или юридическими лицами (далее —
              «Пользователь», «Вы»), использующими сервис mymeet.ai.
            </p>

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6">
              <p className="mb-0">
                <strong>Важно:</strong> Используя наш сервис, вы автоматически
                соглашаетесь со всеми условиями данного соглашения. Если вы не
                согласны с какими-либо условиями, пожалуйста, прекратите
                использование сервиса.
              </p>
            </div>

            <p>
              Соглашение вступает в силу с момента начала использования сервиса
              и действует до момента прекращения использования сервиса
              Пользователем или расторжения Соглашения по инициативе любой из
              сторон.
            </p>
          </section>

          <section id="definitions">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              2. Определения
            </h2>

            <p>В данном соглашении используются следующие термины:</p>

            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 my-6">
              <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2 mt-0">
                Сервис mymeet.ai
              </h4>
              <p className="mb-0">
                Программно-аппаратный комплекс, включающий веб-платформу,
                мобильные приложения и API для анализа аудио- и видеозаписей
                встреч с помощью технологий искусственного интеллекта.
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 my-6">
              <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2 mt-0">
                Пользователь
              </h4>
              <p className="mb-0">
                Физическое или юридическое лицо, использующее сервис mymeet.ai в
                соответствии с настоящим соглашением.
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 my-6">
              <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2 mt-0">
                Контент
              </h4>
              <p className="mb-0">
                Любая информация, загружаемая, передаваемая или создаваемая
                Пользователем при использовании сервиса, включая аудио- и
                видеозаписи, текстовые транскрипции, отчеты и аналитические
                данные.
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 my-6">
              <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2 mt-0">
                Учетная запись
              </h4>
              <p className="mb-0">
                Персональная область Пользователя в сервисе, созданная после
                прохождения процедуры регистрации.
              </p>
            </div>
          </section>

          <section id="registration">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              3. Регистрация и учетная запись
            </h2>

            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">
              3.1. Процедура регистрации
            </h3>
            <p>
              Для использования сервиса Пользователь должен создать учетную
              запись, предоставив следующую информацию:
            </p>

            <ul>
              <li>Действующий адрес электронной почты</li>
              <li>Надежный пароль</li>
              <li>Согласие на обработку персональных данных</li>
              <li>Подтверждение возраста (не менее 18 лет)</li>
            </ul>

            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">
              3.2. Ответственность за учетную запись
            </h3>
            <p>
              Пользователь несет полную ответственность за сохранность данных
              своей учетной записи и все действия, совершенные под этой учетной
              записью. В случае подозрения на несанкционированный доступ
              Пользователь обязан немедленно уведомить Компанию.
            </p>

            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">
              3.3. Ограничения регистрации
            </h3>
            <p>
              Компания оставляет за собой право отказать в регистрации без
              объяснения причин.
            </p>
          </section>

          <section id="services">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              4. Описание сервиса
            </h2>

            <p>Сервис mymeet.ai предоставляет следующие основные функции:</p>

            <ol>
              <li>
                <strong>Транскрипция аудио и видео:</strong> Автоматическое
                преобразование речи в текст с использованием технологий ИИ
              </li>
              <li>
                <strong>Анализ встреч:</strong> Извлечение ключевых тем, решений
                и действий из записей встреч
              </li>
              <li>
                <strong>Генерация отчетов:</strong> Создание структурированных
                отчетов по результатам встреч
              </li>
              <li>
                <strong>Интеграции:</strong> Подключение к популярным платформам
                для видеоконференций и CRM-системам
              </li>
              <li>
                <strong>Аналитика:</strong> Предоставление статистики и
                аналитических данных по встречам
              </li>
            </ol>

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6">
              <p className="mb-0">
                <strong>Ограничения сервиса:</strong> Качество анализа зависит
                от качества исходного аудио/видео материала. Компания не
                гарантирует 100% точность транскрипции и анализа.
              </p>
            </div>
          </section>

          <section id="user-rights">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              5. Права и обязанности пользователя
            </h2>

            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">
              5.1. Права пользователя
            </h3>
            <ul>
              <li>
                Использовать сервис в соответствии с выбранным тарифным планом
              </li>
              <li>Загружать и обрабатывать собственный контент</li>
              <li>Экспортировать результаты анализа</li>
              <li>Получать техническую поддержку</li>
              <li>Удалить свою учетную запись в любое время</li>
            </ul>

            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">
              5.2. Обязанности пользователя
            </h3>
            <ul>
              <li>Предоставлять достоверную информацию при регистрации</li>
              <li>
                Соблюдать авторские права и права на интеллектуальную
                собственность
              </li>
              <li>Не загружать контент, нарушающий законодательство РФ</li>
              <li>
                Обеспечивать согласие участников встреч на запись и обработку
              </li>
              <li>Своевременно оплачивать услуги согласно выбранному тарифу</li>
            </ul>

            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">
              5.3. Запрещенные действия
            </h3>
            <p>Пользователю запрещается:</p>
            <ul>
              <li>Использовать сервис для незаконных целей</li>
              <li>Пытаться получить несанкционированный доступ к системе</li>
              <li>Распространять вредоносное программное обеспечение</li>
              <li>Нарушать работу сервиса или серверов</li>
              <li>Передавать доступ к учетной записи третьим лицам</li>
            </ul>
          </section>

          <section id="payment">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              7. Оплата и возврат средств
            </h2>

            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">
              7.1. Тарифные планы
            </h3>
            <p>
              Компания предлагает различные тарифные планы, включая бесплатный
              тариф с ограниченным функционалом и платные тарифы с расширенными
              возможностями.
            </p>

            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">
              7.2. Оплата
            </h3>
            <ul>
              <li>Оплата производится в российских рублях</li>
              <li>
                Доступны различные способы оплаты (карты, электронные кошельки)
              </li>
              <li>Платежи обрабатываются через защищенные платежные системы</li>
              <li>НДС включен в стоимость для резидентов РФ</li>
            </ul>

            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">
              7.3. Возврат средств
            </h3>
            <p>
              Возврат средств возможен в течение 14 дней с момента оплаты при
              условии, что сервис не использовался в полном объеме. Возврат
              осуществляется на банковскую карту или счет, с которого была
              произведена оплата.
            </p>
          </section>

          <hr className="my-8 border-gray-200 dark:border-gray-700" />

          {/* Контактная информация */}
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold mb-4 mt-0">
              Контактная информация
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4" />
                  <h4 className="font-semibold mt-0 mb-0">Email:</h4>
                </div>
                <p>support@mymeet.ai</p>
                <p className="mb-0">legal@mymeet.ai</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="w-4 h-4" />
                  <h4 className="font-semibold mt-0 mb-0">Телефон:</h4>
                </div>
                <p className="mb-0">+7 (495) 123-45-67</p>
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4" />
                  <h4 className="font-semibold mt-0 mb-0">
                    Юридический адрес:
                  </h4>
                </div>
                <p className="mb-0">
                  123456, г. Москва, ул. Примерная, д. 1, стр. 1, офис 101
                </p>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
            © 2024 ООО «MyMeet AI». Все права защищены.
          </p>
        </div>
      </main>
    </MobileLayout>
  );
}
