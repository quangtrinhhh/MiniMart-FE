"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
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

interface CouponFormValues {
  coupon_code: string;
  coupon_type: CouponType;
  coupon_value: number;
  coupon_start_date: string;
  coupon_end_date: string;
  coupon_min_spend: number;
  coupon_max_spend: number;
  coupon_uses_per_customer: number;
  coupon_uses_per_coupon: number;
  coupon_status: CouponStatus;
}

const CreateCouponForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CouponFormValues>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: CouponFormValues) => {
    setLoading(true);
    try {
      await fetch("/api/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      alert("Mã giảm giá đã được tạo thành công");
    } catch (error) {
      console.error("Lỗi khi tạo mã giảm giá:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="py-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
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

          <div>
            <Label>Loại giảm giá</Label>
            <Select
              onValueChange={(value) =>
                setValue("coupon_type", value as CouponType)
              }
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

          <div>
            <Label>Giá trị giảm</Label>
            <Input
              type="number"
              step="0.01"
              {...register("coupon_value", {
                required: "Giá trị giảm là bắt buộc",
              })}
            />
          </div>

          <div className="flex gap-5 ">
            <div className="w-1/2">
              <Label>Ngày bắt đầu</Label>
              <Input
                type="date"
                {...register("coupon_start_date", {
                  required: "Ngày bắt đầu là bắt buộc",
                })}
              />
            </div>

            <div className="w-1/2">
              <Label>Ngày kết thúc</Label>
              <Input
                type="date"
                {...register("coupon_end_date", {
                  required: "Ngày kết thúc là bắt buộc",
                })}
              />
            </div>
          </div>

          <div>
            <Label>Mức chi tiêu tối thiểu</Label>
            <Input
              type="number"
              step="0.01"
              {...register("coupon_min_spend")}
            />
          </div>

          <div>
            <Label>Mức chi tiêu tối đa</Label>
            <Input
              type="number"
              step="0.01"
              {...register("coupon_max_spend")}
            />
          </div>

          <div>
            <Label>Số lần sử dụng mỗi khách hàng</Label>
            <Input type="number" {...register("coupon_uses_per_customer")} />
          </div>

          <div>
            <Label>Số lần sử dụng tối đa</Label>
            <Input type="number" {...register("coupon_uses_per_coupon")} />
          </div>

          <div>
            <Label>Trạng thái</Label>
            <Select
              onValueChange={(value) =>
                setValue("coupon_status", value as CouponStatus)
              }
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
            {loading ? "Đang tạo..." : "Tạo mã giảm giá"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateCouponForm;
