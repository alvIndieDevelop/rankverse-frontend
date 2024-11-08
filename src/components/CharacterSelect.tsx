import React from "react";
import { useMatchmakingStore } from "../store/matchmakingStore";

const characters = [
  {
    id: "jin",
    name: "Jin Kazama",
    image:
      "https://images.unsplash.com/photo-1614583225154-5fcdda07019e?w=150&h=150&fit=crop",
  },
  {
    id: "kazuya",
    name: "Kazuya Mishima",
    image:
      "https://images.unsplash.com/photo-1614583225154-5fcdda07019e?w=150&h=150&fit=crop",
  },
  {
    id: "paul",
    name: "Paul Phoenix",
    image:
      "https://images.unsplash.com/photo-1614583225154-5fcdda07019e?w=150&h=150&fit=crop",
  },
  {
    id: "law",
    name: "Marshall Law",
    image:
      "https://images.unsplash.com/photo-1614583225154-5fcdda07019e?w=150&h=150&fit=crop",
  },
  {
    id: "king",
    name: "King",
    image:
      "https://images.unsplash.com/photo-1614583225154-5fcdda07019e?w=150&h=150&fit=crop",
  },
  {
    id: "bryan",
    name: "Bryan Fury",
    image:
      "https://images.unsplash.com/photo-1614583225154-5fcdda07019e?w=150&h=150&fit=crop",
  },
];

export default function CharacterSelect() {
  const { currentMatch, selectCharacter } = useMatchmakingStore();

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {characters.map((character) => (
        <button
          key={character.id}
          onClick={() => selectCharacter(character.name)}
          className={`relative group overflow-hidden rounded-lg transition-transform hover:scale-105 ${
            currentMatch?.opponent.character === character.name
              ? "ring-2 ring-purple-500"
              : ""
          }`}
        >
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-40 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-2">
            <span className="text-white font-semibold">{character.name}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
