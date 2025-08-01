import React from 'react';
import { useToyStore, NavTab } from '../context/ToyStoreContext';
import { ShoppingBag, Heart, Package, User, MessageCircle, Search, ShieldCheck, Globe, ChevronDown } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    cartCount,
    wishlistIds,
    searchQuery,
    setSearchQuery,
    setIsCartDrawerOpen,
    setIsChatOpen,
    profile
  } = useToyStore();

  return (
    <header className="sticky top-0 z-30 bg-white text-slate-800 shadow-sm border-b border-slate-200">
      {/* Top Utility Bar */}
      <div className="bg-[#222222] text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-[11px] font-medium">
            <span className="flex items-center gap-1 text-white font-bold">
              <span className="text-[#FF6A00] font-black text-xs">TOYLAND</span> Direct Marketplace
            </span>
            <span className="hidden md:inline-block text-slate-500">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF6A00]" /> Trade Assurance Protected
            </span>
            <span className="hidden lg:inline-block text-slate-500">|</span>
            <span className="hidden lg:inline text-slate-300">
              Factory Direct • MOQ: 1 Piece Available
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <button className="flex items-center gap-1 text-slate-300 hover:text-white">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>Ship to: <strong className="text-white">US / USD ($)</strong></span>
            </button>
            <span className="text-slate-600">|</span>
            <button 
              onClick={() => setActiveTab('orders')}
              className="hover:text-white transition-colors"
            >
              Order Tracking
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4 sm:gap-6">
          
          {/* Toyland Brand Logo in Alibaba Design Style */}
          <button
            onClick={() => setActiveTab('shop')}
            className="flex items-center gap-2.5 text-left group focus:outline-none shrink-0"
            id="brand-logo-btn"
          >
            <div className="w-9 h-9 rounded-lg bg-[#FF6A00] text-white flex items-center justify-center font-black text-xl shadow-sm group-hover:bg-[#FF5500] transition-colors">
              <span className="text-xl font-black tracking-tighter">T</span>
            </div>
            <div>
              <div className="flex items-baseline">
                <span className="text-xl sm:text-2xl font-black tracking-tighter text-[#FF6A00] font-sans">
                  Toyland
                </span>
                <span className="text-[10px] font-extrabold text-slate-500 ml-1.5 tracking-tight uppercase bg-orange-100 text-[#FF6A00] px-1.5 py-0.5 rounded">
                  .com
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider hidden sm:block -mt-1">
                Alibaba Sourcing Marketplace
              </p>
            </div>
          </button>

          {/* Alibaba Iconic Search Bar with Dropdown & Orange Button */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <div className="flex items-center rounded-lg border-2 border-[#FF6A00] bg-white overflow-hidden shadow-xs focus-within:ring-2 focus-within:ring-orange-200">
              
              {/* Category Dropdown Simulator */}
              <div className="hidden lg:flex items-center gap-1 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 border-r border-slate-200 cursor-pointer hover:bg-slate-100">
                <span>Products</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </div>

              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="What toys are you sourcing today? (e.g. STEM rockets, plush, coding bots)"
                  className="w-full bg-white text-slate-900 px-4 py-2 text-sm border-none focus:outline-none font-medium placeholder:text-slate-400"
                  id="header-search-input"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700"
                  >
                    Clear
                  </button>
                )}
              </div>

              <button
                className="bg-[#FF6A00] hover:bg-[#FF5500] text-white px-6 py-2.5 font-bold text-sm flex items-center gap-2 transition-colors cursor-pointer shrink-0"
                id="header-search-submit"
              >
                <Search className="w-4 h-4 text-white" />
                <span className="hidden lg:inline">Search</span>
              </button>
            </div>
          </div>

          {/* Desktop Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Live Chat Support */}
            <button
              onClick={() => {
                setIsChatOpen(true);
                setActiveTab('chat');
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-orange-50 text-[#FF6A00] hover:bg-orange-100 border border-orange-200 font-bold text-xs sm:text-sm transition-all"
              title="Live Chat Support"
              id="header-chat-btn"
            >
              <MessageCircle className="w-4 h-4 text-[#FF6A00]" />
              <span className="hidden lg:inline">Live Chat</span>
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setActiveTab('wishlist')}
              className={`p-2.5 rounded-lg relative transition-colors ${
                activeTab === 'wishlist' ? 'bg-orange-100 text-[#FF6A00]' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
              title="View Wishlist"
              id="header-wishlist-btn"
            >
              <Heart className="w-5 h-5 fill-current" />
              {wishlistIds.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF6A00] text-white text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white">
                  {wishlistIds.length}
                </span>
              )}
            </button>

            {/* Orders */}
            <button
              onClick={() => setActiveTab('orders')}
              className={`p-2.5 rounded-lg relative transition-colors hidden sm:flex items-center ${
                activeTab === 'orders' ? 'bg-orange-100 text-[#FF6A00]' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
              title="Order Tracking"
              id="header-orders-btn"
            >
              <Package className="w-5 h-5" />
            </button>

            {/* User Profile */}
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 p-1 rounded-lg border-2 transition-all hidden sm:flex ${
                activeTab === 'profile' ? 'border-[#FF6A00] ring-2 ring-orange-200' : 'border-slate-200 hover:border-slate-300'
              }`}
              title="My Alibaba Account"
              id="header-profile-btn"
            >
              <img src={profile.avatar} alt="" className="w-7 h-7 rounded-md object-cover" />
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FF6A00] hover:bg-[#FF5500] text-white font-bold text-sm transition-transform active:scale-95 shadow-xs cursor-pointer"
              id="header-cart-btn"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span className="text-xs sm:text-sm font-black">{cartCount}</span>
            </button>

          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-2.5 md:hidden">
          <div className="flex items-center rounded-lg border-2 border-[#FF6A00] bg-white overflow-hidden shadow-xs">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search toys direct from factory..."
              className="w-full bg-white text-slate-900 pl-3 pr-2 py-2 text-xs border-none focus:outline-none font-medium"
              id="mobile-search-input"
            />
            <button className="bg-[#FF6A00] text-white px-3 py-2 font-bold text-xs flex items-center justify-center">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

