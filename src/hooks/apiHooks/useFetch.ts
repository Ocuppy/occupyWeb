import useSWR, { SWRConfig, SWRConfiguration } from "swr";
import { fetcher } from "@/lib/fetcher";

// export const useFectch = ()
export const useFetch = (
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
  data?: any,
  options?: SWRConfiguration,
) => {
  // Using the fetcher that now accepts method and data
  const {
    data: responseData,
    error,
    isLoading,
    mutate,
    isValidating,
  } = useSWR([url, method, data], fetcher, options);

  return {
    data: responseData,
    error,
    isLoading: isLoading,
    isValidating: isValidating,
    mutate,
  };
};
