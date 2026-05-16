// src/components/HomePage.tsx
import React from 'react';
import { Star, ArrowRight, Users, Shield, Clock } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: 'home' | 'fleet' | 'destinations' | 'about' | 'contact') => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const featuredDestinations = [
    {
      id: 1,
      name: 'Petra',
      slug: 'petra',
      description: 'Ancient city carved in rose-red sandstone',
      rating: 4.9,
    },
    {
      id: 2,
      name: 'Wadi Rum',
      slug: 'wadirum',
      description: 'Spectacular desert landscape and stargazing',
      rating: 4.8,
    },
    {
      id: 3,
      name: 'Dead Sea',
      slug: 'deadsea',
      description: "Float in the world's saltiest water",
      rating: 4.7,
    },
  ];

  const whyFeatures = [
    { icon: Users, title: 'Easy Booking', text: 'Book in under 2 minutes with our simple process' },
    { icon: Shield, title: 'Fully Insured', text: 'Comprehensive coverage for peace of mind' },
    { icon: Clock, title: '24/7 Support', text: 'Always here to help you on your journey' },
    { icon: Star, title: 'Top Rated', text: '4.8 average rating from our customers' },
  ];

  const featuredCars = [
    {
      id: 1,
      name: 'Suzuki Fronx',
      slug: 'fronx',
      smallW: 466,
      largeW: 800,
      category: 'Compact SUV',
      price: 45,
      features: ['Automatic', 'AC', '5 Seats'],
      rating: 4.6,
      colors: ['Silver', 'Black', 'White'],
    },
    {
      id: 2,
      name: 'Kia Sonet',
      slug: 'sonet',
      smallW: 600,
      largeW: 1000,
      category: 'SUV',
      price: 50,
      features: ['Automatic', 'AC', '5 Seats'],
      rating: 4.5,
      colors: ['Red', 'Blue', 'Gray'],
    },
  ];

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden bg-stone-900">
        <picture>
          <source
            type="image/webp"
            srcSet="/img/hero-640.webp 640w, /img/hero-960.webp 960w, /img/hero-1280.webp 1280w, /img/hero-1600.webp 1600w, /img/hero-1920.webp 1920w"
            sizes="100vw"
          />
          <img
            src="/img/hero-1280.jpg"
            srcSet="/img/hero-640.jpg 640w, /img/hero-960.jpg 960w, /img/hero-1280.jpg 1280w, /img/hero-1600.jpg 1600w, /img/hero-1920.jpg 1920w"
            sizes="100vw"
            alt="Scenic Jordan desert road"
            fetchPriority="high"
            decoding="async"
            width={1920}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/70"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <div className="mb-4">
            <span className="bg-amber-600 text-white px-4 py-1.5 rounded-full text-sm font-medium tracking-wide">
              PREMIUM RENTAL EXPERIENCE
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-xl tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-white">
              Explore Jordan
            </span>
            <span className="block mt-4 bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
              Your Way
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-gray-200 font-light leading-relaxed">
            Discover the wonders of Jordan with our premium car rental service. From ancient Petra to
            the mystical Wadi Rum, embark on an unforgettable journey.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-5">
            <button
              className="relative bg-gradient-to-r from-amber-600 to-amber-700 text-white px-10 py-4 rounded-full font-bold tracking-wide transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl hover:shadow-amber-700/40 group overflow-hidden"
              onClick={() => {
                onNavigate('fleet')
                document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <span className="relative z-10">Book Your Car</span>
              <ArrowRight className="h-5 w-5 relative z-10 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button
              className="relative border-2 border-white text-white px-10 py-4 rounded-full font-bold tracking-wide transition-all duration-300 hover:bg-white/10 shadow-lg hover:shadow-white/10 group overflow-hidden"
              onClick={() => onNavigate('destinations')}
            >
              <span className="relative z-10">Explore Destinations</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Glassmorphism cards */}
      <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-grid-8"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Why Choose Us
            </h2>
            <div className="mt-4 h-1 w-20 bg-amber-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyFeatures.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="bg-white/80 backdrop-blur-lg border border-white/30 p-8 rounded-2xl hover:shadow-xl hover:-translate-y-2 transform transition-all duration-300 text-center relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <Icon className="h-10 w-10 text-amber-600" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-800">{title}</h3>
                <p className="text-gray-600 font-light">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations - Modern cards with gradient overlays */}
      <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-gray-100 to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Featured Destinations
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-600 font-light">
              Discover Jordan's most breathtaking locations with our curated selection of must-visit
              destinations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDestinations.map((dest) => (
              <div
                key={dest.id}
                className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-80 overflow-hidden">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={`/img/${dest.slug}-480.webp 480w, /img/${dest.slug}-800.webp 800w`}
                      sizes="(min-width: 768px) 33vw, 100vw"
                    />
                    <img
                      src={`/img/${dest.slug}-800.jpg`}
                      srcSet={`/img/${dest.slug}-480.jpg 480w, /img/${dest.slug}-800.jpg 800w`}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      alt={`${dest.name} – ${dest.description}`}
                      loading="lazy"
                      decoding="async"
                      width={800}
                      height={534}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex justify-between items-end">
                      <div>
                        <h3 className="text-2xl font-bold text-white">{dest.name}</h3>
                        <p className="text-gray-200 mt-1">{dest.description}</p>
                      </div>
                      <span className="flex items-center bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        <Star className="h-4 w-4 mr-1" /> {dest.rating}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-4 right-4">
                  <button
                    className="bg-white/90 hover:bg-white text-gray-900 rounded-full p-3 shadow-md transition-all duration-300 transform hover:scale-110"
                    onClick={() => onNavigate('destinations')}
                    aria-label={`Explore ${dest.name}`}
                  >
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vehicles - Modern cards with color accents */}
      <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Featured Vehicles
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-600 font-light">
              Choose from our premium selection of vehicles for your Jordan adventure
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {featuredCars.map((car) => (
              <div
                key={car.id}
                className="relative group rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 bg-white border border-gray-100"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-2/5 bg-gradient-to-b from-gray-50 to-gray-100 p-6 flex items-center justify-center">
                    <picture>
                      <source
                        type="image/webp"
                        srcSet={`/img/${car.slug}-${car.smallW}.webp ${car.smallW}w, /img/${car.slug}-${car.largeW}.webp ${car.largeW}w`}
                        sizes="(min-width: 1024px) 40vw, (min-width: 768px) 40vw, 100vw"
                      />
                      <img
                        src={`/img/${car.slug}-${car.largeW}.jpg`}
                        srcSet={`/img/${car.slug}-${car.smallW}.jpg ${car.smallW}w, /img/${car.slug}-${car.largeW}.jpg ${car.largeW}w`}
                        sizes="(min-width: 1024px) 40vw, (min-width: 768px) 40vw, 100vw"
                        alt={`${car.name} ${car.category} rental car`}
                        loading="lazy"
                        decoding="async"
                        width={car.largeW}
                        height={Math.round((car.largeW * 350) / 466)}
                        className="object-contain h-56 w-full transition-transform duration-500 group-hover:scale-105"
                      />
                    </picture>
                  </div>
                  
                  <div className="md:w-3/5 p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold mb-3">
                          {car.category}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{car.name}</h3>
                      </div>
                      <span className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                        <Star className="h-4 w-4 mr-1 text-amber-500" /> {car.rating}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {car.features.map((feat) => (
                        <span
                          key={`${car.id}-${feat}`}
                          className="bg-gray-50 text-gray-700 text-xs px-3 py-2 rounded-lg font-medium border border-gray-100"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mb-6">
                      <div className="text-xs text-gray-500 font-medium mb-2">AVAILABLE COLORS</div>
                      <div className="flex space-x-2">
                        {car.colors.map((color) => (
                          <div
                            key={`${car.id}-${color}`}
                            className={`w-6 h-6 rounded-full border border-gray-200`}
                            style={{ backgroundColor: color.toLowerCase() }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-bold text-amber-600">
                        JD{car.price}
                        <span className="text-sm font-normal text-gray-500">/day</span>
                      </div>
                      <button
                        onClick={() => onNavigate('fleet')}
                        className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-lg shadow hover:shadow-lg transition-all duration-300"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <button
              onClick={() => onNavigate('fleet')}
              className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white px-12 py-4 rounded-full font-bold tracking-wide shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden"
            >
              <span className="relative z-10">View Full Fleet</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action - Enhanced gradient section */}
      <section className="py-24 px-4 md:px-16 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
            <span className="font-semibold tracking-wider">START YOUR JOURNEY</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready for Your Jordan Adventure?
          </h2>
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto mb-10">
            Book your perfect vehicle today and start exploring Jordan's wonders with confidence
          </p>
          <button
            className="bg-white text-amber-600 px-12 py-5 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1"
            onClick={() => onNavigate('fleet')}
          >
            Reserve Your Car Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;