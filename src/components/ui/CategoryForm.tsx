"use client";
import { useState } from "react";
import UploadImage from "./UploadImage";
import FormField from "./FormField";
import { useMutation } from "@tanstack/react-query";
import { createCategory } from "@/api/categories/category.api";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProductFormData, productSchema } from "@/types/productSchema";
import SingleCategorySelect from "../layouts/admin/SingleCategorySelect";

const CategoryForm = () => {
  const {
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      category_ids: [],
    },
  });

  const [formState, setFormState] = useState({
    name: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<number | null>(
    null
  );
  // Hàm cập nhật giá trị của input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("name", formState.name);
      formData.append("description", formState.description);
      if (imageFile) formData.append("images", imageFile);
      if (selectedCategories !== null) {
        formData.append("parentId", JSON.stringify(selectedCategories));
      }

      return await createCategory(formData);
    },
    onSuccess: () => {
      toast.success("Category created successfully");
      setFormState({ name: "", description: "" });
      setImageFile(null);
    },
    onError: (error) => {
      toast.error("Failed to create category. Please try again!");
      console.error("Error:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formState);
    console.log("Image file:", imageFile);
    console.log(selectedCategories);

    mutate();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-md p-5 mt-5 flex flex-col gap-5"
    >
      {/* Category Name */}
      <FormField
        label="Category Name"
        name="name"
        value={formState.name}
        onChange={handleChange}
        placeholder="Enter category name"
        required
      />

      {/* Description */}
      <FormField
        label="Description"
        name="description"
        value={formState.description}
        onChange={handleChange}
        placeholder="Enter description"
        required
      />
      <div className="flex">
        <span className="font-bold w-full md:w-[300px]">Category cha</span>
        <SingleCategorySelect
          selectedCategory={selectedCategories ?? null} // Đảm bảo đúng kiểu dữ liệu
          setSelectedCategory={setSelectedCategories} // Cập nhật lại cho đúng kiểu callback
          setValue={setValue}
          errors={errors}
        />
      </div>
      {/* Upload Image */}
      <fieldset className="flex flex-col md:flex-row items-center gap-2">
        <label className="text-[#111] font-bold w-full md:w-[300px]">
          Upload Image<span className="text-red-600 ml-1">*</span>
        </label>
        <UploadImage onUpload={setImageFile} isSuccess={isSuccess} />
      </fieldset>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-5 py-2 bg-blue-500 text-white rounded-md"
          disabled={isPending}
        >
          {isPending ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
