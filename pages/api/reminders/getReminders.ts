// pages/api/reminders/getReminders.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default async function getReminders(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Check for a query parameter to simulate an error
    if (req.query.errorTest === 'true') {
      throw new Error('Simulated error');
    }

    const remindersRef = collection(db, 'reminders_test');
    const snapshot = await getDocs(remindersRef);
    const reminders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.status(200).json(reminders);
  } catch (error) {
    console.error('Failed to fetch reminders:', error);
    res.status(500).json({ error: 'Failed to fetch reminders' });
  }
}
