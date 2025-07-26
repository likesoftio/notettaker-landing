import React, { useCallback, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import CharacterCount from "@tiptap/extension-character-count";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Image as ImageIcon,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Type,
  Heading1,
  Heading2,
  Heading3,
  FileText,
  Upload,
} from "lucide-react";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

const templates = [
  {
    name: "Обзор продукта",
    content: `<h2>Что это такое?</h2>
<p>Краткое описание продукта и его основного назначения.</p>

<h2>Основные возможности</h2>
<ul>
<li>Возможность 1 - описание</li>
<li>Возможность 2 - описание</li>
<li>Возможность 3 - описание</li>
</ul>

<h2>Преимущества</h2>
<p>Объясните, какие проблемы решает продукт.</p>

<h2>Как начать использовать</h2>
<ol>
<li>Шаг 1</li>
<li>Шаг 2</li>
<li>Шаг 3</li>
</ol>

<h2>Заключение</h2>
<p>Подведите итоги и призовите к действию.</p>`,
  },
  {
    name: "Пошаговое руководство",
    content: `<h2>Что вы узнаете</h2>
<p>Краткое описание того, чему научится читатель.</p>

<h2>Что понадобится</h2>
<ul>
<li>Требование 1</li>
<li>Требование 2</li>
<li>Требование 3</li>
</ul>

<h2>Шаг 1: Подготовка</h2>
<p>Подробное описание первого шага.</p>

<h2>Шаг 2: Основная часть</h2>
<p>Подробное описание второго шага.</p>

<h2>Шаг 3: Завершение</h2>
<p>Подробное описание финального шага.</p>

<h2>Что дальше?</h2>
<p>Дополнительные рекомендации и следующие шаги.</p>`,
  },
  {
    name: "Новости и обновления",
    content: `<h2>Что нового?</h2>
<p>Краткий обзор основных изменений или новостей.</p>

<h2>Ключевые изменения</h2>
<ul>
<li><strong>Новое:</strong> Описание нововведения</li>
<li><strong>Улучшено:</strong> Описание улучшения</li>
<li><strong>Исправлено:</strong> Описание исправления</li>
</ul>

<h2>Как это влияет на вас</h2>
<p>Объясните, как изменения повлияют на пользователей.</p>

<h2>Что нужно сделать</h2>
<p>Инструкции для пользователей (если требуются действия).</p>`,
  },
];

