import React from 'react';
import { useToyStore } from '../context/ToyStoreContext';
import { X, Trash2, Gift, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateCartQuantity,
    removeFromCart,
    toggleGiftWrap,
    updateGiftNote,
    cartSubtotal,
    cartTax,
    cartShippingFee,
    cartTotal,
    setActiveTab,
    openProductDetail
  } = useToyStore();

  if (!isCartDrawerOpen) return null;

  const freeShippingNeeded = Math.max(0, 50 - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartDrawerOpen(false)}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-[#FF6A00] text-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-white" />
              <h2 className="text-base font-black tracking-tight">Sourcing Cart</h2>
              <span className="text-xs bg-black/30 text-white font-bold px-2 py-0.5 rounded-md">
                {cart.reduce((a, b) => a + b.quantity, 0)} Items
              </span>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1 rounded-full hover:bg-black/20 text-white transition-colors"
              id="close-cart-drawer-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#222222] text-slate-100 text-xs px-5 py-2.5 flex items-center justify-between">
            {freeShippingNeeded > 0 ? (
              <p className="text-[11px] font-medium text-slate-300">
                Add <span className="font-extrabold text-[#FF6A00]">${freeShippingNeeded.toFixed(2)}</span> more for FREE Direct Express Shipping!
              </p>
            ) : (
              <p className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 🎉 You unlocked FREE Express Direct Shipping!
              </p>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-slate-100">
            {cart.length > 0 ? (
              cart.map(item => (
                <div key={item.toy.id} className="pt-4 first:pt-0">
                  <div className="flex gap-3">
                    <img
                      src={item.toy.imageUrl}
                      alt={item.toy.name}
                      className="w-18 h-18 object-cover rounded-xl bg-slate-100 border border-slate-200 flex-shrink-0 cursor-pointer"
                      onClick={() => {
                        setIsCartDrawerOpen(false);
                        openProductDetail(item.toy);
                      }}
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4
                          onClick={() => {
                            setIsCartDrawerOpen(false);
                            openProductDetail(item.toy);
                          }}
                          className="text-xs font-bold text-slate-900 line-clamp-1 cursor-pointer hover:text-amber-600"
                        >
                          {item.toy.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.toy.id)}
                          className="text-slate-400 hover:text-rose-500 p-1"
                          title="Remove Item"
                          id={`remove-cart-${item.toy.id}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-[10px] text-amber-800 font-bold bg-amber-100 px-2 py-0.2 rounded-md">
                        Age: {item.toy.ageLabel}
                      </span>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 text-xs">
                          <button
                            onClick={() => updateCartQuantity(item.toy.id, -1)}
                            className="px-2 py-0.5 text-slate-700 font-bold hover:bg-slate-200 rounded-l-lg"
                          >
                            -
                          </button>
                          <span className="px-2.5 font-extrabold text-slate-900">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.toy.id, 1)}
                            className="px-2 py-0.5 text-slate-700 font-bold hover:bg-slate-200 rounded-r-lg"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-xs font-black text-slate-900">
                          ${(item.toy.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Gift Wrap Toggle Option */}
                  <div className="mt-2.5 bg-amber-50/60 p-2 rounded-xl border border-amber-200/60">
                    <label className="flex items-center gap-2 cursor-pointer text-[11px] font-bold text-slate-800">
                      <input
                        type="checkbox"
                        checked={item.giftWrap}
                        onChange={() => toggleGiftWrap(item.toy.id)}
                        className="w-3.5 h-3.5 accent-slate-900 rounded"
                      />
                      <span className="flex items-center gap-1">
                        <Gift className="w-3 h-3 text-amber-600" /> Gift Wrap (+$3.99)
                      </span>
                    </label>

                    {item.giftWrap && (
                      <input
                        type="text"
                        placeholder="Gift note (e.g. 'From Grandma')"
                        value={item.giftNote || ''}
                        onChange={e => updateGiftNote(item.toy.id, e.target.value)}
                        className="w-full mt-1.5 bg-white text-[11px] px-2.5 py-1 rounded-lg border border-amber-300 focus:outline-none"
                      />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-2xl">
                  🧸
                </div>
                <p className="text-sm font-bold text-slate-800 mb-1">Your cart is currently empty</p>
                <p className="text-xs text-slate-500 mb-4">Discover fun toys for all age groups!</p>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="px-4 py-2 bg-slate-900 text-amber-300 text-xs font-bold rounded-full"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-2 text-xs text-slate-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span className="font-bold text-slate-900">${cartTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-bold text-slate-900">
                  {cartShippingFee === 0 ? <span className="text-emerald-600 font-extrabold">FREE</span> : `$${cartShippingFee.toFixed(2)}`}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-black text-slate-900">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>

              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  setActiveTab('checkout');
                }}
                className="w-full py-3.5 bg-[#FF6A00] hover:bg-[#FF5500] text-white font-black text-xs rounded-lg flex items-center justify-center gap-2 shadow-md transition-transform active:scale-98 mt-3 cursor-pointer"
                id="proceed-to-checkout-btn"
              >
                <span>Proceed to Trade Assurance Checkout</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
