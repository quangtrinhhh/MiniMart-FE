import { useUsers } from "@/api/users/useUsers";

const AccountInfo: React.FC = () => {
  const { user } = useUsers();
  return (
    <div className="">
      <h1 className="text-2xl font-semibold mb-2">Thông tin tài khoản</h1>
      <div className="pace-y-2 flex flex-col gap-3">
        <div className="flex gap-1 text-sm">
          <strong>Họ và tên:</strong>
          <span>{user?.first_name + " " + user?.last_name}</span>
        </div>
        <div className="flex gap-1 text-sm">
          <strong>Email:</strong>
          <span>{user?.email}</span>
        </div>
        <div className="flex gap-1 text-sm">
          <strong>Điện thoại:</strong>
          <span>{user?.phone_number}</span>
        </div>
        <div className="flex gap-1 text-sm">
          <strong>Địa chỉ:</strong>
          <span>{user?.address}</span>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
