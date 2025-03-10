import BreadcrumbAdmin from "@/components/layouts/admin/breadcrumb..admin";
import CategoryForm from "@/components/ui/CategoryForm";
import { NextPage } from "next";

const Page: NextPage = ({}) => {
  return (
    <div>
      <div className="p-[30px]">
        <div className="flex items-center flex-wrap justify-between gap20 mb-27">
          <h3 className="text-2xl text-black font-bold">Category infomation</h3>
          <BreadcrumbAdmin />
        </div>

        <CategoryForm />
      </div>
    </div>
  );
};

export default Page;
