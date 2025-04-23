export const products = [
    {
      id: 1,
      name: 'Headset Quantum X9',
      image: '/products/headset.png',
      price: 299,
      stock: 5,
      status: "Aktif",
    },
    {
      id: 2,
      name: 'Jaket Pintar Neon',
      image: '/products/jacket.png',
      price: 199,
      stock: 5,
      status: "Aktif",      
    },
    {
      id: 3,
      name: 'Holo-Watch Pro',
      image: '/products/watch.png',
      price: 249,
      stock: 5,
      status: "Aktif",
    },
    {
      id: 4,
      name: 'Drone Pendamping AI',
      image: '/products/drone.png',
      price: 599,
      stock: 5,
      status: "Aktif",
    },
    {
      id: 5,
      name: 'Keyboard Neural Link',
      image: '/products/keyboard.png',
      price: 159,
      stock: 5,
      status: "Aktif",
    },
    {
      id: 6,
      name: 'Ransel Pengisi Daya Tenaga Surya',
      price: 129,
      image: '/products/backpack.png',
      stock: 0,
      status: "Nonaktif",
    },
  ];
  
  export const salesStats = {
    totalProduk: products.length,
    stokHabis: products.filter(p => p.stock === 0).length,
    totalPenjualan: 2220000,
  };
  