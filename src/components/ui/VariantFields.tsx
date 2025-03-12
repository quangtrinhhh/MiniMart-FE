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
import { Label } from "@radix-ui/react-dropdown-menu";

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
      <h3 className="font-bold text-lg mb-4">Biến thể sản phẩm</h3>
      <div className="space-y-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border p-4 rounded-lg shadow-sm bg-white"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Cột 1: Tên biến thể */}
              <div className="flex flex-col">
                <Label className="font-medium">Tên biến thể</Label>
                <Input
                  {...register(`variants.${index}.name`)}
                  placeholder="Tên biến thể"
                  className="w-full"
                />
              </div>

              {/* Cột 2: Giá */}
              <div className="flex flex-col">
                <Label className="font-medium">Giá</Label>
                <Input
                  type="text"
                  placeholder="Giá"
                  className="w-full"
                  onChange={(e) => {
                    const formattedValue = formatPrice(e.target.value);
                    e.target.value = formattedValue;
                    setValue(
                      `variants.${index}.price`,
                      Number(formattedValue.replace(/\D/g, "")),
                      { shouldValidate: true }
                    );
                  }}
                />
                {errors?.variants?.[index]?.price && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.variants[index].price.message}
                  </p>
                )}
              </div>

              {/* Cột 3: Giá cũ */}
              <div className="flex flex-col">
                <Label className="font-medium">Giá cũ</Label>
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
                {errors?.variants?.[index]?.old_price && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.variants[index].old_price.message}
                  </p>
                )}
              </div>

              {/* Cột 4: Số lượng */}
              <div className="flex flex-col">
                <Label className="font-medium">Số lượng</Label>
                <Input
                  type="number"
                  {...register(`variants.${index}.stock`, {
                    valueAsNumber: true,
                    onChange: (e) => {
                      const value = e.target.value.replace(/^0+/, "");
                      setValue(
                        `variants.${index}.stock`,
                        value ? Number(value) : 0
                      );
                    },
                  })}
                  placeholder="Tồn kho"
                  className="w-full"
                />
                {errors?.variants?.[index]?.stock && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.variants[index].stock.message}
                  </p>
                )}
              </div>
            </div>

            {/* Nút xóa */}
            <div className="flex justify-end mt-4">
              <Button
                variant="destructive"
                className="w-full sm:w-auto"
                onClick={() => remove(index)}
              >
                Xóa
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Nút thêm biến thể */}
      <div className="mt-6">
        <Button
          className="w-full sm:w-auto"
          variant="outline"
          type="button"
          onClick={() => append({ name: "", price: 0, old_price: 0, stock: 0 })}
        >
          + Thêm biến thể
        </Button>
      </div>
    </div>
  );
}
