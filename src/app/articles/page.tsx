// PLP (Product Listing Page) Articles

"use client";

// 
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
// 
import ArticleCard from "@/components/ArticleCard";
import {
  getAllArticles,
  deleteArticle,
  seedDummyArticles,
} from "@/lib/articleService";
import { Article } from "@/types/article";
import styles from "./page.module.css";
// 

// ArticlesPage
export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    seedDummyArticles();
    const loaded = getAllArticles();
    setArticles(loaded);
    setIsLoading(false);
  }, []);

  const handleDelete = (id: string) => {
    deleteArticle(id);
    setArticles(getAllArticles());
  };

  // filter artikel berdasarkan search query
  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return articles;

    const query = searchQuery.toLowerCase().trim();
    return articles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query)
    );
  }, [articles, searchQuery]);

  if (isLoading) {
    return (
      <main className={styles.main}>
        <div className="container">
          <p className={styles.loading}>Loading articles</p>
        </div>
      </main>
    );
  }

  // return artikel
  return (
    <main className={styles.main}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Articles</h1>
            <p className={styles.subtitle}>
              {articles.length}{" "}
              {articles.length === 1 ? "article" : "articles"} published
            </p>
          </div>
          <Link href="/articles/new" className={styles.newButton}>
            + New Article
          </Link>
        </div>


        {/* search */}
        {articles.length > 0 && (
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Search articles by title or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className={styles.clearButton}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        )}

        {articles.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>No articles yet</p>
            <p className={styles.emptyText}>
              Click &quot;New Article&quot; to create your first post.
            </p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>No matching articles</p>
            <p className={styles.emptyText}>
              No articles found for &quot;{searchQuery}&quot;. Try a different
              keyword.
            </p>
          </div>
        ) : (
          <>
            {searchQuery && (
              <p className={styles.resultCount}>
                Found {filteredArticles.length}{" "}
                {filteredArticles.length === 1 ? "article" : "articles"}
              </p>
            )}
            <div className={styles.list}>
              {/* looping artikel card */}
              {filteredArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

// zhb