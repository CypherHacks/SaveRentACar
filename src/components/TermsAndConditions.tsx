import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  ChevronDown,
  CreditCard,
  FileText,
  ShieldCheck,
  Car,
  Users,
  Lock,
  BadgeCheck,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Section {
  id: string;
  icon: React.ReactNode;
  title: string;
  items: (string | { text: string })[];
}

const sections: Section[] = [
  {
    id: 'license',
    icon: <BadgeCheck className="h-5 w-5" />,
    title: "Driver\u2019s License",
    items: [
      'A valid driver\u2019s license from your country of origin is required and must have been held for at least one year.',
      'An International Driving Permit (IDP) is recommended if your license is not in English or Arabic, as it provides an official translation.',
    ],
  },
  {
    id: 'age',
    icon: <Users className="h-5 w-5" />,
    title: 'Age Requirements',
    items: [
      'Minimum rental age is generally 21, but some companies may require drivers to be 23 or 25.',
      'Drivers under 25 may incur an underage driver fee.',
    ],
  },
  {
    id: 'payment',
    icon: <CreditCard className="h-5 w-5" />,
    title: 'Payment & Deposit',
    items: [
      'A major credit card in the renter\u2019s name is required for payment and security deposit.',
      'Debit cards may be accepted for rental charges but not for the deposit.',
      'A refundable security deposit is held and returned when the vehicle is returned in good condition.',
    ],
  },
  {
    id: 'agreement',
    icon: <FileText className="h-5 w-5" />,
    title: 'Rental Agreement Obligations',
    items: [
      'The rental agreement outlines the rental period, fees, and renter responsibilities.',
      'Renter pays for all fuel consumed during the rental period.',
      'Renter is responsible for any traffic fines or speeding tickets incurred.',
      'Collision Damage Waiver (CDW) and Theft Protection may be included; without CDW, renter may be liable for full vehicle value.',
      'Vehicle must be returned in the same condition it was received.',
    ],
  },
  {
    id: 'other',
    icon: <ShieldCheck className="h-5 w-5" />,
    title: 'Other Important Terms',
    items: [
      'Vehicles may not be used for illegal activities or to transport goods/passengers for payment.',
      'Only authorized drivers listed on the agreement are permitted to drive.',
      'Familiarize yourself with local traffic laws and regulations.',
    ],
  },
  {
    id: 'transfer',
    icon: <Car className="h-5 w-5" />,
    title: 'Private Transfer Services',
    items: [
      {
        text: 'All the above terms and conditions also apply to our private transfer services. By booking a transfer, you agree to the same driver, age, payment, and liability requirements as the car rental.',
      },
    ],
  },
  {
    id: 'privacy',
    icon: <Lock className="h-5 w-5" />,
    title: 'Privacy Policy',
    items: [
      {
        text: 'We collect personal information (name, contact details, pickup/drop-off location) solely to process your booking or transfer request. We do not share your data with third parties except as necessary to fulfill your reservation (e.g., payment gateway, local authorities).',
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Accordion row                                                      */
/* ------------------------------------------------------------------ */

const AccordionItem: React.FC<{
  section: Section;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ section, isOpen, onToggle }) => (
  <div className="border-b border-gray-100 last:border-b-0">
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
      aria-expanded={isOpen}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
        {section.icon}
      </span>
      <span className="flex-1 text-sm font-semibold text-gray-800">
        {section.title}
      </span>
      <ChevronDown
        className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
          isOpen ? 'rotate-180' : ''
        }`}
      />
    </button>

    <div
      className={`overflow-hidden transition-all duration-200 ${
        isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="px-5 pb-5 pl-[4.25rem]">
        <ul className="space-y-2 text-sm leading-relaxed text-gray-600">
          {section.items.map((item, i) => {
            const text = typeof item === 'string' ? item : item.text;
            return (
              <li key={`${section.id}-${i}`} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                <span>{text}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Modal                                                              */
/* ------------------------------------------------------------------ */

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsAndConditions: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      globalThis.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      globalThis.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const toggle = (id: string) =>
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const expandAll = () =>
    setOpenSections(new Set(sections.map((s) => s.id)));

  const collapseAll = () => setOpenSections(new Set());

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-default"
        onClick={onClose}
        aria-label="Close terms modal"
        tabIndex={-1}
      />
      <dialog
        open
        className="relative flex max-h-[85vh] w-full max-w-2xl flex-col rounded-2xl bg-white shadow-2xl m-0 p-0 border-0"
        aria-label="Terms and Conditions"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Terms &amp; Conditions
            </h2>
            <p className="mt-0.5 text-xs text-gray-500">
              Please read carefully before confirming your booking
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Expand / Collapse controls */}
        <div className="flex gap-3 border-b border-gray-50 px-6 py-2.5">
          <button
            type="button"
            onClick={expandAll}
            className="text-xs font-medium text-amber-600 hover:text-amber-700 transition-colors"
          >
            Expand all
          </button>
          <span className="text-gray-300">|</span>
          <button
            type="button"
            onClick={collapseAll}
            className="text-xs font-medium text-amber-600 hover:text-amber-700 transition-colors"
          >
            Collapse all
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {sections.map((section) => (
            <AccordionItem
              key={section.id}
              section={section}
              isOpen={openSections.has(section.id)}
              onToggle={() => toggle(section.id)}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            I understand
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default TermsAndConditions;
