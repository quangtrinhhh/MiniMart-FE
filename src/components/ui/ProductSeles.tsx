"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import Product from "./Product";
// import { Pagination } from "swiper/modules";

const ProductSeles: React.FC = ({}) => {
  const products = new Array(10).fill(null); // Tạo một mảng chứa 3 phần tử (hoặc số lượng tùy chỉnh)

  return (
    <div className="rounded-lg overflow-hidden">
      <Swiper
        breakpoints={{
          0: { slidesPerView: 1 }, // Màn hình nhỏ: Hiển thị 1 slide
          540: { slidesPerView: 2 }, // Màn hình vừa: Hiển thị 2 slide
          979: { slidesPerView: 3 }, // Màn hình lớn: Hiển thị 3 slide
          1024: { slidesPerView: 5 }, // Màn hình rất lớn: Hiển thị 4 slide
        }}
        spaceBetween={0.5}
        // pagination={{ clickable: true }} // Bật phân trang
        // modules={[Pagination]}
        loop={true} // Bật tính năng vòng lặp
      >
        {products.map((_, index) => (
          <SwiperSlide key={index}>
            <Product
              name="Nước lau sàn Sunlight Tinh dầu thảo mộc Ngăn côn trùng | Chai 900g"
              price="300.000Đ"
              oldPrice="1802.000Đ"
              discount="-9%"
              stock={10}
              sold={69}
              stockPercent={69}
              images={[
                "/asset/frame-102-1.jpg", // Ảnh đầu tiên
                "/asset/frame-101.jpg", // Ảnh thứ hai (hover)
              ]}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSeles;
