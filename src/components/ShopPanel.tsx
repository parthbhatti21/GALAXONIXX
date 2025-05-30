import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CircleDollarSign, Fuel, Gift, Star, X } from 'lucide-react';
import { toast } from 'sonner';

interface ShopPanelProps {
  onPurchaseCredits: (amount: number) => Promise<boolean>;
  onPurchaseFuel: (amount: number) => Promise<boolean>;
  onClaimFreeCredits: () => Promise<boolean>;
  canClaimFreeCredits: () => boolean;
  currentCredits: number;
  currentFuel: number;
  maxFuel: number;
  onClose: () => void;
}

const ShopPanel: React.FC<ShopPanelProps> = ({
  onPurchaseCredits,
  onPurchaseFuel,
  onClaimFreeCredits,
  canClaimFreeCredits,
  currentCredits,
  currentFuel,
  maxFuel,
  onClose
}) => {
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const handleFreeCredits = () => {
    onPurchaseCredits(500);
    toast.success('Received 500 free credits!');
  };

  const handleFreeFuel = () => {
    const fuelToAdd = maxFuel - currentFuel;
    if (fuelToAdd > 0) {
      onPurchaseFuel(fuelToAdd);
      toast.success('Fuel tank refilled for free!');
    } else {
      toast.info('Fuel tank is already full!');
    }
  };

  const creditPackages = [
    { amount: 100, label: 'Starter Pack', icon: Star, color: 'text-blue-400 border-blue-400' },
    { amount: 500, label: 'Explorer Pack', icon: Star, color: 'text-purple-400 border-purple-400' },
    { amount: 1000, label: 'Admiral Pack', icon: Star, color: 'text-yellow-400 border-yellow-400' },
    { amount: 2500, label: 'Commander Pack', icon: Star, color: 'text-orange-400 border-orange-400' }
  ];

  const fuelPackages = [
    { amount: 25, label: 'Quick Fill', color: 'text-cyan-400 border-cyan-400' },
    { amount: 50, label: 'Half Tank', color: 'text-blue-400 border-blue-400' },
    { amount: 100, label: 'Full Tank', color: 'text-green-400 border-green-400' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={handleClose}>
      <div className="bg-slate-900 p-6 rounded-lg shadow-xl w-96 relative" onClick={e => e.stopPropagation()}>
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">Space Store</h2>

        <div className="space-y-6">
          {/* Free Credits Section */}
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Daily Free Credits</h3>
            <p className="text-gray-300 text-sm mb-3">
              Claim 100 free credits once per day!
            </p>
            <Button
              onClick={() => onClaimFreeCredits()}
              disabled={!canClaimFreeCredits()}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              {canClaimFreeCredits() ? 'Claim Free Credits' : 'Already Claimed Today'}
            </Button>
          </div>

          {/* Purchase Credits Section */}
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Purchase Credits</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => onPurchaseCredits(100)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                100 Credits
              </Button>
              <Button
                onClick={() => onPurchaseCredits(500)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                500 Credits
              </Button>
            </div>
          </div>

          {/* Purchase Fuel Section */}
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Purchase Fuel</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => onPurchaseFuel(20)}
                disabled={currentFuel >= maxFuel}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                20 Fuel
              </Button>
              <Button
                onClick={() => onPurchaseFuel(50)}
                disabled={currentFuel >= maxFuel}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                50 Fuel
              </Button>
            </div>
          </div>

          {/* Current Resources */}
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Your Resources</h3>
            <div className="space-y-2">
              <p className="text-gray-300">
                Credits: <span className="text-yellow-400">{currentCredits}</span>
              </p>
              <p className="text-gray-300">
                Fuel: <span className="text-green-400">{currentFuel}/{maxFuel}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPanel;
