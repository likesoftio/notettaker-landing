import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Check } from "lucide-react";

export default function Pricing() {
  const features = [
    "Форматы: MP3, MP4, M4A, OGG, WAV, FLAC, WMA, M4A, FLAC, AСC, WEBM и др.",
    "Расшифровка речи",
    "Расстановка знаков препинания, тайм-кодов, разделение на реплики",
    "Русский, английский и другие языки",
    "Экспорт в форматы DOCX, SRT и XLSX",
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Pricing Card */}
          <Card className="p-8 lg:p-12 shadow-2xl">
            <div className="mb-8">
              <div className="text-5xl lg:text-6xl font-bold text-blue-600 mb-2">
                от 2 ₽/минута
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Check className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <Button size="lg" className="w-full" asChild>
                <a
                  href="https://app.notetaker.ru/"
                  target="_blank"
                  rel="noopener"
                >
                  Попробовать бесплатно
                </a>
              </Button>
              <Button size="lg" variant="outline" className="w-full" asChild>
                <a
                  href="https://app.notetaker.ru/"
                  target="_blank"
                  rel="noopener"
                >
                  Оплатить со счета организации
                </a>
              </Button>
            </div>
          </Card>

          {/* Image */}
          <div className="relative">
            <img
              src="https://framerusercontent.com/images/O9Go9u2sG4U8aCvqbqA757DY.jpg?scale-down-to=1024"
              alt="Notetaker interface"
              className="w-full h-auto rounded-3xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
