import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const faqItems = [
  {
    question: "Что такое аудиотранскрипция?",
    answer:
      "Аудиотранскрипция - это процесс преобразования речи из аудио или видео файлов в письменный текст. Это полезно для создания субтитров, протоколов встреч, или просто для удобного чтения содержимого аудиозаписей.",
  },
  {
    question: "Как конвертировать аудио в текст онлайн?",
    answer:
      "Загрузите ваш аудио файл на нашу платформу, выберите язык записи, и наша система автоматически преобразует речь в текст. Результат будет отправлен на указанный вами email адрес.",
  },
  {
    question: "Как автоматически транскрибировать аудио в текст бесплатно?",
    answer:
      "Мы предлагаем бесплатную пробную версию для новых пользователей. Вы можете загрузить короткий аудио файл и получить транскрипцию бесплатно. Для больших файлов доступны доступные тарифные планы.",
  },
  {
    question: "Предлагаете ли вы бесплатный инструмент для транскрипции?",
    answer:
      "Да, мы предлагаем ограниченную бесплатную версию для тестирования нашего сервиса. Полный функционал доступен по подписке с очень доступными ценами от 2 рублей за минуту.",
  },
];

export default function FAQ() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Часто задаваемые вопросы
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-semibold">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
