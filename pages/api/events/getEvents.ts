// pages/api/events/getEvents.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default async function getEvents(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Check for a query parameter to simulate an error
    if (req.query.errorTest === 'true') {
      throw new Error('Simulated error');
    }

    const eventsRef = collection(db, 'events_test');
    const snapshot = await getDocs(eventsRef);
    const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.status(200).json(events);
  } catch (error) {
    console.error('Failed to fetch events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
}
