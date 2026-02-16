/**
 * @jest-environment jsdom
 */
import { GET as getMenu } from '@/app/api/menu/route';
import { POST as createOrder } from '@/app/api/orders/route';

// Mock NextResponse to avoid environment dependency issues
jest.mock('next/server', () => {
    return {
        NextResponse: {
            json: (body, init) => {
                return {
                    json: async () => body,
                    status: init?.status || 200,
                };
            },
        },
    };
});

describe('API Routes', () => {

    test('GET /api/menu returns items', async () => {
        const response = await getMenu();
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toBeGreaterThan(0);
        expect(data[0]).toHaveProperty('name');
    });

    test('POST /api/orders creates an order', async () => {
        const body = {
            items: [{ id: '1', quantity: 2 }, { id: '2', quantity: 1 }],
            customer: { name: 'John Doe', address: '123 Main St', phone: '555-1234' }
        };

        const request = new Request('http://localhost/api/orders', {
            method: 'POST',
            body: JSON.stringify(body)
        });

        const response = await createOrder(request);
        const data = await response.json();

        expect(response.status).toBe(201);
        expect(data).toHaveProperty('id');
        expect(data.status).toBe('Order Received');
        expect(data.total).toBeGreaterThan(0);
    });

    test('POST /api/orders fails with validatior error', async () => {
        const body = {
            items: [], // Empty cart
            customer: { name: 'John Doe', address: '123 Main St' }
        };

        const request = new Request('http://localhost/api/orders', {
            method: 'POST',
            body: JSON.stringify(body)
        });

        const response = await createOrder(request);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.error).toBe('Cart is empty');
    });
});
