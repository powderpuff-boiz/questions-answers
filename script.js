import http from 'k6/http';
import { sleep } from 'k6';
import TOKEN from './config.js';

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
      duration: '1m',
      preAllocatedVUs: 100, // how large the initial pool of VUs would be
      maxVUs: 200, // if the preAllocatedVUs are not enough, we can initialize more
    },
  },
};

export default function () {
  const BASE_URL = 'http://localhost:3003/api';
  const params = {
    headers: {
      Authorization: TOKEN,
      'Content-Type': 'application/json'
    }
  };

  // http.put(`${BASE_URL}/qa/questions/143062/helpful`, null, params);
  // http.put(`${BASE_URL}/qa/questions/976854/report`, null, params);
  http.get(`${BASE_URL}/qa/questions?count=100&product_id=995736`, null, params);
  // http.get(`${BASE_URL}/qa/questions/3434472/answers`, null, params);
  // http.post(`${BASE_URL}/qa/questions`, postQ, params);
  // http.post(`${BASE_URL}/qa/questions/3845671/answers`, postA, params);
  // http.put(`${BASE_URL}/qa/answers/6894572/helpful`, null, params);
  // http.put(`${BASE_URL}/qa/answers/6994572/report`, null, params);

  sleep(1);
}

// stages: [
//   { duration: '2m', target: 200 }, // below normal load
//   { duration: '3m', target: 200 },
//   { duration: '2m', target: 500 }, // normal load
//   { duration: '3m', target: 500 },
//   { duration: '2m', target: 750 }, // around the breaking point
//   { duration: '3m', target: 750 },
//   { duration: '2m', target: 1000 }, // beyond the breaking point
//   { duration: '3m', target: 1000 },
//   { duration: '5m', target: 0 }
// ]


// const responses = http.batch([
//   ['GET', `${BASE_URL}/qa/questions`, { product_id: '40638' }, params],
//   ['POST', `${BASE_URL}/qa/questions`, postQ, params],
//   ['PUT', `${BASE_URL}/qa/questions/:question_id/helpful`, paramsQ, params],
//   ['PUT', `${BASE_URL}/qa/questions/:question_id/report`, paramsQ, params],
//   ['GET', `${BASE_URL}/qa/questions/:question_id/answers`, { id: '331907' }, params],
//   ['POST', `${BASE_URL}/qa/questions/:question_id/answers`, postA, params],
//   ['PUT', `${BASE_URL}/qa/answers/:answer_id/helpful`, paramsA, params],
//   ['PUT', `${BASE_URL}/qa/answers/:answer_id/report`, paramsA, params],
// ]);

