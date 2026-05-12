// Update Article Page (Edit Article Page)

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import ArticleForm from "@/components/ArticleForm";
import { getArticleById, updateArticle } from "@/lib/articleService";
import { Article, ArticleFormData } from "@/types/article";
import styles from "../../page.module.css";

export default function EditArticlePage() {
  const params = useParams();
  const id = params.id as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const found = getArticleById(id);
    setArticle(found);
    setIsLoading(false);
  }, [id]);

  const handleUpdate = (data: ArticleFormData) => {
    updateArticle(id, data);
  };

  if (isLoading) {
    return (
      <main className={styles.main}>
        <div className="container">
          <p className={styles.loading}>Loading article...</p>
        </div>
      </main>
    );
  }

  if (!article) {
    return (
      <main className={styles.main}>
        <div className="container">
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>Article not found</p>
            <p className={styles.emptyText}>
              The article you're looking for doesn't exist or has been deleted.
            </p>
            <Link href="/articles" className={styles.backButton}>
              ← Back to Articles
            </Link>
          </div>
        </div>
      </main>
    );
  }

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
            <h1 className={styles.title}>Edit Article</h1>
            <p className={styles.subtitle}>Update your blog post</p>
          </div>
        </div>

        <ArticleForm
          initialData={{
            title: article.title,
            content: article.content,
          }}
          onSubmit={handleUpdate}
          submitLabel="Update Article"
        />
      </div>
    </main>
  );
}

// zhb