import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <img
                src="https://framerusercontent.com/images/Mcs1qDPkdgWKjbdQ985Mr4CXq7U.png"
                alt="Notetaker"
                className="h-8 w-auto"
              />
            </a>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#howitworks"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              Как работает
            </a>
            <a
              href="#pricing"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              Сколько стоит
            </a>
            <a
              href="#blog"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              Блог
            </a>
            <a
              href="#faq"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              FAQ
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <a
                href="https://app.notetaker.ru/"
                target="_blank"
                rel="noopener"
              >
                Добавить файл
              </a>
            </Button>
            <Button size="sm" asChild>
              <a
                href="https://app.notetaker.ru/"
                target="_blank"
                rel="noopener"
              >
                Войти
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
