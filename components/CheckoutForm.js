'use client';

import { useState } from 'react';
import styles from './CheckoutForm.module.css';

export default function CheckoutForm({ items, total, onSuccess, onBack }) {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const orderPayload = {
            customer: formData,
            items: items.map(i => ({ id: i.id, quantity: i.quantity }))
        };

        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderPayload)
            });

            if (!res.ok) throw new Error('Failed to place order');

            const order = await res.json();
            onSuccess(order.id);
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
                <label className={styles.label}>Name</label>
                <input
                    required
                    className={styles.input}
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Address</label>
                <textarea
                    required
                    className={styles.textarea}
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    placeholder="123 Main St..."
                />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Phone</label>
                <input
                    required
                    type="tel"
                    className={styles.input}
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                />
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.summary}>
                <p>Total: <strong>${total.toFixed(2)}</strong></p>
            </div>

            <div className={styles.actions}>
                <button type="button" onClick={onBack} className={styles.backBtn} disabled={loading}>
                    Back
                </button>
                <button type="submit" className={styles.submitBtn} disabled={loading}>
                    {loading ? 'Placing Order...' : 'Confirm Order'}
                </button>
            </div>
        </form>
    );
}
