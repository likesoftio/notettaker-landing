import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Upload } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Онлайн-конвертер аудио в текст
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto">
            Преобразуйте речь в текст за несколько кликов. Ваш лучший бесплатный
            онлайн-инструмент для транскрипции.
          </p>
        </div>

        {/* Upload Area */}
        <Card className="max-w-4xl mx-auto p-8 lg:p-12 bg-white shadow-lg">
          <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-blue-400 transition-colors">
            <div className="space-y-6">
              <Button size="lg" className="px-8">
                <Upload className="w-5 h-5 mr-2" />
                Выбрать
              </Button>

              <div className="space-y-2">
                <p className="text-sm text-gray-500">
                  или перетащите файл сюда.
                </p>
                <div className="text-xs text-gray-400 space-y-1">
                  <p>
                    Поддерживаемые форматы: WAV, MP3, M4A, FLAC, AVI, ACC, WMV,
                    WMA, ACC, MP4, MKV, MOV, WEBM, OGG
                  </p>
                  <p>
                    Максимальный размер: 5GB; Максимальная длительность: 5
                    часов.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
