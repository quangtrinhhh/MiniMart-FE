import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FieldErrors, UseFormSetValue } from "react-hook-form";
import { ProductFormData } from "@/types/productSchema";
import { Category } from "@/types/backend";
import { getCategories } from "@/app/api/categories/category.api";
import { useQuery } from "@tanstack/react-query";

interface SingleCategorySelectProps {
  selectedCategory: number | null;
  setSelectedCategory: (categoryId: number | null) => void;
  setValue: UseFormSetValue<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
}

export default function SingleCategorySelect({
  selectedCategory,
  setSelectedCategory,
  setValue,
  errors,
}: SingleCategorySelectProps) {
  const [open, setOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["category"],
    queryFn: () => getCategories("", 1, 10),
    staleTime: 5000,
  });

  const categories: Category[] = data?.data.result || [];

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategory(categoryId);
    setValue("category_ids", [categoryId]);
    setOpen(false);
  };

  const selectedName = categories
    .flatMap((c) => [c, ...(c.children || [])])
    .find((c) => c.id === selectedCategory)?.name;

  return (
    <div className="flex-1">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start truncate">
            {selectedName || "Chọn danh mục"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-2 max-h-60 overflow-auto">
          {isLoading ? (
            <p className="text-gray-500 text-center">Đang loading...</p>
          ) : error ? (
            <p className="text-red-500 text-center">Lỗi, vui lòng thử lại...</p>
          ) : categories.length === 0 ? (
            <p className="text-gray-500 text-center">Không có danh mục nào</p>
          ) : (
            <RadioGroup
              value={selectedCategory?.toString()}
              onValueChange={(value) => handleCategoryChange(Number(value))}
            >
              {categories.map((category) => (
                <div key={category.id}>
                  {/* Danh mục cha in đậm */}
                  <div className="flex items-center gap-2 font-bold">
                    <RadioGroupItem
                      id={`category-${category.id}`}
                      value={category.id.toString()}
                    />
                    <Label htmlFor={`category-${category.id}`}>
                      {category.name}
                    </Label>
                  </div>

                  {/* Danh mục con thụt lề */}
                  {category.children?.map((child) => (
                    <div
                      key={child.id}
                      className="pl-4 flex items-center pt-2 gap-2"
                    >
                      <RadioGroupItem
                        id={`child-${child.id}`}
                        value={child.id.toString()}
                      />
                      <Label htmlFor={`child-${child.id}`}>{child.name}</Label>
                    </div>
                  ))}
                </div>
              ))}
            </RadioGroup>
          )}
        </PopoverContent>
      </Popover>
      {errors.category_ids && (
        <p className="text-red-500 text-sm">{errors.category_ids.message}</p>
      )}
    </div>
  );
}
