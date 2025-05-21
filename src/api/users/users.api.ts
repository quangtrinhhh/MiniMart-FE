import { apiClient } from "@/lib/apiClient";
import { APIResponse, User } from "@/types/backend";
import { useQuery } from "@tanstack/react-query";

export const getUsers = async (
  filter: string,
  current: number,
  pageSize: number
) =>
  apiClient.get<IBackendResPage<User>>(`/api/v1/users`, {
    filter: filter.trim() || undefined,
    current,
    pageSize,
  });
export const useUsers = (search: string, current: number, pageSize: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", search, current, pageSize],
    queryFn: () => getUsers(search, current, pageSize),
    staleTime: 1000 * 60 * 5, // Cache trong 5 phút
  });

  return {
    users: Array.isArray(data?.data?.result) ? data?.data?.result : [],
    totalPages: data?.data.totalPages || 1,
    totalItems: data?.data.totalItems || 0,
    isLoading,
    isError,
  };
};

export const getUser = async () => {
  return apiClient.get<APIResponse<User>>(`/api/v1/users/profile`);
};
