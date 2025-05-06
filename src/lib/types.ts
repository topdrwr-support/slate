import { type ClassValue } from 'clsx';

export type UserRole = 'admin' | 'brand' | 'talent' | 'public';

export type EventType = 'Product Launch' | 'Activation' | 'Party' | 'Concert' | 'Podcast';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image?: string;
  favoriteEvents?: string[];
}

export interface Brand {
  id: string;
  name: string;
  location: string;
  category: string;
  description: string;
  pastEvents: string[];
  talentPartners: string[];
  image?: string;
  visibleTo: string[];
}

export interface Talent {
  id: string;
  name: string;
  location: string;
  category: string;
  description: string;
  pastEvents: string[];
  brandPartners: string[];
  image?: string;
  visibleTo: string[];
  premium: boolean;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  hostType: 'brand' | 'talent';
  hostId: string;
  hostName: string;
  applications: string[];
  rsvps: string[];
  visibleTo: string[];
  image?: string;
  hostImage?: string;
  eventType: EventType;
}