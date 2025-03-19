import { Input } from "@/components/ui/input";
import CardProductCheckout from "./CardProductCheckout";
import { Button } from "@/components/ui/button";
import OrderSummary from "./OrderSummary";

const cartItems = [
  {
    id: 1,
    img: "/asset/frame-102-1.jpg",
    name: "Nước Rửa Chén Bát Sunlight 100% Gốc Thực Vật",
    price: 121000,
    quantity: 2,
    variant: "Matcha trà nhật",
  },
  {
    id: 2,
    img: "/asset/frame-102-1.jpg",
    name: "Nước Giặt Omo Matic Bột Giặt Cửa Trước",
    price: 215000,
    quantity: 1,
    variant: "Hương ngọc lan",
  },
  {
    id: 3,
    img: "/asset/frame-102-1.jpg",
    name: "Nước Giặt Omo Matic Bột Giặt Cửa Trước",
    price: 215000,
    quantity: 1,
    variant: "Hương ngọc lan",
  },
  {
    id: 4,
    img: "/asset/frame-102-1.jpg",
    name: "Nước Giặt Omo Matic Bột Giặt Cửa Trước",
    price: 215000,
    quantity: 1,
    variant: "Hương ngọc lan",
  },
  {
    id: 5,
    img: "/asset/frame-102-1.jpg",
    name: "Nước Giặt Omo Matic Bột Giặt Cửa Trước",
    price: 215000,
    quantity: 1,
    variant: "Hương ngọc lan",
  },
  {
    id: 6,
    img: "/asset/frame-102-1.jpg",
    name: "Nước Giặt Omo Matic Bột Giặt Cửa Trước",
    price: 215000,
    quantity: 1,
    variant: "Hương ngọc lan",
  },
];
const SidebarCheckout: React.FC = ({}) => {
  const subtotal = 1234567;
  const shippingFee = 40000;
  const total = subtotal + shippingFee;
  return (
    <div>
      <h2 className=" text-xl font-semibold p-5 border-b">
        Đơn hàng (6 sản phẩm)
      </h2>
      <div className="p-5">
        <div className="border-b pb-3 max-h-72 overflow-x-auto">
          {cartItems.map((item) => (
            <CardProductCheckout
              key={item.id}
              img={item.img}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              variant={item.variant}
            />
          ))}
        </div>
        <div className="mt-5 flex gap-5">
          <Input placeholder="Nhập mã giảm giá" />
          <Button>Áp dụng</Button>
        </div>
        <OrderSummary
          subtotal={subtotal}
          shippingFee={shippingFee}
          total={total}
        />
        <Button className="w-full mt-5">Đặt hàng </Button>
      </div>
    </div>
  );
};

export default SidebarCheckout;
