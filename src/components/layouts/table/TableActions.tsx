import { FaRegEye } from "react-icons/fa6";
import { LuPenLine } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";

const TableActions: React.FC = () => {
  return (
    <div className="flex gap-3">
      <FaRegEye size={20} className="text-[#2377FC] cursor-pointer" />
      <LuPenLine size={20} className="text-[#22C55E] cursor-pointer" />
      <RiDeleteBin5Line size={20} className="text-[#FF5200] cursor-pointer" />
    </div>
  );
};

export default TableActions;
