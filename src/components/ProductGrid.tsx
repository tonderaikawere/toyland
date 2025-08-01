import React from 'react';
import { useToyStore } from '../context/ToyStoreContext';
import { AgeFilterBar } from './AgeFilterBar';
import { ProductCard } from './ProductCard';
import { PersonalizedRecommendations } from './PersonalizedRecommendations';
import { Category } from '../types';
import { SlidersHorizontal, PackageSearch, Sparkles, ShieldCheck } from 'lucide-react';

interface CategoryTab {
  id: Category;
  label: string;
  emoji: string;
}

export const ProductGrid: React.FC = () => {
  const {
    filteredToys,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    selectedAgeGroup,
    setSelectedAgeGroup,
    setActiveTab
  } = useToyStore();

  const categories: CategoryTab[] = [
    { id: 'all', label: 'All Toys', emoji: '🎁' },
    { id: 'building', label: 'Building Sets', emoji: '🧱' },
    { id: 'educational', label: 'STEM & Learning', emoji: '🧠' },
    { id: 'electronics', label: 'Robots & Tech', emoji: '🤖' },
    { id: 'plush', label: 'Soft Plush', emoji: '🧸' },
    { id: 'outdoor', label: 'Outdoor & Sports', emoji: '🏕️' },
    { id: 'puzzles', label: 'Puzzles & Games', emoji: '🧩' },
    { id: 'vehicles', label: 'Cars & Tracks', emoji: '🏎️' },
    { id: 'dolls', label: 'Dolls & Houses', emoji: '🏰' },
    { id: 'arts-crafts', label: 'Arts & Crafts', emoji: '🎨' }
  ];

  return (
    <div className="pb-24">
      
      {/* Age Filter Bar */}
      <AgeFilterBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Recommendations Engine Banner */}
        <PersonalizedRecommendations />

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none border-b border-slate-200">
          {categories.map(cat => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer border ${
                  isSelected
                    ? 'bg-[#FF6A00] text-white border-[#FF6A00] shadow-2xs'
                    : 'bg-white hover:bg-orange-50 text-slate-700 border-slate-200 hover:border-orange-200'
                }`}
                id={`category-tab-${cat.id}`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Results Bar & Sort Control */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              Verified Factory Catalog
              <span className="text-xs font-bold bg-orange-100 text-[#FF6A00] px-2.5 py-0.5 rounded-md border border-orange-200">
                {filteredToys.length} Products Available
              </span>
            </h1>
            {(selectedAgeGroup !== 'all' || selectedCategory !== 'all' || searchQuery) && (
              <p className="text-xs text-slate-500 mt-1">
                Active Sourcing Filters:{' '}
                {selectedAgeGroup !== 'all' && <span className="font-bold text-slate-800">Age: {selectedAgeGroup} Yrs • </span>}
                {selectedCategory !== 'all' && <span className="font-bold text-slate-800">Category: {selectedCategory} • </span>}
                {searchQuery && <span className="font-bold text-slate-800">Search: "{searchQuery}"</span>}
              </p>
            )}
          </div>

          {/* Sort Control */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <SlidersHorizontal className="w-4 h-4 text-[#FF6A00]" />
            <span className="text-xs font-bold text-slate-600">Sort By:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-white border border-slate-300 text-slate-900 text-xs font-bold rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-2xs cursor-pointer"
              id="sort-select"
            >
              <option value="featured">Top Supplier Recommendations</option>
              <option value="rating">Highest Factory Rating</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="reviews">Most Orders & Reviews</option>
            </select>
          </div>
        </div>

        {/* Toys Grid */}
        {filteredToys.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredToys.map(toy => (
              <ProductCard key={toy.id} toy={toy} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-md mx-auto my-12 shadow-2xs">
            <div className="w-16 h-16 rounded-full bg-orange-100 text-[#FF6A00] flex items-center justify-center mx-auto mb-4 font-black text-2xl">
              🔍
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-1">
              No direct products matched your search
            </h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Try broadening your age stage or search terms to view all factory direct inventory.
            </p>
            <button
              onClick={() => {
                setSelectedAgeGroup('all');
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 bg-[#FF6A00] hover:bg-[#FF5500] text-white font-bold text-xs rounded-lg shadow-2xs transition-all cursor-pointer"
              id="reset-all-filters-btn"
            >
              View Full Factory Catalog
            </button>
          </div>
        )}

        {/* Footer with Legal Center Links */}
        <footer className="mt-20 border-t border-slate-200 pt-8 pb-12 text-center text-xs text-slate-500">
          <p className="mb-4">© 2026 Toyland Toy Store. All rights reserved. 🧸 Safety Certified & Non-Toxic.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => setActiveTab('legal')} className="hover:text-indigo-600 font-bold focus:outline-none cursor-pointer">
              Terms of Service
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('legal')} className="hover:text-indigo-600 font-bold focus:outline-none cursor-pointer">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('legal')} className="hover:text-indigo-600 font-bold focus:outline-none cursor-pointer">
              COPPA (Kids Privacy)
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('legal')} className="hover:text-indigo-600 font-bold focus:outline-none cursor-pointer">
              Kid Safety Policy
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('legal')} className="hover:text-indigo-600 font-bold text-indigo-600 focus:outline-none cursor-pointer">
              Legal Compliance Center (30 Docs)
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
};
