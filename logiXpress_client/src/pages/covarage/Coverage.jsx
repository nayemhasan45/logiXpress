import React, { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import BangladeshMap from "./BangladeshMap";

const Coverage = () => {
  const mapRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (mapRef.current) {
      mapRef.current.flyToDistrict(searchTerm.trim());
    }
  };

  return (
    <div className="max-w-11/12 mx-auto rounded-3xl flex flex-col items-center bg-white py-10 px-4 mb-10">
      <h1 className="text-2xl md:text-6xl font-bold text-secondary mb-6 text-center">
        We are available in 64 districts
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-3 mb-10 w-full max-w-md">
        <input
          type="text"
          placeholder="Search your district..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03373D]"
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 bg-primary text-secondary px-5 py-2 rounded-lg hover:bg-[#04646D] transition-all"
        >
          <FaSearch />
          Search
        </button>
      </div>

      <div
        className="w-full max-w-6xl rounded-2xl overflow-hidden border shadow
            h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[680px]"
      >
        <BangladeshMap ref={mapRef} />
      </div>
    </div>
  );
};

export default Coverage;
