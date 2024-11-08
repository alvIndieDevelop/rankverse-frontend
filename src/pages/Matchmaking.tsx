import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMatchmakingStore } from "../store/matchmakingStore";
import { useAuthStore } from "../store/authStore";
import { Loader2, Swords, X, CheckCircle2 } from "lucide-react";
import CharacterSelect from "../components/CharacterSelect";
import LobbyChat from "../components/LobbyChat";

export default function Matchmaking() {
  const {
    inQueue,
    currentMatch,
    joinQueue,
    leaveQueue,
    completeMatch,
    toggleReady,
  } = useMatchmakingStore();
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (inQueue) leaveQueue();
    };
  }, []);

  if (currentMatch) {
    const bothReady =
      currentMatch.localPlayerReady && currentMatch.opponent.ready;

    console.log(bothReady, currentMatch.opponent.ready);

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Player Info and Ready Status */}
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Players</h3>
              <div className="space-y-4">
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
              onClick={() => toggleReady()}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                currentMatch.localPlayerReady
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {currentMatch.localPlayerReady ? "Cancel Ready" : "Ready"}
            </button>

            {bothReady && (
              <div className="space-y-4">
                <div className="text-center text-green-400 font-semibold">
                  Both players are ready!
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => completeMatch("win")}
                    className="py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
                  >
                    Victory
                  </button>
                  <button
                    onClick={() => completeMatch("loss")}
                    className="py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
                  >
                    Defeat
                  </button>
                </div>
              </div>
            )}
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
              Lobby Chat
            </h3>
            <LobbyChat />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-2xl mx-auto text-center">
        {inQueue ? (
          <>
            <div className="flex items-center justify-center mb-6">
              <Loader2 className="w-12 h-12 text-purple-400 animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Searching for opponent...
            </h2>
            <p className="text-gray-400 mb-8">Current ELO: {user?.elo}</p>
            <button
              onClick={leaveQueue}
              className="px-6 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors inline-flex items-center"
            >
              <X className="w-5 h-5 mr-2" />
              Cancel Search
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Battle?
            </h2>
            <p className="text-gray-400 mb-8">Click below to find a match</p>
            <button
              onClick={joinQueue}
              className="px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors inline-flex items-center"
            >
              <Swords className="w-5 h-5 mr-2" />
              Find Match
            </button>
          </>
        )}
      </div>
    </div>
  );
}
