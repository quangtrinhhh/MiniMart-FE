"use client";
import { useState } from "react";
import Image from "next/image";
import { IoIosClose } from "react-icons/io";

const MiniCartProduct: React.FC = () => {
  const [quantity, setQuantity] = useState<number>(1);

  // Hàm tăng số lượng
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  // Hàm giảm số lượng, không để dưới 1
  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // Hàm xử lý nhập số lượng trực tiếp
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  return (
    <div className="item flex flex-col sm:flex-row gap-3 pb-3 border-b">
      <div className="rounded-md overflow-hidden w-20 h-20 flex-shrink-0">
        <Image
          src="/asset/frame-102-1.jpg"
          width={70}
          height={70}
          alt="Sáp thơm phòng"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col flex-grow justify-between">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <span className="font-semibold text-sm leading-tight">
              Sáp thơm phòng khử mùi Mr.Fresh Pure Aroma 230g cao cấp
            </span>
            <span className="text-gray-500 text-xs sm:text-sm mt-1">2L</span>
          </div>
          <button className="text-gray-400 hover:text-red-500 transition">
            <IoIosClose size={24} />
          </button>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="text-sm font-semibold text-red-500">
            {(41_000 * quantity).toLocaleString()}₫
          </div>
          <div className="flex items-center border rounded-md overflow-hidden">
            <button
              onClick={decreaseQuantity}
              className="px-2 py-1 text-sm hover:bg-gray-100"
            >
              -
            </button>
            <input
              type="text"
              value={quantity}
              onChange={handleInputChange}
              className="w-10 text-center border-l border-r text-sm outline-none"
            />
            <button
              onClick={increaseQuantity}
              className="px-2 py-1 text-sm hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniCartProduct;
