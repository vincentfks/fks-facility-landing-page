import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';

// Lazy load pages for better initial performance
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Contact = lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));
const Pricing = lazy(() => import('./pages/Pricing').then(module => ({ default: module.Pricing })));
const About = lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const SolutionsIndex = lazy(() => import('./pages/Solutions').then(module => ({ default: module.SolutionsIndex })));
const SolutionDetail = lazy(() => import('./pages/Solutions/[slug]').then(module => ({ default: module.SolutionDetail })));
const Simulation = lazy(() => import('./pages/Simulation').then(module => ({ default: module.Simulation })));
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess').then(module => ({ default: module.PaymentSuccess })));
const LegalNotice = lazy(() => import('./pages/LegalNotice').then(module => ({ default: module.LegalNotice })));
const Cookies = lazy(() => import('./pages/Cookies').then(module => ({ default: module.Cookies })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then(module => ({ default: module.PrivacyPolicy })));
const Fournisseurs = lazy(() => import('./pages/Fournisseurs').then(module => ({ default: module.Fournisseurs })));

function AppContent() {
  const location = useLocation();
  const isFournisseursPage = location.pathname === '/fournisseurs';

  return (
    <div className="flex flex-col min-h-screen">
      {!isFournisseursPage && <Header />}
      <main className={`flex-grow ${!isFournisseursPage ? 'pt-20' : ''}`}>
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tarifs" element={<Pricing />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/solutions" element={<SolutionsIndex />} />
            <Route path="/solutions/:slug" element={<SolutionDetail />} />
            <Route path="/simuler-mes-economies" element={<Simulation />} />
            <Route path="/paiement-reussi" element={<PaymentSuccess />} />
            <Route path="/mentions-legales" element={<LegalNotice />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/confidentialite" element={<PrivacyPolicy />} />
            <Route path="/politique-de-confidentialite" element={<PrivacyPolicy />} />
            <Route path="/fournisseurs" element={<Fournisseurs />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
      {!isFournisseursPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
