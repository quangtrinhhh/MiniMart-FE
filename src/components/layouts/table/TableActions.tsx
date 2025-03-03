import { deleteCategory } from "@/app/api/categories/category.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaRegEye } from "react-icons/fa6";
import { LuPenLine } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "react-toastify";

interface IProps {
  id: number;
}

const TableActions: React.FC<IProps> = ({ id }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteCategory(id), // ✅ Để mutationFn là một HÀM, không gọi trực tiếp
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return (
    <div className="flex gap-3">
      <button type="button" className="hover:scale-150">
        <FaRegEye size={20} className="text-[#2377FC] cursor-pointer" />
      </button>
      <button type="button" className="hover:scale-150">
        <LuPenLine size={20} className="text-[#22C55E] cursor-pointer" />
      </button>
      <button
        type="button"
        className="hover:scale-150"
        onClick={() => mutation.mutate()}
      >
        <RiDeleteBin5Line size={20} className="text-[#FF5200] cursor-pointer" />
      </button>
    </div>
  );
};

export default TableActions;
