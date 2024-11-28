import type { NextApiRequest, NextApiResponse } from 'next';
import { Event } from '../../../types/event';
import { db } from '../../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string } | { error: string }>
) {
  if (req.method === 'POST') {
    const event: Event = req.body;

    try {
      const eventsRef = collection(db, 'events_test');
      await addDoc(eventsRef, event);
      res.status(201).json({ message: 'Event added successfully' });
    } catch {
      res.status(500).json({ error: 'Failed to add event' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

