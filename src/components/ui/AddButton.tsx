import Link from "next/link";
import { FaPlus } from "react-icons/fa";

interface IProps {
  href: string;
}

const AddButton: React.FC<IProps> = ({ href }) => {
  return (
    <Link
      href={href}
      className="w-52 border rounded-xl border-[#2275fc] bg-white flex justify-center items-center text-[#2275fc] hover:text-white hover:bg-[#2275fc] duration-300 ml-auto"
    >
      <div className="flex gap-2 items-center text-base font-bold">
        <FaPlus />
        <span>Add</span>
      </div>
    </Link>
  );
};

export default AddButton;
