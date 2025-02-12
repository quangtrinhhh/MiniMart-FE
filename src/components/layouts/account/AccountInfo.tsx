const AccountInfo: React.FC = () => {
  return (
    <div className="">
      <h1 className="text-2xl font-semibold mb-2">Thông tin tài khoản</h1>
      <div className="pace-y-2 flex flex-col gap-3">
        <div className="flex gap-1 text-sm">
          <strong>Họ và tên:</strong>
          <span>Test01</span>
        </div>
        <div className="flex gap-1 text-sm">
          <strong>Email:</strong>
          <span>Quangcute504@gmail.com</span>
        </div>
        <div className="flex gap-1 text-sm">
          <strong>Điện thoại:</strong>
          <span>0123654789</span>
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
