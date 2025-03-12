import * as z from "zod";

// Định nghĩa schema bằng Zod
export const productSchema = z.object({
  name: z.string().min(1, { message: "Tên sản phẩm không được để trống" }),
  category_ids: z
    .array(z.number())
    .min(1, { message: "Chọn ít nhất một danh mục" }),
  discount: z
    .number()
    .min(0, { message: "Giảm giá không thể âm" })
    .max(100, { message: "Giảm giá không thể lớn hơn 100%" }),
  stock: z.number().min(1, { message: "Số lượng tồn kho phải lớn hơn 0" }),
  description: z.string().min(1, { message: "Mô tả không được để trống" }),
  price: z.number().min(1000, { message: "Giá phải lớn hơn 1000" }),
  attributes: z
    .array(
      z.object({
        name: z.string().min(1, "Tên thuộc tính không được để trống"),
        value: z.string().min(1, "Giá trị không được để trống"),
      })
    )
    .default([]), // Cho phép bỏ qua nếu không có attributes
  variants: z
    .array(
      z.object({
        name: z.string().min(1, "Tên biến thể không được để trống"),
        price: z.number().min(1000, "Giá biến thể phải lớn hơn 1000"),
        old_price: z.number().min(1000, "Giá cũ phải lớn hơn 1000"),
        stock: z.number().min(0, "Tồn kho không được âm"),
      })
    )
    .default([]), // Nếu không có biến thể, mặc định là []
});

// Định nghĩa TypeScript dựa trên Zod
export type ProductFormData = z.infer<typeof productSchema>;
