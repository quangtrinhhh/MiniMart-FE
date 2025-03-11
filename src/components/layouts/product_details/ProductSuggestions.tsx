// import CardProduct from "@/components/ui/CardProduct";
import TitleHeading from "@/components/ui/TitleHeading";

const ProductSuggestions: React.FC = ({}) => {
  return (
    <div className="mt-10">
      <TitleHeading titleHeading="Gợi ý sản phẩm" />
      <div className="grid grid-cols-4 gap-2 mt-4">{/* <CardProduct /> */}</div>
    </div>
  );
};

export default ProductSuggestions;
