"use client";
import { useCart } from "@/context/CartProvider";
import Image from "next/image";
import { IoIosClose } from "react-icons/io";

const MiniCartProduct: React.FC = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  if (cart.length === 0) {
    return <p className="text-center text-gray-500">Giỏ hàng trống</p>;
  }

  return (
    <div className="space-y-4 ">
      {cart.map((item, index) => (
        <div
          key={`${item.id}-${item.variant?.id || "default"}-${index}`}
          className="flex gap-3 pb-3 border-b"
        >
          {/* Hình ảnh */}
          <div className="rounded-md overflow-hidden w-20 h-20 flex-shrink-0">
            <Image
              src={item.image?.asset.path ?? "/fallback-image.jpg"}
              width={70}
              height={70}
              alt={item.name}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Thông tin sản phẩm */}
          <div className="flex flex-col flex-grow justify-between">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="font-semibold text-sm">{item.name}</span>
                <span className="text-gray-500 text-xs sm:text-sm mt-1">
                  {item.variant
                    ? `Biến thể: ${item.variant.name}`
                    : "Không có biến thể"}
                </span>
              </div>

              {/* Nút xóa */}
              <button
                onClick={() =>
                  removeFromCart(Number(item.id), Number(item.variant?.id))
                }
                className="text-gray-400 hover:text-red-500 transition"
              >
                <IoIosClose size={24} />
              </button>
            </div>

            {/* Giá và số lượng */}
            <div className="flex justify-between items-center mt-2">
              <div className="text-sm font-semibold text-red-500">
                {(item.price * item.quantity).toLocaleString()}₫
              </div>

              {/* Chỉnh số lượng */}
              <div className="flex items-center border rounded-md overflow-hidden">
                <button
                  onClick={() =>
                    updateQuantity(
                      Number(item.id),
                      Number(item.variant?.id),
                      item.quantity - 1
                    )
                  }
                  className="px-2 py-1 text-sm hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="text"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(
                      Number(item.id),
                      Number(item.variant?.id),
                      Math.max(1, Number(e.target.value))
                    )
                  }
                  className="w-10 text-center border-l border-r text-sm outline-none"
                />
                <button
                  onClick={() =>
                    updateQuantity(
                      Number(item.id),
                      Number(item.variant?.id),
                      item.quantity + 1
                    )
                  }
                  className="px-2 py-1 text-sm hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MiniCartProduct;
