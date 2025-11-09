import React from "react";
import topBg from "../../../assets/assets/be-a-merchant-bg.png";
import rightImage from "../../../assets/assets/location-merchant.png";

const MarchentBanner = () => {
  return (
    <section
      className="relative bg-[#03373D] text-white overflow-hidden rounded-4xl my-5 md:my-10"
      style={{
        backgroundImage: `url(${topBg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
      }}
    >
      <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20 flex flex-col lg:flex-row items-center lg:justify-between gap-10 lg:gap-16">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-snug">
            Fast. Reliable. Nationwide Delivery
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-6 leading-relaxed max-w-md">
            Deliver your parcels quickly and securely anywhere in Bangladesh.
            With live tracking, dedicated support, and 100% safe delivery, we
            make logistics simple and stress-free.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button className="btn bg-primary rounded-full  border-none hover:bg-[#b7db59] transition-all duration-300 w-full sm:w-auto">
              Become a Merchant
            </button>
            <button className="btn rounded-full btn-outline border-[#b7db59] text-[#b7db59] hover:bg-transparent hover:text-[#b7db59] w-full sm:w-auto">
              Earn with logiXpress Courier
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <img
            src={rightImage}
            alt="Delivery Service"
            className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-full max-w-md object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default MarchentBanner;
