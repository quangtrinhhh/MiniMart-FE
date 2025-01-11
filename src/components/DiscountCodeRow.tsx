"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import CardDiscountCode from "./CardDiscountCode";

// Nhập CSS của Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const DiscountCodeRow: React.FC = () => {
  return (
    <Swiper
      breakpoints={{
        0: { slidesPerView: 1 }, // Màn hình nhỏ: Hiển thị 1 slide
        540: { slidesPerView: 2 }, // Màn hình vừa: Hiển thị 2 slide
        979: { slidesPerView: 3 }, // Màn hình lớn: Hiển thị 3 slide
        1024: { slidesPerView: 4 }, // Màn hình rất lớn: Hiển thị 4 slide
      }}
      spaceBetween={16} // Khoảng cách giữa các slide
      loop={true} // Bật tính năng vòng lặp
      pagination={{ clickable: true }} // Bật phân trang
      modules={[Pagination]}
      className="swiper-DiscountCodeRow"
    >
      <SwiperSlide>
        <CardDiscountCode />
      </SwiperSlide>
      <SwiperSlide>
        <CardDiscountCode />
      </SwiperSlide>
      <SwiperSlide>
        <CardDiscountCode />
      </SwiperSlide>
      <SwiperSlide>
        <CardDiscountCode />
      </SwiperSlide>
    </Swiper>
  );
};

export default DiscountCodeRow;
