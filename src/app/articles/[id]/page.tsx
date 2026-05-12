// PDP (Product Detail Page) Articles

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getArticleById, deleteArticle } from "@/lib/articleService";
import { Article } from "@/types/article";
import { useRouter } from "next/navigation";
import styles from "./detail.module.css";

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const found = getArticleById(id);
    setArticle(found);
    setIsLoading(false);
  }, [id]);

  const handleDelete = () => {
    if (!article) return;
    if (confirm(`Hapus artikel "${article.title}"?`)) {
      deleteArticle(article.id);
      router.push("/articles");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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

  // kalau artikel tidak ditemukan, tampilkan message error
  if (!article) {
    return (
      <main className={styles.main}>
        <div className="container">
          <div className={styles.notFound}>
            <h1 className={styles.notFoundTitle}>Article not found</h1>
            <p className={styles.notFoundText}>
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
            Back to Articles
          </Link>
        </div>

        <article className={styles.article}>
          <header className={styles.header}>
            <h1 className={styles.title}>{article.title}</h1>
            <div className={styles.meta}>
              <time className={styles.date}>
                Published {formatDate(article.createdAt)}
              </time>
              {article.updatedAt !== article.createdAt && (
                <span className={styles.updated}>
                  · Updated {formatDate(article.updatedAt)}
                </span>
              )}
            </div>
          </header>

          <div className={styles.content}>
            {article.content.split("\n").map((paragraph, index) => (
              <p key={index} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </div>

          <footer className={styles.actions}>
            <Link
              href={`/articles/${article.id}/edit`}
              className={styles.editButton}
            >
              Edit Article
            </Link>
            <button onClick={handleDelete} className={styles.deleteButton}>
              Delete Article
            </button>
          </footer>
        </article>
      </div>
    </main>
  );
}

// zhb