'use client';

import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import styles from './MenuItem.module.css';

export default function MenuItem({ item }) {
    const { addToCart } = useCart();

    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    src={item.image}
                    alt={item.name}
                    width={500}
                    height={300}
                    className={styles.image}
                />
            </div>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h3 className={styles.title}>{item.name}</h3>
                    <span className={styles.price}>${item.price.toFixed(2)}</span>
                </div>
                <p className={styles.description}>{item.description}</p>
                <button
                    onClick={() => addToCart(item)}
                    className={styles.button}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
