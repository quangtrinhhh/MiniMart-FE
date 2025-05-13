import CardProduct from "@/components/layouts/product/CardProduct";
import { Product } from "@/types/backend";
import Pagination from "../admin/paginations";

interface IProps {
  dataList?: Product[];
  totalPagesProps: number;
  totalItemsProps: number;
  setCurrent: (page: number) => void;
}

const ProductList: React.FC<IProps> = ({
  dataList,
  totalPagesProps,
  totalItemsProps,
  setCurrent,
}) => {
  return (
    <div className="">
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-2 mt-2">
        {dataList?.map((product, index) => (
          <CardProduct key={index} product={product} />
        ))}
      </div>
      <Pagination
        setCurrent={setCurrent}
        totalItemsProps={totalItemsProps}
        totalPagesProps={totalPagesProps}
      />
    </div>
  );
};

export default ProductList;
