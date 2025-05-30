
import React, { useState } from 'react';
import GameDashboard from '@/components/GameDashboard';
import Planet from '@/components/Planet';
import DiscoveryNotification from '@/components/DiscoveryNotification';
import TravelAnimation from '@/components/TravelAnimation';
import { useGameState } from '@/hooks/useGameState';
import { toast } from 'sonner';

const Index = () => {
  const { gameState, planets, isLoading, travelToPlanet, explorePlanet, refuelShip } = useGameState();
  const [currentDiscovery, setCurrentDiscovery] = useState<{
    discovery: string;
    creditsEarned: number;
  } | null>(null);

  const handleTravel = (planet: any) => {
    if (gameState.credits >= planet.travelCost) {
      travelToPlanet(planet);
      toast.success(`Traveling to ${planet.name}...`);
    } else {
      toast.error('Insufficient credits for travel!');
    }
  };

  const handleExplore = (planet: any) => {
    const result = explorePlanet(planet);
    if (result.success) {
      setCurrentDiscovery({
        discovery: result.discovery,
        creditsEarned: result.creditsEarned
      });
    } else {
      toast.info('This planet has been fully explored!');
    }
  };

  const handleRefuel = (planet: any) => {
    const success = refuelShip(planet);
    if (success) {
      toast.success('Ship successfully refueled!');
    } else {
      if (gameState.fuel >= gameState.maxFuel) {
        toast.info('Fuel tank is already full!');
      } else {
        toast.error('Insufficient credits for refueling!');
      }
    }
  };

  const currentPlanetData = planets.find(p => p.id === gameState.currentPlanet);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated star background */}
      <div className="stars fixed inset-0 opacity-30" />
      
      {/* Game Dashboard */}
      <GameDashboard
        credits={gameState.credits}
        fuel={gameState.fuel}
        maxFuel={gameState.maxFuel}
        explorationsCount={gameState.totalDiscoveries}
        currentPlanet={currentPlanetData?.name || 'Unknown'}
      />

      {/* Main Game Content */}
      <div className="pt-32 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
              Galactic Explorer
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Explore the cosmos, discover new species, and manage your resources as you journey through the galaxy.
            </p>
          </div>

          {/* Planets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {planets.map((planet) => (
              <Planet
                key={planet.id}
                planet={planet}
                isCurrentLocation={gameState.currentPlanet === planet.id}
                canAffordTravel={gameState.credits >= planet.travelCost}
                onTravel={handleTravel}
                onExplore={handleExplore}
                onRefuel={handleRefuel}
                discoveries={gameState.explorations[planet.id] || 0}
                canRefuel={gameState.credits >= planet.refuelCost && gameState.fuel < gameState.maxFuel}
              />
            ))}
          </div>

          {/* Game Instructions */}
          <div className="mt-12 text-center">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-6 max-w-4xl mx-auto border border-purple-500/30">
              <h2 className="text-2xl font-bold text-white mb-4">How to Play</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">🚀 Travel</h3>
                  <p className="text-slate-300 text-sm">
                    Use credits to travel between planets. Farther planets cost more but offer greater rewards.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">🔬 Explore</h3>
                  <p className="text-slate-300 text-sm">
                    Discover unique gaese species on each planet to earn credits and exploration points.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">⛽ Fuel</h3>
                  <p className="text-slate-300 text-sm">
                    Monitor your fuel levels and refuel on planets when needed. Travel consumes fuel.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">💰 Credits</h3>
                  <p className="text-slate-300 text-sm">
                    Manage your credits wisely for travel and refueling. Discoveries earn you more credits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Discovery Notification */}
      {currentDiscovery && (
        <DiscoveryNotification
          discovery={currentDiscovery.discovery}
          creditsEarned={currentDiscovery.creditsEarned}
          onClose={() => setCurrentDiscovery(null)}
        />
      )}

      {/* Travel Animation */}
      {isLoading && <TravelAnimation />}
    </div>
  );
};

export default Index;
