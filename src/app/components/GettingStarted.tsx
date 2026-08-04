import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getRiskScore } from "../../lib/api";

export default function GettingStarted() {
  const navigate = useNavigate();
  const [initialRiskScore, setInitialRiskScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    getRiskScore()
      .then((response) => {
        if (!isMounted) return;
        const score = Number(response?.riskScore?.score ?? 0);
        setInitialRiskScore(score);
      })
      .catch((error) => {
        if (!isMounted) return;
        const message = error instanceof Error ? error.message : "Unable to load risk score.";
        setErrorMessage(message);
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleContinue = () => {
    navigate("/home");
  };

  // Calculate bar fill percentage (0-10 scale)
  const fillPercentage = (initialRiskScore / 10) * 100;

  // Determine color based on risk score (lower is better)
  const getRiskColor = () => {
    if (initialRiskScore >= 7) return "#E74C3C"; // Red for high risk
    if (initialRiskScore >= 4) return "#F39C12"; // Orange for medium risk
    return "#27AE60"; // Green for low risk
  };

  return (
    <div className="relative z-10 flex flex-col h-full px-8 pt-28 pb-6 font-['Cantata_One'] overflow-y-auto">
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl text-center text-[#2C3E50] tracking-tight">
          Your Initial Risk Score
        </h1>
      </div>

      {/* Risk Score Display */}
      <div className="flex flex-col items-center mb-8">
        {/* Score Number */}
        <div className="mb-4">
          <div className="text-6xl font-bold text-[#2C3E50]">
            {isLoading ? "..." : initialRiskScore.toFixed(1)}
          </div>
          <div className="text-sm text-[#2C3E50] text-center mt-1">
            out of 10
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-[280px]">
          {/* Background bar */}
          <div className="w-full h-8 bg-white/30 rounded-full overflow-hidden shadow-lg">
            {/* Filled bar */}
            <div
              className="h-full transition-all duration-1000 ease-out rounded-full"
              style={{
                width: `${fillPercentage}%`,
                backgroundColor: getRiskColor(),
              }}
            />
          </div>
          {/* Scale markers */}
          <div className="flex justify-between mt-2 text-xs text-[#2C3E50]/70">
            <span>0</span>
            <span>5</span>
            <span>10</span>
          </div>
        </div>
      </div>
      {errorMessage ? (
        <p className="text-xs text-[#8B1E1E] text-center mb-4">
          {errorMessage}
        </p>
      ) : null}

      {/* Info Bubble */}
      <div className="w-full bg-[#E8D7B8]/90 backdrop-blur-sm rounded-3xl px-6 py-5 shadow-xl mb-6">
        <h2 className="text-xl text-center text-[#2C3E50] mb-3 font-semibold">
          What does this mean?
        </h2>
        <p className="text-sm text-[#2C3E50] text-center leading-relaxed">
          Your risk score reflects the likelihood of filing an insurance claim based on your home's characteristics and location. A lower score means lower risk and potentially lower premiums.
        </p>
      </div>

      {/* Next Steps Bubble */}
      <div className="w-full bg-[#E8D7B8]/90 backdrop-blur-sm rounded-3xl px-6 py-5 shadow-xl mb-6">
        <h3 className="text-lg text-center text-[#2C3E50] mb-2 font-semibold">
          Let's improve it together!
        </h3>
        <p className="text-xs text-[#2C3E50] text-center">
          Explore our museum exhibits to learn how to reduce your risk and save on insurance.
        </p>
      </div>

      {/* Continue Button */}
      <div className="mt-auto">
        <button
          onClick={handleContinue}
          className="w-full bg-[#2C3E50] text-white py-3 rounded-full hover:bg-[#34495E] transition-colors shadow-lg text-lg"
        >
          Continue to Museum
        </button>
      </div>
    </div>
  );
}
