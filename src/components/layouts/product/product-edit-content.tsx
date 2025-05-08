"use client";

import { useState } from "react";
import Image from "next/image";
import { Trash2, Plus, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define types for our mock data
interface ProductEditContentProps {
  slug: string;
}

// Mock data for the product
const mockProduct = {
  id: 23,
  name: "Túi Nước Giặt Xả MaxKleen Thiên Nhiên Vườn hoa thanh khiết 3.6kg",
  price: "15000.00",
  slug: "tui-nuoc-giat-xa-maxkleen-thien-nhien-vuon-hoa-thanh-khiet-3.6kg",
  description:
    "Vườn hoa thanh khiết\n\nMaxKleen là sản phẩm tiên phong trong công nghệ kết hợp Giặt & Xả 2 trong 1, giúp tiết kiệm chi phí, thời gian và công sức cho người tiêu dùng.\nVới công nghệ đột phá Enzyme Kép đột phá với 100% thành phần làm sạch nguồn gốc thiên nhiên & chiết xuất tơ tằm, giúp giặt mạnh mẻ & xả dịu êm mà vô cùng an toàn cho da, dịu nhẹ với vải và thân thiện với môi trường.",
  discount: "13",
  stock: 905,
  sold: 157,
  status: true,
  featured: false,
  categories: [
    {
      id: 1,
      name: "Chăm sóc gia đình",
      slug: "cham-soc-gia-dinh",
      image: "https://i.imgur.com/VcB8bKM.jpeg",
    },
    {
      id: 6,
      name: "Nước lâu sàn",
      slug: "nuoc-lau-san",
      image: "https://i.imgur.com/XANaMxH.jpeg",
    },
  ],
  assets: [
    {
      id: 49,
      asset: {
        id: 59,
        path: "https://i.imgur.com/XANaMxH.jpeg",
      },
    },
    {
      id: 50,
      asset: {
        id: 60,
        path: "https://i.imgur.com/XANaMxH.jpeg",
      },
    },
    {
      id: 51,
      asset: {
        id: 61,
        path: "https://i.imgur.com/XANaMxH.jpeg",
      },
    },
  ],
  variants: [
    {
      id: 21,
      name: "2L",
      price: "167000.00",
      old_price: "182000.00",
      SKU: "2L-01-0023-00",
    },
    {
      id: 22,
      name: "3L",
      price: "202000.00",
      old_price: "230000.00",
      SKU: "3L-01-0023-00",
    },
  ],
  attributes: [
    {
      name: "Xuất xứ",
      value: "Việt Nam",
    },
    {
      name: "Thương hiệu",
      value: "Peace Mass",
    },
    {
      name: "Hạn bảo hành",
      value: "Không bảo hành",
    },
  ],
};

// Define the form schema with Zod
const productFormSchema = z.object({
  name: z.string().min(3, { message: "Tên sản phẩm phải có ít nhất 3 ký tự" }),
  price: z.string().min(1, { message: "Giá không được để trống" }),
  description: z
    .string()
    .min(10, { message: "Mô tả phải có ít nhất 10 ký tự" }),
  discount: z.string().optional(),
  stock: z.coerce.number().min(0, { message: "Số lượng không được âm" }),
  status: z.boolean().default(true),
  featured: z.boolean().default(false),
  categoryIds: z
    .array(z.number())
    .min(1, { message: "Phải chọn ít nhất 1 danh mục" }),
  variants: z.array(
    z.object({
      id: z.number().optional(),
      name: z.string().min(1, { message: "Tên biến thể không được để trống" }),
      price: z.string().min(1, { message: "Giá không được để trống" }),
      old_price: z.string().optional(),
      SKU: z.string().optional(),
    })
  ),
  attributes: z.array(
    z.object({
      name: z
        .string()
        .min(1, { message: "Tên thuộc tính không được để trống" }),
      value: z.string().min(1, { message: "Giá trị không được để trống" }),
    })
  ),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

export function ProductEditContent({ slug }: ProductEditContentProps) {
  const [isSaving, setIsSaving] = useState(false);
  console.log(slug, "slug");

  // Initialize form with mock product data
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: mockProduct.name,
      price: mockProduct.price,
      description: mockProduct.description,
      discount: mockProduct.discount,
      stock: mockProduct.stock,
      status: mockProduct.status,
      featured: mockProduct.featured,
      categoryIds: mockProduct.categories.map((cat) => cat.id),
      variants: mockProduct.variants,
      attributes: mockProduct.attributes,
    },
  });

  // Handle form submission (just for UI demonstration)
  function onSubmit(values: ProductFormValues) {
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Form values:", values);
      setIsSaving(false);
    }, 1500);
  }

  // Add new variant
  const addVariant = () => {
    const currentVariants = form.getValues("variants") || [];
    form.setValue("variants", [
      ...currentVariants,
      { name: "", price: "", old_price: "", SKU: "" },
    ]);
  };

  // Remove variant
  const removeVariant = (index: number) => {
    const currentVariants = form.getValues("variants") || [];
    form.setValue(
      "variants",
      currentVariants.filter((_, i) => i !== index)
    );
  };

  // Add new attribute
  const addAttribute = () => {
    const currentAttributes = form.getValues("attributes") || [];
    form.setValue("attributes", [
      ...currentAttributes,
      { name: "", value: "" },
    ]);
  };

  // Remove attribute
  const removeAttribute = (index: number) => {
    const currentAttributes = form.getValues("attributes") || [];
    form.setValue(
      "attributes",
      currentAttributes.filter((_, i) => i !== index)
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Basic Information */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Thông tin cơ bản</h2>

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

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Giá (VND)</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập giá" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="discount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Giảm giá (%)</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập % giảm giá" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số lượng trong kho</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Nhập số lượng"
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

                <div className="flex space-x-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Hiển thị sản phẩm</FormLabel>
                          <FormDescription>
                            Sản phẩm sẽ được hiển thị trên trang web
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="featured"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Sản phẩm nổi bật</FormLabel>
                          <FormDescription>
                            Sản phẩm sẽ được hiển thị ở mục nổi bật
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Hình ảnh sản phẩm</h2>

                <div className="grid grid-cols-3 gap-4">
                  {mockProduct.assets.map((asset) => (
                    <div key={asset.id} className="relative group">
                      <Image
                        src={asset.asset.path || "/placeholder.svg"}
                        alt="Product image"
                        width={200}
                        height={200}
                        className="rounded-md object-cover w-full aspect-square"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md">
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="border-2 border-dashed border-muted-foreground/20 rounded-md flex items-center justify-center aspect-square cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col items-center gap-1 text-muted-foreground">
                      <Plus className="h-8 w-8" />
                      <span className="text-xs">Thêm ảnh</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Description */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Mô tả sản phẩm</h2>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
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
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Danh mục</h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {mockProduct.categories.map((category) => (
                  <FormField
                    key={category.id}
                    control={form.control}
                    name="categoryIds"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(category.id)}
                            onCheckedChange={(checked) => {
                              const currentValues = field.value || [];
                              if (checked) {
                                field.onChange([...currentValues, category.id]);
                              } else {
                                field.onChange(
                                  currentValues.filter(
                                    (value) => value !== category.id
                                  )
                                );
                              }
                            }}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>{category.name}</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Variants */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Biến thể sản phẩm</h2>
                <Button type="button" variant="outline" onClick={addVariant}>
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm biến thể
                </Button>
              </div>

              {form.watch("variants")?.map((_, index) => (
                <div
                  key={index}
                  className="grid grid-cols-5 gap-4 items-end border-b pb-4"
                >
                  <FormField
                    control={form.control}
                    name={`variants.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tên biến thể</FormLabel>
                        <FormControl>
                          <Input placeholder="VD: 2L" {...field} />
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
                        <FormLabel>Giá</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập giá" {...field} />
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
                        <FormLabel>Giá cũ</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập giá cũ" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`variants.${index}.SKU`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SKU</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập SKU" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeVariant(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Attributes */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Thuộc tính sản phẩm</h2>
                <Button type="button" variant="outline" onClick={addAttribute}>
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm thuộc tính
                </Button>
              </div>

              {form.watch("attributes")?.map((_, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 gap-4 items-end border-b pb-4"
                >
                  <FormField
                    control={form.control}
                    name={`attributes.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tên thuộc tính</FormLabel>
                        <FormControl>
                          <Input placeholder="VD: Xuất xứ" {...field} />
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
                          <Input placeholder="VD: Việt Nam" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeAttribute(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSaving}
            className="w-full md:w-auto"
          >
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Lưu thay đổi
          </Button>
        </div>
      </form>
    </Form>
  );
}
