'use client';

import { useCart } from '@/context/CartContext';
import styles from './CartDrawer.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CheckoutForm from './CheckoutForm';

export default function CartDrawer() {
    const { items, isOpen, closeCart, updateQuantity, removeFromCart, total, clearCart } = useCart();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const router = useRouter();

    if (!isOpen) return null;

    const handleCheckoutSuccess = (orderId) => {
        clearCart();
        closeCart();
        setIsCheckingOut(false);
        router.push(`/order/${orderId}`);
    };

    return (
        <div className={styles.overlay} onClick={closeCart}>
            <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{isCheckingOut ? 'Checkout' : 'Your Cart'}</h2>
                    <button onClick={closeCart} className={styles.closeBtn}>&times;</button>
                </div>

                {items.length === 0 ? (
                    <div className={styles.empty}>Your cart is empty.</div>
                ) : (
                    <>
                        {!isCheckingOut ? (
                            <>
                                <div className={styles.items}>
                                    {items.map((item) => (
                                        <div key={item.id} className={styles.item}>
                                            <div className={styles.itemInfo}>
                                                <h3 className={styles.itemName}>{item.name}</h3>
                                                <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
                                            </div>
                                            <div className={styles.actions}>
                                                <div className={styles.qtyWrapper}>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className={styles.qtyBtn}>-</button>
                                                    <span className={styles.quantity}>{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className={styles.qtyBtn}>+</button>
                                                </div>
                                                <button onClick={() => removeFromCart(item.id)} className={styles.removeBtn}>Remove</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.footer}>
                                    <div className={styles.totalRow}>
                                        <span>Total:</span>
                                        <span className={styles.totalAmount}>${total.toFixed(2)}</span>
                                    </div>
                                    <button onClick={() => setIsCheckingOut(true)} className={styles.checkoutBtn}>
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <CheckoutForm
                                items={items}
                                total={total}
                                onSuccess={handleCheckoutSuccess}
                                onBack={() => setIsCheckingOut(false)}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
