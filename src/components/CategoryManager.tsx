import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Alert, AlertDescription } from "./ui/alert";
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Folder,
  AlertCircle,
  Tag,
} from "lucide-react";
import { BlogCategory } from "../lib/database";
import BlogAPI from "../lib/blog-api-switcher";
import { HeadingXL, BodyMD, Caption } from "./Typography";

interface CategoryManagerProps {
  onCategoriesChange?: () => void;
}

export default function CategoryManager({
  onCategoriesChange,
}: CategoryManagerProps) {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<BlogCategory | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    color: "bg-blue-600",
    image: "",
  });

  const colorOptions = [
    { value: "bg-blue-600", label: "Синий", class: "bg-blue-600" },
    { value: "bg-green-600", label: "Зеленый", class: "bg-green-600" },
    { value: "bg-purple-600", label: "Фиолетовый", class: "bg-purple-600" },
    { value: "bg-orange-600", label: "Оранжевый", class: "bg-orange-600" },
    { value: "bg-red-600", label: "Красный", class: "bg-red-600" },
    { value: "bg-indigo-600", label: "Индиго", class: "bg-indigo-600" },
    { value: "bg-yellow-600", label: "Желтый", class: "bg-yellow-600" },
    { value: "bg-pink-600", label: "Розовый", class: "bg-pink-600" },
  ];

  useEffect(() => {
    loadCategories();
  }, []);

  // Auto-generate slug from name
  useEffect(() => {
    if (!editingCategory) {
      const slug = generateSlug(formData.name);
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.name, editingCategory]);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const categoriesData = await BlogAPI.getAllCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Failed to load categories:", error);
      setError("Ошибка при загрузке категорий");
    }
    setLoading(false);
  };

  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-zа-я0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError("Название категории обязательно");
      return false;
    }

    if (!formData.slug.trim()) {
      setError("Slug категории обязателен");
      return false;
    }

    // Check for duplicate slug
    const existingCategory = categories.find(
      (cat) => cat.slug === formData.slug && cat.id !== editingCategory?.id,
    );

    if (existingCategory) {
      setError("Категория с таким slug уже существует");
      return false;
    }

    setError("");
    return true;
  };

  const handleCreateCategory = async () => {
    if (!validateForm()) return;

    try {
      await BlogAPI.createCategory({
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        color: formData.color,
      });

      await loadCategories();
      onCategoriesChange?.();
      setIsCreateDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Failed to create category:", error);
      setError("Ошибка при создании категории");
    }
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory || !validateForm()) return;

    try {
      await BlogAPI.updateCategory(editingCategory.id, {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        color: formData.color,
      });

      await loadCategories();
      onCategoriesChange?.();
      setEditingCategory(null);
      resetForm();
    } catch (error) {
      console.error("Failed to update category:", error);
      setError("Ошибка при обновлении категории");
    }
  };

  const handleDeleteCategory = async (
    categoryId: string,
    categoryName: string,
  ) => {
    if (!confirm(`Вы уверены, что хотите удалить категорию "${categoryName}"?`))
      return;

    try {
      await BlogAPI.deleteCategory(categoryId);
      loadCategories();
    } catch (error) {
      console.error("Failed to delete category:", error);
      setError(error.message || "Ошибка при удалении категории");
    }
  };

  const startEditing = (category: BlogCategory) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || "",
      color: category.color || "bg-blue-600",
      image: category.image || "",
    });
    setError("");
  };

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
      color: "bg-blue-600",
      image: "",
    });
    setError("");
  };

  const CategoryForm = () => (
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="categoryName">Название *</Label>
          <Input
            id="categoryName"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Назван��е категории"
          />
        </div>
        <div>
          <Label htmlFor="categorySlug">Slug *</Label>
          <Input
            id="categorySlug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="category-slug"
          />
          <Caption className="mt-1">
            Автоматически генерируется из названия
          </Caption>
        </div>
      </div>

      <div>
        <Label htmlFor="categoryDescription">Описание</Label>
        <Textarea
          id="categoryDescription"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Описание категории (необязательно)"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="categoryImage">Изображение категории (URL)</Label>
        <Input
          id="categoryImage"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="https://example.com/image.jpg"
          type="url"
        />
        <Caption className="mt-1">
          Введите URL изображения для категории (необязательно)
        </Caption>
        {formData.image && (
          <div className="mt-3">
            <Label>Предварительный просмотр:</Label>
            <div className="mt-2 w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
              <img
                src={formData.image}
                alt="Предварительный просмотр"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div>
        <Label>Цвет категории</Label>
        <div className="grid grid-cols-4 gap-2 mt-2">
          {colorOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFormData({ ...formData, color: option.value })}
              className={`p-3 rounded-lg border-2 transition-all ${
                formData.color === option.value
                  ? "border-blue-500 ring-2 ring-blue-200"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className={`w-full h-6 rounded ${option.class}`}></div>
              <span className="text-xs mt-1 block">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button
          variant="outline"
          onClick={() => {
            setIsCreateDialogOpen(false);
            setEditingCategory(null);
            resetForm();
          }}
        >
          <X className="w-4 h-4 mr-2" />
          Отмена
        </Button>
        <Button
          onClick={
            editingCategory ? handleUpdateCategory : handleCreateCategory
          }
        >
          <Save className="w-4 h-4 mr-2" />
          {editingCategory ? "Обновить" : "Создать"}
        </Button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <BodyMD>Загрузка категорий...</BodyMD>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <HeadingXL>Управление категориями</HeadingXL>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Новая категория
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogTitle>Создать новую категорию</DialogTitle>
            <DialogHeader></DialogHeader>
            <CategoryForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Categories List */}
      <div className="grid gap-4">
        {categories.map((category) => (
          <Card key={category.id} className="card-base p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Image or color indicator */}
                {category.image ? (
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement!.innerHTML = `<div class="${category.color} w-full h-full rounded-lg"></div>`;
                      }}
                    />
                  </div>
                ) : (
                  <div
                    className={`w-4 h-4 rounded-full ${category.color}`}
                  ></div>
                )}

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-heading-md text-gray-900 dark:text-white">
                      {category.name}
                    </h3>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Folder className="w-3 h-3" />
                      {category.postCount}{" "}
                      {category.postCount === 1 ? "статья" : "статей"}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 mb-2">
                    <Caption className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      /{category.slug}
                    </Caption>
                  </div>

                  {category.description && (
                    <BodyMD className="text-gray-600 dark:text-gray-300">
                      {category.description}
                    </BodyMD>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => startEditing(category)}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleDeleteCategory(category.id, category.name)
                  }
                  disabled={category.postCount > 0}
                  className={
                    category.postCount > 0
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {categories.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Tag className="w-8 h-8 text-gray-400" />
            </div>
            <BodyMD className="text-gray-500 dark:text-gray-400 mb-4">
              Пока нет категорий
            </BodyMD>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Создать первую категорию
            </Button>
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog
        open={!!editingCategory}
        onOpenChange={(open) => !open && setEditingCategory(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogTitle>Редактировать категорию</DialogTitle>
          <DialogHeader></DialogHeader>
          <CategoryForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
