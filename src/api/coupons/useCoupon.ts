import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCoupon,
  deleteCoupon,
  getCouponOnly,
  getCoupons,
  updateCoupon,
} from "./counpon.api";
import { CouponFormValues } from "@/types/backend";

export const useCreateCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
  });
};

export const useGetAllCoupons = (current: number, pageSize: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["coupons"],
    queryFn: () => getCoupons(current, pageSize),
  });
  return {
    data,
    isLoading,
    error,
  };
};

export const useDeleteCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteCoupon(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
  });
};

export const useUpdateCoupon = () => {
  const queryClient = useQueryClient();
  interface UpdateCouponParams {
    id: number;
    data: CouponFormValues;
  }
  return useMutation({
    mutationFn: ({ id, data }: UpdateCouponParams) => updateCoupon(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
  });
};

export const useCouponOnly = (id: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["coupon", id],
    queryFn: () => getCouponOnly(id),
  });
  return {
    data,
    isLoading,
    error,
  };
};
