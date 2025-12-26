
export interface TicketType {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  image: string;
}

export interface Park {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface BookingState {
  selectedDates: string[];
  ticketType: string | null;
  numAdults: number;
  numChildren: number;
  addOns: string[];
  selectedPark: string | null;
  status: 'planning' | 'checkout' | 'success';
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
