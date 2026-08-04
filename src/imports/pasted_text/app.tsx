import { useState, useEffect } from 'react';
import imgImage16 from '../imports/Login-2/d39770e1853ca7b69720f6c8a4e5f23724154124.png';
import imgImageRemovebgPreview2 from '../imports/Login-2/7e8597e13b52e907baf93e07b6407d626e28b887.png';
import Rectangle8 from '../imports/Rectangle8/Rectangle8';
import Rectangle9 from '../imports/Rectangle9/Rectangle9';
import HomePage from './components/HomePage';
import AccountPage from './components/AccountPage';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showTagline, setShowTagline] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'account'>('home');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTagline(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setCurrentPage('home');
  };

  if (isLoggedIn) {
    if (currentPage === 'account') {
      return (
        <AccountPage
          onBack={() => setCurrentPage('home')}
          onLogout={handleLogout}
        />
      );
    }
    return (
      <HomePage
        onLogout={handleLogout}
        onNavigateToAccount={() => setCurrentPage('account')}
      />
    );
  }

  return (
    <div className="bg-gray-200 relative size-full flex items-center justify-center overflow-hidden p-4">
      {/* iPhone 16 Pro Max Container */}
      <div className="relative w-[430px] h-[932px] bg-black rounded-[60px] shadow-2xl overflow-hidden border-[14px] border-black">
        {/* Dynamic Island */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[20px] z-50" />

        {/* Screen Content */}
        <div className="bg-[#161b43] relative size-full flex items-center justify-center overflow-hidden">
          {/* Mona Lisa Background */}
          <div className="absolute inset-0 z-0">
            <img
              alt="Mona Lisa background"
              className="w-full h-full object-cover opacity-30 blur-sm"
              src={imgImage16}
            />
          </div>
          {/* Overlay to reduce blue tint */}
          <div className="absolute inset-0 bg-black/30 z-0"></div>

          <div className="relative w-full h-full flex flex-col items-center justify-start pt-24 z-10">
            {/* Logo */}
            <div className="relative w-[300px] mb-2 mt-16">
              <img alt="MONAMI logo" className="w-full h-[78px] object-contain" src={imgImageRemovebgPreview2} />
            </div>

            {/* Tagline */}
            <div className={`text-center px-8 mb-24 transition-opacity duration-1000 ${showTagline ? 'opacity-100' : 'opacity-0'}`}>
              <p className="text-[#DDBA5F] text-sm italic" style={{ fontFamily: 'cursive' }}>
                A guided tour through your first steps of home insurance
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="w-full max-w-[370px] flex flex-col items-center gap-5 px-8">
              {/* Email Input */}
              <div className="relative w-full h-[60px]">
                <div className="absolute inset-0">
                  <Rectangle8 />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="relative w-full h-full bg-transparent border-none outline-none px-6 text-[#D4A373] placeholder-[#D4A373]/60 z-10"
                  style={{ fontFamily: 'Cantata One, serif' }}
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative w-full h-[60px]">
                <div className="absolute inset-0">
                  <Rectangle9 />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="relative w-full h-full bg-transparent border-none outline-none px-6 text-[#D4A373] placeholder-[#D4A373]/60 z-10"
                  style={{ fontFamily: 'Cantata One, serif' }}
                  required
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-[70%] h-[60px] rounded-3xl bg-gradient-to-r from-[#3d4a8f] to-[#24306B] text-white font-medium hover:bg-[#DDBA5F] hover:from-[#DDBA5F] hover:to-[#DDBA5F] transition-all mt-2"
                style={{ fontFamily: 'Cantata One, serif' }}
              >
                Login
              </button>

              {/* Forgot Password Link */}
              <button
                type="button"
                className="text-[#DDBA5F] text-sm underline hover:opacity-80 transition-opacity mt-1"
                style={{ fontFamily: 'Cantata One, serif' }}
              >
                Forgot Password?
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}