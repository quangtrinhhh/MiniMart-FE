import { Product } from "@/types/backend";
import Image from "next/image";
import Link from "next/link";
import { CiShoppingBasket } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { LuArrowRightLeft } from "react-icons/lu";

interface ProductProps {
  product: Product;
}

const CardProduct: React.FC<ProductProps> = ({ product }) => {
  if (!product) {
    return <div className="text-gray-500">Sản phẩm không tồn tại</div>;
  }

  return (
    <Link
      href={product.slug ? `/${product.slug}` : "/"}
      className="bg-white overflow-hidden group flex flex-col"
    >
      {/* Hiển thị ảnh sản phẩm */}
      <div className="p-3">
        <div className="relative">
          <div>
            <Image
              src={product?.assets?.[0]?.asset?.path || "/default-image.jpg"}
              alt={product?.assets?.[0]?.asset?.filename || "No image"}
              className="rounded-lg"
              width={480}
              height={480}
            />
            <Image
              src={product?.assets?.[1]?.asset?.path || "/default-image.jpg"}
              alt={product?.assets?.[1]?.asset?.filename || "No image"}
              className="rounded-lg absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              width={480}
              height={480}
            />
          </div>
          <div className="absolute top-2 -right-10 group-hover:right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-0 translate-x-10">
            <div className="w-9 h-9 rounded-full flex items-center justify-center border-[#999999] border bg-white opacity-65 hover:opacity-100">
              <IoEyeOutline size={17} />
            </div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center border-[#999999] border bg-white opacity-65 hover:opacity-100">
              <LuArrowRightLeft size={17} />
            </div>
          </div>
        </div>
      </div>

      {/* Thông tin sản phẩm */}
      <div>
        <div className="px-3 pb-3 group">
          <span className="text-base font-semibold line-clamp-2 group-hover:text-[#ff9d02]">
            {product.name || "Sản phẩm chưa có tên"}
          </span>
          <div className="flex justify-between items-center text-lg">
            <div>
              <span className="font-semibold text-[#ff3c02]">
                {product.price ? `${product.price}₫` : "Liên hệ"}
              </span>
              {product.variants?.[0]?.price && (
                <div className="flex items-center gap-2">
                  <span className="text-[#929292] line-through text-xs">
                    {product.variants[0]?.price}₫
                  </span>
                  {product.discount ? (
                    <div className="text-white bg-red-600 rounded-full font-semibold text-xs p-1 md:px-1.5 md:py-1">
                      {product.discount}%
                    </div>
                  ) : null}
                </div>
              )}
            </div>
            <div>
              {product.stock === 0 ? (
                <div className="bg-[#EBEBEB] rounded-full text-[#EE1926] px-2.5 py-2 text-xs font-semibold whitespace-nowrap">
                  Hết hàng
                </div>
              ) : (
                <button className="relative p-2 rounded-full text-[#FF3C02]">
                  <span className="absolute inset-0 bg-[#FF3C02] opacity-10 rounded-full"></span>
                  <CiShoppingBasket size={20} className="relative" />
                </button>
              )}
            </div>
          </div>
          <div className="w-full">
            <span className="text-sm mb-1 group-hover:text-[#ff9d02]">
              Đã bán {product.sold || 0} sản phẩm
            </span>
            <div className="w-full bg-neutral-100 rounded-sm h-1">
              <div
                className="stock-percent bg-[#ee1926] rounded-sm h-1"
                style={{ width: `${product.sold ? product.sold : 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardProduct;
