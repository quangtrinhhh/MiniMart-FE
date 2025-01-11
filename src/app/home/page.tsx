import BenefitsRow from "@/components/BenefitsRow";
import BrandLogoList from "@/components/BrandLogoList";
import DiscountCodeRow from "@/components/DiscountCodeRow";
import DiscountedProducts from "@/components/DiscountedProducts";
import BannerGroup from "@/components/layouts/banner/BannerGroup";
import BannerGroupTwo from "@/components/layouts/banner/BannerGroupTwo";
import BannerSwiperClient from "@/components/layouts/banner/BannerSwiperClient";
import ProductsOfInterest from "@/components/ProductsOfInterest";
import SectionCollectionList from "@/components/SectionCollectionList";
import SectionNews from "@/components/SectionNews";
import SectionVideoRview from "@/components/SectionVideoRview";
import TakeCareOfFamily from "@/components/TakeCareOfFamily";
import { FEATURES } from "@/constants/features";
import { NextPage } from "next";

const HomePage: NextPage = ({}) => {
  return (
    <div>
      <BannerSwiperClient />
      <BenefitsRow features={FEATURES} />
      <div className="bg-[#f2f6f3] ">
        <div className="max-w-7xl mx-auto p-3">
          <BannerGroup />
          <div className="mt-5 mb-5">
            <DiscountedProducts />
          </div>

          <div className="mb-10">
            <DiscountCodeRow />
          </div>
          {/*  */}
          <SectionVideoRview />
          {/*  */}
        </div>
        <SectionCollectionList />
        <div className="max-w-7xl mx-auto p-3">
          <TakeCareOfFamily />
          <ProductsOfInterest />
          <div className="mt-5">
            <BannerGroupTwo />
          </div>
          <SectionNews />
          <BrandLogoList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
