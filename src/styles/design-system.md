# Design System Documentation

## Единая система дизайна mymeet.ai

Данная документация описывает единую систему стилей, типографики и цветов для всех страниц сайта.

## 🎨 Цветовая палитра

### Основные цвета

- **Primary Blue**: `#3b82f6` (blue-500) - основной цвет бренда
- **Primary Blue Hover**: `#2563eb` (blue-600) - состояние наведения
- **Primary Blue Light**: `#93c5fd` (blue-300) - светлый акцент

### Серая шкала

- **Gray 50**: `#f9fafb` - самый светлый фон
- **Gray 100**: `#f3f4f6` - светлый фон для карточек
- **Gray 200**: `#e5e7eb` - границы
- **Gray 300**: `#d1d5db` - неактивные элементы
- **Gray 400**: `#9ca3af` - иконки
- **Gray 500**: `#6b7280` - вспомогательный текст
- **Gray 600**: `#4b5563` - основной текст (светлая тема)
- **Gray 700**: `#374151` - темные границы
- **Gray 800**: `#1f2937` - темные поверхности
- **Gray 900**: `#111827` - основной текст (темная тема)

## 📝 Типографика

### Семейство шрифтов

```css
font-family:
  ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
  "Segoe UI Symbol", "Noto Color Emoji";
```

### Размеры и классы

#### Display (Заголовки hero-секций)

- `.text-display-2xl` - 4xl sm:5xl lg:6xl font-bold (64px+)
- `.text-display-xl` - 3xl sm:4xl lg:5xl font-bold (48px+)
- `.text-display-lg` - 2xl sm:3xl lg:4xl font-bold (36px+)

#### Headings (Заголовки разделов)

- `.text-heading-xl` - xl sm:2xl lg:3xl font-semibold (30px+)
- `.text-heading-lg` - lg sm:xl lg:2xl font-semibold (24px+)
- `.text-heading-md` - base sm:lg lg:xl font-semibold (20px+)

#### Body (Основной текст)

- `.text-body-lg` - base sm:lg leading-relaxed (18px+)
- `.text-body-md` - sm sm:base leading-relaxed (16px)

#### Caption (Вспомогательный текст)

- `.text-caption` - xs sm:sm text-gray-600 dark:text-gray-400 (14px)

## 🏗️ Компоненты и паттерны

### Контейнеры

```css
.page-container { min-h-screen bg-white dark:bg-gray-900 transition-colors }
.page-main { max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 }
.content-max-width { max-w-4xl mx-auto }
.prose-max-width { max-w-3xl mx-auto }
```

### Карточки

```css
.card-base { bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm }
.card-hover { hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 }
```

### Кнопки

```css
.button-primary { bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors }
.button-secondary { bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 }
```

### Формы

```css
.input-base { w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white }
```

### Сетки

```css
.grid-responsive-2 { grid grid-cols-1 lg:grid-cols-2 gap-8 }
.grid-responsive-3 { grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 }
.grid-responsive-4 { grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 }
```

## 🌙 Темная тема

Все компоненты поддерживают темную тему через класс `dark:`:

### Цвета для темной темы

- Фон: `dark:bg-gray-900`
- Поверхности: `dark:bg-gray-800`
- Текст: `dark:text-white`, `dark:text-gray-300`
- Границы: `dark:border-gray-700`

### Переходы

Используйте `transition-colors duration-300` для плавных переходов между темами.

## 📱 Адаптивность

### Брейкпоинты

- `sm:` - 640px+
- `md:` - 768px+
- `lg:` - 1024px+
- `xl:` - 1280px+
- `2xl:` - 1536px+

### Принципы

1. **Mobile first** - начинаем с мобильных стилей
2. **Прогрессивное улучшение** - добавляем функциональность для больших экранов
3. **Консистентные отступы** - используем системные классы для spacing

## 🎯 Использование

### В компонентах React

```tsx
import { DisplayXL, BodyLG, Caption } from "../components/Typography";

function MyComponent() {
  return (
    <div className="page-container">
      <main className="page-main">
        <div className="page-header">
          <DisplayXL>Заголовок страницы</DisplayXL>
          <BodyLG className="page-subtitle">Подзаголовок страницы</BodyLG>
        </div>
        <Caption>Дополнительная информация</Caption>
      </main>
    </div>
  );
}
```

### В HTML/JSX

```tsx
<div className="page-container">
  <main className="page-main">
    <h1 className="page-title">Заголовок</h1>
    <p className="page-subtitle">Описание</p>
    <div className="card-base card-hover">
      <h3 className="text-heading-md">Подзаголовок</h3>
      <p className="text-body-md">Содержимое</p>
    </div>
  </main>
</div>
```

## ✅ Checklist для новых страниц

- [ ] Используется `.page-container` для основного контейнера
- [ ] Применены классы `.page-main`, `.page-header`, `.page-title`
- [ ] Используются системные классы типографики
- [ ] Поддерживается темная тема (`dark:` классы)
- [ ] Реализована адаптивность для всех экранов
- [ ] Применены переходы для интерактивных элементов
- [ ] Используются консистентные цвета из палитры
- [ ] Соблюдается accessibility (focus states, semantic HTML)

## 🔍 Проверка консистентности

Для проверки соответствия дизайн-системе:

1. Откройте DevTools и проверьте computed styles
2. Убедитесь что используется правильное семейство шрифтов
3. Проверьте цвета на соответствие палитре
4. Протестируйте темную тему
5. Проверьте адаптивность на разных экранах
