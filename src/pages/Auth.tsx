import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Sword, Shield } from "lucide-react";
import { Role } from "../types/tournament";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("player");
  const { login, register } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(username, password);
      } else {
        await register(username, password, role);
      }
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center space-x-2 mb-8">
          <Sword className="w-8 h-8 text-purple-400" />
          <Shield className="w-8 h-8 text-purple-400" />
        </div>
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          {isLogin ? "Welcome Back" : "Join the Arena"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
          </div>
          {!isLogin && (
            <div>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="player">Player</option>
                <option value="organizer">Tournament Organizer</option>
              </select>
            </div>
          )}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors"
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <p className="text-center mt-6 text-gray-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-400 hover:text-purple-300"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}
