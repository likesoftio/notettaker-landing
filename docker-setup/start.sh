#!/bin/bash
# Быстрый запуск Django backend с Docker

set -e

echo "🐳 Запуск Django backend с Docker"
echo "================================="

# Проверка Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker не найден. Установите Docker Desktop"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose не найден. Установите Docker Compose"
    exit 1
fi

echo "✅ Docker найден: $(docker --version)"
echo "✅ Docker Compose найден: $(docker-compose --version)"

# Создание .env файла если не существует
if [ ! -f .env ]; then
    echo "🔄 Создание .env файла..."
    cp .env.template .env
    echo "✅ Создан .env файл. Отредактируйте его при необходимости."
fi

# Создание структуры Django проекта
if [ ! -f manage.py ]; then
    echo "🔄 Создание структуры Django проекта..."
    python3 create_django_project.py
fi

# Проверка наличия Django файлов
REQUIRED_FILES=(
    "myblog/settings.py"
    "myblog/urls.py"
    "myblog/wsgi.py"
    "blog/models.py"
    "blog/views.py"
    "blog/serializers.py"
    "blog/urls.py"
    "blog/admin.py"
)

MISSING_FILES=()
for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        MISSING_FILES+=("$file")
    fi
done

if [ ${#MISSING_FILES[@]} -ne 0 ]; then
    echo "⚠️  Некоторые Django файлы отсутствуют:"
    printf '%s\n' "${MISSING_FILES[@]}"
    echo ""
    echo "📚 Скопируйте код из DJANGO_SETUP_MANUAL.md или используйте готовые файлы"
    echo ""
    read -p "Продолжить запуск? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Сборка образов
echo "🔄 Сборка Docker образов..."
docker-compose build

# Запуск зависимостей
echo "🔄 Запуск базы данных и Redis..."
docker-compose up -d postgres redis

# Ожидание готовности базы данных
echo "⏳ Ожидание готовности PostgreSQL..."
timeout 60s bash -c 'until docker-compose exec postgres pg_isready -U postgres; do sleep 1; done'

# Применение миграций
echo "🔄 Применение миграций..."
docker-compose run --rm backend python manage.py migrate

# Создание суперпользователя (если нужно)
echo ""
read -p "Создать суперпользователя? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    docker-compose run --rm backend python manage.py createsuperuser
fi

# Запуск всех сервисов
echo "🚀 Запуск всех сервисов..."
docker-compose up -d

echo ""
echo "🎉 Django backend запущен!"
echo ""
echo "📍 Доступные URL:"
echo "   - API: http://localhost:8000/api/"
echo "   - Admin: http://localhost:8000/admin/"
echo "   - Swagger: http://localhost:8000/api/swagger/"
echo ""
echo "📊 Мониторинг:"
echo "   - Логи: docker-compose logs -f backend"
echo "   - Статус: docker-compose ps"
echo ""
echo "🛑 Остановка:"
echo "   - docker-compose down"
echo "   - docker-compose down -v  # с удалением данных"
echo ""
echo "🔧 Настройка React frontend:"
echo "   Создайте .env файл в React проекте:"
echo "   VITE_API_URL=http://localhost:8000"
echo "   VITE_USE_DRF=true"
