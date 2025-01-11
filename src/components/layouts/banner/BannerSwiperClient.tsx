"use client";

import dynamic from "next/dynamic";

// Dùng dynamic import với ssr: false để chỉ render component này ở phía client
const BannerSwiper = dynamic(
  () => import("@/components/layouts/banner/Banner_swiper"),
  {
    ssr: false, // Tắt SSR
  }
);

const BannerSwiperClient = () => {
  return <BannerSwiper />;
};

export default BannerSwiperClient;
