import { AxiosRequestConfig } from "axios";
import axiosInstance from "./axiosInstance";
import { FetchResponse } from "./apiTypes";

class APIClient<T, R = T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config: AxiosRequestConfig = {}) => {
    return axiosInstance
      .get<FetchResponse<T>>(`codehub${this.endpoint}`, config)
      .then((res) => res.data);
  };

  get = (id: string) => {
    return axiosInstance
      .get<T>(`codehub${this.endpoint}/${id}`)
      .then((res) => res.data);
  };

  patch = (id: string, updatedInstance: T): Promise<R> => {
    return axiosInstance
      .patch<R>(`codehub${this.endpoint}/${id}`, updatedInstance)
      .then((res) => res.data);
  };
  
  post = (postedInstance: T) => {
    return axiosInstance
      .post(`codehub${this.endpoint}/`, postedInstance)
      .then((res) => res.data);
  };
}

export default APIClient;
