import React from 'react';
import { ToyStoreProvider, useToyStore } from './context/ToyStoreContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailPage } from './components/ProductDetailPage';
import { WishlistPage } from './components/WishlistPage';
import { OrderTrackingPage } from './components/OrderTrackingPage';
import { UserProfilePage } from './components/UserProfilePage';
import { CheckoutPage } from './components/CheckoutPage';
import { CartDrawer } from './components/CartDrawer';
import { LiveChatDrawer } from './components/LiveChatDrawer';
import { KidsBackground } from './components/KidsBackground';
import { LegalDocsPage } from './components/LegalDocsPage';

const MainContent: React.FC = () => {
  const { activeTab } = useToyStore();

  return (
    <main className="min-h-screen bg-transparent text-slate-900 relative z-10">
      {activeTab === 'shop' && <ProductGrid />}
      {activeTab === 'product' && <ProductDetailPage />}
      {activeTab === 'wishlist' && <WishlistPage />}
      {activeTab === 'orders' && <OrderTrackingPage />}
      {activeTab === 'profile' && <UserProfilePage />}
      {activeTab === 'checkout' && <CheckoutPage />}
      {activeTab === 'legal' && <LegalDocsPage />}
      {activeTab === 'chat' && <ProductGrid />} {/* Chat opens in drawer */}
    </main>
  );
};

export default function App() {
  return (
    <ToyStoreProvider>
      <div className="min-h-screen bg-[#F5F7FA] flex flex-col font-sans selection:bg-[#FF6A00] selection:text-white relative">
        <KidsBackground />
        <Header />
        <MainContent />
        <CartDrawer />
        <LiveChatDrawer />
        <BottomNav />
      </div>
    </ToyStoreProvider>
  );
}
