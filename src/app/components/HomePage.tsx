import { useState } from 'react';
import { useNavigate } from 'react-router';
import starryNightBg from '../../imports/image-9.png';
import pillarIcon from '../../imports/image-10.png';
import profileIcon from '../../imports/image-11.png';
import monamiLogo from '../../imports/image-12.png';
import exhibit1Img from '../../imports/image-13.png';
import exhibit2Img from '../../imports/image-14.png';
import exhibit3Img from '../../imports/image-15.png';
import exhibit4Img from '../../imports/image-16.png';
import monaIcon from '../../imports/image-17.png';
import { generateMonaResponse } from '../../lib/openai';

type ChatMessage = {
  id: string;
  role: 'user' | 'mona';
  text: string;
};

export default function HomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'mona',
      text: "Hi, I'm Mona your tour guide, how can I help you today?",
    },
  ]);
  const [isMonaLoading, setIsMonaLoading] = useState(false);
  const navigate = useNavigate();

  const handleExhibitClick = (exhibitNumber: number) => {
    if (exhibitNumber === 1) {
      navigate('/exhibit-1');
    } else if (exhibitNumber === 2) {
      navigate('/exhibit-2');
    } else if (exhibitNumber === 3) {
      navigate('/exhibit-3');
    } else if (exhibitNumber === 4) {
      navigate('/exhibit-4');
    }
  };

  const handleNavigateToAccount = () => {
    navigate('/account');
  };

  const handleSendMessage = async () => {
    const trimmed = chatMessage.trim();
    if (!trimmed || isMonaLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setChatMessage('');
    setIsMonaLoading(true);

    try {
      const aiText = await generateMonaResponse(trimmed, { screen: 'home' });
      const monaMessage: ChatMessage = {
        id: `mona-${Date.now()}`,
        role: 'mona',
        text: aiText,
      };
      setMessages((prev) => [...prev, monaMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `mona-fallback-${Date.now()}`,
          role: 'mona',
          text: "I'm having trouble connecting right now, but I can still help with basics like risk score or policy questions.",
        },
      ]);
    } finally {
      setIsMonaLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 relative w-full min-h-screen flex items-center justify-center overflow-hidden p-4">
      {/* iPhone 16 Pro Max Container */}
      <div className="relative w-[430px] h-[932px] bg-black rounded-[60px] shadow-2xl overflow-hidden border-[14px] border-black">
        {/* Dynamic Island */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[20px] z-50" />

        {/* Screen Content */}
        <div className="relative w-full h-full overflow-hidden">
          {/* Starry Night Background */}
          <div className="absolute inset-0 z-0">
            <img
              alt="Starry Night background"
              className="w-full h-full object-cover"
              src={starryNightBg}
            />
          </div>
          {/* Dark overlay for better contrast */}
          <div className="absolute inset-0 bg-black/30 z-0"></div>

          {/* Navigation Bar - Transparent Glass */}
          <div
            className="absolute top-0 left-0 right-0 h-[100px] z-40 flex items-center justify-center px-8 pt-10"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* Homepage Button - Pillar */}
            <button
              onClick={() => navigate('/home')}
              className="absolute left-8 w-[50px] h-[50px] flex items-center justify-center transition-transform hover:scale-110 active:scale-95 z-10"
              style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))' }}
            >
              <img
                src={pillarIcon}
                alt="Homepage"
                className="w-full h-full object-contain"
              />
            </button>

            {/* MONAMI Logo Center */}
            <div className="w-[200px] h-[50px] z-10">
              <img
                src={monamiLogo}
                alt="MONAMI"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Profile Button */}
            <button
              onClick={handleNavigateToAccount}
              className="absolute right-8 w-[55px] h-[55px] flex items-center justify-center transition-transform hover:scale-110 active:scale-95 z-10"
              style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))' }}
            >
              <img
                src={profileIcon}
                alt="Profile"
                className="w-full h-full object-contain"
              />
            </button>
          </div>

          {/* Headline Text */}
          <div className="absolute top-[155px] left-0 right-0 px-8 z-30 flex justify-center">
            <h2
              className="text-white text-center transition-all duration-500 font-['Cantata_One'] text-xl"
              style={{
                textShadow: '0px 2px 8px rgba(0, 0, 0, 0.5)',
                marginBottom: '10px'
              }}
            >
              Home Insurance Reimagined.
            </h2>
          </div>

          {/* Main Content Area */}
          <div className="relative w-full h-full pt-[130px] z-10 flex items-center justify-center">
            {/* Exhibits */}
            <div className="flex flex-col items-center justify-evenly h-[700px] py-8">
              {/* Exhibit 1 - Monet Bridge */}
              <button
                onClick={() => handleExhibitClick(1)}
                className="relative flex flex-col items-center transition-transform hover:scale-105 active:scale-95"
              >
                <div className="w-[140px] h-[140px] rounded-full overflow-hidden relative"
                     style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4))' }}>
                  <img src={exhibit1Img} alt="Exhibit 1 - Monet Bridge" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gray-600/60 z-10 flex items-center justify-center">
                    <span className="text-white text-xl z-20 font-['Cantata_One']">
                      Exhibit 1
                    </span>
                  </div>
                </div>
              </button>

              {/* Exhibit 2 - Van Gogh Sunflowers - ACTIVE */}
              <button
                onClick={() => handleExhibitClick(2)}
                className="relative flex flex-col items-center transition-transform hover:scale-105 active:scale-95"
              >
                <div className="w-[140px] h-[140px] rounded-full overflow-hidden relative"
                     style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4))' }}>
                  <img src={exhibit2Img} alt="Exhibit 2 - Sunflowers" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gray-600/60 z-10 flex items-center justify-center">
                    <span className="text-white text-xl z-20 font-['Cantata_One']">
                      Exhibit 2
                    </span>
                  </div>
                </div>
              </button>

              {/* Exhibit 3 - Cafe Terrace */}
              <button
                onClick={() => handleExhibitClick(3)}
                className="relative flex flex-col items-center transition-transform hover:scale-105 active:scale-95"
              >
                <div className="w-[140px] h-[140px] rounded-full overflow-hidden relative"
                     style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4))' }}>
                  <img src={exhibit3Img} alt="Exhibit 3 - Cafe Terrace" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gray-600/60 z-10 flex items-center justify-center">
                    <span className="text-white text-xl z-20 font-['Cantata_One']">
                      Exhibit 3
                    </span>
                  </div>
                </div>
              </button>

              {/* Exhibit 4 - Autumn Trees */}
              <button
                onClick={() => handleExhibitClick(4)}
                className="relative flex flex-col items-center transition-transform hover:scale-105 active:scale-95"
              >
                <div className="w-[140px] h-[140px] rounded-full overflow-hidden relative"
                     style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4))' }}>
                  <img src={exhibit4Img} alt="Exhibit 4 - Autumn Trees" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gray-600/60 z-10 flex items-center justify-center">
                    <span className="text-white text-xl z-20 font-['Cantata_One']">
                      Exhibit 4
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* AI Chat Agent - Mona */}
          <div className="absolute bottom-6 right-6 z-50">
            {isChatOpen ? (
              <div
                className="w-[280px] h-[400px] overflow-hidden shadow-2xl"
                style={{
                  background: 'rgba(22, 25, 66, 0.7)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: '0px 8px 40px rgba(0, 0, 0, 0.3)',
                  borderRadius: '20px',
                }}
              >
                <div className="flex flex-col h-full">
                  {/* Chat Header */}
                  <div className="flex items-center justify-between p-4 bg-transparent">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold font-['Cantata_One']">Mona</span>
                    </div>
                    <button
                      onClick={() => setIsChatOpen(false)}
                      className="text-white/70 hover:text-white text-xl font-['Cantata_One']"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Chat Messages */}
                  <div className="flex-1 p-4 overflow-y-auto">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`rounded-2xl p-3 mb-2 ${message.role === 'user' ? 'bg-[#DDBA5F]/30 ml-5' : 'bg-white/10 mr-5'}`}
                      >
                        <p className="text-white text-sm font-['Cantata_One']">
                          {message.text}
                        </p>
                      </div>
                    ))}
                    {isMonaLoading ? (
                      <div className="bg-white/10 rounded-2xl p-3 mb-2 mr-5">
                        <p className="text-white text-sm font-['Cantata_One']">
                          Mona is typing...
                        </p>
                      </div>
                    ) : null}
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-t border-white/20">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          void handleSendMessage();
                        }
                      }}
                      className="w-full bg-white/10 text-white placeholder-white/50 px-4 py-2 rounded-full border border-white/20 outline-none focus:border-[#DDBA5F] transition-colors font-['Cantata_One']"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsChatOpen(true)}
                className="w-[90px] h-[90px] rounded-full shadow-lg overflow-hidden transition-transform hover:scale-110 active:scale-95"
                style={{
                  filter: 'drop-shadow(0 4px 12px rgba(221, 186, 95, 0.4))',
                }}
              >
                <img src={monaIcon} alt="Mona" className="w-full h-full object-cover" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
