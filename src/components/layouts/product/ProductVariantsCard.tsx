import React from "react";
import { UseFormReturn } from "react-hook-form";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { ProductFormData } from "@/types/productSchema";
import { FormattedNumberInput } from "../admin/FormattedNumberInput";

interface ProductVariantsCardProps {
  form: UseFormReturn<ProductFormData>;
  addVariant: () => void;
  removeVariant: (index: number) => void;
}

export function ProductVariantsCard({
  form,
  addVariant,
  removeVariant,
}: ProductVariantsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Biến thể sản phẩm</CardTitle>
        <CardDescription>Quản lý các biến thể của sản phẩm</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {form.watch("variants")?.map((_, index) => (
            <div key={index} className="p-4 border rounded-md relative">
              <button
                type="button"
                onClick={() => removeVariant(index)}
                className="absolute top-2 right-2 text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name={`variants.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên biến thể</FormLabel>
                      <FormControl>
                        <Input placeholder="Tên biến thể" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`variants.${index}.price`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giá (VNĐ)</FormLabel>
                      <FormControl>
                        <FormattedNumberInput
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Giá"
                          min={0}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`variants.${index}.old_price`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giá cũ (VNĐ)</FormLabel>
                      <FormControl>
                        <FormattedNumberInput
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Giá cũ"
                          min={0}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`variants.${index}.stock`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tồn kho</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Tồn kho"
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
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={addVariant}
          >
            <Plus className="w-4 h-4 mr-2" />
            Thêm biến thể
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
