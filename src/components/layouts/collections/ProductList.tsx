import Product from "@/components/Product";

const products = [
  {
    name: "Nước lau sàn Sunlight Tinh dầu thảo mộc Ngăn côn trùng | Chai 900g",
    price: "300.000Đ",
    oldPrice: "1802.000Đ",
    discount: "-9%",
    stock: 10,
    sold: 69,
    stockPercent: 69,
    images: ["/asset/frame-102-1.jpg", "/asset/frame-101.jpg"],
  },
  {
    name: "Nước rửa chén Sunlight Chanh 100% thiên nhiên | Chai 750ml",
    price: "45.000Đ",
    oldPrice: "60.000Đ",
    discount: "-25%",
    stock: 50,
    sold: 120,
    stockPercent: 70,
    images: ["/asset/frame-102-1.jpg", "/asset/frame-101.jpg"],
  },
  {
    name: "Dầu gội Head & Shoulders bạc hà mát lạnh | Chai 850ml",
    price: "210.000Đ",
    oldPrice: "250.000Đ",
    discount: "-16%",
    stock: 30,
    sold: 80,
    stockPercent: 72,
    images: ["/asset/frame-102-1.jpg", "/asset/frame-101.jpg"],
  },
  {
    name: "Sữa tắm Dove dưỡng ẩm sâu | Chai 1L",
    price: "180.000Đ",
    oldPrice: "220.000Đ",
    discount: "-18%",
    stock: 25,
    sold: 95,
    stockPercent: 79,
    images: ["/asset/frame-102-1.jpg", "/asset/frame-101.jpg"],
  },
  {
    name: "Kem đánh răng P/S Bảo vệ 123 | Tuýp 230g",
    price: "35.000Đ",
    oldPrice: "50.000Đ",
    discount: "-30%",
    stock: 40,
    sold: 110,
    stockPercent: 73,
    images: ["/asset/frame-102-1.jpg", "/asset/frame-101.jpg"],
  },
  {
    name: "Nước giặt Omo Matic cửa trên | Túi 3.8kg",
    price: "175.000Đ",
    oldPrice: "210.000Đ",
    discount: "-17%",
    stock: 20,
    sold: 60,
    stockPercent: 65,
    images: ["/asset/frame-102-1.jpg", "/asset/frame-101.jpg"],
  },
  {
    name: "Bột giặt Tide hương Downy | Túi 5kg",
    price: "230.000Đ",
    oldPrice: "280.000Đ",
    discount: "-18%",
    stock: 15,
    sold: 55,
    stockPercent: 68,
    images: ["/asset/frame-102-1.jpg", "/asset/frame-101.jpg"],
  },
  {
    name: "Nước xả vải Comfort tinh dầu thơm | Túi 3.2L",
    price: "120.000Đ",
    oldPrice: "150.000Đ",
    discount: "-20%",
    stock: 35,
    sold: 75,
    stockPercent: 70,
    images: ["/asset/frame-102-1.jpg", "/asset/frame-101.jpg"],
  },
];

const ProductList: React.FC = ({}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-2 mt-2">
      {products.map((product, index) => (
        <Product key={index} {...product} />
      ))}
    </div>
  );
};

export default ProductList;
