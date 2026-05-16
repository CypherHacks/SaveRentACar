// App.tsx
import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';

const FleetPage = lazy(() => import('./components/FleetPage'));
const DestinationsPage = lazy(() => import('./components/DestinationsPage'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const ContactPage = lazy(() => import('./components/ContactPage'));

type Page = 'home' | 'fleet' | 'destinations' | 'about' | 'contact';

const validPages: Page[] = ['home', 'fleet', 'destinations', 'about', 'contact'];

function getPageFromHash(): Page {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash.replace('#', '');
  return validPages.includes(hash as Page) ? (hash as Page) : 'home';
}

function PageFallback() {
  return (
    <div className="flex items-center justify-center py-32" role="status" aria-label="Loading page">
      <div className="h-10 w-10 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
    </div>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(getPageFromHash);

  const handleNavigate = useCallback((page: Page) => {
    window.location.hash = page === 'home' ? '' : page;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    const onHashChange = () => setCurrentPage(getPageFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'fleet':
        return <FleetPage />;
      case 'destinations':
        return <DestinationsPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-grow">
        <Suspense fallback={<PageFallback />}>{renderPage()}</Suspense>
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
