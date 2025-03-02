import { FaRegEye } from "react-icons/fa6";
import { LuPenLine } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";

const TableActions: React.FC = () => {
  return (
    <div className="flex gap-3">
      <button type="button">
        <FaRegEye size={20} className="text-[#2377FC] cursor-pointer" />
      </button>
      <button type="button">
        <LuPenLine size={20} className="text-[#22C55E] cursor-pointer" />
      </button>
      <button type="button">
        <RiDeleteBin5Line size={20} className="text-[#FF5200] cursor-pointer" />
      </button>
    </div>
  );
};

export default TableActions;
