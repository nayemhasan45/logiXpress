import React from "react";
import pTracking from "../../../assets/assets/live-tracking.png";
import safeDelivery from "../../../assets/assets/safe-delivery.png";
import SectionDivider from "../../shared/components/SectionDivider";

const WhatWeOffer = () => {
  const offers = [
    {
      id: 1,
      img: pTracking,
      title: "Live Parcel Tracking",
      desc: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    },
    {
      id: 2,
      img: safeDelivery,
      title: "100% Safe Delivery",
      desc: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    },
    {
      id: 3,
      img: safeDelivery,
      title: "24/7 Call Center Support",
      desc: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    },
  ];

  return (
    <div data-aos="zoom-in" className="pt-5 md:pt-10">
      <SectionDivider />
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col gap-6 sm:gap-7 md:gap-8 lg:gap-10">
          {offers.map((item) => (
            <div
              key={item.id}
              className="bg-base-100 rounded-xl md:rounded-2xl lg:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 md:gap-6 lg:gap-8">
                {/* Image */}
                <div className="shrink-0">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 object-contain"
                  />
                </div>

                {/* Vertical dashed line (Desktop/Tablet) */}
                <div className="hidden sm:block relative w-0.5 h-16 sm:h-20 md:h-24 lg:h-32 xl:h-40 shrink-0">
                  <svg
                    className="w-full h-full block"
                    preserveAspectRatio="none"
                    viewBox="0 0 2 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="1"
                      y1="0"
                      x2="1"
                      y2="100"
                      stroke="#03464D"
                      strokeWidth="2"
                      strokeDasharray="8 8"
                      strokeDashoffset="0"
                      className="animate-dash-move-vertical"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>

                {/* Horizontal dashed line (Mobile) */}
                <div className="block sm:hidden w-full h-0.5 animate-dash-move-horizontal"></div>

                {/* Text Content */}
                <div className="flex-1 text-center sm:text-left">
                  <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-secondary mb-2 sm:mb-2 md:mb-3 lg:mb-4">
                    {item.title}
                  </h1>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SectionDivider />
    </div>
  );
};

export default WhatWeOffer;
