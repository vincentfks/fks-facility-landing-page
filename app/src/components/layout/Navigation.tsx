import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowLeft } from 'lucide-react';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { MultiStepForm } from '../forms/MultiStepForm';
import { api } from '../../lib/api';

const solutions = [
  { name: 'Emballage', path: '/solutions/emballage' },
  { name: 'Espace Bureau', path: '/solutions/bureau' },
  // { name: 'Énergie', path: '/solutions/energie' },
  { name: 'Informatique', path: '/solutions/informatique' },
  { name: 'Nettoyage', path: '/solutions/nettoyage' },
  { name: 'Snacking', path: '/solutions/snacking' },
  { name: 'Transport & Logistique', path: '/solutions/transport' },
  { name: 'Design marque', path: '/solutions/design-marque' },
];

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [showOfferForm, setShowOfferForm] = useState(false);
  const location = useLocation();

  const handleOfferFormSubmit = async (data: any) => {
    try {
      await api.submitContact({
        ...data,
        source: 'offre-du-moment',
      });
    } catch (error) {
      console.error('Form submission error:', error);
      throw error;
    }
  };

  const handleCloseModal = () => {
    setOfferModalOpen(false);
    setShowOfferForm(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setSolutionsOpen(false);
  }, [location]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <style>{`
        @keyframes neon-blink {
          0%, 100% {
            opacity: 1;
            text-shadow: 0 0 10px rgba(239, 68, 68, 0.8), 0 0 20px rgba(239, 68, 68, 0.6), 0 0 30px rgba(239, 68, 68, 0.4);
            box-shadow: 0 0 10px rgba(239, 68, 68, 0.5), inset 0 0 10px rgba(239, 68, 68, 0.2);
          }
          50% {
            opacity: 0.7;
            text-shadow: 0 0 5px rgba(239, 68, 68, 0.4), 0 0 10px rgba(239, 68, 68, 0.3), 0 0 15px rgba(239, 68, 68, 0.2);
            box-shadow: 0 0 5px rgba(239, 68, 68, 0.3), inset 0 0 5px rgba(239, 68, 68, 0.1);
          }
        }
      `}</style>
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled 
          ? "bg-white/80 backdrop-blur-md border-gray-200/50 py-2 shadow-sm" 
          : "bg-transparent border-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img 
              src="/logo/FKS_LOGO_B.png" 
              alt="FKS Facility Logo" 
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Offre du moment - Neon blinking button */}
            <button
              onClick={() => setOfferModalOpen(true)}
              className="relative px-4 py-2 text-sm font-bold text-red-500 rounded-lg overflow-hidden mr-2"
              style={{
                animation: 'neon-blink 1.5s ease-in-out infinite',
              }}
            >
              <span className="relative z-10">Offre du moment</span>
            </button>
            
            <div className="relative group px-3">
              <button
                className={cn(
                  'flex items-center space-x-1 text-sm font-medium transition-colors py-2',
                  solutionsOpen ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'
                )}
                onMouseEnter={() => setSolutionsOpen(true)}
                onMouseLeave={() => setSolutionsOpen(false)}
              >
                <span>Nos solutions</span>
                <ChevronDown className={cn('w-4 h-4 transition-transform duration-200', solutionsOpen && 'rotate-180')} />
              </button>
              
              {/* Dropdown Menu */}
              <div
                className={cn(
                  "absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64 transition-all duration-200 origin-top",
                  solutionsOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
                )}
                onMouseEnter={() => setSolutionsOpen(true)}
                onMouseLeave={() => setSolutionsOpen(false)}
              >
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-2 overflow-hidden">
                  {solutions.map((solution) => (
                    <Link
                      key={solution.path}
                      to={solution.path}
                      className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-700 rounded-lg transition-colors"
                    >
                      {solution.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              to="/a-propos"
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors rounded-full hover:bg-gray-50',
                isActive('/a-propos') ? 'text-primary-600 bg-primary-50/50' : 'text-gray-600 hover:text-primary-600'
              )}
            >
              À propos
            </Link>
            <Link
              to="/tarifs"
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors rounded-full hover:bg-gray-50',
                isActive('/tarifs') ? 'text-primary-600 bg-primary-50/50' : 'text-gray-600 hover:text-primary-600'
              )}
            >
              Tarifs
            </Link>
            <a
              href="/#temoignages"
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors rounded-full hover:bg-gray-50',
                'text-gray-600 hover:text-primary-600'
              )}
            >
              Témoignages
            </a>
            
            <div className="w-px h-6 bg-gray-200 mx-4" />
            
            <Link to="/contact">
               <Button variant="ghost" size="sm" className="text-gray-600 hover:text-primary-600">
                 Contact
               </Button>
            </Link>
            <Link to="/simuler-mes-economies">
              <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white shadow-lg shadow-primary-500/20 border-0 ml-2">
                Simulation gratuite
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          "lg:hidden fixed inset-x-0 top-16 bg-white border-b border-gray-200 shadow-xl transition-all duration-300 ease-in-out overflow-hidden",
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
          <div className="px-4 py-6 space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
          {/* Mobile Offre du moment */}
          <button
            onClick={() => {
              setOfferModalOpen(true);
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-3 text-sm font-bold text-red-500 rounded-lg mb-2"
            style={{
              animation: 'neon-blink 1.5s ease-in-out infinite',
            }}
          >
            Offre du moment
          </button>
          
          <div>
            <button
              className="flex items-center justify-between w-full text-gray-900 font-medium py-2"
              onClick={() => setSolutionsOpen(!solutionsOpen)}
            >
              <span>Nos solutions</span>
              <ChevronDown className={cn('w-4 h-4 transition-transform', solutionsOpen && 'rotate-180')} />
            </button>
            <div className={cn(
              "space-y-1 overflow-hidden transition-all duration-300",
              solutionsOpen ? "max-h-96 mt-2" : "max-h-0"
            )}>
              {solutions.map((solution) => (
                <Link
                  key={solution.path}
                  to={solution.path}
                  className="block py-2.5 px-4 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg"
                >
                  {solution.name}
                </Link>
              ))}
            </div>
          </div>
          <Link
            to="/a-propos"
            className="block text-gray-900 font-medium py-2 border-t border-gray-100"
          >
            À propos
          </Link>
          <Link
            to="/tarifs"
            className="block text-gray-900 font-medium py-2 border-t border-gray-100"
          >
            Tarifs
          </Link>
          <Link
            to="/contact"
            className="block text-gray-900 font-medium py-2 border-t border-gray-100"
          >
            Contact
          </Link>
          <div className="pt-4 space-y-3">
            <Link to="/contact" className="block w-full">
              <Button className="w-full justify-center bg-primary-600">
                Demander à être rappelé(e)
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Offer Modal */}
      <Modal
        isOpen={offerModalOpen}
        onClose={handleCloseModal}
        size="xl"
        title=""
      >
        <div className="relative">
          {/* Close button in top right */}
          <button
            onClick={handleCloseModal}
            className="absolute top-0 right-0 p-2 rounded-lg hover:bg-gray-100 transition-colors z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          {!showOfferForm ? (
            <>
              {/* Main Content */}
              <div className="space-y-6">
                {/* Title */}
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">PAPIER A4 – 80GR</h2>
                  <div className="bg-red-50 border-2 border-red-500 rounded-lg px-4 py-2 inline-block mb-2">
                    <p className="text-red-700 font-bold text-lg">
                      ⏰ Offre du 1er février au 28 février
                    </p>
                  </div>
                </div>

                {/* Offer Image */}
                <div className="relative w-full flex justify-center">
                  <img
                    src="/offres/Bruneau fevrier.png"
                    alt="Offre spéciale papier A4 - Février"
                    className="max-w-3xl w-full h-auto rounded-lg shadow-lg"
                    onError={(e) => {
                      // Fallback if image doesn't exist
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>

                {/* Products Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Product 1 - Bruneau */}
                  <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                    <div className="text-sm text-gray-600 mb-2">Réf 15101</div>
                    <div className="bg-red-100 border border-red-300 rounded-lg p-2 mb-3">
                      <div className="text-xs text-red-700 font-semibold mb-1">PRIX PUBLIC</div>
                      <div className="text-xl font-bold text-red-700 line-through">5,99 € HT</div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">2,90 € HT</div>
                    <div className="bg-green-100 border border-green-300 rounded-lg p-2 mb-2">
                      <div className="text-lg font-bold text-green-700">
                        Économisez 3,09 € HT (-52%)
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      Bruneau ReproSpeed Classic
                    </div>
                  </div>

                  {/* Product 2 - Clairefontaine */}
                  <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                    <div className="text-sm text-gray-600 mb-2">Réf 17105</div>
                    <div className="bg-red-100 border border-red-300 rounded-lg p-2 mb-3">
                      <div className="text-xs text-red-700 font-semibold mb-1">PRIX PUBLIC</div>
                      <div className="text-xl font-bold text-red-700 line-through">4,99 € HT</div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">3,60 € HT</div>
                    <div className="bg-green-100 border border-green-300 rounded-lg p-2 mb-2">
                      <div className="text-lg font-bold text-green-700">
                        Économisez 1,39 € HT (-28%)
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      Clairalfa Clairefontaine
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="text-gray-600 mb-2">
                    Profitez de cette offre exceptionnelle !
                  </p>
                  <p className="text-red-600 font-semibold mb-4">
                    ⏰ Offre valable du 1er février au 28 février
                  </p>
                  <Button 
                    onClick={() => setShowOfferForm(true)}
                    className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-3"
                  >
                    Profiter de l'offre
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Back button */}
              <button
                onClick={() => setShowOfferForm(false)}
                className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à l'offre
              </button>

              {/* Form Content */}
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Profitez de notre offre spéciale
                  </h2>
                  <p className="text-gray-600">
                    Remplissez le formulaire pour bénéficier de cette offre exceptionnelle
                  </p>
                </div>
                <MultiStepForm 
                  onSubmit={handleOfferFormSubmit}
                  onSuccess={() => {
                    setTimeout(() => {
                      handleCloseModal();
                    }, 2000);
                  }}
                />
              </div>
            </>
          )}
        </div>
      </Modal>
    </nav>
    </>
  );
};
