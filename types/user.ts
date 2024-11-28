// /types/user.ts
export interface User {
    id: string;
    username: string;
    email: string;
    preferences: {
      reminderFrequency: 'daily' | 'weekly';
      notifications: boolean;
    };
  }
  