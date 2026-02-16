'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './Header.module.css';

export default function Header() {
    const { items, toggleCart } = useCart();
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className={styles.header}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logo}>
                    Food<span className={styles.highlight}>Run</span>
                </Link>
                <nav className={styles.nav}>
                    <Link href="/" className={styles.link}>Menu</Link>
                    <button onClick={toggleCart} className={styles.cartBtn}>
                        Cart
                        {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
                    </button>
                </nav>
            </div>
        </header>
    );
}
