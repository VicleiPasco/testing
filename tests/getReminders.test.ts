// tests/getReminders.test.ts
import { createMocks } from 'node-mocks-http';
import getReminders from '../pages/api/reminders/getReminders';
import { NextApiRequest, NextApiResponse } from 'next';

describe('GET /api/reminders/getReminders', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Mock console.error
  });

  afterAll(() => {
    (console.error as jest.Mock).mockRestore(); // Restore console.error
  });

  it('should return an array of reminders', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
    });

    await getReminders(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(Array.isArray(data)).toBe(true);
  });

  it('should handle errors gracefully', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      query: { errorTest: 'true' }, // Trigger the simulated error
    });

    await getReminders(req, res);

    expect(res._getStatusCode()).toBe(500);
    const data = JSON.parse(res._getData());
    expect(data).toHaveProperty('error');
  });
});
