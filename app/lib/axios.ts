import axiosLibrary, { AxiosError } from 'axios';
import { configure } from 'axios-hooks';

let onUnauthorizedCallback: (() => void) | null = null;

export const setOnUnauthorizedCallback = (callback: () => void) => {
  onUnauthorizedCallback = callback;
};

export const axios = axiosLibrary.create({
  baseURL: 'https://iot2.allexo.com.br:44310/api',
  withCredentials: true,
});

axios.interceptors.response.use(
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
      console.log(
        'Authentication error detected. Triggering unauthorized callback.',
      );

      if (onUnauthorizedCallback) {
        onUnauthorizedCallback();
      }
    }

    return Promise.reject(error);
  },
);

configure({ axios });
