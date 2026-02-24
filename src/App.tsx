// App.tsx
import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import FleetPage from './components/FleetPage';
import DestinationsPage from './components/DestinationsPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';

type Page = 'home' | 'fleet' | 'destinations' | 'about' | 'contact';

const validPages: Page[] = ['home', 'fleet', 'destinations', 'about', 'contact'];

function getPageFromHash(): Page {
  const hash = window.location.hash.replace('#', '');
  return validPages.includes(hash as Page) ? (hash as Page) : 'home';
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(getPageFromHash);

  const handleNavigate = useCallback((page: Page) => {
    window.location.hash = page === 'home' ? '' : page;
    setCurrentPage(page);
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
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
