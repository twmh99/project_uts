import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { FloatingNav } from './ui/futuristic/navbar';
import { Footer } from './ui/futuristic/footer';
import { CartProvider } from './context/cart-context';
import { AuthProvider } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FutureTech - Teknologi Masa Depan',
  description: 'Toko online untuk produk teknologi futuristik',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <AuthProvider>
          <CartProvider>
            <FloatingNav />
            {children}
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
