import { useState, FormEvent } from 'react';
import { usePasswordProtection } from '../hooks/usePasswordProtection';

interface Supplier {
  name: string;
  category: string;
  categoryColor: 'primary' | 'secondary';
  contact: {
    name: string;
    phone: string;
    email: string;
    website: string;
  };
  logo: string;
  logoAlt: string;
  lightBg?: boolean;
}

const suppliers: Supplier[] = [
  {
    name: 'Bruneau',
    category: 'Fourniture de bureau',
    categoryColor: 'primary',
    contact: {
      name: 'Estelle Lavalle',
      phone: '0160920988',
      email: 'e-lavalle@bruneau.fr',
      website: 'https://www.bruneau.fr',
    },
    logo: '/partners/logo-bruneau.png',
    logoAlt: 'Bruneau Logo',
  },
  {
    name: 'CP Consulting',
    category: 'Transport et Stockage',
    categoryColor: 'secondary',
    contact: {
      name: 'Frédéric Prépin',
      phone: '0649892194',
      email: 'F.prepin@cpconsulting.fr',
      website: 'https://www.cpconsulting.fr',
    },
    logo: '/partners/CP-consulting-logo.png',
    logoAlt: 'CP Consulting Logo',
    lightBg: true,
  },
  {
    name: 'Cenpac',
    category: 'Emballage et Équipement',
    categoryColor: 'primary',
    contact: {
      name: 'Benjamin Lheureux',
      phone: '0648632342',
      email: 'benjamin.lheureux@cenpac.fr',
      website: 'https://www.cenpac.fr',
    },
    logo: '/partners/cenpac-logo.png',
    logoAlt: 'Cenpac Logo',
  },
  {
    name: 'Polaris Agency',
    category: 'Création de site web, conseil et formation technologique',
    categoryColor: 'primary',
    contact: {
      name: 'Vincent Felisat',
      phone: '0604083673',
      email: 'Vincent.felisat@polarisagency.fr',
      website: 'https://www.polarisagency.fr',
    },
    logo: '/partners/polaris.png',
    logoAlt: 'Polaris Agency Logo',
  },
  {
    name: 'D8',
    category: 'Machine à café',
    categoryColor: 'secondary',
    contact: {
      name: 'Julien Pinera',
      phone: '0672289306',
      email: 'jpinera@d8.fr',
      website: 'https://d8.fr',
    },
    logo: '/partners/D8-logo.webp',
    logoAlt: 'D8 Logo',
  },
  {
    name: 'Yaklean',
    category: 'Nettoyage de vitres',
    categoryColor: 'primary',
    contact: {
      name: 'May',
      phone: '0782941349',
      email: 'yakleannettoyage@gmail.com',
      website: 'https://www.yakclean.fr',
    },
    logo: '/partners/Yaklean-logo.png',
    logoAlt: 'Yaklean Logo',
  },
];

const ContactIcon = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {children}
  </svg>
);

export const Fournisseurs: React.FC = () => {
  const { isAuthenticated, isLoading, error, handleLogin, isHashConfigured } = usePasswordProtection();
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [currentDate] = useState(() => 
    new Date().toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  );

  // Debug in development
  if (import.meta.env.DEV) {
    console.log('📄 Fournisseurs page loaded', {
      isAuthenticated,
      isLoading,
      isHashConfigured,
    });
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const success = await handleLogin(password);
    if (!success) {
      setShowError(true);
      setPassword('');
      setTimeout(() => setShowError(false), 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Always show password form if not authenticated
  // If hash is not configured, still show form but with warning
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center p-5">
        <div className="bg-white rounded-3xl p-12 max-w-md w-full shadow-2xl animate-slide-up">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <img 
                src="/logo/FKS_LOGO_B.png" 
                alt="FKS Facility Logo" 
                className="h-12 w-auto object-contain"
              />
            </div>
            <h2 className="text-2xl font-display font-bold text-dark-900 mb-2">
              Accès Protégé
            </h2>
            <p className="text-gray-600 text-sm">
              {!isHashConfigured 
                ? 'Configuration manquante. Veuillez définir VITE_SUPPLIERS_PASSWORD.'
                : 'Veuillez entrer le mot de passe pour accéder à cette page'}
            </p>
            {!isHashConfigured && (
              <p className="text-red-600 text-xs mt-2 font-medium">
                ⚠️ La protection par mot de passe n'est pas configurée
              </p>
            )}
          </div>
          
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-base transition-all focus:outline-none focus:border-primary-600 focus:ring-4 focus:ring-primary-100"
                placeholder="Mot de passe"
                autoComplete="off"
                required
                autoFocus
                disabled={!isHashConfigured}
              />
              {showError && (
                <div className="mt-2 text-red-600 text-sm animate-shake">
                  {error || 'Mot de passe incorrect. Veuillez réessayer.'}
                </div>
              )}
            </div>
            <button 
              type="submit" 
              className="w-full py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl text-base font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isHashConfigured}
            >
              Accéder à la page
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30 font-sans">
      {/* Header with Logo */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center">
            <img 
              src="/logo/FKS_LOGO_B.png" 
              alt="FKS Facility Logo" 
              className="h-10 w-auto object-contain"
            />
          </div>
        </div>
      </header>
      
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 print:hidden">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-dark-900 mb-4">
            Nos Partenaires <span className="text-primary-600">Fournisseurs</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Des partenaires de confiance pour répondre à tous vos besoins professionnels
          </p>
        </div>

        {/* Suppliers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-5xl mx-auto">
          {suppliers.map((supplier) => (
            <div
              key={supplier.name}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 p-6 transition-all hover:-translate-y-1"
            >
              <div className="mb-6">
                <div className={`h-28 flex items-center justify-center p-6 rounded-2xl mb-5 transition-all ${
                  supplier.lightBg 
                    ? 'bg-gradient-to-br from-gray-50 to-white' 
                    : 'bg-gradient-to-br from-primary-50 to-white'
                } group-hover:scale-105 group-hover:shadow-md`}>
                  <img 
                    src={supplier.logo} 
                    alt={supplier.logoAlt}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3 ${
                  supplier.categoryColor === 'primary'
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-secondary-100 text-secondary-700'
                }`}>
                  {supplier.category}
                </div>
                <h3 className="text-2xl font-display font-bold text-dark-900 mb-4">
                  {supplier.name}
                </h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <ContactIcon className="w-5 h-5 text-primary-600 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </ContactIcon>
                  <span className="text-gray-700 font-medium">{supplier.contact.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <ContactIcon className="w-5 h-5 text-primary-600 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </ContactIcon>
                  <a 
                    href={`tel:${supplier.contact.phone.replace(/\s/g, '')}`}
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    {supplier.contact.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <ContactIcon className="w-5 h-5 text-primary-600 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </ContactIcon>
                  <a 
                    href={`mailto:${supplier.contact.email}`}
                    className="text-gray-700 hover:text-primary-600 transition-colors break-all"
                  >
                    {supplier.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <ContactIcon className="w-5 h-5 text-primary-600 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </ContactIcon>
                  <a 
                    href={supplier.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 transition-colors font-medium"
                  >
                    {supplier.contact.website.replace(/^https?:\/\//, '').replace(/^www\./, '')}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center text-gray-500 text-sm print:hidden">
          <p>Page générée le {currentDate}</p>
        </div>
      </div>
    </div>
  );
};

