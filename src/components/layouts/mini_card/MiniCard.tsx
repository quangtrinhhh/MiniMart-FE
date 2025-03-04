"use client";
import { IoIosClose } from "react-icons/io";
import MiniCartProduct from "./MiniCartProduct";
import FooterMiniCard from "./FooterMiniCard";
import { useUI } from "@/context/UIProvider";

const MiniCard: React.FC = () => {
  const { isMiniCardOpen, toggleMiniCard } = useUI();

  return (
    <div className="relative">
      {/* Overlay */}
      {isMiniCardOpen && (
        <div
          className={`fixed inset-0 bg-black z-50 opacity-70 transition-opacity duration-300`}
          onClick={toggleMiniCard} // Click vào nền sẽ đóng Mini Cart
        ></div>
      )}
      {/* Mini Cart */}
      <div
        className={`fixed top-0 right-0 w-[30rem] h-full bg-white transform transition-transform duration-300 z-50 overflow-y-auto flex flex-col ${
          isMiniCardOpen ? "translate-x-0" : "translate-x-[30rem]"
        }`}
      >
        {/* Header */}
        <div className="pt-4 px-4 flex justify-between items-center border-b pb-3 border-neutral-100 text-2xl font-semibold">
          <div>Giỏ hàng</div>
          <button
            onClick={toggleMiniCard} // Nút đóng Mini Cart
            className="border rounded-full p-1 w-8 h-8 flex justify-center items-center hover:bg-[#ebebeb]"
          >
            <IoIosClose size={25} />
          </button>
        </div>

        {/* Nội dung sản phẩm */}
        <div className="p-4 flex-grow">
          <MiniCartProduct />
        </div>

        {/* Footer */}
        <div className="p-4">
          <FooterMiniCard />
        </div>
      </div>
    </div>
  );
};

export default MiniCard;
