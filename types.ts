export enum EventType {
  TRANSPORT = 'transport',
  ATTRACTION = 'attraction',
  FOOD = 'food',
  ACCOMMODATION = 'accommodation',
  OTHER = 'other',
}

export interface TripEvent {
  id: string;
  type: EventType;
  time: string;
  title: string;
  location: string; // For Google Maps
  description?: string;
  guideTips?: string; // AI generated story/tips
  highlightTags?: string[]; // "Must Eat", "Must Buy", "Reservation Code"
  cost?: string;
}

export interface DaySchedule {
  date: string;
  weatherInfo: string; // e.g., "Sunny, 28°C"
  events: TripEvent[];
}

export interface FlightInfo {
  route: string;
  time: string;
  number?: string;
}

export interface NearbyPlace {
  name: string;
  type: 'food' | 'massage' | 'coffee';
  note?: string; // e.g., "5 min walk", "Famous for Pho"
}

export interface HotelInfo {
  name: string;
  address?: string;
  dates: string;
  note?: string;
  nearbyPlaces?: NearbyPlace[];
}

export interface BudgetItem {
  category: string;
  description: string;
  amount: number;
  currency: string; // 'TWD' or 'VND'
}

export interface ShoppingItem {
  id: string;
  name: string;
  checked: boolean;
  note?: string;
}

export interface TripData {
  itinerary: DaySchedule[];
  flights: FlightInfo[];
  hotels: HotelInfo[];
  budget: BudgetItem[];
  shoppingList: ShoppingItem[];
  emergencyContacts: { name: string; number: string }[];
}