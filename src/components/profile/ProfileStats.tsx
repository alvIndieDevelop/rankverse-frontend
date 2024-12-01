import React from "react";
import { useMatchStore } from "../../store/matchStore";
import { useLeaderboardStore } from "../../store/leaderboardStore";
import { useAuthStore } from "../../store/authStore";
import { Trophy, Swords, Award } from "lucide-react";

export function ProfileStats() {
  const { matches } = useMatchStore();
  const { getPlayerRank } = useLeaderboardStore();
  const user = useAuthStore((state) => state.user);

  const stats = {
    wins: matches.filter((m) => m.result === "win").length,
    losses: matches.filter((m) => m.result === "loss").length,
    winRate: Math.round(
      (matches.filter((m) => m.result === "win").length / matches.length) * 100
    ),
    rank: user ? getPlayerRank(user.id) : 0,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-gray-400 text-sm">Win Rate</div>
          <Swords className="w-5 h-5 text-purple-400 opacity-50" />
        </div>
        <div className="text-2xl font-bold text-white">{stats.winRate}%</div>
        <div className="mt-1 flex items-center space-x-2">
          <span className="text-green-400">{stats.wins}W</span>
          <span className="text-gray-400">/</span>
          <span className="text-red-400">{stats.losses}L</span>
        </div>
      </div>
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-gray-400 text-sm">Global Rank</div>
          <Trophy className="w-5 h-5 text-purple-400 opacity-50" />
        </div>
        <div className="text-2xl font-bold text-white">#{stats.rank}</div>
        <div className="mt-1 text-sm text-gray-400">
          Top {Math.round((stats.rank / 100) * 100)}%
        </div>
      </div>
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-gray-400 text-sm">Total Matches</div>
          <Award className="w-5 h-5 text-purple-400 opacity-50" />
        </div>
        <div className="text-2xl font-bold text-white">{matches.length}</div>
        <div className="mt-1 text-sm text-gray-400">Matches Played</div>
      </div>
    </div>
  );
}
