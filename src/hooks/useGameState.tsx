
import { useState, useCallback } from 'react';
import { PlanetData } from '@/components/Planet';

export interface GameState {
  credits: number;
  fuel: number;
  maxFuel: number;
  currentPlanet: string;
  explorations: Record<string, number>;
  totalDiscoveries: number;
}

const PLANETS: PlanetData[] = [
  {
    id: 'earth',
    name: 'Earth',
    description: 'The blue planet, home to humanity and diverse ecosystems.',
    travelCost: 0,
    refuelCost: 30,
    maxDiscoveries: 5,
    color: 'bg-blue-500',
    gradient: 'bg-gradient-to-br from-blue-400 to-green-500',
    environment: 'Terrestrial with oceans',
    gaese: ['Humans', 'Dolphins', 'Eagles', 'Tigers', 'Coral']
  },
  {
    id: 'mars',
    name: 'Mars',
    description: 'The red planet with ancient riverbeds and polar ice caps.',
    travelCost: 200,
    refuelCost: 40,
    maxDiscoveries: 8,
    color: 'bg-red-500',
    gradient: 'bg-gradient-to-br from-red-500 to-orange-600',
    environment: 'Desert with ice caps',
    gaese: ['Martian Bacteria', 'Cave Crystals', 'Dust Devils', 'Ice Worms', 'Rock Lichens', 'Subsurface Microbes', 'Mineral Formations', 'Frozen Organics']
  },
  {
    id: 'europa',
    name: 'Europa',
    description: 'Jupiter\'s icy moon with a subsurface ocean beneath its frozen shell.',
    travelCost: 500,
    refuelCost: 60,
    maxDiscoveries: 12,
    color: 'bg-cyan-400',
    gradient: 'bg-gradient-to-br from-cyan-300 to-blue-600',
    environment: 'Icy surface with subsurface ocean',
    gaese: ['Hydrothermal Tube Worms', 'Bioluminescent Plankton', 'Ice Crystals', 'Deep Sea Jellies', 'Thermal Vent Bacteria', 'Cryophilic Algae', 'Pressure-adapted Fish', 'Frozen Methane Deposits', 'Mineral Precipitates', 'Sub-ice Corals', 'Chemosynthetic Organisms', 'Ice-boring Microbes']
  },
  {
    id: 'titan',
    name: 'Titan',
    description: 'Saturn\'s largest moon with thick atmosphere and methane lakes.',
    travelCost: 750,
    refuelCost: 80,
    maxDiscoveries: 15,
    color: 'bg-amber-600',
    gradient: 'bg-gradient-to-br from-amber-500 to-orange-700',
    environment: 'Methane lakes and thick atmosphere',
    gaese: ['Methane-based Organisms', 'Atmospheric Floaters', 'Hydrocarbon Crystals', 'Lake Swimmers', 'Nitrogen Fixers', 'Organic Polymers', 'Cryogenic Bacteria', 'Ethane Ice', 'Atmospheric Symbionts', 'Tholin Particles', 'Gas-phase Microbes', 'Liquid Nitrogen Pools', 'Methane Geysers', 'Organic Aerosols', 'Complex Hydrocarbons']
  },
  {
    id: 'proxima-b',
    name: 'Proxima Centauri b',
    description: 'An exoplanet in the habitable zone of the nearest star to our solar system.',
    travelCost: 1500,
    refuelCost: 120,
    maxDiscoveries: 20,
    color: 'bg-purple-600',
    gradient: 'bg-gradient-to-br from-purple-500 to-pink-600',
    environment: 'Tidally locked with extreme contrasts',
    gaese: ['Twilight Zone Dwellers', 'Heat-resistant Extremophiles', 'Stellar Wind Organisms', 'Magnetic Field Shapers', 'Aurora Feeders', 'Temperature Gradient Lifeforms', 'Red Dwarf Adapted Species', 'Plasma Clouds', 'Radiation-immune Bacteria', 'Gravitational Anomaly Creatures', 'Solar Flare Surfers', 'Photosynthetic Variants', 'Metallic Organisms', 'Quantum Entangled Pairs', 'Dark Side Ice Beings', 'Light Side Plasma Forms', 'Atmospheric Rivers', 'Magnetic Storm Entities', 'Time-dilation Adapted Life', 'Exo-geological Formations']
  }
];

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    credits: 1000,
    fuel: 100,
    maxFuel: 100,
    currentPlanet: 'earth',
    explorations: {},
    totalDiscoveries: 0
  });

  const [isLoading, setIsLoading] = useState(false);

  const travelToPlanet = useCallback((planet: PlanetData) => {
    setIsLoading(true);
    
    // Simulate travel time
    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        credits: prev.credits - planet.travelCost,
        fuel: Math.max(0, prev.fuel - 20), // Travel consumes fuel
        currentPlanet: planet.id
      }));
      setIsLoading(false);
    }, 2000);
  }, []);

  const explorePlanet = useCallback((planet: PlanetData) => {
    const currentExplorations = gameState.explorations[planet.id] || 0;
    
    if (currentExplorations < planet.maxDiscoveries) {
      const creditsEarned = Math.floor(Math.random() * 100) + 50; // 50-149 credits per discovery
      
      setGameState(prev => ({
        ...prev,
        credits: prev.credits + creditsEarned,
        explorations: {
          ...prev.explorations,
          [planet.id]: currentExplorations + 1
        },
        totalDiscoveries: prev.totalDiscoveries + 1
      }));

      return {
        success: true,
        creditsEarned,
        discovery: planet.gaese[currentExplorations] || 'Unknown Species'
      };
    }
    
    return { success: false, creditsEarned: 0, discovery: '' };
  }, [gameState.explorations]);

  const refuelShip = useCallback((planet: PlanetData) => {
    if (gameState.credits >= planet.refuelCost && gameState.fuel < gameState.maxFuel) {
      setGameState(prev => ({
        ...prev,
        credits: prev.credits - planet.refuelCost,
        fuel: prev.maxFuel
      }));
      return true;
    }
    return false;
  }, [gameState.credits, gameState.fuel, gameState.maxFuel]);

  return {
    gameState,
    planets: PLANETS,
    isLoading,
    travelToPlanet,
    explorePlanet,
    refuelShip
  };
};
