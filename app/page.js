import MenuDisplay from '@/components/MenuDisplay';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Delicious Food, Delivered To You</h1>
        <p className={styles.subtitle}>Choose your favorite meal from our premium selection.</p>
      </div>
      <MenuDisplay />
    </div>
  );
}
