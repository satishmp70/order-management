/**
 * @jest-environment jsdom
 */
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '@/context/CartContext';

describe('CartContext', () => {
    const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

    test('should start with empty cart', () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        expect(result.current.items).toEqual([]);
        expect(result.current.total).toBe(0);
    });

    test('should add items to cart', () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        const item = { id: '1', name: 'Pizza', price: 10 };

        act(() => {
            result.current.addToCart(item);
        });

        expect(result.current.items).toHaveLength(1);
        expect(result.current.items[0]).toEqual({ ...item, quantity: 1 });
        expect(result.current.total).toBe(10);
    });

    test('should increment quantity if item exists', () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        const item = { id: '1', name: 'Pizza', price: 10 };

        act(() => {
            result.current.addToCart(item);
            result.current.addToCart(item);
        });

        expect(result.current.items).toHaveLength(1);
        expect(result.current.items[0].quantity).toBe(2);
        expect(result.current.total).toBe(20);
    });

    test('should remove item from cart', () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        const item = { id: '1', name: 'Pizza', price: 10 };

        act(() => {
            result.current.addToCart(item);
            result.current.removeFromCart(item.id);
        });

        expect(result.current.items).toHaveLength(0);
        expect(result.current.total).toBe(0);
    });
});
