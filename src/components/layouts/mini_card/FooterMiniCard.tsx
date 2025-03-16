import { useCart } from "@/context/CartProvider";
import { useSession } from "next-auth/react";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { toast } from "react-toastify";

const FooterMiniCard: React.FC = () => {
  const { cart } = useCart();
  const { data: session } = useSession();
  // Tính tổng tiền
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Định dạng tiền VND
  const formattedTotal = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(totalPrice);
  const handleCheckOut = () => {
    if (!session) return toast.warn("Vui lòng đăng nhập trước khi thanh toán!");
    toast.warn("Chức năng đang được phát triền");
  };
  return (
    <div className="border-t border-dashed">
      <div className="py-2 md:py-4 flex items-start justify-between w-full">
        <p className="font-semibold">Tổng cộng</p>
        <div className="flex flex-col items-end">
          <span className="font-semibold text-red-500">{formattedTotal}</span>
          <div className="text-sm text-neutral-400">
            Nhập mã giảm giá ở trang thanh toán
          </div>
        </div>
      </div>
      <div className="">
        <button
          className={`w-full p-2 rounded-full font-semibold inline-flex justify-center items-center gap-2 ${
            cart.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#016735] text-white"
          }`}
          disabled={cart.length === 0}
          onClick={() => handleCheckOut()}
        >
          <span>Thanh toán</span>
          <FaArrowRightToBracket size={20} />
        </button>
      </div>
    </div>
  );
};

export default FooterMiniCard;
