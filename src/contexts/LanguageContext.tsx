import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "ru" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const translations = {
  ru: {
    // Header
    "header.solutions": "Решения",
    "header.resources": "Ресурсы",
    "header.pricing": "Стоимость",
    "header.login": "Войти",
    "header.bookDemo": "Записаться на демо",

    // Solutions dropdown
    "solutions.transcription": "Транскрипция встреч",
    "solutions.analysis": "Анализ разговоров",
    "solutions.integration": "Интеграции",
    "solutions.api": "API для разработчиков",

    // Resources dropdown
    "resources.blog": "Блог",
    "resources.helpCenter": "Центр поддержки",
    "resources.documentation": "Документация",
    "resources.tutorials": "Обучающие материалы",

    // Hero
    "hero.title": "Онлайн-конвертер аудио в текст",
    "hero.subtitle":
      "Преобразуйте речь в текст за несколько кликов. Ваш лучший бесплатный онлайн-инструмент для транскрипции.",
    "hero.chooseFile": "Выбрать",
    "hero.dragDrop": "или перетащите файл сюда.",
    "hero.supportedFormats":
      "Поддерживаемые форматы: WAV, MP3, M4A, FLAC, AVI, ACC, WMV, WMA, ACC, MP4, MKV, MOV, WEBM, OGG",
    "hero.maxSize":
      "Максимальный размер: 5GB; Максимальная длительность: 5 часов.",

    // How It Works
    "howItWorks.title": "Как работает",
    "howItWorks.description":
      "Три простых шага для превращения хаотичных обсуждений в структурированные инсайты.",
    "howItWorks.work": "работает",
    "howItWorks.step1.title": "Добавьте встречу",
    "howItWorks.step1.description":
      "Загрузите файл в любом формате или пригласите бота на встречу. Подключите Telegram или календарь, чтобы записывать каждую встречу автоматически",
    "howItWorks.step2.title": "Получите инсайты",
    "howItWorks.step2.description":
      "Обработанная встреча состоит из транскрипта с разделением на главы и спикеров, выбранного AI Отчета и задач с ответственными и дедлайнами",
    "howItWorks.step3.title": "Отредактируйте и поделитесь",
    "howItWorks.step3.description":
      "Переименуйте спикеров и отредактируйте транскрипт. Итоговым отчётом можно поделиться с командой или скачать в нужном формате",
    "howItWorks.integrations.title": "Работаем с популярными платформами",
    "howItWorks.integrations.description":
      "Подключайтесь к любимым инструментам одним кликом",
    "howItWorks.cta": "Попробовать бесплатно",
    "howItWorks.ctaDescription":
      "180 минут бесплатно • Без привязки карты • Мгновенная настройка",

    // Process Steps
    "steps.title": "Преобразование аудио в текст за 3 шага",
    "steps.step1.title": "Загрузите файл в Notetaker",
    "steps.step1.description": 'Нажмите "Выбрать" или просто перетащите файл.',
    "steps.step2.title": "Сконвертируйте аудио в текст",
    "steps.step2.description":
      'Выберите язык аудио, которое хотите транскрибировать. Нажмите "Загрузить".',
    "steps.step3.title": "Получите транскрипт на email",
    "steps.step3.description":
      "Как только транскрипция будет завершена, мы отправим результат на указанный email.",
    "steps.convert": "Конвертировать",

    // Features
    "features.title": "Почему стоит выбрать нас?",
    "features.crossPlatform.title": "Мультипратформенность",
    "features.crossPlatform.description":
      "Посетите наш онлайн-конвертер аудио в текст из любого браузера, например, Chrome, Safari, Edge, Firefox.",
    "features.security.title": "Безопасность и конфиденциальность",
    "features.security.description":
      "Мы шифруем файлы и данные которые отправляются в Notetaker. Кроме того, этот сайт защищен SSL-сертификатом, чтобы обеспечить Вашу безопасность.",
    "features.languages.title": "19 языков",
    "features.languages.description":
      "Notetaker поддерживает до 19 языков для транскрипций, включая английский, немецкий, испанский, хинди и многие другие!",
    "features.formats.title": "Разные форматы",
    "features.formats.description":
      "Notetaker совместим со многими аудио и видео форматами файлов, например, WAV, MP3, M4A, FLAC, AIF, ACC, OGG, WMV, WMA, ACC, MPR4, MOV, WEBM",
    "features.ai.title": "AI-помощник",
    "features.ai.description":
      "Наш инструмент может анализировать и обобщать текст транскрипции, предоставляя автоматические ИИ-сводки записанного разговора.",
    "features.accuracy.title": "Высокая точность",
    "features.accuracy.description":
      "Мы занимаемся непрерывным улучшением системы распознавания голоса. Для качественных аудио мы проводим транскрипцию с точностью до 98.86%.",

    // Transcription Quality
    "transcriptionQuality.label": "Транскрипция",
    "transcriptionQuality.title": "Транскрипция русского языка",
    "transcriptionQuality.titleGradient": "с высокой точностью",
    "transcriptionQuality.description":
      "Мы преобразуем записи в детальные транскрипты за минуты: сохраняем знаки препинания, убираем слова-паразиты и сегментируем текст по спикерам.",
    "transcriptionQuality.nowTalking": "Сейчас говорит:",

    // Multilanguage Support
    "multilanguageSupport.title": "Многоязычность",
    "multilanguageSupport.description":
      "Мы поддерживаем обработку на 19 языках, что не влияет на скорость и качество результата.",
    "multilanguageSupport.ru": "Русский",
    "multilanguageSupport.en": "Английский",
    "multilanguageSupport.de": "Немецкий",
    "multilanguageSupport.fr": "Французский",
    "multilanguageSupport.es": "Испанский",
    "multilanguageSupport.it": "Итальянский",
    "multilanguageSupport.pt": "Португальский",
    "multilanguageSupport.hi": "Хинди",
    "multilanguageSupport.zh": "Китайский",
    "multilanguageSupport.ja": "Японский",
    "multilanguageSupport.ko": "Корейский",
    "multilanguageSupport.tr": "Турецкий",
    "multilanguageSupport.pl": "Польский",
    "multilanguageSupport.vi": "Вьетнамский",
    "multilanguageSupport.fi": "Финский",
    "multilanguageSupport.feature1.title": "Определение и деление на спикеров",
    "multilanguageSupport.feature1.description":
      "Можно указать количество спикеров, чтобы результат получился точнее.",
    "multilanguageSupport.feature2.title": "Очистка транскрипта",
    "multilanguageSupport.feature2.description":
      'Убираем из транскрипта "ну", "мда" и прочие слова-паразиты.',
    "multilanguageSupport.feature3.title": "Высокая скорость обработки",
    "multilanguageSupport.feature3.description":
      "Умеем обрабатывать быстро: часовая встреча превратится в транскрипт за 5 минут.",
    "multilanguageSupport.feature4.title": "AI-улучшение звука встречи",
    "multilanguageSupport.feature4.description":
      "Используем отдельную модель для очистки дорожки от шумов и посторонних звуков перед обработкой.",
    "multilanguageSupport.cta.title": "Попробовать бесплатно",

    // Pricing
    "pricing.fromPrice": "от 2 ₽/минута",
    "pricing.supportedFormats":
      "Форматы: MP3, MP4, M4A, OGG, WAV, FLAC, WMA, M4A, FLAC, AСC, WEBM и др.",
    "pricing.speechRecognition": "Расшифровка речи",
    "pricing.punctuation":
      "Расстановка знаков препинания, тайм-кодов, разделение на реплики",
    "pricing.languages": "Русский, английский и другие языки",
    "pricing.export": "Экспорт в форматы DOCX, SRT и XLSX",
    "pricing.tryFree": "Попробовать бесплатно",
    "pricing.payOrganization": "Оплатить со счета организации",
    "pricing.monthly": "Ежемесячно",
    "pricing.biannual": "На год",
    "pricing.popular": "Популярный",
    "pricing.free": "Начальный",
    "pricing.базовый": "Базовый",
    "pricing.lite": "Lite",
    "pricing.pro": "Pro",
    "pricing.ultra": "Ultra",
    "pricing.features.included": "Доступ к платформе, включая:",
    "pricing.discount.info": "Экономьте до 20% при оплате на 6 месяцев вперед",
    "pricing.buttonText": "Перейти на тариф",

    // FAQ
    "faq.title": "Часто задаваемые вопросы",

    // Footer
    "footer.documents": "Документы",
    "footer.offer": "Оферта",
    "footer.terms": "Пользовательское соглашение",
    "footer.privacy": "Политика конфиденциальности",

    // Common
    "common.back": "Назад",
    "common.toHome": "На главную",
    "common.language": "Язык",
    "common.theme": "Тема",
    "common.light": "Светлая",
    "common.dark": "Тёмная",
    "common.system": "Системная",
  },
  en: {
    // Header
    "header.solutions": "Solutions",
    "header.resources": "Resources",
    "header.pricing": "Pricing",
    "header.login": "Login",
    "header.bookDemo": "Book a demo",

    // Solutions dropdown
    "solutions.transcription": "Meeting Transcription",
    "solutions.analysis": "Conversation Analysis",
    "solutions.integration": "Integrations",
    "solutions.api": "Developer API",

    // Resources dropdown
    "resources.blog": "Blog",
    "resources.helpCenter": "Help Center",
    "resources.documentation": "Documentation",
    "resources.tutorials": "Tutorials",

    // How It Works
    "howItWorks.title": "How does",
    "howItWorks.work": "work",
    "howItWorks.description":
      "Three simple steps to turn chaotic discussions into structured insights.",
    "howItWorks.step1.title": "Add a Meeting",
    "howItWorks.step1.description":
      "Upload a file in any format or invite the bot to the meeting. Connect Telegram or your calendar to automatically record every meeting.",
    "howItWorks.step2.title": "Get Insights",
    "howItWorks.step2.description":
      "The processed meeting consists of a transcript with speaker separation, selected AI Report, and tasks with assignees and deadlines.",
    "howItWorks.step3.title": "Edit and Share",
    "howItWorks.step3.description":
      "Rename speakers and edit the transcript. The final report can be shared with the team or downloaded in the desired format.",
    "howItWorks.integrations.title": "Integrations with Popular Platforms",
    "howItWorks.integrations.description":
      "Connect to your favorite tools with one click",
    "howItWorks.cta": "Try for Free",
    "howItWorks.ctaDescription":
      "180 minutes free • No card required • Instant setup",

    // Transcription Quality
    "transcriptionQuality.label": "Transcription",
    "transcriptionQuality.title": "English language transcription",
    "transcriptionQuality.titleGradient": "with High Accuracy",
    "transcriptionQuality.description":
      "We transform recordings into detailed transcripts in minutes: preserving punctuation, removing filler words, and segmenting text by speakers.",
    "transcriptionQuality.nowTalking": "Now talking:",

    // Multilanguage Support
    "multilanguageSupport.title": "Multilanguage Support",
    "multilanguageSupport.description":
      "We support processing in 19 languages, which does not affect the speed and quality of the result.",
    "multilanguageSupport.ru": "Russian",
    "multilanguageSupport.en": "English",
    "multilanguageSupport.de": "German",
    "multilanguageSupport.fr": "French",
    "multilanguageSupport.es": "Spanish",
    "multilanguageSupport.it": "Italian",
    "multilanguageSupport.pt": "Portuguese",
    "multilanguageSupport.hi": "Hindi",
    "multilanguageSupport.zh": "Chinese",
    "multilanguageSupport.ja": "Japanese",
    "multilanguageSupport.ko": "Korean",
    "multilanguageSupport.tr": "Turkish",
    "multilanguageSupport.pl": "Polish",
    "multilanguageSupport.vi": "Vietnamese",
    "multilanguageSupport.fi": "Finnish",
    "multilanguageSupport.feature1.title": "Speaker Detection and Segmentation",
    "multilanguageSupport.feature1.description":
      "We automatically detect who is speaking in the audio and segment the text by speakers.",
    "multilanguageSupport.feature2.title": "Transcript Cleaning",
    "multilanguageSupport.feature2.description":
      'We remove filler words like "um", "uh", and other disfluencies from the transcript.',
    "multilanguageSupport.feature3.title": "High Processing Speed",
    "multilanguageSupport.feature3.description":
      "We can process quickly: a one-hour meeting will turn into a transcript in 5 minutes.",
    "multilanguageSupport.feature4.title":
      "AI-Powered Meeting Sound Enhancement",
    "multilanguageSupport.feature4.description":
      "We use a separate model to clean the audio track from noise and background sounds before processing.",
    "multilanguageSupport.cta.title": "Try for Free",

    // Hero
    "hero.title": "Online Audio to Text Converter",
    "hero.subtitle":
      "Convert speech to text in just a few clicks. Your best free online transcription tool.",
    "hero.chooseFile": "Choose",
    "hero.dragDrop": "or drag and drop file here.",
    "hero.supportedFormats":
      "Supported formats: WAV, MP3, M4A, FLAC, AVI, ACC, WMV, WMA, ACC, MP4, MKV, MOV, WEBM, OGG",
    "hero.maxSize": "Maximum size: 5GB; Maximum duration: 5 hours.",

    // Process Steps
    "steps.title": "Convert audio to text in 3 steps",
    "steps.step1.title": "Upload file to Notetaker",
    "steps.step1.description":
      'Click "Choose" or simply drag and drop the file.',
    "steps.step2.title": "Convert audio to text",
    "steps.step2.description":
      'Select the language of the audio you want to transcribe. Click "Upload".',
    "steps.step3.title": "Get transcript via email",
    "steps.step3.description":
      "Once transcription is complete, we will send the result to the specified email.",
    "steps.convert": "Convert",

    // Features
    "features.title": "Why choose us?",
    "features.crossPlatform.title": "Cross-platform",
    "features.crossPlatform.description":
      "Visit our online audio to text converter from any browser, such as Chrome, Safari, Edge, Firefox.",
    "features.security.title": "Security & Privacy",
    "features.security.description":
      "We encrypt files and data sent to Notetaker. Additionally, this site is protected by SSL certificate to ensure your security.",
    "features.languages.title": "19 Languages",
    "features.languages.description":
      "Notetaker supports up to 19 languages for transcriptions, including English, German, Spanish, Hindi and many others!",
    "features.formats.title": "Multiple Formats",
    "features.formats.description":
      "Notetaker is compatible with many audio and video file formats, such as WAV, MP3, M4A, FLAC, AIF, ACC, OGG, WMV, WMA, ACC, MPR4, MOV, WEBM",
    "features.ai.title": "AI Assistant",
    "features.ai.description":
      "Our tool can analyze and summarize transcription text, providing automatic AI summaries of recorded conversations.",
    "features.accuracy.title": "High Accuracy",
    "features.accuracy.description":
      "We continuously improve our voice recognition system. For high-quality audio, we provide transcription with accuracy up to 98.86%.",

    // Pricing
    "pricing.fromPrice": "from 2 ₽/minute",
    "pricing.supportedFormats":
      "Formats: MP3, MP4, M4A, OGG, WAV, FLAC, WMA, M4A, FLAC, AСC, WEBM и др.",
    "pricing.speechRecognition": "Speech Recognition",
    "pricing.punctuation": "Punctuation, timestamps, speaker separation",
    "pricing.languages": "Russian, English and other languages",
    "pricing.export": "Export to DOCX, SRT and XLSX formats",
    "pricing.tryFree": "Try for free",
    "pricing.payOrganization": "Pay from organization account",
    "pricing.monthly": "Monthly",
    "pricing.biannual": "Biannual",
    "pricing.popular": "Popular",
    "pricing.free": "Free",
    "pricing.basic": "Basic",
    "pricing.lite": "Lite",
    "pricing.pro": "Pro",
    "pricing.ultra": "Ultra",
    "pricing.features.included": "Access to the platform, including:",
    "pricing.discount.info": "Save up to 20% when paying yearly in advance",
    "pricing.buttonText": "Upgrade Now",

    // FAQ
    "faq.title": "Frequently Asked Questions",

    // Footer
    "footer.documents": "Documents",
    "footer.offer": "Service Agreement",
    "footer.terms": "Terms of Service",
    "footer.privacy": "Privacy Policy",

    // Common
    "common.back": "Back",
    "common.toHome": "Home",
    "common.language": "Language",
    "common.theme": "Theme",
    "common.light": "Light",
    "common.dark": "Dark",
    "common.system": "System",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ru");

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language;
    if (saved && (saved === "ru" || saved === "en")) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return (
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ] || key
    );
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
