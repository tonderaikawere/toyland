import React, { useEffect } from 'react';
import { useToyStore } from '../context/ToyStoreContext';
import { Sparkles, RefreshCw, ShoppingBag, Eye, Heart, ShieldCheck } from 'lucide-react';

export const PersonalizedRecommendations: React.FC = () => {
  const {
    toys,
    recommendations,
    isLoadingRecommendations,
    fetchRecommendations,
    addToCart,
    openProductDetail,
    isWishlisted,
    toggleWishlist
  } = useToyStore();

  useEffect(() => {
    // Initial fetch on mount
    fetchRecommendations();
  }, []);

  if (recommendations.length === 0 && !isLoadingRecommendations) return null;

  return (
    <section className="bg-[#222222] text-white rounded-xl p-5 sm:p-6 mb-8 border border-slate-800 shadow-md relative overflow-hidden">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#FF6A00] text-white flex items-center justify-center font-black shadow-sm">
            <Sparkles className="w-5 h-5 text-white animate-spin-slow" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
              Personalized Picks
              <span className="text-[10px] bg-orange-950/80 text-[#FF6A00] border border-[#FF6A00]/40 font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                Smart Recommendations
              </span>
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Curated toy suggestions matched to your family profile
            </p>
          </div>
        </div>

        <button
          onClick={() => fetchRecommendations()}
          disabled={isLoadingRecommendations}
          className="self-start sm:self-auto text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer"
          id="refresh-recommendations-btn"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#FF6A00] ${isLoadingRecommendations ? 'animate-spin' : ''}`} />
          <span>{isLoadingRecommendations ? 'Analyzing...' : 'Refresh Matches'}</span>
        </button>
      </div>

      {/* Recommendations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendations.map((rec, idx) => {
          const toy = toys.find(t => t.id === rec.toyId);
          if (!toy) return null;

          const isWish = isWishlisted(toy.id);

          return (
            <div
              key={toy.id + idx}
              className="bg-[#2B2B2B] rounded-lg border border-slate-700 p-4 hover:border-[#FF6A00] transition-all flex flex-col justify-between group relative"
            >
              <div>
                {/* Top Badge Tag */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-[10px] font-black bg-[#FF6A00] text-white px-2 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> {rec.badgeText}
                  </span>
                  <button
                    onClick={() => toggleWishlist(toy.id)}
                    className="text-slate-400 hover:text-rose-400 transition-colors p-1"
                  >
                    <Heart className={`w-4 h-4 ${isWish ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>

                <div className="flex gap-3 items-start">
                  <img
                    src={toy.imageUrl}
                    alt={toy.name}
                    className="w-18 h-18 object-cover rounded-md bg-slate-800 flex-shrink-0 cursor-pointer group-hover:scale-105 transition-transform"
                    onClick={() => openProductDetail(toy)}
                  />
                  <div>
                    <span className="text-[10px] font-bold text-orange-400">
                      {toy.ageLabel} • {toy.brand} Direct
                    </span>
                    <h4
                      onClick={() => openProductDetail(toy)}
                      className="text-xs font-bold text-white line-clamp-2 cursor-pointer hover:text-[#FF6A00] transition-colors mt-0.5"
                    >
                      {toy.name}
                    </h4>
                    <p className="text-sm font-black text-[#FF6A00] mt-1">
                      ${toy.price.toFixed(2)} <span className="text-[10px] text-slate-400 font-normal">/ pc</span>
                    </p>
                  </div>
                </div>

                {/* Recommendation Reason Callout */}
                <div className="mt-3 bg-slate-900/80 border border-slate-800 rounded-md p-2 text-[11px] text-slate-300 font-medium leading-tight">
                  <span className="font-bold text-[#FF6A00]">Why sourced for you:</span> {rec.reason}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-3.5 pt-2.5 border-t border-slate-700/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => openProductDetail(toy)}
                  className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5 text-[#FF6A00]" /> Specs
                </button>
                <button
                  onClick={() => addToCart(toy, 1)}
                  className="px-3 py-1.5 bg-[#FF6A00] hover:bg-[#FF5500] text-white text-xs font-bold rounded-lg flex items-center gap-1 transition-all shadow-2xs cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> Order Direct
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

