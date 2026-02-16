'use client';

import { useState } from 'react';
import styles from './CheckoutForm.module.css';

export default function CheckoutForm({ items, total, onSuccess, onBack }) {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Delivery address is required';
        } else if (formData.address.trim().length < 5) {
            newErrors.address = 'Please enter a full address';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^[\d\s()+-]{7,15}$/.test(formData.phone.trim())) {
            newErrors.phone = 'Enter a valid phone number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        if (errors[field]) {
            setErrors({ ...errors, [field]: null });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        setSubmitError(null);

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
            setSubmitError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.field}>
                <label className={styles.label}>Full Name</label>
                <input
                    className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                    value={formData.name}
                    onChange={e => handleChange('name', e.target.value)}
                    placeholder="John Doe"
                />
                {errors.name && <span className={styles.fieldError}>{errors.name}</span>}
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Delivery Address</label>
                <textarea
                    className={`${styles.textarea} ${errors.address ? styles.inputError : ''}`}
                    value={formData.address}
                    onChange={e => handleChange('address', e.target.value)}
                    placeholder="123 Main St, Apt 4B..."
                />
                {errors.address && <span className={styles.fieldError}>{errors.address}</span>}
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Phone Number</label>
                <input
                    type="tel"
                    className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                    value={formData.phone}
                    onChange={e => handleChange('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                />
                {errors.phone && <span className={styles.fieldError}>{errors.phone}</span>}
            </div>

            {submitError && <div className={styles.error}>{submitError}</div>}

            <div className={styles.summary}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
            </div>

            <div className={styles.actions}>
                <button type="submit" className={styles.submitBtn} disabled={loading}>
                    {loading ? 'Placing Order...' : 'Confirm Order'}
                </button>
                <button type="button" onClick={onBack} className={styles.backBtn} disabled={loading}>
                    ← Back to Cart
                </button>
            </div>
        </form>
    );
}
