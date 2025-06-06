import React from 'react';
import { Rocket, Fuel, CircleDollarSign, Globe, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface GameDashboardProps {
  credits: number;
  fuel: number;
  maxFuel: number;
  explorationsCount: number;
  currentPlanet: string;
  className?: string;
}

const GameDashboard = ({ credits, fuel, maxFuel, explorationsCount, currentPlanet, className = '' }: GameDashboardProps) => {
  const fuelPercentage = (fuel / maxFuel) * 100;

  return (
    <div className={`w-full ${className}`}>
      <Card className="bg-slate-900/80 backdrop-blur-sm border-purple-500/30 shadow-lg rounded-none border-t-0 border-l-0 border-r-0">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CircleDollarSign className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-slate-400">Credits</p>
                <p className="font-bold text-yellow-400">{credits.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Fuel className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-slate-400">Fuel</p>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300"
                      style={{ width: `${fuelPercentage}%` }}
                    />
                  </div>
                  <span className="font-bold text-blue-400">{fuel}/{maxFuel}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-slate-400">Discoveries</p>
                <p className="font-bold text-purple-400">{explorationsCount}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-slate-400">Current Planet</p>
                <p className="font-bold text-green-400">{currentPlanet}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Rocket className="w-5 h-5 text-orange-400" />
              <div>
                <p className="text-slate-400">Status</p>
                <p className="font-bold text-orange-400">Ready</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameDashboard;
