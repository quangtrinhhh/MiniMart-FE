import Breadcrumbs from "@/components/Breadcrumbs";
import DiscountCodeRow from "@/components/DiscountCodeRow";
import Arrange from "@/components/layouts/collections/Arrange";
import ProductList from "@/components/layouts/collections/ProductList";
import Siderbar from "@/components/layouts/collections/Siderbar";
import { NextPage } from "next";
import Image from "next/image";

const PageCollections: NextPage = ({}) => {
  return (
    <div className="bg-[#f2f6f3]">
      <Breadcrumbs />
      <div className="max-w-7xl mx-auto p-3">
        <Image
          src="/asset/collection_main_banner.jpg"
          width={1432}
          height={120}
          alt=""
        />
        <div className="mt-5">
          <DiscountCodeRow />
        </div>
        <div className="grid grid-cols-1  xl:grid-cols-[9fr_3fr]  gap-3  mt-5">
          <div className="block">
            <h1 className="text-5xl text-[#016735] font-semibold">
              Tất cả sản phẩm
            </h1>
            <Arrange />
            <ProductList />
          </div>
          <Siderbar />
        </div>
      </div>
    </div>
  );
};

export default PageCollections;
