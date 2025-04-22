"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import AssetGallery from "./AssetGallery";
import CategorySelector from "./CategorySelector";
import { Attributes, Product, Variant } from "@/types/backend";

export default function ProductEditForm({ product }: { product: Product }) {
  const [form, setForm] = useState<Product>(product);

  const updateField = (field: keyof Product, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleChangeAttribute = (
    index: number,
    key: keyof Attributes,
    value: string
  ) => {
    const newAttrs = [...form.attributes];
    newAttrs[index] = {
      ...newAttrs[index],
      [key]: value,
    };
    updateField("attributes", newAttrs);
  };

  const handleChangeVariant = <K extends keyof Variant>(
    index: number,
    key: K,
    value: Variant[K]
  ) => {
    const newVariants = [...form.variants];
    newVariants[index][key] = value;
    updateField("variants", newVariants);
  };
  const handleSubmit = async () => {
    try {
      // TODO: Nếu có ảnh mới là File, xử lý upload ở đây trước, rồi lấy lại path

      const payload = {
        ...form,
        discount: Number(form.discount), // convert lại nếu cần
        price: Number(form.price),
        variants: form.variants.map((v) => ({
          ...v,
          price: Number(v.price),
          old_price: Number(v.old_price),
        })),
      };

      console.log("payload", payload);
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra khi lưu thay đổi.");
    }
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
      <Card>
        <CardContent className="space-y-4 p-4">
          <Label>Tên sản phẩm</Label>
          <Input
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
          />

          <Label>Slug</Label>
          <Input
            value={form.slug}
            onChange={(e) => updateField("slug", e.target.value)}
          />

          <Label>Mô tả</Label>
          <Textarea
            rows={8}
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Giá</Label>
              <Input
                type="number"
                value={form.price}
                onChange={(e) => updateField("price", e.target.value)}
              />
            </div>
            <div>
              <Label>Giảm giá (%)</Label>
              <Input
                type="number"
                value={form.discount}
                onChange={(e) =>
                  updateField("discount", parseFloat(e.target.value))
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 p-4">
          <Label>Thuộc tính</Label>
          {form.attributes.map((attr, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <Input
                value={attr.name}
                onChange={(e) =>
                  handleChangeAttribute(idx, "name", e.target.value)
                }
                placeholder="Tên"
              />
              <Input
                value={attr.value}
                onChange={(e) =>
                  handleChangeAttribute(idx, "value", e.target.value)
                }
                placeholder="Giá trị"
              />
              <Button
                variant="destructive"
                size="icon"
                onClick={() => {
                  const newAttrs = form.attributes.filter((_, i) => i !== idx);
                  updateField("attributes", newAttrs);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button
            onClick={() =>
              updateField("attributes", [
                ...form.attributes,
                { name: "", value: "" },
              ])
            }
          >
            Thêm thuộc tính
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 p-4">
          <Label>Biến thể</Label>
          {form.variants.map((variant, idx) => (
            <div key={idx} className="grid grid-cols-5 gap-2 items-center">
              <Input
                value={variant.name}
                onChange={(e) =>
                  handleChangeVariant(idx, "name", e.target.value)
                }
                placeholder="Tên"
              />
              <Input
                value={variant.price}
                onChange={(e) =>
                  handleChangeVariant(idx, "price", e.target.value)
                }
                placeholder="Giá"
              />
              <Input
                value={variant.old_price}
                onChange={(e) =>
                  handleChangeVariant(idx, "old_price", e.target.value)
                }
                placeholder="Giá cũ"
              />
              <Input
                value={variant.SKU}
                onChange={(e) =>
                  handleChangeVariant(idx, "SKU", e.target.value)
                }
                placeholder="SKU"
              />
              <Button
                variant="destructive"
                size="icon"
                onClick={() => {
                  const newVariants = form.variants.filter((_, i) => i !== idx);
                  updateField("variants", newVariants);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button
            onClick={() =>
              updateField("variants", [
                ...form.variants,
                { id: 0, name: "", price: "", old_price: "", SKU: "" },
              ])
            }
          >
            Thêm biến thể
          </Button>
        </CardContent>
      </Card>

      <AssetGallery
        assets={form.assets}
        onChange={(newAssets) => updateField("assets", newAssets)}
      />

      <CategorySelector
        categories={form.categories}
        onChange={(newCats) => updateField("categories", newCats)}
      />

      <div className="col-span-full">
        <Button className="w-full" onClick={handleSubmit}>
          Lưu thay đổi
        </Button>
      </div>
    </div>
  );
}
