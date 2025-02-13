import Breadcrumbs from "@/components/Breadcrumbs";
import RegisterForm from "@/components/layouts/account/RegisterForm";
import { NextPage } from "next";

const PageRegister: NextPage = ({}) => {
  return (
    <div className="bg-[#f2f6f3]">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs />
        <RegisterForm />
      </div>
    </div>
  );
};

export default PageRegister;
