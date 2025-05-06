import { User, UserRole, Event, Brand, Talent } from './types';

// Mock users data
export const users: User[] = [
  { 
    id: '1', 
    name: 'Admin User', 
    email: 'admin@example.com', 
    role: 'admin' as UserRole,
    image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg'
  },
  { 
    id: '2', 
    name: 'SLATE', 
    email: 'brand@example.com', 
    role: 'brand' as UserRole,
    image: 'https://res.cloudinary.com/deom0oxlc/image/upload/v1746479912/SLATE_LOGO_BLACK_aqxpqe.jpg'
  },
  { 
    id: '3', 
    name: 'Talent User', 
    email: 'talent@example.com', 
    role: 'talent' as UserRole,
    image: 'https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg'
  }
];

// Mock talent data
export const talent = [
  {
    id: '1',
    name: 'French Montana',
    category: 'Music',
    description: 'Multi-platinum recording artist and entrepreneur',
    location: 'New York',
    image: 'https://res.cloudinary.com/deom0oxlc/image/upload/v1746474197/aHR0cDovL2ltYWdlLmloZWFydC5jb20vaW1hZ2VzL292ZXJyaWRlLzI4MTU0NV8yZDNjZThmMi02YmQ0LTQzNDQtODhmZi0zY2QwNjk4YWQ5YzAuanBn_2_t9olsu.webp',
    premium: true,
    brandPartners: ['Monster Energy', 'Ciroc', 'PUMA'],
    pastEvents: ['Summer Jam 2024', 'Rolling Loud'],
    visibleTo: ['Music', 'Fashion', 'Entertainment']
  },
  {
    id: '2',
    name: 'Throwing Fits',
    category: 'Fashion',
    description: 'Leading voices in men\'s fashion and culture',
    location: 'New York',
    image: 'https://res.cloudinary.com/deom0oxlc/image/upload/v1746478629/TF_AVI_2_gtbbpr.jpg',
    premium: true,
    brandPartners: ['Shopify', 'Louis Vuitton', 'Chanel'],
    pastEvents: ['Paris Fashion Week', 'Something in the Water Festival'],
    visibleTo: ['Fashion', 'Lifestyle', 'Media']
  },
  {
    id: '3',
    name: 'Jalen Brunson',
    category: 'Sports',
    description: 'Professional basketball player for the New York Knicks',
    location: 'New York',
    image: 'https://res.cloudinary.com/deom0oxlc/image/upload/v1746477661/BRUNSON_AVI_rhomro.jpg',
    premium: true,
    brandPartners: ['Nike', 'NBA', 'New York Knicks'],
    pastEvents: ['NBA All-Star Weekend', 'Knicks Community Event'],
    visibleTo: ['Sports', 'Fashion', 'Entertainment']
  }
];

// Mock brands data (excluding SLATE from public directory)
export const brands = [
  {
    id: '1',
    name: 'Monster Energy',
    category: 'Beverage',
    description: 'Global leader in energy drinks and lifestyle brand',
    location: 'California',
    image: 'https://res.cloudinary.com/deom0oxlc/image/upload/v1746470087/MONSTER_LOGO_zlkche.jpg',
    talentPartners: ['French Montana', 'Don Toliver'],
    pastEvents: ['X Games 2024', 'Monster Energy Supercross'],
    visibleTo: ['Sports', 'Music', 'Entertainment']
  },
  {
    id: '2',
    name: 'Shopify',
    category: 'Retail Services',
    description: 'Leading e-commerce platform empowering entrepreneurs worldwide',
    location: 'Ottawa',
    image: 'https://res.cloudinary.com/deom0oxlc/image/upload/v1746470523/SHOPIFY_LOGO_jec7tv.jpg',
    talentPartners: ['Pharrell Williams'],
    pastEvents: ['Shopify Unite', 'Commerce+ Conference'],
    visibleTo: ['Technology', 'Fashion', 'Business']
  },
  {
    id: '3',
    name: 'Fanatics',
    category: 'E-commerce',
    description: 'Leading global digital sports platform',
    location: 'Jacksonville',
    image: 'https://res.cloudinary.com/deom0oxlc/image/upload/v1746470923/FANATICS_LOGO_yeobyn.jpg',
    talentPartners: ['Don Toliver'],
    pastEvents: ['NBA All-Star Weekend', 'Super Bowl Experience'],
    visibleTo: ['Sports', 'Fashion', 'Entertainment']
  }
];

