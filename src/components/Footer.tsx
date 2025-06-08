export default function Footer() {
  return (
    <footer className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* Logo */}
          <div className="space-y-4">
            <img
              src="https://framerusercontent.com/images/Mcs1qDPkdgWKjbdQ985Mr4CXq7U.png"
              alt="Notetaker"
              className="h-12 w-auto"
            />
          </div>

          {/* Documents */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Документы</h3>
            <div className="space-y-3">
              <div>
                <a
                  href="https://notetaker.ru/oferta"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                >
                  Оферта
                </a>
              </div>
              <div>
                <a
                  href="https://notetaker.ru/terms-and-conditions"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                >
                  Пользовательское соглашение
                </a>
              </div>
              <div>
                <a
                  href="https://notetaker.ru/privacy-policy"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                >
                  Политика конфиденциальности
                </a>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 text-gray-600">
            <p>Воронин Роман Владимирович</p>
            <p>ОГРНИП 317344300099461</p>
            <p>ИНН 341002680798</p>
            <p>
              <a
                href="tel:89856219221"
                className="underline hover:text-blue-600 transition-colors"
              >
                Тел.: 89856219221
              </a>
            </p>
            <p>Почтовый адрес: Гашека 12</p>
            <p>
              <a
                href="mailto:hi@notetaker.ru"
                className="underline hover:text-blue-600 transition-colors"
                target="_blank"
                rel="noopener"
              >
                hi@notetaker.ru
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
