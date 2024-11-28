import http from 'k6/http';
import { check } from 'k6';

export let options = {
  vus: 10, // Number of virtual users
  duration: '30s', // Duration of the test
};

export default function () {
  const url = 'http://localhost:3000/api/users/getUsers';

  const res = http.get(url);

  // Validate response status and response time
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
    'is JSON array': (r) => Array.isArray(JSON.parse(r.body)), // Ensure response is an array
  });
}
