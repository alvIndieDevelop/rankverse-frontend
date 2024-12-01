import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useLeaderboardStore } from "../store/leaderboardStore";
import {
  Trophy,
  Medal,
  Search,
  Filter,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { cn } from "../lib/utils";
import { Game } from "../types/games";
import { characters } from "../data/characters";

export default function Leaderboard() {
  const user = useAuthStore((state) => state.user);
  const { getPlayersByGame, getPlayersByCharacter } = useLeaderboardStore();
  const [search, setSearch] = useState("");
  const [selectedGame, setSelectedGame] = useState<Game>("tekken");
  const [selectedCharacter, setSelectedCharacter] = useState<string>("");
  const [sortBy, setSortBy] = useState<"rank" | "elo" | "winRate">("rank");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const gameCharacters = characters.filter((c) => c.game === selectedGame);
  const players = selectedCharacter
    ? getPlayersByCharacter(selectedCharacter)
    : getPlayersByGame(selectedGame);

  const filteredPlayers = players
    .filter((player) =>
      player.username.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const order = sortOrder === "asc" ? 1 : -1;
      return (a[sortBy] - b[sortBy]) * order;
    });

  const handleSort = (key: "rank" | "elo" | "winRate") => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">Global Rankings</h1>
              <p className="text-gray-400">
                {selectedCharacter
                  ? `${
                      characters.find((c) => c.id === selectedCharacter)?.name
                    } Rankings`
                  : `${
                      selectedGame.charAt(0).toUpperCase() +
                      selectedGame.slice(1)
                    } Rankings`}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search players..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <select
              value={selectedGame}
              onChange={(e) => {
                setSelectedGame(e.target.value as Game);
                setSelectedCharacter("");
              }}
              className="px-4 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="tekken">Tekken</option>
              <option value="smash">Smash</option>
            </select>
            <select
              value={selectedCharacter}
              onChange={(e) => setSelectedCharacter(e.target.value)}
              className="px-4 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">All Characters</option>
              {gameCharacters.map((char) => (
                <option key={char.id} value={char.id}>
                  {char.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="pb-4 text-gray-400 font-medium">
                  <button
                    onClick={() => handleSort("rank")}
                    className="flex items-center space-x-1 hover:text-white"
                  >
                    <span>Rank</span>
                    {sortBy === "rank" &&
                      (sortOrder === "asc" ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </button>
                </th>
                <th className="pb-4 text-gray-400 font-medium">Player</th>
                <th className="pb-4 text-gray-400 font-medium">Character</th>
                <th className="pb-4 text-gray-400 font-medium">
                  <button
                    onClick={() => handleSort("elo")}
                    className="flex items-center space-x-1 hover:text-white"
                  >
                    <span>ELO</span>
                    {sortBy === "elo" &&
                      (sortOrder === "asc" ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </button>
                </th>
                <th className="pb-4 text-gray-400 font-medium">
                  <button
                    onClick={() => handleSort("winRate")}
                    className="flex items-center space-x-1 hover:text-white"
                  >
                    <span>Win Rate</span>
                    {sortBy === "winRate" &&
                      (sortOrder === "asc" ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </button>
                </th>
                <th className="pb-4 text-gray-400 font-medium">Games</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredPlayers.map((player) => (
                <tr
                  key={player.id}
                  className={cn(
                    "hover:bg-gray-800/50 transition-colors",
                    player.id === user?.id && "bg-purple-500/10"
                  )}
                >
                  <td className="py-4">
                    <div className="flex items-center space-x-2">
                      {player.rank <= 3 && (
                        <Medal
                          className={cn(
                            "w-5 h-5",
                            player.rank === 1 && "text-yellow-400",
                            player.rank === 2 && "text-gray-400",
                            player.rank === 3 && "text-amber-700"
                          )}
                        />
                      )}
                      <span
                        className={cn(
                          "font-medium",
                          player.rank <= 3 ? "text-white" : "text-gray-400"
                        )}
                      >
                        #{player.rank}
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="text-white font-medium">
                      {player.username}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className="text-gray-300">
                      {
                        characters.find((c) => c.id === player.mainCharacter)
                          ?.name
                      }
                    </span>
                  </td>
                  <td className="py-4">
                    <span className="text-white font-medium">{player.elo}</span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${player.winRate}%` }}
                        />
                      </div>
                      <span className="text-gray-400">{player.winRate}%</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="text-gray-400">{player.gamesPlayed}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
