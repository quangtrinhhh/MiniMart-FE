"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import CSS cơ bản của Swiper
import "swiper/css/navigation"; // Nếu cần Navigation (mũi tên)
import "swiper/css/pagination"; // Nếu cần Pagination (chấm tròn)
import { Autoplay } from "swiper/modules";

type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

type FeatureListProps = {
  features: Feature[];
};

const BenefitsRow: React.FC<FeatureListProps> = ({ features }) => {
  return (
    <div className="max-w-7xl mx-auto">
      <Swiper
        spaceBetween={16} // Khoảng cách giữa các slide
        slidesPerView="auto" // Tự động điều chỉnh số lượng slide hiển thị
        autoplay={{
          delay: 5000,
          disableOnInteraction: false, // Giữ tính năng autoplay ngay cả khi người dùng tương tác
        }}
        loop={true} // Bật vòng lặp
        breakpoints={{
          640: { slidesPerView: 2 }, // Ở màn hình >= 640px, hiển thị 2 slide
          1024: { slidesPerView: 4 }, // Ở màn hình >= 1024px, hiển thị 4 slide
        }}
        pagination={{ clickable: true }} // Thêm pagination
        modules={[Autoplay]}
      >
        {features.map((feature, index) => (
          <SwiperSlide key={index}>
            <div className="flex items-center text-center p-3  max-lg:justify-center">
              <div className="flex gap-3">
                <div className="text-3xl text-gray-600 mb-2">
                  {feature.icon}
                </div>
                <div className="text-start">
                  <h4 className="text-lg font-semibold">{feature.title}</h4>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BenefitsRow;