// SLATE's private brand profile (not shown in directory)
export const slateProfile: Brand = {
  id: '2', // Matches the user ID
  name: 'SLATE',
  category: 'Technology & Entertainment',
  description: 'A revolutionary platform connecting premium brands with elite talent through curated events and meaningful partnerships.',
  location: 'New York',
  image: 'https://res.cloudinary.com/deom0oxlc/image/upload/v1746479912/SLATE_LOGO_BLACK_aqxpqe.jpg',
  talentPartners: ['French Montana', 'Throwing Fits', 'Jalen Brunson'],
  pastEvents: ['SLATE Launch Party', 'Culture & Commerce Summit', 'Future of Entertainment Panel'],
  visibleTo: []  // Empty array means not visible in directory
};

// Mock events data
export const events = [
  {
    id: '1',
    title: 'UNO Tournament',
    date: '2025-05-05T20:00:00Z',
    location: 'New York, NY',
    hostName: 'Pharrell Williams',
    hostType: 'talent',
    hostId: '1',
    description: 'High-stakes UNO tournament hosted by Pharrell Williams',
    image: 'https://res.cloudinary.com/deom0oxlc/image/upload/v1746478807/UNO_PARTY_ktn00n.jpg',
    hostImage: 'https://res.cloudinary.com/deom0oxlc/image/upload/v1746478948/P_saffox.jpg',
    applications: [],
    rsvps: ['user1', 'user2', 'user3'],
    visibleTo: ['Music', 'Entertainment'],
    eventType: 'Party'
  },
  {
    id: '2',
    title: 'The Dare Interview',
    date: '2024-10-15T18:00:00Z',
    location: 'New York, NY',
    hostName: 'Throwing Fits',
    hostType: 'brand',
    hostId: '2',
    description: 'Live podcast interview with The Dare',
    image: 'https://res.cloudinary.com/deom0oxlc/image/upload/v1746472436/THE_DARE_sqmyc1.jpg',
    hostImage: 'https://res.cloudinary.com/deom0oxlc/image/upload/v1746478629/TF_AVI_2_gtbbpr.jpg',
    applications: ['user1', 'user2'],
    rsvps: ['user3', 'user4'],
    visibleTo: ['Music', 'Fashion', 'Entertainment'],
    eventType: 'Podcast'
  },
  {
    id: '3',
    title: 'MET Gala After Party',
    date: '2025-05-05T22:00:00Z',
    location: 'New York, NY',
    hostName: 'A$AP Rocky',
    hostId: '3',
    hostType: 'talent',
    description: 'Exclusive after party following the MET Gala',
    image: 'https://res.cloudinary.com/deom0oxlc/image/upload/v1746472711/RAY_BAN_rf7uzz.jpg',
    hostImage: 'https://res.cloudinary.com/deom0oxlc/image/upload/v1746473225/ROCKY_AVI_rspcp3.jpg',
    applications: ['user1'],
    rsvps: ['user2'],
    visibleTo: ['Fashion', 'Music', 'Entertainment'],
    eventType: 'Party'
  }
];

// Function to get user by role
export const getUserByRole = (role: UserRole): User | undefined => {
  return users.find(user => user.role === role);
};

// Function to get brand profile by ID
export const getBrandProfileById = (id: string): Brand | undefined => {
  return id === slateProfile.id ? slateProfile : brands.find(b => b.id === id);
};

// Add this function to get popular events
export const getPopularEvents = () => {
  return events
    .map(event => ({
      ...event,
      popularity: event.applications.length + event.rsvps.length
    }))
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 3);
};