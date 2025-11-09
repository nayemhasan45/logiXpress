import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import img1 from "../../../assets/assets/banner/banner1.png";
import img2 from "../../../assets/assets/banner/banner2.png";
import img3 from "../../../assets/assets/banner/banner3.png";
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';


const Banner = () => {
     const getArrowSize = () => {
    if (window.innerWidth <= 480) return 30; // mobile
    if (window.innerWidth <= 768) return 45; // tablet
    return 60; // desktop
  };
  return (
    <div className="py-5 md:py-10">
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        // interval={3000}
        showArrows={true}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <AiOutlineLeft
            onClick={onClickHandler}
            title={label}
            size={getArrowSize()}
            style={{
              position: 'absolute',
              zIndex: 2,
              top: '50%',
              left: 15,
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              color: '#CAEB66',
            }}
          />
        )
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <AiOutlineRight
            onClick={onClickHandler}
            title={label}
            size={getArrowSize()}
            style={{
              position: 'absolute',
              zIndex: 2,
              top: '50%',
              right: 15,
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              color: '#CAEB66',
            }}
          />
        )
      }
      >
        <div>
          <img src={img1} />
        </div>
        <div>
          <img src={img2} />
        </div>
        <div>
          <img src={img3} />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
