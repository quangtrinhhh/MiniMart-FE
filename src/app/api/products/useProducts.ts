import { useQuery } from "@tanstack/react-query";
import { getProductBySlugCategory } from "./product.api";

export const useProductBySlugCategory = (
  slug: string,
  current: number,
  pageSize: number
) => {
  return useQuery({
    queryKey: ["productBySlugCategory", slug, current, pageSize],
    queryFn: () => getProductBySlugCategory(slug, current, pageSize), // gọi đúng hàm API
    staleTime: 5000,
    placeholderData: (previousData) => previousData, // Giữ dữ liệu cũ tránh flickering
  });
};
