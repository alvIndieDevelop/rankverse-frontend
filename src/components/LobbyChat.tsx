import React, { useState, useRef, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useMatchmakingStore } from "../store/matchmakingStore";
import { Send } from "lucide-react";

export default function LobbyChat() {
  const [message, setMessage] = useState("");
  const { user } = useAuthStore();
  const { currentMatch, sendMessage } = useMatchmakingStore();
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [currentMatch?.messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {currentMatch?.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.playerId === user?.id ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                msg.playerId === user?.id
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-100"
              }`}
            >
              <div className="text-sm opacity-75 mb-1">{msg.username}</div>
              <div>{msg.text}</div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white rounded-lg px-4 py-2 hover:bg-purple-700 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
