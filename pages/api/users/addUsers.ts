// pages/api/users/addUsers.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default async function addUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { id, username, email, preferences } = req.body;

  // Check if required fields are present
  if (!id || !username || !email || !preferences) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  try {
    const usersRef = collection(db, 'users_test');
    await addDoc(usersRef, { id, username, email, preferences });
    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    console.error('Failed to add user:', error);
    res.status(500).json({ error: 'Failed to add user' });
  }
}
