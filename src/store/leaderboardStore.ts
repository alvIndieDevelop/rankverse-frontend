import { create } from "zustand";
import { Game, Player } from "../types/games";
import { characters } from "../data/characters";

interface LeaderboardState {
  players: Player[];
  getPlayersByGame: (game: Game) => Player[];
  getPlayersByCharacter: (characterId: string) => Player[];
  getPlayerRank: (playerId: string) => number;
}

// Generate some sample players
const generatePlayers = (): Player[] => {
  const games: Game[] = ["tekken", "smash"];
  return Array.from({ length: 100 }, (_, i): Player => {
    const mainGame = games[Math.floor(Math.random() * games.length)];
    const gameCharacters = characters.filter((c) => c.game === mainGame);
    const mainCharacter =
      gameCharacters[Math.floor(Math.random() * gameCharacters.length)].id;

    return {
      id: `player${i + 1}`,
      username: `Player${i + 1}`,
      rank: i + 1,
      elo: 2000 - Math.floor(Math.random() * 800),
      mainGame,
      mainCharacter,
      winRate: Math.floor(Math.random() * 40 + 40),
      gamesPlayed: Math.floor(Math.random() * 200 + 50),
    };
  }).sort((a, b) => b.elo - a.elo);
};

export const useLeaderboardStore = create<LeaderboardState>((set, get) => ({
  players: generatePlayers(),

  getPlayersByGame: (game: Game) => {
    return get()
      .players.filter((player) => player.mainGame === game)
      .sort((a, b) => b.elo - a.elo)
      .map((player, index) => ({ ...player, rank: index + 1 }));
  },

  getPlayersByCharacter: (characterId: string) => {
    return get()
      .players.filter((player) => player.mainCharacter === characterId)
      .sort((a, b) => b.elo - a.elo)
      .map((player, index) => ({ ...player, rank: index + 1 }));
  },

  getPlayerRank: (playerId: string) => {
    const player = get().players.find((p) => p.id === playerId);
    if (!player) return -1;

    const gameRank =
      get()
        .getPlayersByGame(player.mainGame)
        .findIndex((p) => p.id === playerId) + 1;

    return gameRank;
  },
}));
