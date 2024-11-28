// pages/api/users/getUsers.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default async function getUsers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Check for a query parameter to simulate an error
    if (req.query.errorTest === 'true') {
      throw new Error('Simulated error');
    }

    const usersRef = collection(db, 'users_test');
    const snapshot = await getDocs(usersRef);

    if (snapshot.empty) {
      return res.status(404).json({ message: 'No users found.' });
    }

    const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    res.status(200).json(users);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}
