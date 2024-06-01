import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

const defaultOptions = {
  timeout: 5000,
  baseURL: import.meta.env.PROD
    ? "http://110.42.184.111"
    : "http://localhost:3000/release",
};
class Http {
  constructor() {
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }
  static axiosInstance = axios.create(defaultOptions);
  private httpInterceptorsRequest() {
    Http.axiosInstance.interceptors.request.use(
      (config) => config,
      (err) => Promise.reject(err)
    );
  }
  private httpInterceptorsResponse() {
    Http.axiosInstance.interceptors.response.use(
      (response) => response,
      (err) => Promise.reject(err)
    );
  }
  httpRequestGet<T>(url: string, params: AxiosRequestConfig): Promise<T> {
    return Http.axiosInstance
      .get(url, { params })
      .then((res) => res.data)
      .catch();
  }
  httpRequestPost<T>(url: string, params: AxiosRequestConfig): Promise<T> {
    return Http.axiosInstance
      .post(url, params)
      .then((res) => res.data)
      .catch();
  }
}
export const http = new Http();
