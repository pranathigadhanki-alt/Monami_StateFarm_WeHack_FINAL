import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import exhibit1Icon from "../../imports/image-13.png";
import exhibit2Icon from "../../imports/image-14.png";
import exhibit3Icon from "../../imports/image-15.png";
import exhibit4Icon from "../../imports/image-16.png";
import { getProgress, getRiskScore, saveProgress } from "../../lib/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [riskScore, setRiskScore] = useState(0);
  const [exhibitsCompleted, setExhibitsCompleted] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Random scenario selection (1-3)
  const scenarios = [
    {
      scenario: "You own a 5-year-old home in a hail-prone area with moderate-value belongings. You want comprehensive coverage but need to manage costs.",
      correctAnswer: "Premium",
      explanation: "Premium policy offers full replacement cost for your newer home and better hail protection, which is critical in your area. The investment is worth it for a 5-year-old home."
    },
    {
      scenario: "You own a 25-year-old home with an aging roof in a low-crime neighborhood. You have basic belongings and are budget-conscious.",
      correctAnswer: "Basic",
      explanation: "Basic policy is ideal here. Your older roof has already depreciated, so actual cash value coverage makes sense. Low theft risk and basic belongings don't require premium coverage."
    },
    {
      scenario: "You own a new home (2 years old) with expensive electronics and jewelry. You live in an area with moderate weather risks.",
      correctAnswer: "Premium",
      explanation: "Premium policy is essential for your newer home and valuable possessions. Full replacement cost and higher coverage limits for valuables justify the extra cost."
    }
  ];

  const [currentScenario] = useState(scenarios[Math.floor(Math.random() * scenarios.length)]);

  useEffect(() => {
    let isMounted = true;

    Promise.all([getRiskScore(), getProgress()])
      .then(([riskResponse, progressResponse]) => {
        if (!isMounted) return;
        setRiskScore(Number(riskResponse?.riskScore?.score ?? 0));
        setExhibitsCompleted(Number(progressResponse?.progress?.exhibits_completed ?? 0));
      })
      .catch((error) => {
        if (!isMounted) return;
        const message = error instanceof Error ? error.message : "Unable to load dashboard data.";
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

  const handleAnswer = async (answer: string) => {
    setSelectedAnswer(answer);
    setHasAnswered(true);
    const correct = answer === currentScenario.correctAnswer;
    setIsCorrect(correct);

    // Lower risk score if correct
    if (correct) {
      const newRiskScore = Number(Math.max(riskScore - 0.7, 0).toFixed(1));
      setRiskScore(newRiskScore);
      const nextProgress = Math.min(exhibitsCompleted + 1, 4);
      setExhibitsCompleted(nextProgress);
      try {
        await saveProgress(nextProgress);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unable to save progress.";
        setErrorMessage(message);
      }
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleFinish = () => {
    navigate("/home");
  };

  return (
    <div className="relative z-10 flex flex-col h-full px-6 pt-28 pb-3 font-['Cantata_One']">
      {/* Title Bubble */}
      <div className="w-full bg-[#E8D7B8]/85 backdrop-blur-sm rounded-3xl px-6 py-3 shadow-xl mb-3">
        <h1 className="text-xl text-center text-[#2C3E50] tracking-tight">
          Your Dashboard
        </h1>
      </div>

      {/* Progress & Badges Bubble */}
      <div className="w-full bg-[#E8D7B8]/85 backdrop-blur-sm rounded-3xl px-6 py-4 shadow-xl mb-3">
        <h2 className="text-sm text-center text-[#2C3E50] mb-2 font-semibold">Exhibits Completed</h2>
        <div className="flex justify-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full overflow-hidden shadow-md">
            <img src={exhibit1Icon} alt="Exhibit 1" className="w-full h-full object-cover opacity-50" />
          </div>
          <div className="w-12 h-12 rounded-full overflow-hidden shadow-md ring-2 ring-green-500">
            <img src={exhibit2Icon} alt="Exhibit 2" className="w-full h-full object-cover" />
          </div>
          <div className="w-12 h-12 rounded-full overflow-hidden shadow-md ring-2 ring-green-500">
            <img src={exhibit3Icon} alt="Exhibit 3" className="w-full h-full object-cover" />
          </div>
          <div className="w-12 h-12 rounded-full overflow-hidden shadow-md">
            <img src={exhibit4Icon} alt="Exhibit 4" className="w-full h-full object-cover opacity-50" />
          </div>
        </div>
        <p className="text-xs text-center text-[#2C3E50]/80">
          {isLoading ? "Loading progress..." : `You've completed ${exhibitsCompleted} of 4 exhibits`}
        </p>
      </div>

      {/* Risk Score Display */}
      <div className="w-full bg-[#E8D7B8]/85 backdrop-blur-sm rounded-3xl px-6 py-3 shadow-xl mb-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-[#2C3E50]">Current Risk Score:</span>
          <span className={`text-lg font-bold ${hasAnswered && isCorrect ? 'text-green-600' : 'text-[#2C3E50]'}`}>
            {isLoading ? "..." : riskScore.toFixed(1)}
          </span>
        </div>
      </div>
      {errorMessage ? (
        <p className="text-xs text-[#8B1E1E] text-center mb-3">
          {errorMessage}
        </p>
      ) : null}

      {/* Final Exam Question Bubble */}
      <div className="w-full bg-[#E8D7B8]/85 backdrop-blur-sm rounded-3xl px-6 py-4 shadow-xl mb-3 flex-1 overflow-y-auto">
        <h2 className="text-base text-center text-[#2C3E50] mb-3 font-semibold">Final Assessment</h2>

        <div className="mb-4">
          <p className="text-xs text-[#2C3E50] leading-relaxed mb-3">
            <span className="font-semibold">Scenario:</span> {currentScenario.scenario}
          </p>
          <p className="text-xs text-[#2C3E50] font-semibold mb-2">
            Which policy would best benefit you with the least amount of cost?
          </p>
        </div>

        {/* Answer Options */}
        <div className="space-y-2 mb-3">
          <button
            onClick={() => handleAnswer("Basic")}
            disabled={hasAnswered}
            className={`w-full px-4 py-2 rounded-xl text-xs transition-colors ${
              hasAnswered
                ? selectedAnswer === "Basic"
                  ? isCorrect
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  : "bg-[#F5E6C8] text-[#2C3E50] opacity-50"
                : "bg-[#F5E6C8] text-[#2C3E50] hover:bg-[#EDD9B5]"
            }`}
          >
            Basic Policy
          </button>
          <button
            onClick={() => handleAnswer("Premium")}
            disabled={hasAnswered}
            className={`w-full px-4 py-2 rounded-xl text-xs transition-colors ${
              hasAnswered
                ? selectedAnswer === "Premium"
                  ? isCorrect
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  : "bg-[#F5E6C8] text-[#2C3E50] opacity-50"
                : "bg-[#F5E6C8] text-[#2C3E50] hover:bg-[#EDD9B5]"
            }`}
          >
            Premium Policy
          </button>
        </div>

        {/* Feedback */}
        {hasAnswered && (
          <div className={`p-3 rounded-xl ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
            <p className={`text-xs ${isCorrect ? 'text-green-800' : 'text-red-800'} leading-relaxed`}>
              {isCorrect ? (
                <>
                  <span className="font-semibold">Correct!</span> {currentScenario.explanation} Your risk score improved to {riskScore.toFixed(1)}!
                </>
              ) : (
                <>
                  <span className="font-semibold">Not quite.</span> {currentScenario.explanation}
                </>
              )}
            </p>
          </div>
        )}
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
