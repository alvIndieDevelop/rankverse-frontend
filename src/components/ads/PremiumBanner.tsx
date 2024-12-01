import React from "react";
import { Crown, X } from "lucide-react";

export function PremiumBanner() {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 relative">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Crown className="w-6 h-6" />
          <div>
            <p className="font-semibold">Upgrade to Premium</p>
            <p className="text-sm text-white/80">
              Remove ads and unlock exclusive features!
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-white/90 transition-colors">
            Upgrade Now
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
