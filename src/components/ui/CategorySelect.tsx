import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldErrors, UseFormSetValue } from "react-hook-form";
import { ProductFormData } from "@/types/productSchema";
import { useState } from "react";

interface CategorySelectProps {
  selectedCategories: number[];
  setSelectedCategories: (categories: number[]) => void;
  setValue: UseFormSetValue<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
}

const categories = [
  { id: 1, name: "Giặt Xả" },
  { id: 6, name: "Hóa Mỹ Phẩm" },
  { id: 7, name: "Chăm sóc cá nhân" },
  { id: 8, name: "Thực phẩm" },
];

export default function CategorySelect({
  selectedCategories,
  setSelectedCategories,
  setValue,
  errors,
}: CategorySelectProps) {
  const [open, setOpen] = useState(false);

  const handleCategoryChange = (categoryId: number) => {
    const updatedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    setSelectedCategories(updatedCategories);
    setValue("category_ids", updatedCategories);
  };

  return (
    <div>
      <Label>Danh mục</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            {selectedCategories.length > 0
              ? categories
                  .filter((c) => selectedCategories.includes(c.id))
                  .map((c) => c.name)
                  .join(", ")
              : "Chọn danh mục"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2 py-1">
              <Checkbox
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => handleCategoryChange(category.id)}
              />
              <span>{category.name}</span>
            </div>
          ))}
        </PopoverContent>
      </Popover>
      {errors.category_ids && (
        <p className="text-red-500 text-sm">{errors.category_ids.message}</p>
      )}
    </div>
  );
}
