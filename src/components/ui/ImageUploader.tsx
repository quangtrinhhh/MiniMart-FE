"use client";
import { useState } from "react";
import Image from "next/image";

const ImageUploader: React.FC = () => {
  const [images, setImages] = useState<(string | null)[]>(Array(4).fill(null));

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImages((prev) => {
        const newImages = [...prev];
        newImages[index] = imageUrl;
        return newImages;
      });
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev];
      newImages[index] = null;
      return newImages;
    });
  };

  return (
    <fieldset className="flex flex-col gap-3">
      <label className="text-[#111] font-bold">
        Upload images <span className="text-red-600 ml-1">*</span>
      </label>

      {/* Ô tải ảnh */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group w-32 h-36 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center overflow-hidden"
          >
            {image ? (
              <>
                <Image
                  src={image}
                  alt={`Image ${index + 1}`}
                  width={100}
                  height={100}
                  className="object-cover w-full h-full"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-3 py-2 text-xs opacity-0 group-hover:opacity-100 transition"
                >
                  ✕
                </button>
              </>
            ) : (
              <label className="cursor-pointer w-full h-full flex items-center justify-center text-gray-400 text-sm hover:bg-gray-100 transition">
                +
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, index)}
                  className="hidden"
                />
              </label>
            )}
          </div>
        ))}
      </div>
      <p className="text-[#95989D] text-xs">
        You need to add at least 4 images. Pay attention to the quality of the
        pictures you add, comply with the background color standards. Pictures
        must be in certain dimensions. Notice that the product shows all the
        details
      </p>
    </fieldset>
  );
};

export default ImageUploader;
