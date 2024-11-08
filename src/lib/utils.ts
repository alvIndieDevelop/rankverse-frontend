import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateElo(
  playerRating: number,
  opponentRating: number,
  outcome: "win" | "loss"
): number {
  const K = 32; // K-factor
  const expectedScore =
    1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
  const actualScore = outcome === "win" ? 1 : 0;
  return Math.round(playerRating + K * (actualScore - expectedScore));
}
