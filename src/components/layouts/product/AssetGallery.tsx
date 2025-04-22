// components/product/AssetGallery.tsx
"use client";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Image from "next/image";

interface Asset {
  id: number;
  asset: {
    id: number;
    path: string;
  };
}

export default function AssetGallery({
  assets,
  onChange,
}: {
  assets: Asset[];
  onChange: (updatedAssets: Asset[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newAssets: Asset[] = files.map((file, index) => ({
      id: Date.now() + index,
      asset: {
        id: Date.now() + index,
        path: URL.createObjectURL(file),
      },
    }));
    onChange([...assets, ...newAssets]);
  };

  return (
    <Card>
      <CardContent className="space-y-4 p-4">
        <Label>Ảnh sản phẩm</Label>
        <div className="flex gap-2 overflow-x-auto">
          {assets.map((a, idx) => (
            <div key={a.id} className="relative w-24 h-24">
              <Image
                src={a.asset.path}
                alt="asset"
                width={100}
                height={100}
                className="object-cover w-full h-full rounded-xl"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-0 right-0"
                onClick={() => {
                  const newAssets = assets.filter((_, i) => i !== idx);
                  onChange(newAssets);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleAddImages}
        />
        <Button onClick={() => inputRef.current?.click()}>Thêm ảnh</Button>
      </CardContent>
    </Card>
  );
}
