import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { resetDatabase, checkDatabase } from "../lib/reset-db";

export default function TestBlog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dbHealth, setDbHealth] = useState(null);

  useEffect(() => {
    loadAndTestData();
  }, []);

  const loadAndTestData = async () => {
    setLoading(true);
    setError("");

    try {
      console.log("🧪 Testing blog database...");

      // Check current database health
      const healthCheck = await checkDatabase();
      setDbHealth(healthCheck);

      if (!healthCheck.isHealthy) {
        console.log("🔄 Database needs reinitialization...");

        // Force clear and reinitialize
        localStorage.removeItem("blog_posts");
        localStorage.removeItem("blog_categories");
        localStorage.removeItem("blog_authors");

        // Import fresh database instance
        const { blogDB } = await import("../lib/database");

        // Wait for initialization
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Check health again
        const newHealthCheck = await checkDatabase();
        setDbHealth(newHealthCheck);
      }

      // Get all posts
      const { blogDB } = await import("../lib/database");
      const allPosts = await blogDB.getAllPosts();
      console.log(`📊 Database has ${allPosts.length} posts`);

      if (allPosts.length === 0) {
        setError("Database is still empty after initialization");
      } else {
        setPosts(allPosts);
        console.log("✅ Test successful - posts loaded");
      }
    } catch (err) {
      console.error("❌ Test failed:", err);
      setError(`Test failed: ${err.message}`);
    }

    setLoading(false);
  };

  const clearAndReload = () => {
    resetDatabase();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Testing database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Blog Database Test</h1>
          <div className="flex gap-4">
            <button
              onClick={loadAndTestData}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Reload & Test
            </button>
            <button
              onClick={clearAndReload}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Clear & Reload Page
            </button>
            <Link
              to="/blog"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Go to Blog
            </Link>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <strong>Error:</strong> {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Database Status: {posts.length > 0 ? "✅ Working" : "❌ Empty"}
          </h2>

          {dbHealth && (
            <div className="mb-4 p-3 bg-gray-50 rounded">
              <h3 className="font-medium mb-2">Health Check:</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>Posts: {dbHealth.posts}</div>
                <div>Categories: {dbHealth.categories}</div>
                <div>Authors: {dbHealth.authors}</div>
              </div>
              <div className="mt-2">
                Status: {dbHealth.isHealthy ? "✅ Healthy" : "❌ Needs Fix"}
              </div>
            </div>
          )}

          <div className="mb-4">
            <p className="text-lg">
              <strong>Total Posts:</strong> {posts.length}
            </p>
            <p className="text-lg">
              <strong>Published Posts:</strong>{" "}
              {posts.filter((p) => p.status === "published").length}
            </p>
          </div>

          {posts.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Sample Posts:</h3>
              <div className="space-y-2">
                {posts.slice(0, 5).map((post) => (
                  <div key={post.id} className="p-3 bg-gray-50 rounded">
                    <div className="font-medium">{post.title}</div>
                    <div className="text-sm text-gray-600">
                      Status: {post.status} | Category: {post.category} | Views:{" "}
                      {post.views}
                    </div>
                  </div>
                ))}
              </div>

              {posts.length > 5 && (
                <p className="mt-3 text-gray-600">
                  ... and {posts.length - 5} more posts
                </p>
              )}
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">
              Raw LocalStorage Data:
            </h3>
            <div className="space-y-2">
              <div>
                <strong>blog_posts:</strong>
                <span className="ml-2 text-sm">
                  {localStorage.getItem("blog_posts") ? "Present" : "Missing"}
                </span>
              </div>
              <div>
                <strong>blog_categories:</strong>
                <span className="ml-2 text-sm">
                  {localStorage.getItem("blog_categories")
                    ? "Present"
                    : "Missing"}
                </span>
              </div>
              <div>
                <strong>blog_authors:</strong>
                <span className="ml-2 text-sm">
                  {localStorage.getItem("blog_authors") ? "Present" : "Missing"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
