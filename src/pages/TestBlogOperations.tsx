import React, { useState } from "react";
import BlogAPI from "../lib/blog-api";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

export default function TestBlogOperations() {
  const [testResult, setTestResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const testCreatePost = async () => {
    setLoading(true);
    setTestResult("Testing post creation...");

    try {
      console.log("Starting test post creation");

      const testPost = {
        title: "Test Post " + Date.now(),
        content:
          "This is a test post content with more than 100 characters. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        excerpt:
          "This is a test excerpt with more than 50 characters to meet validation requirements.",
        heroImage:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
        category: "tech-ai",
        tags: ["test", "debug"],
        author: "admin",
        status: "draft" as const,
        featured: false,
        seoTitle: "",
        seoDescription: "",
        seoKeywords: [],
        slug: "",
        readTime: 0,
        tableOfContents: [],
        views: 0,
        publishedAt: "",
        updatedAt: "",
      };

      console.log("Test post data:", testPost);

      // Test validation first
      const validation = BlogAPI.validatePost(testPost);
      console.log("Validation result:", validation);

      if (!validation.valid) {
        setTestResult("Validation failed: " + validation.errors.join(", "));
        return;
      }

      // Try to create
      const result = await BlogAPI.createPost(testPost);
      console.log("Create result:", result);

      setTestResult(
        "Success! Created post: " + JSON.stringify(result, null, 2),
      );

      // Test getting all posts
      const allPosts = await BlogAPI.getAllPosts();
      console.log("All posts:", allPosts);
    } catch (error) {
      console.error("Test failed:", error);
      setTestResult("Error: " + (error.message || error));
    } finally {
      setLoading(false);
    }
  };

  const testGetPosts = async () => {
    setLoading(true);
    setTestResult("Getting all posts...");

    try {
      const posts = await BlogAPI.getAllPosts();
      console.log("Retrieved posts:", posts);
      setTestResult(
        "Found " + posts.length + " posts: " + JSON.stringify(posts, null, 2),
      );
    } catch (error) {
      console.error("Failed to get posts:", error);
      setTestResult("Error getting posts: " + (error.message || error));
    } finally {
      setLoading(false);
    }
  };

  const testCategories = async () => {
    setLoading(true);
    setTestResult("Getting all categories...");

    try {
      const categories = await BlogAPI.getAllCategories();
      console.log("Retrieved categories:", categories);
      setTestResult(
        "Found " +
          categories.length +
          " categories: " +
          JSON.stringify(categories, null, 2),
      );
    } catch (error) {
      console.error("Failed to get categories:", error);
      setTestResult("Error getting categories: " + (error.message || error));
    } finally {
      setLoading(false);
    }
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    setTestResult("LocalStorage cleared");
  };

  return (
    <div className="page-container">
      <div className="page-main max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Blog Operations Test</h1>

        <div className="space-y-4 mb-8">
          <Button onClick={testCreatePost} disabled={loading}>
            Test Create Post
          </Button>

          <Button onClick={testGetPosts} disabled={loading}>
            Test Get Posts
          </Button>

          <Button onClick={testCategories} disabled={loading}>
            Test Get Categories
          </Button>

          <Button onClick={clearLocalStorage} variant="destructive">
            Clear LocalStorage
          </Button>
        </div>

        {loading && <div className="text-blue-600">Loading...</div>}

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Test Result:</h2>
          <pre className="whitespace-pre-wrap text-sm">{testResult}</pre>
        </div>
      </div>
    </div>
  );
}
