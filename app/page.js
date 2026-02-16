import MenuDisplay from '@/components/MenuDisplay';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Hungry?<br />Order & Eat.</h1>
          <p className={styles.subtitle}>Order food from favourite restaurants near you.</p>
        </div>
      </div>
      <MenuDisplay />
    </div>
  );
}
