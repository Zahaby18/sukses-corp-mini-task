// form for submit and edit article
"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArticleFormData } from "@/types/article";
import styles from "./ArticleForm.module.css";

interface ArticleFormProps {
  initialData?: ArticleFormData;
  onSubmit: (data: ArticleFormData) => void;
  submitLabel: string;
}

interface FormErrors {
  title?: string;
  content?: string;
}

export default function ArticleForm({
  initialData,
  onSubmit,
  submitLabel,
}: ArticleFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // validation form
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    } else if (title.trim().length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }

    if (!content.trim()) {
      newErrors.content = "Content is required";
    } else if (content.trim().length < 20) {
      newErrors.content = "Content must be at least 20 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // handle submit form
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      onSubmit({
        title: title.trim(),
        content: content.trim(),
      });
      router.push("/articles");
    } catch (error) {
      console.error("Submit error:", error);
      alert("Failed to save article. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="title" className={styles.label}>
          Title <span className={styles.required}>*</span>
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter article title..."
          className={`${styles.input} ${errors.title ? styles.inputError : ""}`}
          disabled={isSubmitting}
          maxLength={120}
        />
        {errors.title && (
          <span className={styles.errorText}>{errors.title}</span>
        )}
        <span className={styles.hint}>
          {title.length}/100 characters
        </span>
      </div>

      <div className={styles.field}>
        <label htmlFor="content" className={styles.label}>
          Content <span className={styles.required}>*</span>
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your article content here..."
          className={`${styles.textarea} ${
            errors.content ? styles.inputError : ""
          }`}
          disabled={isSubmitting}
          rows={10}
        />
        {errors.content && (
          <span className={styles.errorText}>{errors.content}</span>
        )}
        <span className={styles.hint}>
          {content.length} characters (min. 20)
        </span>
      </div>

      <div className={styles.actions}>
        <Link href="/articles" className={styles.cancelButton}>
          Cancel
        </Link>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

// zhb