'use client';

import { useEffect, useState } from 'react';
import styles from './OrderStatus.module.css';

const STATUS_STEPS = ['Order Received', 'Preparing', 'Out for Delivery', 'Delivered'];

export default function OrderStatus({ orderId, initialStatus }) {
    const [status, setStatus] = useState(initialStatus);

    useEffect(() => {
        // Poll for status updates to simulate real-time
        const interval = setInterval(async () => {
            try {
                const res = await fetch(`/api/orders/${orderId}`);
                if (res.ok) {
                    const data = await res.json();
                    setStatus(data.status);

                    if (data.status === 'Delivered') {
                        clearInterval(interval);
                    }
                }
            } catch (err) {
                console.error('Failed to poll status', err);
            }
        }, 5000); // Check every 5 seconds

        return () => clearInterval(interval);
    }, [orderId]);

    const currentStepIndex = STATUS_STEPS.indexOf(status);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Order Status: <span className={styles.statusText}>{status}</span></h2>
            <div className={styles.tracker}>
                {STATUS_STEPS.map((step, index) => {
                    const isCompleted = index <= currentStepIndex;
                    const isCurrent = index === currentStepIndex;

                    return (
                        <div key={step} className={`${styles.step} ${isCompleted ? styles.completed : ''} ${isCurrent ? styles.current : ''}`}>
                            <div className={styles.dot}></div>
                            <span className={styles.label}>{step}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
