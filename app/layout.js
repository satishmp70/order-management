import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'FoodRun - Order Management',
  description: 'Place your order and track it in real-time.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Header />
          <main className="container">{children}</main>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
