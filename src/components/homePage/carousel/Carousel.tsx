"use client"; // For Next.js App Router (if using pages router, remove this line)

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules"; // Removed Navigation
import "swiper/css";
import "swiper/css/pagination";

const Carousel = () => {
  const images = [
    "/images/banner-1.jpeg",
    "/images/banner-2.jpeg",
    "/images/banner-3.jpeg",
  ];

  return (
    <div className="w-full h-full">
      <Swiper
        modules={[Pagination, Autoplay]} // Removed Navigation
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
