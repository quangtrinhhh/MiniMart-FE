import Breadcrumbs from "@/components/Breadcrumbs";
import { NextPage } from "next";
const PageLogin: NextPage = ({}) => {
  return (
    <div className="bg-[#f2f6f3]">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs />
        <div className="form">
          <div className="grid grid-cols-1  lg:grid-cols-[50%] justify-center gap-gutter">
            <div className="bg-white rounded-lg px-3 py-4 md:p-6 mb-6">
              <div className="space-y-4">
                <div className="text-center">
                  <h1 className="text-2xl font-semibold mb-2">
                    Đăng nhập tài khoản
                  </h1>
                  <p className="mb-0 text-sm">
                    Bạn chưa có tài khoản ?
                    <a href="/account/register" className="link">
                      Đăng ký tại đây
                    </a>
                  </p>
                </div>
                <div className="">
                  <label htmlFor="email" className="flex flex-col">
                    <span className="text-[#999999] text-sm mb-2">Email *</span>
                    <input
                      id="email"
                      type="email"
                      placeholder="Email"
                      className="border rounded-md px-2 py-2 focus:border-orange-500 focus:border-2 focus:outline-none text-sm"
                    />
                  </label>
                  <label htmlFor="password" className="flex flex-col mt-5">
                    <span className="text-[#999999] text-sm mb-2">
                      Password *
                    </span>
                    <input
                      id="password"
                      type="password"
                      placeholder="password"
                      className="border rounded-md px-2 py-2 focus:border-orange-500 focus:border-2 focus:outline-none text-sm"
                    />
                  </label>
                  <span className="block mt-2 text-sm">
                    Quên mật khẩu?
                    <a href="#" className="link underline">
                      Nhấn vào đây
                    </a>
                  </span>
                  <div className="mb-3 text-center pt-3">
                    <button
                      className="btn bg-green-900 text-white rounded-full p-2 w-full font-semibold max-w-[20rem] hover:bg-green-600 "
                      type="submit"
                      value="Đăng nhập"
                    >
                      Đăng nhập
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
