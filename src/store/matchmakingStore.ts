import { create } from "zustand";
import { useAuthStore } from "./authStore";
import { calculateElo } from "../lib/utils";

interface QueuedPlayer {
  id: string;
  username: string;
  elo: number;
  timestamp: number;
  character?: string;
  ready: boolean;
}

interface Message {
  id: string;
  playerId: string;
  username: string;
  text: string;
  timestamp: number;
}

interface MatchmakingState {
  inQueue: boolean;
  currentMatch: {
    opponent: QueuedPlayer;
    startTime: number;
    messages: Message[];
    localPlayerReady: boolean;
  } | null;
  joinQueue: () => void;
  leaveQueue: () => void;
  findMatch: () => void;
  completeMatch: (outcome: "win" | "loss") => void;
  sendMessage: (text: string) => void;
  selectCharacter: (character: string) => void;
  toggleReady: () => void;
}

export const useMatchmakingStore = create<MatchmakingState>((set, get) => ({
  inQueue: false,
  currentMatch: null,
  joinQueue: () => {
    set({ inQueue: true });
    get().findMatch();
  },
  leaveQueue: () => {
    set({ inQueue: false });
  },
  findMatch: () => {
    const user = useAuthStore.getState().user;
    if (!user || !get().inQueue) return;

    setTimeout(() => {
      const opponent: QueuedPlayer = {
        id: Math.random().toString(36).substr(2, 9),
        username: `Player${Math.floor(Math.random() * 1000)}`,
        elo: user.elo + Math.floor(Math.random() * 200) - 100,
        timestamp: Date.now(),
        ready: false,
      };

      set({
        currentMatch: {
          opponent,
          startTime: Date.now(),
          messages: [],
          localPlayerReady: false,
        },
        inQueue: false,
      });
    }, Math.random() * 3000 + 2000);
  },
  completeMatch: (outcome) => {
    const user = useAuthStore.getState().user;
    const match = get().currentMatch;

    if (!user || !match) return;

    const newElo = calculateElo(user.elo, match.opponent.elo, outcome);
    useAuthStore.setState({
      user: {
        ...user,
        elo: newElo,
      },
    });

    set({ currentMatch: null });
  },
  sendMessage: (text) => {
    const user = useAuthStore.getState().user;
    const match = get().currentMatch;

    if (!user || !match) return;

    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      playerId: user.id,
      username: user.username,
      text,
      timestamp: Date.now(),
    };

    set({
      currentMatch: {
        ...match,
        messages: [...match.messages, newMessage],
      },
    });
  },
  selectCharacter: (character) => {
    const match = get().currentMatch;
    if (!match) return;

    // Simulate opponent selecting a random character after a delay
    setTimeout(() => {
      const tekkenCharacters = [
        "Jin",
        "Kazuya",
        "Paul",
        "Law",
        "King",
        "Bryan",
        "Nina",
        "Xiaoyu",
      ];
      const randomCharacter =
        tekkenCharacters[Math.floor(Math.random() * tekkenCharacters.length)];

      set({
        currentMatch: {
          ...match,
          opponent: {
            ...match.opponent,
            character: randomCharacter,
          },
        },
      });
    }, 1000);

    set({
      currentMatch: {
        ...match,
        opponent: {
          ...match.opponent,
          character: match.opponent.character,
        },
      },
    });
  },
  toggleReady: () => {
    const match = get().currentMatch;
    if (!match) return;

    const newLocalPlayerReady = !match.localPlayerReady;

    // Simulate opponent toggling ready state after a delay
    setTimeout(() => {
      const match = get().currentMatch;

      console.log(match);

      if (!match) return;

      set({
        currentMatch: {
          ...match,
          opponent: {
            ...match.opponent,
            ready: true,
          },
        },
      });
    }, 1000);

    set({
      currentMatch: {
        ...match,
        localPlayerReady: newLocalPlayerReady,
      },
    });
  },
}));
