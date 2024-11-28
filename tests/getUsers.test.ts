// tests/getUsers.test.ts
import { createMocks } from 'node-mocks-http';
import getUsers from '../pages/api/users/getUsers';
import { NextApiRequest, NextApiResponse } from 'next';

describe('GET /api/users/getUsers', () => {
  it('should return 200 and an array of users when users exist', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
    });

    await getUsers(req, res);

    // Validate the response
    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(Array.isArray(data)).toBe(true);
    if (data.length > 0) {
      expect(data[0]).toHaveProperty('id');
      expect(data[0]).toHaveProperty('username');
      expect(data[0]).toHaveProperty('email');
    }
  });

  it('should return 404 if no users are found', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
    });

    // Simulate an empty database response
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => [],
    } as unknown as Response);

    await getUsers(req, res);

    // Validate the response
    expect(res._getStatusCode()).toBe(404);
    const data = JSON.parse(res._getData());
    expect(data).toHaveProperty('message', 'No users found.');
  });

  it('should return 500 for internal server errors', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
    });

    // Simulate a database failure
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => {
      throw new Error('Simulated database failure');
    });

    await getUsers(req, res);

    // Validate the response
    expect(res._getStatusCode()).toBe(500);
    const data = JSON.parse(res._getData());
    expect(data).toHaveProperty(
      'error',
      'Failed to fetch users. Please try again later.'
    );
  });

  it('should return 405 for non-GET requests', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST', // Invalid method
    });

    await getUsers(req, res);

    // Validate the response
    expect(res._getStatusCode()).toBe(405);
    const data = JSON.parse(res._getData());
    expect(data).toHaveProperty(
      'error',
      'Method not allowed. Use GET only.'
    );
  });
});
