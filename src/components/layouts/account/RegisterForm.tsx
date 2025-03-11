"use client";
import { useRouter } from "next/navigation";
import InputField from "./InputField";
import { useState } from "react";
import { toast } from "react-toastify";
import { sendRequest } from "@/ulils/api";
import Link from "next/link";

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    lastname: "",
    firstname: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleRegister = async () => {
    const res = await sendRequest<IBackendRes<undefined>>({
      url: `${process.env.NEXT_PUBLIC_BACECKEND_URL}/api/v1/auth/register`,
      method: "POST",
      body: {
        email: formData.email,
        password: formData.password,
        first_name: formData.firstname,
        last_name: formData.lastname,
        phone_number: formData.phone,
      },
    });
    if (res.data) {
      toast("Đăng ký thành công");
      router.push("/");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="form">
      <div className="grid grid-cols-1 lg:grid-cols-[50%] justify-center gap-gutter">
        <div className="bg-white rounded-lg px-3 py-4 md:p-6 mb-6">
          <div className="space-y-4">
            <div className="text-center">
              <h1 className="text-2xl font-semibold mb-2">Đăng ký tài khoản</h1>
              <p className="mb-0 text-sm">
                Bạn đã có tài khoản?
                <Link href="/account/login" className="link">
                  <span className="underline hover:text-orange-500">
                    {" "}
                    Đăng nhập tại đây
                  </span>
                </Link>
              </p>
              <h2 className="text-center text-sm mt-5 font-semibold">
                Thông tin tài khoản
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              <InputField
                id="lastname"
                label="Họ *"
                type="text"
                placeholder="Họ"
                value={formData.lastname}
                onChange={handleChange}
              />
              <InputField
                id="firstname"
                label="Tên *"
                type="text"
                placeholder="Tên"
                value={formData.firstname}
                onChange={handleChange}
              />
              <InputField
                id="phone"
                label="Số điện thoại *"
                type="text"
                placeholder="Số điện thoại"
                value={formData.phone}
                onChange={handleChange}
              />
              <InputField
                id="email"
                label="Email *"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <InputField
                id="password"
                label="Mật khẩu *"
                type="password"
                placeholder="Mật khẩu"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 text-center pt-10">
              <button
                className="btn bg-green-900 text-white rounded-full p-2 w-full font-semibold max-w-[20rem] hover:bg-green-600"
                type="button"
                onClick={handleRegister}
              >
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
