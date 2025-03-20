import { useEffect } from "react";

interface IProps {
  address: string;
  setShippingFee: (value: number) => void;
}

const ShippingMethod: React.FC<IProps> = ({ address, setShippingFee }) => {
  //   const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    setShippingFee(40000);
  }, [setShippingFee]);
  return (
    <div>
      <h2 className="text-[#333] font-semibold text-lg mb-2">Vận chuyển</h2>
      <div className="min-w-[300px] w-full space-y-4">
        {/* Kiểm tra nếu chưa có địa chỉ thì hiển thị thông báo */}
        {!address ? (
          <div className="bg-[#d1ecf1] text-[#0c5460] p-3 rounded-lg text-center">
            Vui lòng nhập thông tin giao hàng
          </div>
        ) : (
          <div className="flex justify-between items-center border p-3 rounded-lg shadow-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full border-2 border-blue-500 flex items-center justify-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
              <span>Giao hàng tận nơi</span>
            </div>
            <span className="text-gray-700 font-semibold">40.000đ</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingMethod;
