import React from "react";
import { useAuthStore } from "../store/authStore";
import { ProfileHeader } from "../components/profile/ProfileHeader";
import { ProfileStats } from "../components/profile/ProfileStats";
import { MatchHistory } from "../components/profile/MatchHistory";

export default function Profile() {
  const { user } = useAuthStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <ProfileHeader user={user} />
        <ProfileStats />
        <MatchHistory />
      </div>
    </div>
  );
}
