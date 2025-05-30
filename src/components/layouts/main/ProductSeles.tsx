"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import CardProduct from "../product/CardProduct";
import { Product } from "@/types/backend";
import { useDiscountedProducts } from "@/api/products/useProducts";
// import { Pagination } from "swiper/modules";

const ProductSeles: React.FC = ({}) => {
  const { data } = useDiscountedProducts() || { data: [] };
  const products = Array.isArray(data) ? data : [];

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
        loop={true} // Bật tính năng vòng lặp
      >
        {products?.map((product: Product, index: number) => (
          <SwiperSlide key={index}>
            <CardProduct product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSeles;
