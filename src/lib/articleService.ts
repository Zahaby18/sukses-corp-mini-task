import { v4 as uuidv4 } from "uuid";
import { Article, ArticleFormData } from "@/types/article";

const STORAGE_KEY = "simple-blog-articles";

// helper: cek apakah kita di browser (bukan server)
const isBrowser = () => typeof window !== "undefined";

// query semua artikel dari localStorage
export function getAllArticles(): Article[] {
  if (!isBrowser()) return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as Article[];
  } catch (error) {
    console.error("Error reading articles:", error);
    return [];
  }
}

// query satu artikel berdasarkan ID
export function getArticleById(id: string): Article | null {
  const articles = getAllArticles();
  return articles.find((article) => article.id === id) || null;
}

// buat artikel baru
export function createArticle(data: ArticleFormData): Article {
  const articles = getAllArticles();
  const now = new Date().toISOString();

  const newArticle: Article = {
    id: uuidv4(),
    title: data.title,
    content: data.content,
    createdAt: now,
    updatedAt: now,
  };

  articles.unshift(newArticle); // tambah di paling atas (terbaru duluan)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));

  return newArticle;
}

// update existing artikel
export function updateArticle(
  id: string,
  data: ArticleFormData
): Article | null {
  const articles = getAllArticles();
  const index = articles.findIndex((article) => article.id === id);

  if (index === -1) return null;

  const updated: Article = {
    ...articles[index],
    title: data.title,
    content: data.content,
    updatedAt: new Date().toISOString(),
  };

  articles[index] = updated;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));

  return updated;
}

// delete artikel
export function deleteArticle(id: string): boolean {
  const articles = getAllArticles();
  const filtered = articles.filter((article) => article.id !== id);

  if (filtered.length === articles.length) return false; // tidak ada yang dihapus

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
}

// seed data dummy (testing only)
export function seedDummyArticles(): void {
  if (!isBrowser()) return;

  const existing = getAllArticles();
  if (existing.length > 0) return; // sudah ada data, skip seed

  const now = new Date().toISOString();
  const dummyArticles: Article[] = [
    {
      id: uuidv4(),
      title: "Getting Started with Next.js",
      content:
        "Next.js is a powerful React framework that makes building web applications easier. It provides features like server-side rendering, automatic routing, and built-in optimization. Whether you're building a simple blog or a complex e-commerce site, Next.js has you covered.",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: uuidv4(),
      title: "Getting Started with TypeScript",
      content:
        "TypeScript adds static typing to JavaScript, helping you catch errors early and write more maintainable code. With TypeScript, your IDE can provide better autocomplete, refactoring tools, and inline documentation. Once you try it, going back to plain JavaScript feels limiting.",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: uuidv4(),
      title: "Getting Started with CSS Modules",
      content:
        "CSS Modules let you write CSS that's scoped to a specific component, avoiding global namespace conflicts. Combined with modern React patterns, you can build maintainable design systems without the overhead of CSS-in-JS or utility frameworks.",
      createdAt: now,
      updatedAt: now,
    },
  ];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyArticles));
}