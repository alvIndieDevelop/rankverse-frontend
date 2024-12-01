import React, { useState } from "react";
import { useMatchStore } from "../../store/matchStore";
import { Game } from "../../types/games";
import { characters } from "../../data/characters";
import { cn } from "../../lib/utils";

export function MatchHistory() {
  const [selectedGame, setSelectedGame] = useState<Game | "all">("all");
  const [selectedCharacter, setSelectedCharacter] = useState<string>("all");
  const { getAllMatches, getMatchesByGame, getMatchesByCharacter } =
    useMatchStore();

  const gameCharacters =
    selectedGame !== "all"
      ? characters.filter((c) => c.game === selectedGame)
      : characters;

  const matches =
    selectedGame === "all"
      ? selectedCharacter === "all"
        ? getAllMatches()
        : getMatchesByCharacter(selectedCharacter)
      : selectedCharacter === "all"
      ? getMatchesByGame(selectedGame)
      : getMatchesByCharacter(selectedCharacter);

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Match History</h2>
        <div className="flex space-x-4">
          <select
            value={selectedGame}
            onChange={(e) => {
              setSelectedGame(e.target.value as Game | "all");
              setSelectedCharacter("all");
            }}
            className="bg-gray-800 text-white rounded-lg px-3 py-1"
          >
            <option value="all">All Games</option>
            <option value="tekken">Tekken</option>
            <option value="smash">Smash</option>
          </select>
          <select
            value={selectedCharacter}
            onChange={(e) => setSelectedCharacter(e.target.value)}
            className="bg-gray-800 text-white rounded-lg px-3 py-1"
          >
            <option value="all">All Characters</option>
            {gameCharacters.map((char) => (
              <option key={char.id} value={char.id}>
                {char.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {matches.map((match) => (
          <div
            key={match.id}
            className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "w-2 h-2 rounded-full",
                  match.result === "win" ? "bg-green-400" : "bg-red-400"
                )}
              />
              <div>
                <div className="text-white">vs {match.opponentName}</div>
                <div className="text-sm text-gray-400">
                  {characters.find((c) => c.id === match.character)?.name}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={cn(
                  "font-medium",
                  match.result === "win" ? "text-green-400" : "text-red-400"
                )}
              >
                {match.eloChange > 0 ? "+" : ""}
                {match.eloChange}
              </span>
              <span className="text-gray-400">
                {new Date(match.date).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
