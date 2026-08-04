import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronDown } from "lucide-react";

export default function PolicyEducation() {
  const [selectedPolicy, setSelectedPolicy] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const policies = ["Basic", "Premium House Policy"];

  const policyInfo = {
    "Basic": {
      title: "State Farm Basic Coverage",
      subtitle: "Affordable protection for your home",
      points: [
        "Actual cash value coverage (current worth minus depreciation)",
        "Standard deductibles: $1,000-$2,500",
        "Basic liability protection",
        "Best for: Budget-conscious homeowners or older homes"
      ]
    },
    "Premium House Policy": {
      title: "State Farm Premium Coverage",
      subtitle: "Comprehensive replacement protection",
      points: [
        "Full replacement cost (no depreciation)",
        "Lower deductibles: $500-$1,000",
        "Extended living expenses during repairs",
        "Higher limits on valuables and jewelry",
        "Best for: Newer homes or maximum protection"
      ]
    }
  };

  const handleNext = () => {
    navigate("/exhibit-2/home-risks", { state: { selectedPolicy } });
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-full px-8 py-12 pt-28 gap-6 font-['Cantata_One']">
      {/* Title Bubble */}
      <div className="w-full bg-[#E8D7B8]/85 backdrop-blur-sm rounded-3xl px-8 py-8 shadow-xl">
        <h1 className="text-4xl text-center text-[#2C3E50] tracking-tight leading-tight">
          Policy
          <br />
          Education
        </h1>
      </div>

      {/* Dropdown & Information Bubble */}
      <div className="w-full bg-[#E8D7B8]/85 backdrop-blur-sm rounded-3xl px-8 py-6 shadow-xl">
        {/* Dropdown */}
        <div className="mb-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-[#F5E6C8] rounded-2xl px-5 py-4 text-left text-[#2C3E50] flex items-center justify-between hover:bg-[#EDD9B5] transition-colors"
          >
            <span className="text-sm">
              {selectedPolicy || "dropdown"}
            </span>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isOpen && (
            <div className="mt-2 bg-[#F5E6C8] rounded-2xl overflow-hidden shadow-lg">
              {policies.map((policy) => (
                <button
                  key={policy}
                  onClick={() => {
                    setSelectedPolicy(policy);
                    setIsOpen(false);
                  }}
                  className="w-full px-5 py-3 text-left text-sm text-[#2C3E50] hover:bg-[#EDD9B5] transition-colors border-b border-[#E8D7B8] last:border-b-0"
                >
                  {policy}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Information Text */}
        <div className="mb-16 px-2">
          {selectedPolicy ? (
            <div>
              <h3 className="text-base text-center text-[#2C3E50] font-semibold mb-0.5">
                {policyInfo[selectedPolicy as keyof typeof policyInfo].title}
              </h3>
              <p className="text-center text-xs text-[#2C3E50]/70 mb-3 italic">
                {policyInfo[selectedPolicy as keyof typeof policyInfo].subtitle}
              </p>
              <ul className="text-left text-xs text-[#2C3E50]/90 leading-snug space-y-1.5">
                {policyInfo[selectedPolicy as keyof typeof policyInfo].points.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-[#2C3E50]">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-center text-sm text-[#2C3E50]/80 leading-relaxed">
              Select a policy from the dropdown above to learn more about coverage options and what's included.
            </p>
          )}
        </div>

        {/* Next Button */}
        <div className="flex justify-center">
          <button
            onClick={handleNext}
            className="bg-[#2C3E50] text-white px-14 py-3 rounded-full hover:bg-[#34495E] transition-colors shadow-lg"
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
}
