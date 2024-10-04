import axios from 'axios';

const getToken = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.accessToken;
  };


const api = axios.create({
  baseURL: 'http://localhost:8080',
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;