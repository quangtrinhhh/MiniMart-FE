"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import ImageUpload from "./ImageUpload";
import CategorySelect from "./CategorySelect";
import AttributeFields from "./AttributeFields";
import VariantFields from "./VariantFields";
import { ProductFormData, productSchema } from "@/types/productSchema";
import PriceInput from "./PriceInput";

export default function ProductForm() {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      category_ids: [],
      attributes: [{ name: "", value: "" }],
      variants: [{ name: "", price: 0, old_price: 0, stock: 0 }],
    },
  });

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const onSubmit = async (data: ProductFormData) => {
    console.log("Dữ liệu sản phẩm:", data);
    console.log("Hình ảnh đã chọn:", selectedImages);
  };

  return (
    <Card className="max-w-5xl mx-auto p-6">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Tên sản phẩm</Label>
            <Input {...register("name")} placeholder="Nhập tên sản phẩm " />
            <p className="text-red-500 text-sm">{errors.name?.message}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <PriceInput
              setValue={setValue}
              register={register}
              errors={errors}
            />
            <CategorySelect
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              setValue={setValue}
              errors={errors}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Giảm giá (%)</Label>
              <Input
                type="number"
                placeholder="Nhập % giảm giá"
                {...register("discount", {
                  required: "Vui lòng nhập phần trăm giảm giá",
                  min: { value: 0, message: "Giảm giá không thể âm" },
                  max: {
                    value: 100,
                    message: "Giảm giá không thể lớn hơn 100%",
                  },
                  valueAsNumber: true, // Đảm bảo dữ liệu là số
                })}
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (value < 0) value = 0;
                  if (value > 100) value = 100;
                  e.target.value = value.toString();
                }}
              />
              {errors.discount && (
                <p className="text-red-500 text-sm">
                  {errors.discount.message}
                </p>
              )}
            </div>

            <div>
              <Label>Tồn kho</Label>
              <Input
                type="number"
                placeholder="Nhập số lượng tồn kho"
                {...register("stock", { valueAsNumber: true })}
              />
              <p className="text-red-500 text-sm">{errors.stock?.message}</p>
            </div>
          </div>

          <div>
            <Label>Mô tả</Label>
            <Textarea
              {...register("description")}
              placeholder="Nhập mô tả sản phẩm"
            />
            <p className="text-red-500 text-sm">
              {errors.description?.message}
            </p>
          </div>
          <div>
            <Label>Ảnh sản phẩm</Label>
            <ImageUpload setSelectedImages={setSelectedImages} />
          </div>

          <Separator />
          <AttributeFields control={control} register={register} />
          <Separator />
          <VariantFields
            control={control}
            register={register}
            setValue={setValue}
            errors={errors}
          />

          <Button type="submit" className="w-full">
            Tạo sản phẩm
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
