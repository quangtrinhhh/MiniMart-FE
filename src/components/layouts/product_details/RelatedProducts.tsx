import Product from "@/components/ui/CardProduct";
import TitleHeading from "@/components/ui/TitleHeading";

const RelatedProducts: React.FC = ({}) => {
  return (
    <div className="">
      <TitleHeading titleHeading="Sản phẩm liên quan" />

      <div className="grid grid-cols-4 gap-2 mt-4">
        <Product
          name="Nước lau sàn Sunlight Tinh dầu thảo mộc Ngăn côn trùng | Chai 900g"
          price="300.000Đ"
          oldPrice="1802.000Đ"
          discount="-9%"
          stock={10}
          sold={69}
          stockPercent={69}
          images={[
            "/asset/frame-102-1.jpg", // Ảnh đầu tiên
            "/asset/frame-101.jpg", // Ảnh thứ hai (hover)
          ]}
        />
        <Product
          name="Nước lau sàn Sunlight Tinh dầu thảo mộc Ngăn côn trùng | Chai 900g"
          price="300.000Đ"
          oldPrice="1802.000Đ"
          discount="-9%"
          stock={10}
          sold={0}
          stockPercent={75}
          images={[
            "/asset/frame-102-1.jpg", // Ảnh đầu tiên
            "/asset/frame-101.jpg", // Ảnh thứ hai (hover)
          ]}
        />
      </div>
    </div>
  );
};

export default RelatedProducts;
