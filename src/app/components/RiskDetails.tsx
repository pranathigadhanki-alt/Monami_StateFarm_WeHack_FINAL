import { useNavigate, useLocation } from "react-router";
import { ChevronLeft } from "lucide-react";
import fireImage from "../../imports/image-5.png";
import theftImage from "../../imports/image-8.png";
import hailImage from "../../imports/image-7.png";

export default function RiskDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { flowerNum, selectedPolicy } = location.state || {};

  const riskData = {
    1: {
      name: "Fire",
      chances: "15% - 20%",
      description: "Basic Policy covers fire damage with actual cash value (pays current worth minus depreciation) with standard $1,000-$2,500 deductibles and limited living expense coverage. Premium Policy provides full replacement cost (rebuilds to current standards, no depreciation), lower $500-$1,000 deductibles, and extended hotel/meal coverage during repairs. Since fire damage requires complete rebuilding, Premium is recommended for 65% of homeowners, especially those with newer homes. Basic works well for older homes or those seeking lower premiums.",
      backgroundImage: fireImage
    },
    2: {
      name: "Hail",
      chances: "35% - 45%",
      description: "Basic Policy covers hail damage at actual cash value (depreciated roof value) with higher deductibles, meaning a 10-year-old roof gets partial payout. Premium Policy provides full replacement cost for roof and siding with lower deductibles and no depreciation applied. Given Texas's high hail frequency and that roofs are expensive to replace, Premium is strongly recommended for 70% of homeowners, particularly those with roofs under 15 years old. Basic suits those with very old roofs planning replacement anyway.",
      backgroundImage: hailImage
    },
    3: {
      name: "Theft",
      chances: "8% - 12%",
      description: "Basic Policy covers stolen items at actual cash value (used item value) with standard limits of $1,500-$2,500 for electronics and jewelry. Premium Policy provides replacement cost (buy new) with higher limits up to $5,000+ and scheduled coverage options for valuables. Since theft risk is lower and claims are typically smaller, Basic Policy is sufficient for 75% of homeowners with standard belongings. Premium is ideal for those with expensive electronics, jewelry, art, or collectibles exceeding Basic limits.",
      backgroundImage: theftImage
    }
  };

  const currentRisk = riskData[flowerNum as keyof typeof riskData] || { name: "Unknown", description: "", backgroundImage: "" };

  const handleBack = () => {
    navigate(-1);
  };

  const handleFinish = () => {
    navigate("/home");
  };

  return (
    <div className="relative z-10 flex flex-col h-full px-8 pt-28 pb-3 font-['Cantata_One']">
      {/* Title Bubble */}
      <div className="w-full bg-[#E8D7B8]/85 backdrop-blur-sm rounded-3xl px-6 py-4 shadow-xl mb-4">
        <h1 className="text-2xl text-center text-[#2C3E50] tracking-tight leading-tight">
          {currentRisk.name} Risk
        </h1>
      </div>

      {/* Risk Level Content Bubble */}
      <div className="w-full bg-[#E8D7B8]/85 backdrop-blur-sm rounded-3xl px-6 py-5 shadow-xl mb-4 flex-1 overflow-y-auto">
        <h2 className="text-2xl text-center text-[#2C3E50] mb-4 font-semibold">
          {currentRisk.chances}
        </h2>
        <p className="text-center text-base text-[#2C3E50] leading-relaxed">
          {currentRisk.description}
        </p>
      </div>

      {/* Buttons */}
      <div className="relative pb-2">
        {/* Back Arrow - Bottom Left */}
        <button
          onClick={handleBack}
          className="absolute left-0 bottom-2 text-[#2C3E50] hover:text-[#34495E] transition-colors"
        >
          <ChevronLeft className="w-8 h-8" strokeWidth={3} />
        </button>

        {/* Finish Button - Center */}
        <div className="flex justify-center">
          <button
            onClick={handleFinish}
            className="bg-[#2C3E50] text-white px-12 py-2.5 rounded-full hover:bg-[#34495E] transition-colors shadow-lg text-sm"
          >
            finish
          </button>
        </div>
      </div>
    </div>
  );
}
