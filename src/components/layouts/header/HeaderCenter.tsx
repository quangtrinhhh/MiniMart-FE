import Image from "next/image";
import { CiSearch, CiUser } from "react-icons/ci";
import { IoIosMenu } from "react-icons/io";
import Card_mini from "./Card_mini";
import Link from "next/link";
import { useSidebar } from "@/context/SidebarContext";
import { useUI } from "@/context/UIProvider";
import { useCart } from "@/context/CartProvider";

const HeaderCenter: React.FC = () => {
  const { toggleSidebar } = useSidebar();
  const { toggleMiniCard } = useUI();
  const { cart } = useCart();

  // 🛒 Tính tổng số lượng sản phẩm trong giỏ hàng
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <div className="w-full bg-white">
      <div className="flex justify-between items-center text-center p-2 py-4 max-w-7xl mx-auto gap-5">
        <button
          onClick={toggleSidebar}
          className="flex justify-center items-center text-center gap-1 text-sm hover:text-orange-500 cursor-pointer"
        >
          <span className="border_icon_gray_rounded">
            <IoIosMenu size={20} />
          </span>
          <span className="max-xl:hidden">Danh mục sản phầm</span>
        </button>

        <div className="left-reponsive ">
          <Link href="/">
            <Image src="/asset/logo.png" alt="logo" width={100} height={200} />
          </Link>
        </div>

        {/*  */}
        <div className="header-icon-wrapper flex items-center justify-end  gap-2 xl:gap-5.5 width-full-976">
          <div className="flex items-center hover:bg-[#ebebeb] rounded-md p-1">
            <span className="border_icon_gray_rounded">
              <CiSearch size={20} />
            </span>
          </div>

          <Link href="/account/login">
            <div className="flex items-center hover:bg-[#ebebeb] rounded-md p-1">
              <span className="border_icon_gray_rounded">
                <CiUser size={20} />
              </span>
            </div>
          </Link>

          <div
            className="flex items-center  hover:bg-[#ebebeb] rounded-md p-1 cursor-pointer"
            onClick={toggleMiniCard}
          >
            <Card_mini numberItem={totalItems ?? 0} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderCenter;
