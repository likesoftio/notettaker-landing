# Multi-stage Dockerfile для Django REST Framework Backend
FROM python:3.11-slim as base

# Устанавливаем системные зависимости
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Создаем пользователя для приложения
RUN useradd --create-home --shell /bin/bash app

# Устанавливаем рабочую директорию
WORKDIR /app

# Stage для зависимостей
FROM base as deps

# Копируем requirements и устанавливаем зависимости
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Production stage
FROM base as production

# Копируем установленные пакеты из deps stage
COPY --from=deps /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=deps /usr/local/bin /usr/local/bin

# Копируем код приложения
COPY . .

# Создаем директории для статических и медиа файлов
RUN mkdir -p /app/staticfiles /app/media

# Меняем владельца файлов
RUN chown -R app:app /app
USER app

# Собираем статические файлы
RUN python manage.py collectstatic --noinput

# Открываем порт
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/api/blog/categories/ || exit 1

# Команда по умолчанию
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "3", "myblog.wsgi:application"]
