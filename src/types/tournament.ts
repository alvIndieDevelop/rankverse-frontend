export type Role = "player" | "organizer";

export interface Tournament {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  maxParticipants: number;
  currentParticipants: number;
  status: "upcoming" | "ongoing" | "completed";
  organizerId: string;
  participants: string[];
  brackets: Bracket[];
}

export interface Bracket {
  id: string;
  round: number;
  matches: Match[];
}

export interface Match {
  id: string;
  player1Id: string;
  player2Id: string;
  winnerId?: string;
  score?: {
    player1: number;
    player2: number;
  };
  status: "pending" | "completed";
}

export interface TournamentRequest {
  id: string;
  tournamentId: string;
  playerId: string;
  status: "pending" | "approved" | "rejected";
  timestamp: number;
}
