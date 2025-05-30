
import React, { useState } from 'react';
import GameDashboard from '@/components/GameDashboard';
import SolarSystem from '@/components/SolarSystem';
import PlanetDetails from '@/components/PlanetDetails';
import DiscoveryNotification from '@/components/DiscoveryNotification';
import TravelAnimation from '@/components/TravelAnimation';
import { useGameState } from '@/hooks/useGameState';
import { PlanetData } from '@/components/Planet';
import { toast } from 'sonner';

const Index = () => {
  const { gameState, planets, isLoading, travelToPlanet, explorePlanet, refuelShip } = useGameState();
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [currentDiscovery, setCurrentDiscovery] = useState<{
    discovery: string;
    creditsEarned: number;
  } | null>(null);

  const handlePlanetSelect = (planet: PlanetData) => {
    setSelectedPlanet(planet);
    if (planet.id !== gameState.currentPlanet) {
      if (gameState.credits >= planet.travelCost) {
        travelToPlanet(planet);
        toast.success(`Traveling to ${planet.name}...`);
      } else {
        toast.error('Insufficient credits for travel!');
      }
    }
  };

  const handleExplore = (planet: PlanetData) => {
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

  const handleRefuel = (planet: PlanetData) => {
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
      {/* Game Dashboard */}
      <GameDashboard
        credits={gameState.credits}
        fuel={gameState.fuel}
        maxFuel={gameState.maxFuel}
        explorationsCount={gameState.totalDiscoveries}
        currentPlanet={currentPlanetData?.name || 'Unknown'}
      />

      {/* Main Content */}
      <div className="flex h-screen">
        {/* Solar System View */}
        <div className="flex-1">
          <SolarSystem
            planets={planets}
            currentPlanet={gameState.currentPlanet}
            onPlanetSelect={handlePlanetSelect}
            isMoving={isLoading}
          />
        </div>

        {/* Planet Details Sidebar */}
        {selectedPlanet && (
          <div className="w-80 p-4 bg-slate-900/50 backdrop-blur-sm border-l border-purple-500/30 overflow-y-auto">
            <PlanetDetails
              planet={selectedPlanet}
              discoveries={gameState.explorations[selectedPlanet.id] || 0}
              onExplore={handleExplore}
              onRefuel={handleRefuel}
              canRefuel={gameState.credits >= selectedPlanet.refuelCost && gameState.fuel < gameState.maxFuel}
            />
          </div>
        )}
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
