import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Home, LogOut, Swords, Trophy } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <nav className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <button
                onClick={() => navigate("/")}
                className="text-gray-300 hover:text-white flex items-center space-x-2"
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </button>
              <button
                onClick={() => navigate("/matchmaking")}
                className="text-gray-300 hover:text-white flex items-center space-x-2"
              >
                <Swords className="w-5 h-5" />
                <span>Matchmaking</span>
              </button>
              {/* <button
                onClick={() => navigate("/tournaments")}
                className="text-gray-300 hover:text-white flex items-center space-x-2"
              >
                <Trophy className="w-5 h-5" />
                <span>Tournaments</span>
              </button> */}
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">
                {user?.username} -{" "}
                {(user?.role ?? "").charAt(0).toUpperCase() +
                  (user?.role ?? "").slice(1)}
                {user?.role === "player" && ` - ELO: ${user?.elo}`}
              </span>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white flex items-center space-x-2"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
