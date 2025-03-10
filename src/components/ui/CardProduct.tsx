import { Product } from "@/types/backend";
import { formatCurrency } from "@/ulils/currency";
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
    <div className="bg-white overflow-hidden group flex flex-col border  shadow-md hover:shadow-lg transition">
      {/* Hiển thị ảnh sản phẩm */}
      <div className="relative w-full aspect-square overflow-hidden rounded-xl">
        <Image
          src={product?.assets?.[0]?.asset?.path || "/default-image.jpg"}
          alt={product?.assets?.[0]?.asset?.filename || "No image"}
          className="object-cover w-full h-full p-3 rounded-lg"
          width={480}
          height={480}
        />
        <Image
          src={product?.assets?.[1]?.asset?.path || "/default-image.jpg"}
          alt={product?.assets?.[1]?.asset?.filename || "No image"}
          className="object-cover w-full h-full p-3 rounded-lg absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          width={480}
          height={480}
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-9 h-9 flex items-center justify-center bg-white rounded-full border shadow hover:bg-gray-100">
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
          href={product.slug ? `/${product.slug}` : "/"}
          className="text-base font-semibold truncate hover:text-[#ff9d02]"
        >
          {product.name || "Sản phẩm chưa có tên"}
        </Link>
        <div className="flex justify-between items-center text-lg">
          <div>
            <span className="font-semibold text-[#ff3c02]">
              {formatCurrency(
                Number(product.variants?.[0]?.price ?? product.price)
              ) || "Liên hệ"}
            </span>
            {product.variants?.[0]?.old_price && (
              <div className="flex items-center gap-2">
                <span className="text-[#929292] line-through text-xs">
                  {formatCurrency(Number(product.variants[0]?.old_price))}
                </span>
                {product.discount && (
                  <div className="text-white bg-red-600 rounded-full font-semibold text-xs px-2 py-1">
                    {product.discount}%
                  </div>
                )}
              </div>
            )}
          </div>
          {product.stock === 0 ? (
            <div className="bg-[#EBEBEB] rounded-full text-[#EE1926] px-2.5 py-1 text-xs font-semibold">
              Hết hàng
            </div>
          ) : (
            <button className="relative p-2 rounded-full text-[#FF3C02] hover:scale-110">
              <span className="absolute inset-0 bg-[#FF3C02] opacity-10 rounded-full"></span>
              <CiShoppingBasket size={20} className="relative" />
            </button>
          )}
        </div>
        {product.sold !== 0 ? (
          <div className="w-full">
            <span className="text-sm mb-1 hover:text-[#ff9d02]">
              Đã bán {product.sold || 0} sản phẩm
            </span>
            <div className="w-full bg-neutral-100 rounded-sm h-1">
              <div
                className="bg-[#ee1926] rounded-sm h-1"
                style={{
                  width: `${((product.sold / product.stock) * 100).toFixed(
                    2
                  )}%`,
                }}
              ></div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CardProduct;
