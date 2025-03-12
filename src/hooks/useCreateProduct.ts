import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createproduct } from "@/app/api/products/product.api";
import { ProductFormData } from "@/types/productSchema";
import { toast } from "react-toastify";
import axios from "axios";

export function useCreateProduct(
  selectedImages: File[],
  setProgress?: (value: number) => void
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      if (setProgress) setProgress(30); // Cập nhật tiến trình khi bắt đầu gửi request
      const response = await createproduct(formData);
      if (setProgress) setProgress(100); // Hoàn thành
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("🎉 Tạo sản phẩm thành công");
      if (setProgress) setProgress(0); // Reset tiến trình
    },
    onError: (error) => {
      if (setProgress) setProgress(0); // Reset nếu lỗi
      let errorMessage = "Có lỗi xảy ra, vui lòng thử lại.";

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      toast.error(`❌ ${errorMessage}`);
      console.error("Lỗi API:", errorMessage);
    },
  });

  const submitProduct = (data: ProductFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", String(data.price));
    formData.append("discount", String(data.discount));
    formData.append("stock", String(data.stock));
    formData.append("description", data.description);

    data.category_ids.forEach((id) =>
      formData.append("category_ids[]", String(id))
    );

    if (data.attributes && data.attributes?.length > 0) {
      data.attributes.forEach((attr, index) => {
        formData.append(`attributes[${index}][name]`, attr.name);
        formData.append(`attributes[${index}][value]`, attr.value);
      });
    }

    if (data.variants && data.variants.length > 0) {
      data.variants.forEach((variant, index) => {
        formData.append(`variants[${index}][name]`, variant.name);
        formData.append(`variants[${index}][price]`, String(variant.price));
        formData.append(
          `variants[${index}][old_price]`,
          String(variant.old_price)
        );
        formData.append(`variants[${index}][stock]`, String(variant.stock));
      });
    }

    selectedImages.forEach((file) => formData.append("images", file));

    mutation.mutate(formData);
  };

  return { submitProduct, isLoading: mutation.isPending };
}
