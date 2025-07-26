import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Shield,
  AlertCircle,
  Info,
} from "lucide-react";
import authService from "../lib/auth";
import { DisplayMD, BodyLG, BodyMD, Caption } from "./Typography";

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await authService.login(
        formData.username,
        formData.password,
      );

      if (result.success) {
        onLogin();
      } else {
        setError(result.error || "Ошибка авторизации");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Произошла ошибка при входе в систему");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (username: string, password: string) => {
    setFormData({ username, password });
  };

  const demoCredentials = authService.getDemoCredentials();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
            <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <DisplayMD className="mb-2">Панель администратора</DisplayMD>
          <BodyMD className="text-gray-600 dark:text-gray-400">
            Войдите в систему для управления контентом
          </BodyMD>
        </div>

        <Tabs defaultValue="login" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="demo">Демо доступы</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <Card className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username Field */}
                <div className="space-y-2">
                  <Label htmlFor="username">Имя пользователя</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Введите имя пользователя"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                      className="pl-10"
                      required
                      autoComplete="username"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password">Пароль</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Введите пароль"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="pl-10 pr-10"
                      required
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={
                    isLoading || !formData.username || !formData.password
                  }
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Вход...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4 mr-2" />
                      Войти
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="demo" className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Для демонстрации используйте один из предустановленных аккаунтов
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              {demoCredentials.map((cred, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-gray-400" />
                        <BodyMD className="font-medium">{cred.role}</BodyMD>
                      </div>
                      <Caption className="mb-2">{cred.description}</Caption>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Caption>Логин:</Caption>
                          <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                            {cred.username}
                          </code>
                        </div>
                        <div className="flex items-center gap-2">
                          <Caption>Пароль:</Caption>
                          <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                            {cred.password}
                          </code>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleDemoLogin(cred.username, cred.password)
                      }
                    >
                      Использовать
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <BodyMD className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                    Демо режим
                  </BodyMD>
                  <Caption className="text-blue-700 dark:text-blue-300">
                    В демо режиме используется localStorage для хранения данных.
                    В реальном приложении используйте защищенную аутентификацию
                    и базу данных.
                  </Caption>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Security Notice */}
        <Card className="p-4 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div>
              <BodyMD className="font-medium text-amber-900 dark:text-amber-100 mb-1">
                Безопасность
              </BodyMD>
              <Caption className="text-amber-700 dark:text-amber-300">
                Это демонстрационная версия. В продакшене используйте надежные
                пароли и двухфакторную аутентификацию.
              </Caption>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
