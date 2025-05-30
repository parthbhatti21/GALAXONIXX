
import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PlanetData } from '@/components/Planet';
import { toast } from 'sonner';

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
    id: 'mercury',
    name: 'Mercury',
    description: 'The smallest planet and closest to the Sun with extreme temperature variations.',
    travelCost: 150,
    refuelCost: 25,
    maxDiscoveries: 3,
    color: 'bg-gray-500',
    gradient: 'bg-gradient-to-br from-gray-400 to-gray-600',
    environment: 'Rocky with no atmosphere',
    gaese: ['Iron Core', 'Silicate Minerals', 'Frozen Water Ice'],
    moons: []
  },
  {
    id: 'venus',
    name: 'Venus',
    description: 'The hottest planet with a thick, toxic atmosphere and surface pressure 90 times that of Earth.',
    travelCost: 180,
    refuelCost: 35,
    maxDiscoveries: 4,
    color: 'bg-yellow-600',
    gradient: 'bg-gradient-to-br from-yellow-500 to-orange-600',
    environment: 'Thick toxic atmosphere',
    gaese: ['Sulfuric Acid Clouds', 'Carbon Dioxide', 'Heat-resistant Minerals', 'Volcanic Glass'],
    moons: []
  },
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
    gaese: ['Humans', 'Dolphins', 'Eagles', 'Tigers', 'Coral'],
    moons: [
      {
        id: 'moon',
        name: 'Moon',
        description: 'Earth\'s only natural satellite',
        color: 'bg-gray-300',
        gradient: 'bg-gradient-to-br from-gray-200 to-gray-400'
      }
    ]
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
    gaese: ['Martian Bacteria', 'Cave Crystals', 'Dust Devils', 'Ice Worms', 'Rock Lichens', 'Subsurface Microbes', 'Mineral Formations', 'Frozen Organics'],
    moons: [
      {
        id: 'phobos',
        name: 'Phobos',
        description: 'The larger and closer moon of Mars',
        color: 'bg-red-800',
        gradient: 'bg-gradient-to-br from-red-700 to-red-900'
      },
      {
        id: 'deimos',
        name: 'Deimos',
        description: 'The smaller and more distant moon of Mars',
        color: 'bg-red-700',
        gradient: 'bg-gradient-to-br from-red-600 to-red-800'
      }
    ]
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    description: 'The largest planet in our solar system, a gas giant with a Great Red Spot.',
    travelCost: 400,
    refuelCost: 70,
    maxDiscoveries: 15,
    color: 'bg-orange-500',
    gradient: 'bg-gradient-to-br from-orange-400 to-red-600',
    environment: 'Gas giant with storms',
    gaese: ['Gas Dwellers', 'Storm Riders', 'Atmospheric Jellies', 'Hydrogen Crystals', 'Pressure Adapted Life', 'Magnetic Field Entities', 'Cloud Cities Microbes', 'Lightning Bacteria', 'Helium Swimmers', 'Great Red Spot Organisms', 'Radiation Resistant Species', 'Metallic Hydrogen Formations', 'Gravitational Anomalies', 'Aurora Particles', 'Cyclonic Life Forms'],
    moons: [
      {
        id: 'io',
        name: 'Io',
        description: 'The most volcanically active body in the solar system',
        color: 'bg-yellow-500',
        gradient: 'bg-gradient-to-br from-yellow-400 to-orange-500'
      },
      {
        id: 'europa',
        name: 'Europa',
        description: 'Jupiter\'s icy moon with a subsurface ocean',
        color: 'bg-cyan-400',
        gradient: 'bg-gradient-to-br from-cyan-300 to-blue-600'
      },
      {
        id: 'ganymede',
        name: 'Ganymede',
        description: 'The largest moon in the solar system',
        color: 'bg-gray-500',
        gradient: 'bg-gradient-to-br from-gray-400 to-gray-600'
      },
      {
        id: 'callisto',
        name: 'Callisto',
        description: 'The most heavily cratered object in the solar system',
        color: 'bg-gray-600',
        gradient: 'bg-gradient-to-br from-gray-500 to-gray-700'
      }
    ]
  },
  {
    id: 'saturn',
    name: 'Saturn',
    description: 'The ringed planet, famous for its spectacular ring system.',
    travelCost: 600,
    refuelCost: 90,
    maxDiscoveries: 18,
    color: 'bg-yellow-400',
    gradient: 'bg-gradient-to-br from-yellow-300 to-amber-600',
    environment: 'Gas giant with rings',
    gaese: ['Ring Particles', 'Hexagonal Storm Dwellers', 'Methane Rain Creatures', 'Ring Shepherd Organisms', 'Atmospheric Diamonds', 'Ice Crystal Life', 'Magnetic Resonance Entities', 'Seasonal Migrants', 'Polar Aurora Beings', 'Ring Spokes Phenomena', 'Cassini Division Inhabitants', 'Density Wave Riders', 'Shepherd Moon Colonies', 'Hydrocarbon Lakes Life', 'Enceladus Geysers', 'Titan Atmosphere Floaters', 'Ring Material Processors', 'Gravitational Harmonics'],
    moons: [
      {
        id: 'titan',
        name: 'Titan',
        description: 'Saturn\'s largest moon with thick atmosphere and methane lakes',
        color: 'bg-amber-600',
        gradient: 'bg-gradient-to-br from-amber-500 to-orange-700'
      },
      {
        id: 'enceladus',
        name: 'Enceladus',
        description: 'An icy moon with geysers of water vapor',
        color: 'bg-blue-200',
        gradient: 'bg-gradient-to-br from-blue-100 to-blue-300'
      },
      {
        id: 'mimas',
        name: 'Mimas',
        description: 'Known for its large crater Herschel',
        color: 'bg-gray-400',
        gradient: 'bg-gradient-to-br from-gray-300 to-gray-500'
      }
    ]
  },
  {
    id: 'uranus',
    name: 'Uranus',
    description: 'An ice giant that rotates on its side, with a unique tilted magnetic field.',
    travelCost: 800,
    refuelCost: 110,
    maxDiscoveries: 12,
    color: 'bg-cyan-500',
    gradient: 'bg-gradient-to-br from-cyan-400 to-blue-600',
    environment: 'Ice giant with methane atmosphere',
    gaese: ['Methane Ice Crystals', 'Tilted Magnetic Field Entities', 'Sideways Rotation Adapters', 'Diamond Rain Phenomena', 'Extreme Pressure Life', 'Ice Giant Core Dwellers', 'Helium-Hydrogen Mixers', 'Retrograde Moon Organisms', 'Ring System Inhabitants', 'Polar Night Survivors', 'Magnetosphere Anomalies', 'Seasonal Extreme Adapters'],
    moons: [
      {
        id: 'miranda',
        name: 'Miranda',
        description: 'A small moon with extreme geological features',
        color: 'bg-gray-500',
        gradient: 'bg-gradient-to-br from-gray-400 to-gray-600'
      },
      {
        id: 'ariel',
        name: 'Ariel',
        description: 'The brightest of Uranus\'s moons',
        color: 'bg-blue-300',
        gradient: 'bg-gradient-to-br from-blue-200 to-blue-400'
      },
      {
        id: 'umbriel',
        name: 'Umbriel',
        description: 'The darkest of Uranus\'s major moons',
        color: 'bg-gray-700',
        gradient: 'bg-gradient-to-br from-gray-600 to-gray-800'
      },
      {
        id: 'titania',
        name: 'Titania',
        description: 'The largest moon of Uranus',
        color: 'bg-cyan-600',
        gradient: 'bg-gradient-to-br from-cyan-500 to-cyan-700'
      },
      {
        id: 'oberon',
        name: 'Oberon',
        description: 'The second-largest moon of Uranus',
        color: 'bg-cyan-700',
        gradient: 'bg-gradient-to-br from-cyan-600 to-cyan-800'
      }
    ]
  },
  {
    id: 'neptune',
    name: 'Neptune',
    description: 'The windiest planet with supersonic winds and a deep blue color from methane.',
    travelCost: 1000,
    refuelCost: 130,
    maxDiscoveries: 14,
    color: 'bg-blue-600',
    gradient: 'bg-gradient-to-br from-blue-500 to-indigo-700',
    environment: 'Ice giant with supersonic winds',
    gaese: ['Supersonic Wind Riders', 'Deep Blue Methane Clouds', 'Great Dark Spot Entities', 'Triton Retrograde Organisms', 'Extreme Wind Pressure Life', 'Ice Giant Deep Core', 'Magnetic Field Anomalies', 'Seasonal Storm Survivors', 'Hydrocarbon Compound Mixers', 'Nitrogen Geysers Life', 'Orbital Resonance Beings', 'Kuiper Belt Visitors', 'Solar Wind Interactions', 'Radio Wave Phenomena'],
    moons: [
      {
        id: 'triton',
        name: 'Triton',
        description: 'Neptune\'s largest moon with nitrogen geysers',
        color: 'bg-blue-300',
        gradient: 'bg-gradient-to-br from-blue-200 to-blue-400'
      },
      {
        id: 'nereid',
        name: 'Nereid',
        description: 'An irregular moon with a highly eccentric orbit',
        color: 'bg-gray-400',
        gradient: 'bg-gradient-to-br from-gray-300 to-gray-500'
      }
    ]
  }
];

