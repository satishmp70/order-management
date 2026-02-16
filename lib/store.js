/**
 * In-memory store for Order Management Feature
 * NOTE: Data is lost on server restart.
 */

const MENU_ITEMS = [
    {
        id: '1',
        name: 'Margherita Pizza',
        description: 'Classic tomato and mozzarella cheese.',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: '2',
        name: 'Cheeseburger',
        description: 'Juicy beef patty with sharp cheddar.',
        price: 10.99,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: '3',
        name: 'Sushi Platter',
        description: 'Assorted fresh nigiri and maki rolls.',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: '4',
        name: 'Caesar Salad',
        description: 'Crisp romaine, parmesan, croutons, and dressing.',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=500&q=80'
    }
];

// Map<string, Order>
// Order: { id, items: [{id, quantity}], customer: {name, address, phone}, status, createdAt, total }
const orders = new Map();

export const getMenu = async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return MENU_ITEMS;
};

export const createOrder = async (orderData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const orderId = Math.random().toString(36).substr(2, 9);

    // Calculate total on server side for security
    let total = 0;
    const itemsWithDetails = orderData.items.map(item => {
        const menuItem = MENU_ITEMS.find(m => m.id === item.id);
        if (menuItem) {
            total += menuItem.price * item.quantity;
            return { ...item, name: menuItem.name, price: menuItem.price };
        }
        return item;
    });

    const newOrder = {
        id: orderId,
        items: itemsWithDetails,
        customer: orderData.customer,
        status: 'Order Received',
        createdAt: new Date().toISOString(),
        total: parseFloat(total.toFixed(2))
    };

    orders.set(orderId, newOrder);
    return newOrder;
};

export const getOrder = async (orderId) => {
    await new Promise(resolve => setTimeout(resolve, 100)); // Faster retrieval
    const order = orders.get(orderId);

    if (!order) return null;

    // Simulate status progression based on time elapsed
    const now = new Date();
    const created = new Date(order.createdAt);
    const elapsedSeconds = (now.getTime() - created.getTime()) / 1000;

    let currentStatus = order.status;
    if (elapsedSeconds > 10 && elapsedSeconds <= 20) {
        currentStatus = 'Preparing';
    } else if (elapsedSeconds > 20 && elapsedSeconds <= 40) {
        currentStatus = 'Out for Delivery';
    } else if (elapsedSeconds > 40) {
        currentStatus = 'Delivered';
    }

    // Update store if status changed
    if (currentStatus !== order.status) {
        order.status = currentStatus;
        orders.set(orderId, order);
    }

    return order;
};
