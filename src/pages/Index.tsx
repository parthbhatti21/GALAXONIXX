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
import { LogOut, ShoppingCart } from 'lucide-react';
import ShopPanel from '@/components/ShopPanel';

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
    purchaseFuel,
    claimFreeCredits,
    canClaimFreeCredits
  } = useGameState(user?.id);
  
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [currentDiscovery, setCurrentDiscovery] = useState<{
    discovery: string;
    creditsEarned: number;
  } | null>(null);
  const [isShopOpen, setIsShopOpen] = useState(false);

  const handlePlanetSelect = (planet: PlanetData) => {
    if (planet.id === gameState.currentPlanet) {
      setSelectedPlanet(null);
      return;
    }
    setSelectedPlanet(planet);
  };

  const handleTravel = async (planet: PlanetData) => {
    if (gameState.credits >= planet.travelCost && gameState.fuel >= 20) {
      travelToPlanet(planet);
      toast.success(`Traveling to ${planet.name}...`);

      setTimeout(() => {
        const availableDiscoveries = planet.gaese.filter(
          (_, index) => !gameState.explorations[planet.id] || 
          gameState.explorations[planet.id] <= index
        );
        
        if (availableDiscoveries.length > 0) {
          const randomDiscovery = availableDiscoveries[Math.floor(Math.random() * availableDiscoveries.length)];
          const creditsEarned = Math.floor(Math.random() * 100) + 50;
          
          setCurrentDiscovery({
            discovery: randomDiscovery,
            creditsEarned
          });
        }
      }, 2000);
    } else {
      if (gameState.credits < planet.travelCost) {
        toast.error('Insufficient credits for travel!');
      }
      if (gameState.fuel < 20) {
        toast.error('Insufficient fuel for travel!');
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
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-slate-900/90 backdrop-blur-md border-b border-purple-500/30">
        {/* Left Section - Logo and Name */}
        <div className="flex items-center gap-4">
          <img 
            src="./public/planates_images/logo.png" 
            alt="Galaxonixx Logo" 
            className="h-8 w-auto"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-[length:200%_auto] animate-[gradient_8s_linear_infinite]">
            GALAXONIXX
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          <Button
            onClick={() => setIsShopOpen(!isShopOpen)}
            variant="outline"
            size="sm"
            className="bg-slate-800/80 hover:bg-slate-700 border-purple-500/30 text-white transition-all duration-200"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Store
          </Button>

          <div className="text-white/90 font-medium px-4 py-2 rounded-lg bg-slate-800/50 border border-purple-500/20">
            <span className="text-purple-400">Explorer</span> {user.user_metadata?.username || user.email?.split('@')[0] || 'Unknown'}
          </div>

          <Button
            onClick={handleSignOut}
            variant="outline"
            size="sm"
            className="bg-slate-800/80 hover:bg-slate-700 border-purple-500/30 text-white transition-all duration-200"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Game Dashboard */}
      <div className="mt-[60px]">
        <GameDashboard
          credits={gameState.credits}
          fuel={gameState.fuel}
          maxFuel={gameState.maxFuel}
          explorationsCount={gameState.totalDiscoveries}
          currentPlanet={currentPlanetData?.name || 'Unknown'}
        />
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-6rem)] mt-[5px]">
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
        <div className="w-96 p-4 bg-slate-900/50 backdrop-blur-sm border-l border-purple-500/30">
          {selectedPlanet && selectedPlanet.id !== gameState.currentPlanet ? (
            <PlanetDetails
              planet={selectedPlanet}
              onRefuel={handleRefuel}
              onPurchaseCredits={purchaseCredits}
              onPurchaseFuel={purchaseFuel}
              onClaimFreeCredits={claimFreeCredits}
              canClaimFreeCredits={canClaimFreeCredits}
              credits={gameState.credits}
              fuel={gameState.fuel}
              maxFuel={gameState.maxFuel}
              onTravel={() => handleTravel(selectedPlanet)}
            />
          ) : currentPlanetData && (
            <PlanetDetails
              planet={currentPlanetData}
              onRefuel={handleRefuel}
              onPurchaseCredits={purchaseCredits}
              onPurchaseFuel={purchaseFuel}
              onClaimFreeCredits={claimFreeCredits}
              canClaimFreeCredits={canClaimFreeCredits}
              credits={gameState.credits}
              fuel={gameState.fuel}
              maxFuel={gameState.maxFuel}
              onTravel={() => {}}
            />
          )}
        </div>
      </div>

      {/* Shop Panel */}
      {isShopOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50">
          <ShopPanel 
            onPurchaseCredits={purchaseCredits}
            onPurchaseFuel={purchaseFuel}
            currentCredits={gameState.credits}
            currentFuel={gameState.fuel}
            maxFuel={gameState.maxFuel}
            onClose={() => setIsShopOpen(false)}
            onClaimFreeCredits={claimFreeCredits}
            canClaimFreeCredits={canClaimFreeCredits}
          />
        </div>
      )}

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
