import React from 'react';
import { useToyStore } from '../context/ToyStoreContext';
import { ProductCard } from './ProductCard';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { toys, wishlistIds, clearWishlist, addToCart, setActiveTab } = useToyStore();

  const wishlistedToys = toys.filter(t => wishlistIds.includes(t.id));

  const handleMoveAllToCart = () => {
    wishlistedToys.forEach(t => addToCart(t, 1));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Heart className="w-6 h-6 text-[#FF6A00] fill-[#FF6A00]" /> Saved Sourcing Favorites
            <span className="text-xs bg-orange-100 text-[#FF6A00] font-bold px-2.5 py-0.5 rounded-full">
              {wishlistedToys.length} Items
            </span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Keep track of favorite toys for upcoming birthdays, holidays, and gift lists.
          </p>
        </div>

        {wishlistedToys.length > 0 && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={clearWishlist}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-full flex items-center gap-1.5"
              id="clear-wishlist-btn"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear All
            </button>
            <button
              onClick={handleMoveAllToCart}
              className="px-5 py-2 bg-[#FF6A00] hover:bg-[#FF5500] text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-md cursor-pointer"
              id="move-all-wishlist-to-cart-btn"
            >
              <ShoppingBag className="w-4 h-4 text-white" /> Add All to Order
            </button>
          </div>
        )}
      </div>

      {/* Grid of Wishlist Items */}
      {wishlistedToys.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistedToys.map(toy => (
            <ProductCard key={toy.id} toy={toy} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto my-12 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4 text-2xl">
            ❤️
          </div>
          <h3 className="text-lg font-black text-slate-900 mb-1">
            Your Wish List is Empty
          </h3>
          <p className="text-xs text-slate-500 mb-6 leading-relaxed">
            Tap the heart icon on any toy in our store to save items for gift ideas!
          </p>
          <button
            onClick={() => setActiveTab('shop')}
            className="px-5 py-2.5 bg-slate-900 text-amber-300 font-extrabold text-xs rounded-full shadow-md"
          >
            Explore Toy Store
          </button>
        </div>
      )}

    </div>
  );
};
