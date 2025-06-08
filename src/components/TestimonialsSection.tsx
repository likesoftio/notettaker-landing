import { Button } from "./ui/button";
import { useLanguage } from "../contexts/LanguageContext";

export default function TestimonialsSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <blockquote className="text-2xl lg:text-3xl font-medium text-gray-900 dark:text-white leading-relaxed mb-12">
          «
          {t("testimonials.quote") ||
            "Сразу начали использовать транскрибацию. Не стоял вопрос, чтобы не переводить видео в текст, потому что это необходимо, это упрощает работу, сокращает время"}
          »
        </blockquote>

        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
              alt="Фассалова Алёна"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-left">
            <div className="text-xl font-semibold text-gray-900 dark:text-white">
              {t("testimonials.author.name") || "Фассалова Алёна"}
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              {t("testimonials.author.role") || "Продуктовый дизайнер"}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
            <a href="https://app.notetaker.ru/" target="_blank" rel="noopener">
              {t("testimonials.register") || "Зарегистрироваться"}
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="/contact">
              {t("testimonials.leaveRequest") || "Оставить заявку"}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
