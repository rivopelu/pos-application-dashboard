import axios, { AxiosRequestConfig } from 'axios';
import { ENV } from '../constants/env.ts';

export const RootEndpoint = ENV.ENDPOINT;

export class HttpService {
  private baseEndpoint = RootEndpoint;
  private token: string | null = localStorage.getItem('token');

  private HeaderSetting(): AxiosRequestConfig {
    return {
      headers: {
        Authorization: this.token ? `Bearer ${this.token}` : null,
      },
    };
  }

  public GET(url: string) {
    return axios.get(this.baseEndpoint + url, this.HeaderSetting());
  }

  public POST<T>(URL: string, data: T) {
    return axios.post(this.baseEndpoint + URL, data, this.HeaderSetting());
  }

  public PUT<T>(URL: string, data: T) {
    return axios.put(this.baseEndpoint + URL, data, this.HeaderSetting());
  }

  public PATCH(URL: string) {
    return axios.patch(this.baseEndpoint + URL, undefined, this.HeaderSetting());
  }

  public DELETE(URL: string) {
    return axios.delete(this.baseEndpoint + URL, this.HeaderSetting());
  }
}
