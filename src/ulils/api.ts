import axios, { AxiosRequestConfig } from "axios";
import queryString from "query-string";

export const sendRequest = async <T>(props: IRequest): Promise<T> => {
  let {
    url,
    method,
    body,
    queryParams = {},
    useCredentials = false,
    headers = {},
    nextOption = {},
  } = props;

  const config: AxiosRequestConfig = {
    method,
    url: `${url}?${queryString.stringify(queryParams)}`,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    data: body ? JSON.stringify(body) : null,
    withCredentials: useCredentials,
    ...nextOption,
  };

  try {
    const response = await axios.request<T>(config);
    return response.data;
  } catch (error: any) {
    return {
      statusCode: error.response?.status,
      message: error.response?.data?.message ?? "",
      error: error.response?.data?.error ?? "",
    } as T;
  }
};

export const sendRequestFile = async <T>(props: IRequest): Promise<T> => {
  let {
    url,
    method,
    body,
    queryParams = {},
    useCredentials = false,
    headers = {},
    nextOption = {},
  } = props;

  const config: AxiosRequestConfig = {
    method,
    url: `${url}?${queryString.stringify(queryParams)}`,
    headers: {
      ...headers,
    },
    data: body ? body : null,
    withCredentials: useCredentials,
    ...nextOption,
  };

  try {
    const response = await axios.request<T>(config);
    return response.data;
  } catch (error: any) {
    return {
      statusCode: error.response?.status,
      message: error.response?.data?.message ?? "",
      error: error.response?.data?.error ?? "",
    } as T;
  }
};