export default function RichTextEditor({
  content,
  onChange,
  placeholder = "Начните писать статью...",
  className = "",
}: RichTextEditorProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class:
            "rounded-lg max-w-full h-auto my-4 shadow-md hover:shadow-lg transition-shadow",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class:
            "text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      CharacterCount,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-lg max-w-none focus:outline-none min-h-[400px] p-6",
      },
      handleDrop: (view, event, slice, moved) => {
        const files = Array.from(event.dataTransfer?.files || []);
        if (files.length > 0) {
          event.preventDefault();
          files.forEach((file) => {
            if (file.type.startsWith("image/")) {
              const reader = new FileReader();
              reader.onload = (e) => {
                const src = e.target?.result as string;
                if (src) {
                  editor
                    ?.chain()
                    .focus()
                    .setImage({ src, alt: file.name })
                    .run();
                }
              };
              reader.readAsDataURL(file);
            }
          });
          return true;
        }
        return false;
      },
      handlePaste: (view, event, slice) => {
        const files = Array.from(event.clipboardData?.files || []);
        if (files.length > 0) {
          event.preventDefault();
          files.forEach((file) => {
            if (file.type.startsWith("image/")) {
              const reader = new FileReader();
              reader.onload = (e) => {
                const src = e.target?.result as string;
                if (src) {
                  editor
                    ?.chain()
                    .focus()
                    .setImage({ src, alt: "Вставленное изображение" })
                    .run();
                }
              };
              reader.readAsDataURL(file);
            }
          });
          return true;
        }
        return false;
      },
    },
  });

  const addImage = useCallback(() => {
    if (imageUrl && editor) {
      editor
        .chain()
        .focus()
        .setImage({
          src: imageUrl,
          alt: imageAlt || "Изображение статьи",
        })
        .run();
      setImageUrl("");
      setImageAlt("");
      setIsImageDialogOpen(false);
    }
  }, [editor, imageUrl, imageAlt]);

  const addLink = useCallback(() => {
    if (linkUrl && editor) {
      if (linkText) {
        editor
          .chain()
          .focus()
          .insertContent(`<a href="${linkUrl}">${linkText}</a>`)
          .run();
      } else {
        editor.chain().focus().setLink({ href: linkUrl }).run();
      }
      setLinkUrl("");
      setLinkText("");
      setIsLinkDialogOpen(false);
    }
  }, [editor, linkUrl, linkText]);

  const insertTemplate = useCallback(
    (template: (typeof templates)[0]) => {
      if (editor) {
        editor.chain().focus().setContent(template.content).run();
      }
    },
    [editor],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  if (!editor) {
    return (
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded"></div>
        </div>
        <p className="mt-4 text-gray-500 dark:text-gray-400">
          Загрузка редактора...
        </p>
      </div>
    );
  }

  return (
    <div
      className={`border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden ${className}`}
    >
      {/* Toolbar */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-800">
        <div className="flex flex-wrap items-center gap-1">
          {/* Templates */}
          <div className="flex items-center gap-1 pr-2 border-r border-gray-300 dark:border-gray-600">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" title="Шаблоны статей">
                  <FileText className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {templates.map((template) => (
                  <DropdownMenuItem
                    key={template.name}
                    onClick={() => insertTemplate(template)}
                    className="cursor-pointer"
                  >
                    {template.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Text Formatting */}
          <div className="flex items-center gap-1 pr-2 border-r border-gray-300 dark:border-gray-600">
            <Button
              variant={editor.isActive("bold") ? "default" : "ghost"}
              size="sm"
              onClick={() => editor.chain().focus().toggleBold().run()}
              title="Жирный (Ctrl+B)"
            >
              <Bold className="w-4 h-4" />
            </Button>
            <Button
              variant={editor.isActive("italic") ? "default" : "ghost"}
              size="sm"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              title="Курсив (Ctrl+I)"
            >
              <Italic className="w-4 h-4" />
            </Button>
            <Button
              variant={editor.isActive("underline") ? "default" : "ghost"}
              size="sm"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              title="Подчеркивание (Ctrl+U)"
            >
              <UnderlineIcon className="w-4 h-4" />
            </Button>
            <Button
              variant={editor.isActive("strike") ? "default" : "ghost"}
              size="sm"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              title="Зачеркивание"
            >
              <Strikethrough className="w-4 h-4" />
            </Button>
          </div>

          {/* Headings */}
          <div className="flex items-center gap-1 pr-2 border-r border-gray-300 dark:border-gray-600">
            <Button
              variant={editor.isActive("paragraph") ? "default" : "ghost"}
              size="sm"
              onClick={() => editor.chain().focus().setParagraph().run()}
              title="Обычный текст"
            >
              <Type className="w-4 h-4" />
            </Button>
            <Button
              variant={
                editor.isActive("heading", { level: 1 }) ? "default" : "ghost"
              }
              size="sm"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              title="Заголовок 1"
            >
              <Heading1 className="w-4 h-4" />
            </Button>
            <Button
              variant={
                editor.isActive("heading", { level: 2 }) ? "default" : "ghost"
              }
              size="sm"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              title="Заголовок 2"
            >
              <Heading2 className="w-4 h-4" />
            </Button>
            <Button
              variant={
                editor.isActive("heading", { level: 3 }) ? "default" : "ghost"
              }
              size="sm"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              title="Заголовок 3"
            >
              <Heading3 className="w-4 h-4" />
            </Button>
          </div>

          {/* Lists */}
          <div className="flex items-center gap-1 pr-2 border-r border-gray-300 dark:border-gray-600">
            <Button
              variant={editor.isActive("bulletList") ? "default" : "ghost"}
              size="sm"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              title="Маркированный список"
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant={editor.isActive("orderedList") ? "default" : "ghost"}
              size="sm"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              title="Нумерованный список"
            >
              <ListOrdered className="w-4 h-4" />
            </Button>
            <Button
              variant={editor.isActive("blockquote") ? "default" : "ghost"}
              size="sm"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              title="Цитата"
            >
              <Quote className="w-4 h-4" />
            </Button>
          </div>

          {/* Alignment */}
          <div className="flex items-center gap-1 pr-2 border-r border-gray-300 dark:border-gray-600">
            <Button
              variant={
                editor.isActive({ textAlign: "left" }) ? "default" : "ghost"
              }
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              title="По левому краю"
            >
              <AlignLeft className="w-4 h-4" />
            </Button>
            <Button
              variant={
                editor.isActive({ textAlign: "center" }) ? "default" : "ghost"
              }
              size="sm"
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              title="По центру"
            >
              <AlignCenter className="w-4 h-4" />
            </Button>
            <Button
              variant={
                editor.isActive({ textAlign: "right" }) ? "default" : "ghost"
              }
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              title="По правому краю"
            >
              <AlignRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Media */}
          <div className="flex items-center gap-1 pr-2 border-r border-gray-300 dark:border-gray-600">
            <Dialog
              open={isImageDialogOpen}
              onOpenChange={setIsImageDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" title="Вставить изображение">
                  <ImageIcon className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Добавить изображение</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Перетащите изображение сюда или вставьте URL ниже
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="imageUrl">URL изображения</Label>
                    <Input
                      id="imageUrl"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="imageAlt">Описание изображения</Label>
                    <Input
                      id="imageAlt"
                      value={imageAlt}
                      onChange={(e) => setImageAlt(e.target.value)}
                      placeholder="Описание для SEO и доступности"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsImageDialogOpen(false)}
                    >
                      Отмена
                    </Button>
                    <Button onClick={addImage} disabled={!imageUrl}>
                      Добавить
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" title="Добавить ссылку">
                  <LinkIcon className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Добавить ссылку</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="linkUrl">URL ссылки</Label>
                    <Input
                      id="linkUrl"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                      placeholder="https://example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkText">Текст ссылки (опционально)</Label>
                    <Input
                      id="linkText"
                      value={linkText}
                      onChange={(e) => setLinkText(e.target.value)}
                      placeholder="Оставьте пустым для использования выделенного текста"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsLinkDialogOpen(false)}
                    >
                      Отмена
                    </Button>
                    <Button onClick={addLink} disabled={!linkUrl}>
                      Добавить
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Undo/Redo */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              title="Отменить (Ctrl+Z)"
            >
              <Undo className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              title="Повторить (Ctrl+Y)"
            >
              <Redo className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div
        className={`bg-white dark:bg-gray-900 relative ${isDragging ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isDragging && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-blue-50/90 dark:bg-blue-900/50 border-2 border-dashed border-blue-400">
            <div className="text-center">
              <Upload className="w-12 h-12 mx-auto mb-2 text-blue-600" />
              <p className="text-lg font-medium text-blue-600">
                Отпустите, чтобы вставить изображение
              </p>
            </div>
          </div>
        )}
        <EditorContent editor={editor} />
      </div>

      {/* Footer with stats */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-800">
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <div>
            Символов: {editor.storage.characterCount?.characters() || 0} | Слов:{" "}
            {editor.storage.characterCount?.words() || 0}
          </div>
          <div className="text-xs hidden sm:block">
            💡 Совет: Перетащите изображения прямо в текст или используйте
            Ctrl+V для вставки
          </div>
        </div>
      </div>
    </div>
  );
}
