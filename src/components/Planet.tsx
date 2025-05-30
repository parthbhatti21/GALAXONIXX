
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Planet as PlanetIcon, Rocket, Star, Fuel } from 'lucide-react';

export interface PlanetData {
  id: string;
  name: string;
  description: string;
  travelCost: number;
  refuelCost: number;
  maxDiscoveries: number;
  color: string;
  gradient: string;
  environment: string;
  gaese: string[];
}

interface PlanetProps {
  planet: PlanetData;
  isCurrentLocation: boolean;
  canAffordTravel: boolean;
  onTravel: (planet: PlanetData) => void;
  onExplore: (planet: PlanetData) => void;
  onRefuel: (planet: PlanetData) => void;
  discoveries: number;
  canRefuel: boolean;
}

const Planet = ({ 
  planet, 
  isCurrentLocation, 
  canAffordTravel, 
  onTravel, 
  onExplore, 
  onRefuel,
  discoveries,
  canRefuel 
}: PlanetProps) => {
  return (
    <Card className={`bg-slate-900/90 backdrop-blur-sm border-2 transition-all duration-300 hover:scale-105 ${
      isCurrentLocation ? 'border-green-400 animate-pulse-glow' : 'border-slate-600 hover:border-purple-400'
    }`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full ${planet.gradient} animate-float`} />
          <span className="text-white">{planet.name}</span>
          {isCurrentLocation && (
            <Rocket className="w-5 h-5 text-green-400 ml-auto animate-float" />
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-slate-300">{planet.description}</p>
          <p className="text-xs text-slate-400">Environment: {planet.environment}</p>
          <p className="text-xs text-slate-400">
            Gaese Species: {planet.gaese.length} types available
          </p>
        </div>

        {!isCurrentLocation && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Rocket className="w-4 h-4 text-blue-400" />
              <span>Travel Cost: {planet.travelCost} credits</span>
            </div>
            <Button 
              onClick={() => onTravel(planet)}
              disabled={!canAffordTravel}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600"
            >
              {canAffordTravel ? 'Travel Here' : 'Insufficient Credits'}
            </Button>
          </div>
        )}

        {isCurrentLocation && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span>Discoveries: {discoveries}/{planet.maxDiscoveries}</span>
              <Star className="w-4 h-4 text-yellow-400" />
            </div>
            
            <Button 
              onClick={() => onExplore(planet)}
              disabled={discoveries >= planet.maxDiscoveries}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600"
            >
              {discoveries >= planet.maxDiscoveries ? 'Fully Explored' : 'Explore Planet'}
            </Button>

            <div className="flex items-center gap-2 text-sm">
              <Fuel className="w-4 h-4 text-green-400" />
              <span>Refuel Cost: {planet.refuelCost} credits</span>
            </div>
            
            <Button 
              onClick={() => onRefuel(planet)}
              disabled={!canRefuel}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-slate-600"
            >
              {canRefuel ? 'Refuel Here' : 'Cannot Refuel'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Planet;
