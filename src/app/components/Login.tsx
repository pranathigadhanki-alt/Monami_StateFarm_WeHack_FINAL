import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import monaLisaBg from '../../imports/image-19.png';
import monamiLogo from '../../imports/image-20.png';
import { signInWithPassword } from '../../lib/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('monaLisa@gmail.com');
  const [password, setPassword] = useState('monami');
  const [showTagline, setShowTagline] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/home', { replace: true });
    }
  }, [navigate, user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTagline(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await signInWithPassword(email, password);
      navigate('/home', { replace: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to sign in. Please try again.';
      setErrorMessage(message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-200 relative w-full min-h-screen flex items-center justify-center overflow-hidden p-4">
      {/* iPhone 16 Pro Max Container */}
      <div className="relative w-[430px] h-[932px] bg-black rounded-[60px] shadow-2xl overflow-hidden border-[14px] border-black">
        {/* Dynamic Island */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[20px] z-50" />

        {/* Screen Content */}
        <div className="bg-[#161b43] relative w-full h-full flex items-center justify-center overflow-hidden">
          {/* Mona Lisa Background */}
          <div className="absolute inset-0 z-0">
            <img
              alt="Mona Lisa background"
              className="w-full h-full object-cover opacity-30 blur-sm"
              src={monaLisaBg}
            />
          </div>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 z-0"></div>

          <div className="relative w-full h-full flex flex-col items-center justify-start pt-24 z-10">
            {/* Logo - Clear and Sharp */}
            <div className="relative w-[300px] mb-2 mt-16">
              <img alt="MONAMI logo" className="w-full h-auto object-contain" style={{ imageRendering: 'crisp-edges' }} src={monamiLogo} />
            </div>

            {/* Tagline */}
            <div className={`text-center px-8 mb-24 transition-opacity duration-1000 ${showTagline ? 'opacity-100' : 'opacity-0'}`}>
              <p className="text-[#DDBA5F] text-sm italic font-['Cantata_One']">
                A guided tour through your first steps of home insurance
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="w-full max-w-[370px] flex flex-col items-center gap-5 px-8">
              {/* Email Input */}
              <div className="relative w-full h-[60px]">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-full bg-[#D4A373]/20 backdrop-blur-sm border-2 border-[#D4A373]/40 rounded-2xl outline-none px-6 text-[#D4A373] placeholder-[#D4A373]/60 font-['Cantata_One']"
                />
              </div>

              {/* Password Input */}
              <div className="relative w-full h-[60px]">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-full bg-[#D4A373]/20 backdrop-blur-sm border-2 border-[#D4A373]/40 rounded-2xl outline-none px-6 text-[#D4A373] placeholder-[#D4A373]/60 font-['Cantata_One']"
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-[70%] h-[60px] rounded-3xl bg-gradient-to-r from-[#3d4a8f] to-[#24306B] text-white font-medium hover:bg-[#DDBA5F] hover:from-[#DDBA5F] hover:to-[#DDBA5F] transition-all mt-2 font-['Cantata_One'] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Connecting...' : 'Login'}
              </button>

              {/* Forgot Password Link */}
              <button
                type="button"
                className="text-[#DDBA5F] text-sm underline hover:opacity-80 transition-opacity mt-1 font-['Cantata_One']"
              >
                Forgot Password?
              </button>
              {errorMessage ? (
                <p className="text-[#ffb3b3] text-xs text-center font-['Cantata_One']">
                  {errorMessage}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
