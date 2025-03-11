import axios, { AxiosRequestConfig } from "axios";
import queryString from "query-string";

export const sendRequest = async <T>(props: IRequest): Promise<T> => {
  const {
    url,
    method,
    body,
    queryParams = {}, // Mặc định là một object rỗng
    useCredentials = false,
    headers = {},
    nextOption = {},
  } = props;

  // Kiểm tra queryParams có phải object hợp lệ không
  const queryParamsSafe =
    typeof queryParams === "object" && queryParams !== null ? queryParams : {};

  const config: AxiosRequestConfig = {
    method,
    url: `${url}?${queryString.stringify(queryParamsSafe)}`, // Tránh lỗi unknown
    headers: {
      "Content-Type": "application/json",
      ...(headers as Record<string, string>),
    },
    data: body ? JSON.stringify(body) : null,
    withCredentials: useCredentials,
    ...(typeof nextOption === "object" && nextOption !== null
      ? nextOption
      : {}),
  };

  try {
    const response = await axios.request<T>(config);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        statusCode: error.response.status,
        message: error.response.data?.message ?? "",
        error: error.response.data?.error ?? "",
      } as T;
    }
    throw error;
  }
};
