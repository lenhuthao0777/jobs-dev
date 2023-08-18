import Cookies from 'js-cookie';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { signOut } from 'next-auth/react';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: { 'X-Custom-Header': 'foobar' },
});

axiosClient.interceptors.request.use(
  async (request: any) => {
    const token: string = Cookies.get('accessToken') || '';

    if (token) request.headers.Authorization = `Bearer ${token}`;

    return request;
  },
  (err: any) => {
    return { status: err.request.status, request: err.request.data.errors };
  }
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: any) => {
    if (error?.response?.status === 401) {
      // handle logout: clear cookies, move to login page
      await Cookies.remove('accessToken');
      // const url: string = window.location.origin
      // const backToLogin: any = () => {
      //   window.location.href = `${url}/log-in`
      // }
      // await backToLogin()
      await signOut({ callbackUrl: '/signin' });
    }
    if (error?.response?.status === 500) {
      // handle notification for user server error
      // await showToast('error', 'Server error!')
      console.log(error);
    }
    return Promise.reject(error);
  }
);

const ApiService = {
  get: <T>(url: string, obj?: object) => axiosClient.get<T>(url, obj),
  post: <T>(url: string, obj: object, config?: AxiosRequestConfig) =>
    axiosClient.post<T>(url, obj, config),
  patch: <T>(url: string, obj: object) => axiosClient.patch<T>(url, obj),
  put: <T>(url: string, obj: object) => axiosClient.put<T>(url, obj),
  delete: <T>(url: string, obj?: object) => axiosClient.delete<T>(url, obj),
};

export default ApiService;
