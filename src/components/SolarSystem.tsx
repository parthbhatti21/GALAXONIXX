
import React, { useState } from 'react';
import { PlanetData } from './Planet';
import RocketShip from './RocketShip';

interface SolarSystemProps {
  planets: PlanetData[];
  currentPlanet: string;
  onPlanetSelect: (planet: PlanetData) => void;
  isMoving: boolean;
}

const SolarSystem = ({ planets, currentPlanet, onPlanetSelect, isMoving }: SolarSystemProps) => {
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);

  const getPlanetPosition = (index: number) => {
    const angle = (index / planets.length) * 2 * Math.PI;
    const baseRadius = 120;
    const radiusIncrement = 45;
    const radius = baseRadius + index * radiusIncrement;
    
    const x = 50 + (radius * Math.cos(angle)) / 6;
    const y = 50 + (radius * Math.sin(angle)) / 6;
    return { x: `${x}%`, y: `${y}%` };
  };

  const getMoonPosition = (planetIndex: number, moonIndex: number, totalMoons: number) => {
    const planetPos = getPlanetPosition(planetIndex);
    const moonAngle = (moonIndex / totalMoons) * 2 * Math.PI;
    const moonRadius = 15 + moonIndex * 8;
    
    const planetX = parseFloat(planetPos.x.replace('%', ''));
    const planetY = parseFloat(planetPos.y.replace('%', ''));
    
    const moonX = planetX + (moonRadius * Math.cos(moonAngle)) / 15;
    const moonY = planetY + (moonRadius * Math.sin(moonAngle)) / 15;
    
    return { x: `${moonX}%`, y: `${moonY}%` };
  };

  const getCurrentPlanetPosition = () => {
    const planetIndex = planets.findIndex(p => p.id === currentPlanet);
    return getPlanetPosition(planetIndex);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      {/* Stars background */}
      <div className="stars fixed inset-0 opacity-30" />
      
      {/* Sun in the center */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full animate-pulse shadow-lg shadow-yellow-400/50">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 animate-spin" style={{ animationDuration: '20s' }}>
            <div className="w-2 h-2 bg-yellow-200 rounded-full absolute top-2 left-2"></div>
            <div className="w-1 h-1 bg-white rounded-full absolute bottom-3 right-3"></div>
          </div>
        </div>
      </div>

      {/* Orbital paths */}
      {planets.map((_, index) => {
        const baseRadius = 120;
        const radiusIncrement = 45;
        const radius = baseRadius + index * radiusIncrement;
        return (
          <div
            key={index}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-slate-600/20 rounded-full"
            style={{
              width: `${radius / 3}px`,
              height: `${radius / 3}px`,
            }}
          />
        );
      })}

      {/* Planets */}
      {planets.map((planet, index) => {
        const position = getPlanetPosition(index);
        const isSelected = planet.id === currentPlanet;
        const isHovered = hoveredPlanet === planet.id;
        
        return (
          <div key={planet.id}>
            {/* Planet */}
            <div
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 z-10 ${
                isSelected ? 'scale-150' : isHovered ? 'scale-125' : 'scale-100'
              }`}
              style={{
                left: position.x,
                top: position.y,
              }}
              onClick={() => onPlanetSelect(planet)}
              onMouseEnter={() => setHoveredPlanet(planet.id)}
              onMouseLeave={() => setHoveredPlanet(null)}
            >
              <div className={`w-6 h-6 rounded-full ${planet.gradient} shadow-lg transition-all duration-300 ${
                isSelected ? 'animate-pulse-glow' : 'hover:shadow-xl'
              }`} />
              
              {/* Planet name */}
              <div className={`absolute top-8 left-1/2 transform -translate-x-1/2 text-xs text-white whitespace-nowrap transition-opacity duration-300 ${
                isHovered || isSelected ? 'opacity-100' : 'opacity-70'
              }`}>
                {planet.name}
              </div>
              
              {/* Selection indicator */}
              {isSelected && (
                <div className="absolute -inset-2 border-2 border-green-400 rounded-full animate-pulse" />
              )}
            </div>

            {/* Moons */}
            {planet.moons.map((moon, moonIndex) => {
              const moonPos = getMoonPosition(index, moonIndex, planet.moons.length);
              return (
                <div
                  key={moon.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-5"
                  style={{
                    left: moonPos.x,
                    top: moonPos.y,
                  }}
                >
                  <div 
                    className={`w-2 h-2 rounded-full ${moon.gradient} shadow-sm animate-float`}
                    style={{ animationDelay: `${moonIndex * 0.5}s` }}
                  />
                  
                  {/* Moon orbital path */}
                  <div
                    className="absolute border border-slate-600/10 rounded-full"
                    style={{
                      width: `${(15 + moonIndex * 8) / 7.5}px`,
                      height: `${(15 + moonIndex * 8) / 7.5}px`,
                      left: `${-(15 + moonIndex * 8) / 15}%`,
                      top: `${-(15 + moonIndex * 8) / 15}%`,
                    }}
                  />
                </div>
              );
            })}
          </div>
        );
      })}

      {/* Rocket Ship */}
      <RocketShip 
        position={getCurrentPlanetPosition()} 
        isMoving={isMoving}
        targetPlanet={currentPlanet}
      />
    </div>
  );
};

export default SolarSystem;
