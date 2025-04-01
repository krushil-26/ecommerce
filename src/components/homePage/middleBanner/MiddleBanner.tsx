import Aos from 'aos';
import React, { useEffect } from 'react'
import 'aos/dist/aos.css';

const MiddleBanner = () => {
    useEffect(() => {
        Aos.init({ duration: 800 });
      }, []);
  return (
    <div className="w-full h-full">
      <img
        src="/images/banner-middle.jpeg"
        alt={`Offer Banner`}
        className="w-full h-full"
        />
    </div>
  )
}

export default MiddleBanner
