"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import CSS cơ bản của Swiper
import "swiper/css/navigation"; // Nếu cần Navigation (mũi tên)
import "swiper/css/pagination"; // Nếu cần Pagination (chấm tròn)
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const BannerGroup: React.FC = ({}) => {
  return (
    <div className="">
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={30}
        breakpoints={{
          540: { slidesPerView: 2 }, // Ở màn hình >= 640px, hiển thị 2 slide
          1024: { slidesPerView: 3 }, // Ở màn hình >= 1024px, hiển thị 4 slide
        }}
        pagination={{
          clickable: true, // Cho phép người dùng nhấp vào các điểm phân trang
        }}
        modules={[Autoplay, Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image
            src="/asset/banner_group_1.jpg"
            alt="Slide 1"
            width={408}
            height={232}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/asset/banner_group_2.jpg"
            alt="Slide 2"
            width={408}
            height={232}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/asset/banner_group_3.jpg"
            alt="Slide 3"
            width={408}
            height={232}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BannerGroup;
