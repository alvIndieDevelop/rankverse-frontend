import { create } from "zustand";
import { useAuthStore } from "./authStore";
import { calculateElo } from "../lib/utils";
import { analytics } from "../lib/analytics";
import { Game } from "../types/games";
import { MatchType, MatchState, Match, Message } from "../types/matchmaking";

interface MatchmakingState {
  matchState: MatchState;
  matchType: MatchType | null;
  selectedGame: Game | null;
  currentMatch: Match | null;
  canNavigate: boolean;

  // Actions
  startMatchmaking: (type: MatchType) => void;
  selectGame: (game: Game) => void;
  joinQueue: () => void;
  leaveQueue: () => void;
  selectCharacter: (character: string) => void;
  selectStage: (stage: string) => void;
  toggleReady: () => void;
  completeMatch: (outcome: "win" | "loss") => void;
  sendMessage: (text: string) => void;
  resetMatchmaking: () => void;
}

const initialState = {
  matchState: "selecting-game" as MatchState,
  matchType: null,
  selectedGame: null,
  currentMatch: null,
  canNavigate: true,
};

export const useMatchmakingStore = create<MatchmakingState>((set, get) => ({
  ...initialState,

  startMatchmaking: (type: MatchType) => {
    set({
      matchType: type,
      matchState: "selecting-game",
      canNavigate: false,
    });
  },

  selectGame: (game: Game) => {
    set({
      selectedGame: game,
      matchState: "in-queue",
    });
    get().joinQueue();
  },

  joinQueue: () => {
    const { selectedGame, matchType } = get();
    if (!selectedGame || !matchType) return;

    const user = useAuthStore.getState().user;
    if (!user) return;

    setTimeout(() => {
      const opponent = {
        id: Math.random().toString(36).substr(2, 9),
        username: `Player${Math.floor(Math.random() * 1000)}`,
        elo: user.elo + Math.floor(Math.random() * 200) - 100,
        ready: false,
      };

      analytics.matchStarted(opponent.id, user.elo, opponent.elo);

      set({
        currentMatch: {
          id: Math.random().toString(36).substr(2, 9),
          type: matchType,
          game: selectedGame,
          opponent,
          startTime: Date.now(),
          messages: [],
          localPlayerReady: false,
        },
        matchState: "character-select",
      });
    }, Math.random() * 3000 + 2000);
  },

  leaveQueue: () => {
    set(initialState);
  },

  selectCharacter: (character: string) => {
    const match = get().currentMatch;
    if (!match) return;

    analytics.characterSelected(character);

    // Simulate opponent selecting a character
    setTimeout(() => {
      set((state) => ({
        currentMatch: state.currentMatch
          ? {
              ...state.currentMatch,
              opponent: {
                ...state.currentMatch.opponent,
                character: Math.random() > 0.5 ? character : undefined,
              },
            }
          : null,
        matchState: "stage-select",
      }));
    }, 1000);
  },

  selectStage: (stage: string) => {
    set((state) => ({
      currentMatch: state.currentMatch
        ? {
            ...state.currentMatch,
            selectedStage: stage,
          }
        : null,
      matchState: "ready-check",
    }));
  },

  toggleReady: () => {
    const match = get().currentMatch;
    if (!match) return;

    const newLocalPlayerReady = !match.localPlayerReady;

    // Simulate opponent toggling ready
    setTimeout(() => {
      set((state) => ({
        currentMatch: state.currentMatch
          ? {
              ...state.currentMatch,
              opponent: {
                ...state.currentMatch.opponent,
                ready: true,
              },
            }
          : null,
      }));
    }, 1000);

    set((state) => ({
      currentMatch: state.currentMatch
        ? {
            ...state.currentMatch,
            localPlayerReady: newLocalPlayerReady,
          }
        : null,
      matchState: newLocalPlayerReady ? "in-match" : "ready-check",
    }));
  },

  completeMatch: (outcome) => {
    const user = useAuthStore.getState().user;
    const match = get().currentMatch;

    if (!user || !match) return;

    const newElo = calculateElo(user.elo, match.opponent.elo, outcome);
    const eloChange = newElo - user.elo;

    analytics.matchCompleted(outcome, eloChange);

    useAuthStore.setState({
      user: {
        ...user,
        elo: newElo,
      },
    });

    set(initialState);
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

    set((state) => ({
      currentMatch: state.currentMatch
        ? {
            ...state.currentMatch,
            messages: [...state.currentMatch.messages, newMessage],
          }
        : null,
    }));
  },

  resetMatchmaking: () => {
    set(initialState);
  },
}));
