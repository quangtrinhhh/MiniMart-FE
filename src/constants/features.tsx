import { CiDeliveryTruck } from "react-icons/ci";
import { FaSync } from "react-icons/fa";
import { RiDiscountPercentLine } from "react-icons/ri";
import { SlLike } from "react-icons/sl";
export const FEATURES = [
  {
    icon: <CiDeliveryTruck size={25} />,
    title: "Giao hoả tốc",
    description: "Nội thành TP. HCM trong 4h",
  },
  {
    icon: <FaSync size={25} />,
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
