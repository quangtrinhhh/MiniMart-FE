"use client";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductGallery from "./ProductGallery";
import BrandAndCode from "./BrandAndCode";
import PromotionalGifts from "./PromotionalGifts";
import CouponBox from "./CouponBox";
import ProductVariants from "./ProductVariants";
import NumberProduct from "./NumberProduct";
import ButtonProductDetails from "./Button";
import ContentProduct from "./ContentProduct";
import RelatedProducts from "./RelatedProducts";
import ProductSuggestions from "./ProductSuggestions";
import { useQuery } from "@tanstack/react-query";
import { getOnlyProduct } from "@/api/products/product.api";
import { Product, Variant } from "@/types/backend";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PriceAndSele from "./PriceAndSele";
import { useAddToCart } from "@/hooks/useCart";

interface IProps {
  slug: string;
}

const ProductDetail: React.FC<IProps> = ({ slug }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => getOnlyProduct(slug),
  });

  const { mutate: addToCart } = useAddToCart();
  const [product, setProduct] = useState<Product | null>(null); // Khởi tạo là null
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  // Cập nhật state khi query thành công
  useEffect(() => {
    if (data?.data?.result) {
      setProduct(data.data.result);
      // Đảm bảo rằng biến thể đầu tiên sẽ được chọn
      setSelectedVariant(data.data.result.variants?.[0] ?? null);
    }
  }, [data]);

  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  if (!product) {
    return <div>Sản phẩm không tồn tại</div>;
  }

  const handleAddToCart = () => {
    addToCart(
      {
        productId: product.id,
        variantId: selectedVariant?.id ?? undefined, // Nếu sản phẩm có biến thể, truyền variantId
        quantity,
      },
      {
        onSuccess: () => toast.success("Thêm vào giỏ hàng thành công"),
        onError: () => toast.error("Không thể thêm vào giỏ hàng"),
      }
    );
  };

  const handleBuyNow = () => {
    addToCart(
      {
        productId: product.id,
        variantId: selectedVariant?.id ?? undefined, // Nếu sản phẩm có biến thể, truyền variantId
        quantity,
      },
      {
        onSuccess: () => toast.success("Thêm vào giỏ hàng thành công"),
        onError: () => toast.error("Không thể thêm vào giỏ hàng"),
      }
    );
    toast.warn("Chức năng đang được phát triển");
  };

  return (
    <div className="w-full">
      <Breadcrumbs />
      <div className="max-w-7xl mx-auto p-3">
        <div className="product-detail lg:gap-x-[6.4rem] gap-x-6 grid grid-cols-1 auto-rows-min lg:grid-cols-2 relative">
          <ProductGallery images={product.assets ?? []} />
          <div>
            <h1 className="font-semibold text-2xl">{product.name}</h1>
            <BrandAndCode />
            <PriceAndSele
              price={Number(selectedVariant?.price ?? product.price)}
              old_price={Number(selectedVariant?.old_price)}
              discount={product.discount ?? 0} // Đảm bảo discount không bị undefined
            />

            <PromotionalGifts />
            <CouponBox />
            <ProductVariants
              variants={product.variants ?? []} // Đảm bảo variants không undefined
              onSelectVariant={setSelectedVariant}
            />

            <NumberProduct
              stock={selectedVariant?.stock ?? product.stock}
              quantity={quantity}
              setQuantity={setQuantity}
            />
            <ButtonProductDetails
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />
          </div>
        </div>
      </div>
      <ContentProduct description={product.description ?? "Đang cập nhật"} />
      <div className="bg-[#f2f6f3]">
        <div className="max-w-7xl mx-auto p-3 pt-20 pb-20">
          <RelatedProducts productID={product.id} />
          <ProductSuggestions />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
