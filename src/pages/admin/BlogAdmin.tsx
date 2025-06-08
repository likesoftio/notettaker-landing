import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Head from "../../components/SEO/Head";
import AdminLogin from "../../components/AdminLogin";
import ImageUpload from "../../components/ImageUpload";
import CategoryManager from "../../components/CategoryManager";
import RichTextEditor from "../../components/RichTextEditor";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import { Alert, AlertDescription } from "../../components/ui/alert";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Search,
  BarChart3,
  Calendar,
  User,
  Tag,
  Image as ImageIcon,
  Save,
  X,
  LogOut,
  Settings,
  Shield,
  AlertCircle,
  Folder,
} from "lucide-react";
import BlogAPI from "../../lib/blog-api";
import { useAuth } from "../../hooks/useAuth";
import {
  BlogPost,
  BlogCategory,
  BlogAuthor,
  BlogStats,
} from "../../lib/database";
import {
  DisplayLG,
  HeadingXL,
  BodyLG,
  Caption,
  HeadingMD,
  BodyMD,
} from "../../components/Typography";

export default function BlogAdmin() {
  const { user, isAuthenticated, logout, hasPermission } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [authors, setAuthors] = useState<BlogAuthor[]>([]);
  const [stats, setStats] = useState<BlogStats | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [generalErrors, setGeneralErrors] = useState<string[]>([]);

  // Form state for new/edit post
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    heroImage: "",
    category: "",
    tags: "",
    author: "",
    status: "draft" as "draft" | "published" | "archived",
    featured: false,
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [postsData, categoriesData, authorsData, statsData] =
        await Promise.all([
          BlogAPI.getAllPosts(),
          BlogAPI.getAllCategories(),
          BlogAPI.getAllAuthors(),
          BlogAPI.getBlogStats(),
        ]);

      setPosts(postsData);
      setCategories(categoriesData);
      setAuthors(authorsData);
      setStats(statsData);
    } catch (error) {
      console.error("Failed to load data:", error);
    }
    setLoading(false);
  };

  // Show login if not authenticated
  if (!isAuthenticated) {
    return (
      <HelmetProvider>
        <AdminLogin onLogin={() => window.location.reload()} />
      </HelmetProvider>
    );
  }

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "all" || post.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const validateForm = (): boolean => {
    const validation = BlogAPI.validatePost(formData);
    setValidationErrors(validation.errors);
    return validation.valid;
  };

  const handleCreatePost = async () => {
    if (!validateForm()) return;

    try {
      console.log("Creating post with formData:", formData);

      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
      const keywordsArray = formData.seoKeywords
        .split(",")
        .map((kw) => kw.trim())
        .filter(Boolean);

      const newPost = {
        ...formData,
        slug: BlogAPI.generateSlug(formData.title),
        tags: tagsArray,
        seoKeywords: keywordsArray,
        readTime: BlogAPI.calculateReadTime(formData.content),
        tableOfContents: BlogAPI.generateTableOfContents(formData.content),
      };

      console.log("Calling BlogAPI.createPost with:", newPost);
      const createdPost = await BlogAPI.createPost(newPost);
      console.log("Post created successfully:", createdPost);

      await loadData();
      setIsCreateDialogOpen(false);
      resetForm();
      setGeneralErrors([]);
    } catch (error) {
      console.error("Failed to create post:", error);
      setValidationErrors([
        `Ошибка при создании статьи: ${error.message || error}`,
      ]);
    }
  };

  const handleUpdatePost = async () => {
    if (!editingPost || !validateForm()) return;

    try {
      console.log("Updating post:", editingPost.id, "with formData:", formData);

      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
      const keywordsArray = formData.seoKeywords
        .split(",")
        .map((kw) => kw.trim())
        .filter(Boolean);

      const updates = {
        ...formData,
        slug: BlogAPI.generateSlug(formData.title),
        tags: tagsArray,
        seoKeywords: keywordsArray,
        readTime: BlogAPI.calculateReadTime(formData.content),
        tableOfContents: BlogAPI.generateTableOfContents(formData.content),
      };

      console.log("Calling BlogAPI.updatePost with:", updates);
      const updatedPost = await BlogAPI.updatePost(editingPost.id, updates);
      console.log("Post updated successfully:", updatedPost);

      await loadData();
      setEditingPost(null);
      resetForm();
      setGeneralErrors([]);
    } catch (error) {
      console.error("Failed to update post:", error);
      setValidationErrors([
        `Ошибка при обновлении статьи: ${error.message || error}`,
      ]);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm("Вы уверены, что хотите удалить эту статью?")) return;

    try {
      console.log("Deleting post:", postId);
      const result = await BlogAPI.deletePost(postId);
      console.log("Delete result:", result);

      if (result) {
        await loadData();
        setGeneralErrors([]);
      } else {
        setGeneralErrors(["Не удалось удалить статью"]);
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
      setGeneralErrors([
        `Ошибка при удалении статьи: ${error.message || error}`,
      ]);
    }
  };

  const startEditing = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      heroImage: post.heroImage,
      category: post.category,
      tags: post.tags.join(", "),
      author: post.author,
      status: post.status,
      featured: post.featured,
      seoTitle: post.seoTitle || "",
      seoDescription: post.seoDescription || "",
      seoKeywords: post.seoKeywords?.join(", ") || "",
    });
    setValidationErrors([]);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      heroImage: "",
      category: "",
      tags: "",
      author: user?.id || "",
      status: "draft",
      featured: false,
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",
    });
    setValidationErrors([]);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "published":
        return "default";
      case "draft":
        return "secondary";
      case "archived":
        return "destructive";
      default:
        return "outline";
    }
  };

  const PostForm = () => (
    <div className="space-y-6 max-h-96 overflow-y-auto">
      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <ul className="list-disc list-inside space-y-1">
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Заголовок *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Заголовок статьи"
          />
        </div>
        <div>
          <Label htmlFor="category">Категория *</Label>
          <Select
            value={formData.category}
            onValueChange={(value) =>
              setFormData({ ...formData, category: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите категорию" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="excerpt">Краткое описание *</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) =>
            setFormData({ ...formData, excerpt: e.target.value })
          }
          placeholder="Краткое описание статьи (минимум 50 символов)"
          rows={3}
        />
        <Caption className="mt-1">
          {formData.excerpt.length}/160 символов
        </Caption>
      </div>

      <div>
        <Label htmlFor="content">Содержание статьи *</Label>
        <RichTextEditor
          content={formData.content}
          onChange={(content) => setFormData({ ...formData, content })}
          placeholder="Начните писать статью... Используйте панель инструментов для форматирования."
          className="mt-2"
        />
        <Caption className="mt-2">
          Время чтения: ~{BlogAPI.calculateReadTime(formData.content)} мин
        </Caption>
      </div>

      {/* Image Upload */}
      <div>
        <ImageUpload
          label="Главное изображение"
          description="Рекомендуемый размер: 800x400px. Максимальный размер: 5MB"
          value={formData.heroImage}
          onChange={(url) => setFormData({ ...formData, heroImage: url })}
          placeholder="https://example.com/image.jpg"
          maxSize={5}
          acceptedTypes={["image/jpeg", "image/png", "image/webp"]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="tags">Теги (через запятую) *</Label>
          <Input
            id="tags"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="тег1, тег2, тег3"
          />
        </div>
        <div>
          <Label htmlFor="author">Автор *</Label>
          <Select
            value={formData.author}
            onValueChange={(value) =>
              setFormData({ ...formData, author: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите автора" />
            </SelectTrigger>
            <SelectContent>
              {authors.map((author) => (
                <SelectItem key={author.id} value={author.id}>
                  {author.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="status">Статус</Label>
          <Select
            value={formData.status}
            onValueChange={(value: any) =>
              setFormData({ ...formData, status: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Черновик</SelectItem>
              <SelectItem value="published">Опубликовано</SelectItem>
              <SelectItem value="archived">В архиве</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2 pt-6">
          <Switch
            id="featured"
            checked={formData.featured}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, featured: checked })
            }
          />
          <Label htmlFor="featured">Рекомендуемая статья</Label>
        </div>
      </div>

      {/* SEO Fields */}
      <div className="border-t pt-4">
        <HeadingMD className="mb-4">SEO настройки</HeadingMD>

        <div className="space-y-4">
          <div>
            <Label htmlFor="seoTitle">SEO заголовок</Label>
            <Input
              id="seoTitle"
              value={formData.seoTitle}
              onChange={(e) =>
                setFormData({ ...formData, seoTitle: e.target.value })
              }
              placeholder="SEO заголовок (оставьте пустым для автоматического)"
            />
            <Caption className="mt-1">
              {(formData.seoTitle || formData.title).length}/60 символов
              (рекомендуется 30-60)
            </Caption>
          </div>

          <div>
            <Label htmlFor="seoDescription">SEO описание</Label>
            <Textarea
              id="seoDescription"
              value={formData.seoDescription}
              onChange={(e) =>
                setFormData({ ...formData, seoDescription: e.target.value })
              }
              placeholder="SEO описание (оставьте пустым для автоматического)"
              rows={3}
            />
            <Caption className="mt-1">
              {(formData.seoDescription || formData.excerpt).length}/160
              символов (рекомендуется 120-160)
            </Caption>
          </div>

          <div>
            <Label htmlFor="seoKeywords">
              SEO ключевые слова (через запятую)
            </Label>
            <Input
              id="seoKeywords"
              value={formData.seoKeywords}
              onChange={(e) =>
                setFormData({ ...formData, seoKeywords: e.target.value })
              }
              placeholder="ключевое слово 1, ключевое слово 2"
            />
            <Caption className="mt-1">Рекомендуется 5-10 ключевых слов</Caption>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button
          variant="outline"
          onClick={() => {
            setIsCreateDialogOpen(false);
            setEditingPost(null);
            resetForm();
          }}
        >
          <X className="w-4 h-4 mr-2" />
          Отмена
        </Button>
        <Button onClick={editingPost ? handleUpdatePost : handleCreatePost}>
          <Save className="w-4 h-4 mr-2" />
          {editingPost ? "Обновить" : "Создать"}
        </Button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <HelmetProvider>
        <div className="page-container">
          <Head title="Загрузка админ панели..." />
          <Header />
          <div className="page-main flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <BodyLG>Загрузка...</BodyLG>
            </div>
          </div>
          <Footer />
        </div>
      </HelmetProvider>
    );
  }

  return (
    <HelmetProvider>
      <div className="page-container">
        <Head
          title="Админ панель - Управление блогом"
          description="Панель администратора для управления контентом блога mymeet.ai"
          noindex
        />

        <Header />

        <main className="page-main">
          {/* Header with user info */}
          <div className="flex items-center justify-between mb-8">
            <div className="page-header text-left mb-0">
              <DisplayLG>Управление блогом</DisplayLG>
              <BodyLG className="text-gray-600 dark:text-gray-300">
                Создавайте, редактируйте и управляйте статьями блога
              </BodyLG>
            </div>

            {/* User menu */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                {user?.avatar && (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <div>
                  <BodyMD className="font-medium">{user?.name}</BodyMD>
                  <Caption className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    {user?.role === "admin" ? "Администратор" : "Редактор"}
                  </Caption>
                </div>
              </div>

              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                Выйти
              </Button>
            </div>
          </div>

          <Tabs defaultValue="posts" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="posts">Статьи</TabsTrigger>
              <TabsTrigger value="categories">Категории</TabsTrigger>
              <TabsTrigger value="stats">Статистика</TabsTrigger>
            </TabsList>

            <TabsContent value="posts">
              {/* Filters and Actions */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Поиск статей..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Все категории" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все категории</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Все статусы" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все статусы</SelectItem>
                    <SelectItem value="published">Опубликовано</SelectItem>
                    <SelectItem value="draft">Черновики</SelectItem>
                    <SelectItem value="archived">В архиве</SelectItem>
                  </SelectContent>
                </Select>

                <Dialog
                  open={isCreateDialogOpen}
                  onOpenChange={setIsCreateDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button onClick={resetForm}>
                      <Plus className="w-4 h-4 mr-2" />
                      Новая статья
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogTitle>Создать новую статью</DialogTitle>
                    <DialogHeader></DialogHeader>
                    <PostForm />
                  </DialogContent>
                </Dialog>
              </div>

              {/* General Errors */}
              {generalErrors.length > 0 && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <ul className="list-disc list-inside space-y-1">
                      {generalErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {/* Posts List */}
              <div className="grid gap-4">
                {filteredPosts.map((post) => {
                  const category = categories.find(
                    (cat) => cat.id === post.category,
                  );
                  const author = authors.find(
                    (auth) => auth.id === post.author,
                  );

                  return (
                    <Card key={post.id} className="card-base p-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Image */}
                        <div className="w-full md:w-32 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                          {post.heroImage ? (
                            <img
                              src={post.heroImage}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-heading-md text-gray-900 dark:text-white mb-2 truncate">
                                {post.title}
                              </h3>
                              <p className="text-body-md text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                                {post.excerpt}
                              </p>

                              <div className="flex flex-wrap items-center gap-2 mb-3">
                                <Badge
                                  variant={getStatusBadgeVariant(post.status)}
                                >
                                  {post.status === "published"
                                    ? "Опубликовано"
                                    : post.status === "draft"
                                      ? "Черновик"
                                      : "В архиве"}
                                </Badge>

                                {post.featured && (
                                  <Badge variant="outline">Рекомендуемая</Badge>
                                )}

                                {category && (
                                  <Badge variant="outline">
                                    {category.name}
                                  </Badge>
                                )}
                              </div>

                              <div className="flex items-center gap-4 text-caption">
                                {author && (
                                  <div className="flex items-center gap-1">
                                    <User className="w-3 h-3" />
                                    <span>{author.name}</span>
                                  </div>
                                )}
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>
                                    {BlogAPI.formatDate(post.publishedAt)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Eye className="w-3 h-3" />
                                  <span>{post.views} просмотров</span>
                                </div>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <Button variant="outline" size="sm" asChild>
                                <Link to={`/blog/${post.slug}`} target="_blank">
                                  <Eye className="w-4 h-4" />
                                </Link>
                              </Button>

                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => startEditing(post)}
                              >
                                <Edit2 className="w-4 h-4" />
                              </Button>

                              {hasPermission("admin") && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeletePost(post.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}

                {filteredPosts.length === 0 && (
                  <div className="text-center py-12">
                    <BodyLG className="text-gray-500 dark:text-gray-400">
                      Статьи не найдены
                    </BodyLG>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="categories">
              <CategoryManager onCategoriesChange={loadData} />
            </TabsContent>

            <TabsContent value="stats">
              {stats && (
                <div className="grid-responsive-4 mb-8">
                  <Card className="card-base p-6">
                    <div className="flex items-center gap-3">
                      <BarChart3 className="w-8 h-8 text-blue-600" />
                      <div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {stats.totalPosts}
                        </div>
                        <Caption>Всего статей</Caption>
                      </div>
                    </div>
                  </Card>

                  <Card className="card-base p-6">
                    <div className="flex items-center gap-3">
                      <Eye className="w-8 h-8 text-green-600" />
                      <div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {stats.totalViews}
                        </div>
                        <Caption>Всего просмотров</Caption>
                      </div>
                    </div>
                  </Card>

                  <Card className="card-base p-6">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-8 h-8 text-purple-600" />
                      <div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {stats.publishedPosts}
                        </div>
                        <Caption>Опубликовано</Caption>
                      </div>
                    </div>
                  </Card>

                  <Card className="card-base p-6">
                    <div className="flex items-center gap-3">
                      <Folder className="w-8 h-8 text-orange-600" />
                      <div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {categories.length}
                        </div>
                        <Caption>Категорий</Caption>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Edit Dialog */}
          <Dialog
            open={!!editingPost}
            onOpenChange={(open) => !open && setEditingPost(null)}
          >
            <DialogContent className="max-w-4xl">
              <DialogTitle>Редактировать статью</DialogTitle>
              <DialogHeader></DialogHeader>
              <PostForm />
            </DialogContent>
          </Dialog>
        </main>

        <Footer />
      </div>
    </HelmetProvider>
  );
}
