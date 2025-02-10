import { FaArrowRightToBracket } from "react-icons/fa6";

const FooterMiniCard: React.FC = ({}) => {
  return (
    <div className="border-t border-dashed">
      <div className="py-2 md:py-4 flex items-start justify-between w-full">
        <p className="font-semibold">Tổng cộng</p>
        <div className="flex flex-col items-end">
          <span className="font-semibold text-red-500">663.000Đ</span>
          <div className="text-sm text-neutral-400 cart-vat-note">
            Nhập mã giảm giá ở trang thanh toán
          </div>
        </div>
      </div>
      <div className="">
        <button className="bg-[#016735] w-full p-2 rounded-full font-semibold  bg-primary text-white inline-flex  justify-center items-center gap-2">
          <span>Thanh toán</span>
          <FaArrowRightToBracket size={20} />
        </button>
      </div>
    </div>
  );
};

export default FooterMiniCard;
