import React from 'react';
import { ToyProduct } from '../types';
import { useToyStore } from '../context/ToyStoreContext';
import { Star, Heart, ShoppingBag, Eye, Check, ShieldCheck, Award } from 'lucide-react';

interface ProductCardProps {
  toy: ToyProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ toy }) => {
  const { isWishlisted, toggleWishlist, addToCart, openProductDetail, cart } = useToyStore();

  const isWish = isWishlisted(toy.id);
  const inCart = cart.some(item => item.toy.id === toy.id);

  return (
    <div className="bg-white rounded-xl border border-slate-200 hover:border-[#FF6A00] shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group relative">
      
      {/* Image & Badges Container */}
      <div className="relative aspect-4/3 bg-slate-50 overflow-hidden cursor-pointer" onClick={() => openProductDetail(toy)}>
        <img
          src={toy.imageUrl}
          alt={toy.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Age Group Tag */}
        <span className="absolute top-2.5 left-2.5 bg-[#222222]/90 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md backdrop-blur-xs tracking-tight shadow-xs">
          {toy.ageLabel}
        </span>

        {/* Alibaba Badges */}
        <div className="absolute top-2.5 right-10 flex flex-col gap-1 items-end">
          <span className="bg-[#FF6A00] text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider shadow-2xs flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Trade Assurance
          </span>
          {toy.isBestSeller && (
            <span className="bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-2xs flex items-center gap-1">
              <Award className="w-3 h-3" /> Top Rank
            </span>
          )}
          {toy.isNew && (
            <span className="bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-2xs">
              NEW
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(toy.id);
          }}
          className={`absolute top-2.5 right-2.5 p-1.5 rounded-md backdrop-blur-md transition-all shadow-xs ${
            isWish
              ? 'bg-rose-500 text-white'
              : 'bg-white/90 hover:bg-white text-slate-600 hover:text-rose-500'
          }`}
          title={isWish ? 'Remove from Wishlist' : 'Add to Wishlist'}
          id={`wishlist-toggle-${toy.id}`}
        >
          <Heart className={`w-3.5 h-3.5 ${isWish ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1 pointer-events-auto">
            <Eye className="w-3.5 h-3.5 text-[#FF6A00]" /> Quick View
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Supplier Info */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-bold text-[#FF6A00] uppercase tracking-wider text-[10px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
              {toy.brand} Direct
            </span>
            <div className="flex items-center gap-1 font-bold text-slate-700 text-[11px]">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>{toy.rating}</span>
              <span className="text-slate-400 font-normal">({toy.reviewCount})</span>
            </div>
          </div>

          <h3
            onClick={() => openProductDetail(toy)}
            className="font-bold text-slate-900 text-sm line-clamp-1 group-hover:text-[#FF6A00] transition-colors cursor-pointer"
          >
            {toy.name}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {toy.description}
          </p>

          {/* MOQ & Specs */}
          <div className="flex items-center gap-2 mt-2.5 text-[11px] font-medium text-slate-600">
            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">
              Min. Order: 1 pc
            </span>
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
              Ready to Ship
            </span>
          </div>
        </div>

        {/* Price & Action Button */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-[#FF6A00]">
                ${toy.price.toFixed(2)}
              </span>
              <span className="text-[10px] text-slate-500 font-medium">/ pc</span>
              {toy.originalPrice && (
                <span className="text-xs text-slate-400 line-through ml-1">
                  ${toy.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-500 font-medium block">
              In Stock: {toy.stockCount} units available
            </span>
          </div>

          <button
            onClick={() => addToCart(toy, 1)}
            className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
              inCart
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-[#FF6A00] hover:bg-[#FF5500] text-white shadow-2xs'
            }`}
            id={`add-to-cart-${toy.id}`}
          >
            {inCart ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" /> Order Direct
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

