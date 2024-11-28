// /types/event.ts
export interface Event {
    id: string;
    title: string;
    description: string;
    location: {
      lat: number;
      lng: number;
    };
    date: string; // ISO format date string (e.g., "2024-11-15T09:00:00Z")
    participants: string[]; // Array of user IDs who are attending
  }
  