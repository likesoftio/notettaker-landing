// Utility to refresh database with new articles
import blogDB from "./database";

export const refreshBlogDatabase = async () => {
  try {
    console.log("🔄 Refreshing blog database with new articles...");

    // Clear existing data
    localStorage.removeItem("blog_posts");
    localStorage.removeItem("blog_categories");
    localStorage.removeItem("blog_authors");

    // Force reinitialization by creating new instance
    const refreshedDB = new (blogDB.constructor as any)();

    // Verify new data
    const posts = await refreshedDB.getAllPosts();
    const categories = await refreshedDB.getAllCategories();

    console.log(`✅ Database refreshed successfully!`);
    console.log(`📝 Total posts: ${posts.length}`);
    console.log(`📂 Total categories: ${categories.length}`);

    // Update category post counts
    await refreshedDB.updateCategoryPostCount();

    return {
      success: true,
      postsCount: posts.length,
      categoriesCount: categories.length,
    };
  } catch (error) {
    console.error("❌ Failed to refresh database:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Auto-refresh function that can be called from anywhere
export const autoRefreshIfNeeded = async () => {
  const posts = await blogDB.getAllPosts();

  // If we have less than 25 posts, refresh
  if (posts.length < 25) {
    console.log(`📊 Found ${posts.length} posts, refreshing to get all 25...`);
    return await refreshBlogDatabase();
  }

  return {
    success: true,
    postsCount: posts.length,
    message: "Database already up to date",
  };
};
