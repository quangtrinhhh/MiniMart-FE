import BenefitsRow from "@/components/ui/BenefitsRow";
import BrandLogoList from "@/components/ui/BrandLogoList";
import DiscountCodeRow from "@/components/ui/DiscountCodeRow";
import DiscountedProducts from "@/components/ui/DiscountedProducts";
import BannerGroup from "@/components/layouts/banner/BannerGroup";
import BannerGroupTwo from "@/components/layouts/banner/BannerGroupTwo";
import BannerSwiperClient from "@/components/layouts/banner/BannerSwiperClient";
import ProductsOfInterest from "@/components/ui/ProductsOfInterest";
import SectionCollectionList from "@/components/ui/SectionCollectionList";
import SectionNews from "@/components/ui/SectionNews";
import SectionVideoRview from "@/components/ui/SectionVideoRview";
import TakeCareOfFamily from "@/components/ui/TakeCareOfFamily";
import { FEATURES } from "@/constants/features";
import { NextPage } from "next";

const HomePage: NextPage = ({}) => {
  return (
    <div>
      <BannerSwiperClient />
      <BenefitsRow features={FEATURES} />
      <div className="bg-[#f2f6f3]">
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
