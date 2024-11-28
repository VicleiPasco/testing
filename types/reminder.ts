// /types/reminder.ts
export interface Reminder {
    id: string;
    userId: string;
    type: 'garbage' | 'recycling' | 'compost';
    scheduledDate: string;
    status: 'scheduled' | 'completed';
  }
  