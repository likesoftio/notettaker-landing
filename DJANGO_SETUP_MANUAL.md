# Создание Django REST Framework Backend - Пошаговая инструкция

## 🚀 Шаг 1: Создание проекта

### 1.1 Создание виртуального окружения

```bash
# Создаем директорию для backend
mkdir myblog_backend
cd myblog_backend

# Создаем виртуальное окружение
python -m venv venv

# Активируем его
# Windows:
venv\Scripts\activate

# Linux/Mac:
source venv/bin/activate
```

### 1.2 Установка зависимостей

```bash
# Обновляем pip
pip install --upgrade pip

# Устанавливаем Django и необходимые пакеты
pip install django>=4.2.0
pip install djangorestframework>=3.14.0
pip install djangorestframework-simplejwt>=5.3.0
pip install django-cors-headers>=4.3.0
pip install pillow>=10.0.0
pip install python-decouple>=3.8

# Сохраняем зависимости
pip freeze > requirements.txt
```

### 1.3 Создание Django проекта

```bash
# Создаем проект
django-admin startproject myblog .

# Создаем приложение для блога
python manage.py startapp blog
```

## 🔧 Шаг 2: Настройка Django

### 2.1 Создание файла настроек (.env)

Создайте файл `.env` в корне проекта:

```env
SECRET_KEY=your-very-secret-key-here-change-this-in-production
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### 2.2 Обновление settings.py

```python
# myblog/settings.py
import os
from decouple import config
from datetime import timedelta

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config('SECRET_KEY', default='your-default-secret-key')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config('DEBUG', default=True, cast=bool)

ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='localhost,127.0.0.1').split(',')

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third party apps
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',

    # Local apps
    'blog',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'myblog.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'myblog.wsgi.application'

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'ru-ru'
TIME_ZONE = 'Europe/Moscow'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# REST Framework settings
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
        'rest_framework.parsers.MultiPartParser',
        'rest_framework.parsers.FileUploadParser',
    ],
}

# JWT Settings
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'UPDATE_LAST_LOGIN': True,
}

# CORS settings
CORS_ALLOWED_ORIGINS = config(
    'CORS_ALLOWED_ORIGINS',
    default='http://localhost:3000,http://127.0.0.1:3000'
).split(',')

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOWED_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]
```

### 2.3 Обновление urls.py

```python
# myblog/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),

    # API endpoints
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/blog/', include('blog.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
```

## 🗄️ Шаг 3: Создание моделей

### 3.1 Модели блога (blog/models.py)

```python
# blog/models.py
from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify
from django.utils import timezone

class BlogCategory(models.Model):
    name = models.CharField(max_length=100, verbose_name="Название")
    slug = models.SlugField(unique=True, blank=True, verbose_name="URL слаг")
    description = models.TextField(blank=True, verbose_name="Описание")
    color = models.CharField(max_length=7, blank=True, verbose_name="Цвет (HEX)")
    image = models.URLField(blank=True, verbose_name="Изображение")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Создано")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Обновлено")

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"
        ordering = ['name']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    @property
    def post_count(self):
        return self.posts.filter(status='published').count()

