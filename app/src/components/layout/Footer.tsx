import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';

const solutions = [
  // { name: 'Solutions Énergie', path: '/solutions/energie' },
  { name: 'Solutions Snacking', path: '/solutions/snacking' },
  { name: 'Solutions Espace Bureau', path: '/solutions/bureau' },
  { name: 'Solutions Emballage', path: '/solutions/emballage' },
  { name: 'Solutions Informatique', path: '/solutions/informatique' },
  { name: 'Solutions Transport & Logistique', path: '/solutions/transport' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <img 
                src="/logo/FKS_LOGO_B.png" 
                alt="FKS Facility Logo" 
                className="h-12 w-auto object-contain brightness-0 invert opacity-90"
              />
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-gray-400">
              La centrale d'achat nouvelle génération pour TPE et PME. 
              Optimisez vos coûts sans compromis sur la qualité.
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-white font-semibold mb-6">Expertises</h3>
            <ul className="space-y-3 text-sm">
              {solutions.map((solution) => (
                <li key={solution.path}>
                  <Link
                    to={solution.path}
                    className="hover:text-primary-400 transition-colors block py-1"
                  >
                    {solution.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-6">Entreprise</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/a-propos" className="hover:text-primary-400 transition-colors py-1 block">À propos</Link></li>
              <li><Link to="/tarifs" className="hover:text-primary-400 transition-colors py-1 block">Tarifs</Link></li>
              <li><Link to="/contact" className="hover:text-primary-400 transition-colors py-1 block">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6">Nous trouver</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-500 mt-0.5" />
                <span>15 rue Lucien Sergent,<br />91300, Massy, France</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-500" />
                <a href="mailto:franck.k@fks-facility.com" className="hover:text-white transition-colors">
                  franck.k@fks-facility.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <div className="flex flex-wrap justify-center gap-6">
            <span>© {new Date().getFullYear()} FKS Facility Solutions</span>
            <Link to="/mentions-legales" className="hover:text-gray-300">Mentions légales</Link>
            <Link to="/confidentialite" className="hover:text-gray-300">Politique de confidentialité</Link>
            <Link to="/cookies" className="hover:text-gray-300">Cookies</Link>
          </div>
          <p className="flex items-center gap-1">
            crafted with <span className="text-red-500">❤</span> by{' '}
            <a
              href="https://polarisagency.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-primary-400 transition-colors font-medium"
            >
              polarisagency
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
