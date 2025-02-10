import { RiCoupon3Line } from "react-icons/ri";

const CouponItem: React.FC = () => {
  return (
    <div className="coupon-group-item whitespace-nowrap text-ellipsis overflow-hidden w-1/3 flex gap-2 items-center px-3 py-2 rounded-lg bg-[#ff9d02] bg-opacity-10 text-[#FF9D02]">
      <div className="flex gap-2 items-center w-full">
        <RiCoupon3Line size={20} />
        <div className="coupon-group-item__code font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
          EGA50THANG10
        </div>
      </div>
    </div>
  );
};
export default CouponItem;
