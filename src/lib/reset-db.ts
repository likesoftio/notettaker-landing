// Simple utility to reset and reinitialize database
export const resetDatabase = () => {
  console.log("🔄 Resetting database...");

  // Clear all blog data
  localStorage.removeItem("blog_posts");
  localStorage.removeItem("blog_categories");
  localStorage.removeItem("blog_authors");
  localStorage.removeItem("blog_settings");

  console.log("✅ Database cleared, reloading page...");

  // Reload page to trigger reinitialization
  window.location.reload();
};

// Check if database has proper data
export const checkDatabase = async () => {
  try {
    const postsData = localStorage.getItem("blog_posts");
    const categoriesData = localStorage.getItem("blog_categories");
    const authorsData = localStorage.getItem("blog_authors");

    const posts = postsData ? JSON.parse(postsData) : [];
    const categories = categoriesData ? JSON.parse(categoriesData) : [];
    const authors = authorsData ? JSON.parse(authorsData) : [];

    console.log(`📊 Database check:`, {
      posts: posts.length,
      categories: categories.length,
      authors: authors.length,
    });

    return {
      posts: posts.length,
      categories: categories.length,
      authors: authors.length,
      isHealthy:
        posts.length >= 25 && categories.length >= 6 && authors.length >= 3,
    };
  } catch (error) {
    console.error("❌ Database check failed:", error);
    return {
      posts: 0,
      categories: 0,
      authors: 0,
      isHealthy: false,
      error: error.message,
    };
  }
};
