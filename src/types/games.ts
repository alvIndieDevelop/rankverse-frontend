export type Game = "tekken" | "smash";

export interface Character {
  id: string;
  name: string;
  game: Game;
  image: string;
}

export interface Player {
  id: string;
  username: string;
  rank: number;
  elo: number;
  mainGame: Game;
  mainCharacter: string;
  winRate: number;
  gamesPlayed: number;
}
