"use client";

import { useState } from "react";
import { z } from "zod";
import { Product, Variant } from "@/types/backend";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const productSchema = z.object({
  name: z.string().min(1, "Tên sản phẩm không được để trống"),
  price: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Giá không hợp lệ")
  ),
  discount: z.preprocess(
    (val) => Number(val),
    z.number().min(0).max(100, "Giảm giá không hợp lệ")
  ),
  stock: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Tồn kho không hợp lệ")
  ),
  description: z.string().optional(),
  assets: z
    .array(
      z.object({
        id: z.number(),
        asset: z.object({ path: z.string(), filename: z.string() }),
      })
    )
    .optional(),
  variants: z
    .array(
      z.object({
        id: z.number().optional(),
        name: z.string().min(1, "Tên biến thể không được để trống"),
        price: z.preprocess(
          (val) => Number(val),
          z.number().min(0, "Giá không hợp lệ")
        ),
        stock: z.preprocess(
          (val) => Number(val),
          z.number().min(0, "Tồn kho không hợp lệ")
        ),
        SKU: z.string().optional(),
      })
    )
    .optional(),
});

interface Props {
  initialProduct: Product;
}

const ProductEditForm: React.FC<Props> = ({ initialProduct }) => {
  const [product, setProduct] = useState(initialProduct);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setProduct({
      ...product,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleVariantChange = (
    index: number,
    field: keyof Variant,
    value: string | number
  ) => {
    setProduct((prev) => {
      const updatedVariants = [...(prev.variants || [])];
      updatedVariants[index] = { ...updatedVariants[index], [field]: value };
      return { ...prev, variants: updatedVariants };
    });
  };

  const addVariant = () => {
    setProduct((prev) => ({
      ...prev,
      variants: [
        ...(prev.variants || []),
        {
          name: "",
          price: "0",
          stock: 0,
          SKU: "",
        } as Variant,
      ],
    }));
  };

  const removeVariant = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      variants: prev.variants?.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedProduct = productSchema.safeParse(product);
    if (!parsedProduct.success) {
      toast.error("Vui lòng kiểm tra lại thông tin sản phẩm!");
      return;
    }
    console.log("Sản phẩm cập nhật:", product);
    toast.success("Cập nhật sản phẩm thành công!");
  };

  return (
    <div>
      <Card className="pt-5">
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label>Tên sản phẩm</Label>
              <Input
                placeholder="Nhập tên sản phẩm"
                name="name"
                value={product.name}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Giá sản phẩm</Label>
                <Input
                  placeholder="Nhập giá sản phẩm"
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>Giảm giá (%)</Label>
                <Input
                  placeholder="Nhập giảm giá"
                  type="number"
                  name="discount"
                  value={product.discount}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <Label>Mô tả</Label>
              <Textarea
                placeholder="Nhập mô tả sản phẩm"
                name="description"
                className="h-32"
                value={product.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <span>Ảnh</span>
              <div className="flex gap-4">
                {product.assets?.map((img, index) => (
                  <Image
                    key={index}
                    src={img.asset.path}
                    alt={img.asset.filename}
                    width={100}
                    height={100}
                  />
                ))}
              </div>
            </div>
            {product.variants && (
              <div>
                <Label>Biến thể sản phẩm</Label>
                {product.variants.map((variant, index) => (
                  <div key={index} className="flex gap-4 mb-3">
                    <Input
                      placeholder="Tên biến thể"
                      value={variant.name}
                      onChange={(e) =>
                        handleVariantChange(index, "name", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Giá"
                      type="number"
                      value={variant.price}
                      onChange={(e) =>
                        handleVariantChange(
                          index,
                          "price",
                          Number(e.target.value)
                        )
                      }
                    />
                    <Input
                      placeholder="Tồn kho"
                      type="number"
                      value={variant.stock}
                      onChange={(e) =>
                        handleVariantChange(
                          index,
                          "stock",
                          Number(e.target.value)
                        )
                      }
                    />
                    <Button type="button" onClick={() => removeVariant(index)}>
                      Xóa
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={addVariant}>
                  Thêm biến thể
                </Button>
              </div>
            )}
            <Button type="submit">Cập nhật sản phẩm</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductEditForm;
