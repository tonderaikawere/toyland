import { ToyProduct, Review, ShippingAddress, Order, UserProfile } from '../types';

export const INITIAL_TOYS: ToyProduct[] = [
  {
    id: 'toy-1',
    name: 'Galactic Explorer Builder Rocket',
    brand: 'SpaceCraft Toys',
    category: 'building',
    ageGroup: '6-8',
    ageLabel: '6-8 Years',
    price: 34.99,
    originalPrice: 42.99,
    rating: 4.8,
    reviewCount: 128,
    imageUrl: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=800&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Fuel your future astronaut’s creativity! This 420-piece magnetic space shuttle kit comes with interactive LED launch lights, sound modules, and astronaut figures.',
    features: [
      '420 snaps & magnetic structural blocks',
      'Battery-operated sound effects & glowing LEDs',
      'Includes 3 astronaut mini-figures',
      'BPA-free non-toxic heavy duty ABS material'
    ],
    inStock: true,
    stockCount: 18,
    isBestSeller: true,
    isNew: false,
    tags: ['STEM', 'Space', 'Building', 'Light-up'],
    skillsLearned: ['Spatial Awareness', 'Problem Solving', 'Engineering']
  },
  {
    id: 'toy-2',
    name: 'Soft Huggles Pastel Teddy Bear',
    brand: 'CuddlePal',
    category: 'plush',
    ageGroup: '0-2',
    ageLabel: '0-2 Years',
    price: 18.99,
    originalPrice: 24.99,
    rating: 4.9,
    reviewCount: 210,
    imageUrl: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=800&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Ultra-soft, organic plush teddy bear designed for cozy bedtime snuggles and gentle sensory soothing for infants and toddlers.',
    features: [
      '100% GOTS certified organic cotton',
      'Hypoallergenic plush stuffing',
      'Machine washable gently',
      'Embroidered eyes for infant safety'
    ],
    inStock: true,
    stockCount: 42,
    isBestSeller: true,
    tags: ['Plush', 'Baby', 'Soothing', 'Organic'],
    skillsLearned: ['Sensory Comfort', 'Emotional Bonding']
  },
  {
    id: 'toy-3',
    name: 'Wooden Rainbow Stacking Arch',
    brand: 'EcoPlay Kids',
    category: 'educational',
    ageGroup: '3-5',
    ageLabel: '3-5 Years',
    price: 26.50,
    rating: 4.7,
    reviewCount: 94,
    imageUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
    description: 'Handcrafted Montessori rainbow wooden stacking arch. Encourages open-ended imaginative play, tunnels, bridges, and balance challenges.',
    features: [
      '12 smooth natural wood arches',
      'Non-toxic water-based food-safe dyes',
      'Durable solid pine wood construction',
      'Montessori approved open-ended design'
    ],
    inStock: true,
    stockCount: 15,
    isNew: true,
    tags: ['Montessori', 'Wooden', 'Rainbow', 'Creative'],
    skillsLearned: ['Color Recognition', 'Hand-Eye Coordination', 'Fine Motor Skills']
  },
  {
    id: 'toy-4',
    name: 'RoboBot Smart Coding Rover',
    brand: 'TechKids Lab',
    category: 'electronics',
    ageGroup: '9-12',
    ageLabel: '9-12 Years',
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.8,
    reviewCount: 162,
    imageUrl: 'https://images.unsplash.com/photo-1563207153-f403bf289096?auto=format&fit=crop&w=800&q=80',
    description: 'An interactive programmable robot that teaches block coding, obstacle avoidance, and voice command responses.',
    features: [
      'Scratch & drag-and-drop block programming',
      'Ultrasonic distance sensors & line followers',
      'Bluetooth app control and remote included',
      'Rechargeable USB-C lithium battery'
    ],
    inStock: true,
    stockCount: 9,
    isBestSeller: true,
    tags: ['Coding', 'Robotics', 'STEM', 'App-Controlled'],
    skillsLearned: ['Logic Coding', 'Computational Thinking', 'Robotics']
  },
  {
    id: 'toy-5',
    name: 'Championship Speed Race Track',
    brand: 'NitroWheels',
    category: 'vehicles',
    ageGroup: '6-8',
    ageLabel: '6-8 Years',
    price: 44.99,
    rating: 4.6,
    reviewCount: 88,
    imageUrl: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=800&q=80',
    description: 'High-speed dual loop track set with motorized booster launcher and two die-cast race cars for thrilling racing duels.',
    features: [
      'Dual 360-degree gravity loops',
      'High-torque motorized car launcher',
      'Includes 2 metal die-cast 1:64 race cars',
      'Over 14 feet of customizable track tubing'
    ],
    inStock: true,
    stockCount: 22,
    tags: ['Racing', 'Vehicles', 'Action', 'Speed'],
    skillsLearned: ['Physics Basics', 'Friendly Competition']
  },
  {
    id: 'toy-6',
    name: 'Deluxe Watercolor & Clay Art Set',
    brand: 'Artistic Minds',
    category: 'arts-crafts',
    ageGroup: '6-8',
    ageLabel: '6-8 Years',
    price: 29.99,
    originalPrice: 35.00,
    rating: 4.9,
    reviewCount: 75,
    imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80',
    description: 'Complete art studio in a portable wooden case! Contains 24 watercolor pans, air-dry modeling clay, sculpting tools, and drawing pads.',
    features: [
      '24 non-toxic rich pigment watercolors',
      '12 packs of soft air-dry colorful clay',
      'Wooden easel box organizer',
      'Includes instructional beginner art guide'
    ],
    inStock: true,
    stockCount: 30,
    isNew: true,
    tags: ['Art', 'Crafts', 'Painting', 'Clay'],
    skillsLearned: ['Creative Expression', 'Color Blending', 'Patience']
  },
  {
    id: 'toy-7',
    name: 'Solar System 3D Glow Puzzle',
    brand: 'CosmoPuzzles',
    category: 'puzzles',
    ageGroup: '9-12',
    ageLabel: '9-12 Years',
    price: 22.99,
    rating: 4.7,
    reviewCount: 112,
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    description: '500-piece glow-in-the-dark orbital puzzle featuring detailed planets, constellations, and a display stand.',
    features: [
      '500 precision interlocking puzzle pieces',
      'High-grade glow paint layer',
      'Includes educational planet fact card',
      'Eco-friendly recycled card stock'
    ],
    inStock: true,
    stockCount: 25,
    tags: ['Puzzle', 'Glow', 'Space', 'Geography'],
    skillsLearned: ['Focus & Patience', 'Astronomy']
  },
  {
    id: 'toy-8',
    name: 'Mini Farmer Tractor & Trailer Set',
    brand: 'Country Farm',
    category: 'vehicles',
    ageGroup: '3-5',
    ageLabel: '3-5 Years',
    price: 21.99,
    rating: 4.8,
    reviewCount: 64,
    imageUrl: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
    description: 'Chunky friction-powered farm tractor with detachable hay trailer, farmer figurine, and 4 farm animal friends.',
    features: [
      'Friction push-and-go motor (no batteries needed)',
      'Removable animal figures',
      'Chunky design easy for small hands',
      'Durable drop-proof plastic'
    ],
    inStock: true,
    stockCount: 14,
    tags: ['Farm', 'Tractor', 'Pretend Play'],
    skillsLearned: ['Storytelling', 'Motor Control']
  },
  {
    id: 'toy-9',
    name: 'All-Weather Outdoor Explorer Kit',
    brand: 'WildScout',
    category: 'outdoor',
    ageGroup: '6-8',
    ageLabel: '6-8 Years',
    price: 27.99,
    originalPrice: 32.99,
    rating: 4.8,
    reviewCount: 140,
    imageUrl: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
    description: 'Turn backyard play into a wilderness expedition! Includes real 8x21 binoculars, LED hand-crank flashlight, bug catcher, and compass.',
    features: [
      'Real optical glass 8x magnification binoculars',
      'No-battery hand crank dynamo flashlight',
      'Magnifying bug container with tweezers',
      'Camouflage field backpack included'
    ],
    inStock: true,
    stockCount: 19,
    isBestSeller: true,
    tags: ['Outdoor', 'Nature', 'Explorer', 'STEM'],
    skillsLearned: ['Curiosity', 'Nature Observation', 'Navigation']
  },
  {
    id: 'toy-10',
    name: 'Interactive Baby Musical Activity Gym',
    brand: 'LittleGiggles',
    category: 'educational',
    ageGroup: '0-2',
    ageLabel: '0-2 Years',
    price: 49.99,
    rating: 4.9,
    reviewCount: 185,
    imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
    description: 'Soft padded play mat with kick piano keyboard, hanging teether toys, baby-safe mirror, and soothing lullaby tunes.',
    features: [
      '5-key kick-and-play lighted piano',
      '4 detachable sensory rattles & teethers',
      'Machine-washable thick plush mat',
      'Volume control switch'
    ],
    inStock: true,
    stockCount: 11,
    tags: ['Infant', 'Music', 'Playmat', 'Teething'],
    skillsLearned: ['Kick Coordination', 'Auditory Stimulation']
  },
  {
    id: 'toy-11',
    name: 'Dream Princess Wooden Dollhouse',
    brand: 'RoyalPlay',
    category: 'dolls',
    ageGroup: '3-5',
    ageLabel: '3-5 Years',
    price: 89.99,
    originalPrice: 109.99,
    rating: 4.9,
    reviewCount: 96,
    imageUrl: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=800&q=80',
    description: '3-story majestic wooden mansion featuring 5 rooms, working sliding elevator, balcony, and 17 handcrafted furniture pieces.',
    features: [
      '3 feet tall solid wooden structure',
      '17 miniature hand-painted furniture items',
      'Smooth sliding elevator',
      'Fits standard 11.5-inch fashion dolls'
    ],
    inStock: true,
    stockCount: 6,
    isBestSeller: true,
    tags: ['Dollhouse', 'Pretend Play', 'Wooden'],
    skillsLearned: ['Roleplay', 'Social Empathy', 'Spatial Planning']
  },
  {
    id: 'toy-12',
    name: 'CyberDrone HD Camera Quadcopter',
    brand: 'AeroTech',
    category: 'electronics',
    ageGroup: '13+',
    ageLabel: '13+ Years',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.6,
    reviewCount: 110,
    imageUrl: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80',
    description: 'High-performance foldable drone featuring 1080p HD live video transmission, altitude hold mode, 360-degree flips, and gesture controls.',
    features: [
      '1080p HD wide-angle adjustable camera',
      'One-key takeoff & landing + headless mode',
      'Dual modular batteries for up to 28 mins flight',
      'Compact foldable pocket design'
    ],
    inStock: true,
    stockCount: 12,
    isNew: true,
    tags: ['Drone', 'Camera', 'Teens', 'Tech'],
    skillsLearned: ['Piloting Coordination', 'Aerial Photography']
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    toyId: 'toy-1',
    userName: 'Sarah M.',
    rating: 5,
    date: '2026-07-15',
    comment: 'My 7-year-old son absolutely loves this rocket kit! The light-up LEDs and launch sounds made him feel like a real NASA engineer. Extremely sturdy blocks!',
    verifiedPurchase: true,
    helpfulCount: 18,
    pros: ['Light-up LEDs', 'Clear guide', 'Sturdy magnetic clips']
  },
  {
    id: 'rev-2',
    toyId: 'toy-1',
    userName: 'David K.',
    rating: 4,
    date: '2026-07-02',
    comment: 'Great quality building set. The magnetic connectors hold firmly. Took about 45 minutes for my daughter to complete with minimal help.',
    verifiedPurchase: true,
    helpfulCount: 7
  },
  {
    id: 'rev-3',
    toyId: 'toy-2',
    userName: 'Emily R.',
    rating: 5,
    date: '2026-06-28',
    comment: 'Unbelievably soft! The organic cotton was super important for my 8-month-old nephew. He carries it everywhere now.',
    verifiedPurchase: true,
    helpfulCount: 24,
    pros: ['Ultra soft', 'Safe embroidered eyes', 'Washable']
  },
  {
    id: 'rev-4',
    toyId: 'toy-4',
    userName: 'Mark T.',
    rating: 5,
    date: '2026-07-20',
    comment: 'The coding app is fantastic. It starts with simple puzzle-like coding blocks so my 10yo could program obstacle navigation within 20 minutes!',
    verifiedPurchase: true,
    helpfulCount: 12,
    pros: ['Great app', 'Rechargeable', 'Fun line following']
  }
];

