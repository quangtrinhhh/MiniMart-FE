"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { type ProductFormData, productSchema } from "@/types/productSchema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProductDetail, useUpdateProduct } from "@/api/products/useProducts";
import { Assets, Attributes, Category, Variant } from "@/types/backend";
import ProductAttributeCard from "./ProductAttributeCard";
import { ProductVariantsCard } from "./ProductVariantsCard";
import { ProductImagesCard } from "./ProductImagesCard";
import { BasicProductInfoCard } from "./BasicProductInfoCard";

interface ProductEditContentProps {
  slug: string;
}

export function ProductEditContent({ slug }: ProductEditContentProps) {
  const router = useRouter();
  const { data, isLoading } = useProductDetail(slug);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedImages, setSelectedImages] = useState<
    { id: number; path: string }[]
  >([]);
  const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // Khởi tạo form với React Hook Form và Zod
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      category_ids: [],
      discount: 0,
      stock: 0,
      description: "",
      price: 0,
      price_old: 0,
      attributes: [],
      variants: [],
    },
  });

  // Cập nhật form khi dữ liệu từ API được tải
  useEffect(() => {
    if (data && !isLoading) {
      try {
        const product = data.data.result;

        // Cập nhật danh mục
        setCategories(product.categories);

        // Cập nhật giá trị mặc định cho form
        form.reset({
          name: product.name,
          category_ids: product.categories.map((cat: Category) => cat.id),
          discount: product.discount,
          stock: product.stock,
          description: product.description,
          price: Number.parseFloat(product.price),
          price_old: Number.parseFloat(product.price_old),
          attributes: product.attributes.map((attributes: Attributes) => ({
            name: attributes.name,
            value: attributes.value,
          })), // Nếu có thuộc tính, bạn sẽ cần chuyển đổi định dạng
          variants: product.variants.map((variant: Variant) => ({
            name: variant.name,
            price: Number.parseFloat(variant.price),
            old_price: Number.parseFloat(variant.old_price),
            stock: variant.stock,
          })),
        });

        // Cập nhật hình ảnh đã chọn
        setSelectedImages(
          product.assets.map((item: Assets) => ({
            id: item.asset.id,
            path: item.asset.path,
          }))
        );
      } catch (error) {
        console.error("Lỗi khi xử lý dữ liệu sản phẩm:", error);
      }
    }
  }, [data, isLoading, form]);

  // Xử lý khi người dùng chọn hình ảnh mới
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setNewImages((prev) => [...prev, ...filesArray]);

      // Tạo URL xem trước cho hình ảnh mới
      const newPreviewUrls = filesArray.map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
    }
  };

  // Xóa hình ảnh đã chọn
  const removeSelectedImage = (id: number) => {
    setDeletedImageIds((prev) => [...prev, id]);
    setSelectedImages((prev) => prev.filter((img) => img.id !== id));
  };

  // Xóa hình ảnh mới
  const removeNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));

    // Giải phóng URL xem trước
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  // Thêm biến thể mới
  const addVariant = () => {
    const currentVariants = form.getValues("variants") || [];
    form.setValue("variants", [
      ...currentVariants,
      { name: "", price: 0, old_price: 0, stock: 0 },
    ]);
  };

  // Xóa biến thể
  const removeVariant = (index: number) => {
    const currentVariants = form.getValues("variants") || [];
    form.setValue(
      "variants",
      currentVariants.filter((_, i) => i !== index)
    );
  };

  // Thêm thuộc tính mới
  const addAttribute = () => {
    const currentAttributes = form.getValues("attributes") || [];
    form.setValue("attributes", [
      ...currentAttributes,
      { name: "", value: "" },
    ]);
  };

  // Xóa thuộc tính
  const removeAttribute = (index: number) => {
    const currentAttributes = form.getValues("attributes") || [];
    form.setValue(
      "attributes",
      currentAttributes.filter((_, i) => i !== index)
    );
  };
  const updateMutation = useUpdateProduct();
  // Xử lý khi người dùng gửi form
  const onSubmit = async (formData: ProductFormData) => {
    try {
      const formDataObj = new FormData();

      // Trường đơn giản
      formDataObj.append("name", formData.name);
      formDataObj.append("price", formData.price.toString());
      formDataObj.append("price_old", (formData.price_old || 0).toString());
      formDataObj.append("discount", formData.discount.toString());
      formDataObj.append("stock", formData.stock.toString());
      formDataObj.append("description", formData.description || "");

      // Mảng category_ids
      formData.category_ids.forEach((id: number) => {
        formDataObj.append("productCategories[]", id.toString());
      });

      // Mảng variants
      formData.variants?.forEach((variant, i) => {
        formDataObj.append(`variants[${i}][name]`, variant.name);
        formDataObj.append(`variants[${i}][price]`, variant.price.toString());
        formDataObj.append(
          `variants[${i}][old_price]`,
          (variant.old_price || 0).toString()
        );
        formDataObj.append(`variants[${i}][stock]`, variant.stock.toString());
      });

      // Mảng attributes
      formData.attributes?.forEach((attr, i) => {
        formDataObj.append(`attributes[${i}][name]`, attr.name);
        formDataObj.append(`attributes[${i}][value]`, attr.value);
      });

      newImages.forEach((file) => formDataObj.append("images", file));

      deletedImageIds.forEach((file) => {
        formDataObj.append("deletedImageIds[]", file.toString());
      });

      for (const pair of formDataObj.entries()) {
        console.log(pair[0], pair[1]);
      }

      // Gọi mutation
      updateMutation.mutate({
        id: Number(data?.data.result.id),
        data: formDataObj,
      });
    } catch (err) {
      console.error("Lỗi khi cập nhật sản phẩm:", err);
    }
  };

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-2">Đang tải...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Chỉnh sửa sản phẩm</h1>
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/products/list")}
        >
          Quay lại
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white">
              <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
              <TabsTrigger value="images">Hình ảnh</TabsTrigger>
              <TabsTrigger value="variants">Biến thể</TabsTrigger>
              <TabsTrigger value="attributes">Thuộc tính</TabsTrigger>
            </TabsList>

            {/* Tab thông tin cơ bản */}
            <TabsContent value="basic" className="space-y-6">
              <BasicProductInfoCard form={form} categories={categories} />;
            </TabsContent>

            {/* Tab hình ảnh */}
            <TabsContent value="images" className="space-y-6">
              <ProductImagesCard
                selectedImages={selectedImages}
                previewUrls={previewUrls}
                handleImageChange={handleImageChange}
                removeSelectedImage={removeSelectedImage}
                removeNewImage={removeNewImage}
              />
            </TabsContent>

            {/* Tab biến thể */}
            <TabsContent value="variants" className="space-y-6">
              <ProductVariantsCard
                form={form}
                addVariant={addVariant}
                removeVariant={removeVariant}
              />
            </TabsContent>

            {/* Tab thuộc tính */}
            <TabsContent value="attributes" className="space-y-6">
              <ProductAttributeCard
                form={form}
                addAttribute={addAttribute}
                removeAttribute={removeAttribute}
              />
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard/products/list")}
              disabled={isLoading}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              )}
              Lưu thay đổi
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
