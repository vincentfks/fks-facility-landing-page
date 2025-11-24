import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';

const solutions = [
  { name: 'Emballage', path: '/solutions/emballage' },
  { name: 'Espace Bureau', path: '/solutions/bureau' },
  { name: 'Énergie', path: '/solutions/energie' },
  { name: 'Informatique', path: '/solutions/informatique' },
  { name: 'Snacking', path: '/solutions/snacking' },
  { name: 'Transport & Logistique', path: '/solutions/transport' },
];

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const location = useLocation();

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
              <Button variant="outline" className="w-full justify-center">
                Espace Client
              </Button>
            </Link>
            <Link to="/simuler-mes-economies" className="block w-full">
              <Button className="w-full justify-center bg-primary-600">
                Demander à être rappelé(e)
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
