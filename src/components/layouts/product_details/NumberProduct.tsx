"use client";
import { FaMinus, FaPlus } from "react-icons/fa6";

interface IProps {
  stock: number;
  quantity: number;
  setQuantity: (quantity: number) => void;
}

const NumberProduct: React.FC<IProps> = ({ stock, quantity, setQuantity }) => {
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < stock) setQuantity(quantity + 1); // Không vượt quá tồn kho
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0 && value <= stock) {
      setQuantity(value);
    }
  };

  return (
    <div className="flex gap-5 items-center mt-5 text-neutral-500">
      {/* Label */}
      <div className="text-neutral-500 font-medium">Số lượng</div>

      {/* Input Group */}
      <div className="flex flex-row h-10 border border-neutral-200 relative bg-background rounded-pill overflow-hidden w-1/5">
        {/* Button giảm số lượng */}
        <button
          onClick={handleDecrease}
          className="h-full w-20 cursor-pointer outline-non p-2"
          aria-label="Decrease quantity"
        >
          <FaMinus size={16} />
        </button>

        {/* Input số lượng */}
        <input
          type="number"
          value={quantity}
          onChange={handleChange}
          className="focus:outline-none w-full focus:ring-transparent text-base font-semibold text-md md:text-base cursor-default flex items-center outline-none bg-transparent border-none text-center no-arrows"
          min="1"
          max={Number.isFinite(stock) ? stock : 999}
        />

        {/* Button tăng số lượng */}
        <button
          onClick={handleIncrease}
          className="h-full w-20 cursor-pointer outline-non p-2"
          aria-label="Increase quantity"
        >
          <FaPlus size={16} />
        </button>
      </div>
      <span>Có sẵn {stock} sản phẩm</span>
      {/* Custom CSS */}
      <style jsx>{`
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield; /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default NumberProduct;
