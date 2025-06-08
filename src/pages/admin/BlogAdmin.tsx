import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
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
} from "lucide-react";
import BlogAPI from "../../lib/blog-api";
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
} from "../../components/Typography";

export default function BlogAdmin() {
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
    loadData();
  }, []);

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

  const handleCreatePost = async () => {
    try {
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

      await BlogAPI.createPost(newPost);
      await loadData();
      setIsCreateDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  const handleUpdatePost = async () => {
    if (!editingPost) return;

    try {
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

      await BlogAPI.updatePost(editingPost.id, updates);
      await loadData();
      setEditingPost(null);
      resetForm();
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm("Вы уверены, что хотите удалить эту статью?")) return;

    try {
      await BlogAPI.deletePost(postId);
      await loadData();
    } catch (error) {
      console.error("Failed to delete post:", error);
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
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      heroImage: "",
      category: "",
      tags: "",
      author: "",
      status: "draft",
      featured: false,
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",
    });
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Заголовок</Label>
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
          <Label htmlFor="category">Категория</Label>
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
        <Label htmlFor="excerpt">Краткое описание</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) =>
            setFormData({ ...formData, excerpt: e.target.value })
          }
          placeholder="Краткое описание статьи"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="content">Содержание</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          placeholder="HTML содержание статьи"
          rows={10}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="heroImage">URL изображения</Label>
          <Input
            id="heroImage"
            value={formData.heroImage}
            onChange={(e) =>
              setFormData({ ...formData, heroImage: e.target.value })
            }
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <div>
          <Label htmlFor="author">Автор</Label>
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
          <Label htmlFor="tags">Теги (через запятую)</Label>
          <Input
            id="tags"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="тег1, тег2, тег3"
          />
        </div>
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
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="featured"
          checked={formData.featured}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, featured: checked })
          }
        />
        <Label htmlFor="featured">Рекомендуемая статья</Label>
      </div>

      {/* SEO Fields */}
      <div className="border-t pt-4">
        <HeadingXL className="mb-4">SEO настройки</HeadingXL>

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
      <div className="page-container">
        <Header />
        <div className="page-main flex items-center justify-center">
          <div className="text-center">
            <BodyLG>Загрузка...</BodyLG>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-container">
      <Header />

      <main className="page-main">
        <div className="page-header">
          <DisplayLG>Управление блогом</DisplayLG>
          <BodyLG className="page-subtitle">
            Создавайте, редактируйте и управляйте статьями блога
          </BodyLG>
        </div>

        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="posts">Статьи</TabsTrigger>
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

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
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
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Новая статья
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>Создать новую статью</DialogTitle>
                  </DialogHeader>
                  <PostForm />
                </DialogContent>
              </Dialog>
            </div>

            {/* Posts List */}
            <div className="grid gap-4">
              {filteredPosts.map((post) => {
                const category = categories.find(
                  (cat) => cat.id === post.category,
                );
                const author = authors.find((auth) => auth.id === post.author);

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
                                <Badge variant="outline">{category.name}</Badge>
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

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeletePost(post.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
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
                    <Edit2 className="w-8 h-8 text-orange-600" />
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stats.draftPosts}
                      </div>
                      <Caption>Черновиков</Caption>
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
            <DialogHeader>
              <DialogTitle>Редактировать статью</DialogTitle>
            </DialogHeader>
            <PostForm />
          </DialogContent>
        </Dialog>
      </main>

      <Footer />
    </div>
  );
}
