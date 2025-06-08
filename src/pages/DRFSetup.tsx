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
  Database,
  Server,
  Copy,
  ExternalLink,
} from "lucide-react";
import { getApiStatus, switchApi } from "../lib/blog-api-switcher";
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
    } catch (error: any) {
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="setup">Настройка</TabsTrigger>
            <TabsTrigger value="testing">Тестирование</TabsTrigger>
            <TabsTrigger value="docs">Документация</TabsTrigger>
          </TabsList>

          <TabsContent value="setup">
            <div className="space-y-6">
              <Card className="card-base p-6">
                <HeadingMD className="mb-4">1. Переменные окружения</HeadingMD>

                <div className="space-y-4">
                  <div>
                    <BodyMD className="mb-2 font-medium">
                      Создайте файл .env:
                    </BodyMD>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg relative">
                      <code className="text-sm whitespace-pre">
                        {`# .env
VITE_API_URL=http://localhost:8000
VITE_USE_DRF=true`}
                      </code>
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2"
                        onClick={() =>
                          copyToClipboard(
                            "VITE_API_URL=http://localhost:8000\nVITE_USE_DRF=true",
                          )
                        }
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <BodyMD className="mb-2 font-medium">
                      Установка Python пакетов:
                    </BodyMD>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg relative">
                      <code className="text-sm whitespace-pre">
                        {`pip install django djangorestframework
pip install djangorestframework-simplejwt
pip install django-cors-headers`}
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
                </div>
              </Card>

              <Card className="card-base p-6">
                <HeadingMD className="mb-4">2. Django настройки</HeadingMD>

                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg relative max-h-96 overflow-y-auto">
                  <pre className="text-sm">
                    {`# settings.py

# CORS settings for React frontend
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # React dev server
    "http://127.0.0.1:3000",
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
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    # ... your other middleware
]`}
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={() =>
                      copyToClipboard(`# settings.py

# CORS settings for React frontend
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # React dev server
    "http://127.0.0.1:3000",
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
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    # ... your other middleware
]`)
                    }
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </div>
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
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="card-base p-6">
                <HeadingMD className="mb-4">API Endpoints</HeadingMD>

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

          <TabsContent value="docs">
            <Card className="card-base p-6">
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

              <Alert className="mt-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Важно:</strong> В Vite используйте переменные
                  окружения с префиксом <code>VITE_</code> вместо{" "}
                  <code>REACT_APP_</code>
                </AlertDescription>
              </Alert>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
