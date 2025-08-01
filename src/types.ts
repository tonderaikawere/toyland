export type AgeGroup = '0-2' | '3-5' | '6-8' | '9-12' | '13+' | 'all';

export type Category = 
  | 'all'
  | 'building'
  | 'educational'
  | 'outdoor'
  | 'dolls'
  | 'puzzles'
  | 'electronics'
  | 'plush'
  | 'vehicles'
  | 'arts-crafts';

export interface Review {
  id: string;
  toyId: string;
  userName: string;
  userAvatar?: string;
  rating: number; // 1-5
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  pros?: string[];
}

export interface ToyProduct {
  id: string;
  name: string;
  brand: string;
  category: Category;
  ageGroup: AgeGroup;
  ageLabel: string; // e.g. "3-5 Years"
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  secondaryImages?: string[];
  description: string;
  features: string[];
  inStock: boolean;
  stockCount: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  tags: string[];
  skillsLearned?: string[]; // e.g. ["Fine Motor Skills", "Problem Solving"]
}

export interface CartItem {
  toy: ToyProduct;
  quantity: number;
  giftWrap: boolean;
  giftNote?: string;
}

export interface ShippingAddress {
  id: string;
  label: string; // e.g., "Home", "Grandparents", "Office"
  fullName: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export type OrderStatus = 'processing' | 'shipped' | 'out_for_delivery' | 'delivered';

export interface TrackingStep {
  title: string;
  date: string;
  completed: boolean;
  location?: string;
  description: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shippingFee: number;
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  paymentMethod: string; // e.g. "Visa ending in 4242"
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
  trackingTimeline: TrackingStep[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  toySuggestions?: ToyProduct[];
  quickReplies?: string[];
}

export interface RecommendationReason {
  toyId: string;
  reason: string;
  badgeText: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  playPoints: number;
  addresses: ShippingAddress[];
  wishlistIds: string[];
  browsingHistoryIds: string[];
}
