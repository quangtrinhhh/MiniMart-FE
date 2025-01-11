import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";

const HeaderBottom: React.FC = () => {
  return (
    <div className="bg-[#016735] ">
      <div className="max-w-3xl mx-auto">
        <ul className="flex  items-center text-white  text-sm">
          <li className="hover:text-orange-500 py-3 px-[2rem]">
            <Link href="/">Giới thiệu</Link>
          </li>

          <li className="group relative py-3 px-[2rem]">
            <Link href="/">
              <div className="w-full">
                <div className="flex items-center">
                  <span className="group-hover:text-orange-500">
                    Khuyến mãi
                  </span>
                  <IoIosArrowDown
                    size={15}
                    className="ml-2 group-hover:text-orange-500"
                  />
                </div>
              </div>
            </Link>

            {/* Dropdown menu */}
            <ul className="absolute top-full w-52 left-0 z-50 bg-white text-black shadow-md hidden group-hover:block">
              <li className="flex items-center gap-3  px-6 py-2 hover:bg-gray-100 text-gray-900 font-medium">
                <Link href="/khuyen-mai-1">Sele 1 khung giờ</Link>
              </li>
              <li className="flex items-center gap-3  px-6 py-2 hover:bg-gray-100 text-gray-900 font-medium">
                <Link href="/khuyen-mai-2">Sele nhiều khung giờ</Link>
              </li>
            </ul>
          </li>

          <li className="hover:text-orange-500 py-3 px-[2rem]">
            <Link href="/">Tin tức</Link>
          </li>
          <li className="hover:text-orange-500 py-3 px-[2rem]">
            <Link href="/">Kiểm tra đơn hàng</Link>
          </li>
          <li className="hover:text-orange-500 py-3 px-[2rem]">
            <Link href="/">Liên hệ</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderBottom;
