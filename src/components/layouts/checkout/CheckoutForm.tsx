"use client";
import { Input } from "@/components/ui/input";
import AddressSelect from "./AddressSelect";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface IProps {
  setFullAddress: (value: string) => void;
  setFullNameProp: (value: string) => void;
  setNoteProp: (value: string) => void;
  setHomeAddressProp: (value: string) => void;
}

const CheckoutForm: React.FC<IProps> = ({
  setFullAddress,
  setFullNameProp,
  setNoteProp,
  setHomeAddressProp,
}) => {
  const { data: session } = useSession();
  const [fullName, setFullName] = useState<string>("");
  const [homeAddress, setHomeAddress] = useState<string>("");
  const [note, setNote] = useState<string>("");

  // Cập nhật fullName khi có session
  useEffect(() => {
    if (session?.user?.name) {
      setFullName(session.user.name);
      setFullNameProp(session.user.name); // Cập nhật prop ngay khi có dữ liệu
    }
  }, [session?.user?.name, setFullNameProp]);

  // Cập nhật prop mỗi khi state thay đổi
  useEffect(() => {
    setFullNameProp(fullName);
  }, [fullName, setFullNameProp]);

  useEffect(() => {
    setNoteProp(note);
  }, [note, setNoteProp]);

  useEffect(() => {
    setHomeAddressProp(homeAddress);
  }, [homeAddress, setHomeAddressProp]);

  return (
    <div className="flex-1">
      <h2 className="text-[#333] font-semibold text-lg mb-2">
        Thông tin nhận hàng
      </h2>
      <div className="flex flex-col gap-3">
        <Input
          placeholder="Email"
          value={session?.user?.email ?? ""}
          disabled
        />
        <Input
          placeholder="Họ và tên"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Input
          placeholder="Số điện thoại"
          value={session?.user?.phone ?? ""}
          disabled
        />
        <Input
          placeholder="Địa chỉ"
          value={homeAddress}
          onChange={(e) => setHomeAddress(e.target.value)}
        />
        <AddressSelect onChange={setFullAddress} />
        <Textarea
          placeholder="Ghi chú (tùy chọn)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
    </div>
  );
};

export default CheckoutForm;
