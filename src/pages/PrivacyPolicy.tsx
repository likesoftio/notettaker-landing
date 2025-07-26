import React from "react";
import Head from "../components/SEO/Head";
import { MobileLayout } from "../components/mobile";
import { Button } from "../components/ui/button";
import { ArrowLeft, Download, Shield, Lock, Eye, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <MobileLayout
      headerProps={{ showBorder: true }}
      footerProps={{ variant: "minimal" }}
    >
      <Head
        title="Политика конфиденциальности - mymeet.ai"
        description="Политика конфиденциальности mymeet.ai. Узнайте, как мы собираем, используем и защищаем ваши персональные данные при использовании сервиса анализа встреч."
        keywords={[
          "политика конфиденциальности",
          "персональные данные",
          "защита данных",
          "mymeet.ai",
          "privacy policy",
          "GDPR",
        ]}
        url="https://mymeet.ai/privacy"
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
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Политика конфиденциальности
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            Как мы обрабатываем и защищаем ваши персональные данные
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
                  href="#introduction"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  1. Введение
                </a>
              </li>
              <li>
                <a
                  href="#data-controller"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  2. Оператор персональных данных
                </a>
              </li>
              <li>
                <a
                  href="#data-types"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  3. Какие данные мы собираем
                </a>
              </li>
              <li>
                <a
                  href="#data-usage"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  4. Как мы используем данные
                </a>
              </li>
              <li>
                <a
                  href="#data-sharing"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  5. Передача данных третьим лицам
                </a>
              </li>
              <li>
                <a
                  href="#data-storage"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  6. Хранение и защита данных
                </a>
              </li>
              <li>
                <a
                  href="#user-rights"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  7. Ваши права
                </a>
              </li>
              <li>
                <a
                  href="#cookies"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  8. Использование cookies
                </a>
              </li>
              <li>
                <a
                  href="#children"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  9. Данные детей
                </a>
              </li>
              <li>
                <a
                  href="#changes"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  10. Изменения политики
                </a>
              </li>
              <li>
                <a
                  href="#contacts"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  11. Контакты
                </a>
              </li>
            </ul>
          </div>

          {/* Версия документа */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-8">
            <p className="text-sm font-medium mb-0">
              <strong>Версия документа:</strong> 3.0 от 20.12.2024
            </p>
          </div>

          <section id="introduction">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              1. Введение
            </h2>

            <p>
              ООО «MyMeet AI» (далее — «Мы», «Компания») серьезно относится к
              защите ваших персональных данных. Настоящая Политика
              конфиденциальности описывает, как мы собираем, используем, храним
              и защищаем информацию при использовании сервиса mymeet.ai.
            </p>

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6">
              <p className="mb-0">
                <strong>Важно:</strong> Используя наш сервис, вы соглашаетесь с
                условиями данной Политики конфиденциальности. Если вы не
                согласны с какими-либо положениями, пожалуйста, прекратите
                использование сервиса.
              </p>
            </div>

            <p>
              Мы соблюдаем требования российского и международного
              законодательства о защите персональных данных, включая:
            </p>

            <ul>
              <li>Федеральный закон №152-ФЗ "О персональных данных"</li>
              <li>Общий регламент по защите данных (GDPR)</li>
              <li>Закон Калифорнии о конфиденциальности потребителей (CCPA)</li>
            </ul>
          </section>

          <section id="data-controller">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              2. Оператор персональных данных
            </h2>

            <p>
              Оператором ваших персональных данных является ООО «MyMeet AI»:
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 my-6">
              <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-3 mt-0">
                Контактная информация оператора
              </h4>
              <ul className="space-y-1 mb-0">
                <li>
                  <strong>Наименование:</strong> Общество с ограниченной
                  ответственностью «MyMeet AI»
                </li>
                <li>
                  <strong>ОГРН:</strong> 1234567890123
                </li>
                <li>
                  <strong>ИНН:</strong> 1234567890
                </li>
                <li>
                  <strong>Адрес:</strong> 123456, г. Москва, ул. Примерная, д.
                  1, стр. 1
                </li>
                <li>
                  <strong>Email:</strong> privacy@mymeet.ai
                </li>
                <li>
                  <strong>Телефон:</strong> +7 (495) 123-45-67
                </li>
              </ul>
            </div>
          </section>

          <section id="data-types">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              3. Какие данные мы собираем
            </h2>

            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">
              3.1. Данные учетной записи
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-4 h-4 text-blue-600" />
                  <strong>Обязательные данные</strong>
                </div>
                <ul className="mb-0">
                  <li>Адрес электронной почты</li>
                  <li>Пароль (в зашифрованном виде)</li>
                  <li>Дата регистрации</li>
                  <li>IP-адрес при регистрации</li>
                </ul>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-4 h-4 text-green-600" />
                  <strong>Дополнительные данные</strong>
                </div>
                <ul className="mb-0">
                  <li>Имя и фамилия</li>
                  <li>Название организации</li>
                  <li>Должность</li>
                  <li>Телефон</li>
                  <li>Фотография профиля</li>
                </ul>
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">
              3.2. Данные об использовании сервиса
            </h3>
            <ul>
              <li>Загруженные аудио- и видеофайлы</li>
              <li>Транскрипции и результаты анализа</li>
              <li>Настройки и предпочтения</li>
              <li>История использования функций</li>
              <li>Статистика использования</li>
            </ul>

            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">
              3.3. Технические данные
            </h3>
            <ul>
              <li>IP-адрес и геолокация</li>
              <li>Тип и версия браузера</li>
              <li>Операционная система</li>
              <li>Информация об устройстве</li>
              <li>Логи действий в системе</li>
              <li>Cookies и аналогичные технологии</li>
            </ul>

            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">
              3.4. Платежные данные
            </h3>
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6">
              <p className="mb-2">
                <strong>Важно:</strong> Мы НЕ храним данные банковских карт. Все
                платежи обрабатываются через сертифицированные платежные системы
                (ЮKassa, Stripe), соответствующие стандарту PCI DSS.
              </p>
            </div>

            <p>Мы сохраняем только:</p>
            <ul>
              <li>Факт совершения платежа</li>
              <li>Сумму и дату транзакции</li>
              <li>Статус платежа</li>
              <li>Последние 4 цифры номера карты (для идентификации)</li>
            </ul>
          </section>

          <section id="data-usage">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              4. Как мы используем данные
            </h2>

            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">
              4.1. Основные цели обработки
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="p-3 text-left font-semibold border-b border-gray-200 dark:border-gray-600">
                      Цель обработки
                    </th>
                    <th className="p-3 text-left font-semibold border-b border-gray-200 dark:border-gray-600">
                      Правовое основание
                    </th>
                    <th className="p-3 text-left font-semibold border-b border-gray-200 dark:border-gray-600">
                      Категории данных
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border-b border-gray-200 dark:border-gray-600">
                      Предоставление сервиса
                    </td>
                    <td className="p-3 border-b border-gray-200 dark:border-gray-600">
                      Исполнение договора
                    </td>
                    <td className="p-3 border-b border-gray-200 dark:border-gray-600">
                      Учетные данные, контент
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-gray-200 dark:border-gray-600">
                      Техническая поддержка
                    </td>
                    <td className="p-3 border-b border-gray-200 dark:border-gray-600">
                      Исполнение договора
                    </td>
                    <td className="p-3 border-b border-gray-200 dark:border-gray-600">
                      Контактные данные, логи
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-gray-200 dark:border-gray-600">
                      Выставление счетов
                    </td>
                    <td className="p-3 border-b border-gray-200 dark:border-gray-600">
                      Исполнение договора
                    </td>
                    <td className="p-3 border-b border-gray-200 dark:border-gray-600">
                      Платежные данные
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-gray-200 dark:border-gray-600">
                      Улучшение сервиса
                    </td>
                    <td className="p-3 border-b border-gray-200 dark:border-gray-600">
                      Законный интерес
                    </td>
                    <td className="p-3 border-b border-gray-200 dark:border-gray-600">
                      Данные об использовании
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-gray-200 dark:border-gray-600">
                      Безопасность
                    </td>
                    <td className="p-3 border-b border-gray-200 dark:border-gray-600">
                      Законный интерес
                    </td>
                    <td className="p-3 border-b border-gray-200 dark:border-gray-600">
                      Технические данные, логи
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3">Маркетинг</td>
                    <td className="p-3">Согласие</td>
                    <td className="p-3">Контактные данные</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
              4.2. Обработка аудио и видео контента
            </h3>
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 my-6">
              <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-3 mt-0">
                Особенности обработки мультимедиа
              </h4>
              <ul className="mb-3">
                <li>Автоматическая транскрипция речи в текст</li>
                <li>Извлечение ключевых тем и решений</li>
                <li>Анализ тональности и эмоций (опционально)</li>
                <li>Создание саммари и отчетов</li>
              </ul>
              <p className="mb-0">
                <strong>Важно:</strong> Мы обрабатываем только контент, который
                вы загружаете добровольно. Вы несете ответственность за
                получение согласия всех участников записи.
              </p>
            </div>
          </section>

          <section id="user-rights">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              7. Ваши права
            </h2>

            <p>
              В соответствии с законодательством о защите персональных данных,
              вы имеете следующие права:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold mb-2 mt-0">Право на доступ</h4>
                <p className="mb-0">
                  Получать информацию о том, какие данные мы обрабатываем
                </p>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold mb-2 mt-0">
                  Право на исправление
                </h4>
                <p className="mb-0">Исправлять неточные или неполные данные</p>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold mb-2 mt-0">Право на удаление</h4>
                <p className="mb-0">
                  Удалять ваши персональные данные ("право быть забытым")
                </p>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold mb-2 mt-0">
                  Право на ограничение
                </h4>
                <p className="mb-0">
                  Ограничивать обработку ваших данных в определенных случаях
                </p>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold mb-2 mt-0">
                  Право на портируемость
                </h4>
                <p className="mb-0">
                  Получать ваши данные в структурированном формате
                </p>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold mb-2 mt-0">Право на возражение</h4>
                <p className="mb-0">
                  Возражать против обработки данных в маркетинговых целях
                </p>
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">
              7.1. Как реализовать свои права
            </h3>
            <p>Для реализации своих прав вы можете:</p>
            <ul>
              <li>Использовать настройки в личном кабинете</li>
              <li>Отправить запрос на email: privacy@mymeet.ai</li>
              <li>Связаться с нашей службой поддержки</li>
            </ul>

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6">
              <p className="mb-0">
                <strong>Сроки рассмотрения:</strong> Мы рассматриваем запросы в
                течение 30 дней с момента получения. В сложных случаях срок
                может быть продлен до 60 дней с уведомлением.
              </p>
            </div>
          </section>

          <hr className="my-8 border-gray-200 dark:border-gray-700" />

          {/* Контактная информация */}
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold mb-4 mt-0">
              Контакты по вопросам конфиденциальности
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 mt-0">
                  Ответственный за обработку данных:
                </h4>
                <p>Иванов Иван Иванович</p>
                <p>Email: privacy@mymeet.ai</p>
                <p className="mb-0">Телефон: +7 (495) 123-45-67, доб. 101</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2 mt-0">Служба поддержки:</h4>
                <p>Email: support@mymeet.ai</p>
                <p>Телефон: +7 (495) 123-45-67</p>
                <p className="mb-0">Часы работы: Пн-Пт, 9:00-18:00 (МСК)</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm mb-0">
                <strong>Жалобы в надзорные органы:</strong> В случае нарушения
                ваших прав вы можете обратиться в Роскомнадзор или европейские
                надзорные органы по защите данных.
              </p>
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
