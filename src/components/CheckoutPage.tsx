import React, { useState } from 'react';
import { useToyStore } from '../context/ToyStoreContext';
import { ShippingAddress } from '../types';
import {
  ShieldCheck,
  CreditCard,
  MapPin,
  CheckCircle2,
  Lock,
  ArrowRight,
  PackageCheck,
  Sparkles,
  Plus
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartTax,
    cartShippingFee,
    cartTotal,
    addresses,
    addAddress,
    placeOrder,
    setActiveTab,
    setActiveTrackingOrder
  } = useToyStore();

  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    addresses.find(a => a.isDefault)?.id || addresses[0]?.id || ''
  );

  // Add Address Inline State
  const [isAddingNewAddress, setIsAddingNewAddress] = useState<boolean>(false);
  const [newLabel, setNewLabel] = useState<string>('Home');
  const [newName, setNewName] = useState<string>('');
  const [newStreet, setNewStreet] = useState<string>('');
  const [newCity, setNewCity] = useState<string>('');
  const [newState, setNewState] = useState<string>('');
  const [newZip, setNewZip] = useState<string>('');

  // Payment Form State
  const [cardNumber, setCardNumber] = useState<string>('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState<string>('12/28');
  const [cardCvc, setCardCvc] = useState<string>('888');

  // Checkout Status State
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [completedOrderNumber, setCompletedOrderNumber] = useState<string | null>(null);

  const selectedAddr = addresses.find(a => a.id === selectedAddressId) || addresses[0];

  const handleAddNewAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newStreet || !newCity) return;

    addAddress({
      label: newLabel || 'Home',
      fullName: newName,
      street: newStreet,
      city: newCity,
      state: newState || 'IL',
      zipCode: newZip || '60601',
      country: 'United States',
      phone: '+1 (555) 000-1122',
      isDefault: addresses.length === 0
    });

    setIsAddingNewAddress(false);
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAddr) return;

    setIsProcessing(true);

    setTimeout(() => {
      const order = placeOrder(selectedAddr, `Visa ending in 4242`);
      setIsProcessing(false);
      setCompletedOrderNumber(order.orderNumber);
    }, 1500);
  };

  if (completedOrderNumber) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center pb-28">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xl">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            Order Confirmed!
          </span>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-3 mb-2">
            Thank you for your order! 🎉
          </h1>

          <p className="text-xs text-slate-600 font-medium mb-6">
            Order Reference: <span className="font-extrabold text-slate-900">{completedOrderNumber}</span>
          </p>

          <div className="bg-slate-50 rounded-2xl p-4 text-left border border-slate-200 text-xs mb-8 space-y-1">
            <p className="font-bold text-slate-900">Shipping To:</p>
            <p className="text-slate-700">{selectedAddr.fullName}</p>
            <p className="text-slate-600">{selectedAddr.street}, {selectedAddr.city}, {selectedAddr.state} {selectedAddr.zipCode}</p>
            <p className="text-emerald-700 font-bold mt-2">🚚 Estimated Delivery: In 2-3 Business Days</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setActiveTab('orders')}
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-amber-300 font-black text-xs rounded-full flex items-center justify-center gap-2 shadow-lg"
              id="track-order-after-checkout-btn"
            >
              <PackageCheck className="w-4 h-4 text-amber-400" />
              <span>Track Live Order Status</span>
            </button>
            <button
              onClick={() => setActiveTab('shop')}
              className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-full"
            >
              Back to Store
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <h2 className="text-lg font-black text-slate-900 mb-2">Your cart is empty</h2>
        <p className="text-xs text-slate-500 mb-6">Please add toys to your cart before proceeding to checkout.</p>
        <button
          onClick={() => setActiveTab('shop')}
          className="px-5 py-2.5 bg-slate-900 text-amber-300 font-black text-xs rounded-full"
        >
          Return to Store
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28">
      
      {/* Header Title */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-[#FF6A00] text-white flex items-center justify-center font-black">
          <Lock className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Trade Assurance Secure Checkout
          </h1>
          <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Protected by Toyland Direct Trade Assurance Order Protection
          </p>
        </div>
      </div>

      <form onSubmit={handleCompleteOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Shipping & Payment Steps */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* STEP 1: Shipping Address Selection */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-600" /> 1. Shipping Address
              </h2>
              <button
                type="button"
                onClick={() => setIsAddingNewAddress(!isAddingNewAddress)}
                className="text-xs font-bold text-amber-900 hover:underline flex items-center gap-1"
                id="add-new-address-checkout-btn"
              >
                <Plus className="w-3.5 h-3.5" /> Add New Address
              </button>
            </div>

            {/* Saved Addresses List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {addresses.map(addr => {
                const isSelected = selectedAddressId === addr.id;
                return (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedAddressId(addr.id)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                      isSelected
                        ? 'border-slate-900 bg-amber-50/50 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black text-slate-900">{addr.label}</span>
                      {addr.isDefault && (
                        <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.2 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-bold text-slate-800">{addr.fullName}</p>
                    <p className="text-xs text-slate-600">{addr.street}</p>
                    <p className="text-xs text-slate-600">{addr.city}, {addr.state} {addr.zipCode}</p>
                  </div>
                );
              })}
            </div>

            {/* Add Address Form Inline */}
            {isAddingNewAddress && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mt-4 text-xs space-y-3">
                <h4 className="font-bold text-slate-900">Add New Shipping Address:</h4>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Address Label (e.g. Grandma's)"
                    value={newLabel}
                    onChange={e => setNewLabel(e.target.value)}
                    className="p-2 rounded-xl border border-slate-300 bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    className="p-2 rounded-xl border border-slate-300 bg-white"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Street Address"
                  value={newStreet}
                  onChange={e => setNewStreet(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-300 bg-white"
                />
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="City"
                    value={newCity}
                    onChange={e => setNewCity(e.target.value)}
                    className="p-2 rounded-xl border border-slate-300 bg-white"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={newState}
                    onChange={e => setNewState(e.target.value)}
                    className="p-2 rounded-xl border border-slate-300 bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Zip Code"
                    value={newZip}
                    onChange={e => setNewZip(e.target.value)}
                    className="p-2 rounded-xl border border-slate-300 bg-white"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddNewAddressSubmit}
                  className="px-4 py-2 bg-slate-900 text-amber-300 font-bold rounded-xl"
                >
                  Save Address
                </button>
              </div>
            )}
          </div>

          {/* STEP 2: Payment Method */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <CreditCard className="w-5 h-5 text-amber-600" /> 2. Payment Method
            </h2>

            <div className="space-y-4">
              <div className="bg-slate-900 text-amber-300 p-4 rounded-2xl flex items-center justify-between shadow-inner">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-amber-400" />
                  <div>
                    <p className="text-xs font-bold text-amber-100">Credit / Debit Card</p>
                    <p className="text-sm font-extrabold tracking-widest text-white">{cardNumber}</p>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-500 text-white font-black px-2.5 py-1 rounded-full uppercase">
                  Verified
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Expiration Date</label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={e => setCardExpiry(e.target.value)}
                    className="w-full text-xs font-bold p-3 rounded-xl border border-slate-300 bg-slate-50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Security CVC</label>
                  <input
                    type="text"
                    value={cardCvc}
                    onChange={e => setCardCvc(e.target.value)}
                    className="w-full text-xs font-bold p-3 rounded-xl border border-slate-300 bg-slate-50 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Order Summary & Place Order */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs sticky top-24">
            <h2 className="text-base font-black text-slate-900 mb-4 pb-3 border-b border-slate-100">
              Order Summary ({cart.length} Toys)
            </h2>

            {/* Cart Items List */}
            <div className="space-y-3 max-h-60 overflow-y-auto mb-4 pr-1">
              {cart.map(item => (
                <div key={item.toy.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <img src={item.toy.imageUrl} alt="" className="w-10 h-10 object-cover rounded-lg bg-slate-100" />
                    <div>
                      <p className="font-bold text-slate-900 line-clamp-1">{item.toy.name}</p>
                      <p className="text-[10px] text-slate-500">Qty: {item.quantity} {item.giftWrap && '• 🎁 Gift Wrapped'}</p>
                    </div>
                  </div>
                  <span className="font-black text-slate-900">
                    ${(item.toy.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Pricing Breakdown */}
            <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold text-slate-900">${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax</span>
                <span className="font-bold text-slate-900">${cartTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Express Courier Shipping</span>
                <span className="font-bold text-slate-900">
                  {cartShippingFee === 0 ? <span className="text-emerald-600 font-extrabold">FREE</span> : `$${cartShippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="pt-3 border-t border-slate-200 flex justify-between text-base font-black text-slate-900">
                <span>Total Due</span>
                <span className="text-amber-600">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Submit Order CTA */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full mt-6 py-4 bg-[#FF6A00] hover:bg-[#FF5500] text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2 shadow-md transition-transform active:scale-98 disabled:opacity-50 cursor-pointer"
              id="place-order-submit-btn"
            >
              {isProcessing ? (
                <span className="animate-pulse">Authorizing Trade Assurance Order... 📦</span>
              ) : (
                <>
                  <span>Place Trade Assurance Order • ${cartTotal.toFixed(2)}</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </>
              )}
            </button>

            <p className="text-[10px] text-slate-400 text-center mt-3">
              By clicking Place Order, you authorize Toyland Store to charge your card.
            </p>
          </div>
        </div>

      </form>
    </div>
  );
};
