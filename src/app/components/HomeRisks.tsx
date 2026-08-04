import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { ChevronLeft } from "lucide-react";

export default function HomeRisks() {
  const [flowerNum, setFlowerNum] = useState<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedPolicy } = location.state || {};

  const handleFlowerClick = (num: number) => {
    setFlowerNum(num);
  };

  const handleNext = () => {
    navigate("/exhibit-2/risk-details", { state: { flowerNum, selectedPolicy } });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="relative z-10 flex flex-col min-h-full px-8 py-12 pt-28 font-['Cantata_One']">
      {/* Title Bubble */}
      <div className="w-full bg-[#E8D7B8]/85 backdrop-blur-sm rounded-3xl px-6 py-6 shadow-xl mb-6">
        <h1 className="text-3xl text-center text-[#2C3E50] tracking-tight leading-tight">
          Understanding
          <br />
          Home Risks
        </h1>
      </div>

      {/* Description Bubble */}
      <div className="w-full bg-[#E8D7B8]/85 backdrop-blur-sm rounded-3xl px-6 py-4 shadow-xl mb-6">
        <p className="text-center text-sm text-[#2C3E50]/90 leading-relaxed">
          Your home faces different types of risks every day — from natural disasters to accidents and theft.
        </p>
      </div>

      {/* Large Space with Circle Buttons - Shows Background */}
      <div className="relative mb-0 min-h-[130px] flex items-start justify-center">
        <div className="relative w-full max-w-[280px] mt-2">
          {/* Track Path */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-cyan-400/40 -translate-y-1/2 rounded-full backdrop-blur-sm"></div>

          {/* Circle Buttons */}
          <div className="relative flex justify-between items-center">
            <button
              onClick={() => handleFlowerClick(1)}
              className={`relative w-16 h-16 rounded-full overflow-hidden backdrop-blur-md flex items-center justify-center text-white font-bold hover:scale-105 transition-all shadow-lg border-2 border-white/30 ${
                flowerNum === 1 ? "scale-110 ring-4 ring-white" : ""
              }`}
            >
              <div className="absolute inset-0 bg-cyan-400/70"></div>
              <span className="relative z-10 text-2xl">1</span>
            </button>
            <button
              onClick={() => handleFlowerClick(2)}
              className={`relative w-16 h-16 rounded-full overflow-hidden backdrop-blur-md flex items-center justify-center text-white font-bold hover:scale-105 transition-all shadow-lg border-2 border-white/30 ${
                flowerNum === 2 ? "scale-110 ring-4 ring-white" : ""
              }`}
            >
              <div className="absolute inset-0 bg-cyan-400/70"></div>
              <span className="relative z-10 text-2xl">2</span>
            </button>
            <button
              onClick={() => handleFlowerClick(3)}
              className={`relative w-16 h-16 rounded-full overflow-hidden backdrop-blur-md flex items-center justify-center text-white font-bold hover:scale-105 transition-all shadow-lg border-2 border-white/30 ${
                flowerNum === 3 ? "scale-110 ring-4 ring-white" : ""
              }`}
            >
              <div className="absolute inset-0 bg-cyan-400/70"></div>
              <span className="relative z-10 text-2xl">3</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Instruction Bubble */}
      <div className="w-full bg-[#E8D7B8]/85 backdrop-blur-sm rounded-3xl px-6 py-6 shadow-xl">
        <p className="text-center text-sm text-[#2C3E50]/90 mb-6 leading-relaxed">
          Each numbered flower corresponds to a different risk that could impact your insurance.
          Choose one and go to the next page. You can come back to explore the rest later.
        </p>

        {/* Buttons */}
        <div className="relative">
          {/* Back Arrow - Bottom Left */}
          <button
            onClick={handleBack}
            className="absolute left-0 bottom-0 text-[#2C3E50] hover:text-[#34495E] transition-colors"
          >
            <ChevronLeft className="w-8 h-8" strokeWidth={3} />
          </button>

          {/* Next Button - Center */}
          <div className="flex justify-center">
            <button
              onClick={handleNext}
              disabled={!flowerNum}
              className="bg-[#2C3E50] text-white px-14 py-3 rounded-full hover:bg-[#34495E] transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
