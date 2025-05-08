import { useSuggestProducts } from "@/api/products/useProducts";
import TitleHeading from "@/components/ui/TitleHeading";
import CardProduct from "../product/CardProduct";

const ProductSuggestions: React.FC = () => {
  const { data, isLoading, error } = useSuggestProducts(4);

  if (isLoading) {
    return (
      <div className="mt-10">
        <TitleHeading titleHeading="Gợi ý sản phẩm" />
        <div>Đang tải...</div> {/* Có thể thay bằng spinner nếu muốn */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-10">
        <TitleHeading titleHeading="Gợi ý sản phẩm" />
        <div>Đã có lỗi xảy ra. Vui lòng thử lại sau!</div>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <TitleHeading titleHeading="Gợi ý sản phẩm" />
      <div className="grid grid-cols-4 gap-2 mt-4">
        {Array.isArray(data) &&
          data.map((product, index) => (
            <CardProduct key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default ProductSuggestions;
