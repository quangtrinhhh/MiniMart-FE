"use client";
import { Product, Variant } from "@/types/backend";
import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductGallery from "../product_details/ProductGallery";
import BrandAndCode from "../product_details/BrandAndCode";
import ProductVariants from "../product_details/ProductVariants";
import { toast } from "react-toastify";
import NumberProduct from "../product_details/NumberProduct";
import ButtonProductDetails from "../product_details/Button";
import { useCart } from "@/context/CartProvider";
import PriceAndSele from "../product_details/PriceAndSele";
import { getOnlyProduct } from "@/app/api/products/product.api";
import { useQuery } from "@tanstack/react-query";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  slug: string;
  initialProduct: Product;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  slug,
  initialProduct,
}) => {
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
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        {/* Overlay mờ nền */}
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />

        {/* Nội dung popup */}
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg w-full max-w-[70rem] p-6 z-50">
          {/* Nút đóng */}
          <Dialog.Close
            className="absolute top-3 right-3 text-gray-500 hover:text-black"
            onClick={onClose}
          >
            <X size={20} />
          </Dialog.Close>

          {/* Nội dung sản phẩm */}
          <div className="grid grid-cols-2 gap-4">
            {/* Hình ảnh sản phẩm */}
            <ProductGallery images={product.assets ?? []} />

            {/* Thông tin sản phẩm */}
            <div className="">
              <Dialog.DialogTitle className="font-bold text-2xl">
                {product?.name ?? "Product Details"}
              </Dialog.DialogTitle>
              <BrandAndCode />
              <PriceAndSele
                price={
                  Number(selectedVariant?.price) !== 0
                    ? Number(product.price)
                    : Number(selectedVariant?.price) || 0
                }
                old_price={Number(selectedVariant?.old_price)}
                discount={product.discount}
              />
              <ProductVariants
                variants={product.variants}
                onSelectVariant={setSelectedVariant}
              />

              <NumberProduct
                stock={
                  Number(selectedVariant?.stock) != 0
                    ? Number(product.stock)
                    : 0
                }
                quantity={quantity}
                setQuantity={setQuantity}
              />
              <ButtonProductDetails
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
              />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ProductModal;
