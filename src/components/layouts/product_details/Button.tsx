interface ButtonProductDetailsProps {
  onBuyNow: () => void;
  onAddToCart: () => void;
}

const ButtonProductDetails: React.FC<ButtonProductDetailsProps> = ({
  onBuyNow,
  onAddToCart,
}) => {
  return (
    <div>
      <div className="flex gap-2 mt-4 border-t border-neutral-200 pt-4">
        <button
          onClick={onBuyNow}
          className="border w-full border-[#ff3c02] text-[#ff3c02] hover:bg-[#ff3c02] hover:text-white font-semibold rounded-full py-2"
        >
          Mua ngay
        </button>
        <button
          onClick={onAddToCart}
          className="border w-full border-[#ff3c02] bg-[#ff3c02] text-gray-200 hover:text-white font-semibold rounded-full py-2"
        >
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default ButtonProductDetails;
