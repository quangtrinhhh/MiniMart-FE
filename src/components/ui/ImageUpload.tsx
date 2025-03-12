import { useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function ImageUpload({
  setSelectedImages,
}: {
  setSelectedImages: (files: File[]) => void;
}) {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setSelectedImages(fileArray);
      setImagePreviews(fileArray.map((file) => URL.createObjectURL(file)));
    }
  };

  return (
    <div>
      <Input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
      <div className="flex gap-2 mt-2">
        {imagePreviews.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Ảnh ${index}`}
            width={80}
            height={80}
            className="rounded"
          />
        ))}
      </div>
    </div>
  );
}
