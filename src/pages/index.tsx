import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Gamepad, Users, Trophy, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4">FGC Matchmaking</h1>
          <p className="text-xl text-gray-400">
            Find your next fighting game challenge
          </p>
          <div className="mt-8">
            <Link href="/matchmaking">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Start Playing <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <Card className="p-6 bg-gray-800 border-gray-700">
            <Gamepad className="w-12 h-12 text-purple-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Multiple Games</h3>
            <p className="text-gray-400">
              Support for popular fighting games including Tekken, Street
              Fighter, and Smash Bros.
            </p>
          </Card>

          <Card className="p-6 bg-gray-800 border-gray-700">
            <Users className="w-12 h-12 text-purple-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Ranked Matchmaking</h3>
            <p className="text-gray-400">
              Find opponents at your skill level and climb the ranks
            </p>
          </Card>

          <Card className="p-6 bg-gray-800 border-gray-700">
            <Trophy className="w-12 h-12 text-purple-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Leaderboards</h3>
            <p className="text-gray-400">
              Track your progress and compete for top positions
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
