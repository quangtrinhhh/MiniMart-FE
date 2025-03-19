"use client";
import { Input } from "@/components/ui/input";
import AddressSelect from "./AddressSelect";
import { Textarea } from "@/components/ui/textarea";

interface IProps {
  setFullAddress: (valure: string) => void;
}
const CheckoutForm: React.FC<IProps> = ({ setFullAddress }) => {
  return (
    <div className="flex-1">
      <h2 className="text-[#333] font-semibold text-lg mb-2">
        Thông tin nhận hàng
      </h2>
      <div className="flex flex-col gap-3">
        <Input placeholder="Email"></Input>
        <Input placeholder="Họ và tên"></Input>
        <Input placeholder="Số điện thoại"></Input>
        <Input placeholder="Địa chỉ"></Input>
        <AddressSelect onChange={setFullAddress} />
        <Textarea placeholder="Ghi chú (tùy chọn)" />
      </div>
    </div>
  );
};

export default CheckoutForm;
