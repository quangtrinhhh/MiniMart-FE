import { Input } from "@/components/ui/input";
import CardProductCheckout from "./CardProductCheckout";
import { Button } from "@/components/ui/button";
import OrderSummary from "./OrderSummary";
import { useCart } from "@/hooks/useCart";

interface IProps {
  handleCheckout: () => void;
  isPending: boolean;
  isError: boolean;
  error?: string;
  isSuccess: boolean;
}

const SidebarCheckout: React.FC<IProps> = ({
  handleCheckout,
  isPending,
  isError,
  error,
  isSuccess,
}) => {
  const { cart, isLoading, totalPrice } = useCart();
  const subtotal = totalPrice;
  const shippingFee = 40000;
  const total = subtotal + shippingFee;
  return (
    <div>
      <h2 className=" text-xl font-semibold p-5 border-b">
        Đơn hàng ({cart.length} sản phẩm)
      </h2>
      <div className="p-5">
        <div className="border-b pb-3 min-h-52 overflow-x-auto">
          {isLoading ? (
            <div className="">Loading...</div>
          ) : (
            cart.map((item) => (
              <CardProductCheckout
                key={item.id}
                img={
                  item.product.assets[0]?.asset?.path ?? "/default-image.jpg"
                }
                name={item.product.name}
                price={Number(item.price)}
                quantity={item.quantity}
                variant={item.variant?.name ?? ""}
              />
            ))
          )}
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
        <Button
          className="w-full mt-5"
          onClick={handleCheckout}
          disabled={isPending}
        >
          {isPending ? "Đang xử lý..." : "Đặt hàng"}
        </Button>
        {isError && <p className="text-red-500 mt-2">Lỗi: {error}</p>}
        {isSuccess && (
          <p className="text-green-500 mt-2">Đặt hàng thành công!</p>
        )}
      </div>
    </div>
  );
};

export default SidebarCheckout;
