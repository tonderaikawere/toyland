import React from 'react';
import { useToyStore, NavTab } from '../context/ToyStoreContext';
import { Store, Heart, PackageCheck, UserCircle, MessageSquareText } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, wishlistIds, orders, setIsChatOpen } = useToyStore();

  const navItems: { id: NavTab; label: string; icon: React.FC<{ className?: string }>; badge?: number | string }[] = [
    {
      id: 'shop',
      label: 'Sourcing',
      icon: Store
    },
    {
      id: 'wishlist',
      label: 'Favorites',
      icon: Heart,
      badge: wishlistIds.length > 0 ? wishlistIds.length : undefined
    },
    {
      id: 'orders',
      label: 'Shipments',
      icon: PackageCheck,
      badge: orders.some(o => o.status === 'shipped' || o.status === 'processing') ? '•' : undefined
    },
    {
      id: 'profile',
      label: 'My Toyland',
      icon: UserCircle
    },
    {
      id: 'chat',
      label: 'Chat',
      icon: MessageSquareText,
      badge: 'Help'
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md text-slate-700 border-t border-slate-200 shadow-xl py-2 px-3 sm:px-6 md:max-w-md md:mx-auto md:bottom-4 md:rounded-xl md:border md:border-slate-300">
      <div className="flex items-center justify-around">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (item.id === 'chat') {
                  setIsChatOpen(true);
                }
              }}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-lg transition-all relative ${
                isActive
                  ? 'text-[#FF6A00] bg-orange-50 font-bold scale-102'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
              id={`bottom-nav-${item.id}`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#FF6A00]' : ''}`} />
                {item.badge !== undefined && (
                  <span
                    className={`absolute -top-1.5 -right-2.5 px-1.5 py-0.2 text-[9px] font-black rounded-full ${
                      item.id === 'chat'
                        ? 'bg-[#FF6A00] text-white font-bold'
                        : item.badge === '•'
                        ? 'bg-emerald-500 w-2 h-2 p-0 rounded-full'
                        : 'bg-rose-500 text-white'
                    }`}
                  >
                    {item.badge !== '•' ? item.badge : ''}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight font-bold">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

