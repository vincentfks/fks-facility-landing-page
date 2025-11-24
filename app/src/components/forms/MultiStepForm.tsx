import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const step1Schema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(10, 'Numéro de téléphone invalide').optional().or(z.literal('')),
});

const step2Schema = z.object({
  company: z.string().optional(),
  employees_range: z.string().optional(),
  sector: z.string().optional(),
});

const step3Schema = z.object({
  message: z.string().optional(),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type Step3Data = z.infer<typeof step3Schema>;

type FormData = Step1Data & Step2Data & Step3Data;

interface MultiStepFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  onSuccess?: () => void;
}

export const MultiStepForm: React.FC<MultiStepFormProps> = ({ onSubmit, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [savedData, setSavedData] = useLocalStorage<Partial<FormData>>('fks_contact_form', {});

  const form = useForm<FormData>({
    mode: 'onChange',
    defaultValues: savedData,
  });

  // Save to localStorage on change (debounced)
  React.useEffect(() => {
    const subscription = form.watch((data) => {
      setSavedData(data);
    });
    return () => subscription.unsubscribe();
  }, [form, setSavedData]);

  const handleNext = useCallback(async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await form.trigger(['name', 'email', 'phone']);
    } else if (step === 2) {
      isValid = await form.trigger(['company', 'employees_range', 'sector']);
    } else {
      isValid = await form.trigger(['message']);
    }
    
    if (isValid && step < 3) {
      setStep(step + 1);
    }
  }, [form, step]);

  const handlePrev = useCallback(() => {
    if (step > 1) {
      setStep(step - 1);
    }
  }, [step]);

  const handleSubmit = useCallback(async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      setIsSubmitted(true);
      setSavedData({});
      setTimeout(() => {
        onSuccess?.();
      }, 2000);
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  }, [onSubmit, onSuccess, setSavedData]);

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-primary-500" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          Message envoyé avec succès !
        </h3>
        <p className="text-gray-600">
          Nous vous recontacterons dans les plus brefs délais.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map((stepNumber) => (
          <div key={stepNumber} className="flex items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                step >= stepNumber
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              {step > stepNumber ? <Check className="w-5 h-5" /> : stepNumber}
            </div>
            {stepNumber < 3 && (
              <div
                className={`flex-1 h-0.5 mx-2 transition-colors ${
                  step > stepNumber ? 'bg-primary-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Steps */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Informations de base
            </h3>
            <Input
              label="Nom"
              {...form.register('name')}
              error={form.formState.errors.name?.message}
              required
            />
            <Input
              label="Email"
              type="email"
              {...form.register('email')}
              error={form.formState.errors.email?.message}
              required
            />
            <Input
              label="Numéro de téléphone"
              type="tel"
              {...form.register('phone')}
              error={form.formState.errors.phone?.message}
            />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Informations entreprise
            </h3>
            <Input
              label="Entreprise"
              {...form.register('company')}
              error={form.formState.errors.company?.message}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Taille de l'entreprise
              </label>
              <select
                {...form.register('employees_range')}
                className="flex h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Sélectionnez...</option>
                <option value="1-10">1 à 10 salariés</option>
                <option value="10-20">10 à 20 salariés</option>
                <option value="20-50">20 à 50 salariés</option>
                <option value="50+">Plus de 50 salariés</option>
              </select>
            </div>
            <Input
              label="Secteur d'activité"
              {...form.register('sector')}
              error={form.formState.errors.sector?.message}
            />
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Votre message (optionnel)
            </h3>
            <Textarea
              label="Message"
              rows={6}
              {...form.register('message')}
              error={form.formState.errors.message?.message}
              placeholder="Décrivez vos besoins..."
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <Button
          type="button"
          variant="ghost"
          onClick={handlePrev}
          disabled={step === 1}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Précédent
        </Button>
        {step < 3 ? (
          <Button type="button" onClick={handleNext}>
            Suivant
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Envoi...' : 'Envoyer'}
          </Button>
        )}
      </div>
    </form>
  );
};

