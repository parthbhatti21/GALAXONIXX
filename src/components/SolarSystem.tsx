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
    const baseRadius = 80;
    const radiusIncrement = 30;
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

  const getRocketPosition = (planetPosition: { x: string; y: string }) => {
    const x = parseFloat(planetPosition.x.replace('%', ''));
    const y = parseFloat(planetPosition.y.replace('%', ''));
    
    // Calculate position 20% to the right of the planet
    const rocketX = x + 3;
    const rocketY = y;
    
    return { x: `${rocketX}%`, y: `${rocketY}%` };
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 pt-5">
      {/* Stars background */}
      <div className="stars-container absolute inset-0">
        {[...Array(50)].map((_, index) => (
          <div
            key={index}
            className="absolute bg-white rounded-full animate-twinkle"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.5 + 0.5
            }}
          />
        ))}
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 text-center py-2 text-slate-400 text-sm z-50">
        © {new Date().getFullYear()} Parthnoixx. All rights reserved.
      </div>

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
        const baseRadius = 80;
        const radiusIncrement = 30;
        const radius = baseRadius + index * radiusIncrement;
        return (
          <div
            key={index}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-slate-600/20 rounded-full"
            style={{
              width: `${radius / 3}%`,
              height: `${radius / 3}%`,
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
              const orbitDuration = 5 + moonIndex * 2; // Different duration for each moon
              // Adjust orbit radius based on planet and number of moons
              const baseRadius = planet.id === 'uranus' ? 15 : 20; // Smaller base radius for Uranus
              const increment = planet.id === 'uranus' ? 5 : 10; // Smaller increment for Uranus
              const orbitRadius = baseRadius + moonIndex * increment;
              
              return (
                <div
                  key={moon.id}
                  className="absolute z-5"
                  style={{
                    left: position.x,
                    top: position.y,
                    width: `${orbitRadius * 2}px`,
                    height: `${orbitRadius * 2}px`,
                    transform: 'translate(-50%, -50%)',
                    animation: `orbit ${orbitDuration}s linear infinite`,
                    transformOrigin: 'center',
                  }}
                >
                  {/* Moon */}
                  <div 
                    className={`w-2 h-2 rounded-full ${moon.gradient} shadow-sm absolute`}
                    style={{
                      top: '0',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      animationDelay: `${moonIndex * 0.5}s`
                    }}
                  />
                  
                  {/* Moon orbital path */}
                  <div
                    className="absolute border border-slate-600/10 rounded-full"
                    style={{
                      width: '100%',
                      height: '100%',
                      left: '0',
                      top: '0',
                    }}
                  />
                </div>
              );
            })}
          </div>
        );
      })}

      {/* Rocket */}
      <div 
        className={`absolute z-30 transition-all duration-1000 ${
          isMoving ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
        }`}
        style={{
          left: getRocketPosition(getCurrentPlanetPosition()).x,
          top: getRocketPosition(getCurrentPlanetPosition()).y,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <img 
          src="/planates_images/rocket.png" 
          alt="Rocket" 
          className="w-[50px] h-[50px] object-contain"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Travel Animation */}
      {isMoving && (
        <div className="absolute z-40 inset-0 flex items-center justify-center">
          <div className="relative w-6 h-10">
            {/* Traveling Rocket */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-700 to-slate-800 rounded-t-sm animate-bounce" />
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-2 bg-slate-600 rounded-t-full" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-inner" />
            <div className="absolute bottom-0 left-0 w-6 h-2">
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-slate-600 transform -skew-x-12" />
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-slate-600 transform skew-x-12" />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-2">
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500 to-red-600 animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-400 to-orange-500 animate-pulse blur-[1px]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = `
  @keyframes orbit {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  @keyframes twinkle {
    0%, 100% {
      opacity: 0.2;
      transform: scale(0.8);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
    }
  }

  .animate-twinkle {
    animation: twinkle 3s ease-in-out infinite;
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default SolarSystem;
