import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Search } from "lucide-react";

const categories = [
  { name: "Последние статьи", count: 12, active: true },
  { name: "Технологии и ИИ", count: 8 },
  { name: "Управление задачами", count: 5 },
  { name: "Новости продукта", count: 3 },
  { name: "Советы по встречам", count: 7 },
  { name: "Истории клиентов", count: 4 },
  { name: "Искусство продаж", count: 6 },
];

const blogPosts = [
  {
    id: 1,
    title: "9 лучших расширений Chrome для преобразования речи в текст",
    category: "Технологии и ИИ",
    description:
      "Обзор самых эффективных браузерных расширений для транскрипции аудио в реальном времени",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop",
    featured: true,
    color: "bg-blue-600",
  },
  {
    id: 2,
    title: "Как извлечь максимум из видео: транскрибация, перевод, конспекты",
    category: "Технологии и ИИ",
    description:
      "Полное руководство по работе с видеоконтентом и его трансформации в полезные материалы",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=500&h=300&fit=crop",
    featured: true,
    color: "bg-gray-600",
  },
  {
    id: 3,
    title: "Как перевести видео: 7 лучших способов для разных языков",
    category: "Технологии и ИИ",
    description:
      "Сравнение методов локализации видеоконтента и выбор оптимального решения",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=500&h=300&fit=crop",
    featured: true,
    color: "bg-blue-100",
  },
  {
    id: 4,
    title: "Как найти свой стиль модерации: личный бренд ведущего встреч",
    category: "Советы по встречам",
    description:
      "Развитие уникального подхода к проведению онлайн и офлайн мероприятий",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&h=300&fit=crop",
    featured: false,
    color: "bg-gray-200",
  },
  {
    id: 5,
    title: "Игровые механики для вовлечения участников в онлайн-встречи",
    category: "Советы по встречам",
    description:
      "Эффективные техники геймификации для повышения активности на виртуальных совещаниях",
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a814c963?w=500&h=300&fit=crop",
    featured: false,
    color: "bg-gray-800",
  },
  {
    id: 6,
    title: "Культура встреч в разных странах: особенности деловых переговоров",
    category: "Советы по встречам",
    description:
      "Международная специфика организации и проведения деловых встреч",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=500&h=300&fit=crop",
    featured: false,
    color: "bg-purple-100",
  },
];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Последние статьи");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "Последние статьи" ||
      post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Статьи и обновления
              </h1>
              <p className="text-gray-600 leading-relaxed mb-6">
                Советы по эффективным встречам, ИИ-технологии и новости продукта
              </p>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Поиск"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Последние статьи</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedCategory === category.name
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{category.name}</span>
                      <span className="text-xs text-gray-400">
                        {category.count}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {selectedCategory}
              </h2>
              {filteredPosts.length > 0 && (
                <p className="text-gray-600">
                  {filteredPosts.length}{" "}
                  {filteredPosts.length === 1 ? "статья" : "статей"}
                </p>
              )}
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  className={`group cursor-pointer overflow-hidden hover:shadow-lg transition-shadow ${
                    post.featured ? "md:col-span-2" : ""
                  }`}
                >
                  <div className="relative overflow-hidden">
                    <div
                      className={`${post.color} h-48 ${post.featured ? "md:h-64" : ""} relative`}
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="inline-block bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>

                      {/* Notetaker Logo */}
                      <div className="absolute top-4 right-4">
                        <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <img
                            src="https://framerusercontent.com/images/Mcs1qDPkdgWKjbdQ985Mr4CXq7U.png"
                            alt="N"
                            className="w-6 h-3 object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3
                      className={`font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors ${
                        post.featured ? "text-xl md:text-2xl" : "text-lg"
                      }`}
                    >
                      {post.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Статьи не найдены. Попробуйте изменить критерии поиска.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
