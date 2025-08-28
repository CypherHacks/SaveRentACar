// src/components/ContactPage.tsx
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    hp: '', // honeypot (must stay empty)
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);

  const contactInfo = [
    { icon: Phone, title: 'Call Us', details: ['+962 79 7237623'], description: 'Available during business hours' },
    { icon: Mail, title: 'Email Us', details: ['aboveandbelow2014@outlook.com'], description: 'We respond within 24 hours' },
    { icon: MapPin, title: 'Visit Us', details: ['Royal Yacht Club, Aqaba'], description: 'Open daily 8:00 AM - 8:00 PM' },
    { icon: Clock, title: 'Business Hours', details: ['Mon-Sun: 8:00 AM - 8:00 PM'], description: 'Always here when you need us' }
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      // You can switch this to '/api/contact' after verifying the redirect works.
      const res = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      console.log('contact status', res.status, res.headers.get('content-type'));
      const ct = res.headers.get('content-type') || '';
      const payload = ct.includes('application/json') ? await res.json() : { error: await res.text() };
      console.log('contact payload', payload);

      if (!res.ok || !('ok' in payload && payload.ok === true)) {
        throw new Error(payload.error || `HTTP ${res.status}`);
      }

      setStatus({ ok: true, msg: 'Message sent! We’ll get back to you shortly.' });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '', hp: '' });
    } catch (err: any) {
      setStatus({ ok: false, msg: err?.message || 'Network error. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Have questions about our services or need assistance? We're here to help you plan the perfect Jordan adventure.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactInfo.map((info, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <info.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{info.title}</h3>
              {info.details.map((d, idx) => (
                <p key={idx} className="text-gray-700 font-medium">{d}</p>
              ))}
              <p className="text-sm text-gray-500 mt-2">{info.description}</p>
            </div>
          ))}
        </div>

        {/* Direct-to-Gmail Contact Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Send Us a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Honeypot field (hidden) */}
            <input
              type="text"
              name="hp"
              value={formData.hp}
              onChange={handleInputChange}
              className="hidden"
              autoComplete="off"
              tabIndex={-1}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="+962 XX XXX XXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                <select
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a subject</option>
                  <option value="booking">Car Booking Inquiry</option>
                  <option value="destinations">Destination Information</option>
                  <option value="pricing">Pricing Questions</option>
                  <option value="support">Customer Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
              <textarea
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Tell us how we can help you..."
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`w-full text-white py-4 rounded-lg font-semibold flex items-center justify-center space-x-2
              ${submitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              <Send className="h-5 w-5" />
              <span>{submitting ? 'Sending...' : 'Send Message'}</span>
            </button>

            {status && (
              <p className={`text-sm mt-2 ${status.ok ? 'text-green-600' : 'text-red-600'}`}>
                {status.msg}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
