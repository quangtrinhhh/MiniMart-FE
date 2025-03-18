import { Product } from "@/types/backend";
import { formatCurrency } from "@/ulils/currency";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CiShoppingBasket } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { LuArrowRightLeft } from "react-icons/lu";
import ProductModal from "./ProductModal";
import ProductSoldIndicator from "../../ui/ProductSoldIndicator";
import { toast } from "react-toastify";
import { useAddToCart } from "@/hooks/useCart";

interface ProductProps {
  product: Product;
}

const CardProduct: React.FC<ProductProps> = ({ product }) => {
  const { mutate: addToCart } = useAddToCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (!product)
    return <div className="text-gray-500">Sản phẩm không tồn tại</div>;

  // ✅ Tách logic ra khỏi JSX
  const imageUrl1 = product?.assets?.[0]?.asset?.path || "/default-image.jpg";
  const imageUrl2 = product?.assets?.[1]?.asset?.path || "/default-image.jpg";
  const productName = product.name || "Sản phẩm chưa có tên";
  const productSlug = product.slug ? `/${product.slug}` : "/";

  const productPrice = Number(product.variants?.[0]?.price ?? product.price);
  const oldPrice = Number(product.variants?.[0]?.old_price);
  const discount = product.discount;
  const isOutOfStock = product.stock === 0;
  const hasDiscount = oldPrice > 0;

  const hasVariants = product.variants?.length > 0;
  const handleAddToCart = (variantId?: number) => {
    if (!addToCart) return; // Kiểm tra nếu mutate chưa được khởi tạo

    addToCart(
      {
        productId: product.id,
        variantId, // Nếu sản phẩm có biến thể, truyền variantId
        quantity: 1,
      },
      {
        onSuccess: () => toast.success("Thêm vào giỏ hàng thành công"),
        onError: () => toast.error("Không thể thêm vào giỏ hàng"),
      }
    );
  };
  return (
    <div className="bg-white overflow-hidden group flex flex-col border shadow-md hover:shadow-lg transition">
      {/* Ảnh sản phẩm */}
      <div className="relative w-full aspect-square overflow-hidden rounded-xl">
        <Image
          src={imageUrl1}
          alt={product.assets?.[0]?.asset?.filename || productName}
          className="object-cover w-full h-full p-3 rounded-lg"
          width={480}
          height={480}
        />
        <Image
          src={imageUrl2}
          alt={product.assets?.[1]?.asset?.filename || productName}
          className="object-cover w-full h-full p-3 rounded-lg absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          width={480}
          height={480}
        />

        {/* Nút xem nhanh & yêu thích */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            className="w-9 h-9 flex items-center justify-center bg-white rounded-full border shadow hover:bg-gray-100"
            onClick={() => setIsModalOpen(true)}
          >
            <IoEyeOutline size={17} />
          </button>
          <button className="w-9 h-9 flex items-center justify-center bg-white rounded-full border shadow hover:bg-gray-100">
            <LuArrowRightLeft size={17} />
          </button>
        </div>
      </div>

      {/* Thông tin sản phẩm */}
      <div className="p-3 flex flex-col gap-1">
        <Link
          href={productSlug}
          className="text-base font-semibold truncate hover:text-[#ff9d02]"
        >
          {productName}
        </Link>

        <div className="flex justify-between items-center text-lg">
          <div>
            <span className="font-semibold text-[#ff3c02]">
              {formatCurrency(productPrice) || "Liên hệ"}
            </span>

            {hasDiscount && (
              <div className="flex items-center gap-2">
                <span className="text-[#929292] line-through text-xs">
                  {formatCurrency(oldPrice)}
                </span>
                {discount && (
                  <div className="text-white bg-red-600 rounded-full font-semibold text-xs px-2 py-1">
                    {discount}%
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Hiển thị trạng thái hết hàng hoặc nút thêm vào giỏ */}
          {isOutOfStock ? (
            <div className="bg-[#EBEBEB] rounded-full text-[#EE1926] px-2.5 py-1 text-xs font-semibold">
              Hết hàng
            </div>
          ) : (
            <button
              className="relative p-2 rounded-full text-[#FF3C02] hover:scale-110"
              onClick={() =>
                hasVariants == true ? setIsModalOpen(true) : handleAddToCart()
              }
            >
              <span className="absolute inset-0 bg-[#FF3C02] opacity-10 rounded-full"></span>
              <CiShoppingBasket size={20} className="relative" />
            </button>
          )}
        </div>

        {/* Thanh tiến trình sản phẩm đã bán */}
        {product.sold !== 0 && (
          <ProductSoldIndicator sold={product.sold} stock={product.stock} />
        )}
      </div>

      {/* Modal xem nhanh sản phẩm */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialProduct={product}
        slug={product.slug}
      />
    </div>
  );
};

export default CardProduct;
