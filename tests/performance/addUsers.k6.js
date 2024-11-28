import http from 'k6/http';
import { check } from 'k6';

export let options = {
  vus: 10, // Number of virtual users
  duration: '30s', // Duration of the test
};

export default function () {
  const url = 'http://localhost:3000/api/users/addUsers'; // Adjust for your server
  const payload = JSON.stringify({
    id: 'testUserId',
    username: 'testuser',
    email: 'testuser@example.com',
    preferences: {
      reminderFrequency: 'daily',
      notifications: true,
    },
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  // Validate response status and response time
  check(res, {
    'status is 201': (r) => r.status === 201,
    'response time < 200ms': (r) => r.timings.duration < 200,
  });
}
