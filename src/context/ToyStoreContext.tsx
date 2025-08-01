import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ToyProduct,
  CartItem,
  ShippingAddress,
  Order,
  Review,
  UserProfile,
  AgeGroup,
  Category,
  ChatMessage,
  RecommendationReason
} from '../types';
import {
  INITIAL_TOYS,
  INITIAL_REVIEWS,
  INITIAL_ADDRESSES,
  INITIAL_ORDERS,
  INITIAL_USER_PROFILE
} from '../data/mockData';

export type NavTab = 'shop' | 'wishlist' | 'orders' | 'profile' | 'chat' | 'product' | 'checkout' | 'order_success' | 'legal';

interface ToyStoreContextType {
  // Navigation & View
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  selectedToy: ToyProduct | null;
  openProductDetail: (toy: ToyProduct) => void;
  closeProductDetail: () => void;

  // Catalog & Filtering
  toys: ToyProduct[];
  selectedAgeGroup: AgeGroup;
  setSelectedAgeGroup: (age: AgeGroup) => void;
  selectedCategory: Category;
  setSelectedCategory: (cat: Category) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'reviews';
  setSortBy: (sort: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'reviews') => void;
  filteredToys: ToyProduct[];

  // Wishlist
  wishlistIds: string[];
  toggleWishlist: (toyId: string) => void;
  isWishlisted: (toyId: string) => void;
  clearWishlist: () => void;

  // Cart & Checkout
  cart: CartItem[];
  addToCart: (toy: ToyProduct, quantity?: number, giftWrap?: boolean, giftNote?: string) => void;
  removeFromCart: (toyId: string) => void;
  updateCartQuantity: (toyId: string, delta: number) => void;
  toggleGiftWrap: (toyId: string) => void;
  updateGiftNote: (toyId: string, note: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartTax: number;
  cartShippingFee: number;
  cartTotal: number;
  cartCount: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;

  // Shipping Addresses Management
  addresses: ShippingAddress[];
  addAddress: (addr: Omit<ShippingAddress, 'id'>) => void;
  updateAddress: (id: string, addr: Partial<ShippingAddress>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  defaultAddress: ShippingAddress | undefined;

  // Orders & Tracking
  orders: Order[];
  activeTrackingOrder: Order | null;
  setActiveTrackingOrder: (order: Order | null) => void;
  trackOrderById: (orderIdOrNumber: string) => boolean;
  placeOrder: (shippingAddress: ShippingAddress, paymentMethod: string) => Order;

  // Reviews
  reviews: Review[];
  getToyReviews: (toyId: string) => Review[];
  addToyReview: (toyId: string, review: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => void;

  // User Profile
  profile: UserProfile;
  updateProfile: (updated: Partial<UserProfile>) => void;

  // Recommendations
  recommendations: RecommendationReason[];
  isLoadingRecommendations: boolean;
  fetchRecommendations: () => Promise<void>;

  // Live Chat
  chatMessages: ChatMessage[];
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  sendChatMessage: (text: string) => Promise<void>;
}

const ToyStoreContext = createContext<ToyStoreContextType | undefined>(undefined);

export const ToyStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [activeTab, setActiveTab] = useState<NavTab>('shop');
  const [selectedToy, setSelectedToy] = useState<ToyProduct | null>(null);

  // Catalog & Filtering
  const [toys] = useState<ToyProduct[]>(INITIAL_TOYS);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup>('all');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'reviews'>('featured');

  // User Profile & Addresses
  const [profile, setProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [addresses, setAddresses] = useState<ShippingAddress[]>(INITIAL_ADDRESSES);

  // Wishlist State
  const [wishlistIds, setWishlistIds] = useState<string[]>(INITIAL_USER_PROFILE.wishlistIds);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([
    { toy: INITIAL_TOYS[0], quantity: 1, giftWrap: true, giftNote: 'For Leo!' }
  ]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);

  // Orders State
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(INITIAL_ORDERS[0]);

  // Reviews State
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);

  // Recommendations State
  const [recommendations, setRecommendations] = useState<RecommendationReason[]>([
    { toyId: 'toy-1', reason: 'Top recommended rocket builder for creative space exploration.', badgeText: 'Best STEM Pick' },
    { toyId: 'toy-4', reason: 'High-rated coding robot matching your previous STEM activity.', badgeText: 'Top Pick' },
    { toyId: 'toy-3', reason: 'Open-ended wooden stacking rainbow loved by top reviewers.', badgeText: 'Customer Favorite' }
  ]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState<boolean>(false);

  // Live Chat State
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: "👋 Hi! Welcome to Toyland! I'm PlayPal, your Toy Assistant. Ask me for gift suggestions by age, order tracking updates, or store policies!",
      timestamp: 'Just now',
      quickReplies: ['Gifts for 3-5 Years', 'Track My Order', 'Top STEM Toys', 'Best Sellers']
    }
  ]);

