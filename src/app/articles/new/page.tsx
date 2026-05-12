// Create Article Page (New Article Page)

"use client";

import Link from "next/link";
import ArticleForm from "@/components/ArticleForm";
import { createArticle } from "@/lib/articleService";
import { ArticleFormData } from "@/types/article";
import styles from "../page.module.css";

// NewArticlePage
export default function NewArticlePage() {
  const handleCreate = (data: ArticleFormData) => {
    createArticle(data);
  };

  return (
    <main className={styles.main}>
      <div className="container">
        <div className={styles.breadcrumb}>
          <Link href="/articles" className={styles.breadcrumbLink}>
            ← Back to Articles
          </Link>
        </div>

        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>New Article</h1>
            <p className={styles.subtitle}>
              Write and publish a new blog post
            </p>
          </div>
        </div>

        <ArticleForm onSubmit={handleCreate} submitLabel="Publish Article" />
      </div>
    </main>
  );
}

// zhb