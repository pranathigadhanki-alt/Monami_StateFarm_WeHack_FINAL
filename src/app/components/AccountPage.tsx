import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import profileIcon from '../../imports/image-11.png';
import pillarIcon from '../../imports/image-10.png';
import monamiLogo from '../../imports/image-12.png';
import { getUserProfile, signOut } from '../../lib/api';

export default function AccountPage() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('My Account');
  const [latestRisk, setLatestRisk] = useState<number | null>(null);
  const [history, setHistory] = useState<Array<{ id: string; score: number; created_at: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    getUserProfile()
      .then((response) => {
        if (!isMounted) return;
        setUserEmail(response?.profile?.email ?? 'My Account');
        setLatestRisk(response?.latestRiskScore?.score != null ? Number(response.latestRiskScore.score) : null);
        setHistory(
          (response?.history ?? []).map((entry: { id: string; score: number | string; created_at: string }) => ({
            id: entry.id,
            score: Number(entry.score),
            created_at: entry.created_at,
          })),
        );
      })
      .catch((error) => {
        if (!isMounted) return;
        const message = error instanceof Error ? error.message : 'Unable to load account details.';
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

  const handleBack = () => {
    navigate('/home');
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/', { replace: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to logout right now.';
      setErrorMessage(message);
    }
  };

  return (
    <div className="bg-gray-200 relative w-full min-h-screen flex items-center justify-center overflow-hidden p-4">
      {/* iPhone 16 Pro Max Container */}
      <div className="relative w-[430px] h-[932px] bg-black rounded-[60px] shadow-2xl overflow-hidden border-[14px] border-black">
        {/* Dynamic Island */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[20px] z-50" />

        {/* Screen Content */}
        <div className="bg-[#161942] relative w-full h-full overflow-y-auto">
          {/* Navigation Bar */}
          <div
            className="absolute top-0 left-0 right-0 h-[100px] z-40 flex items-center justify-center px-8 pt-10"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="absolute left-8 w-[50px] h-[50px] flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
              style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))' }}
            >
              <img
                src={pillarIcon}
                alt="Back to Home"
                className="w-full h-full object-contain"
              />
            </button>

            {/* MONAMI Logo Center */}
            <div className="w-[180px] h-[50px]">
              <img
                src={monamiLogo}
                alt="MONAMI"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Account Content */}
          <div className="relative w-full h-full pt-[120px] px-8 pb-8">
            {/* Profile Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative mb-4">
                <img
                  src={profileIcon}
                  alt="Profile"
                  className="w-[120px] h-[120px] rounded-full object-cover"
                  style={{ filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))' }}
                />
                {/* Risk Score Badge */}
                <div
                  className="absolute -bottom-2 -right-2 bg-[#DDBA5F] rounded-full px-4 py-2"
                  style={{ filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3))' }}
                >
                  <span className="text-white font-bold font-['Cantata_One']">
                    Risk: {isLoading ? '...' : latestRisk?.toFixed(1) ?? '--'}
                  </span>
                </div>
              </div>
              <h2 className="text-white text-2xl mb-2 font-['Cantata_One']">
                {userEmail}
              </h2>
            </div>

            {/* My History */}
            <div className="mb-6">
              <button
                className="w-full bg-white/10 backdrop-blur-md rounded-2xl p-4 text-left hover:bg-white/20 transition-colors"
                style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)' }}
              >
                <h3 className="text-white text-lg font-['Cantata_One']">
                  My History
                </h3>
                <p className="text-white/70 text-xs mt-2 font-['Cantata_One']">
                  {history.length > 0
                    ? `Recent scores: ${history
                        .slice(0, 3)
                        .map((entry) => entry.score.toFixed(1))
                        .join(', ')}`
                    : 'No risk score history yet.'}
                </p>
              </button>
            </div>
            {errorMessage ? (
              <p className="text-[#ffb3b3] text-xs mb-4 font-['Cantata_One']">
                {errorMessage}
              </p>
            ) : null}

            {/* Profile Settings */}
            <div className="mb-6">
              <h3 className="text-white text-lg mb-3 font-['Cantata_One']">
                Profile Settings
              </h3>

              {/* Edit Account */}
              <button
                className="w-full bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-3 text-left hover:bg-white/20 transition-colors"
                style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)' }}
              >
                <span className="text-white font-['Cantata_One']">
                  Edit Account
                </span>
              </button>

              {/* Privacy and Settings */}
              <button
                className="w-full bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-3 text-left hover:bg-white/20 transition-colors"
                style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)' }}
              >
                <span className="text-white font-['Cantata_One']">
                  Privacy and Settings
                </span>
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full bg-[#DDBA5F] rounded-2xl p-4 text-center hover:opacity-90 transition-opacity"
                style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)' }}
              >
                <span className="text-white font-semibold font-['Cantata_One']">
                  Logout
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
