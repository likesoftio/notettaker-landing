# 🐳 Django Backend с Docker

Полная Docker настройка для Django REST Framework backend'а блога.

## 🚀 Быстрый старт

### 1. Установка Docker

**Windows/Mac:**

- Скачайте и установите [Docker Desktop](https://www.docker.com/products/docker-desktop/)

**Linux (Ubuntu/Debian):**

```bash
# Установка Docker
sudo apt update
sudo apt install docker.io docker-compose
sudo usermod -aG docker $USER
# Перелогиньтесь для применения изменений
```

### 2. Запуск проекта

```bash
# Клонируйте файлы Docker setup
cd docker-setup

# Сделайте скрипт исполняемым (Linux/Mac)
chmod +x start.sh

# Запустите автоматическую настройку
./start.sh

# Или для Windows
bash start.sh
```

### 3. Настройка React frontend

```bash
# В корне React проекта создайте .env
echo "VITE_API_URL=http://localhost:8000" > .env
echo "VITE_USE_DRF=true" >> .env

# Перезапустите React
npm run dev
```

## 📁 Структура проекта

```
docker-setup/
├── docker-compose.yml          # Основная конфигурация
├── docker-compose.prod.yml     # Production конфигурация
├── Dockerfile                  # Docker образ для Django
├── requirements.txt            # Python зависимости
├── nginx.conf                  # Nginx конфигурация
├── .env.template              # Шаблон переменных окружения
├── start.sh                   # Скрипт быстрого запуска
└── create_django_project.py   # Создание структуры Django
```

## 🛠️ Ручная настройка

### 1. Создание .env файла

```bash
cp .env.template .env
# Отредактируйте .env под свои нужды
```

### 2. Создание Django проекта

```bash
python create_django_project.py
```

### 3. Копирование Django кода

Скопируйте код из `DJANGO_SETUP_MANUAL.md` в соответствующие файлы:

- `myblog/settings.py` - настройки Django
- `myblog/urls.py` - URL маршруты проекта
- `myblog/wsgi.py` - WSGI конфигурация
- `blog/models.py` - модели данных
- `blog/serializers.py` - API сериализаторы
- `blog/views.py` - API views
- `blog/urls.py` - URL маршруты приложения
- `blog/admin.py` - админка Django

### 4. Запуск контейнеров

```bash
# Сборка образов
docker-compose build

# Запуск базы данных
docker-compose up -d postgres redis

# Применение миграций
docker-compose run --rm backend python manage.py migrate

# Создание суперпользователя
docker-compose run --rm backend python manage.py createsuperuser

# Запуск всех сервисов
docker-compose up -d
```

## 🌐 Доступные сервисы

После запуска доступны:

- **API**: http://localhost:8000/api/
- **Django Admin**: http://localhost:8000/admin/
- **Swagger Documentation**: http://localhost:8000/api/swagger/
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

## 📋 Полезные команды

### Управление контейнерами

```bash
# Просмотр статуса
docker-compose ps

# Просмотр логов
docker-compose logs -f backend

# Остановка сервисов
docker-compose down

# Остановка с удалением данных
docker-compose down -v

# Перезапуск конкретного сервиса
docker-compose restart backend
```

### Django команды

```bash
# Выполнение команд Django
docker-compose run --rm backend python manage.py [команда]

# Миграции
docker-compose run --rm backend python manage.py makemigrations
docker-compose run --rm backend python manage.py migrate

# Создание суперпользователя
docker-compose run --rm backend python manage.py createsuperuser

# Django shell
docker-compose run --rm backend python manage.py shell

# Сбор статических файлов
docker-compose run --rm backend python manage.py collectstatic
```

### Управление данными

```bash
# Создание дампа данных
docker-compose run --rm backend python manage.py dumpdata blog > blog_data.json

# Загрузка дампа данных
docker-compose run --rm backend python manage.py loaddata blog_data.json

# Очистка базы данных
docker-compose run --rm backend python manage.py flush
```

## 🏭 Production развертывание

### 1. Использование production конфигурации

```bash
# Создайте production .env
cp .env.template .env.prod
# Настройте production переменные

# Запуск с production конфигурацией
docker-compose -f docker-compose.prod.yml up -d
```

### 2. Важные production настройки

В `.env.prod` обязательно измените:

```env
DEBUG=False
SECRET_KEY=ваш-очень-секретный-ключ
ALLOWED_HOSTS=ваш-домен.com,www.ваш-домен.com
CORS_ALLOWED_ORIGINS=https://ваш-frontend-домен.com
```

### 3. SSL сертификаты

Разместите SSL сертификаты в папке `ssl/`:

```
ssl/
├── cert.pem
└── privkey.pem
```

## 🔧 Кастомизация

### Изменение портов

В `docker-compose.yml`:

```yaml
ports:
  - "8080:8000" # Изменить внешний порт на 8080
```

### Добавление новых сервисов

Пример добавления Elasticsearch:

```yaml
elasticsearch:
  image: elasticsearch:8.10.0
  environment:
    - discovery.type=single-node
    - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
  ports:
    - "9200:9200"
  networks:
    - myblog_network
```

### Кастомные настройки Nginx

Отредактируйте `nginx.conf` для добавления:

- Дополнительных location блоков
- SSL конфигурации
- Rate limiting
- Custom headers

## 🐛 Troubleshooting

### Проблема: Контейнер не запускается

```bash
# Проверьте логи
docker-compose logs backend

# Проверьте конфигурацию
docker-compose config
```

### Проблема: База данных недоступна

```bash
# Проверьте статус PostgreSQL
docker-compose ps postgres

# Подключитесь к базе
docker-compose exec postgres psql -U postgres -d myblog
```

### Проблема: Статические файлы не загружаются

```bash
# Пересоберите статические файлы
docker-compose run --rm backend python manage.py collectstatic --clear
```

### Проблема: CORS ошибки

Проверьте переменную `CORS_ALLOWED_ORIGINS` в `.env`:

```env
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

## 📊 Мониторинг

### Просмотр метрик

```bash
# Использование ресурсов
docker stats

# Логи в реальном времени
docker-compose logs -f --tail=100

# Проверка здоровья сервисов
docker-compose ps
```

### Health checks

Встроенные health checks для:

- PostgreSQL: `pg_isready`
- Redis: `redis-cli ping`
- Django backend: HTTP запрос к API

## 🔒 Безопасность

### Рекомендации для production

1. **Используйте секретные ключи из внешних источников**
2. **Настройте firewall для ограничения доступа к портам**
3. **Используйте HTTPS везде**
4. **Регулярно обновляйте образы Docker**
5. **Настройте backup базы данных**

### Backup стратегия

```bash
# Автоматический backup базы данных
docker-compose exec postgres pg_dump -U postgres myblog > backup_$(date +%Y%m%d_%H%M%S).sql

# Восстановление из backup
docker-compose exec -T postgres psql -U postgres myblog < backup_file.sql
```

## 🆘 Поддержка

- **Docker документация**: https://docs.docker.com/
- **Django документация**: https://docs.djangoproject.com/
- **DRF документация**: https://www.django-rest-framework.org/

Удачи с Django backend в Docker! 🚀
