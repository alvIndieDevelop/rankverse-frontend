import React, { useState } from "react";
import { Shield, Trophy, Swords, Settings, Edit2, Camera } from "lucide-react";
import { User } from "../../types/auth";

interface ProfileHeaderProps {
  user: User | null;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: user?.username || "",
    bio: "Professional fighting game player",
    region: "North America",
    mainCharacter: "Jin Kazama",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // Handle profile update logic here
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
      <div className="flex items-start gap-6">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <button className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="w-4 h-4" />
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="flex-1 space-y-4">
            <input
              type="text"
              value={editForm.username}
              onChange={(e) =>
                setEditForm({ ...editForm, username: e.target.value })
              }
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
            />
            <textarea
              value={editForm.bio}
              onChange={(e) =>
                setEditForm({ ...editForm, bio: e.target.value })
              }
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              rows={3}
            />
            <div className="flex gap-4">
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold text-white">
                {user?.username}
              </h1>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <Edit2 className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-400 mb-4">{editForm.bio}</p>
            <div className="flex items-center gap-4 text-gray-400">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                <span>Rank {user?.elo}</span>
              </div>
              <div className="flex items-center gap-2">
                <Swords className="w-4 h-4" />
                <span>{editForm.mainCharacter}</span>
              </div>
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span>{editForm.region}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
