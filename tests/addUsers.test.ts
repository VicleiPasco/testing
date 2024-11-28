// tests/addUsers.test.ts
import { createMocks } from 'node-mocks-http';
import addUser from '../pages/api/users/addUsers';
import { NextApiRequest, NextApiResponse } from 'next';

describe('POST /api/users/addUsers', () => {
  it('should return 201 and success message when valid data is provided', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: {
        id: 'testUserId',
        username: 'testuser',
        email: 'testuser@example.com',
        preferences: {
          reminderFrequency: 'daily',
          notifications: true,
        },
      },
    });

    await addUser(req, res);

    // Validate the response
    expect(res._getStatusCode()).toBe(201);
    const data = JSON.parse(res._getData());
    expect(data).toHaveProperty('message', 'User added successfully.');
  });

  it('should return 400 for missing required fields', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: {}, // Missing fields
    });

    await addUser(req, res);

    // Validate the response
    expect(res._getStatusCode()).toBe(400);
    const data = JSON.parse(res._getData());
    expect(data).toHaveProperty(
      'error',
      'Missing required fields. Please include id, username, email, and preferences.'
    );
  });

  it('should return 400 for invalid email format', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: {
        id: 'testUserId',
        username: 'testuser',
        email: 'invalid-email',
        preferences: {
          reminderFrequency: 'daily',
          notifications: true,
        },
      },
    });

    await addUser(req, res);

    // Validate the response
    expect(res._getStatusCode()).toBe(400);
    const data = JSON.parse(res._getData());
    expect(data).toHaveProperty('error', 'Invalid email format.');
  });

  it('should return 405 for non-POST requests', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET', // Invalid method
    });

    await addUser(req, res);

    // Validate the response
    expect(res._getStatusCode()).toBe(405);
    const data = JSON.parse(res._getData());
    expect(data).toHaveProperty(
      'error',
      'Method not allowed. Use POST only.'
    );
  });
});
