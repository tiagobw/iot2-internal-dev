import axiosLibrary, { AxiosError } from 'axios';
import { configure } from 'axios-hooks';

export const axios = axiosLibrary.create({
  baseURL: 'https://iot2.allexo.com.br:44310/api',
  withCredentials: true,
});

export const setupInterceptors = (logout: () => void) => {
  axios.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        console.log('Session expired or invalid. Logging out.');
        logout();
      }
      return Promise.reject(error);
    },
  );
};

configure({ axios });
