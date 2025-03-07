"use client";
import { useParams } from "next/navigation"; // Import useParams
import { useQuery } from "@tanstack/react-query";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

import BrandAndCode from "@/components/layouts/product_details/BrandAndCode";
import ButtonProductDetails from "@/components/layouts/product_details/Button";
import ContentProduct from "@/components/layouts/product_details/ContentProduct";
import CouponBox from "@/components/layouts/product_details/CouponBox";
import NumberProduct from "@/components/layouts/product_details/NumberProduct";
import PricePromotionProductDetails from "@/components/layouts/product_details/PricePromotionProductDetails";
import ProductGallery from "@/components/layouts/product_details/ProductGallery";
import ProductSuggestions from "@/components/layouts/product_details/ProductSuggestions";
import ProductVariants from "@/components/layouts/product_details/ProductVariants";
import PromotionalGifts from "@/components/layouts/product_details/PromotionalGifts";
import RelatedProducts from "@/components/layouts/product_details/RelatedProducts";
import { getOnlyProduct } from "@/app/api/products/product.api";

export default function ProductDetailPage() {
  const params = useParams(); // ✅ Lấy params từ Next.js
  const slug = params?.slug as string; // Đảm bảo slug là string

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => getOnlyProduct(slug),
  });
  console.log(slug);

  console.log(data);

  if (!slug) {
    return <h1 className="text-red-500">Lỗi: Không tìm thấy sản phẩm!</h1>;
  }

  if (isLoading) {
    return <h1 className="text-gray-500">Đang tải sản phẩm...</h1>;
  }

  if (isError || !data) {
    return (
      <h1 className="text-red-500">Lỗi: Không tìm thấy dữ liệu sản phẩm!</h1>
    );
  }

  return (
    <div className="w-full">
      <Breadcrumbs />
      <div className="max-w-7xl mx-auto p-3">
        <div className="product-detail lg:gap-x-[6.4rem] gap-x-6 grid grid-cols-1 auto-rows-min lg:grid-cols-2 relative">
          <ProductGallery />
          <div>
            <h1 className="font-semibold text-2xl">
              {data?.data?.result?.slug || "Sản phẩm không tồn tại"}
            </h1>
            <BrandAndCode />
            <PricePromotionProductDetails />
            <PromotionalGifts />
            <CouponBox />
            <ProductVariants />
            <NumberProduct />
            <ButtonProductDetails />
            {/* <Benefit /> */}
          </div>
        </div>
      </div>
      <ContentProduct />
      <div className="bg-[#f2f6f3]">
        <div className="max-w-7xl mx-auto p-3 pt-20 pb-20">
          <RelatedProducts />
          <ProductSuggestions />
        </div>
      </div>
    </div>
  );
}
