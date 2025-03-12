import {
  useFieldArray,
  Control,
  UseFormRegister,
  UseFormSetValue,
  FieldErrors,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductFormData } from "@/types/productSchema";

interface VariantFieldsProps {
  control: Control<ProductFormData>;
  register: UseFormRegister<ProductFormData>;
  setValue: UseFormSetValue<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
}

export default function VariantFields({
  control,
  register,
  setValue,
  errors,
}: VariantFieldsProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  // Hàm format số có dấu phân cách hàng nghìn
  const formatPrice = (value: string) => {
    const rawValue = value.replace(/\D/g, ""); // Loại bỏ ký tự không phải số
    return new Intl.NumberFormat("vi-VN").format(Number(rawValue));
  };

  return (
    <div>
      <h3 className="font-bold text-lg">Biến thể sản phẩm</h3>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 items-center mt-3"
        >
          <Input
            {...register(`variants.${index}.name`)}
            placeholder="Tên biến thể"
            className="w-full"
          />
          <div>
            <Input
              type="text"
              placeholder="Giá"
              className="w-full"
              onChange={(e) => {
                const formattedValue = formatPrice(e.target.value);
                e.target.value = formattedValue; // Hiển thị số có dấu phân cách
                setValue(
                  `variants.${index}.price`,
                  Number(formattedValue.replace(/\D/g, "")),
                  { shouldValidate: true }
                ); // Lưu dạng số
              }}
            />
            <p className="text-red-500 text-sm">
              {errors?.variants?.[index]?.price?.message}
            </p>
          </div>
          <div>
            <Input
              type="text"
              placeholder="Giá cũ"
              className="w-full"
              onChange={(e) => {
                const formattedValue = formatPrice(e.target.value);
                e.target.value = formattedValue;
                setValue(
                  `variants.${index}.old_price`,
                  Number(formattedValue.replace(/\D/g, "")),
                  { shouldValidate: true }
                );
              }}
            />
            <p className="text-red-500 text-sm">
              {errors?.variants?.[index]?.old_price?.message}
            </p>
          </div>
          <div>
            <Input
              type="number"
              {...register(`variants.${index}.stock`, {
                valueAsNumber: true,
                onChange: (e) => {
                  const value = e.target.value.replace(/^0+/, "");
                  setValue(
                    `variants.${index}.stock`,
                    value ? Number(value) : 0
                  ); // Dùng setValue từ props
                },
              })}
              placeholder="Tồn kho"
              className="w-full"
            />
            <p className="text-red-500 text-sm">
              {errors?.variants?.[index]?.stock?.message}
            </p>
          </div>
          <Button
            variant="destructive"
            className="w-full sm:w-auto"
            onClick={() => remove(index)}
          >
            Xóa
          </Button>
        </div>
      ))}
      <Button
        className="mt-5 w-full sm:w-auto"
        variant="outline"
        type="button"
        onClick={() => append({ name: "", price: 0, old_price: 0, stock: 0 })}
      >
        + Thêm biến thể
      </Button>
    </div>
  );
}
