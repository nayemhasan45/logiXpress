import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import logo from "../../../assets/assets/reviewQuote.png"; 
import mainLogo from "../../../assets/assets/customer-top.png";

const feedbackData = [
  {
    id: 1,
    name: "Emma Johnson",
    feedback:
      "Amazing experience! The UI is smooth, and the app performance exceeded my expectations.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 2,
    name: "Liam Carter",
    feedback:
      "Customer support was super responsive and kind. They solved my problem in minutes.",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    id: 3,
    name: "Sophia Martinez",
    feedback:
      "Love the modern design! The transitions and components feel professional.",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    id: 4,
    name: "Noah Kim",
    feedback:
      "The app is efficient and lightweight. Everything loads super fast!",
    image: "https://randomuser.me/api/portraits/men/29.jpg",
  },
  {
    id: 5,
    name: "Olivia Brown",
    feedback:
      "I’m impressed by the dark mode implementation — elegant and eye-friendly.",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];

const CustomerFeedback = () => {
  return (
    <div data-aos="zoom-in" className="w-full flex flex-col items-center justify-center py-5 md:py-10 md:pb-10">
        <div className="flex items-center justify-center">
            <img src={mainLogo} alt="logo" />
        </div>
      <h2 className="text-2xl md:text-6xl font-bold my-4 md:my-8 text-secondary text-center">
        What our customers are sayings
      </h2>

      <div className="flex items-center justify-center">
        <p className="text-sm md:text-xl mb-4 md:mb-8 md:w-[50%] text-center">Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
      </div>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 40,
          stretch: 0,
          depth: 120,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          el: ".custom-swiper-pagination",
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} w-4! h-4! md:w-5! md:h-5! rounded-full bg-gray-300 mx-1! inline-block"></span>`;
          },
        }}
        navigation={{
          nextEl: ".custom-swiper-next",
          prevEl: ".custom-swiper-prev",
        }}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className="w-full px-6"
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 40 },
        }}
      >
        {feedbackData.map((item) => (
          <SwiperSlide
            key={item.id}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 w-full min-h-[250px] md:min-h-[300px] lg:min-h-[400px] flex flex-col"
          >
            {/* Logo at top */}
            <img src={logo} alt="Logo" className="w-16 h-auto mb-4" />

            {/* Centered content */}
            <div className="flex flex-col justify-center flex-1">
              {/* Feedback text */}
              <p className="text-gray-700 mb-4 text-sm md:text-base">{item.feedback}</p>

              {/* Dashed divider - thicker on large screens */}
              <hr className="border-t-2! md:border-t-4! border-dashed border-gray-300 my-4! w-full!" />

              {/* Customer image + name */}
              <div className="flex items-center gap-4 md:gap-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12! h-12! md:w-16! md:h-16! rounded-full object-cover"
                />
                <span className="font-semibold text-gray-800 text-sm md:text-base">{item.name}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Pagination + Arrows Row */}
        <div className="flex items-center justify-between mt-6! w-full! max-w-[350px]! md:max-w-[450px]! mx-auto!">
          {/* Prev Button */}
          <button className="custom-swiper-prev w-12! h-10! md:w-15! md:h-12! rounded-full bg-white hover:bg-primary text-gray-800 hover:text-white flex items-center justify-center transition-colors duration-300 cursor-pointer">
            <FaArrowLeft />
          </button>

          {/* Pagination Dots */}
          <div className="custom-swiper-pagination flex items-center justify-center"></div>

          {/* Next Button */}
          <button className="custom-swiper-next w-12! h-10! md:w-15! md:h-12! rounded-full bg-white hover:bg-primary text-gray-800 hover:text-white flex items-center justify-center transition-colors duration-300 cursor-pointer">
            <FaArrowRight />
          </button>

          {/* Inline style for active dot */}
          <style>
            {`
              .custom-swiper-pagination .swiper-pagination-bullet-active {
                background-color: #caeb66 !important;
              }
            `}
          </style>
        </div>
      </Swiper>
    </div>
  );
};

export default CustomerFeedback;
