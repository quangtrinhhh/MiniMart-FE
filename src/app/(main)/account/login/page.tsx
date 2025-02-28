import Breadcrumbs from "@/components/ui/Breadcrumbs";
import FormLogin from "@/components/layouts/account/FormLogin";
import { NextPage } from "next";
import { auth } from "@/auth";
const PageLogin: NextPage = async ({}) => {
  const session = await auth();
  console.log(">>> check session: ", session);

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
