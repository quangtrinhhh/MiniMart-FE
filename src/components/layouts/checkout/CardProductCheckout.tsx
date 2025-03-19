import { formatCurrency } from "@/ulils/currency";
import Image from "next/image";

interface Props {
  name: string;
  img: string;
  quantity: number;
  variant: string;
  price: number;
}

const CardProductCheckout: React.FC<Props> = ({
  name,
  img,
  quantity,
  variant,
  price,
}) => {
  return (
    <div className="flex items-center gap-3 mt-2">
      {/* Hình ảnh sản phẩm */}
      <div className="relative w-14 h-14 border-2 rounded-lg flex-shrink-0">
        <Image
          src={`${img}`}
          alt="product-image"
          width={56}
          height={56}
          className="rounded-lg w-full h-full object-cover"
        />
        <span className="bg-[#2A9DCC] flex text-center justify-center items-center w-5 h-5 text-xs rounded-full text-white absolute -top-2 -right-2">
          {quantity}
        </span>
      </div>

      {/* Thông tin sản phẩm */}
      <div className="flex-1">
        <p className="text-sm font-medium line-clamp-2">{name}</p>
        <span className="text-xs text-gray-500">{variant}</span>
      </div>

      {/* Giá sản phẩm */}
      <div className="text-sm font-semibold text-gray-900 whitespace-nowrap">
        {formatCurrency(price)}
      </div>
    </div>
  );
};

export default CardProductCheckout;
