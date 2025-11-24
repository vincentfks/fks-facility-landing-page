import React from 'react';
import { Shield, Lock, CheckCircle2 } from 'lucide-react';

export const SecurityBadges: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 py-8">
      <div className="flex items-center space-x-2 text-gray-600">
        <Shield className="w-5 h-5 text-primary-500" />
        <span className="text-sm font-medium">RGPD conforme</span>
      </div>
      <div className="flex items-center space-x-2 text-gray-600">
        <Lock className="w-5 h-5 text-primary-500" />
        <span className="text-sm font-medium">SSL sécurisé</span>
      </div>
      <div className="flex items-center space-x-2 text-gray-600">
        <CheckCircle2 className="w-5 h-5 text-primary-500" />
        <span className="text-sm font-medium">Paiement sécurisé</span>
      </div>
    </div>
  );
};

