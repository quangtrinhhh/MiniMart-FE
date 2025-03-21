import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";

const BannerSwiper: React.FC = () => {
  return (
    <div className="relative group">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false, // Giữ tính năng autoplay ngay cả khi người dùng tương tác
        }}
        loop={true} // Bật vòng lặp
        navigation={{
          prevEl: ".custom-prev", // Tùy chỉnh nút quay lại
          nextEl: ".custom-next", // Tùy chỉnh nút tiếp theo
        }}
        pagination={{
          clickable: true, // Cho phép người dùng nhấp vào các điểm phân trang
        }}
        modules={[Autoplay, Navigation, Pagination]}
      >
        <SwiperSlide>
          <div className="relative w-full h-[450px] max-sm:h-[200px] max-md:h-[300px]">
            <Image
              src="/asset/home_slider_1.jpg"
              alt="Slide 1"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative w-full h-[450px] max-sm:h-[200px] max-md:h-[300px]">
            <Image
              src="/asset/home_slider_2.jpg"
              alt="Slide 2"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Nút điều hướng tùy chỉnh */}
      <button className="custom-prev z-10 absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ml-5">
        <IoIosArrowBack />
      </button>
      <button className="custom-next z-10 absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity mr-5">
        <IoIosArrowForward />
      </button>

      {/* Thanh phân trang */}
      <div className="swiper-pagination absolute bottom-5 w-full text-center z-10"></div>
    </div>
  );
};

export default BannerSwiper;
