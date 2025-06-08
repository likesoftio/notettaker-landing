import React, { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Code,
  Database,
  Server,
  Settings,
  Copy,
  ExternalLink,
} from "lucide-react";
import { getApiStatus, switchApi } from "../lib/blog-api-switcher";
import apiClient from "../lib/api-client";
import {
  DisplayLG,
  HeadingXL,
  BodyLG,
  HeadingMD,
  BodyMD,
} from "../components/Typography";

export default function DRFSetup() {
  const [apiUrl, setApiUrl] = useState(
    import.meta.env.VITE_API_URL ||
      import.meta.env.REACT_APP_API_URL ||
      "http://localhost:8000",
  );
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [testing, setTesting] = useState(false);
  const apiStatus = getApiStatus();

  const testApiConnection = async () => {
    setTesting(true);
    setTestResult(null);

    try {
      // Test basic connection
      const response = await fetch(
        `${apiUrl}/api/blog/posts/?page=1&page_size=1`,
      );

      if (response.ok) {
        setTestResult({
          success: true,
          message: "Успешное подключение к DRF API! ✅",
        });
      } else {
        setTestResult({
          success: false,
          message: `Ошибка API: ${response.status} ${response.statusText}`,
        });
      }
    } catch (error) {
      setTestResult({
        success: false,
        message: `Ошибка подключения: ${error.message}`,
      });
    } finally {
      setTesting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const djangoSettingsCode = `# settings.py

# CORS settings for React frontend
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # React dev server
    "http://127.0.0.1:3000",
    # Add your production domain here
]

CORS_ALLOW_CREDENTIALS = True

# REST Framework settings
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
}

# JWT Settings
from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
}

# Installed apps
INSTALLED_APPS = [
    # ... your other apps
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'blog',  # Your blog app
]

# Middleware
MIDDLEWARE = [
    # ... your other middleware
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]`;

  const urlsCode = `# urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/blog/', include('blog.urls')),
]`;

  const modelsCode = `# blog/models.py
from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify

class BlogCategory(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(blank=True)
    color = models.CharField(max_length=7, blank=True)  # Hex color
    image = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    @property
    def post_count(self):
        return self.posts.filter(status='published').count()

class BlogPost(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('archived', 'Archived'),
    ]

    title = models.CharField(max_length=200)
    content = models.TextField()
    excerpt = models.TextField()
    slug = models.SlugField(unique=True, blank=True)
    hero_image = models.URLField(blank=True)
    category = models.ForeignKey(BlogCategory, on_delete=models.CASCADE, related_name='posts')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    tags = models.JSONField(default=list)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    featured = models.BooleanField(default=False)
    views = models.PositiveIntegerField(default=0)
    seo_title = models.CharField(max_length=60, blank=True)
    seo_description = models.CharField(max_length=160, blank=True)
    seo_keywords = models.JSONField(default=list)
    published_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    @property
    def read_time(self):
        words = len(self.content.split())
        return max(1, words // 200)`;

  const serializersCode = `# blog/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import BlogPost, BlogCategory

class CategorySerializer(serializers.ModelSerializer):
    post_count = serializers.ReadOnlyField()

    class Meta:
        model = BlogCategory
        fields = ['id', 'name', 'slug', 'description', 'color', 'image', 'post_count', 'created_at', 'updated_at']

class AuthorSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'name', 'email']

    def get_name(self, obj):
        return f"{obj.first_name} {obj.last_name}".strip() or obj.username

class PostSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    author = AuthorSerializer(read_only=True)
    read_time = serializers.ReadOnlyField()

    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'content', 'excerpt', 'slug', 'hero_image',
                 'category', 'author', 'tags', 'status', 'featured', 'views',
                 'read_time', 'seo_title', 'seo_description', 'seo_keywords',
                 'published_at', 'created_at', 'updated_at']`;

  return (
    <div className="page-container">
      <div className="page-main max-w-6xl mx-auto">
        <div className="page-header text-center">
          <DisplayLG>Интеграция с Django REST Framework</DisplayLG>
          <BodyLG className="text-gray-600 dark:text-gray-300">
            Настройка и подключение DRF backend к React frontend
          </BodyLG>
        </div>

        {/* Current Status */}
        <Card className="card-base p-6 mb-8">
          <HeadingMD className="mb-4">Текущий статус</HeadingMD>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5" />
              <span>Backend:</span>
              <Badge
                variant={apiStatus.backend === "DRF" ? "default" : "secondary"}
              >
                {apiStatus.backend}
              </Badge>
            </div>

            <div className="flex items-center gap-3">
              <Server className="w-5 h-5" />
              <span>API URL:</span>
              <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                {apiStatus.apiUrl}
              </code>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={testApiConnection}
              disabled={testing}
              variant="outline"
            >
              {testing ? "Тестирование..." : "Тестировать соединение"}
            </Button>

            <Button
              onClick={() => switchApi(!apiStatus.useDRF)}
              variant={apiStatus.useDRF ? "destructive" : "default"}
            >
              {apiStatus.useDRF
                ? "Переключить на localStorage"
                : "Переключить на DRF"}
            </Button>
          </div>

          {testResult && (
            <Alert
              variant={testResult.success ? "default" : "destructive"}
              className="mt-4"
            >
              {testResult.success ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              <AlertDescription>{testResult.message}</AlertDescription>
            </Alert>
          )}
        </Card>

        <Tabs defaultValue="setup" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="setup">Настройка</TabsTrigger>
            <TabsTrigger value="models">Модели</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
            <TabsTrigger value="testing">Тестирование</TabsTrigger>
          </TabsList>

          <TabsContent value="setup">
            <div className="space-y-6">
              <Card className="card-base p-6">
                <HeadingMD className="mb-4">
                  1. Установка зависимостей
                </HeadingMD>

                <div className="space-y-4">
                  <div>
                    <BodyMD className="mb-2 font-medium">Python пакеты:</BodyMD>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg relative">
                      <code className="text-sm">
                        pip install django djangorestframework
                        <br />
                        pip install djangorestframework-simplejwt
                        <br />
                        pip install django-cors-headers
                      </code>
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2"
                        onClick={() =>
                          copyToClipboard(
                            "pip install django djangorestframework djangorestframework-simplejwt django-cors-headers",
                          )
                        }
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <BodyMD className="mb-2 font-medium">
                      React environment переменные:
                    </BodyMD>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg relative">
                      <code className="text-sm">
                        # .env
                        <br />
                        REACT_APP_API_URL=http://localhost:8000
                        <br />
                        REACT_APP_USE_DRF=true
                      </code>
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2"
                        onClick={() =>
                          copyToClipboard(
                            "REACT_APP_API_URL=http://localhost:8000\nREACT_APP_USE_DRF=true",
                          )
                        }
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="card-base p-6">
                <HeadingMD className="mb-4">2. Django настройки</HeadingMD>

                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg relative max-h-96 overflow-y-auto">
                  <pre className="text-sm">
                    <code>{djangoSettingsCode}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(djangoSettingsCode)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </Card>

              <Card className="card-base p-6">
                <HeadingMD className="mb-4">3. URLs конфигурация</HeadingMD>

                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg relative">
                  <pre className="text-sm">
                    <code>{urlsCode}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(urlsCode)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="models">
            <Card className="card-base p-6">
              <HeadingMD className="mb-4">Django модели</HeadingMD>

              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg relative max-h-96 overflow-y-auto">
                <pre className="text-sm">
                  <code>{modelsCode}</code>
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(modelsCode)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>

              <Alert className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  После создания моделей выполните:
                  <code className="ml-2 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    python manage.py makemigrations && python manage.py migrate
                  </code>
                </AlertDescription>
              </Alert>
            </Card>
          </TabsContent>

          <TabsContent value="api">
            <Card className="card-base p-6">
              <HeadingMD className="mb-4">Serializers и ViewSets</HeadingMD>

              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg relative max-h-96 overflow-y-auto">
                <pre className="text-sm">
                  <code>{serializersCode}</code>
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(serializersCode)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="testing">
            <div className="space-y-6">
              <Card className="card-base p-6">
                <HeadingMD className="mb-4">Тестирование API</HeadingMD>

                <div className="space-y-4">
                  <div>
                    <BodyMD className="mb-2">URL для тестирования:</BodyMD>
                    <div className="flex gap-2">
                      <Input
                        value={apiUrl}
                        onChange={(e) => setApiUrl(e.target.value)}
                        placeholder="http://localhost:8000"
                      />
                      <Button onClick={testApiConnection} disabled={testing}>
                        Тест
                      </Button>
                    </div>
                  </div>

                  {testResult && (
                    <Alert
                      variant={testResult.success ? "default" : "destructive"}
                    >
                      {testResult.success ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <XCircle className="h-4 w-4" />
                      )}
                      <AlertDescription>{testResult.message}</AlertDescription>
                    </Alert>
                  )}

                  <div>
                    <BodyMD className="mb-2 font-medium">
                      Полезные команды:
                    </BodyMD>
                    <div className="space-y-2">
                      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                        <code className="text-sm">
                          python manage.py runserver 8000
                        </code>
                        <span className="ml-2 text-gray-600">
                          - Запуск Django сервера
                        </span>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                        <code className="text-sm">
                          python manage.py createsuperuser
                        </code>
                        <span className="ml-2 text-gray-600">
                          - Создание админа
                        </span>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                        <code className="text-sm">
                          curl http://localhost:8000/api/blog/posts/
                        </code>
                        <span className="ml-2 text-gray-600">- Тест API</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="card-base p-6">
                <HeadingMD className="mb-4">Endpoints</HeadingMD>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">GET</Badge>
                    <code>/api/blog/posts/</code>
                    <span className="text-gray-600">- Список статей</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">POST</Badge>
                    <code>/api/blog/posts/</code>
                    <span className="text-gray-600">- Создать статью</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">GET</Badge>
                    <code>/api/blog/categories/</code>
                    <span className="text-gray-600">- Список категорий</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">POST</Badge>
                    <code>/api/auth/login/</code>
                    <span className="text-gray-600">- Авторизация</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <Card className="card-base p-6 mt-8">
          <HeadingMD className="mb-4">Полезные ссылки</HeadingMD>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="https://www.django-rest-framework.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
            >
              <ExternalLink className="w-4 h-4" />
              Django REST Framework
            </a>
            <a
              href="https://django-rest-framework-simplejwt.readthedocs.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
            >
              <ExternalLink className="w-4 h-4" />
              JWT Authentication
            </a>
            <a
              href="https://github.com/adamchainz/django-cors-headers"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
            >
              <ExternalLink className="w-4 h-4" />
              CORS Headers
            </a>
            <a
              href="https://docs.djangoproject.com/en/stable/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
            >
              <ExternalLink className="w-4 h-4" />
              Django Documentation
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
