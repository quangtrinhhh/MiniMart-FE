"use client";
import { FEATURES } from "@/constants/features";
import BannerSwiperClient from "../layouts/banner/BannerSwiperClient";
import BenefitsRow from "./BenefitsRow";
import BannerGroup from "../layouts/banner/BannerGroup";
import DiscountedProducts from "./DiscountedProducts";
import DiscountCodeRow from "./DiscountCodeRow";
import SectionVideoRview from "./SectionVideoRview";
import SectionCollectionList from "./SectionCollectionList";
import TakeCareOfFamily from "./TakeCareOfFamily";
import ProductsOfInterest from "./ProductsOfInterest";
import BannerGroupTwo from "../layouts/banner/BannerGroupTwo";
import SectionNews from "./SectionNews";
import BrandLogoList from "./BrandLogoList";

const HomeMain: React.FC = ({}) => {
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

export default HomeMain;
