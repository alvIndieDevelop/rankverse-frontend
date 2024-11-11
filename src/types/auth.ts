export type Role = "player" | "organizer";

export interface User {
  id: string;
  username: string;
  elo: number;
  role: Role;
}
