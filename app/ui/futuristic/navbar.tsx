'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiShoppingBag, FiUser, FiInfo, FiShoppingCart, FiDollarSign, FiMail, FiLogOut } from 'react-icons/fi';
import { useCart } from '../../context/cart-context';

const customerNavItems = [
  { name: 'Beranda', path: '/', icon: <FiHome /> },
  { name: 'Katalog', path: '/catalogue', icon: <FiShoppingBag /> },
  { name: 'Tentang', path: '/about', icon: <FiInfo /> },
  { name: 'Kontak', path: '/contact', icon: <FiMail /> },
  { name: 'Profil', path: '/profile', icon: <FiUser /> },
];

const logoutItem = {
  name: 'Keluar', 
  path: '#',
  icon: <FiLogOut />,
  onClick: (isAdmin: boolean) => {
    if (isAdmin) {
      localStorage.removeItem('isAdminAuthenticated');
    } else {
      localStorage.removeItem('isUserAuthenticated');
    }
    window.location.href = '/auth/login';
  }
};

export function FloatingNav() {
  const pathname = usePathname();
  const { cart } = useCart();

  const isAuthPage = pathname.startsWith('/auth');
  const isAdminPage = pathname.startsWith('/admin');

  if (isAuthPage) {
    return null;
  }

  // Navigasi Customer
  const customerItems = [...customerNavItems];
  if (!isAdminPage) {
    customerItems.push({
      name: 'Keranjang',
      path: '/cart',
      icon: (
        <div className="relative">
          <FiShoppingCart />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-cyan-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </div>
      ),
    });
  }

  // Navigasi Admin
  const adminItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <FiHome /> },
    { name: 'Produk', path: '/admin/products', icon: <FiShoppingBag /> },
    { name: 'Transaksi', path: '/admin/transactions', icon: <FiDollarSign /> },
  ];

  const navItems = isAdminPage ? adminItems : customerItems;

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center bg-black/80 backdrop-blur-md border border-cyan-400/20 rounded-full px-6 py-3 shadow-lg shadow-cyan-500/10">
        {/* Main Navigasi Items */}
        <div className="flex space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
                pathname === item.path ? 'bg-cyan-500/20 text-cyan-400' : 'hover:text-cyan-300'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="hidden sm:inline">{item.name}</span>
            </Link>
          ))}
        </div>

        {/* Button Logout */}
        <div className="border-l border-cyan-400/20 h-8 mx-2"></div>
        <button
          onClick={() => logoutItem.onClick(isAdminPage)}
          className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 hover:text-cyan-300`}
        >
          <span className="text-lg">{logoutItem.icon}</span>
          <span className="hidden sm:inline">{logoutItem.name}</span>
        </button>
      </div>
    </nav>
  );
}