"use client";
import { useState } from "react";
import { Product } from "@/types/backend";
import { Card, CardContent } from "./card";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "./textarea";
import Image from "next/image";

interface Props {
  slug: string;
  initialProduct: Product;
}

const ProductEditForm: React.FC<Props> = ({ initialProduct }) => {
  const [product, setProduct] = useState(initialProduct);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Card className="pt-5">
        <CardContent>
          <form className="flex flex-col gap-3">
            <div>
              <Label>Tên sản phẩm</Label>
              <Input
                placeholder="Nhập tên sản phẩm"
                type="text"
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
                <Label>Giảm giá</Label>
                <Input
                  placeholder="Nhập giảm giá"
                  type="number"
                  name="discount"
                  value={product.discount}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Tồn kho</Label>
                <Input
                  placeholder="Nhập số lượng tồn kho"
                  type="number"
                  name="sold"
                  value={product.sold}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <Label>Mô tả</Label>
              <Textarea
                placeholder="Nhập mô tả sản phẩm"
                name="description"
                value={product.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <span>Ảnh</span>
              <div className="w-28 h-28 flex gap-4">
                {product.assets.map((img, index) => (
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
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductEditForm;
