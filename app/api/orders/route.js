import { NextResponse } from 'next/server';
import { createOrder } from '@/lib/store';

export async function POST(request) {
    try {
        const body = await request.json();

        if (!body.items || body.items.length === 0) {
            return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
        }

        if (!body.customer || !body.customer.name || !body.customer.address) {
            return NextResponse.json({ error: 'Missing customer details' }, { status: 400 });
        }

        const order = await createOrder(body);
        return NextResponse.json(order, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
