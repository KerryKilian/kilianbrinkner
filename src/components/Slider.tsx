import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { timelineData } from "../data/Timeline";
import { Slide } from "./Slide";


export const Slider = () => {
  /* The following slider was taken from https://swiperjs.com/ */

  // Settings will be applied to Slider
  const settings = {
    slidesPerView: 4,
    spaceBetween: 30,
    pagination: {
      clickable: true,
    },
    autoplay: {
      delay: 8000,
      disableOnInteraction: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      800: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1050: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1450: {
        slidesPerView: 4,
        spaceBetween: 50,
      },
    },
    modules: [Pagination, Autoplay],
    className: "slider",
  };

  return (
    <div className="slider">
      {/* space at the left and right from the whole slider */}
      <div className="">
        <Swiper {...settings}>
          {timelineData.map((object) => {
            return (
              <SwiperSlide className="swiperslide" key={object.title}>
                <Slide
                  title={object.title}
                  cardTitle={object.cardTitle}
                  cardSubtitle={object.cardSubtitle}
                  cardDetailedText={object.cardDetailedText}
                  logo={object.logo}
                ></Slide>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};
