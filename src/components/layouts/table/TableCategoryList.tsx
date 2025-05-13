import { Category } from "@/types/backend";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import Pagination from "@/components/layouts/admin/pagination";
import { CategoryColumns } from "@/types/type";

interface IProps {
  data: Category[];
  totalPagesProps: number;
  totalItemsProps: number;
  isLoading?: boolean;
  error?: unknown;
  setCurrent?: (value: number) => void;
  setPageSize?: (value: number) => void;
}

const TableCategoryList: React.FC<IProps> = ({
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
          <TableHeader columns={CategoryColumns} />
          <tbody>
            {data.length > 0 ? (
              data.map((category, index) => (
                <TableRow
                  key={category.id}
                  data={category}
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

export default TableCategoryList;
