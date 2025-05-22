import { apiClient } from "@/lib/apiClient";
import { CouponFormValues } from "@/types/backend";

export const createCoupon = async (data: CouponFormValues) =>
  apiClient.post(`/api/v1/coupons`, data);

export const getCoupons = async (current: number, pageSize: number) =>
  apiClient.get<IModelPaginate<CouponFormValues>>(
    `/api/v1/coupons?current=${current}&pageSize=${pageSize}`
  );

export const deleteCoupon = async (id: number) =>
  apiClient.delete(`/api/v1/coupons/${id}`);

export const updateCoupon = async (id: number, data: CouponFormValues) =>
  apiClient.patch(`/api/v1/coupons/${id}`, data);

export const getCouponOnly = async (id: number) =>
  apiClient.get<IBackendRes<CouponFormValues>>(`/api/v1/coupons/${id}`);
