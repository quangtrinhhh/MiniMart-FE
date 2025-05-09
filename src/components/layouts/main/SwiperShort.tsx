"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import CardShortVideo from "./CardShortVideo";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const SwiperShort: React.FC = () => {
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        breakpoints={{
          340: { slidesPerView: 2 },
          540: { slidesPerView: 3 },
          767: { slidesPerView: 4 },
          1024: { slidesPerView: 8 },
        }}
        navigation
      >
        {/* Lặp lại Slide */}
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
          <SwiperSlide key={index}>
            <CardShortVideo
              urlImage={`/asset/section_video_img_${item}.jpg`}
              title="Món ngon đỉnh nhất hôm nay, tôm lụi phơi 1 nắng"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperShort;
