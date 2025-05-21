import { useQuery } from "@tanstack/react-query";
import { getUser } from "./users.api";

export const useUsers = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
    staleTime: 1000 * 60 * 5, // Cache trong 5 phút
  });
  return {
    user: data?.data || null,
    isLoading,
    isError,
  };
};
