// tests/addReminder.test.ts
import { createMocks } from 'node-mocks-http';
import addReminder from '../pages/api/reminders/addReminders';
import { NextApiRequest, NextApiResponse } from 'next';

describe('POST /api/reminders/addReminders', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Mock console.error
  });

  afterAll(() => {
    (console.error as jest.Mock).mockRestore(); // Restore console.error
  });

  it('should add a new reminder and return a success message', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: {
        userId: 'testUserId',
        type: 'garbage',
        scheduledDate: new Date().toISOString(),
        status: 'scheduled',
      },
    });

    await addReminder(req, res);

    expect(res._getStatusCode()).toBe(201);
    const data = JSON.parse(res._getData());
    expect(data).toHaveProperty('message', 'Reminder added successfully');
  });

  it('should handle invalid data with an error', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: {}, // Sending empty data to trigger an error
    });

    await addReminder(req, res);

    expect(res._getStatusCode()).toBe(400); // Expecting 400 for bad requests
    const data = JSON.parse(res._getData());
    expect(data).toHaveProperty('error', 'Missing required fields');
  });
});
