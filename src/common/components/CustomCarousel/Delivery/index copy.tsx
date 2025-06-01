// CustomCarousel.tsx
"use client";
import Slider from "react-slick";
import { FC } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomArrow from "../components/CustomArrow/Delivery";
import { CustomCarouselProps } from "./interface";
import SmallCardAntd from "../../Cards/SmallCardAntd/Delivery";

const CustomCarousel: FC<CustomCarouselProps> = ({ items }) => {
  const settings = {
    arrows: true,
    centerMode: true,
    centerPadding: "10vw", // centrado real con margen relativo
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 2, centerMode: true, centerPadding: "8vw" },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, centerMode: true, centerPadding: "12vw" },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, centerMode: true, centerPadding: "8vw" },
      },
    ],
  };

  return (
    <div className="w-full overflow-x-hidden">
      <style>{`
    .slick-prev::before, .slick-next::before {
      display: none;
    }
    .custom-slick-arrow {
      display: flex;
      opacity: 1;
    }
    .slick-disabled .custom-slick-arrow {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .slick-slide {
      display: flex !important;
      justify-content: center;
      align-items: center;
    }
    .slick-slide > div {
      display: flex;
      justify-content: center;
    }
  `}</style>

      <Slider
        {...{
          arrows: true,
          centerMode: true,
          centerPadding: "0px", // Eliminamos padding interno
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1,
          nextArrow: <CustomArrow direction="right" />,
          prevArrow: <CustomArrow direction="left" />,
          responsive: [
            {
              breakpoint: 1280,
              settings: {
                slidesToShow: 2,
                centerMode: true,
                centerPadding: "0px",
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                centerMode: true,
                centerPadding: "0px",
              },
            },
          ],
        }}
      >
        {items.map((item, index) => (
          <div key={index} className="!px-1">
            {" "}
            {/* Menos espacio lateral */}
            <SmallCardAntd {...item} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CustomCarousel;
