import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(async (config) => {
  const store = localStorage.getItem('store');
  if (store !== null) {
    const s = JSON.parse(store);
    config.headers.common = { Authorization: `Bearer ${s.token}` };
  }
  return config;
});

export default axiosClient;
