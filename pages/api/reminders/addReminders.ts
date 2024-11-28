// pages/api/reminders/addReminders.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default async function addReminder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { userId, type, scheduledDate, status } = req.body;

  // Check if required fields are present
  if (!userId || !type || !scheduledDate || !status) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  try {
    const remindersRef = collection(db, 'reminders_test');
    await addDoc(remindersRef, { userId, type, scheduledDate, status });
    res.status(201).json({ message: 'Reminder added successfully' });
  } catch (error) {
    console.error('Failed to add reminder:', error);
    res.status(500).json({ error: 'Failed to add reminder' });
  }
}
