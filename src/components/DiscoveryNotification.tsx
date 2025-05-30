
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, CircleDollarSign } from 'lucide-react';

interface DiscoveryNotificationProps {
  discovery: string;
  creditsEarned: number;
  onClose: () => void;
}

const DiscoveryNotification = ({ discovery, creditsEarned, onClose }: DiscoveryNotificationProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-24 right-4 z-50 transition-all duration-300 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <Card className="bg-gradient-to-r from-purple-600 to-pink-600 border-2 border-yellow-400 animate-pulse-glow">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Star className="w-8 h-8 text-yellow-400 animate-float" />
            <div>
              <h3 className="font-bold text-white">New Discovery!</h3>
              <p className="text-yellow-100">{discovery}</p>
              <div className="flex items-center gap-1 mt-1">
                <CircleDollarSign className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 font-bold">+{creditsEarned} credits</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiscoveryNotification;