export const useGameState = (userId: string | undefined) => {
  const [gameState, setGameState] = useState<GameState>({
    credits: 1000,
    fuel: 100,
    maxFuel: 100,
    currentPlanet: 'earth',
    explorations: {},
    totalDiscoveries: 0
  });

  const [isLoading, setIsLoading] = useState(false);

  // Load game state from Supabase
  useEffect(() => {
    if (!userId) return;

    const loadGameState = async () => {
      try {
        // Load game state
        const { data: gameStateData, error: gameStateError } = await supabase
          .from('game_states')
          .select('*')
          .eq('user_id', userId)
          .single();

        if (gameStateError && gameStateError.code !== 'PGRST116') {
          console.error('Error loading game state:', gameStateError);
          return;
        }

        // Load explorations
        const { data: explorationsData, error: explorationsError } = await supabase
          .from('explorations')
          .select('*')
          .eq('user_id', userId);

        if (explorationsError) {
          console.error('Error loading explorations:', explorationsError);
          return;
        }

        // Convert explorations array to object
        const explorationsObj: Record<string, number> = {};
        explorationsData?.forEach(exp => {
          explorationsObj[exp.planet_id] = exp.discoveries_count;
        });

        if (gameStateData) {
          setGameState({
            credits: gameStateData.credits,
            fuel: gameStateData.fuel,
            maxFuel: gameStateData.max_fuel,
            currentPlanet: gameStateData.current_planet,
            explorations: explorationsObj,
            totalDiscoveries: gameStateData.total_discoveries
          });
        }
      } catch (error) {
        console.error('Error loading game data:', error);
      }
    };

    loadGameState();
  }, [userId]);

  // Save game state to Supabase
  const saveGameState = useCallback(async (newState: GameState) => {
    if (!userId) return;

    try {
      await supabase
        .from('game_states')
        .upsert({
          user_id: userId,
          credits: newState.credits,
          fuel: newState.fuel,
          max_fuel: newState.maxFuel,
          current_planet: newState.currentPlanet,
          total_discoveries: newState.totalDiscoveries,
          updated_at: new Date().toISOString()
        });
    } catch (error) {
      console.error('Error saving game state:', error);
    }
  }, [userId]);

  const travelToPlanet = useCallback((planet: PlanetData) => {
    setIsLoading(true);
    
    setTimeout(() => {
      const newState = {
        ...gameState,
        credits: gameState.credits - planet.travelCost,
        fuel: Math.max(0, gameState.fuel - 20),
        currentPlanet: planet.id
      };
      setGameState(newState);
      saveGameState(newState);
      setIsLoading(false);
    }, 2000);
  }, [gameState, saveGameState]);

  const explorePlanet = useCallback(async (planet: PlanetData) => {
    if (!userId) return { success: false, creditsEarned: 0, discovery: '' };

    const currentExplorations = gameState.explorations[planet.id] || 0;
    
    if (currentExplorations < planet.maxDiscoveries) {
      const creditsEarned = Math.floor(Math.random() * 100) + 50;
      
      const newState = {
        ...gameState,
        credits: gameState.credits + creditsEarned,
        explorations: {
          ...gameState.explorations,
          [planet.id]: currentExplorations + 1
        },
        totalDiscoveries: gameState.totalDiscoveries + 1
      };

      setGameState(newState);
      saveGameState(newState);

      // Save exploration to database
      try {
        await supabase
          .from('explorations')
          .upsert({
            user_id: userId,
            planet_id: planet.id,
            discoveries_count: currentExplorations + 1,
            updated_at: new Date().toISOString()
          });
      } catch (error) {
        console.error('Error saving exploration:', error);
      }

      return {
        success: true,
        creditsEarned,
        discovery: planet.gaese[currentExplorations] || 'Unknown Species'
      };
    }
    
    return { success: false, creditsEarned: 0, discovery: '' };
  }, [gameState, userId, saveGameState]);

  const refuelShip = useCallback((planet: PlanetData) => {
    if (gameState.credits >= planet.refuelCost && gameState.fuel < gameState.maxFuel) {
      const newState = {
        ...gameState,
        credits: gameState.credits - planet.refuelCost,
        fuel: gameState.maxFuel
      };
      setGameState(newState);
      saveGameState(newState);
      return true;
    }
    return false;
  }, [gameState, saveGameState]);

  const purchaseCredits = useCallback((amount: number) => {
    const newState = {
      ...gameState,
      credits: gameState.credits + amount
    };
    setGameState(newState);
    saveGameState(newState);
  }, [gameState, saveGameState]);

  const purchaseFuel = useCallback((amount: number) => {
    const newState = {
      ...gameState,
      fuel: Math.min(gameState.maxFuel, gameState.fuel + amount)
    };
    setGameState(newState);
    saveGameState(newState);
  }, [gameState, saveGameState]);

  return {
    gameState,
    planets: PLANETS,
    isLoading,
    travelToPlanet,
    explorePlanet,
    refuelShip,
    purchaseCredits,
    purchaseFuel
  };
};
