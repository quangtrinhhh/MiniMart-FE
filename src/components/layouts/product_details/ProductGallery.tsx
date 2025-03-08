"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import Image from "next/image";
// import styles from "@/styles/ProductGallery.module.css";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Assets } from "@/types/backend";

interface IProps {
  images: Assets[];
}

const ProductGallery: React.FC<IProps> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <Image
              src={src.asset.path}
              alt={`Ảnh ${index + 1}`}
              width={700}
              height={600}
              priority={index === 0}
              className="object-cover rounded-lg aspect-[7/6]"
              quality={100}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={6}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mt-[10px]"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <Image
              src={src.asset.path}
              alt={`Thumbnail ${index + 1}`}
              width={150}
              height={100}
              className="object-cover rounded-lg aspect-[7/6]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductGallery;
