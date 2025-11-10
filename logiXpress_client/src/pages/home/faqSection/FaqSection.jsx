import React from "react";
import { FaArrowRight } from "react-icons/fa";

const FaqSection = () => {
  return (
    <section data-aos="zoom-in" className="w-full py-5 md:py-12  px-4 md:px-10 lg:px-20">
      {/* Title */}
      <h2 className="text-3xl md:text-6xl font-bold text-secondary text-center mb-4">
        Frequently Asked Question (FAQ)
      </h2>

      {/* Description */}
      <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10 text-sm md:text-base">
        A posture corrector works by providing support and gentle alignment to
        your shoulders, back, and spine, encouraging you to maintain proper
        posture throughout the day. Here’s how it typically functions: A posture
        corrector works by providing support and gentle alignment to your
        shoulders.
      </p>

      {/* Accordion */}
      <div className="w-full mx-auto space-y-3">
        <div className="collapse collapse-arrow bg-white border border-[#caeb66]">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title text-secondary text-xl md:text-2xl font-semibold">
            How do I create an account?
          </div>
          <div className="collapse-content text-sm md:text-[15px]">
            Click the "Sign Up" button in the top right corner and follow the
            registration process.
          </div>
        </div>
        <div className="collapse collapse-arrow bg-white border border-[#caeb66]">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title text-secondary text-xl md:text-2xl font-semibold">
            What is the estimated delivery time?
          </div>
          <div className="collapse-content text-sm md:text-[15px]">
            Our standard delivery time is 3-5 business days. You will receive a tracking number once your order is shipped
          </div>
        </div>
        <div className="collapse collapse-arrow bg-white border border-[#caeb66]">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title text-secondary text-xl md:text-2xl font-semibold">
            Can I track my order?
          </div>
          <div className="collapse-content text-sm md:text-[15px]">
            Yes, you can track your order using the tracking number provided in your confirmation email.
          </div>
        </div>
        <div className="collapse collapse-arrow bg-white border border-[#caeb66]">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title text-secondary text-xl md:text-2xl font-semibold">
           Do you deliver internationally?
          </div>
          <div className="collapse-content text-sm md:text-[15px]">
            Currently, we deliver within the country only. International shipping will be available soon.
          </div>
        </div>
        <div className="collapse collapse-arrow bg-white border border-[#caeb66]">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title text-secondary text-xl md:text-2xl font-semibold">
           What should I do if my package is delayed?
          </div>
          <div className="collapse-content text-sm md:text-[15px]">
           If your package is delayed, please contact our support team with your order number and we will assist you immediately.
          </div>
        </div>
        <div className="collapse collapse-arrow bg-white border border-[#caeb66]">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title text-secondary text-xl md:text-2xl font-semibold">
           Can I change my delivery address after placing an order?
          </div>
          <div className="collapse-content text-sm md:text-[15px]">
           You can update your delivery address within 2 hours of placing the order by contacting our support team.
          </div>
        </div>
        
      </div>

      {/* See More Button */}
      <div className="flex justify-center mt-8">
        <button className="bg-primary text-secondary px-6 py-3 rounded-lg font-semibold text-sm md:text-base flex items-center gap-2 hover:opacity-90 transition-opacity duration-300">
          See More FAQs <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default FaqSection;