class BlogPost(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Черновик'),
        ('published', 'Опубликовано'),
        ('archived', 'В архиве'),
    ]

    title = models.CharField(max_length=200, verbose_name="Заголовок")
    content = models.TextField(verbose_name="Содержание")
    excerpt = models.TextField(verbose_name="Краткое описание")
    slug = models.SlugField(unique=True, blank=True, verbose_name="URL слаг")
    hero_image = models.URLField(blank=True, verbose_name="Главное изображение")

    category = models.ForeignKey(
        BlogCategory,
        on_delete=models.CASCADE,
        related_name='posts',
        verbose_name="Категория"
    )
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name="Автор"
    )

    tags = models.JSONField(default=list, verbose_name="Теги")
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='draft',
        verbose_name="Статус"
    )
    featured = models.BooleanField(default=False, verbose_name="Рекомендуемая")
    views = models.PositiveIntegerField(default=0, verbose_name="Просмотры")

    # SEO поля
    seo_title = models.CharField(max_length=60, blank=True, verbose_name="SEO заголовок")
    seo_description = models.CharField(max_length=160, blank=True, verbose_name="SEO описание")
    seo_keywords = models.JSONField(default=list, verbose_name="SEO ключевые слова")

    # Даты
    published_at = models.DateTimeField(null=True, blank=True, verbose_name="Дата публикации")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Создано")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Обновлено")

    class Meta:
        verbose_name = "Статья"
        verbose_name_plural = "Статьи"
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)

        # Автоматически устанавливаем дату публикации
        if self.status == 'published' and not self.published_at:
            self.published_at = timezone.now()
        elif self.status != 'published':
            self.published_at = None

        super().save(*args, **kwargs)

    @property
    def read_time(self):
        """Рассчитать время чтения (слов в минуту)"""
        words = len(self.content.split())
        return max(1, words // 200)  # 200 слов в минуту
```

### 3.2 Создание миграций

```bash
# Создаем миграции
python manage.py makemigrations blog

# Применяем миграции
python manage.py migrate
```

## 🔌 Шаг 4: API Views и Serializers

### 4.1 Serializers (blog/serializers.py)

```python
# blog/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import BlogPost, BlogCategory

class CategorySerializer(serializers.ModelSerializer):
    post_count = serializers.ReadOnlyField()

    class Meta:
        model = BlogCategory
        fields = [
            'id', 'name', 'slug', 'description', 'color', 'image',
            'post_count', 'created_at', 'updated_at'
        ]
        read_only_fields = ['slug', 'created_at', 'updated_at']

class AuthorSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'avatar']

    def get_name(self, obj):
        return f"{obj.first_name} {obj.last_name}".strip() or obj.username

    def get_avatar(self, obj):
        # Можно добавить логику для аватара пользователя
        return None

class PostListSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    author = AuthorSerializer(read_only=True)
    read_time = serializers.ReadOnlyField()

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'excerpt', 'slug', 'hero_image',
            'category', 'author', 'tags', 'status', 'featured',
            'views', 'read_time', 'published_at', 'created_at', 'updated_at'
        ]

class PostDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    author = AuthorSerializer(read_only=True)
    read_time = serializers.ReadOnlyField()

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'content', 'excerpt', 'slug', 'hero_image',
            'category', 'author', 'tags', 'status', 'featured', 'views',
            'read_time', 'seo_title', 'seo_description', 'seo_keywords',
            'published_at', 'created_at', 'updated_at'
        ]

class PostCreateUpdateSerializer(serializers.ModelSerializer):
    category_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = BlogPost
        fields = [
            'title', 'content', 'excerpt', 'hero_image',
            'category_id', 'tags', 'status', 'featured',
            'seo_title', 'seo_description', 'seo_keywords'
        ]

    def create(self, validated_data):
        category_id = validated_data.pop('category_id')
        category = BlogCategory.objects.get(id=category_id)

        validated_data['category'] = category
        validated_data['author'] = self.context['request'].user

        return super().create(validated_data)

    def update(self, instance, validated_data):
        if 'category_id' in validated_data:
            category_id = validated_data.pop('category_id')
            instance.category = BlogCategory.objects.get(id=category_id)

        return super().update(instance, validated_data)
```

### 4.2 Views (blog/views.py)

```python
# blog/views.py
from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from .models import BlogPost, BlogCategory
from .serializers import (
    PostListSerializer, PostDetailSerializer, PostCreateUpdateSerializer,
    CategorySerializer
)

