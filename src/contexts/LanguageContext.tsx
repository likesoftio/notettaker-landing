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
    "pricing.fromPrice": "from $0.02/minute",
    "pricing.supportedFormats":
      "Formats: MP3, MP4, M4A, OGG, WAV, FLAC, WMA, M4A, FLAC, ACC, WEBM and more.",
    "pricing.speechRecognition": "Speech recognition",
    "pricing.punctuation": "Punctuation, timestamps, speaker separation",
    "pricing.languages": "Russian, English and other languages",
    "pricing.export": "Export to DOCX, SRT and XLSX formats",
    "pricing.tryFree": "Try for free",
    "pricing.payOrganization": "Pay from organization account",

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
