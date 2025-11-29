import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Le webhook Stripe gère déjà la confirmation côté serveur
    // Ici, on peut juste afficher le message de succès
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Vérification de votre paiement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="mb-6"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Paiement confirmé !
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          Merci pour votre confiance. Votre adhésion à FKS Facility a été activée avec succès.
        </p>

        <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-8 text-left">
          <h2 className="font-semibold text-primary-900 mb-3">
            Prochaines étapes :
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>Vous recevrez un email de confirmation avec vos identifiants dans les 24 heures</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>Notre équipe prépare votre compte personnalisé</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>Vous pourrez bientôt accéder à tous nos fournisseurs partenaires</span>
            </li>
          </ul>
        </div>

        {sessionId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-8">
            <p className="text-sm text-gray-600">
              <strong>ID de session :</strong>
              <span className="font-mono text-xs ml-2">{sessionId}</span>
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button variant="outline" size="lg">
              Retour à l'accueil
            </Button>
          </Link>
          <Link to="/solutions">
            <Button variant="primary" size="lg">
              Découvrir nos solutions
            </Button>
          </Link>
        </div>

        <p className="text-sm text-gray-500 mt-8">
          Une question ? Contactez-nous à{' '}
          <a href="mailto:contact@fks-facility.com" className="text-primary-600 hover:underline">
            contact@fks-facility.com
          </a>
        </p>
      </motion.div>
    </div>
  );
};

