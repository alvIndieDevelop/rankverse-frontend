import { Game } from "./games";

export interface Match {
  id: string;
  playerId: string;
  opponentId: string;
  opponentName: string;
  game: Game;
  character: string;
  result: "win" | "loss";
  eloChange: number;
  date: string;
}
