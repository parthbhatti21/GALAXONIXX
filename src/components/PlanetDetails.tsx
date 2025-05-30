import React from 'react';
import { PlanetData } from './Planet';
import { Button } from '@/components/ui/button';
import { Rocket, Compass, Fuel, Coins } from 'lucide-react';

// Custom scrollbar styles
const scrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(15, 23, 42, 0.6);
    border-radius: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(148, 163, 184, 0.4);
    border-radius: 4px;
    border: 2px solid rgba(15, 23, 42, 0.6);
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(148, 163, 184, 0.6);
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:active {
    background: rgba(148, 163, 184, 0.8);
  }
`;

interface PlanetDetailsProps {
  planet: PlanetData;
  onRefuel: (planet: PlanetData) => void;
  onPurchaseCredits: (amount: number) => Promise<boolean>;
  onPurchaseFuel: (amount: number) => Promise<boolean>;
  onClaimFreeCredits: () => Promise<boolean>;
  canClaimFreeCredits: () => boolean;
  credits: number;
  fuel: number;
  maxFuel: number;
  onTravel: () => void;
}

const PlanetDetails: React.FC<PlanetDetailsProps> = ({
  planet,
  onRefuel,
  onPurchaseCredits,
  onPurchaseFuel,
  onClaimFreeCredits,
  canClaimFreeCredits,
  credits,
  fuel,
  maxFuel,
  onTravel,
}) => {
  return (
    <div className="h-full flex flex-col">
      <style>{scrollbarStyles}</style>
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6">
          {/* Planet Image */}
          <div className="relative w-full h-48 rounded-lg overflow-hidden">
            <img
              src={`/planates_images/${planet.id}.png`}
              alt={`${planet.name} surface`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/planates_images/earth.png';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
          </div>

          {/* Planet Header */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">{planet.name}</h2>
          </div>

          {/* Planet Description */}
          <div className="bg-slate-800/50 rounded-lg p-4 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
              <div className="text-gray-300 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                <p className="whitespace-pre-line">{planet.description}</p>
              </div>
            </div>
          </div>

          {/* Environment and Characteristics */}
          <div className="bg-slate-800/50 rounded-lg p-4 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Environment</h3>
              <p className="text-gray-300">{planet.environment}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Moons</h3>
              {planet.moons.length > 0 ? (
                <ul className="list-disc list-inside text-gray-300">
                  {planet.moons.map(moon => (
                    <li key={moon.id} className="mb-1">
                      {moon.name} - {moon.description}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-300">No moons</p>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Potential Discoveries</h3>
              <ul className="list-disc list-inside text-gray-300">
                {planet.gaese.map((discovery, index) => (
                  <li key={index} className="mb-1">
                    {discovery}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Travel Costs */}
          <div className="bg-slate-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Travel Information</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-300">
                  <Coins className="w-5 h-5 mr-2" />
                  <span>Travel Cost</span>
                </div>
                <span className="text-white">{planet.travelCost} credits</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-300">
                  <Fuel className="w-5 h-5 mr-2" />
                  <span>Refuel Cost</span>
                </div>
                <span className="text-white">{planet.refuelCost} credits</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 space-y-3">
        <Button
          onClick={onTravel}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Rocket className="w-5 h-5 mr-2" />
          Travel to {planet.name}
        </Button>
        
        <Button
          onClick={() => onRefuel(planet)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          disabled={fuel >= maxFuel}
        >
          <Fuel className="w-5 h-5 mr-2" />
          {fuel >= maxFuel ? 'Fuel Tank Full' : 'Refuel Ship'}
        </Button>
      </div>
    </div>
  );
};

export default PlanetDetails;
