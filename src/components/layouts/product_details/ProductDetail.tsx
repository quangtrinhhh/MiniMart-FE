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
import { Product, Variant } from "@/types/backend";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PriceAndSele from "./PriceAndSele";
import { useAddToCart } from "@/hooks/useCart";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useProductDetail } from "@/api/products/useProducts";
import { Loading } from "@/components/ui/loading";

interface IProps {
  slug: string;
}

const ProductDetail: React.FC<IProps> = ({ slug }) => {
  const router = useRouter();
  const { data, isLoading } = useProductDetail(slug);

  const { mutate: addToCart } = useAddToCart();
  const [product, setProduct] = useState<Product | null>(null); // Khởi tạo là null
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  const { data: session } = useSession();
  // Cập nhật state khi query thành công
  useEffect(() => {
    if (data?.data?.result) {
      setProduct(data.data.result);
      // Đảm bảo rằng biến thể đầu tiên sẽ được chọn
      setSelectedVariant(data.data.result.variants?.[0] ?? null);
    }
  }, [data]);

  if (isLoading) {
    return <Loading size="lg" text="Đang tải sản phẩm..." />;
  }

  if (!product) {
    return <div>Không tìm thấy sản phẩm</div>;
  }

  const handleAddToCart = () => {
    addToCart(
      {
        productId: Number(product?.id),
        variantId: selectedVariant?.id ?? undefined, // Nếu sản phẩm có biến thể, truyền variantId
        quantity,
      },
      {
        onSuccess: () => toast.success("Thêm vào giỏ hàng thành công"),
        onError: () => toast.error("Không thể thêm vào giỏ hàng"),
      }
    );
  };
  const handleCheckOut = () => {
    if (!session) return toast.warn("Vui lòng đăng nhập trước khi thanh toán!");
    router.push("/checkout");
  };
  const handleBuyNow = () => {
    addToCart(
      {
        productId: Number(product?.id),
        variantId: selectedVariant?.id ?? undefined, // Nếu sản phẩm có biến thể, truyền variantId
        quantity,
      },
      {
        onSuccess: () => handleCheckOut(),
        onError: () => toast.error("Không thể thêm vào giỏ hàng"),
      }
    );
  };

  return (
    <div className="w-full">
      <Breadcrumbs />
      <div className="max-w-7xl mx-auto p-3">
        <div className="product-detail lg:gap-x-[6.4rem] gap-x-6 grid grid-cols-1 auto-rows-min lg:grid-cols-2 relative">
          <ProductGallery images={product?.assets ?? []} />
          <div>
            <h1 className="font-semibold text-2xl">{product?.name}</h1>
            <BrandAndCode />
            <PriceAndSele
              price={Number(selectedVariant?.price ?? product?.price)}
              old_price={Number(selectedVariant?.old_price)}
              discount={product?.discount ?? 0} // Đảm bảo discount không bị undefined
            />

            <PromotionalGifts />
            <CouponBox />
            <ProductVariants
              variants={product?.variants ?? []} // Đảm bảo variants không undefined
              onSelectVariant={setSelectedVariant}
            />

            <NumberProduct
              stock={Number(selectedVariant?.stock) ?? product?.stock}
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
      <ContentProduct description={product?.description ?? "Đang cập nhật"} />
      <div className="bg-[#f2f6f3]">
        <div className="max-w-7xl mx-auto p-3 pt-20 pb-20">
          <RelatedProducts productID={Number(product?.id)} />
          <ProductSuggestions />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
