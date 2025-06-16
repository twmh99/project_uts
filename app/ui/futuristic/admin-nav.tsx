// 'use client';

// import { usePathname, useRouter } from 'next/navigation';
// import {
//   FiHome,
//   FiShoppingBag,
//   FiDollarSign,
//   FiUser,
//   FiLogOut,
// } from 'react-icons/fi';

// export function AdminNav() {
//   const pathname = usePathname();
//   const router = useRouter();

//   const navItems = [
//     { name: 'Dashboard', path: '/admin/dashboard', icon: <FiHome /> },
//     { name: 'Produk', path: '/admin/products', icon: <FiShoppingBag /> },
//     { name: 'Transaksi', path: '/admin/transactions', icon: <FiDollarSign /> },
//     { name: 'Profil', path: '/admin/profile', icon: <FiUser /> }, 
//     {
//       name: 'Keluar',
//       path: '#',
//       icon: <FiLogOut />,
//       onClick: () => {
//         localStorage.removeItem('isAdminAuthenticated');
//         router.push('/auth/login');
//       },
//     },
//   ];

//   return (
//     <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
//       <div className="flex space-x-1 bg-black/80 backdrop-blur-md border border-cyan-400/20 rounded-full px-6 py-3 shadow-lg shadow-cyan-500/10">
//         {navItems.map((item) => (
//           <a
//             key={item.name}
//             href={item.path}
//             onClick={(e) => {
//               if (item.onClick) {
//                 e.preventDefault();
//                 item.onClick();
//               }
//             }}
//             className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
//               pathname === item.path
//                 ? 'bg-cyan-500/20 text-cyan-400'
//                 : 'hover:text-cyan-300'
//             }`}
//           >
//             <span className="text-lg">{item.icon}</span>
//             <span className="hidden sm:inline">{item.name}</span>
//           </a>
//         ))}
//       </div>
//     </nav>
//   );
// }