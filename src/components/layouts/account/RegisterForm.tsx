import InputField from "./InputField";

const RegisterForm: React.FC = ({}) => {
  return (
    <div className="form">
      <div className="grid grid-cols-1  lg:grid-cols-[50%] justify-center gap-gutter">
        <div className="bg-white rounded-lg px-3 py-4 md:p-6 mb-6">
          <div className="space-y-4">
            <div className="text-center">
              <h1 className="text-2xl font-semibold mb-2 ">
                Đăng ký tài khoản
              </h1>
              <p className="mb-0 text-sm">
                Bạn đã có tài khoản ?
                <a href="/account/login" className="link">
                  Đăng nhập{" "}
                  <span className="underline hover:text-orange-500">
                    tại đây
                  </span>
                </a>
              </p>
              <h2 className="text-center text-sm mt-5 font-semibold">
                Thông tin tài khoản
              </h2>
            </div>
            <div className="">
              <div className="flex flex-col gap-3">
                <InputField
                  id="lastname"
                  label="Họ *"
                  type="text"
                  placeholder="Họ"
                />
                <InputField
                  id="name"
                  label="Tên *"
                  type="text"
                  placeholder="Tên"
                />
                <InputField
                  id="phone"
                  label="Số điện thoại *"
                  type="text"
                  placeholder="Số điện thoại"
                />
                <InputField
                  id="email"
                  label="Email *"
                  type="email"
                  placeholder="Email"
                />
                <InputField
                  id="password"
                  label="Mật khẩu *"
                  type="password"
                  placeholder="Mật khẩu"
                />
              </div>
              <div className="mb-3 text-center pt-10">
                <button
                  className="btn bg-green-900 text-white rounded-full p-2 w-full font-semibold max-w-[20rem] hover:bg-green-600 "
                  type="submit"
                  value="Đăng nhập"
                >
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
