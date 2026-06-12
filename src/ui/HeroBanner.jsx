import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { banners } from "../utility/bannerData";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

const colors = [
  "bg-banner-color1",
  "bg-banner-color2",
  "bg-banner-color3",
  "bg-banner-color4",
];

const HeroBanner = () => {
  return (
    <div className="py-2">
      <Swiper
        grabCursor={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation
        modules={[Pagination, EffectFade, Navigation, Autoplay]}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        slidesPerView={1}
      >
        {banners.map((item, i) => (
          <SwiperSlide key={item.id}>
            <div className={`h-96 rounded-md sm:h-[500px] ${colors[i]}`}>
              <div className="flex h-full items-center justify-center gap-16 px-8">
                <div className="w-1/2 text-center">
                  <h3 className="text-3xl font-bold text-white">
                    {item.title}
                  </h3>

                  <h1 className="mt-2 text-5xl font-bold text-white">
                    {item.subtitle}
                  </h1>

                  <p className="mt-4 font-bold text-white">
                    {item.description}
                  </p>

                  <Link
                    to="/products"
                    className="mt-6 inline-block rounded-md bg-black px-4 py-2 text-white hover:bg-gray-700"
                  >
                    Shop
                  </Link>
                </div>

                {/* Image */}
                <div className="flex w-1/2 justify-center">
                  <img
                    src={item?.image}
                    alt={item.title}
                    className="max-h-[400px] object-contain"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default HeroBanner;
