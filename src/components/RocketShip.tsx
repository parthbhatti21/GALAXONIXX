
import React from 'react';
import { Rocket } from 'lucide-react';

interface RocketShipProps {
  position: { x: string; y: string };
  isMoving: boolean;
  targetPlanet: string;
}

const RocketShip = ({ position, isMoving, targetPlanet }: RocketShipProps) => {
  return (
    <div
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-2000 ease-in-out z-30 ${
        isMoving ? 'scale-110' : 'scale-100'
      }`}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <div className={`relative ${isMoving ? 'animate-pulse' : 'animate-float'}`}>
        <Rocket className="w-6 h-6 text-blue-400" />
        
        {/* Rocket trail when moving */}
        {isMoving && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="w-1 h-4 bg-gradient-to-t from-blue-400 to-transparent opacity-80 animate-pulse" />
          </div>
        )}
        
        {/* Glow effect */}
        <div className={`absolute inset-0 bg-blue-400/20 rounded-full animate-ping ${
          isMoving ? 'opacity-100' : 'opacity-50'
        }`} />
      </div>
    </div>
  );
};

export default RocketShip;
