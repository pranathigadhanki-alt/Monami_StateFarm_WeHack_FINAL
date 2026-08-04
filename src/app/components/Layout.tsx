import { Outlet, useNavigate } from "react-router";
import backgroundImage from "../../imports/image-1.png";
import pantheonIcon from "../../imports/image-2.png";

export default function Layout() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-8">
      {/* iPhone 16 Pro Frame */}
      <div className="relative">
        {/* iPhone Body */}
        <div className="relative w-[393px] h-[852px] bg-black rounded-[60px] shadow-2xl p-3">
          {/* Screen */}
          <div className="relative w-full h-full bg-white rounded-[48px] overflow-hidden">
            {/* Dynamic Island */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[20px] z-50"></div>

            {/* App Content */}
            <div className="relative w-full h-full overflow-hidden">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${backgroundImage})`,
                }}
              />

              {/* Glass Taskbar */}
              <div className="absolute top-0 left-0 right-0 z-30 h-[100px] bg-white/20 backdrop-blur-md border-b border-white/30">
                <div className="flex items-center justify-between h-full px-6">
                  {/* Home Icon */}
                  <div className="pt-8">
                    <button onClick={() => navigate("/home")}>
                      <img
                        src={pantheonIcon}
                        alt="Pantheon"
                        className="w-12 h-12 hover:opacity-80 transition-opacity"
                      />
                    </button>
                  </div>

                  {/* Account Icon */}
                  <div className="pt-8">
                    <button onClick={() => navigate("/account")}>
                      <div className="w-14 h-14 rounded-full overflow-hidden border border-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:opacity-80 transition-opacity">
                        <img
                          src="https://images.unsplash.com/photo-1762970444229-63fa47ddad16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHx2YW4lMjBnb2doJTIwc2VsZiUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NTk3Njk3MHww&ixlib=rb-4.1.0&q=80&w=1080"
                          alt="Profile"
                          className="w-full h-full object-cover scale-110"
                        />
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Page Content */}
              <Outlet />
            </div>
          </div>

          {/* Side Buttons */}
          <div className="absolute left-0 top-[120px] w-1 h-[50px] bg-black rounded-l"></div>
          <div className="absolute left-0 top-[190px] w-1 h-[60px] bg-black rounded-l"></div>
          <div className="absolute left-0 top-[260px] w-1 h-[60px] bg-black rounded-l"></div>
          <div className="absolute right-0 top-[200px] w-1 h-[80px] bg-black rounded-r"></div>
        </div>
      </div>
    </div>
  );
}
