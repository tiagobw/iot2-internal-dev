import axiosLibrary, { AxiosError } from 'axios';
import { configure } from 'axios-hooks';

export const axios = axiosLibrary.create({
  baseURL: 'https://iot2.allexo.com.br:44310/api',
  withCredentials: true,
});

export const setupInterceptors = (logout: () => void) => {
  const interceptorId = axios.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (!error.response) {
        return Promise.reject(error);
      }

      const { status, data } = error.response;

      const isUnauthorized = status === 401;

      const responseBodyAsString = JSON.stringify(data).toLowerCase();
      const hasTokenErrorMessage =
        status >= 400 && status < 500 && responseBodyAsString.includes('token');

      if (isUnauthorized || hasTokenErrorMessage) {
        console.log('Authentication error detected. Logging out.');
        logout();
      }

      return Promise.reject(error);
    },
  );

  return interceptorId;
};

export const ejectInterceptors = (interceptorId: number) => {
  axios.interceptors.response.eject(interceptorId);
};

configure({ axios });
