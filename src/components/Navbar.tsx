// navbar

import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.brand}>
          SC Mini Task
        </Link>
        <div className={styles.links}>
          <Link href="/" className={styles.link}>
            Home
          </Link>
          <Link href="/articles" className={styles.link}>
            Articles
          </Link>
        </div>
      </div>
    </nav>
  );
}
// zhb