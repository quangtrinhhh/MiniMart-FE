import { IoIosArrowForward } from "react-icons/io";
import CouponItem from "./CouponItem";

const CouponBox: React.FC = ({}) => {
  return (
    <div>
      <div className="mt-5">
        <div className="w-full flex items-center text-sm">
          <div className="text-neutral-500 mb-2 w-[88px]  flex-shrink-0 flex-grow-0">
            Mã giảm giá
          </div>
          <div className="flex items-center text-center gap-1">
            <div className="inline-flex max-w-[calc(100%-86px)] overflow-hidden items-center gap-3 cursor-pointer">
              <CouponItem />
              <CouponItem />
              <CouponItem />
            </div>
            <div className="px-3 py-3  rounded-lg text-[#FF9D02]  bg-[#ff9d02] bg-opacity-10">
              <IoIosArrowForward />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponBox;
