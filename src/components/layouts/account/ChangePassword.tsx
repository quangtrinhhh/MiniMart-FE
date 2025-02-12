const ChangePassword: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold">Đổi mật khẩu</h3>
      <form className="mt-4 flex flex-col">
        <label className="block mb-2 text-sm font-medium">Mật khẩu cũ:</label>
        <input
          type="password"
          className="w-1/2 border rounded-lg p-2 mb-3 focus:border-orange-500 focus:border-2 focus:outline-none text-sm"
          placeholder="Nhập mật khẩu cũ"
        />
        <label className="block mb-2 text-sm font-medium">Mật khẩu mới:</label>
        <input
          type="password"
          className="w-1/2 border rounded-lg p-2 mb-3 focus:border-orange-500 focus:border-2 focus:outline-none text-sm"
          placeholder="Nhập mật khẩu mới"
        />
        <label className="block mb-2 text-sm font-medium">
          Xác nhận mật khẩu mới:
        </label>
        <input
          type="password"
          className="w-1/2 border rounded-lg p-2 mb-3 focus:border-orange-500 focus:border-2 focus:outline-none text-sm"
          placeholder="Nhập lại mật khẩu mới"
        />
        <button className="bg-green-900 hover:bg-green-500 text-white px-4 py-2 w-1/2 mt-3 rounded-full">
          Đổi mật khẩu
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
