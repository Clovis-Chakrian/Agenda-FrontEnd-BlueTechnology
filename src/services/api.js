import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5029/api'
});

export { api };