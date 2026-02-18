// Seed data for demo purposes
import { addRide, addPack, addMarketplaceItem, addUser } from './localStorage';

const demoUsers = [
  {
    id: 'demo1',
    email: 'rider1@throttlex.com',
    password: 'demo123',
    name: 'Jake Thunder',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jake',
    joinedDate: new Date('2025-12-01').toISOString(),
    ridesJoined: [],
    ridesCreated: [],
    packsJoined: [],
    marketplaceListings: [],
  },
  {
    id: 'demo2',
    email: 'rider2@throttlex.com',
    password: 'demo123',
    name: 'Sarah Blaze',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    joinedDate: new Date('2025-11-15').toISOString(),
    ridesJoined: [],
    ridesCreated: [],
    packsJoined: [],
    marketplaceListings: [],
  },
  {
    id: 'demo3',
    email: 'rider3@throttlex.com',
    password: 'demo123',
    name: 'Marcus Volt',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus',
    joinedDate: new Date('2025-10-20').toISOString(),
    ridesJoined: [],
    ridesCreated: [],
    packsJoined: [],
    marketplaceListings: [],
  },
];

const demoRides = [
  {
    id: 'ride1',
    title: 'Sunset Canyon Run',
    description: 'Epic sunset ride through the canyon. All skill levels welcome. Breathtaking views guaranteed.',
    date: '2026-03-15',
    time: '18:00',
    maxRiders: 8,
    currentRiders: 4,
    isEV: true,
    location: 'Malibu Canyon, California',
    location_data: { latitude: 34.0259, longitude: -118.7798, formatted_address: 'Malibu Canyon, California' },
    createdBy: 'Jake Thunder',
    createdById: 'demo1',
    riders: ['demo1', 'demo2', 'demo3'],
    image: 'https://images.unsplash.com/photo-1760555961058-fd625e6a0b6d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxtb3RvcmN5Y2xlJTIwcmlkZXIlMjBuaWdodCUyMGNpdHklMjBuZW9uJTIwbGlnaHRzJTIwY2luZW1hdGljfGVufDB8fHx8MTc3MTM5MTc3N3ww&ixlib=rb-4.1.0&q=85',
    comments: [
      { id: 'c1', userId: 'demo2', userName: 'Sarah Blaze', text: 'Can\'t wait for this one!', timestamp: new Date('2026-03-10').toISOString() }
    ],
    createdAt: new Date('2026-02-20').toISOString(),
  },
  {
    id: 'ride2',
    title: 'Night City Circuit',
    description: 'Urban night ride through downtown. Fast pace, neon lights, pure adrenaline.',
    date: '2026-03-20',
    time: '22:00',
    maxRiders: 6,
    currentRiders: 3,
    isEV: false,
    location: 'Downtown Los Angeles',
    location_data: { latitude: 34.0522, longitude: -118.2437, formatted_address: 'Downtown Los Angeles, CA' },
    createdBy: 'Sarah Blaze',
    createdById: 'demo2',
    riders: ['demo2', 'demo1'],
    image: 'https://images.unsplash.com/photo-1669283149120-d539f814aa03?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwcmlkZXIlMjBuaWdodCUyMGNpdHklMjBuZW9uJTIwbGlnaHRzJTIwY2luZW1hdGljfGVufDB8fHx8MTc3MTM5MTc3N3ww&ixlib=rb-4.1.0&q=85',
    comments: [],
    createdAt: new Date('2026-02-25').toISOString(),
  },
  {
    id: 'ride3',
    title: 'Mountain Peak Challenge',
    description: 'Challenging mountain ride. Experienced riders only. 2000ft elevation gain.',
    date: '2026-03-25',
    time: '08:00',
    maxRiders: 5,
    currentRiders: 2,
    isEV: true,
    location: 'San Gabriel Mountains',
    location_data: { latitude: 34.2407, longitude: -118.0554, formatted_address: 'San Gabriel Mountains, CA' },
    createdBy: 'Marcus Volt',
    createdById: 'demo3',
    riders: ['demo3'],
    image: 'https://images.unsplash.com/photo-1760555961058-fd625e6a0b6d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxtb3RvcmN5Y2xlJTIwcmlkZXIlMjBuaWdodCUyMGNpdHklMjBuZW9uJTIwbGlnaHRzJTIwY2luZW1hdGljfGVufDB8fHx8MTc3MTM5MTc3N3ww&ixlib=rb-4.1.0&q=85',
    comments: [],
    createdAt: new Date('2026-03-01').toISOString(),
  },
];

