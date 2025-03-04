import Image from "next/image";
import { Product } from "@/types/backend";
import TableActionsProduct from "./TableActionsProduct";

interface TableRowProps {
  data: Product;
  isEven: boolean;
  isLoading?: boolean;
  error?: unknown;
}

const TableRowProduct: React.FC<TableRowProps> = ({
  data,
  isEven,
  isLoading,
  error,
}) => {
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <tr className={`${isEven ? "" : "bg-[#f6f8fbcc] "} hover:bg-[#e0e2e5cc]`}>
      <td className="px-4 py-2 flex items-center gap-3 font-bold rounded-full">
        <div>
          <Image
            src={data.assets[0].path || "/no-image.png"}
            alt={data.name}
            width={50}
            height={50}
          />
        </div>
        <span>{data.name}</span>
      </td>
      <td className="px-4 py-2">#{data.id}</td>
      <td className="px-4 py-2">{data.price}</td>
      <td className="px-4 py-2">{data.slug}</td>
      <td className="px-4 py-2">{data.description}</td>
      <td className="px-4 py-2">{data.sold}</td>
      <td className="px-4 py-2">
        {data.status ? "Đang kinh doanh" : "Ngừng kinh doanh"}
      </td>
      <td className="px-4 py-2">{data.quantity}</td>
      <td className="px-4 py-2">{data.featured ? "Yes" : "No"}</td>
      <td className="px-4 py-2">{data.discount}</td>
      <td className="px-4 py-2">
        {new Date(data.created_at).toLocaleString("vi-VN")}
      </td>

      <td className="px-4 py-2 hidden md:table-cell">
        <TableActionsProduct id={data.id} />
      </td>
    </tr>
  );
};

export default TableRowProduct;
