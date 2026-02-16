import { getOrder } from '@/lib/store';
import OrderStatus from '@/components/OrderStatus';
import Link from 'next/link';

export default async function OrderPage({ params }) {
    const { id } = await params; // Next.js 15+ params are promises (sometimes, depending on config, but safer to treat as such or destructure if sync).
    // In Next.js 15, params is async. In 14 it's sync. I'll await it to be safe for latest version instructions.

    const order = await getOrder(id);

    if (!order) {
        return (
            <div style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
                <h1>Order Not Found</h1>
                <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Return to Menu</Link>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: 'var(--space-8) 0' }}>
            <h1>Order #{order.id}</h1>
            <p style={{ color: 'var(--text-muted)' }}>Placed on {new Date(order.createdAt).toLocaleString()}</p>

            <OrderStatus orderId={order.id} initialStatus={order.status} />

            <div style={{ marginTop: 'var(--space-8)', padding: 'var(--space-4)', background: 'var(--surface)', borderRadius: 'var(--radius-lg)' }}>
                <h3>Order Details</h3>
                <ul style={{ listStyle: 'none', padding: 0, marginTop: 'var(--space-4)' }}>
                    {order.items.map((item, idx) => (
                        <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                            <span>{item.quantity}x {item.name}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
                <div style={{ borderTop: '1px solid var(--border)', marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 'var(--text-lg)' }}>
                    <span>Total:</span>
                    <span>${order.total.toFixed(2)}</span>
                </div>
            </div>

            <div style={{ marginTop: 'var(--space-8)', textAlign: 'center' }}>
                <Link href="/" className="btn btn-secondary">
                    Place Another Order
                </Link>
            </div>
        </div>
    );
}
