import { Button } from "./ui/button";
import { Card } from "./ui/card";

const steps = [
  {
    number: 1,
    title: "Загрузите файл в Notetaker",
    description: 'Нажмите "Выбрать" или просто перетащите файл.',
    image:
      "https://framerusercontent.com/images/Nw3uRs9rv9ifFYveJP5eAdNJ5wE.png",
  },
  {
    number: 2,
    title: "Сконвертируйте аудио в текст",
    description:
      'Выберите язык аудио, которое хотите транскрибировать. Нажмите "Загрузить".',
    image:
      "https://framerusercontent.com/images/YvJ5hfSmKe4iM1HbIfnhChXEY8.png",
  },
  {
    number: 3,
    title: "Получите транскрипт на email",
    description:
      "Как только транскрипция будет завершена, мы отправим результат на указанный email.",
    image:
      "https://framerusercontent.com/images/yB3OgcHkASC4Ssxb3VonaxqF4dI.png",
  },
];

export default function ProcessSteps() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Преобразование аудио в текст за 3 шага
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-12">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="mb-6">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-48 object-contain mx-auto"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
                  {step.number}. {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" asChild>
            <a href="https://app.notetaker.ru/" target="_blank" rel="noopener">
              Конвертировать
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