export const INITIAL_ADDRESSES: ShippingAddress[] = [
  {
    id: 'addr-1',
    label: 'Home (Default)',
    fullName: 'Alex Morgan',
    street: '742 Evergreen Terrace',
    apartment: 'Apt 4B',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62704',
    country: 'United States',
    phone: '+1 (555) 234-5678',
    isDefault: true
  },
  {
    id: 'addr-2',
    label: 'Grandma’s House',
    fullName: 'Eleanor Morgan',
    street: '128 Maplewood Avenue',
    city: 'Oak Park',
    state: 'IL',
    zipCode: '60302',
    country: 'United States',
    phone: '+1 (555) 987-6543',
    isDefault: false
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'TY-89234',
    createdAt: '2026-07-22',
    items: [
      {
        toy: INITIAL_TOYS[0], // Galactic Explorer
        quantity: 1,
        giftWrap: true,
        giftNote: 'Happy 7th Birthday Leo! Love, Uncle Alex'
      }
    ],
    subtotal: 34.99,
    tax: 2.80,
    shippingFee: 0.00,
    totalAmount: 37.79,
    status: 'shipped',
    shippingAddress: INITIAL_ADDRESSES[0],
    paymentMethod: 'Visa ending in 4242',
    trackingNumber: 'TRK-9821-4410-US',
    carrier: 'ToyExpress Expedited',
    estimatedDelivery: 'Tomorrow by 4:00 PM',
    trackingTimeline: [
      { title: 'Order Placed', date: 'Jul 22, 09:30 AM', completed: true, description: 'Order received and payment confirmed' },
      { title: 'Packed & Gift Wrapped', date: 'Jul 22, 02:15 PM', completed: true, description: 'Wrapped with eco ribbon & personal card' },
      { title: 'In Transit with Express Courier', date: 'Jul 23, 08:00 AM', completed: true, location: 'Distribution Hub - Chicago IL', description: 'Package scanned on delivery truck' },
      { title: 'Out for Delivery', date: 'Expected Jul 24, 09:00 AM', completed: false, location: 'Local Postal Depot', description: 'Driver departing for delivery' },
      { title: 'Delivered', date: 'Expected Jul 24', completed: false, description: 'Will be left at front door' }
    ]
  },
  {
    id: 'ord-1000',
    orderNumber: 'TY-77412',
    createdAt: '2026-06-10',
    items: [
      {
        toy: INITIAL_TOYS[1], // Soft Huggles
        quantity: 2,
        giftWrap: false
      }
    ],
    subtotal: 37.98,
    tax: 3.04,
    shippingFee: 4.99,
    totalAmount: 46.01,
    status: 'delivered',
    shippingAddress: INITIAL_ADDRESSES[1],
    paymentMethod: 'Mastercard ending in 8819',
    trackingNumber: 'TRK-1092-3321-US',
    carrier: 'ToyExpress Standard',
    estimatedDelivery: 'Delivered Jun 14',
    trackingTimeline: [
      { title: 'Order Placed', date: 'Jun 10', completed: true, description: 'Order confirmed' },
      { title: 'Processing', date: 'Jun 11', completed: true, description: 'Items gathered' },
      { title: 'Shipped', date: 'Jun 12', completed: true, description: 'En route' },
      { title: 'Delivered', date: 'Jun 14, 02:40 PM', completed: true, location: 'Front Porch', description: 'Handed to resident' }
    ]
  }
];

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Alex Morgan',
  email: 'alex.morgan@example.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  playPoints: 340,
  addresses: INITIAL_ADDRESSES,
  wishlistIds: ['toy-3', 'toy-6'],
  browsingHistoryIds: ['toy-1', 'toy-4', 'toy-7']
};
