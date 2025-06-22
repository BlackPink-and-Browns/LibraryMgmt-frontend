import React from "react";
import { useNavigate } from "react-router-dom";
import { Ghost } from "lucide-react"; // Optional: ghost icon from Lucide

const NotFound = ({msg}:{msg?:boolean}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-theme-light text-black px-4">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <Ghost className="w-16 h-16 animate-bounce text-purple-400" />
        </div>
        <h1 className="text-7xl font-extrabold">404</h1>
        <p className="text-xl">{"Uh-oh... Looks like you're lost in the void."}</p>
        <p className="text-2xl text-gray-300 italic font-bold">
          {msg? "U Have no Access to this page" :"The page you’re looking for doesn’t exist or has been moved"}
        </p> 
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold shadow-lg transition"
        >
          Take me back home 🏠
        </button>
      </div>
    </div>
  );
};

export default NotFound;
