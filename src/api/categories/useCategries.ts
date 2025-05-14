import { useQuery } from "@tanstack/react-query";
import {
  getAllParentCategories,
  getCategories,
  getCategoryMenu,
} from "./category.api";

export const useCategories = (
  filter: string,
  current: number,
  pageSize: number
) => {
  return useQuery({
    queryKey: ["categories", filter, current, pageSize],
    queryFn: () => getCategories(filter, current, pageSize),
    staleTime: 5000,
    placeholderData: (previousData) => previousData, // Giữ dữ liệu cũ tránh flickering
  });
};

export const useMenu = () => {
  return useQuery({
    queryKey: ["menu"],
    queryFn: () => getCategoryMenu(),
    staleTime: 5000,
    placeholderData: (previousData) => previousData, // Giữ dữ liệu cũ tránh flickering
  });
};

export const useAllParentCategories = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["category"],
    queryFn: () => getAllParentCategories(),
  });
  return {
    data: data?.data.result,
    isLoading,
    error,
  };
};
