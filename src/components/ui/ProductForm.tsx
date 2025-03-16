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
import { Progress } from "@/components/ui/progress"; // Import thanh tiến trình
import { useCreateProduct } from "@/hooks/useProduct";

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
  const [progress, setProgress] = useState(0); // Thêm state lưu tiến trình tải

  const { submitProduct, isLoading } = useCreateProduct(
    selectedImages,
    setProgress
  );

  const onSubmit = (data: ProductFormData) => {
    setProgress(10); // Hiển thị tiến trình ban đầu
    submitProduct(data);
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
                {...register("discount", { valueAsNumber: true })}
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
          {isLoading && <Progress value={progress} />}{" "}
          {/* Hiển thị tiến trình khi tải */}
          <Separator />
          <AttributeFields control={control} register={register} />
          <Separator />
          <VariantFields
            control={control}
            register={register}
            setValue={setValue}
            errors={errors}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Đang tải..." : "Tạo sản phẩm"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
