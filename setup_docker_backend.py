#!/usr/bin/env python3
"""
Единая команда для создания и запуска Django backend с Docker
"""

import os
import shutil
import subprocess
import sys
from pathlib import Path

def run_command(command, description, shell=True):
    """Выполнить команду с описанием"""
    print(f"\n🔄 {description}")
    print(f"Выполняю: {command}")
    
    result = subprocess.run(command, shell=shell, capture_output=True, text=True)
    
    if result.returncode == 0:
        print(f"✅ {description} - успешно")
        if result.stdout.strip():
            print(result.stdout)
        return True
    else:
        print(f"❌ {description} - ошибка")
        if result.stderr.strip():
            print(f"Ошибка: {result.stderr}")
        if result.stdout.strip():
            print(f"Вывод: {result.stdout}")
        return False

def check_dependencies():
    """Проверить наличие Docker и Docker Compose"""
    print("🔍 Проверка зависимостей...")
    
    # Проверка Docker
    if not run_command("docker --version", "Проверка Docker"):
        print("❌ Docker не найден. Установите Docker Desktop:")
        print("   https://www.docker.com/products/docker-desktop/")
        return False
    
    # Проверка Docker Compose
    if not run_command("docker-compose --version", "Проверка Docker Compose"):
        print("❌ Docker Compose не найден. Установите Docker Compose")
        return False
    
    return True

def create_project_structure():
    """Создать структуру проекта"""
    
    project_dir = "myblog_backend"
    
    # Проверить существование директории
    if os.path.exists(project_dir):
        response = input(f"Директория {project_dir} уже существует. Удалить её? (y/N): ")
        if response.lower() == 'y':
            shutil.rmtree(project_dir)
        else:
            print("Отменено")
            return False, None
    
    # Создать директорию и перейти в неё
    os.makedirs(project_dir)
    original_dir = os.getcwd()
    os.chdir(project_dir)
    
    print(f"📁 Создана директория: {os.getcwd()}")
    
    # Создать структуру Django
    directories = [
        "myblog",
        "blog", 
        "blog/migrations",
        "static",
        "media",
        "templates",
        "logs",
    ]
    
    for directory in directories:
        Path(directory).mkdir(parents=True, exist_ok=True)
    
    # Создать __init__.py файлы
    init_files = [
        "myblog/__init__.py",
        "blog/__init__.py", 
        "blog/migrations/__init__.py",
    ]
    
    for init_file in init_files:
        Path(init_file).touch()
    
    return True, original_dir

def copy_docker_files(original_dir):
    """Копировать Docker файлы из docker-setup"""
    
    source_dir = Path(original_dir) / "docker-setup"
    
    if not source_dir.exists():
        print(f"❌ Директория {source_dir} не найдена")
        return False
    
    files_to_copy = [
        "Dockerfile",
        "docker-compose.yml", 
        "docker-compose.prod.yml",
        "requirements.txt",
        "nginx.conf",
        ".env.template",
        "start.sh",
    ]
    
    for file_name in files_to_copy:
        source_file = source_dir / file_name
        if source_file.exists():
            shutil.copy2(source_file, file_name)
            print(f"✅ Скопирован: {file_name}")
        else:
            print(f"⚠️  Файл не найден: {source_file}")
    
    # Создать .env из шаблона
    if Path(".env.template").exists():
        shutil.copy2(".env.template", ".env")
        print("✅ Создан .env файл")
    
    return True

def copy_django_files(original_dir):
    """Копировать готовые Django файлы"""
    
    source_dir = Path(original_dir) / "docker-setup" / "django_files"
    
    if not source_dir.exists():
        print(f"⚠️  Директория с Django файлами не найдена: {source_dir}")
        print("📚 Скопируйте код из DJANGO_SETUP_MANUAL.md вручную")
        return True
    
    # Копировать файлы Django
    django_files = {
        "settings.py": "myblog/settings.py",
        "urls.py": "myblog/urls.py",
    }
    
    for source_name, dest_path in django_files.items():
        source_file = source_dir / source_name
        if source_file.exists():
            shutil.copy2(source_file, dest_path)
            print(f"✅ Скопирован: {dest_path}")
    
    return True

def create_remaining_django_files():
    """Создать остальные Django файлы"""
    
    # manage.py
    manage_py = '''#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys

if __name__ == '__main__':
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myblog.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)
'''
    
    with open("manage.py", "w") as f:
        f.write(manage_py)
    os.chmod("manage.py", 0o755)
    
    # wsgi.py
    wsgi_py = '''"""
WSGI config for myblog project.
"""

import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myblog.settings')
application = get_wsgi_application()
'''
    
    with open("myblog/wsgi.py", "w") as f:
        f.write(wsgi_py)
    
    print("✅ Созданы базовые Django файлы")

def run_docker_setup():
    """Запустить Docker setup"""
    
    print("\n🐳 Запуск Docker контейнеров...")
    
    # Сборка образов
    if not run_command("docker-compose build", "Сборка Docker образов"):
        return False
    
    # Запуск базы данных
    if not run_command("docker-compose up -d postgres redis", "Запуск PostgreSQL и Redis"):
        return False
    
    # Ожидание готовности базы
    print("⏳ Ожидание готовности PostgreSQL (30 сек)...")
    run_command("sleep 30", "Ожидание", shell=True)
    
    # Миграции
    if not run_command("docker-compose run --rm backend python manage.py migrate", "Применение миграций"):
        print("⚠️  Миграции не применены. Возможно, нужно создать модели Django")
    
    # Запуск всех сервисов
    if not run_command("docker-compose up -d", "Запуск всех сервисов"):
        return False
    
    return True

def main():
    print("🐳 Создание Django REST Framework backend с Docker")
    print("=" * 65)
    
    # Проверка зависимостей
    if not check_dependencies():
        return
    
    # Создание структуры проекта
    success, original_dir = create_project_structure()
    if not success:
        return
    
    try:
        # Копирование Docker файлов
        if not copy_docker_files(original_dir):
            return
        
        # Копирование Django файлов
        copy_django_files(original_dir)
        
        # Создание базовых Django файлов
        create_remaining_django_files()
        
        # Запуск Docker
        if run_docker_setup():
            print("\n🎉 Django backend с Docker создан и запущен!")
            print("\n📍 Доступные URL:")
            print("   - API: http://localhost:8000/api/")
            print("   - Admin: http://localhost:8000/admin/")
            print("   - Swagger: http://localhost:8000/api/swagger/")
            print("\n🔧 Настройка React frontend:")
            print("   Создайте .env файл в React проекте:")
            print("   VITE_API_URL=http://localhost:8000")
            print("   VITE_USE_DRF=true")
            print("\n📚 Дополнительная настройка:")
            print("   1. Скопируйте модели из DJANGO_SETUP_MANUAL.md")
            print("   2. docker-compose run --rm backend python manage.py makemigrations blog")
            print("   3. docker-compose run --rm backend python manage.py migrate")
            print("   4. docker-compose run --rm backend python manage.py createsuperuser")
        else:
            print("\n❌ Ошибка при запуске Docker")
    
    finally:
        # Вернуться в исходную директорию
        if original_dir:
            os.chdir(original_dir)

if __name__ == "__main__":
    main()