  // Navigation handlers
  const openProductDetail = (toy: ToyProduct) => {
    setSelectedToy(toy);
    setActiveTab('product');
    // Add to browsing history
    if (!profile.browsingHistoryIds.includes(toy.id)) {
      setProfile(prev => ({
        ...prev,
        browsingHistoryIds: [toy.id, ...prev.browsingHistoryIds].slice(0, 10)
      }));
    }
  };

  const closeProductDetail = () => {
    setSelectedToy(null);
    setActiveTab('shop');
  };

  // Filtered Toys logic
  const filteredToys = toys.filter(toy => {
    // Age filter
    if (selectedAgeGroup !== 'all' && toy.ageGroup !== selectedAgeGroup) {
      return false;
    }
    // Category filter
    if (selectedCategory !== 'all' && toy.category !== selectedCategory) {
      return false;
    }
    // Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = toy.name.toLowerCase().includes(q);
      const matchBrand = toy.brand.toLowerCase().includes(q);
      const matchDesc = toy.description.toLowerCase().includes(q);
      const matchTags = toy.tags.some(t => t.toLowerCase().includes(q));
      if (!matchName && !matchBrand && !matchDesc && !matchTags) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
    return 0; // featured default
  });

  // Wishlist Handlers
  const toggleWishlist = (toyId: string) => {
    setWishlistIds(prev => {
      const exists = prev.includes(toyId);
      if (exists) return prev.filter(id => id !== toyId);
      return [...prev, toyId];
    });
  };

  const isWishlisted = (toyId: string) => wishlistIds.includes(toyId);

  const clearWishlist = () => setWishlistIds([]);

