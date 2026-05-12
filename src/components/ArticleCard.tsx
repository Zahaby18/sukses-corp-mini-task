// article card component, used in article list and article detail page
"use client";

import Link from "next/link";
import { Article } from "@/types/article";
import styles from "./ArticleCard.module.css";

interface ArticleCardProps {
  article: Article;
  onDelete: (id: string) => void;
}

export default function ArticleCard({ article, onDelete }: ArticleCardProps) {
  // excerpt content
  const preview =
    article.content.length > 150
      ? article.content.substring(0, 150) + "..."
      : article.content;

  // date
  const formattedDate = new Date(article.createdAt).toLocaleDateString(
    "id-ID",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  // delete handler
  const handleDelete = () => {
    if (confirm(`Hapus artikel "${article.title}"?`)) {
      onDelete(article.id);
    }
  };

  return (
    <article className={styles.card}>
      <div className={styles.content}>
        <Link href={`/articles/${article.id}`} className={styles.titleLink}>
          <h2 className={styles.title}>{article.title}</h2>
        </Link>
        <p className={styles.preview}>{preview}</p>
        <time className={styles.date}>{formattedDate}</time>
      </div>
      <div className={styles.actions}>
        <Link
          href={`/articles/${article.id}/edit`}
          className={styles.editButton}
        >
          Edit
        </Link>
        <button onClick={handleDelete} className={styles.deleteButton}>
          Delete
        </button>
      </div>
    </article>
  );
}

// zhb