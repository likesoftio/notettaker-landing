#!/usr/bin/env python3
"""
Скрипт для создания структуры Django проекта с готовыми файлами
"""

import os
import shutil
from pathlib import Path

def create_django_structure():
    """Создать структуру Django проекта"""
    
    # Создать основные директории
    directories = [
        "myblog",
        "blog",
        "blog/migrations",
        "static",
        "media",
        "templates",
        "locale",
        "logs",
    ]
    
    for directory in directories:
        Path(directory).mkdir(parents=True, exist_ok=True)
        print(f"✅ Создана директория: {directory}")
    
    # Создать файл manage.py
    manage_py_content = '''#!/usr/bin/env python
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
        f.write(manage_py_content)
    os.chmod("manage.py", 0o755)
    print("✅ Создан файл: manage.py")
    
    # Создать __init__.py файлы
    init_files = [
        "myblog/__init__.py",
        "blog/__init__.py",
        "blog/migrations/__init__.py",
    ]
    
    for init_file in init_files:
        Path(init_file).touch()
        print(f"✅ Создан файл: {init_file}")
    
    print("\n🎉 Структура Django проекта создана!")
    print("\nСледующие шаги:")
    print("1. Скопируйте содержимое файлов из DJANGO_SETUP_MANUAL.md")
    print("2. docker-compose up -d postgres redis")
    print("3. docker-compose run --rm backend python manage.py migrate")
    print("4. docker-compose run --rm backend python manage.py createsuperuser")
    print("5. docker-compose up")

if __name__ == "__main__":
    create_django_structure()
