#!/bin/bash
# Быстрая настройка Django backend для блога

set -e  # Остановиться при ошибке

echo "🚀 Настройка Django REST Framework backend для блога"
echo "=================================================="

# Проверка Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 не найден. Установите Python 3.8+"
    exit 1
fi

echo "✅ Python найден: $(python3 --version)"

# Создание директории проекта
PROJECT_DIR="myblog_backend"
if [ -d "$PROJECT_DIR" ]; then
    read -p "Директория $PROJECT_DIR уже существует. Удалить её? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -rf "$PROJECT_DIR"
    else
        echo "Отменено"
        exit 1
    fi
fi

mkdir -p "$PROJECT_DIR"
cd "$PROJECT_DIR"

echo "📁 Создана директория: $(pwd)"

# Создание виртуального окружения
echo "🔄 Создание виртуального окружения..."
python3 -m venv venv

# Активация виртуального окружения
echo "🔄 Активация виртуального окружения..."
source venv/bin/activate

# Обновление pip
echo "🔄 Обновление pip..."
pip install --upgrade pip

# Установка Django и зависимостей
echo "🔄 Установка Django и зависимостей..."
pip install django>=4.2.0
pip install djangorestframework>=3.14.0
pip install djangorestframework-simplejwt>=5.3.0
pip install django-cors-headers>=4.3.0
pip install pillow>=10.0.0
pip install python-decouple>=3.8

# Сохранение зависимостей
pip freeze > requirements.txt

# Создание Django проекта
echo "🔄 Создание Django проекта..."
django-admin startproject myblog .

# Создание приложения blog
echo "🔄 Создание приложения blog..."
python manage.py startapp blog

# Создание .env файла
echo "🔄 Создание .env файла..."
cat > .env << EOF
SECRET_KEY=django-insecure-change-this-in-production-$(openssl rand -base64 32)
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
EOF

echo ""
echo "🎉 Django backend создан успешно!"
echo ""
echo "Следующие шаги:"
echo "1. cd $PROJECT_DIR"
echo "2. source venv/bin/activate  # Активировать виртуальное окружение"
echo "3. Скопируйте код моделей, views, serializers из DJANGO_SETUP_MANUAL.md"
echo "4. python manage.py makemigrations blog"
echo "5. python manage.py migrate"
echo "6. python manage.py createsuperuser"
echo "7. python manage.py runserver 8000"
echo ""
echo "Затем в React frontend создайте .env файл:"
echo "VITE_API_URL=http://localhost:8000"
echo "VITE_USE_DRF=true"
echo ""
echo "📚 Полная документация в файле DJANGO_SETUP_MANUAL.md"
