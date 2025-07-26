# Django REST Framework Integration

Этот проект поддерживает два backend'а:

- **localStorage** (по умолчанию) - для разработки и демо
- **Django REST Framework** - для продакшена

## Быстрый старт

### 1. Frontend (React)

```bash
# Установка зависимостей (уже готово)
npm install

# Запуск с localStorage backend
npm run dev

# Запуск с DRF backend
echo "VITE_API_URL=http://localhost:8000" > .env
echo "VITE_USE_DRF=true" >> .env
npm run dev
```

### 2. Backend (Django)

```bash
# Создание проекта Django
django-admin startproject myblog
cd myblog
django-admin startapp blog

# Установка зависимостей
pip install django djangorestframework
pip install djangorestframework-simplejwt
pip install django-cors-headers

# Копирование моделей и настроек (см. /admin/drf-setup)

# Миграции
python manage.py makemigrations
python manage.py migrate

# Создание суперпользователя
python manage.py createsuperuser

# Запуск сервера
python manage.py runserver 8000
```

## Переключение между backend'ами

### В коде (автоматически)

Система автоматически определяет какой backend использовать на основе переменных окружения:

```javascript
// В blog-api-switcher.ts
const useDRF =
  import.meta.env.VITE_USE_DRF === "true" ||
  import.meta.env.VITE_API_URL !== undefined;
```

### В интерфейсе (ручное переключение)

1. Перейдите на `/admin/drf-setup`
2. Используйте кнопку "Переключить на DRF/localStorage"
3. Страница перезагрузится с новым backend'ом

## Структура файлов

```
src/
├── lib/
│   ├── blog-api.ts           # localStorage API (оригинальный)
│   ├── blog-api-drf.ts       # DRF API (новый)
│   ├── blog-api-switcher.ts  # Автоматический выбор
│   └── api-client.ts         # HTTP клиент для DRF
├── config/
│   └── api.ts               # Конфигурация API
├── types/
│   └── api.ts               # TypeScript типы для API
└── hooks/
    ├── useAuth.tsx          # localStorage auth (оригинальный)
    └── useAuth-drf.tsx      # DRF auth (новый)
```

## Переменные окружения

### Frontend (.env)

```bash
# DRF Backend URL (Vite format)
VITE_API_URL=http://localhost:8000

# Принудительное использование DRF
VITE_USE_DRF=true

# Необязательные
VITE_UNSPLASH_ACCESS_KEY=your_key

# Legacy support (также будет работать)
REACT_APP_API_URL=http://localhost:8000
REACT_APP_USE_DRF=true
```

### Backend (Django settings.py)

```python
# CORS для React
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# База данных
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'myblog',
        'USER': 'postgres',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

## API Endpoints

### Аутентификация

- `POST /api/auth/login/` - Вход (JWT)
- `POST /api/auth/refresh/` - Обновление токена
- `POST /api/auth/logout/` - Выход
- `GET /api/auth/user/` - Текущий пользователь

### Блог

- `GET /api/blog/posts/` - Список статей
- `POST /api/blog/posts/` - Создать статью
- `GET /api/blog/posts/{id}/` - Статья по ID
- `PUT /api/blog/posts/{id}/` - Обновить статью
- `DELETE /api/blog/posts/{id}/` - Удалить статью

### Категории

- `GET /api/blog/categories/` - Список категорий
- `POST /api/blog/categories/` - Создать категорию
- `PUT /api/blog/categories/{id}/` - Обновить категорию
- `DELETE /api/blog/categories/{id}/` - Удалить категорию

## Различия между backend'ами

### localStorage

- ✅ Мгновенный старт
- ✅ Не требует сервера
- ✅ Отлично для демо
- ❌ Данные только локально
- ❌ Нет реальной аутентификации

### DRF

- ✅ Настоящая база данных
- ✅ JWT аутентификация
- ✅ Масштабируемость
- ✅ Многопользовательский режим
- ❌ Требует настройки Django
- ❌ Больше сложности

## Отладка

### Проверка текущего backend'а

```javascript
import { getApiStatus } from "../lib/blog-api-switcher";

console.log(getApiStatus());
// { backend: 'DRF', apiUrl: 'http://localhost:8000', useDRF: true }
```

### Тестирование соединения

1. Перейдите на `/admin/drf-setup`
2. Нажмите "Тестировать соединение"
3. Проверьте консоль браузера на ошибки

### Логи Django

```bash
# Включить подробные логи
DEBUG = True

# Логи DRF в консоли
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'INFO',
        },
    },
}
```

## Развертывание

### Frontend (Vercel/Netlify)

```bash
# Переменные окружения
VITE_API_URL=https://your-api.domain.com
VITE_USE_DRF=true
```

### Backend (Heroku/Railway)

```bash
# requirements.txt
Django==4.2.7
djangorestframework==3.14.0
djangorestframework-simplejwt==5.3.0
django-cors-headers==4.3.1
psycopg2-binary==2.9.7

# Heroku Config Vars
DATABASE_URL=postgres://...
SECRET_KEY=your-secret-key
DEBUG=False
```

## Миграция данных

Если у вас есть данные в localStorage и вы хотите перенести их в DRF:

1. Экспортируйте данные: перейдите на `/test/blog-ops` → "Test Get Posts"
2. Скопируйте JSON из результата
3. Создайте Django management command для импорта
4. Запустите `python manage.py import_blog_data data.json`

## Поддержка

- Frontend: React + TypeScript + Vite
- Backend: Django 4.2+ + DRF 3.14+ + PostgreSQL
- Аутентификация: JWT tokens
- CORS: django-cors-headers
- Тестирование: Встроенная свраница диагностики
