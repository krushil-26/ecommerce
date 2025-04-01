"use client"

import Carousel from "@/components/homePage/carousel/Carousel";
import LatestProducts from "@/components/homePage/latestProducts/LatestProducts";
import MiddleBanner from "@/components/homePage/middleBanner/MiddleBanner";
import TopRatedProducts from "@/components/homePage/topRatedProducts/TopRatedProducts";

export default function Home() {
  return (
    <>
      <Carousel/>
      <LatestProducts/>
      <MiddleBanner/>
      <TopRatedProducts/>
    </>
  );
}
