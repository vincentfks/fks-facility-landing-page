import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

const helpfulLinks = [
  { label: 'Nos solutions', to: '/solutions' },
  { label: 'Tarifs', to: '/tarifs' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4 py-24">
      <div className="max-w-xl text-center">
        <p className="text-primary-500 font-medium mb-3">| ERREUR 404</p>
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Page introuvable</h1>
        <p className="text-lg text-gray-600 mb-8">
          Cette page n'existe pas ou a été déplacée. Retrouvez nos offres de centrale d'achat depuis l'accueil.
        </p>
        <Link to="/">
          <Button size="lg">Retour à l'accueil</Button>
        </Link>
        <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          {helpfulLinks.map((link) => (
            <li key={link.to}>
              <Link to={link.to} className="text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
