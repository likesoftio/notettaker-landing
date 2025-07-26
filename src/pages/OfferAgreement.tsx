import React from "react";
import { Link } from "react-router-dom";
import Head from "../components/SEO/Head";
import { MobileLayout } from "../components/mobile";
import { Button } from "../components/ui/button";
import { ArrowLeft, FileText, Mail, Phone, MapPin } from "lucide-react";

export default function OfferAgreement() {
  return (
    <MobileLayout
      headerProps={{ showBorder: true }}
      footerProps={{ variant: "minimal" }}
    >
      <Head
        title="Договор оферта - mymeet.ai"
        description="Договор оферта возмездного оказания услуг по предоставлению услуг автоматической транскрипции аудио и видео файлов в сервисе mymeet.ai."
        keywords={[
          "договор оферта",
          "пользовательское соглашение",
          "условия использования",
          "mymeet.ai",
          "юридические документы",
        ]}
        url="https://mymeet.ai/offer"
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
              ДОГОВОР ОФЕРТА
            </h1>
          </div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            ВОЗМЕЗДНОГО ОКАЗАНИЯ УСЛУГ
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-2">
            по предоставлению услуг автоматической транскрипции аудио и видео
            файлов
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Дата публикации: 30 мая 2025 г.
          </p>
        </header>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          {/* Важное уведомление */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 sm:p-6 mb-8">
            <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
              ВНИМАНИЕ! ДОГОВОР ПУБЛИЧНОЙ ОФЕРТЫ
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-300 mb-0">
              Настоящий документ является публичной офертой в соответствии со
              статьей 437 Гражданского кодекса Российской Федерации. Принятие
              настоящей оферты осуществляется путём совершения Заказчиком
              действий по оплате услуг.
            </p>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            1. ТЕРМИНЫ И ОПРЕДЕЛЕНИЯ
          </h2>
          <p>В настоящем договоре используются следующие термины:</p>
          <ul>
            <li>
              <strong>Исполнитель</strong> — Индивидуальный предприниматель
              Воронин Роман Владимирович (ОГРНИП 317344300099461, ИНН
              341002680798);
            </li>
            <li>
              <strong>Заказчик</strong> — физическое или юридическое лицо,
              принявшее условия настоящей оферты;
            </li>
            <li>
              <strong>Услуги</strong> — автоматическая транскрипция аудио и
              видео файлов с использованием технологий искусственного
              интеллекта;
            </li>
            <li>
              <strong>Сервис</strong> — программно-аппаратный комплекс
              Notetaker, расположенный в сети Интернет по адресам notetaker.ru и
              app.notetaker.ru;
            </li>
            <li>
              <strong>Результат</strong> — текстовая транскрипция загруженного
              файла в форматах DOCX, SRT или XLSX.
            </li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            2. ПРЕДМЕТ ДОГОВОРА
          </h2>
          <p>
            2.1. Исполнитель обязуется оказать Заказчику услуги по
            автоматической транскрипции аудио и видео файлов с использованием
            технологий искусственного интеллекта, а Заказчик обязуется принять и
            оплатить оказанные услуги.
          </p>
          <p>
            2.2. Услуги оказываются в рамках функционирования веб-сервиса
            Notetaker и включают:
          </p>
          <ul>
            <li>Автоматическое распознавание речи в загруженных файлах;</li>
            <li>Преобразование аудио в текстовый формат;</li>
            <li>Автоматическую расстановку знаков препинания;</li>
            <li>
              Разделение текста на реплики (при наличии нескольких говорящих);
            </li>
            <li>Добавление временных меток (тайм-кодов);</li>
            <li>ИИ-анализ содержания и создание сводок;</li>
            <li>Экспорт результатов в форматы DOCX, SRT, XLSX.</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            3. СТОИМОСТЬ УСЛУГ И ПОРЯДОК РАСЧЁТОВ
          </h2>
          <p>
            3.1. Стоимость услуг рассчитывается исходя из длительности
            обрабатываемого аудио:
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 my-6">
            <h3 className="text-lg font-semibold mb-4 mt-0">
              Тарифы на услуги транскрипции:
            </h3>
            <ul className="space-y-2 mb-0">
              <li>
                <strong>Базовый тариф:</strong> 2 рубля за минуту обработки
              </li>
              <li>
                <strong>Пакет "Стандарт":</strong> 1,8 рубля за минуту (при
                покупке от 100 минут)
              </li>
              <li>
                <strong>Пакет "Профи":</strong> 1,5 рубля за минуту (при покупке
                от 500 минут)
              </li>
              <li>
                <strong>Корпоративный тариф:</strong> индивидуальные условия для
                объёмов свыше 1000 минут
              </li>
            </ul>
          </div>
          <p>
            3.2. Длительность определяется автоматически при загрузке файла.
            Неполная минута округляется в большую сторону.
          </p>
          <p>
            3.3. Оплата производится до оказания услуг путём пополнения баланса
            лицевого счёта или разовой оплаты через интегрированные платёжные
            системы.
          </p>
          <p>
            3.4. Принимаются к оплате банковские карты, электронные кошельки,
            банковские переводы.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            4. ТЕХНИЧЕСКИЕ ТРЕБОВАНИЯ И ОГРАНИЧЕНИЯ
          </h2>
          <p>4.1. К обработке принимаются файлы следующих форматов:</p>
          <ul>
            <li>
              <strong>Аудио:</strong> WAV, MP3, M4A, FLAC, WMA, ACC, OGG;
            </li>
            <li>
              <strong>Видео:</strong> MP4, AVI, MKV, MOV, WEBM, WMV.
            </li>
          </ul>
          <p>4.2. Технические ограничения:</p>
          <ul>
            <li>Максимальный размер файла: 5 ГБ;</li>
            <li>Максимальная длительность: 5 часов;</li>
            <li>Минимальное качество аудио: 16 кГц, 16 бит;</li>
            <li>Рекомендуемое качество: 44,1 кГц, 16-24 бит.</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            5. КАЧЕСТВО УСЛУГ
          </h2>
          <p>5.1. Исполнитель гарантирует точность транскрипции:</p>
          <ul>
            <li>Для высококачественных записей: до 98,86%;</li>
            <li>Для записей среднего качества: 85-95%;</li>
            <li>Для записей низкого качества: не менее 70%.</li>
          </ul>
          <p>5.2. Качество результата зависит от:</p>
          <ul>
            <li>Качества исходной записи;</li>
            <li>Чёткости произношения;</li>
            <li>Наличия фонового шума;</li>
            <li>
              Языка записи (лучшая поддержка русского и английского языков).
            </li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            9. ВОЗВРАТ ДЕНЕЖНЫХ СРЕДСТВ
          </h2>
          <p>9.1. Возврат денежных средств производится в следующих случаях:</p>
          <ul>
            <li>
              Техническая невозможность обработки файла по вине Исполнителя;
            </li>
            <li>
              Существенные нарушения качества при соблюдении технических
              требований;
            </li>
            <li>Отказ от услуг до начала обработки файла.</li>
          </ul>
          <p>
            9.2. Возврат осуществляется на банковскую карту или счёт, с которого
            была произведена оплата, в течение 10 рабочих дней с момента подачи
            заявления.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            11. КОНФИДЕНЦИАЛЬНОСТЬ
          </h2>
          <p>
            11.1. Исполнитель гарантирует конфиденциальность всех данных
            Заказчика.
          </p>
          <p>
            11.2. Передача данных третьим лицам возможна только по письменному
            согласию Заказчика или в случаях, предусмотренных законодательством.
          </p>
          <p>
            11.3. Подробная информация о обработке персональных данных изложена
            в{" "}
            <Link
              to="/privacy"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Политике конфиденциальности
            </Link>
            .
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            15. РЕКВИЗИТЫ ИСПОЛНИТЕЛЯ
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6">
            <p className="font-semibold mb-4">Индивидуальный предприниматель</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p>
                  <strong>ФИО:</strong> Воронин Роман Владимирович
                </p>
                <p>
                  <strong>ОГРНИП:</strong> 317344300099461
                </p>
                <p>
                  <strong>ИНН:</strong> 341002680798
                </p>
              </div>
              <div>
                <p>
                  <strong>Телефон:</strong>{" "}
                  <a
                    href="tel:89856219221"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    8 (985) 621-92-21
                  </a>
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:hi@notetaker.ru"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    hi@notetaker.ru
                  </a>
                </p>
                <p>
                  <strong>Адрес:</strong> Гашека 12
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 sm:p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-sm text-green-800 dark:text-green-200 mb-0">
              <strong>Акцепт оферты:</strong> Оплачивая услуги сервиса
              Notetaker, Вы выражаете полное и безоговорочное согласие с
              условиями настоящего договора оферты и обязуетесь их исполнять.
            </p>
          </div>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
            © 2024 ООО «MyMeet AI». Все права защищены.
          </p>
        </div>
      </main>
    </MobileLayout>
  );
}
