import * as z from "zod";

// Định nghĩa schema bằng Zod
export const productSchema = z.object({
  name: z.string().min(1, "Tên sản phẩm không được để trống"),
  category_ids: z.array(z.number()).min(1, "Chọn ít nhất một danh mục"),
  discount: z.number().min(0).max(100, "Giảm giá phải từ 0 - 100"),
  stock: z.number().min(1, "Số lượng tồn kho phải lớn hơn 0"),
  description: z.string().min(1, "Mô tả không được để trống"),
  price: z.number().min(1000, "Giá phải lớn hơn 1000"),
  attributes: z.array(z.object({ name: z.string(), value: z.string() })),
  variants: z.array(
    z.object({
      name: z.string(),
      price: z.number(),
      old_price: z.number(),
      stock: z.number(),
    })
  ),
});

// Định nghĩa TypeScript dựa trên Zod
export type ProductFormData = z.infer<typeof productSchema>;
