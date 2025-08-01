import React, { useState } from 'react';
import { useToyStore } from '../context/ToyStoreContext';
import { Order } from '../types';
import {
  PackageSearch,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Search,
  ExternalLink,
  ChevronRight,
  Gift
} from 'lucide-react';

export const OrderTrackingPage: React.FC = () => {
  const { orders, activeTrackingOrder, setActiveTrackingOrder, trackOrderById } = useToyStore();
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchError, setSearchError] = useState<string>('');

  const currentOrder = activeTrackingOrder || orders[0];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    const found = trackOrderById(searchInput);
    if (!found) {
      setSearchError(`No order found for "${searchInput}". Try order numbers like TY-89234 or TY-77412.`);
    } else {
      setSearchError('');
    }
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return <span className="bg-amber-100 text-amber-900 font-extrabold text-xs px-3 py-1 rounded-full flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Processing</span>;
      case 'shipped':
        return <span className="bg-sky-100 text-sky-900 font-extrabold text-xs px-3 py-1 rounded-full flex items-center gap-1.5"><Truck className="w-3.5 h-3.5" /> In Transit</span>;
      case 'out_for_delivery':
        return <span className="bg-purple-100 text-purple-900 font-extrabold text-xs px-3 py-1 rounded-full flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-purple-600" /> Out for Delivery</span>;
      case 'delivered':
        return <span className="bg-emerald-100 text-emerald-900 font-extrabold text-xs px-3 py-1 rounded-full flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Delivered</span>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28">
      
      {/* Search Order Bar */}
      <div className="bg-slate-900 text-amber-300 rounded-3xl p-6 sm:p-8 mb-8 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl">
          <span className="text-[10px] uppercase font-black tracking-widest bg-amber-400 text-slate-950 px-3 py-1 rounded-full">
            Live Package Radar
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-3 mb-2">
            Track Toy Deliveries Real-Time
          </h1>
          <p className="text-xs text-amber-100/80 mb-5 leading-relaxed">
            Enter your order reference (e.g. <span className="font-mono text-amber-300 font-bold">TY-89234</span>) or courier tracking number to view real-time location.
          </p>

          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Enter Order # or Tracking #"
                value={searchInput}
                onChange={e => {
                  setSearchInput(e.target.value);
                  setSearchError('');
                }}
                className="w-full bg-white text-slate-900 pl-10 pr-4 py-3 text-xs font-bold rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                id="order-tracking-input"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-2xl shadow-md transition-all flex items-center gap-1.5"
              id="search-tracking-btn"
            >
              <PackageSearch className="w-4 h-4" />
              <span>Track</span>
            </button>
          </form>

          {searchError && (
            <p className="text-xs text-rose-300 mt-2 font-bold">{searchError}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: All Orders Quick Selector List */}
        <div className="space-y-3">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-2">
            Your Toy Purchases ({orders.length})
          </h2>

          {orders.map(ord => {
            const isSelected = currentOrder?.id === ord.id;
            return (
              <div
                key={ord.id}
                onClick={() => setActiveTrackingOrder(ord)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-slate-900 bg-amber-50/70 shadow-sm ring-1 ring-slate-900'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
                id={`order-select-${ord.id}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold text-slate-900">{ord.orderNumber}</span>
                  {getStatusBadge(ord.status)}
                </div>

                <div className="flex items-center gap-2">
                  <img
                    src={ord.items[0]?.toy.imageUrl}
                    alt=""
                    className="w-10 h-10 object-cover rounded-lg bg-slate-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800 line-clamp-1">{ord.items[0]?.toy.name}</p>
                    <p className="text-[10px] text-slate-500">{ord.createdAt} • ${ord.totalAmount.toFixed(2)}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Detailed Order Tracking Dashboard */}
        {currentOrder ? (
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              
              {/* Order Tracking Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-black text-slate-900">
                      Order #{currentOrder.orderNumber}
                    </h2>
                    {getStatusBadge(currentOrder.status)}
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    Carrier: <span className="font-bold text-slate-800">{currentOrder.carrier}</span> • Tracking:{' '}
                    <span className="font-mono text-slate-800 font-bold">{currentOrder.trackingNumber}</span>
                  </p>
                </div>

                <div className="bg-amber-100/80 border border-amber-300/80 p-3 rounded-2xl text-right self-start sm:self-auto">
                  <span className="text-[10px] uppercase font-bold text-amber-900">Estimated Arrival</span>
                  <p className="text-sm font-black text-slate-900">{currentOrder.estimatedDelivery}</p>
                </div>
              </div>

              {/* TRACKING TIMELINE PROGRESS STEPS */}
              <div className="py-8">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-6">
                  Live Tracking Timeline
                </h3>

                <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
                  {currentOrder.trackingTimeline.map((step, idx) => (
                    <div key={idx} className="relative flex items-start gap-4">
                      {/* Step Circle Indicator */}
                      <div
                        className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] transition-all ${
                          step.completed
                            ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                            : 'bg-white border-2 border-slate-300 text-slate-400'
                        }`}
                      >
                        {step.completed ? '✓' : idx + 1}
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                          <h4 className={`text-xs font-extrabold ${step.completed ? 'text-slate-900' : 'text-slate-500'}`}>
                            {step.title}
                          </h4>
                          <span className="text-[10px] font-bold text-slate-400">{step.date}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{step.description}</p>
                        {step.location && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md mt-1 border border-amber-200">
                            <MapPin className="w-3 h-3 text-amber-600" /> {step.location}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Items in Order */}
              <div className="pt-6 border-t border-slate-200">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-4">
                  Package Contents ({currentOrder.items.length} Toys)
                </h3>

                <div className="space-y-3">
                  {currentOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
                      <div className="flex items-center gap-3">
                        <img src={item.toy.imageUrl} alt="" className="w-12 h-12 object-cover rounded-xl bg-white" />
                        <div>
                          <p className="text-xs font-extrabold text-slate-900">{item.toy.name}</p>
                          <p className="text-[11px] text-slate-500">Qty: {item.quantity} • Age: {item.toy.ageLabel}</p>
                          {item.giftWrap && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-purple-700 font-bold bg-purple-100 px-2 py-0.2 rounded-md mt-0.5">
                              <Gift className="w-3 h-3" /> Gift Wrapped: "{item.giftNote || 'Happy Holidays!'}"
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-xs font-black text-slate-900">
                        ${(item.toy.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ) : null}

      </div>
    </div>
  );
};
