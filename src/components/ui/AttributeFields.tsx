import { useFieldArray, Control, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductFormData } from "@/types/productSchema";

interface AttributeFieldsProps {
  control: Control<ProductFormData>;
  register: UseFormRegister<ProductFormData>;
  defaultValues?: ProductFormData["attributes"];
}

export default function AttributeFields({
  control,
  register,
}: AttributeFieldsProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "attributes",
  });

  return (
    <div>
      <h3 className="font-bold">Thuộc tính sản phẩm</h3>
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 mt-3">
          <Input {...register(`attributes.${index}.name`)} placeholder="Tên" />
          <Input
            {...register(`attributes.${index}.value`)}
            placeholder="Giá trị"
          />
          <Button variant="destructive" onClick={() => remove(index)}>
            Xóa
          </Button>
        </div>
      ))}
      <Button
        className="mt-5"
        variant="outline"
        onClick={() => append({ name: "", value: "" })}
      >
        + Thêm thuộc tính
      </Button>
    </div>
  );
}
