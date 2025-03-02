import { Category } from "@/types/backend";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import Pagination from "@/components/ui/Pagination";

interface IProps {
  data: Category[];
  totalPagesProps: number;
  totalItemsProps: number;
}

const TableCategoryList: React.FC<IProps> = ({
  data,
  totalPagesProps,
  totalItemsProps,
}) => {
  if (!Array.isArray(data)) {
    console.error("Invalid data format. Expected an array of categories.");
    return <p className="text-red-500">Invalid data format</p>;
  }

  return (
    <div className="mt-5 w-full mb-2">
      <div className="w-full overflow-x-auto pb-3 scrollbar-custome">
        <table className="min-w-[1515px] w-full border-collapse">
          <TableHeader />
          <tbody>
            {data.length > 0 ? (
              data.map((category, index) => (
                <TableRow
                  key={category.id}
                  data={category}
                  isEven={index % 2 === 0}
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
      />
    </div>
  );
};

export default TableCategoryList;
