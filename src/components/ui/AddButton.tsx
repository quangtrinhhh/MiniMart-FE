import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export default function AddButton() {
  return (
    <Link
      href="/admin/products/create"
      className="w-52 border rounded-xl border-[#2275fc] bg-white flex justify-center items-center text-[#2275fc] hover:text-white hover:bg-[#2275fc] duration-300 ml-auto"
    >
      <div className="flex gap-2 items-center text-base font-bold">
        <FaPlus />
        <span>Add</span>
      </div>
    </Link>
  );
}