class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'status', 'featured', 'author']
    search_fields = ['title', 'content', 'excerpt', 'tags']
    ordering_fields = ['created_at', 'published_at', 'views', 'title']
    ordering = ['-created_at']
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'list':
            return PostListSerializer
        elif self.action in ['create', 'update', 'partial_update']:
            return PostCreateUpdateSerializer
        return PostDetailSerializer

    def get_queryset(self):
        queryset = BlogPost.objects.select_related('category', 'author')

        # Для неавторизованных пользователей показываем только опубликованные
        if not self.request.user.is_authenticated:
            queryset = queryset.filter(status='published')

        return queryset

    @action(detail=True, methods=['post'])
    def increment_views(self, request, slug=None):
        """Увеличить счетчик просмотров"""
        post = self.get_object()
        post.views += 1
        post.save(update_fields=['views'])
        return Response({'views': post.views})

    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Получить рекомендуемые статьи"""
        featured_posts = self.get_queryset().filter(
            featured=True,
            status='published'
        )[:5]
        serializer = self.get_serializer(featured_posts, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def popular(self, request):
        """Получить популярные статьи"""
        popular_posts = self.get_queryset().filter(
            status='published'
        ).order_by('-views')[:5]
        serializer = self.get_serializer(popular_posts, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def related(self, request, slug=None):
        """Получить похожие статьи"""
        post = self.get_object()
        related_posts = BlogPost.objects.filter(
            category=post.category,
            status='published'
        ).exclude(id=post.id)[:3]

        serializer = PostListSerializer(related_posts, many=True)
        return Response(serializer.data)

class BlogCategoryViewSet(viewsets.ModelViewSet):
    queryset = BlogCategory.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'

    @action(detail=True, methods=['get'])
    def posts(self, request, slug=None):
        """Получить статьи категории"""
        category = self.get_object()
        posts = BlogPost.objects.filter(
            category=category,
            status='published'
        )
        serializer = PostListSerializer(posts, many=True)
        return Response(serializer.data)
```

### 4.3 URLs (blog/urls.py)

```python
# blog/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BlogPostViewSet, BlogCategoryViewSet

router = DefaultRouter()
router.register(r'posts', BlogPostViewSet)
router.register(r'categories', BlogCategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
```

### 4.4 Admin (blog/admin.py)

```python
# blog/admin.py
from django.contrib import admin
from .models import BlogPost, BlogCategory

@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'post_count', 'created_at']
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ['name', 'description']

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'category', 'status', 'featured', 'views', 'created_at']
    list_filter = ['status', 'featured', 'category', 'created_at']
    search_fields = ['title', 'content', 'excerpt']
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ['views', 'created_at', 'updated_at']

    fieldsets = (
        ('Основная информация', {
            'fields': ('title', 'slug', 'content', 'excerpt', 'hero_image')
        }),
        ('Категоризация', {
            'fields': ('category', 'author', 'tags')
        }),
        ('Настройки публикации', {
            'fields': ('status', 'featured', 'published_at')
        }),
        ('SEO', {
            'fields': ('seo_title', 'seo_description', 'seo_keywords'),
            'classes': ('collapse',)
        }),
        ('Статистика', {
            'fields': ('views', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
```

## 🚀 Шаг 5: Запуск проекта

### 5.1 Создание суперпользователя

```bash
python manage.py createsuperuser
```

### 5.2 Запуск сервера

```bash
python manage.py runserver 8000
```

### 5.3 Тестирование API

```bash
# Получить список категорий
curl http://localhost:8000/api/blog/categories/

# Получить список статей
curl http://localhost:8000/api/blog/posts/

# Получить токен (замените на ваши данные)
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"your_password"}'
```

## 🔧 Шаг 6: Подключение к React

В React frontend создайте `.env` файл:

```env
VITE_API_URL=http://localhost:8000
VITE_USE_DRF=true
```

Теперь ваш React frontend будет автоматически использовать Django backend!

## 📚 Полезные команды

```bash
# Создать миграции
python manage.py makemigrations

# Применить миграции
python manage.py migrate

# Собрать статические файлы
python manage.py collectstatic

# Создать дамп данных
python manage.py dumpdata blog > blog_data.json

# Загрузить дамп данных
python manage.py loaddata blog_data.json

# Запустить тесты
python manage.py test

# Открыть Django shell
python manage.py shell
```

Готово! У вас есть полноценный Django REST Framework backend для блога! 🎉
