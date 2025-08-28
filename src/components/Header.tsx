import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin, Home, Car, Users, Phone } from 'lucide-react';
import logo from '../assets/logo.png';

// Define the Page type here (or import it if defined elsewhere)
type Page = 'home' | 'fleet' | 'destinations' | 'about' | 'contact';

interface HeaderProps {
  currentPage: Page; // Change from string to Page
  onNavigate: (page: Page) => void; // Change from string to Page
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home' as Page, label: 'Home', icon: Home },
    { id: 'destinations' as Page, label: 'Destinations', icon: MapPin },
    { id: 'fleet' as Page, label: 'Fleet', icon: Car },
    { id: 'about' as Page, label: 'About Us', icon: Users },
    { id: 'contact' as Page, label: 'Contact', icon: Phone },
  ];

  return (
    <header
      className={`bg-gradient-to-r from-yellow-100 via-yellow-200 to-sky-200 backdrop-blur-md sticky top-0 z-50 border-b transition-all duration-300 ${
        isScrolled ? 'border-yellow-300 shadow-md' : 'border-yellow-200 shadow-sm'
      }`}
    >
      <div className="w-full">
        <div className="flex justify-between items-center h-24 px-6 lg:px-8">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-4 focus:outline-none"
            aria-label="Go to home page"
          >
            <div className="relative group">
              <img
                src={logo}
                alt="Save Rent A Car Logo"
                className="h-24 w-24 object-contain transition-all duration-300 group-hover:rotate-[5deg] group-hover:scale-105"
              />
              <div className="absolute -inset-2 rounded-full border-2 border-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Save Rent A Car
              </h1>
              <p className="text-sm font-semibold text-yellow-700 drop-shadow-sm">
                Aqaba
              </p>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className={`relative flex items-center space-x-2 px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  currentPage === id
                    ? 'text-yellow-900 bg-white shadow-md ring-1 ring-yellow-300'
                    : 'text-gray-700 hover:text-yellow-900 hover:bg-white/90 hover:shadow-sm'
                }`}
              >
                <Icon
                  className={`h-4 w-4 transition-colors ${
                    currentPage === id
                      ? 'text-yellow-700'
                      : 'text-gray-600 group-hover:text-yellow-700'
                  }`}
                />
                <span>{label}</span>
                {currentPage === id && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4/5 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-3 rounded-lg text-gray-700 hover:text-yellow-900 hover:bg-white/90 transition-all duration-300 shadow-sm hover:shadow-md"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 animate-spin-in" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-gradient-to-b from-yellow-100 to-sky-200 border-t border-yellow-200 animate-fade-in">
            <nav className="flex flex-col space-y-2 mt-2 mx-4 pb-4">
              {navItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => {
                    onNavigate(id);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center space-x-3 px-5 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    currentPage === id
                      ? 'text-yellow-900 bg-white shadow-inner ring-1 ring-yellow-300'
                      : 'text-gray-700 hover:text-yellow-900 hover:bg-white/90'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                  {currentPage === id && <span className="ml-auto h-2 w-2 bg-yellow-500 rounded-full animate-pulse" />}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;