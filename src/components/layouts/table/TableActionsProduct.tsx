import { deleteProduct } from "@/api/products/product.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { LuPenLine } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "react-toastify";

interface IProps {
  id: number;
  slug: string;
}

const TableActionsProduct: React.FC<IProps> = ({ id, slug }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["findAllWithFilter"] });
      toast.success("Category deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return (
    <div className="flex gap-3">
      <Link
        href={`/dashboard/products/edit/${slug}`}
        className="hover:scale-150"
      >
        <LuPenLine size={20} className="text-[#22C55E] cursor-pointer" />
      </Link>
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

export default TableActionsProduct;
