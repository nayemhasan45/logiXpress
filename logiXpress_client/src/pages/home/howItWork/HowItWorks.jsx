import React from "react";
import { FaCalendarCheck, FaMoneyBillWave, FaWarehouse, FaBuilding } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaCalendarCheck className="text-4xl text-primary" />,
      title: "Booking Pick & Drop",
      desc: "Schedule your pickup and delivery easily through our platform with just a few clicks.",
    },
    {
      icon: <FaMoneyBillWave className="text-4xl text-primary" />,
      title: "Cash On Delivery",
      desc: "Pay securely when your parcel arrives at your doorstep — simple and convenient.",
    },
    {
      icon: <FaWarehouse className="text-4xl text-primary" />,
      title: "Delivery Hub",
      desc: "Our hubs ensure fast and reliable sorting and dispatching of your packages.",
    },
    {
      icon: <FaBuilding className="text-4xl text-primary" />,
      title: "Booking SME & Corporate",
      desc: "Tailored logistics solutions for small businesses and corporate clients.",
    },
  ];

  return (
    <section data-aos="zoom-in"  className=" text-center py-5 md:py-10">
      <h2 className="text-3xl md:text-6xl font-bold mb-10 text-secondary">How It Works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="card bg-base-100 hover:bg-base-200 shadow-md p-6 rounded-2xl transition-all"
          >
            <div className="flex flex-col items-center space-y-4">
              {step.icon}
              <h3 className="text-lg text-secondary font-semibold md:font-bold">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