  // Cart Handlers
  const addToCart = (toy: ToyProduct, quantity = 1, giftWrap = false, giftNote = '') => {
    setCart(prev => {
      const existing = prev.find(item => item.toy.id === toy.id);
      if (existing) {
        return prev.map(item =>
          item.toy.id === toy.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { toy, quantity, giftWrap, giftNote }];
    });
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (toyId: string) => {
    setCart(prev => prev.filter(item => item.toy.id !== toyId));
  };

  const updateCartQuantity = (toyId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.toy.id === toyId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const toggleGiftWrap = (toyId: string) => {
    setCart(prev =>
      prev.map(item =>
        item.toy.id === toyId ? { ...item, giftWrap: !item.giftWrap } : item
      )
    );
  };

  const updateGiftNote = (toyId: string, note: string) => {
    setCart(prev =>
      prev.map(item =>
        item.toy.id === toyId ? { ...item, giftNote: note } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  // Cart calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.toy.price * item.quantity), 0);
  const cartGiftWrapTotal = cart.reduce((acc, item) => acc + (item.giftWrap ? 3.99 : 0), 0);
  const cartTax = Number((cartSubtotal * 0.08).toFixed(2));
  const cartShippingFee = cartSubtotal >= 50 || cartSubtotal === 0 ? 0 : 5.99;
  const cartTotal = Number((cartSubtotal + cartGiftWrapTotal + cartTax + cartShippingFee).toFixed(2));
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Address Handlers
  const addAddress = (addr: Omit<ShippingAddress, 'id'>) => {
    const newId = `addr-${Date.now()}`;
    const newAddress: ShippingAddress = { ...addr, id: newId };
    if (addr.isDefault || addresses.length === 0) {
      setAddresses(prev => prev.map(a => ({ ...a, isDefault: false })).concat(newAddress));
    } else {
      setAddresses(prev => [...prev, newAddress]);
    }
  };

  const updateAddress = (id: string, updated: Partial<ShippingAddress>) => {
    setAddresses(prev =>
      prev.map(a => {
        if (a.id === id) {
          const merged = { ...a, ...updated };
          return merged;
        }
        if (updated.isDefault) {
          return { ...a, isDefault: false };
        }
        return a;
      })
    );
  };

  const deleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
  };

  const setDefaultAddress = (id: string) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
  };

  const defaultAddress = addresses.find(a => a.isDefault) || addresses[0];

  // Order Handlers
  const placeOrder = (shippingAddress: ShippingAddress, paymentMethod: string): Order => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `TY-${randomNum}`;
    const orderId = `ord-${Date.now()}`;
    const today = new Date().toISOString().split('T')[0];

    const newOrder: Order = {
      id: orderId,
      orderNumber,
      createdAt: today,
      items: [...cart],
      subtotal: cartSubtotal,
      tax: cartTax,
      shippingFee: cartShippingFee,
      totalAmount: cartTotal,
      status: 'processing',
      shippingAddress,
      paymentMethod,
      trackingNumber: `TRK-${Math.floor(1000 + Math.random() * 9000)}-${orderNumber}`,
      carrier: 'ToyExpress Standard Courier',
      estimatedDelivery: 'In 2-3 Business Days',
      trackingTimeline: [
        { title: 'Order Placed & Confirmed', date: 'Just now', completed: true, description: 'Order received and being processed' },
        { title: 'Quality Check & Packing', date: 'In progress', completed: true, description: 'Items gathered in toy warehouse' },
        { title: 'Handed to Courier', date: 'Expected Tomorrow', completed: false, description: 'Package dispatch pending' },
        { title: 'Out for Delivery', date: 'Expected in 2 days', completed: false, description: 'Driver on delivery route' },
        { title: 'Delivered', date: 'Expected in 3 days', completed: false, description: 'Safe delivery at door' }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveTrackingOrder(newOrder);
    // Add points
    setProfile(prev => ({
      ...prev,
      playPoints: prev.playPoints + Math.floor(cartTotal * 10)
    }));
    clearCart();
    return newOrder;
  };

  const trackOrderById = (orderIdOrNumber: string): boolean => {
    const term = orderIdOrNumber.trim().toLowerCase();
    const found = orders.find(
      o => o.id.toLowerCase() === term || o.orderNumber.toLowerCase() === term || o.trackingNumber.toLowerCase() === term
    );
    if (found) {
      setActiveTrackingOrder(found);
      setActiveTab('orders');
      return true;
    }
    return false;
  };

  // Reviews Handlers
  const getToyReviews = (toyId: string) => {
    return reviews.filter(r => r.toyId === toyId);
  };

  const addToyReview = (toyId: string, reviewData: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      helpfulCount: 0
    };
    setReviews(prev => [newRev, ...prev]);
  };

  // User Profile
  const updateProfile = (updated: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updated }));
  };

  // Recommendations Fetcher
  const fetchRecommendations = async () => {
    setIsLoadingRecommendations(true);
    try {
      const res = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderHistory: orders.map(o => o.items.map(i => i.toy.name)),
          wishlist: wishlistIds.map(id => toys.find(t => t.id === id)?.name),
          browsingHistory: profile.browsingHistoryIds.map(id => toys.find(t => t.id === id)?.name),
          preferredAge: selectedAgeGroup
        })
      });
      const data = await res.json();
      if (data.recommendations && Array.isArray(data.recommendations)) {
        setRecommendations(data.recommendations);
      }
    } catch (e) {
      console.error('Failed to fetch recommendations:', e);
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  // Send Live Chat Message
  const sendChatMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          currentToy: selectedToy,
          userContext: {
            name: profile.name,
            cartCount,
            ordersCount: orders.length
          }
        })
      });
      const data = await res.json();

      const suggestedToys = data.suggestedToyIds
        ? toys.filter(t => data.suggestedToyIds.includes(t.id))
        : [];

      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: data.reply || "I'd be glad to help you pick the best toy!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        toySuggestions: suggestedToys,
        quickReplies: data.quickReplies || ['Show Best Sellers', 'Gifts for 6-8 Years']
      };

      setChatMessages(prev => [...prev, assistantMsg]);
    } catch (e) {
      console.error('Chat error:', e);
      const fallbackMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: "I'm always here to help! Feel free to browse our age-categorized collections or track an order directly in the Orders tab.",
        timestamp: 'Just now',
        quickReplies: ['Browse Toys', 'Track Order']
      };
      setChatMessages(prev => [...prev, fallbackMsg]);
    }
  };

  return (
    <ToyStoreContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedToy,
        openProductDetail,
        closeProductDetail,
        toys,
        selectedAgeGroup,
        setSelectedAgeGroup,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        filteredToys,
        wishlistIds,
        toggleWishlist,
        isWishlisted,
        clearWishlist,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        toggleGiftWrap,
        updateGiftNote,
        clearCart,
        cartSubtotal,
        cartTax,
        cartShippingFee,
        cartTotal,
        cartCount,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        addresses,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        defaultAddress,
        orders,
        activeTrackingOrder,
        setActiveTrackingOrder,
        trackOrderById,
        placeOrder,
        reviews,
        getToyReviews,
        addToyReview,
        profile,
        updateProfile,
        recommendations,
        isLoadingRecommendations,
        fetchRecommendations,
        chatMessages,
        isChatOpen,
        setIsChatOpen,
        sendChatMessage
      }}
    >
      {children}
    </ToyStoreContext.Provider>
  );
};

export const useToyStore = () => {
  const context = useContext(ToyStoreContext);
  if (!context) {
    throw new Error('useToyStore must be used within ToyStoreProvider');
  }
  return context;
};
