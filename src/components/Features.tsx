import { Card } from "./ui/card";

const features = [
  {
    title: "Мультипратформенность",
    description:
      "Посетите наш онлайн-конвертер аудио в текст из любого браузера, например, Chrome, Safari, Edge, Firefox.",
  },
  {
    title: "Безопасность и конфиденциальность",
    description:
      "Мы шифруем файлы и данные которые отправляются в Notetaker. Кроме того, этот сайт защищен SSL-сертификатом, чтобы обеспечить Вашу безопасность.",
  },
  {
    title: "19 языков",
    description:
      "Notetaker поддерживает до 19 языков для транскрипций, включая английский, немецкий, испанский, хинди и многие другие!",
  },
  {
    title: "Разные форматы",
    description:
      "Notetaker совместим со многими аудио и видео форматами файлов, например, WAV, MP3, M4A, FLAC, AIF, ACC, OGG, WMV, WMA, ACC, MPR4, MOV, WEBM",
  },
  {
    title: "AI-помощник",
    description:
      "Наш инструмент может анализировать и обобщать текст транскрипции, предоставляя автоматические ИИ-сводки записанного разговора.",
  },
  {
    title: "Высокая точность",
    description:
      "Мы занимаемся непрерывным улучшением системы распознавания голоса. Для качественных аудио мы проводим транскрипцию с точностью до 98.86%.",
  },
];

export default function Features() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Почему стоит выбрать нас?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 bg-white">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
