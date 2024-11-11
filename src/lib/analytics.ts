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
    window.gtag("event", "match_started", {
      opponent_id: opponentId,
      player_elo: playerElo,
      opponent_elo: opponentElo,
    });
  },

  matchCompleted: (result: "win" | "loss", eloChange: number) => {
    window.gtag("event", "match_completed", {
      match_result: result,
      elo_change: eloChange,
    });
  },

  tournamentJoined: (tournamentId: string, tournamentName: string) => {
    window.gtag("event", "tournament_joined", {
      tournament_id: tournamentId,
      tournament_name: tournamentName,
    });
  },

  tournamentCreated: (tournamentId: string, maxParticipants: number) => {
    window.gtag("event", "tournament_created", {
      tournament_id: tournamentId,
      max_participants: maxParticipants,
    });
  },

  characterSelected: (characterName: string) => {
    window.gtag("event", "character_selected", {
      character_name: characterName,
    });
  },

  customEvent: (eventName: string, params: EventParams) => {
    window.gtag("event", eventName, params);
  },
};
