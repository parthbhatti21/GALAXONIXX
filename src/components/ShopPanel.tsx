
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CircleDollarSign, Fuel, Gift, Star } from 'lucide-react';
import { toast } from 'sonner';

interface ShopPanelProps {
  onPurchaseCredits: (amount: number) => void;
  onPurchaseFuel: (amount: number) => void;
  currentCredits: number;
  currentFuel: number;
  maxFuel: number;
}

const ShopPanel = ({ 
  onPurchaseCredits, 
  onPurchaseFuel, 
  currentCredits, 
  currentFuel, 
  maxFuel 
}: ShopPanelProps) => {
  
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
    <div className="space-y-6">
      <Card className="bg-slate-900/90 backdrop-blur-sm border-green-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Gift className="w-6 h-6" />
            Free Resources
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            onClick={handleFreeCredits}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            <CircleDollarSign className="w-4 h-4 mr-2" />
            Get 500 Free Credits
          </Button>
          
          <Button 
            onClick={handleFreeFuel}
            disabled={currentFuel >= maxFuel}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white"
          >
            <Fuel className="w-4 h-4 mr-2" />
            {currentFuel >= maxFuel ? 'Tank Full' : 'Free Fuel Refill'}
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-slate-900/90 backdrop-blur-sm border-yellow-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400">
            <CircleDollarSign className="w-6 h-6" />
            Credit Packages
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {creditPackages.map((pkg, index) => (
            <Card key={index} className={`border ${pkg.color} bg-slate-800/50`}>
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <pkg.icon className={`w-4 h-4 ${pkg.color.split(' ')[0]}`} />
                    <div>
                      <p className="font-semibold text-white">{pkg.label}</p>
                      <p className={`text-sm ${pkg.color.split(' ')[0]}`}>+{pkg.amount} Credits</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => {
                      onPurchaseCredits(pkg.amount);
                      toast.success(`Purchased ${pkg.amount} credits!`);
                    }}
                    size="sm"
                    className="bg-yellow-600 hover:bg-yellow-700 text-white"
                  >
                    Free
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-slate-900/90 backdrop-blur-sm border-blue-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Fuel className="w-6 h-6" />
            Fuel Packages
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {fuelPackages.map((pkg, index) => (
            <Card key={index} className={`border ${pkg.color} bg-slate-800/50`}>
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Fuel className={`w-4 h-4 ${pkg.color.split(' ')[0]}`} />
                    <div>
                      <p className="font-semibold text-white">{pkg.label}</p>
                      <p className={`text-sm ${pkg.color.split(' ')[0]}`}>+{pkg.amount} Fuel</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => {
                      if (currentFuel + pkg.amount <= maxFuel) {
                        onPurchaseFuel(pkg.amount);
                        toast.success(`Added ${pkg.amount} fuel!`);
                      } else {
                        const maxPossible = maxFuel - currentFuel;
                        if (maxPossible > 0) {
                          onPurchaseFuel(maxPossible);
                          toast.success(`Added ${maxPossible} fuel! Tank is now full.`);
                        } else {
                          toast.info('Fuel tank is already full!');
                        }
                      }
                    }}
                    size="sm"
                    disabled={currentFuel >= maxFuel}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white"
                  >
                    Free
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ShopPanel;
