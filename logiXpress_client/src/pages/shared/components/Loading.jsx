import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="relative w-16 h-16">
        {/* Outer spinner */}
        <div className="absolute inset-0 border-4 border-t-[#CAEB66] border-gray-200 rounded-full animate-spin"></div>
        {/* Inner bouncing dot */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-4 h-4 bg-[#CAEB66] rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
