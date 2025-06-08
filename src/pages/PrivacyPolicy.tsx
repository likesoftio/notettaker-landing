import React from "react";
import { HelmetProvider } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "../components/SEO/Head";
import { Button } from "../components/ui/button";
import { ArrowLeft, Download, Shield, Lock, Eye, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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

        <Header />

        <main className="legal-page">
          {/* Навигация назад */}
          <div className="mb-6">
            <Button
              variant="ghost"
              asChild
              className="text-gray-600 dark:text-gray-300"
            >
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                На главную
              </Link>
            </Button>
          </div>

          {/* Заголовок страницы */}
          <header className="legal-page-header">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
              <h1 className="legal-page-title">Политика конфиденциальности</h1>
            </div>
            <p className="legal-page-subtitle">
              Как мы обрабатываем и защищаем ваши персональные данные
            </p>
            <p className="legal-page-updated">
              Последнее обновление: 20 декабря 2024 года
            </p>

            {/* Кнопка для скачивания */}
            <div className="mt-4 flex justify-center">
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Скачать PDF
              </Button>
            </div>
          </header>

          <div className="legal-content">
            {/* Оглавление */}
            <div className="legal-toc">
              <h3>Содержание</h3>
              <ul>
                <li>
                  <a href="#introduction">1. Введение</a>
                </li>
                <li>
                  <a href="#data-controller">2. Оператор персональных данных</a>
                </li>
                <li>
                  <a href="#data-types">3. Какие данные мы собираем</a>
                </li>
                <li>
                  <a href="#data-usage">4. Как мы используем данные</a>
                </li>
                <li>
                  <a href="#data-sharing">5. Передача данных третьим лицам</a>
                </li>
                <li>
                  <a href="#data-storage">6. Хранение и защита данных</a>
                </li>
                <li>
                  <a href="#user-rights">7. Ваши права</a>
                </li>
                <li>
                  <a href="#cookies">8. Использование cookies</a>
                </li>
                <li>
                  <a href="#children">9. Данные детей</a>
                </li>
                <li>
                  <a href="#changes">10. Изменения политики</a>
                </li>
                <li>
                  <a href="#contacts">11. Контакты</a>
                </li>
              </ul>
            </div>

            {/* Версия документа */}
            <div className="legal-version">
              <strong>Версия документа:</strong> 3.0 от 20.12.2024
            </div>

            <section id="introduction">
              <h2>1. Введение</h2>

              <p>
                ООО «MyMeet AI» (далее — «Мы», «Компания») серьезно относится к
                защите ваших персональных данных. Настоящая Политика
                конфиденциальности описывает, как мы собираем, используем,
                храним и защищаем информацию при использовании сервиса
                mymeet.ai.
              </p>

              <div className="important">
                <strong>Важно:</strong> Используя наш сервис, вы соглашаетесь с
                условиями данной Политики конфиденциальности. Если вы не
                согласны с какими-либо положениями, пожалуйста, прекратите
                использование сервиса.
              </div>

              <p>
                Мы соблюдаем требования российского и международного
                законодательства о защите персональных данных, включая:
              </p>

              <ul>
                <li>Федеральный закон №152-ФЗ "О персональных данных"</li>
                <li>Общий регламент по защите данных (GDPR)</li>
                <li>
                  Закон Калифорнии о конфиденциальности потребителей (CCPA)
                </li>
              </ul>
            </section>

            <section id="data-controller">
              <h2>2. Оператор персональных данных</h2>

              <p>
                Оператором ваших персональных данных является ООО «MyMeet AI»:
              </p>

              <div className="definition">
                <div className="definition-term">
                  Контактная информация оператора
                </div>
                <ul>
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
              <h2>3. Какие данные мы собираем</h2>

              <h3>3.1. Данные учетной записи</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-4 h-4 text-blue-600" />
                    <strong>Обязательные данные</strong>
                  </div>
                  <ul>
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
                  <ul>
                    <li>Имя и фамилия</li>
                    <li>Название организации</li>
                    <li>Должность</li>
                    <li>Телефон</li>
                    <li>Фотография профиля</li>
                  </ul>
                </div>
              </div>

              <h3>3.2. Данные об использовании сервиса</h3>
              <ul>
                <li>Загруженные аудио- и видеофайлы</li>
                <li>Транскрипции и результаты анализа</li>
                <li>Настройки и предпочтения</li>
                <li>История использования функций</li>
                <li>Статистика использования</li>
              </ul>

              <h3>3.3. Технические данные</h3>
              <ul>
                <li>IP-адрес и геолокация</li>
                <li>Тип и версия браузера</li>
                <li>Операционная система</li>
                <li>Информация об устройстве</li>
                <li>Логи действий в системе</li>
                <li>Cookies и аналогичные технологии</li>
              </ul>

              <h3>3.4. Платежные данные</h3>
              <div className="important">
                <strong>Важно:</strong> Мы НЕ храним данные банковских карт. Все
                платежи обрабатываются через сертифицированные платежные системы
                (ЮKassa, Stripe), соответствующие стандарту PCI DSS.
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
              <h2>4. Как мы используем данные</h2>

              <h3>4.1. Основные цели обработки</h3>
              <table>
                <thead>
                  <tr>
                    <th>Цель обработки</th>
                    <th>Правовое основание</th>
                    <th>Категории данных</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Предоставление сервиса</td>
                    <td>Исполнение договора</td>
                    <td>Учетные данные, контент</td>
                  </tr>
                  <tr>
                    <td>Техническая поддержка</td>
                    <td>Исполнение договора</td>
                    <td>Контактные данные, логи</td>
                  </tr>
                  <tr>
                    <td>Выставление счетов</td>
                    <td>Исполнение договора</td>
                    <td>Платежные данные</td>
                  </tr>
                  <tr>
                    <td>Улучшение сервиса</td>
                    <td>Законный интерес</td>
                    <td>Данные об использовании</td>
                  </tr>
                  <tr>
                    <td>Безопасность</td>
                    <td>Законный интерес</td>
                    <td>Технические данные, логи</td>
                  </tr>
                  <tr>
                    <td>Маркетинг</td>
                    <td>Согласие</td>
                    <td>Контактные данные</td>
                  </tr>
                </tbody>
              </table>

              <h3>4.2. Обработка аудио и видео контента</h3>
              <div className="definition">
                <div className="definition-term">
                  Особенности обработки мультимедиа
                </div>
                <ul>
                  <li>Автоматическая транскрипция речи в текст</li>
                  <li>Извлечение ключевых тем и решений</li>
                  <li>Анализ тональности и эмоций (опционально)</li>
                  <li>Создание саммари и отчетов</li>
                </ul>
                <p>
                  <strong>Важно:</strong> Мы обрабатываем только контент,
                  который вы загружаете добровольно. Вы несете ответственность
                  за получение согласия всех участников записи.
                </p>
              </div>
            </section>

            <section id="data-sharing">
              <h2>5. Передача данных третьим лицам</h2>

              <h3>5.1. Партнеры и поставщики услуг</h3>
              <p>
                Мы можем передавать данные следующим категориям третьих лиц:
              </p>

              <table>
                <thead>
                  <tr>
                    <th>Категория получателя</th>
                    <th>Цель передачи</th>
                    <th>Правовые гарантии</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Облачные провайдеры</td>
                    <td>Хранение данных</td>
                    <td>DPA, сертификация SOC 2</td>
                  </tr>
                  <tr>
                    <td>Платежные системы</td>
                    <td>Обработка платежей</td>
                    <td>PCI DSS сертификация</td>
                  </tr>
                  <tr>
                    <td>Сервисы аналитики</td>
                    <td>Улучшение продукта</td>
                    <td>Анонимизация данных</td>
                  </tr>
                  <tr>
                    <td>Службы поддержки</td>
                    <td>Техническая помощь</td>
                    <td>Соглашение о конфиденциальности</td>
                  </tr>
                </tbody>
              </table>

              <h3>5.2. Международные передачи</h3>
              <div className="important">
                <strong>Трансграничная передача:</strong> Некоторые наши
                партнеры могут находиться за пределами России. Мы обеспечиваем
                адекватный уровень защиты через стандартные договорные оговорки
                ЕС или решения об адекватности.
              </div>

              <h3>5.3. Случаи обязательного раскрытия</h3>
              <p>Мы можем раскрыть данные без вашего согласия в случаях:</p>
              <ul>
                <li>Требований правоохранительных органов</li>
                <li>Судебных решений</li>
                <li>Защиты наших прав и безопасности</li>
                <li>Предотвращения мошенничества</li>
              </ul>
            </section>

            <section id="data-storage">
              <h2>6. Хранение и защита данных</h2>

              <h3>6.1. Сроки хранения</h3>
              <table>
                <thead>
                  <tr>
                    <th>Тип данных</th>
                    <th>Срок хранения</th>
                    <th>Основание</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Данные учетной записи</td>
                    <td>До удаления аккаунта</td>
                    <td>Исполнение договора</td>
                  </tr>
                  <tr>
                    <td>Загруженный контент</td>
                    <td>До удаления пользователем</td>
                    <td>Согласие пользователя</td>
                  </tr>
                  <tr>
                    <td>Платежные данные</td>
                    <td>5 лет</td>
                    <td>Налоговое законодательство</td>
                  </tr>
                  <tr>
                    <td>Логи безопасности</td>
                    <td>1 год</td>
                    <td>Законный интерес</td>
                  </tr>
                  <tr>
                    <td>Маркетинговые данные</td>
                    <td>До отзыва согласия</td>
                    <td>Согласие</td>
                  </tr>
                </tbody>
              </table>

              <h3>6.2. Меры безопасности</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="w-4 h-4 text-green-600" />
                    <strong>Технические меры</strong>
                  </div>
                  <ul>
                    <li>Шифрование AES-256</li>
                    <li>HTTPS для всех соединений</li>
                    <li>Регулярные бэкапы</li>
                    <li>Мониторинг безопасности 24/7</li>
                    <li>Регулярные пентесты</li>
                  </ul>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <strong>Организационные меры</strong>
                  </div>
                  <ul>
                    <li>Обучение сотрудников</li>
                    <li>Политики безопасности</li>
                    <li>Контроль доступа</li>
                    <li>Аудит процессов</li>
                    <li>План реагирования на инциденты</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="user-rights">
              <h2>7. Ваши права</h2>

              <p>
                В соответствии с законодательством о защите персональных данных,
                вы имеете следующие права:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h4>Право на доступ</h4>
                  <p>Получать информацию о том, какие данные мы обрабатываем</p>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h4>Право на исправление</h4>
                  <p>Исправлять неточные или неполные данные</p>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h4>Право на удаление</h4>
                  <p>Удалять ваши персональные данные ("право быть забытым")</p>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h4>Право на ограничение</h4>
                  <p>
                    Ограничивать обработку ваших данных в определенных случаях
                  </p>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h4>Право на портируемость</h4>
                  <p>Получать ваши данные в структурированном формате</p>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h4>Право на возражение</h4>
                  <p>Возражать против обработки данных в маркетинговых целях</p>
                </div>
              </div>

              <h3>7.1. Как реализовать свои права</h3>
              <p>Для реализации своих прав вы можете:</p>
              <ul>
                <li>Использовать настройки в лич��ом кабинете</li>
                <li>Отправить запрос на email: privacy@mymeet.ai</li>
                <li>Связаться с нашей службой поддержки</li>
              </ul>

              <div className="important">
                <strong>Сроки рассмотрения:</strong> Мы рассматриваем запросы в
                течение 30 дней с момента получения. В сложных случаях срок
                может быть продлен до 60 дней с уведомлением.
              </div>
            </section>

            <section id="cookies">
              <h2>8. Использование cookies</h2>

              <p>Мы используем cookies и аналогичные технологии для:</p>
              <ul>
                <li>Обеспечения работы сайта</li>
                <li>Аналитики использования</li>
                <li>Персонализации контента</li>
                <li>Маркетинговых целей (с согласия)</li>
              </ul>

              <h3>8.1. Типы cookies</h3>
              <table>
                <thead>
                  <tr>
                    <th>Тип</th>
                    <th>Назначение</th>
                    <th>Срок действия</th>
                    <th>Согласие</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Необходимые</td>
                    <td>Работа сайта</td>
                    <td>Сессия</td>
                    <td>Не требуется</td>
                  </tr>
                  <tr>
                    <td>Аналитические</td>
                    <td>Статистика</td>
                    <td>2 года</td>
                    <td>Требуется</td>
                  </tr>
                  <tr>
                    <td>Маркетинговые</td>
                    <td>Реклама</td>
                    <td>1 год</td>
                    <td>Требуется</td>
                  </tr>
                </tbody>
              </table>

              <p>
                Вы можете управлять cookies через настройки браузера или наш
                центр управления согласиями.
              </p>
            </section>

            <hr />

            {/* Контактная информация */}
            <div className="legal-contact">
              <h3>Контакты по вопросам конфиденциальности</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <strong>Ответственный за обработку данных:</strong>
                  <p>Иванов Иван Иванович</p>
                  <p>Email: privacy@mymeet.ai</p>
                  <p>Телефон: +7 (495) 123-45-67, доб. 101</p>
                </div>

                <div>
                  <strong>Служба поддержки:</strong>
                  <p>Email: support@mymeet.ai</p>
                  <p>Телефон: +7 (495) 123-45-67</p>
                  <p>Часы работы: Пн-Пт, 9:00-18:00 (МСК)</p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm">
                  <strong>Жал��бы в надзорные органы:</strong> В случае
                  нарушения ваших прав вы можете обратиться в Роскомнадзор или
                  европейские надзорные органы по защите данных.
                </p>
              </div>
            </div>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
              © 2024 ООО «MyMeet AI». Все права защищены.
            </p>
          </div>
        </main>

        <Footer />
      </div>
    </HelmetProvider>
  );
}
