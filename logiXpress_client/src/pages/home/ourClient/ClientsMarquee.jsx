import React from "react";
import Marquee from "react-fast-marquee";

// Import your logos
import logo1 from "../../../assets/assets/brands/amazon.png";
import logo2 from "../../../assets/assets/brands/amazon_vector.png";
import logo3 from "../../../assets/assets/brands/casio.png";
import logo4 from "../../../assets/assets/brands/moonstar.png";
import logo5 from "../../../assets/assets/brands/randstad.png";
import logo6 from "../../../assets/assets/brands/start-people 1.png";
import logo7 from "../../../assets/assets/brands/start.png";

// Put them in an array
const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

export default function ClientsMarquee() {
  // Duplicate logos to make seamless infinite scroll
  const scrollingLogos = [...logos, ...logos];

  return (
    <section className="py-5 md:py-10 ">
      <h2 className="text-3xl md:text-6xl font-bold text-center mb-2 md:mb-4 text-secondary">Our Clients</h2>
      <p className="text-sm md:text-3xl  text-center mb-8 md:mb-16">We've helped thousands of sales teams</p>
      <Marquee
        speed={100}          // Adjust scroll speed
        pauseOnHover={true} // Pause when hovering
        gradient={false}    // Remove fading gradient
      >
        {scrollingLogos.map((logo, idx) => (
          <div key={idx} className="mx-7 md:mx-15 flex-0">
            <img
              src={logo}
              alt={`Client logo ${idx + 1}`}
              className="h-5 md:h-10 object-contain"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
}
