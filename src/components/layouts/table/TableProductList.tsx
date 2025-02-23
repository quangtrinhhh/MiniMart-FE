import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import Pagination from "@/components/ui/Pagination";

const TableProductList: React.FC = () => {
  const products = [
    {
      id: "#12345",
      name: "Sample Product",
      price: "$20",
      quantity: 50,
      sale: "10%",
      stock: "In Stock",
      startDate: "2024-02-19",
      image: "/asset/frame-102-1.jpg",
    },
    {
      id: "#67890",
      name: "Another Product",
      price: "$30",
      quantity: 30,
      sale: "5%",
      stock: "Out of Stock",
      startDate: "2024-02-20",
      image: "/asset/frame-102-1.jpg",
    },
  ];

  return (
    <div className="mt-5 w-full  mb-2">
      <div className="w-full overflow-x-auto pb-3 scrollbar-custome">
        <table className="min-w-[1515px] w-full border-collapse ">
          <TableHeader />
          <tbody>
            {products.map((product, index) => (
              <TableRow
                key={index}
                product={product}
                isEven={index % 2 === 0}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination />
    </div>
  );
};

export default TableProductList;
