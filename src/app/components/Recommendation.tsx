import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { getRecommendations } from "../../lib/api";

export default function Recommendation() {
  const navigate = useNavigate();
  const [recommendationText, setRecommendationText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleBack = () => {
    navigate(-1);
  };

  const handleFinish = () => {
    navigate("/home");
  };

  useEffect(() => {
    let isMounted = true;

    getRecommendations()
      .then((response) => {
        if (!isMounted) return;
        setRecommendationText(response?.latestRecommendation?.text ?? "No recommendation is available yet.");
      })
      .catch((error) => {
        if (!isMounted) return;
        const message = error instanceof Error ? error.message : "Unable to load recommendation.";
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

  return (
    <div className="relative z-10 flex flex-col h-full px-8 pt-28 pb-3 font-['Cantata_One']">
      {/* Title Bubble */}
      <div className="w-full bg-[#E8D7B8]/85 backdrop-blur-sm rounded-3xl px-6 py-4 shadow-xl mb-4">
        <h1 className="text-2xl text-center text-[#2C3E50] tracking-tight leading-tight">
          Recommendation
        </h1>
      </div>

      {/* Recommendation Content Bubble */}
      <div className="w-full bg-[#E8D7B8]/85 backdrop-blur-sm rounded-3xl px-6 py-5 shadow-xl mb-4 flex-1 overflow-y-auto">
        <p className="text-center text-base text-[#2C3E50] leading-relaxed">
          {isLoading ? "Loading recommendation..." : recommendationText}
        </p>
        {errorMessage ? (
          <p className="text-xs text-[#8B1E1E] text-center mt-3">
            {errorMessage}
          </p>
        ) : null}
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
