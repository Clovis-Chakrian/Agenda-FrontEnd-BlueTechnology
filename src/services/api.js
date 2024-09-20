import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

api.interceptors.response.use(res => {
  if (typeof (res.data) != "object")
    return {
      ...res,
      data: []
    };

  return res;
})

export { api };