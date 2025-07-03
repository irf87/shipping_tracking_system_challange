import axios from 'axios';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const api = axios.create({
  baseURL: `/api/`,
  headers,
});
