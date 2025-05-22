"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { CouponType, CouponStatus } from "@/types/enum";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useCouponOnly, useUpdateCoupon } from "@/api/coupons/useCoupon";
import type { CouponFormValues } from "@/types/backend";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface UpdateCouponFormProps {
  couponId: number;
}

const UpdateCouponForm = ({ couponId }: UpdateCouponFormProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<CouponFormValues>();
  const [loading, setLoading] = useState(false);
  const { mutate } = useUpdateCoupon();
  const { data } = useCouponOnly(couponId);
  const [couponType, setCouponType] = useState<CouponType | undefined>(
    undefined
  );
  const [couponStatus, setCouponStatus] = useState<CouponStatus | undefined>(
    undefined
  );
  const coupon = data?.data;
  // Set form values when component mounts or coupon changes
  useEffect(() => {
    if (coupon) {
      // Reset form with coupon data
      reset({
        coupon_code: coupon?.coupon_code,
        coupon_type: coupon?.coupon_type,
        coupon_value: coupon?.coupon_value,
        coupon_start_date: formatDateForInput(coupon?.coupon_start_date),
        coupon_end_date: formatDateForInput(coupon?.coupon_end_date),
        coupon_min_spend: coupon?.coupon_min_spend,
        coupon_max_spend: coupon?.coupon_max_spend,
        coupon_uses_per_customer: coupon?.coupon_uses_per_customer,
        coupon_uses_per_coupon: coupon?.coupon_uses_per_coupon,
        coupon_status: coupon?.coupon_status,
      });
      // Set state for select components
      setCouponType(coupon.coupon_type);
      setCouponStatus(coupon.coupon_status);
    }
  }, [coupon, reset]);

  // Helper function to format date for input fields
  const formatDateForInput = (dateString: string | Date) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const onSubmit = async (data: CouponFormValues) => {
    setLoading(true);
    try {
      mutate(
        { id: couponId, data },
        {
          onSuccess: () => {
            toast.success("✅ Mã giảm giá đã được cập nhật thành công");
            router.push("/dashboard/coupon/list");
          },
        }
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật mã giảm giá:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="py-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Label>Mã giảm giá</Label>
            <Input
              {...register("coupon_code", {
                required: "Mã giảm giá là bắt buộc",
              })}
            />
            {errors.coupon_code && (
              <span className="text-red-500">{errors.coupon_code.message}</span>
            )}
          </div>

          <div className="mb-4">
            <Label>Loại giảm giá</Label>
            <Select
              value={couponType}
              onValueChange={(value) => {
                setCouponType(value as CouponType);
                setValue("coupon_type", value as CouponType);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn loại giảm giá" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(CouponType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4">
            <Label>Giá trị giảm</Label>
            <Input
              type="number"
              {...register("coupon_value", {
                required: "Giá trị giảm là bắt buộc",
              })}
            />

            {errors.coupon_value && (
              <span className="text-red-500">
                {errors.coupon_value.message}
              </span>
            )}
          </div>

          <div className="flex gap-5 mb-4">
            <div className="w-1/2">
              <Label>Ngày bắt đầu</Label>
              <Input
                type="date"
                {...register("coupon_start_date", {
                  required: "Ngày bắt đầu là bắt buộc",
                })}
              />
              {errors.coupon_start_date && (
                <span className="text-red-500">
                  {errors.coupon_start_date.message}
                </span>
              )}
            </div>

            <div className="w-1/2">
              <Label>Ngày kết thúc</Label>
              <Input
                type="date"
                {...register("coupon_end_date", {
                  required: "Ngày kết thúc là bắt buộc",
                })}
              />
              {errors.coupon_end_date && (
                <span className="text-red-500">
                  {errors.coupon_end_date.message}
                </span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <Label>Mức chi tiêu tối thiểu</Label>
            <Input type="number" {...register("coupon_min_spend")} />
          </div>

          <div className="mb-4">
            <Label>Mức chi tiêu tối đa</Label>
            <Input type="number" {...register("coupon_max_spend")} />
          </div>

          <div className="mb-4">
            <Label>Số lần sử dụng mỗi khách hàng</Label>
            <Input type="number" {...register("coupon_uses_per_customer")} />
          </div>

          <div className="mb-4">
            <Label>Số lần sử dụng tối đa</Label>
            <Input type="number" {...register("coupon_uses_per_coupon")} />
          </div>

          <div className="mb-4">
            <Label>Trạng thái</Label>
            <Select
              value={couponStatus}
              onValueChange={(value) => {
                setCouponStatus(value as CouponStatus);
                setValue("coupon_status", value as CouponStatus);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(CouponStatus).map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" disabled={loading} className="mt-5">
            {loading ? "Đang cập nhật..." : "Cập nhật mã giảm giá"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdateCouponForm;
