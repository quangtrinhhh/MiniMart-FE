import { useState } from "react";
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
import { Category } from "@/types/backend";
import { getCategories } from "@/app/api/categories/category.api";
import { useQuery } from "@tanstack/react-query";

interface CategorySelectProps {
  selectedCategories: number[];
  setSelectedCategories: (categories: number[]) => void;
  setValue: UseFormSetValue<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
}

export default function CategorySelect({
  selectedCategories,
  setSelectedCategories,
  setValue,
  errors,
}: CategorySelectProps) {
  const [open, setOpen] = useState(false);
  const [current] = useState(1);
  const [pageSize] = useState(10);
  const [filter] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["category", filter, current, pageSize],
    queryFn: () => getCategories(filter, current, pageSize),
    staleTime: 5000,
  });

  const mockCategories: Category[] = data?.data.result || [];

  // Xử lý chọn/bỏ chọn danh mục
  const handleCategoryChange = (categoryId: number) => {
    const updatedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    setSelectedCategories(updatedCategories);
    setValue("category_ids", updatedCategories);
  };

  // Tìm danh mục được chọn
  const selectedNames = mockCategories
    .flatMap((c) => [c, ...(c.children || [])])
    .filter((c) => selectedCategories.includes(c.id))
    .map((c) => c.name);

  // Giới hạn hiển thị danh mục (tối đa 2 danh mục, phần còn lại sẽ thành "+X danh mục")
  const displayText =
    selectedNames.length > 2
      ? `${selectedNames.slice(0, 2).join(", ")} +${
          selectedNames.length - 2
        } danh mục`
      : selectedNames.join(", ") || "Chọn danh mục";

  return (
    <div>
      <Label>Danh mục</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start truncate">
            {displayText}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-2 max-h-60 overflow-auto">
          {isLoading ? (
            <p className="text-gray-500 text-center">Đang loading...</p>
          ) : error ? (
            <p className="text-red-500 text-center">Lỗi, vui lòng thử lại...</p>
          ) : mockCategories.length === 0 ? (
            <p className="text-gray-500 text-center">Không có danh mục nào</p>
          ) : (
            mockCategories.map((category) => (
              <div key={category.id} className="py-1">
                {/* Hiển thị danh mục cha */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => handleCategoryChange(category.id)}
                  />
                  <span className="font-semibold">{category.name}</span>
                </div>
                {/* Hiển thị danh mục con nếu có */}
                {category.children &&
                  category.children.map((child) => (
                    <div
                      key={child.id}
                      className="flex items-center space-x-2 pl-4"
                    >
                      <Checkbox
                        checked={selectedCategories.includes(child.id)}
                        onCheckedChange={() => handleCategoryChange(child.id)}
                      />
                      <span>{child.name}</span>
                    </div>
                  ))}
              </div>
            ))
          )}
        </PopoverContent>
      </Popover>
      {errors.category_ids && (
        <p className="text-red-500 text-sm">{errors.category_ids.message}</p>
      )}
    </div>
  );
}
