import React, { useState } from 'react';
import { useToyStore } from '../context/ToyStoreContext';
import {
  ArrowLeft,
  Star,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  ThumbsUp,
  MessageSquare,
  Sparkles,
  Plus
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedToy,
    closeProductDetail,
    addToCart,
    isWishlisted,
    toggleWishlist,
    getToyReviews,
    addToyReview
  } = useToyStore();

  const [activeImage, setActiveImage] = useState<number>(0);
  const [qty, setQty] = useState<number>(1);
  const [giftWrapOption, setGiftWrapOption] = useState<boolean>(false);
  const [giftNoteText, setGiftNoteText] = useState<string>('');

  // New Review Form State
  const [isReviewFormOpen, setIsReviewFormOpen] = useState<boolean>(false);
  const [newReviewerName, setNewReviewerName] = useState<string>('');
  const [newRating, setNewRating] = useState<number>(5);
  const [newComment, setNewComment] = useState<string>('');
  const [newPro, setNewPro] = useState<string>('');
  const [reviewSubmittedMsg, setReviewSubmittedMsg] = useState<boolean>(false);

  if (!selectedToy) return null;

  const isWish = isWishlisted(selectedToy.id);
  const toyReviews = getToyReviews(selectedToy.id);
  const images = [selectedToy.imageUrl, ...(selectedToy.secondaryImages || [])];

  // Calculate rating breakdown
  const totalReviews = toyReviews.length || 1;
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  toyReviews.forEach(r => {
    const star = Math.min(5, Math.max(1, Math.round(r.rating))) as 1|2|3|4|5;
    ratingCounts[star] = (ratingCounts[star] || 0) + 1;
  });

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewerName.trim() || !newComment.trim()) return;

    addToyReview(selectedToy.id, {
      toyId: selectedToy.id,
      userName: newReviewerName.trim(),
      rating: newRating,
      comment: newComment.trim(),
      verifiedPurchase: true,
      pros: newPro.trim() ? [newPro.trim()] : undefined
    });

    setReviewSubmittedMsg(true);
    setTimeout(() => {
      setReviewSubmittedMsg(false);
      setIsReviewFormOpen(false);
      setNewReviewerName('');
      setNewComment('');
      setNewPro('');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28">
      
      {/* Back Button */}
      <button
        onClick={closeProductDetail}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 px-4 py-2 rounded-full mb-6 shadow-2xs transition-all"
        id="back-to-store-btn"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Store Catalog
      </button>

      {/* Main Product Layout */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Column: Image Gallery */}
          <div>
            <div className="aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 relative mb-4 border border-slate-200 shadow-inner">
              <img
                src={images[activeImage]}
                alt={selectedToy.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => toggleWishlist(selectedToy.id)}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all shadow-md ${
                  isWish
                    ? 'bg-rose-500 text-white scale-110'
                    : 'bg-white/90 hover:bg-white text-slate-700'
                }`}
                title={isWish ? 'Wishlisted' : 'Add to Wishlist'}
                id="detail-wishlist-btn"
              >
                <Heart className={`w-5 h-5 ${isWish ? 'fill-current' : ''}`} />
              </button>

              <span className="absolute bottom-4 left-4 bg-slate-900/90 text-amber-300 text-xs font-extrabold px-3 py-1 rounded-full backdrop-blur-xs">
                Ages {selectedToy.ageLabel}
              </span>
            </div>

            {/* Thumbnail Selectors */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImage === idx ? 'border-amber-500 scale-105 shadow-sm' : 'border-slate-200 opacity-70'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Toy Info & Buying Options */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
                <span>{selectedToy.brand} • {selectedToy.category}</span>
                <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {selectedToy.stockCount < 10 ? `Only ${selectedToy.stockCount} left!` : 'In Stock & Ready to Ship'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug mb-3">
                {selectedToy.name}
              </h1>

              {/* Star Rating Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${s <= Math.round(selectedToy.rating) ? 'fill-amber-400' : 'text-slate-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-black text-slate-900">{selectedToy.rating}</span>
                <span className="text-xs text-slate-500 font-medium">({toyReviews.length} customer reviews)</span>
              </div>

              {/* Price & Discount */}
              <div className="flex items-baseline gap-3 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <span className="text-3xl font-black text-slate-900">
                  ${selectedToy.price.toFixed(2)}
                </span>
                {selectedToy.originalPrice && (
                  <span className="text-base text-slate-400 line-through">
                    ${selectedToy.originalPrice.toFixed(2)}
                  </span>
                )}
                {selectedToy.originalPrice && (
                  <span className="text-xs font-black bg-rose-100 text-rose-700 px-2.5 py-1 rounded-md">
                    Save ${(selectedToy.originalPrice - selectedToy.price).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description & Key Specs */}
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {selectedToy.description}
              </p>

              {/* Bullet Features */}
              <div className="mb-6">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2">
                  Key Features & Safety:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {selectedToy.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gift Wrapping Option Box */}
              <div className="bg-amber-50/80 border border-amber-300/80 rounded-2xl p-4 mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={giftWrapOption}
                    onChange={e => setGiftWrapOption(e.target.checked)}
                    className="w-4 h-4 accent-slate-900 rounded cursor-pointer"
                    id="gift-wrap-checkbox"
                  />
                  <div>
                    <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                      🎁 Add Premium Gift Wrapping (+$3.99)
                    </span>
                    <p className="text-[11px] text-slate-600 font-medium">
                      Includes colorful toy box wrap, silk ribbon & custom message card!
                    </p>
                  </div>
                </label>

                {giftWrapOption && (
                  <div className="mt-3 pt-3 border-t border-amber-200/80">
                    <input
                      type="text"
                      value={giftNoteText}
                      onChange={e => setGiftNoteText(e.target.value)}
                      placeholder="Enter gift note message (e.g. 'Happy Birthday Leo!')"
                      className="w-full bg-white text-xs px-3.5 py-2 rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      id="gift-note-input"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Quantity Selector & Add To Cart Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between border border-slate-300 rounded-lg bg-slate-50 p-1 w-32">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-8 h-8 rounded-md bg-white hover:bg-slate-200 text-slate-900 font-black text-base flex items-center justify-center shadow-2xs"
                  id="qty-minus-btn"
                >
                  -
                </button>
                <span className="font-extrabold text-sm text-slate-900">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-8 h-8 rounded-md bg-white hover:bg-slate-200 text-slate-900 font-black text-base flex items-center justify-center shadow-2xs"
                  id="qty-plus-btn"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => addToCart(selectedToy, qty, giftWrapOption, giftNoteText)}
                className="flex-1 py-3.5 px-6 rounded-lg bg-[#FF6A00] hover:bg-[#FF5500] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
                id="add-to-cart-detail-btn"
              >
                <ShoppingBag className="w-5 h-5 text-white" />
                <span>Start Order Direct • ${(selectedToy.price * qty + (giftWrapOption ? 3.99 : 0)).toFixed(2)}</span>
              </button>
            </div>

            {/* Guarantees Bar */}
            <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-slate-100 text-center text-[10px] text-slate-600 font-bold">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-[#FF6A00]" />
                <span>Fast Direct Express</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw className="w-4 h-4 text-emerald-600" />
                <span>30-Day Money Back</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#FF6A00]" />
                <span>Trade Assurance Covered</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* CUSTOMER REVIEWS SECTION */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              Customer Reviews & Feedback
              <span className="text-xs bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full font-bold">
                {toyReviews.length} Verified Reviews
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Read real feedback from parents, grandparents, and gift buyers.
            </p>
          </div>

          <button
            onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-extrabold rounded-full flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
            id="write-review-toggle-btn"
          >
            <Plus className="w-4 h-4 text-amber-400" /> Write a Review
          </button>
        </div>

        {/* Write Review Form Collapsible */}
        {isReviewFormOpen && (
          <form onSubmit={handleReviewSubmit} className="bg-amber-50/70 border border-amber-300/80 rounded-2xl p-5 my-6">
            <h3 className="text-sm font-black text-slate-900 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" /> Write Your Review for {selectedToy.name}
            </h3>

            {reviewSubmittedMsg ? (
              <div className="p-4 bg-emerald-100 text-emerald-800 rounded-xl font-bold text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Thank you! Your review has been posted.
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jessica M."
                      value={newReviewerName}
                      onChange={e => setNewReviewerName(e.target.value)}
                      className="w-full bg-white text-xs px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      id="review-name-input"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Rating</label>
                    <div className="flex items-center gap-1 bg-white p-2 rounded-xl border border-slate-300">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="p-1 text-amber-400 hover:scale-110 transition-transform"
                        >
                          <Star className={`w-5 h-5 ${star <= newRating ? 'fill-amber-400' : 'text-slate-200'}`} />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-slate-700 ml-2">{newRating} / 5 Stars</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Highlight / Best Pro Feature (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Soft material, Easy app setup, Very durable"
                    value={newPro}
                    onChange={e => setNewPro(e.target.value)}
                    className="w-full bg-white text-xs px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    id="review-pro-input"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Your Detailed Feedback</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell other parents how your kids liked playing with this toy..."
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    className="w-full bg-white text-xs p-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    id="review-comment-textarea"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsReviewFormOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200/60 rounded-full"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-black rounded-full shadow-md"
                    id="submit-review-btn"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            )}
          </form>
        )}

        {/* Rating Breakdown Bars & Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 md:pr-4">
            <span className="text-4xl font-black text-slate-900">{selectedToy.rating}</span>
            <div className="flex items-center gap-1 text-amber-400 my-1">
              {[1, 2, 3, 4, 5].map(s => (
                <Star key={s} className={`w-4 h-4 ${s <= Math.round(selectedToy.rating) ? 'fill-amber-400' : 'text-slate-300'}`} />
              ))}
            </div>
            <span className="text-xs text-slate-500 font-medium">Based on {toyReviews.length} reviews</span>
          </div>

          {/* Star Bar Progress */}
          <div className="col-span-2 space-y-1.5 justify-center flex flex-col">
            {[5, 4, 3, 2, 1].map(star => {
              const count = ratingCounts[star as 1|2|3|4|5] || 0;
              const pct = Math.round((count / totalReviews) * 100);

              return (
                <div key={star} className="flex items-center gap-3 text-xs">
                  <span className="w-12 font-bold text-slate-700">{star} Stars</span>
                  <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-10 text-right text-slate-500 font-medium">{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4 mt-6">
          {toyReviews.length > 0 ? (
            toyReviews.map(rev => (
              <div key={rev.id} className="p-4 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-amber-300 font-black text-xs flex items-center justify-center uppercase">
                      {rev.userName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-slate-900">{rev.userName}</span>
                        {rev.verifiedPurchase && (
                          <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.2 rounded-full flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified Buyer
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400">{rev.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} className={`w-3.5 h-3.5 ${s <= rev.rating ? 'fill-amber-400' : 'text-slate-200'}`} />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  "{rev.comment}"
                </p>

                {rev.pros && rev.pros.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    {rev.pros.map((pro, idx) => (
                      <span key={idx} className="text-[10px] bg-amber-50 text-amber-900 font-bold px-2 py-0.5 rounded-md border border-amber-200">
                        👍 Pro: {pro}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-500 italic text-center py-6">
              No reviews yet for this toy. Be the first parent to share a review!
            </p>
          )}
        </div>

      </section>

    </div>
  );
};
