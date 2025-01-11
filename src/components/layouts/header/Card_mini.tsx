import { CiShoppingBasket } from "react-icons/ci";
interface Card_miniProps {
  numberItem: number;
}

const Card_mini: React.FC<Card_miniProps> = ({ numberItem }) => {
  return (
    <div className="flex items-center gap-1 ">
      <div className="relative">
        <CiShoppingBasket size={35} className="border_icon_gray_rounded" />
        <div className="absolute top-0 right-1">
          <span className=" flex items-center justify-center bg-red-600 w-4 h-4 p-1 text-[10px] rounded-full text-white">
            {numberItem}
          </span>
        </div>
      </div>
      <span className="text-sm  font-normal max-md:hidden">Giỏ hàng</span>
    </div>
  );
};

export default Card_mini;
