import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
});

// Attach JWT token from localStorage if available
API.interceptors.request.use((config) => {
  try {
    const stored = localStorage.getItem('trialshopy-admin');
    if (stored) {
      const admin = JSON.parse(stored);
      if (admin?.token) {
        config.headers.Authorization = `Bearer ${admin.token}`;
      }
    }
  } catch {}
  return config;
});

export default API;
