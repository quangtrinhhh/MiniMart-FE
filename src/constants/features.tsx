import { CiCoinInsert, CiDeliveryTruck } from "react-icons/ci";
import { RiDiscountPercentLine, RiLoopRightLine } from "react-icons/ri";
import { SlLike } from "react-icons/sl";
export const FEATURES = [
  {
    icon: <CiDeliveryTruck size={25} />,
    title: "Giao hoả tốc",
    description: "Nội thành TP. HCM trong 4h",
  },
  {
    icon: <RiLoopRightLine size={25} />,
    title: "Đổi trả miễn phí",
    description: "Trong vòng 30 ngày miễn phí",
  },
  {
    icon: <SlLike size={25} />,
    title: "Hỗ trợ 24/7",
    description: "Hỗ trợ khách hàng 24/7",
  },
  {
    icon: <RiDiscountPercentLine size={25} />,
    title: "Deal hot bùng nổ",
    description: "Flash sale giảm giá cực sốc",
  },
];

export const PRODUCT_FEATURES = [
  {
    icon: <CiDeliveryTruck size={20} />,
    title: "Giao hàng miễn phí trong 24h (chỉ áp dụng khu vực nội thành)",
  },
  {
    icon: <CiCoinInsert size={20} />,
    title: "Trả góp lãi suất 0% qua thẻ tín dụng Visa, Master, JCB",
  },
  {
    icon: <RiLoopRightLine size={20} />,
    title: "Đổi trả miễn phí trong 30 ngày",
  },
];
