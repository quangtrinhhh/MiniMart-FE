import { getRelatedProducts } from "@/api/products/product.api";
import CardProduct from "@/components/layouts/product/CardProduct";
import TitleHeading from "@/components/layouts/main/TitleHeading";
import { Product } from "@/types/backend";
import { useQuery } from "@tanstack/react-query";

interface IProps {
  productID: number;
}

const RelatedProducts: React.FC<IProps> = ({ productID }) => {
  const { data } = useQuery({
    queryKey: ["product", productID],
    queryFn: () => getRelatedProducts(productID),
  });

  const relatedProducts: Product[] = Array.isArray(data?.data.result)
    ? data?.data.result
    : [];
  return (
    <div className="">
      <TitleHeading titleHeading="Sản phẩm liên quan" />

      <div className="grid grid-cols-4 gap-2 mt-4">
        {relatedProducts?.map((product, index) => (
          <CardProduct key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
