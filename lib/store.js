/**
 * Stateless store for Order Management Feature
 * Uses URL-safe Base64 encoding to persist order details in the ID itself.
 * This ensures compatibility with serverless environments (Vercel/Netlify) without a database.
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

export const getMenu = async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return MENU_ITEMS;
};

// Helper to encode/decode
const encodeOrderData = (data) => {
    return Buffer.from(JSON.stringify(data)).toString('base64url');
};

const decodeOrderData = (token) => {
    try {
        return JSON.parse(Buffer.from(token, 'base64url').toString('utf-8'));
    } catch (e) {
        return null;
    }
};

export const createOrder = async (orderData) => {
    await new Promise(resolve => setTimeout(resolve, 500));

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

    const orderPayload = {
        // We don't need a random ID, the token IS the ID.
        // But for UI consistency we can keep a reference if needed, but not strictly necessary.
        items: itemsWithDetails,
        customer: orderData.customer,
        createdAt: new Date().toISOString(),
        total: parseFloat(total.toFixed(2))
    };

    // Encode the entire order state into the ID
    const token = encodeOrderData(orderPayload);

    // Return the token as the ID. The frontend will use this token to fetch status.
    return {
        ...orderPayload,
        id: token,
        status: 'Order Received'
    };
};

export const getOrder = async (orderId) => {
    await new Promise(resolve => setTimeout(resolve, 100)); // Faster retrieval

    const orderData = decodeOrderData(orderId);
    if (!orderData) return null;

    // Simulate status progression based on time elapsed
    const now = new Date();
    const created = new Date(orderData.createdAt);
    const elapsedSeconds = (now.getTime() - created.getTime()) / 1000;

    let currentStatus = 'Order Received';
    if (elapsedSeconds > 10 && elapsedSeconds <= 20) {
        currentStatus = 'Preparing';
    } else if (elapsedSeconds > 20 && elapsedSeconds <= 40) {
        currentStatus = 'Out for Delivery';
    } else if (elapsedSeconds > 40) {
        currentStatus = 'Delivered';
    }

    return {
        ...orderData,
        id: orderId, // The token is the ID
        status: currentStatus
    };
};
