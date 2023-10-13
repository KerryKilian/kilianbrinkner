import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { timelineData } from "../data/Timeline";

interface TimeLineProps {
  title: string;
  cardTitle: string;
  cardSubtitle: string;
  cardDetailedText: string;
  logo: string;
}

export const Slide: React.FC<TimeLineProps> = ({
  title,
  cardTitle,
  cardSubtitle,
  cardDetailedText,
  logo,
}) => {
  return (
    <>
      <div className="slide">
        <h3 className="slide__title">{title}</h3>
        {/* <div className="slide__imgcontainer">
          <img
            className="slide__img"
            src={window.location.origin + "/" + logo}
            alt=""
          />
        </div> */}
        <div className="line"></div>
        <h4 className="slide__cardTitle">{cardTitle}</h4>
        <h4 className="slide__cardSubtitle">{cardSubtitle}</h4>
        <p className="slide__cardDetailedText">{cardDetailedText}</p>
      </div>
    </>
  );
};
