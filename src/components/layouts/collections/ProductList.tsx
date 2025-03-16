import CardProduct from "@/components/layouts/product/CardProduct";
import { Product } from "@/types/backend";

interface IProps {
  dataList: Product[];
  totalPagesProps: number;
  totalItemsProps: number;
}

const ProductList: React.FC<IProps> = ({
  dataList,
  totalPagesProps,
  totalItemsProps,
}) => {
  console.log(dataList, totalPagesProps, totalItemsProps);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-2 mt-2">
      {dataList.map((product, index) => (
        <CardProduct key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
