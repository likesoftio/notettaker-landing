import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Alert, AlertDescription } from "../components/ui/alert";
import BlogAPI from "../lib/blog-api";
import { debugLocalStorage, resetDatabase } from "../lib/database-check";
import {
  refreshBlogDatabase,
  autoRefreshIfNeeded,
} from "../lib/refresh-database";
import { BlogPost, BlogCategory } from "../lib/database";

export default function DebugBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshStatus, setRefreshStatus] = useState<string>("");

  useEffect(() => {
    // Auto-refresh if needed on page load
    handleAutoRefresh();
    debugLocalStorage();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [postsData, categoriesData] = await Promise.all([
        BlogAPI.getAllPosts(),
        BlogAPI.getAllCategories(),
      ]);

      setPosts(postsData);
      setCategories(categoriesData);

      console.log("Debug - Posts loaded:", postsData.length);
      console.log("Debug - Categories loaded:", categoriesData.length);

      setRefreshStatus(
        `✅ Loaded ${postsData.length} posts and ${categoriesData.length} categories`,
      );
    } catch (error) {
      console.error("Debug - Failed to load data:", error);
      setRefreshStatus("❌ Failed to load data");
    }
    setLoading(false);
  };

  const handleRefreshDatabase = async () => {
    setLoading(true);
    setRefreshStatus("🔄 Refreshing database...");

    const result = await refreshBlogDatabase();

    if (result.success) {
      setRefreshStatus(
        `✅ Database refreshed! Now have ${result.postsCount} posts`,
      );
      await loadData();
    } else {
      setRefreshStatus(`❌ Refresh failed: ${result.error}`);
    }
    setLoading(false);
  };

  const handleAutoRefresh = async () => {
    setLoading(true);
    setRefreshStatus("🔍 Checking if refresh needed...");

    const result = await autoRefreshIfNeeded();

    if (result.success) {
      setRefreshStatus(
        result.message ||
          `✅ Auto-refresh completed! ${result.postsCount} posts`,
      );
      if (result.postsCount !== posts.length) {
        await loadData();
      }
    } else {
      setRefreshStatus(`❌ Auto-refresh failed: ${result.error}`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Debug Blog Database</h1>

        <div className="grid gap-6">
          {/* Actions */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <Button onClick={loadData} disabled={loading}>
                {loading ? "Loading..." : "Reload Data"}
              </Button>
              <Button
                onClick={handleAutoRefresh}
                disabled={loading}
                variant="outline"
              >
                Auto Refresh
              </Button>
              <Button onClick={handleRefreshDatabase} disabled={loading}>
                Force Refresh
              </Button>
              <Button onClick={debugLocalStorage} variant="outline">
                Debug Storage
              </Button>
              <Button onClick={resetDatabase} variant="destructive">
                Reset Database
              </Button>
            </div>

            {refreshStatus && (
              <Alert className="mt-4">
                <AlertDescription>{refreshStatus}</AlertDescription>
              </Alert>
            )}
          </Card>

          {/* Posts Stats */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Posts Statistics</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {posts.length}
                </div>
                <div className="text-sm text-gray-600">Total Posts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {posts.filter((p) => p.status === "published").length}
                </div>
                <div className="text-sm text-gray-600">Published</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {categories.length}
                </div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
            </div>
          </Card>

          {/* Posts List */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Posts List</h2>
            {posts.length === 0 ? (
              <p className="text-gray-500">No posts found</p>
            ) : (
              <div className="space-y-2">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded"
                  >
                    <div>
                      <div className="font-medium">{post.title}</div>
                      <div className="text-sm text-gray-600">
                        {post.status} | {post.category} | {post.views} views
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Categories List */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Categories List</h2>
            {categories.length === 0 ? (
              <p className="text-gray-500">No categories found</p>
            ) : (
              <div className="space-y-2">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded"
                  >
                    <div>
                      <div className="font-medium">{category.name}</div>
                      <div className="text-sm text-gray-600">
                        {category.slug}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {category.postCount} posts
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* LocalStorage Raw Data */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              LocalStorage Raw Data
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Posts Data:</h3>
                <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-32">
                  {localStorage.getItem("blog_posts") || "No data"}
                </pre>
              </div>
              <div>
                <h3 className="font-medium mb-2">Categories Data:</h3>
                <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-32">
                  {localStorage.getItem("blog_categories") || "No data"}
                </pre>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
