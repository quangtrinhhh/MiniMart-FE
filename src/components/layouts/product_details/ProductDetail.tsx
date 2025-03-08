"use client";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductGallery from "./ProductGallery";
import BrandAndCode from "./BrandAndCode";
import PricePromotionProductDetails from "./PricePromotionProductDetails";
import PromotionalGifts from "./PromotionalGifts";
import CouponBox from "./CouponBox";
import ProductVariants from "./ProductVariants";
import NumberProduct from "./NumberProduct";
import ButtonProductDetails from "./Button";
import ContentProduct from "./ContentProduct";
import RelatedProducts from "./RelatedProducts";
import ProductSuggestions from "./ProductSuggestions";
import { useQuery } from "@tanstack/react-query";
import { getOnlyProduct } from "@/app/api/products/product.api";
import { Product, Variant } from "@/types/backend";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartProvider";
import { toast } from "react-toastify";

interface IProps {
  slug: string;
  initialProduct: Product;
}

const ProductDetail: React.FC<IProps> = ({ slug, initialProduct }) => {
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product>(initialProduct);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    product.variants?.[0] ?? null
  );

  const { data, isLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => getOnlyProduct(slug),
  });

  // Cập nhật state khi query thành công
  useEffect(() => {
    if (data?.data?.result) {
      setProduct(data.data.result);
    }
  }, [data]);
  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  if (!product) {
    return <div>Sản phẩm không tồn tại</div>;
  }
  const handleAddToCart = () => {
    addToCart(product, selectedVariant ?? undefined, quantity);
    toast.success("Thêm thành công");
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariant ?? undefined, quantity);
    toast.warn("Chức năng đang được phát triền");
  };

  return (
    <div className="w-full">
      <Breadcrumbs />
      <div className="max-w-7xl mx-auto p-3">
        <div className="product-detail lg:gap-x-[6.4rem] gap-x-6 grid grid-cols-1 auto-rows-min lg:grid-cols-2 relative">
          <ProductGallery images={data?.data.result.assets ?? []} />
          <div>
            <h1 className="font-semibold text-2xl">{data?.data.result.name}</h1>
            <BrandAndCode />
            <PricePromotionProductDetails
              price={Number(selectedVariant?.price) ?? 0}
              old_price={Number(selectedVariant?.old_price) ?? 0}
              stock={Number(selectedVariant?.stock) ?? 0}
            />

            <PromotionalGifts />
            <CouponBox />
            <ProductVariants
              variants={product.variants}
              onSelectVariant={setSelectedVariant}
            />

            <NumberProduct
              stock={Number(selectedVariant?.stock) ?? 0}
              quantity={quantity}
              setQuantity={setQuantity}
            />
            <ButtonProductDetails
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />
            {/* <Benefit /> */}
          </div>
        </div>
      </div>
      <ContentProduct
        description={data?.data.result.description ?? "Đang cập nhật"}
      />
      <div className="bg-[#f2f6f3]">
        <div className="max-w-7xl mx-auto p-3 pt-20 pb-20">
          <RelatedProducts />
          <ProductSuggestions />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
