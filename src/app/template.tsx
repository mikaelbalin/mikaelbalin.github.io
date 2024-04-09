import { HeaderMenu } from "../components/HeaderMenu";
import { Footer } from "../components/Footer";
import styles from "./template.module.css";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <HeaderMenu />
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}
