import Link from "next/link";
import { MdArrowForwardIos } from "react-icons/md";

const NavigationVertical: React.FC = ({}) => {
  return (
    <div className="flex-grow overflow-y-auto no-scrollbar ">
      <ul className="relative">
        <li className="px-6 group hover:bg-neutral-200 -mt-[1px]">
          <Link
            className="flex items-center gap-3.5 py-3 font-semibold"
            href="/"
          >
            Tất cả sản phẩm
          </Link>
        </li>
        <li className="px-6 group hover:bg-neutral-200 -mt-[1px]">
          <Link
            className="flex items-center gap-3.5 py-3 font-semibold justify-between"
            href="/"
          >
            <span> Thực phẩm tươi sống</span>
            <MdArrowForwardIos size={15} className="font-extralight" />
          </Link>
          {/* <div className="text-sm bg-white absolute right-0 top-0 w-[200px] h-screen z-50">
            <ul>
              <li>
                <span className="font-semibold">Rau củ quả</span>
                <ul>
                  <li>Rau lá</li>
                  <li>Rau lá</li>
                  <li>Rau lá</li>
                  <li>Rau lá</li>
                </ul>
              </li>
              <li>
                <span className="font-semibold">Rau củ quả</span>
                <ul>
                  <li>Rau lá</li>
                  <li>Rau lá</li>
                  <li>Rau lá</li>
                  <li>Rau lá</li>
                </ul>
              </li>
            </ul>
          </div> */}
        </li>
      </ul>
    </div>
  );
};

export default NavigationVertical;
