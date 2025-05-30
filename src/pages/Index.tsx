
import React, { useState } from 'react';
import GameDashboard from '@/components/GameDashboard';
import SolarSystem from '@/components/SolarSystem';
import PlanetDetails from '@/components/PlanetDetails';
import DiscoveryNotification from '@/components/DiscoveryNotification';
import TravelAnimation from '@/components/TravelAnimation';
import Auth from '@/components/Auth';
import { useAuth } from '@/hooks/useAuth';
import { useGameState } from '@/hooks/useGameState';
import { PlanetData } from '@/components/Planet';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const Index = () => {
  const { user, loading, signOut } = useAuth();
  const { 
    gameState, 
    planets, 
    isLoading, 
    travelToPlanet, 
    explorePlanet, 
    refuelShip,
    purchaseCredits,
    purchaseFuel
  } = useGameState(user?.id);
  
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

  const handleExplore = async (planet: PlanetData) => {
    const result = await explorePlanet(planet);
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

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Auth onAuthSuccess={() => {}} />;
  }

  const currentPlanetData = planets.find(p => p.id === gameState.currentPlanet);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Sign out button */}
      <Button
        onClick={handleSignOut}
        variant="outline"
        size="sm"
        className="absolute top-4 right-4 z-50 bg-slate-800/80 backdrop-blur-sm border-slate-600 text-white hover:bg-slate-700"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </Button>

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
          <div className="w-96 p-4 bg-slate-900/50 backdrop-blur-sm border-l border-purple-500/30">
            <PlanetDetails
              planet={selectedPlanet}
              discoveries={gameState.explorations[selectedPlanet.id] || 0}
              onExplore={handleExplore}
              onRefuel={handleRefuel}
              onPurchaseCredits={purchaseCredits}
              onPurchaseFuel={purchaseFuel}
              canRefuel={gameState.credits >= selectedPlanet.refuelCost && gameState.fuel < gameState.maxFuel}
              currentCredits={gameState.credits}
              currentFuel={gameState.fuel}
              maxFuel={gameState.maxFuel}
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
