import { useLanguage } from "../contexts/LanguageContext";

export default function CompanyLogos() {
  const { t } = useLanguage();

  const companies = [
    {
      name: "CDEK",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/CDEK_logo.svg/200px-CDEK_logo.svg.png",
    },
    {
      name: "Yandex",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Yandex_icon.svg/200px-Yandex_icon.svg.png",
    },
    {
      name: "Sber",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Sberbank_Logo.svg/200px-Sberbank_Logo.svg.png",
    },
    {
      name: "Samokat",
      logo: "https://samokat.ru/static/samokat-logo.svg",
    },
    {
      name: "Ozon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Ozon_logo.svg/200px-Ozon_logo.svg.png",
    },
    {
      name: "Wildberries",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Wildberries_logo.svg/200px-Wildberries_logo.svg.png",
    },
    {
      name: "VKontakte",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/VK_Compact_Logo_%282021-present%29.svg/200px-VK_Compact_Logo_%282021-present%29.svg.png",
    },
    {
      name: "Space307",
      logo: "https://space307.com/wp-content/uploads/2021/02/space307-logo-dark.png",
    },
    {
      name: "VKUSVILL",
      logo: "https://vkusvill.ru/upload/iblock/b5b/b5b0e0e0e0e0e0e0e0e0e0e0e0e0e0e0.png",
    },
    {
      name: "Юрент",
      logo: "https://urent.ru/static/images/logo.svg",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("companies.title") ||
              "Более 40 тысяч человек из разных компаний нами пользуются"}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
          {companies.map((company, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 w-full h-20"
            >
              <div className="text-xl font-bold text-gray-400 dark:text-gray-500">
                {company.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
