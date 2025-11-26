import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, TrendingDown, ArrowRight, Coins, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { MultiStepForm } from '../forms/MultiStepForm';

export const SavingsSimulator: React.FC = () => {
  const [spendAmount, setSpendAmount] = useState<number>(5000);
  const [period, setPeriod] = useState<'monthly' | 'yearly'>('yearly');
  const [showContactForm, setShowContactForm] = useState(false);

  // Constants
  const AVERAGE_SAVINGS_PERCENT = 30;
  const MAX_SAVINGS_PERCENT = 70;

  // Calculations
  const savingsAmount = Math.round(spendAmount * (AVERAGE_SAVINGS_PERCENT / 100));
  const maxSavingsAmount = Math.round(spendAmount * (MAX_SAVINGS_PERCENT / 100));
  const newSpendAmount = spendAmount - savingsAmount;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpendAmount(Number(e.target.value));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (!isNaN(val) && val >= 0) {
      setSpendAmount(val);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {!showContactForm ? (
          <motion.div
            key="simulator"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl mb-6 shadow-sm">
                <Calculator className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                Simulez vos économies potentielles
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Estimez combien vous pourriez économiser en rejoignant la centrale d'achat FKS Facility.
                Basé sur une moyenne constatée de 30% d'économies.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
              {/* Input Section */}
              <Card className="lg:col-span-7 p-8 shadow-lg border-primary-100">
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Vos dépenses actuelles (hors salaires/loyer)
                  </label>
                  
                  <div className="flex items-center justify-center space-x-4 mb-8 bg-gray-50 p-1 rounded-lg w-fit mx-auto">
                    <button
                      onClick={() => setPeriod('monthly')}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                        period === 'monthly'
                          ? 'bg-white text-primary-600 shadow-sm'
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      Mensuelles
                    </button>
                    <button
                      onClick={() => setPeriod('yearly')}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                        period === 'yearly'
                          ? 'bg-white text-primary-600 shadow-sm'
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      Annuelles
                    </button>
                  </div>

                  <div className="relative mb-8">
                    <Input
                      type="number"
                      value={spendAmount}
                      onChange={handleInputChange}
                      className="text-3xl font-bold text-center py-6 border-2 border-primary-100 focus:border-primary-500"
                      min={0}
                    />
                    <span className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 font-medium">€</span>
                  </div>

                  <input
                    type="range"
                    min="1000"
                    max="1000000"
                    step="1000"
                    value={spendAmount}
                    onChange={handleSliderChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>1 k€</span>
                    <span>500 k€</span>
                    <span>1 M€</span>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                    <CheckCircle2 className="w-5 h-5 mr-2 text-blue-600" />
                    Ce que cela inclut :
                  </h4>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>• Fournitures de bureau et mobilier</li>
                    <li>• Énergie (Gaz, Électricité)</li>
                    <li>• Emballages et logistique</li>
                    <li>• Informatique et télécoms</li>
                    <li>• Services généraux (Nettoyage, Sécurité...)</li>
                  </ul>
                </div>
              </Card>

              {/* Results Section */}
              <div className="lg:col-span-5 space-y-6">
                <Card className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl border-0 h-full flex flex-col justify-between relative overflow-hidden">
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-300 mb-2">Économies estimées</h3>
                    <div className="text-5xl font-bold text-white mb-2 tracking-tight">
                      {formatCurrency(savingsAmount)}
                    </div>
                    <p className="text-primary-300 text-sm font-medium">
                      par {period === 'monthly' ? 'mois' : 'an'} (moyenne de 30%)
                    </p>
                  </div>

                  <div className="py-8 space-y-4">
                    <div className="flex justify-between items-end text-sm mb-1">
                      <span className="text-gray-400">Budget actuel</span>
                      <span className="text-white font-medium">{formatCurrency(spendAmount)}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3 mb-4 overflow-hidden">
                      <div className="bg-gray-500 h-3 rounded-full w-full" />
                    </div>

                    <div className="flex justify-between items-end text-sm mb-1">
                      <span className="text-primary-300 font-medium flex items-center">
                        <TrendingDown className="w-4 h-4 mr-1" />
                        Budget optimisé FKS
                      </span>
                      <span className="text-white font-bold">{formatCurrency(newSpendAmount)}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden flex">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${100 - AVERAGE_SAVINGS_PERCENT}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="bg-primary-500 h-3 rounded-l-full" 
                      />
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${AVERAGE_SAVINGS_PERCENT}%` }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                        className="bg-secondary-500 h-3 rounded-r-full opacity-80" 
                      />
                    </div>
                    <p className="text-xs text-right text-secondary-400 mt-1">
                      La partie verte représente vos économies potentielles
                    </p>
                  </div>

                  <div>
                    <div className="bg-white/10 rounded-lg p-4 mb-6 backdrop-blur-sm">
                      <div className="flex items-start">
                        <Coins className="w-5 h-5 text-yellow-400 mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-200">
                            Sur certaines catégories, vos économies peuvent atteindre <span className="text-white font-bold">jusqu'à {formatCurrency(maxSavingsAmount)}</span> (-70%) !
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button 
                      size="lg" 
                      className="w-full bg-white text-gray-900 hover:bg-gray-100 border-0"
                      onClick={() => setShowContactForm(true)}
                    >
                      Concrétiser ces économies
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="contact-form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="mb-8">
              <button 
                onClick={() => setShowContactForm(false)}
                className="text-sm text-gray-500 hover:text-primary-600 flex items-center mb-4"
              >
                ← Retour au simulateur
              </button>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Parlons de vos {formatCurrency(savingsAmount)} d'économies
              </h2>
              <p className="text-gray-600">
                Remplissez ce formulaire pour qu'un expert analyse vos dépenses et confirme ce potentiel d'économies.
              </p>
            </div>
            <Card className="p-8 shadow-xl border-gray-200">
              <MultiStepForm onSubmit={async (data) => {
                // Here we would normally submit the data
                console.log('Form data:', { ...data, simulatedSavings: savingsAmount, period });
                // You can add your API call here
              }} />
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

