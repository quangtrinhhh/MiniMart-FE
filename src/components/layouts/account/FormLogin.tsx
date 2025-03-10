"use client";
import { useState } from "react";
import InputField from "./InputField";
import { authenticate } from "@/ulils/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

const FormLogin: React.FC = ({}) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await authenticate(email, password);
    if (res?.error) {
      toast.error(res?.error);
    } else {
      toast("Đăng nhập thành công");
      router.push("/dashboard");
    }
  };
  return (
    <div className="form">
      <div className="grid grid-cols-1  lg:grid-cols-[50%] justify-center gap-gutter">
        <div className="bg-white rounded-lg px-3 py-4 md:p-6 mb-6">
          <div className="space-y-4">
            {/*  */}
            <div className="text-center">
              <h1 className="text-2xl font-semibold mb-2">
                Đăng nhập tài khoản
              </h1>
              <p className="mb-0 text-sm">
                Bạn chưa có tài khoản ?
                <Link
                  href="/account/register"
                  className="underline hover:text-orange-500"
                >
                  Đăng ký tại đây
                </Link>
              </p>
            </div>
            {/*  */}
            <div className="">
              <InputField
                id="email"
                label="Email *"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="mt-5">
                <InputField
                  id="password"
                  label="Password *"
                  type="password"
                  placeholder="Mật khẩu"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
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
                  onClick={handleLogin}
                >
                  Đăng nhập
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
