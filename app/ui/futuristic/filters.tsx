'use client';

import { useState } from 'react';

export function FilterPanel() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = [
    { id: 'wearables', name: 'Wearables' },
    { id: 'audio', name: 'Audio' },
    { id: 'robotics', name: 'Robotics' },
    { id: 'computing', name: 'Computing' },
    { id: 'accessories', name: 'Accessories' },
  ];

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="border border-cyan-400/20 rounded-xl p-6 bg-black/50 backdrop-blur-md">
      <h3 className="text-xl font-bold mb-6 text-cyan-400">Filter</h3>
      
      <div className="mb-8">
        <h4 className="font-medium mb-4">Range Harga</h4>
        <div className="px-2">
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full accent-cyan-500"
          />
          <div className="flex justify-between mt-2 text-sm">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-4">Kategori</h4>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category.id} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => toggleCategory(category.id)}
                className="form-checkbox h-4 w-4 text-cyan-500 rounded border-cyan-400/50 focus:ring-cyan-500"
              />
              <span>{category.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}