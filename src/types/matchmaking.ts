import { Game } from "./games";

export type MatchType = "ranked" | "casual";
export type MatchState =
  | "selecting-game"
  | "in-queue"
  | "character-select"
  | "stage-select"
  | "ready-check"
  | "in-match";

export interface Stage {
  id: string;
  name: string;
  game: Game;
  image: string;
}

export interface QueuedPlayer {
  id: string;
  username: string;
  elo: number;
  character?: string;
  stage?: string;
  ready: boolean;
}

export interface Message {
  id: string;
  playerId: string;
  username: string;
  text: string;
  timestamp: number;
}

export interface Match {
  id: string;
  type: MatchType;
  game: Game;
  opponent: QueuedPlayer;
  startTime: number;
  messages: Message[];
  localPlayerReady: boolean;
  selectedStage?: string;
}
