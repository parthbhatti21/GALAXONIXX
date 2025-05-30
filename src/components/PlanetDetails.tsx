
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, Star, Fuel, Rocket } from 'lucide-react';
import { PlanetData } from './Planet';

interface PlanetDetailsProps {
  planet: PlanetData;
  discoveries: number;
  onExplore: (planet: PlanetData) => void;
  onRefuel: (planet: PlanetData) => void;
  canRefuel: boolean;
}

const PlanetDetails = ({ planet, discoveries, onExplore, onRefuel, canRefuel }: PlanetDetailsProps) => {
  return (
    <Card className="bg-slate-900/90 backdrop-blur-sm border-2 border-purple-400 max-w-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full ${planet.gradient} animate-float`} />
          <span className="text-white">{planet.name}</span>
          <Rocket className="w-5 h-5 text-green-400 ml-auto animate-float" />
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
      </CardContent>
    </Card>
  );
};

export default PlanetDetails;
