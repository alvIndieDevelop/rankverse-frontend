import { create } from "zustand";
import { Match } from "../types/match";
import { Game } from "../types/games";
import { characters } from "../data/characters";

interface MatchState {
  matches: Match[];
  getMatchesByGame: (game: Game) => Match[];
  getMatchesByCharacter: (characterId: string) => Match[];
  getAllMatches: () => Match[];
  getTotalMatches: () => number;
}

// Generate sample matches
const generateMatches = (): Match[] => {
  const games: Game[] = ["tekken", "smash"];
  return Array.from({ length: 50 }, (_, i): Match => {
    const game = games[Math.floor(Math.random() * games.length)];
    const gameCharacters = characters.filter((c) => c.game === game);
    const character =
      gameCharacters[Math.floor(Math.random() * gameCharacters.length)].id;

    return {
      id: `match${i + 1}`,
      playerId: "player1",
      opponentId: `opponent${i + 1}`,
      opponentName: `Player${Math.floor(Math.random() * 1000)}`,
      game,
      character,
      result: Math.random() > 0.5 ? "win" : "loss",
      eloChange:
        Math.floor(Math.random() * 30) * (Math.random() > 0.5 ? 1 : -1),
      date: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const useMatchStore = create<MatchState>((set, get) => ({
  matches: generateMatches(),

  getMatchesByGame: (game: Game) => {
    return get().matches.filter((match) => match.game === game);
  },

  getMatchesByCharacter: (characterId: string) => {
    return get().matches.filter((match) => match.character === characterId);
  },

  getAllMatches: () => {
    return get().matches;
  },

  getTotalMatches: () => {
    return get().matches.length;
  },
}));
