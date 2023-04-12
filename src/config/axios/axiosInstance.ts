/* eslint-disable camelcase */
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

const axiosInstance = axios.create({
  baseURL: '',
  // baseURL: 'https://bookres.azurewebsites.net/v1',
  headers: {
    'Content-Type': 'application/json'
     //Authorization:
    //   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRAZW1haWwuY29tIiwicm9sZSI6IkFkbWluIiwibmJmIjoxNjQzODMyOTY5LCJleHAiOjE2NDY0MjQ5NjksImlhdCI6MTY0MzgzMjk2OX0.svp7asSBEsWxz8XcuXVAju2ptN2gn8S7OwPfbGP69O0',
  },
});

export interface ICustomAxiosRequestConfig extends AxiosRequestConfig {
  retry?: boolean;
  'axios-retry'?: {
    retryCount: number;
  };
}

const axiosIntercept = (): void => {
  axiosInstance.interceptors.request.use(
    config => config,
    error => Promise.reject(error),
  );

  axiosInstance.interceptors.response.use(
    response => response,
    (error: AxiosError) => Promise.reject(error),
  );
};

export { axiosIntercept };
export default axiosInstance;
