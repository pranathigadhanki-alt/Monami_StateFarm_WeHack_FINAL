import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import { saveSurvey } from "../../lib/api";

export default function Survey() {
  const navigate = useNavigate();
  const [zipcode, setZipcode] = useState("");
  const [yearBuilt, setYearBuilt] = useState("");
  const [homeValue, setHomeValue] = useState("");
  const [homeType, setHomeType] = useState("");
  const [safetyFeatures, setSafetyFeatures] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);
    try {
      await saveSurvey({ zipcode, yearBuilt, homeValue, homeType, safetyFeatures });
      navigate("/exhibit-1/getting-started");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to save your survey. Please try again.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const homeTypes = ["Single-family", "Condo", "Townhouse"];
  const safetyOptions = [
    "None",
    "Smoke detectors",
    "Security system",
    "Leak sensors",
    "Smoke detectors + Security system",
    "Smoke detectors + Leak sensors",
    "Security system + Leak sensors",
    "All safety features"
  ];

  return (
    <div className="relative z-10 flex flex-col h-full px-8 pt-28 pb-3 font-['Cantata_One']">
      {/* Title Bubble */}
      <div className="w-full bg-[#E8D7B8]/85 backdrop-blur-sm rounded-3xl px-6 py-4 shadow-xl mb-6">
        <h1 className="text-2xl text-center text-[#2C3E50] tracking-tight leading-tight">
          Getting Started
        </h1>
        <p className="text-center text-xs text-[#2C3E50]/70 mt-2">
          Help us personalize your insurance journey
        </p>
      </div>

      {/* Survey Form Bubble */}
      <div className="w-full bg-[#E8D7B8]/85 backdrop-blur-sm rounded-3xl px-8 py-5 shadow-xl mb-3 max-h-[500px] overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Zipcode Input */}
          <div>
            <label className="block text-sm text-[#2C3E50] mb-2 font-semibold">
              Zip code
            </label>
            <input
              type="text"
              placeholder="Enter your zip code"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              maxLength={5}
              pattern="[0-9]{5}"
              className="w-full bg-[#F5E6C8] rounded-2xl px-5 py-3 text-[#2C3E50] placeholder-[#2C3E50]/50 outline-none focus:ring-2 focus:ring-[#2C3E50]/30 transition-all"
              required
            />
          </div>

          {/* Year Built Input */}
          <div>
            <label className="block text-sm text-[#2C3E50] mb-2 font-semibold">
              Year built
            </label>
            <input
              type="number"
              placeholder="e.g., 2015"
              value={yearBuilt}
              onChange={(e) => setYearBuilt(e.target.value)}
              min="1800"
              max={new Date().getFullYear()}
              className="w-full bg-[#F5E6C8] rounded-2xl px-5 py-3 text-[#2C3E50] placeholder-[#2C3E50]/50 outline-none focus:ring-2 focus:ring-[#2C3E50]/30 transition-all"
              required
            />
          </div>

          {/* Home Value Input */}
          <div>
            <label className="block text-sm text-[#2C3E50] mb-2 font-semibold">
              Home value
            </label>
            <input
              type="text"
              placeholder="e.g., $350,000"
              value={homeValue}
              onChange={(e) => setHomeValue(e.target.value)}
              className="w-full bg-[#F5E6C8] rounded-2xl px-5 py-3 text-[#2C3E50] placeholder-[#2C3E50]/50 outline-none focus:ring-2 focus:ring-[#2C3E50]/30 transition-all"
              required
            />
          </div>

          {/* Home Type Dropdown */}
          <div>
            <label className="block text-sm text-[#2C3E50] mb-2 font-semibold">
              Home type
            </label>
            <select
              value={homeType}
              onChange={(e) => setHomeType(e.target.value)}
              className="w-full bg-[#F5E6C8] rounded-2xl px-5 py-3 text-[#2C3E50] outline-none focus:ring-2 focus:ring-[#2C3E50]/30 transition-all appearance-none cursor-pointer"
              required
            >
              <option value="" disabled>Select home type</option>
              {homeTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Safety Features Dropdown */}
          <div>
            <label className="block text-sm text-[#2C3E50] mb-2 font-semibold">
              Safety features
            </label>
            <select
              value={safetyFeatures}
              onChange={(e) => setSafetyFeatures(e.target.value)}
              className="w-full bg-[#F5E6C8] rounded-2xl px-5 py-3 text-[#2C3E50] outline-none focus:ring-2 focus:ring-[#2C3E50]/30 transition-all appearance-none cursor-pointer"
              required
            >
              <option value="" disabled>Select safety features</option>
              {safetyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#2C3E50] text-white py-3 rounded-full hover:bg-[#34495E] transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Saving..." : "Submit"}
            </button>
          </div>
          {errorMessage ? (
            <p className="text-xs text-[#8B1E1E] text-center">
              {errorMessage}
            </p>
          ) : null}
        </form>
      </div>

      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute left-4 bottom-4 text-[#2C3E50] hover:text-[#34495E] transition-colors z-50"
      >
        <ChevronLeft className="w-8 h-8" strokeWidth={3} />
      </button>
    </div>
  );
}
