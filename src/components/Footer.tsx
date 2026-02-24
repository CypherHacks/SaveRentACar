import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  ArrowUp,
} from 'lucide-react';
import { SiFacebook, SiInstagram, SiTripadvisor, SiWhatsapp } from 'react-icons/si';
import logo from '../assets/logo.png';

type Page = 'home' | 'fleet' | 'destinations' | 'about' | 'contact';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () =>
    globalThis.scrollTo({ top: 0, behavior: 'smooth' });

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
      icon: <Phone size={16} />,
      text: '+962 79 7237623',
      href: 'tel:+962797237623',
    },
    {
      icon: <Mail size={16} />,
      text: 'aboveandbelow2014@outlook.com',
      href: 'mailto:aboveandbelow2014@outlook.com',
    },
    {
      icon: <MapPin size={16} />,
      text: 'Aqaba, Jordan',
    },
    {
      icon: <SiWhatsapp size={14} />,
      text: 'WhatsApp',
      href: 'https://wa.me/962797237623',
      isExternal: true,
    },
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/aboveandbelow.info',
      icon: <SiFacebook size={14} />,
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/above_and_below_adventures/',
      icon: <SiInstagram size={14} />,
    },
    {
      name: 'TripAdvisor',
      href:
        'https://www.tripadvisor.com/Attraction_Review-g298101-d7368530-Reviews-Above_and_Below_Adventures_Day_Tours-Aqaba_Al_Aqabah_Governorate.html',
      icon: <SiTripadvisor size={14} />,
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/962797237623',
      icon: <SiWhatsapp size={14} />,
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-white overflow-hidden flex-shrink-0">
              <img
                src={logo}
                alt="Save Rent A Car Logo"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="text-white text-base font-semibold tracking-wide">Save Rent A Car</p>
              <p className="text-xs text-amber-300">Aqaba, Jordan</p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {quickLinks.map(({ page, label }) => (
              <button
                key={page}
                onClick={() => handleLinkClick(page)}
                className="text-sm text-gray-300 hover:text-amber-300 transition-colors"
              >
                {label}
              </button>
            ))}
          </nav>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-gray-800 text-gray-200 hover:bg-amber-500 hover:text-white transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 border-t border-gray-800 pt-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {contactInfo.map((item) => {
              const itemKey = `${item.text}-${item.href ?? 'label'}`;

              if (!item.href) {
                return (
                  <span key={itemKey} className="inline-flex items-center gap-2 text-sm text-gray-400">
                    <span className="text-amber-300">{item.icon}</span>
                    {item.text}
                  </span>
                );
              }

              return (
                <a
                  key={itemKey}
                  href={item.href}
                  target={item.isExternal ? '_blank' : undefined}
                  rel={item.isExternal ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-amber-300 transition-colors"
                >
                  <span className="text-amber-300">{item.icon}</span>
                  {item.text}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            {socialLinks.map(({ href, icon, name }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${name}`}
                className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-800 text-gray-300 hover:bg-amber-500 hover:text-white transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-5 border-t border-gray-800 pt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Save Rent A Car. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">Licensed by Jordan Tourism Board • Reg. No: JTB-2024-001</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
