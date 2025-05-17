"use client";

import { Trash2, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { UseFormReturn } from "react-hook-form";
import { ProductFormData } from "@/types/productSchema";

interface ProductAttributeCardProps {
  form: UseFormReturn<ProductFormData>;
  addAttribute: () => void;
  removeAttribute: (index: number) => void;
}

export default function ProductAttributeCard({
  form,
  addAttribute,
  removeAttribute,
}: ProductAttributeCardProps) {
  console.log("attributes", form.watch("attributes"));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thuộc tính sản phẩm</CardTitle>
        <CardDescription>Quản lý các thuộc tính của sản phẩm</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {form
            .watch("attributes")
            ?.map((_: { name: string; value: string }, index: number) => (
              <div key={index} className="p-4 border rounded-md relative">
                <button
                  type="button"
                  onClick={() => removeAttribute(index)}
                  className="absolute top-2 right-2 text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`attributes.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tên thuộc tính</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ví dụ: Màu sắc, Kích thước"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`attributes.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Giá trị</FormLabel>
                        <FormControl>
                          <Input placeholder="Ví dụ: Đỏ, XL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={addAttribute}
          >
            <Plus className="w-4 h-4 mr-2" />
            Thêm thuộc tính
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
