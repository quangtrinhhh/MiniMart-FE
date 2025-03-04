import { Product } from "@/types/backend";
import TableHeader from "./TableHeader";
import Pagination from "@/components/ui/Pagination";
import { ProductColumns } from "@/types/type";
import TableRowProduct from "./TableRowProduct";

interface IProps {
  data: Product[];
  totalPagesProps: number;
  totalItemsProps: number;
  isLoading?: boolean;
  error?: unknown;
  setCurrent?: (value: number) => void;
  setPageSize?: (value: number) => void;
}

const TableProductList: React.FC<IProps> = ({
  data,
  totalPagesProps,
  totalItemsProps,
  isLoading,
  error,
  setCurrent,
}) => {
  return (
    <div className="mt-5 w-full mb-2">
      <div className="w-full overflow-x-auto pb-3 scrollbar-custome">
        <table className="min-w-[1515px] w-full border-collapse">
          <TableHeader columns={ProductColumns} />
          <tbody>
            {data.length > 0 ? (
              data.map((product, index) => (
                <TableRowProduct
                  key={product.id}
                  data={product}
                  isEven={index % 2 === 0}
                  isLoading={isLoading}
                  error={error}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        totalPagesProps={totalPagesProps}
        totalItemsProps={totalItemsProps}
        setCurrent={setCurrent}
      />
    </div>
  );
};

export default TableProductList;
