#!/usr/bin/env python3
"""
Скрипт для автоматического создания Django REST Framework backend
для блога с готовыми моделями, API и настройками
"""

import os
import subprocess
import sys

def run_command(command, description):
    """Выполнить команду с описанием"""
    print(f"\n🔄 {description}")
    print(f"Выполняю: {command}")
    
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    
    if result.returncode == 0:
        print(f"✅ {description} - успешно")
        if result.stdout:
            print(result.stdout)
    else:
        print(f"❌ {description} - ошибка")
        print(f"Stderr: {result.stderr}")
        print(f"Stdout: {result.stdout}")
        return False
    
    return True

def create_project_structure():
    """Создать структуру Django проекта"""
    
    # Создать виртуальное окружение
    if not run_command("python -m venv venv", "Создание виртуального окружения"):
        return False
    
    # Активировать виртуальное окружение и установить пакеты
    activate_cmd = "venv\\Scripts\\activate" if os.name == 'nt' else "source venv/bin/activate"
    
    commands = [
        f"{activate_cmd} && pip install --upgrade pip",
        f"{activate_cmd} && pip install django>=4.2.0",
        f"{activate_cmd} && pip install djangorestframework>=3.14.0",
        f"{activate_cmd} && pip install djangorestframework-simplejwt>=5.3.0", 
        f"{activate_cmd} && pip install django-cors-headers>=4.3.0",
        f"{activate_cmd} && pip install pillow>=10.0.0",  # Для работы с изображениями
        f"{activate_cmd} && pip install python-decouple>=3.8",  # Для env переменных
    ]
    
    for cmd in commands:
        if not run_command(cmd, f"Установка пакетов: {cmd.split('&&')[-1].strip()}"):
            return False
    
    # Создать Django проект
    activate_cmd = "venv\\Scripts\\activate" if os.name == 'nt' else "source venv/bin/activate"
    if not run_command(f"{activate_cmd} && django-admin startproject myblog .", "Создание Django проекта"):
        return False
    
    # Создать приложение blog
    if not run_command(f"{activate_cmd} && python manage.py startapp blog", "Создание приложения blog"):
        return False
    
    return True

def main():
    print("🚀 Создание Django REST Framework backend для блога")
    print("=" * 60)
    
    # Проверить что Python установлен
    try:
        result = subprocess.run([sys.executable, "--version"], capture_output=True, text=True)
        python_version = result.stdout.strip()
        print(f"✅ Python найден: {python_version}")
    except:
        print("❌ Python не найден. Установите Python 3.8+")
        return
    
    # Создать директорию для проекта
    project_dir = "myblog_backend"
    
    if os.path.exists(project_dir):
        response = input(f"Директория {project_dir} уже существует. Удалить её? (y/N): ")
        if response.lower() == 'y':
            import shutil
            shutil.rmtree(project_dir)
        else:
            print("Отменено")
            return
    
    os.makedirs(project_dir)
    os.chdir(project_dir)
    
    print(f"📁 Создана директория: {os.getcwd()}")
    
    # Создать структуру проекта
    if create_project_structure():
        print("\n🎉 Backend создан успешно!")
        print("\nСледующие шаги:")
        print("1. cd myblog_backend")
        print("2. Активируйте виртуальное окружение:")
        print("   - Windows: venv\\Scripts\\activate")
        print("   - Linux/Mac: source venv/bin/activate")
        print("3. Скопируйте файлы настроек из инструкции")
        print("4. python manage.py migrate")
        print("5. python manage.py createsuperuser")
        print("6. python manage.py runserver 8000")
    else:
        print("\n❌ Ошибка при создании backend'а")

if __name__ == "__main__":
    main()
