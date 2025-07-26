import { Button } from "./ui/button";

const ctaButtons = [
  "Видео конвертер",
  "Аудио конвертер",
  "MP3 в Текст",
  "YouTube в текст",
  "MP4 в Текст",
  "Видео в Текст",
];

export default function CTASection() {
  return null;

  return (
    <section className="py-16 lg:py-24 bg-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-8">
            Подробнее
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
            {ctaButtons.map((button, index) => (
              <Button
                key={index}
                variant="outline"
                size="lg"
                className="h-14 text-base font-semibold"
                asChild
              >
                <a
                  href="https://app.notetaker.ru/"
                  target="_blank"
                  rel="noopener"
                >
                  {button}
                </a>
              </Button>
            ))}
          </div>
        </div>

        {/* Economy Section */}
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0">
            <img
              src="https://framerusercontent.com/images/wfqMGWm3dnlQZ1VeVblmw87ICU.png"
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 py-20 text-center">
            <div className="relative max-w-4xl mx-auto">
              <img
                src="https://framerusercontent.com/images/Pyky7zr7Emokw0uPmU4amr3T0M.png"
                alt="Economy illustration"
                className="w-full max-w-3xl mx-auto mb-8"
              />

              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-8">
                Экономьте расходы с Notetaker
              </h2>

              <Button size="lg" asChild>
                <a
                  href="https://app.notetaker.ru/"
                  target="_blank"
                  rel="noopener"
                >
                  Попробовать
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
