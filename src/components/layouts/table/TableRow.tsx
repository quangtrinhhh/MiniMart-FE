import Image from "next/image";
import TableActions from "./TableActions";

interface TableRowProps {
  product: {
    id: string;
    name: string;
    price: string;
    quantity: number;
    sale: string;
    stock: string;
    startDate: string;
    image: string;
  };
  isEven: boolean;
}

const TableRow: React.FC<TableRowProps> = ({ product, isEven }) => {
  return (
    <tr className={`${isEven ? "" : "bg-[#f6f8fbcc] "} hover:bg-[#e0e2e5cc]`}>
      <td className="px-4 py-2 flex items-center gap-3 font-bold rounded-full">
        <div>
          <Image
            src={product.image}
            alt={product.name}
            width={50}
            height={50}
          />
        </div>
        <span>{product.name}</span>
      </td>
      <td className="px-4 py-2">{product.id}</td>
      <td className="px-4 py-2">{product.price}</td>
      <td className="px-4 py-2">{product.quantity}</td>
      <td className="px-4 py-2">{product.sale}</td>
      <td className="px-4 py-2 hidden md:table-cell">{product.stock}</td>
      <td className="px-4 py-2 hidden md:table-cell">{product.startDate}</td>
      <td className="px-4 py-2 hidden md:table-cell">
        <TableActions />
      </td>
    </tr>
  );
};

export default TableRow;
