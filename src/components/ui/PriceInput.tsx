import { useState } from "react";
import { UseFormSetValue, UseFormRegister, FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductFormData } from "@/types/productSchema"; // Import kiểu dữ liệu

interface PriceInputProps {
  setValue: UseFormSetValue<ProductFormData>;
  register: UseFormRegister<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
  defaultValues?: { price: number };
}

export default function PriceInput({ setValue, errors }: PriceInputProps) {
  const [displayValue, setDisplayValue] = useState(""); // Lưu giá trị hiển thị

  return (
    <div>
      <Label>Giá gốc</Label>
      <Input
        type="text"
        placeholder="Nhập giá (VD: 1,000,000)"
        value={displayValue} // Hiển thị giá trị có dấu phân cách
        onChange={(e) => {
          const rawValue = e.target.value.replace(/\D/g, ""); // Chỉ giữ số
          const numericValue = Number(rawValue); // Ép kiểu thành số
          const formattedValue = new Intl.NumberFormat("vi-VN").format(
            numericValue
          ); // Định dạng dấu phân cách

          setDisplayValue(formattedValue); // Cập nhật UI
          setValue("price", numericValue, { shouldValidate: true }); // Cập nhật giá trị số vào form
        }}
      />
      {errors.price && (
        <p className="text-red-500 text-sm">{errors.price.message}</p>
      )}
    </div>
  );
}
