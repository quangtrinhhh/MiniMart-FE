"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import { UseFormReturn } from "react-hook-form";
import { ProductFormData } from "@/types/productSchema";
import { Category } from "@/types/backend";
import { useAllParentCategories } from "@/api/categories/useCategries";
import { FormattedNumberInput } from "../admin/FormattedNumberInput";

interface BasicProductInfoCardProps {
  form: UseFormReturn<ProductFormData>;
  categories: Category[];
}

export function BasicProductInfoCard({
  form,
  categories,
}: BasicProductInfoCardProps) {
  const { data: apiCategories = [] } = useAllParentCategories();

  // Gộp categories từ props và từ API, loại bỏ trùng lặp theo `id`
  const mergedCategories: Category[] = React.useMemo(() => {
    const map = new Map<number, Category>();
    apiCategories.forEach((cat) => map.set(cat.id, cat));
    categories.forEach((cat) => map.set(cat.id, cat));
    return Array.from(map.values());
  }, [apiCategories, categories]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin cơ bản</CardTitle>
        <CardDescription>Nhập thông tin cơ bản của sản phẩm</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Tên sản phẩm */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên sản phẩm</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tên sản phẩm" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Giá và giá cũ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá (VNĐ)</FormLabel>
                <FormControl>
                  <FormattedNumberInput
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Nhập giá sản phẩm"
                    min={0}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price_old"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá cũ (VNĐ)</FormLabel>
                <FormControl>
                  <FormattedNumberInput
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Nhập giá cũ (nếu có)"
                    min={0}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Giảm giá và tồn kho */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giảm giá (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nhập % giảm giá"
                    {...field}
                    onChange={(e) =>
                      field.onChange(Number.parseInt(e.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tồn kho</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nhập số lượng tồn kho"
                    {...field}
                    onChange={(e) =>
                      field.onChange(Number.parseInt(e.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Danh mục sản phẩm */}
        <FormField
          control={form.control}
          name="category_ids"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Danh mục</FormLabel>
                <FormDescription>Chọn danh mục cho sản phẩm</FormDescription>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {mergedCategories.map((category) => (
                  <FormField
                    key={category.id}
                    control={form.control}
                    name="category_ids"
                    render={({ field }) => {
                      const checked = field.value?.includes(category.id);
                      return (
                        <FormItem
                          key={category.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={checked}
                              onCheckedChange={(checked) => {
                                const current = field.value || [];
                                if (checked) {
                                  field.onChange([...current, category.id]);
                                } else {
                                  field.onChange(
                                    current.filter(
                                      (id: number | string) =>
                                        id !== category.id
                                    )
                                  );
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {category.name}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Mô tả sản phẩm */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả sản phẩm</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Nhập mô tả chi tiết về sản phẩm"
                  className="min-h-[200px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
