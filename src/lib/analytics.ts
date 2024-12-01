// Define gtag function type
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

interface EventParams {
  [key: string]: string | number | boolean;
}

export const analytics = {
  pageView: (page: string) => {
    if (typeof window.gtag !== "function") {
      console.error("Google Analytics no está cargado correctamente.");
      return;
    }

    window.gtag("event", "page_view", {
      page_title: page,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  },

  matchStarted: (
    opponentId: string,
    playerElo: number,
    opponentElo: number
  ) => {
    if (typeof window.gtag !== "function") {
      console.error("Google Analytics no está cargado correctamente.");
      return;
    }

    window.gtag("event", "match_started", {
      opponent_id: opponentId,
      player_elo: playerElo,
      opponent_elo: opponentElo,
    });
  },

  matchCompleted: (result: "win" | "loss", eloChange: number) => {
    if (typeof window.gtag !== "function") {
      console.error("Google Analytics no está cargado correctamente.");
      return;
    }
    window.gtag("event", "match_completed", {
      match_result: result,
      elo_change: eloChange,
    });
  },

  tournamentJoined: (tournamentId: string, tournamentName: string) => {
    if (typeof window.gtag !== "function") {
      console.error("Google Analytics no está cargado correctamente.");
      return;
    }
    window.gtag("event", "tournament_joined", {
      tournament_id: tournamentId,
      tournament_name: tournamentName,
    });
  },

  tournamentCreated: (tournamentId: string, maxParticipants: number) => {
    if (typeof window.gtag !== "function") {
      console.error("Google Analytics no está cargado correctamente.");
      return;
    }
    window.gtag("event", "tournament_created", {
      tournament_id: tournamentId,
      max_participants: maxParticipants,
    });
  },

  characterSelected: (characterName: string) => {
    if (typeof window.gtag !== "function") {
      console.error("Google Analytics no está cargado correctamente.");
      return;
    }
    window.gtag("event", "character_selected", {
      character_name: characterName,
    });
  },

  customEvent: (eventName: string, params: EventParams) => {
    if (typeof window.gtag !== "function") {
      console.error("Google Analytics no está cargado correctamente.");
      return;
    }
    window.gtag("event", eventName, params);
  },
};
