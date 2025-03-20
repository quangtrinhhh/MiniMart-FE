import { useSession } from "next-auth/react";

const AccountInfo: React.FC = () => {
  const { data: session } = useSession();
  return (
    <div className="">
      <h1 className="text-2xl font-semibold mb-2">Thông tin tài khoản</h1>
      <div className="pace-y-2 flex flex-col gap-3">
        <div className="flex gap-1 text-sm">
          <strong>Họ và tên:</strong>
          <span>{session?.user.name}</span>
        </div>
        <div className="flex gap-1 text-sm">
          <strong>Email:</strong>
          <span>{session?.user.email}</span>
        </div>
        <div className="flex gap-1 text-sm">
          <strong>Điện thoại:</strong>
          <span>{session?.user.phone}</span>
        </div>
        <div className="flex gap-1 text-sm">
          <strong>Địa chỉ:</strong>
          <span>Quảng An, Quảng Điền,TP.Huế</span>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
