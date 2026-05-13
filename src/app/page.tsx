import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.main}>

      {/* ATF */}
      <div className="container">
        <section className={styles.hero}>
          <h1 className={styles.title}>SC - Minitask</h1>
          <p className={styles.tagline}>
            We are passionate about building simple and effective web applications that empower users to share their stories and ideas. Our blogging platform is designed to provide a seamless and intuitive experience for creating, managing, and sharing content with ease.
          </p>
        </section>

        {/* about */}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Us</h2>
          <p className={styles.text}>
            We are a team of passionate developers dedicated to creating simple and effective web applications.
          </p>
        </section>

        {/* vision & mission */}
        <div className={styles.grid}>
          <section className={styles.card}>
            <h3 className={styles.cardTitle}>Vision</h3>
            <p className={styles.text}>
              Our vision is to empower individuals and businesses to share their stories and ideas through a user-friendly blogging platform.
            </p>
          </section>

          <section className={styles.card}>
            <h3 className={styles.cardTitle}>Mission</h3>
            <p className={styles.text}>
              Our mission is to provide a seamless and intuitive blogging experience that allows users to create, manage, and share their content with ease.
            </p>
          </section>
        </div>
        
      </div>
    </main>
  );
}
// zhb