const demoPacks = [
  {
    id: 'pack1',
    name: 'Night Riders',
    description: 'Urban explorers who live for the night. We ride fast, we ride together.',
    createdBy: 'Jake Thunder',
    createdById: 'demo1',
    members: ['demo1', 'demo2', 'demo3'],
    image: 'https://images.unsplash.com/photo-1760555961058-fd625e6a0b6d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxtb3RvcmN5Y2xlJTIwcmlkZXIlMjBuaWdodCUyMGNpdHklMjBuZW9uJTIwbGlnaHRzJTIwY2luZW1hdGljfGVufDB8fHx8MTc3MTM5MTc3N3ww&ixlib=rb-4.1.0&q=85',
    upcomingRides: 2,
    scheduledRides: [
      { id: 'sr1', rideId: 'ride1', rideName: 'Sunset Canyon Run', date: '2026-03-15' },
      { id: 'sr2', rideId: 'ride2', rideName: 'Night City Circuit', date: '2026-03-20' }
    ],
    createdAt: new Date('2025-12-10').toISOString(),
  },
  {
    id: 'pack2',
    name: 'EV Warriors',
    description: 'Electric vehicle enthusiasts pushing the limits of sustainable performance.',
    createdBy: 'Sarah Blaze',
    createdById: 'demo2',
    members: ['demo2', 'demo3'],
    image: 'https://images.unsplash.com/photo-1669283149120-d539f814aa03?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwcmlkZXIlMjBuaWdodCUyMGNpdHklMjBuZW9uJTIwbGlnaHRzJTIwY2luZW1hdGljfGVufDB8fHx8MTc3MTM5MTc3N3ww&ixlib=rb-4.1.0&q=85',
    upcomingRides: 1,
    scheduledRides: [
      { id: 'sr3', rideId: 'ride3', rideName: 'Mountain Peak Challenge', date: '2026-03-25' }
    ],
    createdAt: new Date('2026-01-05').toISOString(),
  },
];

const demoMarketplaceItems = [
  {
    id: 'item1',
    name: 'Carbon Fiber Helmet',
    description: 'Professional grade carbon fiber helmet. DOT certified. Like new condition. Size L.',
    price: 299,
    isBidding: false,
    sellerId: 'demo1',
    sellerName: 'Jake Thunder',
    sellerRating: 4.8,
    image: 'https://images.unsplash.com/photo-1649027421785-6827863f0891?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAxODF8MHwxfHNlYXJjaHwzfHxjYXJib24lMjBmaWJlciUyMG1vdG9yY3ljbGUlMjBoZWxtZXQlMjBsdXh1cnklMjBnZWFyfGVufDB8fHx8MTc3MTM5MTc4MXww&ixlib=rb-4.1.0&q=85',
    createdAt: new Date('2026-02-10').toISOString(),
  },
  {
    id: 'item2',
    name: 'Racing Leather Jacket',
    description: 'Premium leather racing jacket with armor inserts. Barely used. Size M.',
    currentBid: 450,
    startingBid: 400,
    isBidding: true,
    bids: [
      { id: 'b1', userId: 'demo3', userName: 'Marcus Volt', amount: 420, timestamp: new Date('2026-02-28').toISOString() },
      { id: 'b2', userId: 'demo2', userName: 'Sarah Blaze', amount: 450, timestamp: new Date('2026-03-01').toISOString() }
    ],
    sellerId: 'demo2',
    sellerName: 'Sarah Blaze',
    sellerRating: 5.0,
    image: 'https://images.unsplash.com/photo-1764725719060-93162d70dac3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTB8MHwxfHNlYXJjaHwxfHxyYWNpbmclMjBsZWF0aGVyJTIwamFja2V0JTIwYmxhY2slMjBjaW5lbWF0aWMlMjBsaWdodGluZ3xlbnwwfHx8fDE3NzEzOTE3ODJ8MA&ixlib=rb-4.1.0&q=85',
    createdAt: new Date('2026-02-20').toISOString(),
  },
  {
    id: 'item3',
    name: 'Performance Gloves',
    description: 'High-grip racing gloves with carbon fiber knuckles. Brand new.',
    price: 89,
    isBidding: false,
    sellerId: 'demo3',
    sellerName: 'Marcus Volt',
    sellerRating: 4.5,
    image: 'https://images.unsplash.com/photo-19297045/pexels-photo-19297045.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    createdAt: new Date('2026-02-25').toISOString(),
  },
];

export const seedDemoData = () => {
  // Check if already seeded
  if (localStorage.getItem('throttlex_seeded') === 'true') {
    return;
  }

  // Add demo users
  demoUsers.forEach(user => {
    const users = JSON.parse(localStorage.getItem('throttlex_users') || '[]');
    if (!users.find(u => u.id === user.id)) {
      users.push(user);
      localStorage.setItem('throttlex_users', JSON.stringify(users));
    }
  });

  // Add demo rides
  demoRides.forEach(ride => {
    const rides = JSON.parse(localStorage.getItem('throttlex_rides') || '[]');
    if (!rides.find(r => r.id === ride.id)) {
      rides.push(ride);
      localStorage.setItem('throttlex_rides', JSON.stringify(rides));
    }
  });

  // Add demo packs
  demoPacks.forEach(pack => {
    const packs = JSON.parse(localStorage.getItem('throttlex_packs') || '[]');
    if (!packs.find(p => p.id === pack.id)) {
      packs.push(pack);
      localStorage.setItem('throttlex_packs', JSON.stringify(packs));
    }
  });

  // Add demo marketplace items
  demoMarketplaceItems.forEach(item => {
    const items = JSON.parse(localStorage.getItem('throttlex_marketplace') || '[]');
    if (!items.find(i => i.id === item.id)) {
      items.push(item);
      localStorage.setItem('throttlex_marketplace', JSON.stringify(items));
    }
  });

  // Mark as seeded
  localStorage.setItem('throttlex_seeded', 'true');
};

export const resetDemoData = () => {
  localStorage.removeItem('throttlex_seeded');
  seedDemoData();
};