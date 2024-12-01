import React from "react";
import { Info } from "lucide-react";

interface AdBannerProps {
  slot: string;
  className?: string;
}

export function AdBanner({ slot, className = "" }: AdBannerProps) {
  React.useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div className="absolute top-0 right-0 p-1">
        <div className="text-xs text-gray-400 flex items-center gap-1">
          <Info className="w-3 h-3" />
          <span>Advertisement</span>
        </div>
      </div>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXX" // Replace with your AdSense publisher ID
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
