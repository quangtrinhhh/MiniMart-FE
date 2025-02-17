import Breadcrumbs from "@/components/ui/Breadcrumbs";
import FormLogin from "@/components/layouts/account/FormLogin";
import { NextPage } from "next";
const PageLogin: NextPage = ({}) => {
  return (
    <div className="bg-[#f2f6f3]">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs />
        <FormLogin />
      </div>
    </div>
  );
};

export default PageLogin;
