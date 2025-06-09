# 🚀 Быстрый старт Django Backend

## Способ 1: Автоматический скрипт (Linux/Mac)

```bash
# Сделать скрипт исполняемым
chmod +x setup_django_backend.sh

# Запустить автоматическую настройку
./setup_django_backend.sh
```

## Способ 2: Python скрипт (все платформы)

```bash
python create_django_backend.py
```

## Способ 3: Ручная установка

Следуйте инструкциям в файле `DJANGO_SETUP_MANUAL.md`

## Способ 4: Docker (рекомендуется для продакшена)

```bash
# Скопировать docker-compose шаблон
cp docker-compose.yml.template docker-compose.yml

# Запустить полный стек
docker-compose up -d
```

## После установки

1. **Активируйте виртуальное окружение:**

   ```bash
   cd myblog_backend
   source venv/bin/activate  # Linux/Mac
   # или
   venv\Scripts\activate     # Windows
   ```

2. **Создайте модели (скопируйте код из DJANGO_SETUP_MANUAL.md):**

   - `blog/models.py`
   - `blog/serializers.py`
   - `blog/views.py`
   - `blog/urls.py`
   - `blog/admin.py`
   - `myblog/settings.py`
   - `myblog/urls.py`

3. **Примените миграции:**

   ```bash
   python manage.py makemigrations blog
   python manage.py migrate
   ```

4. **Создайте суперпользователя:**

   ```bash
   python manage.py createsuperuser
   ```

5. **Запустите сервер:**

   ```bash
   python manage.py runserver 8000
   ```

6. **Настройте React frontend:**

   ```bash
   # В корне React проекта создайте .env
   echo "VITE_API_URL=http://localhost:8000" > .env
   echo "VITE_USE_DRF=true" >> .env
   ```

7. **Перезапустите React:**
   ```bash
   npm run dev
   ```

## Проверка работы

1. Перейдите на `http://localhost:8000/admin/` - админка Django
2. Перейдите на `http://localhost:8000/api/blog/categories/` - API категорий
3. Перейдите на `http://localhost:8000/api/blog/posts/` - API статей
4. В React перейдите на `/admin/drf-setup` - тест соединения
5. В React перейдите на `/test/env` - проверка переменных окружения

## Структура проекта

```
myblog_backend/
├── venv/                 # Виртуальное окружение
├── myblog/              # Основной Django проект
│   ├── settings.py      # Настройки
│   └── urls.py          # URL маршруты
├── blog/                # Приложение блога
│   ├── models.py        # Модели данных
│   ├── serializers.py   # API сериализаторы
│   ├── views.py         # API views
│   ├── urls.py          # URL маршруты приложения
│   └── admin.py         # Админка
├── manage.py            # Django управление
├── requirements.txt     # Зависимости
└── .env                 # Переменные окружения
```

## Полезные команды

```bash
# Посмотреть все URL маршруты
python manage.py show_urls

# Создать тестовые данные
python manage.py shell
>>> from blog.models import BlogCategory, BlogPost
>>> from django.contrib.auth.models import User
>>>
>>> # Создать категорию
>>> cat = BlogCategory.objects.create(name="Технологии", description="Статьи о технологиях")
>>>
>>> # Создать пользователя
>>> user = User.objects.create_user('author', 'author@example.com', 'password123')
>>>
>>> # Создать статью
>>> post = BlogPost.objects.create(
...     title="Первая статья",
...     content="Содержание первой статьи...",
...     excerpt="Краткое описание первой статьи",
...     category=cat,
...     author=user,
...     status='published'
... )

# Создать дамп данных
python manage.py dumpdata blog --indent 2 > blog_fixtures.json

# Загрузить дамп данных
python manage.py loaddata blog_fixtures.json
```

## Troubleshooting

### Ошибка "No module named 'rest_framework'"

```bash
pip install djangorestframework
```

### Ошибка CORS

Убедитесь что в `settings.py` добавлено:

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
```

### Ошибка миграций

```bash
python manage.py makemigrations blog --empty
python manage.py migrate
```

### Проблемы с аутентификацией

Проверьте настройки JWT в `settings.py` и убедитесь что токены генерируются правильно.

## Поддержка

- Django: https://docs.djangoproject.com/
- DRF: https://www.django-rest-framework.org/
- JWT: https://django-rest-framework-simplejwt.readthedocs.io/

Удачи с созданием backend'а! 🎉
