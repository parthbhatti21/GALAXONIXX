
import React from 'react';
import { Rocket } from 'lucide-react';

const TravelAnimation = () => {
  return (
    <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <Rocket className="w-16 h-16 text-blue-400 mx-auto animate-float" />
          <div className="absolute inset-0 bg-blue-400/20 rounded-full animate-ping" />
        </div>
        <h2 className="text-2xl font-bold text-white mt-4 mb-2">Traveling Through Space</h2>
        <p className="text-slate-400">Engaging hyperdrive systems...</p>
        <div className="flex justify-center mt-4">
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelAnimation;
