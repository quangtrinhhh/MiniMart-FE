import Image from "next/image";
import TableActions from "./TableActions";
import { Category } from "@/types/backend";

interface TableRowProps {
  data: Category;
  isEven: boolean;
  isLoading?: boolean;
  error?: unknown;
}

const TableRow: React.FC<TableRowProps> = ({
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
            src={data.image || "/no-image.png"}
            alt={data.name}
            width={50}
            height={50}
          />
        </div>
        <span>{data.name}</span>
      </td>
      <td className="px-4 py-2">#{data.id}</td>
      <td className="px-4 py-2">{data.slug}</td>
      <td className="px-4 py-2">{data.description}</td>
      <td className="px-4 py-2">
        {data.status ? "Đang kinh doanh" : "Ngừng kinh doanh"}
      </td>
      <td className="px-4 py-2">
        {new Date(data.created_at).toLocaleString("vi-VN")}
      </td>

      <td className="px-4 py-2 hidden md:table-cell">
        <TableActions id={data.id} />
      </td>
    </tr>
  );
};

export default TableRow;
