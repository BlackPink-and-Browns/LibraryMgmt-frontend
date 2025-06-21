import React from "react";

const LoadingSpinner = ({ message = "Loading..." }: { message?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-lg text-purple-600 font-medium animate-pulse">
        {message}
      </p>
    </div>
  );
};

export default LoadingSpinner;
