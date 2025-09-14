import { useNavigate } from "react-router-dom";
import img from "../../public/HKB.jpg";
export default function HomeContent() {
  const navigate = useNavigate();
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-10 bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl w-full max-w-md md:max-w-3xl mx-auto text-center transform transition duration-300 hover:scale-[1.02]">
        {/* Animated Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-blue-700 animate-fade-in leading-tight">
          Home
        </h2>

        {/* Enhanced Subtitle */}
        <p className="text-lg md:text-2xl text-gray-800 font-medium mb-6 tracking-wide">
          Learn while having fun
        </p>

        {/* Description with highlights */}
        <p className="text-gray-700 mb-8 leading-relaxed text-base md:text-lg">
          Thousands of{" "}
          <span className="font-semibold text-blue-600">questions</span> are
          waiting for you! Choose your{" "}
          <span className="font-semibold text-indigo-600">category</span> or let
          the quiz surprise you.
          <br />
          Answer{" "}
          <span className="font-medium text-gray-800">
            correctly and quickly
          </span>{" "}
          to earn points that{" "}
          <span className="font-semibold text-blue-600">
            reflect your knowledge level
          </span>
          .
        </p>

        {/* Centered Button */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/play")}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transition transform hover:scale-105 flex items-center justify-center gap-2"
          >
            Start Quiz
          </button>
        </div>

        <p className="mt-4 text-sm text-gray-500 italic">
          You can play as many times as you like
        </p>
      </div>
      <div className="mt-3 bg-white p-8 md:p-12 rounded-2xl shadow-2xl w-full max-w-md md:max-w-3xl mx-auto text-center transform transition duration-300 hover:scale-[1.02]">
        <div className="flex justify-center mb-4">
          <img
            src={img} 
            alt="Avatar HKB"
            className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg"
          />
        </div>

        <h3 className="text-2xl font-bold text-blue-700 mb-2">
          Created by HKB
        </h3>

        <p className="text-gray-700 text-lg mb-6">
          Have fun and challenge yourself with this awesome quiz game!
        </p>
      </div>
    </main>
  );
}
