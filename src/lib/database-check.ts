// Utility to check and ensure database has data
import blogDB from "./database";

export const ensureDatabaseHasData = async () => {
  try {
    console.log("Checking database for posts...");

    const posts = await blogDB.getAllPosts();
    const categories = await blogDB.getAllCategories();

    console.log(
      `Found ${posts.length} posts and ${categories.length} categories`,
    );

    if (posts.length === 0) {
      console.log("No posts found, reinitializing database...");
      // Force reinitialization
      localStorage.removeItem("blog_posts");
      localStorage.removeItem("blog_categories");
      localStorage.removeItem("blog_authors");

      // Create new instance to force reinitialization
      const newDB = new (blogDB.constructor as any)();
      return newDB;
    }

    return blogDB;
  } catch (error) {
    console.error("Database check failed:", error);
    return blogDB;
  }
};

// Debug function to check localStorage content
export const debugLocalStorage = () => {
  console.log("=== LocalStorage Debug ===");
  console.log("Posts:", localStorage.getItem("blog_posts"));
  console.log("Categories:", localStorage.getItem("blog_categories"));
  console.log("Authors:", localStorage.getItem("blog_authors"));
  console.log("========================");
};

// Function to manually clear and reinitialize database
export const resetDatabase = () => {
  console.log("Resetting database...");
  localStorage.removeItem("blog_posts");
  localStorage.removeItem("blog_categories");
  localStorage.removeItem("blog_authors");

  // Force browser refresh to reinitialize
  window.location.reload();
};
