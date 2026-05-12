// footer
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>
          © {year} Simple Blog · Built with Next.js & TypeScript
        </p>
      </div>
    </footer>
  );
}