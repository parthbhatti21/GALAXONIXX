import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, CircleDollarSign, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      handleClose();
    }, 5000); // Increased to 5 seconds to give more time to read

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className={`fixed top-24 right-4 z-50 transition-all duration-300 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <Card className="bg-gradient-to-r from-purple-600 to-pink-600 border-2 border-yellow-400 animate-pulse-glow">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Star className="w-8 h-8 text-yellow-400 animate-float flex-shrink-0" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-white">New Discovery!</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-white hover:text-yellow-400 hover:bg-white/10 rounded-full"
                  onClick={handleClose}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
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
