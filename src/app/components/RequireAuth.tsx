import { Navigate, useLocation } from "react-router";
import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#161b43] text-[#DDBA5F] font-['Cantata_One']">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
