import React from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ImagePlus, X } from "lucide-react";

interface ProductImagesCardProps {
  selectedImages: { id: number; path: string }[];
  previewUrls: string[];
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeSelectedImage: (index: number) => void;
  removeNewImage: (index: number) => void;
}

export function ProductImagesCard({
  selectedImages,
  previewUrls,
  handleImageChange,
  removeSelectedImage,
  removeNewImage,
}: ProductImagesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hình ảnh sản phẩm</CardTitle>
        <CardDescription>Quản lý hình ảnh của sản phẩm</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <ImagePlus className="w-8 h-8 mb-2 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Nhấp để tải lên</span> hoặc
                  kéo và thả
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, JPEG (Tối đa 5MB)
                </p>
              </div>
              <input
                id="image-upload"
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {/* Hiển thị hình ảnh hiện tại */}
            {selectedImages.map((imagePath, index) => (
              <div key={`existing-${imagePath.id}`} className="relative group">
                <div className="aspect-square rounded-md overflow-hidden border">
                  <Image
                    src={imagePath.path || "/placeholder.svg"}
                    alt={`Sản phẩm ${index + 1}`}
                    width={200}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeSelectedImage(imagePath.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label={`Xóa hình ảnh sản phẩm ${index + 1}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}

            {/* Hiển thị hình ảnh mới */}
            {previewUrls.map((url, index) => (
              <div key={`new-${index}`} className="relative group">
                <div className="aspect-square rounded-md overflow-hidden border">
                  <Image
                    src={url || "/placeholder.svg"}
                    alt={`Hình mới ${index + 1}`}
                    width={200}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  Mới
                </div>
                <button
                  type="button"
                  onClick={() => removeNewImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label={`Xóa hình ảnh mới ${index + 1}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
