import React from "react";
import {
  FaShippingFast,
  FaMapMarkedAlt,
  FaBoxes,
  FaMoneyCheckAlt,
  FaBuilding,
  FaUndoAlt,
} from "react-icons/fa";

const OurServices = () => {
  const services = [
    {
      icon: <FaShippingFast className="text-4xl text-primary" />,
      title: "Express & Standard Delivery",
      desc: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    },
    {
      icon: <FaMapMarkedAlt className="text-4xl text-primary" />,
      title: "Nationwide Delivery",
      desc: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    },
    {
      icon: <FaBoxes className="text-4xl text-primary" />,
      title: "Fulfillment Solution",
      desc: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    },
    {
      icon: <FaMoneyCheckAlt className="text-4xl text-primary" />,
      title: "Cash on Home Delivery",
      desc: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    },
    {
      icon: <FaBuilding className="text-4xl text-primary" />,
      title: "Corporate Service / Contract In Logistics",
      desc: "Customized corporate services which includes warehouse and inventory management support.",
    },
    {
      icon: <FaUndoAlt className="text-4xl text-primary" />,
      title: "Parcel Return",
      desc: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    },
  ];

  return (
    <section
      data-aos="zoom-in"
      className="py-5 md:py-10 mt-5 mb-5 md:mt-10 md:mb-10 text-center rounded-4xl"
      style={{ backgroundColor: "#03373D" }}
    >
      <h2 className="text-3xl md:text-6xl font-bold mb-5 md:mb-10 text-white">
        Our Services
      </h2>
      <div className="flex items-center justify-center">
        <p className="text-sm p-5 md:text-xl md:w-[50%]  mb-10 text-white">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-md hover:shadow-lg p-6 rounded-2xl transition-all hover:scale-105 hover:bg-base-200"
          >
            <div className="flex flex-col items-center space-y-4">
              {service.icon}
              <h3 className="text-lg font-semibold text-neutral">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600">{service.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
