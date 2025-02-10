import Breadcrumbs from "@/components/Breadcrumbs";
import Benefit from "@/components/layouts/product_details/Benefit";
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
import { PRODUCT_FEATURES } from "@/constants/features";
import { NextPage } from "next";

const Page: NextPage = ({}) => {
  return (
    <div className="w-full">
      <Breadcrumbs />
      <div className="max-w-7xl mx-auto p-3">
        <div className="product-detail  lg:gap-x-[6.4rem] gap-x-6 grid grid-cols-1 auto-rows-min lg:grid-cols-2  relative">
          <ProductGallery />
          <div className="">
            <h1 className="font-semibold text-2xl">
              Nước xả vải Downy hương hoa Oải Hương nước Pháp
            </h1>
            {/* Thương hiệu & mã sản phẩm */}
            <BrandAndCode />
            {/*  */}
            <PricePromotionProductDetails />
            {/*  */}
            <PromotionalGifts />
            {/*  */}
            <CouponBox />
            {/*  */}
            <ProductVariants />
            {/*  */}
            <NumberProduct />
            {/*  */}
            <ButtonProductDetails />
            {/*  */}
            <Benefit features={PRODUCT_FEATURES} />
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
};

export default Page;
