import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  ArrowUp,
} from 'lucide-react';
import logo from '../assets/logo.png';

type Page = 'home' | 'fleet' | 'destinations' | 'about' | 'contact';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleLinkClick = (page: Page) => {
    onNavigate(page);
    scrollToTop();
  };

  const quickLinks: { page: Page; label: string }[] = [
    { page: 'home', label: 'Home' },
    { page: 'fleet', label: 'Our Fleet' },
    { page: 'destinations', label: 'Destinations' },
    { page: 'about', label: 'About Us' },
    { page: 'contact', label: 'Contact' },
  ];

  const contactInfo = [
    {
      icon: <Phone size={18} />,
      text: '+962 79 7237623',
      href: 'tel:+962797237623',
    },
    {
      icon: <Mail size={18} />,
      text: 'aboveandbelow2014@outlook.com',
      href: 'mailto:aboveandbelow2014@outlook.com',
    },
    {
      icon: <MapPin size={18} />,
      text: 'Aqaba, Jordan',
    },
    {
      icon: (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="h-6 w-6"
        />
      ),
      text: '+962 79 7237623',
      href: 'https://wa.me/962797237623',
      isExternal: true,
    },
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/aboveandbelow.info',
      icon: <Facebook size={20} />,
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/above_and_below_adventures/',
      icon: <Instagram size={20} />,
    },
    {
      name: 'TripAdvisor',
      href:
        'https://www.tripadvisor.com/Attraction_Review-g298101-d7368530-Reviews-Above_and_Below_Adventures_Day_Tours-Aqaba_Al_Aqabah_Governorate.html',
      icon: (
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAY1BMVEU14KE14aI25KQ356Y36acz1ZknpXcfgV0ab1AsuoYRSDQAAAAXYUYbcVEUVj4pq3swyZEz2JskmW4IIBcLLiEde1khimM576wQRDEqsX8TTzkuwosSTjgVWkEikmkghmAGGRIWv5SNAAAA30lEQVR4AdWRBwKCMAxFm9Bi5bNXqMz7n9KAW0/g6x7Z5l8hjhQm8wtbF5+8P8XO8oeICthzgjvJ2eoF3d9c6rMcyIuyqspi32U+dfdXLnBQWyJb46DgpycN2s4D3tp97lo0T7+iFL2I0IAQMJBue6TRwyYuMg6pMZgmGJMOo1xwt8kBsQDIZPdFMgASI/DHo5cZmMV/PJLTq9AMFUPhamiCzHiEYnPUIqKLMlvd1sjtI5QKSJZ1w8G2LglQkbnDVQplcYBboKQVv2fXjKVWZBy1MuVoos/SENEx37f/yBVglg6wZs+jsQAAAABJRU5ErkJggg=="
          alt="TripAdvisor"
          className="h-6 w-6 object-contain"
        />
      ),
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 font-sans">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top row: logo + back-to-top */}
        <div className="flex justify-between items-center pb-8 border-b border-gray-700">
          <div className="flex items-center space-x-4">
            {/* Circle container now exactly 160×160px */}
             {/* circle exactly matches wrapper size, overflow hides extra PNG margin */}
            <div className="bg-white rounded-full h-40 w-40 overflow-hidden flex-shrink-0">
              <img
                src={logo}
                alt="Save Rent A Car Logo"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white tracking-wider">
                SAVE
              </h3>
              <p className="text-amber-400 text-base font-semibold tracking-widest -mt-1">
                RENT A CAR
              </p>
            </div>
          </div>
          <button
            onClick={scrollToTop}
            className="group flex items-center justify-center h-12 w-12 bg-amber-500 rounded-full hover:bg-amber-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-900"
            aria-label="Back to top"
          >
            <ArrowUp className="h-6 w-6 text-white transform group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-10">
          {/* About */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">About Us</h4>
            <p className="text-sm leading-relaxed">
              Your trusted partner for exploring the beautiful kingdom of Jordan.
              Discover its wonders with our reliable fleet and exceptional
              service.
            </p>
            <div className="bg-gray-800 p-3 rounded-lg mt-6">
              <p className="text-gray-400 text-xs">
                Licensed by Jordan Tourism Board
                <br />
                <span className="text-amber-300 font-medium">
                  Reg. No: JTB-2024-001
                </span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(({ page, label }) => (
                <li key={page}>
                  <button
                    onClick={() => handleLinkClick(page)}
                    className="flex items-center text-sm group focus:outline-none"
                  >
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-3 transform scale-0 group-hover:scale-100 transition-transform duration-300" />
                    <span className="group-hover:text-amber-300 group-hover:translate-x-1 transition-all duration-300">
                      {label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Contact Info
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((item, idx) => (
                <li key={idx} className="flex items-center">
                  <span className="text-amber-400 mr-3 flex-shrink-0">
                    {item.icon}
                  </span>
                  <a
                    href={item.href}
                    target={item.isExternal ? '_blank' : '_self'}
                    rel={item.isExternal ? 'noopener noreferrer' : undefined}
                    className="text-sm hover:text-amber-300 transition-colors"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Follow Us
            </h4>
            <div className="flex space-x-3">
              {socialLinks.map(({ href, icon, name }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${name}`}
                  className="bg-gray-700 text-gray-300 p-3 rounded-full hover:bg-amber-500 hover:text-white transform hover:scale-110 transition-all duration-300"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Save Rent A Car. All Rights Reserved.
            <br />
            <span className="mt-2 inline-block">Made with ❤️ in Jordan</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
