import React from "react";
import { useMatchmakingStore } from "../store/matchmakingStore";
import { useAuthStore } from "../store/authStore";
import {
  Loader2,
  Swords,
  X,
  CheckCircle2,
  GamepadIcon,
  Trophy,
} from "lucide-react";
import CharacterSelect from "../components/CharacterSelect";
import LobbyChat from "../components/LobbyChat";
import { Game } from "../types/games";
import { stages } from "../data/stages";
import { MatchType } from "../types/matchmaking";

export default function Matchmaking() {
  const {
    matchState,
    matchType,
    selectedGame,
    currentMatch,
    startMatchmaking,
    selectGame,
    leaveQueue,
    toggleReady,
  } = useMatchmakingStore();
  const user = useAuthStore((state) => state.user);

  if (!matchType) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-8">
            Select Match Type
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <button
              onClick={() => startMatchmaking("ranked")}
              className="p-6 bg-purple-600/20 rounded-xl hover:bg-purple-600/30 transition-colors group"
            >
              <div className="flex flex-col items-center">
                <Trophy className="w-12 h-12 text-purple-400 mb-4 group-hover:text-purple-300" />
                <span className="text-lg font-semibold text-white">
                  Ranked Match
                </span>
                <span className="text-sm text-gray-400 mt-2">
                  Compete for ELO
                </span>
              </div>
            </button>
            <button
              onClick={() => startMatchmaking("casual")}
              className="p-6 bg-blue-600/20 rounded-xl hover:bg-blue-600/30 transition-colors group"
            >
              <div className="flex flex-col items-center">
                <GamepadIcon className="w-12 h-12 text-blue-400 mb-4 group-hover:text-blue-300" />
                <span className="text-lg font-semibold text-white">
                  Casual Match
                </span>
                <span className="text-sm text-gray-400 mt-2">
                  Practice without pressure
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (matchState === "selecting-game") {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-8">Select Game</h2>
          <div className="grid grid-cols-2 gap-6">
            <button
              onClick={() => selectGame("tekken")}
              className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-colors"
            >
              <div className="text-lg font-semibold text-white">Tekken</div>
            </button>
            <button
              onClick={() => selectGame("smash")}
              className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-colors"
            >
              <div className="text-lg font-semibold text-white">Smash</div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (matchState === "in-queue") {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Loader2 className="w-12 h-12 text-purple-400 animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Searching for opponent...
          </h2>
          <p className="text-gray-400 mb-8">
            {selectedGame?.charAt(0).toUpperCase()}
            {selectedGame?.slice(1)} - {matchType} Match
          </p>
          <button
            onClick={leaveQueue}
            className="px-6 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors inline-flex items-center"
          >
            <X className="w-5 h-5 mr-2" />
            Cancel Search
          </button>
        </div>
      </div>
    );
  }

  if (currentMatch) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Match Info */}
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Match Details
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400">Game</p>
                  <p className="text-white font-medium">
                    {currentMatch.game.charAt(0).toUpperCase()}
                    {currentMatch.game.slice(1)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Type</p>
                  <p className="text-white font-medium">
                    {currentMatch.type.charAt(0).toUpperCase()}
                    {currentMatch.type.slice(1)}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{user?.username}</p>
                    <p className="text-gray-400">ELO: {user?.elo}</p>
                  </div>
                  {currentMatch.localPlayerReady && (
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">
                      {currentMatch.opponent.username}
                    </p>
                    <p className="text-gray-400">
                      ELO: {currentMatch.opponent.elo}
                    </p>
                  </div>
                  {currentMatch.opponent.ready && (
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={toggleReady}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                currentMatch.localPlayerReady
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {currentMatch.localPlayerReady ? "Cancel Ready" : "Ready"}
            </button>
          </div>

          {/* Character Select */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden">
            <h3 className="text-xl font-semibold text-white p-4 border-b border-gray-700">
              Select Character
            </h3>
            <CharacterSelect />
          </div>

          {/* Chat */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden h-[600px]">
            <h3 className="text-xl font-semibold text-white p-4 border-b border-gray-700">
              Match Chat
            </h3>
            <LobbyChat />
          </div>
        </div>
      </div>
    );
  }

  return null;
}
