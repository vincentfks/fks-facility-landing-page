import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ChatWidget } from './components/chat/ChatWidget';
import { ScrollToTop } from './components/layout/ScrollToTop';

// Lazy load pages for better initial performance
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Contact = lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));
const Pricing = lazy(() => import('./pages/Pricing').then(module => ({ default: module.Pricing })));
const About = lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const SolutionsIndex = lazy(() => import('./pages/Solutions').then(module => ({ default: module.SolutionsIndex })));
const SolutionDetail = lazy(() => import('./pages/Solutions/[slug]').then(module => ({ default: module.SolutionDetail })));

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-20">
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
              <Route path="/simuler-mes-economies" element={<Contact />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </BrowserRouter>
  );
}

export default App;
