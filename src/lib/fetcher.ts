import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "./axiosInstance";

export const fetcher = async <T = any>(
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
  data?: any,
): Promise<T> => {
  const token = localStorage.getItem("token");

  const config: AxiosRequestConfig = {
    url,
    method,
    data,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  };

  try {
    const response: AxiosResponse<T> = await axiosInstance(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};
