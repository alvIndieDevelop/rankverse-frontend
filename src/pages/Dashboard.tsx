import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Trophy, Swords, Crown } from "lucide-react";

// components
import { AdBanner } from "../components/ads/AdBanner";
import { PremiumBanner } from "../components/ads/PremiumBanner";

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  return (
    <>
      <PremiumBanner />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {user?.username}
                </h2>
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-300">Rank: {user?.elo}</span>
                </div>
              </div>
              <Crown className="w-12 h-12 text-yellow-400" />
            </div>
            <button
              onClick={() => navigate("/matchmaking")}
              className="w-full py-4 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Swords className="w-5 h-5" />
              <span>Find Match</span>
            </button>
          </div>

          <AdBanner
            slot="dashboard-sidebar"
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8"
          />

          <div className="md:col-span-2">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-4">
                Recent Matches
              </h3>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          i % 2 === 0 ? "bg-green-400" : "bg-red-400"
                        }`}
                      />
                      <span className="text-gray-300">
                        vs Player{Math.floor(Math.random() * 1000)}
                      </span>
                    </div>
                    <span
                      className={`font-semibold ${
                        i % 2 === 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {i % 2 === 0 ? "+25" : "-20"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <AdBanner
          slot="dashboard-bottom"
          className="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl p-8"
        />
      </div>
    </>
  );
}
