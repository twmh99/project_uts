'use client'
import { useState, useEffect } from 'react'

type Props = {
  onFilter: (params: URLSearchParams) => void
}

export function FilterPanel({ onFilter }: Props) {
  const [maxPrice, setMaxPrice] = useState(1000)
  const [cats, setCats] = useState<string[]>([])

  const categories = [
    { id: 'wearables', name: 'Wearables' },
    { id: 'audio', name: 'Audio' },
    { id: 'robotics', name: 'Robotics' },
    { id: 'computing', name: 'Computing' },
    { id: 'accessories', name: 'Accessories' },
  ]

  const toggle = (id: string) => {
    setCats(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    )
  }

  useEffect(() => {
    const ps = new URLSearchParams()
    ps.set('maxPrice', maxPrice.toString())
    cats.forEach(c => ps.append('categories', c))
    onFilter(ps)
  }, [maxPrice, cats])

  return (
    <div className="border border-cyan-400/20 rounded-xl p-6 bg-black/50 backdrop-blur-md">
      <h3 className="text-xl font-bold mb-6 text-cyan-400">Filter Produk</h3>

      <div className="mb-5">
        <h4 className="font-medium mb-2 text-white">Range Harga</h4>
        <div className="px-2">
          <input
            type="range"
            min="0"
            max="1000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
            className="w-full accent-cyan-500"
          />
          <div className="flex justify-between mt-2 text-sm text-white">
            <span>$0</span>
            <span>${maxPrice}</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-2 text-white">Kategori</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={cats.includes(category.id)}
                onChange={() => toggle(category.id)}
                className="form-checkbox h-4 w-4 text-cyan-500 rounded border-cyan-400/50 focus:ring-cyan-500"
              />
              <span className="text-white">{category.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}



// 'use client';

// import { useState, useEffect } from 'react';

// type Product = {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   kategori: string;
// };

// type Props = {
//   onFilter: (filteredProducts: Product[]) => void;
// };

// export function FilterPanel({ onFilter }: Props) {
//   const [priceRange, setPriceRange] = useState([0, 1000]);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

//   const categories = [
//     { id: 'wearables', name: 'Wearables' },
//     { id: 'audio', name: 'Audio' },
//     { id: 'robotics', name: 'Robotics' },
//     { id: 'computing', name: 'Computing' },
//     { id: 'accessories', name: 'Accessories' },
//   ];

//   const toggleCategory = (categoryId: string) => {
//     setSelectedCategories(prev =>
//       prev.includes(categoryId)
//         ? prev.filter(id => id !== categoryId)
//         : [...prev, categoryId]
//     );
//   };

//   const fetchFilteredProducts = async () => {
//     const params = new URLSearchParams();
//     params.append('maxPrice', priceRange[1].toString());
//     selectedCategories.forEach(cat => params.append('categories', cat));

//     try {
//       const res = await fetch(`/api/products?${params.toString()}`);
//       const data = await res.json();
//       onFilter(data);
//     } catch (error) {
//       console.error('Gagal fetch produk terfilter:', error);
//     }
//   };

//   useEffect(() => {
//     fetchFilteredProducts();
//   }, [priceRange, selectedCategories]);

//   return (
//     <div className="border border-cyan-400/20 rounded-xl p-6 bg-black/50 backdrop-blur-md">
//       <h3 className="text-xl font-bold mb-6 text-cyan-400">Filter</h3>

//       <div className="mb-8">
//         <h4 className="font-medium mb-4 text-white">Range Harga</h4>
//         <div className="px-2">
//           <input
//             type="range"
//             min="0"
//             max="1000"
//             value={priceRange[1]}
//             onChange={(e) =>
//               setPriceRange([priceRange[0], parseInt(e.target.value)])
//             }
//             className="w-full accent-cyan-500"
//           />
//           <div className="flex justify-between mt-2 text-sm text-white">
//             <span>${priceRange[0]}</span>
//             <span>${priceRange[1]}</span>
//           </div>
//         </div>
//       </div>

//       <div>
//         <h4 className="font-medium mb-4 text-white">Kategori</h4>
//         <div className="space-y-2">
//           {categories.map((category) => (
//             <label key={category.id} className="flex items-center space-x-3">
//               <input
//                 type="checkbox"
//                 checked={selectedCategories.includes(category.id)}
//                 onChange={() => toggleCategory(category.id)}
//                 className="form-checkbox h-4 w-4 text-cyan-500 rounded border-cyan-400/50 focus:ring-cyan-500"
//               />
//               <span className="text-white">{category.name}</span>
//             </label>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
