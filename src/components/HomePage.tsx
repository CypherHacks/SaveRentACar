import React from 'react';
import { Star, ArrowRight, Users, Shield, Clock } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: 'home' | 'fleet' | 'destinations' | 'about' | 'contact') => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  // 👉 Hero image now showing lower portion
  const HERO_BG_URL =
    'https://images.unsplash.com/photo-1599842924676-1998d0ef349a?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  const featuredDestinations = [
    {
      id: 1,
      name: 'Petra',
      image:
        'https://images.pexels.com/photos/1631665/pexels-photo-1631665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Ancient city carved in rose-red sandstone',
      rating: 4.9,
    },
    {
      id: 2,
      name: 'Wadi Rum',
      image:
        'https://images.pexels.com/photos/13458329/pexels-photo-13458329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Spectacular desert landscape and stargazing',
      rating: 4.8,
    },
    {
      id: 3,
      name: 'Dead Sea',
      image:
        "https://images.pexels.com/photos/11589243/pexels-photo-11589243.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Float in the world's saltiest water",
      rating: 4.7,
    },
  ];

  const featuredCars = [
    {
      id: 1,
      name: 'Suzuki Fronx',
      image:
        'https://s3.eu-central-1.amazonaws.com/v3-ncg.motory.com/vehicle-new/466x350/l-1703682111.7024-658c203fab7e7_outbound.webp',
      category: 'Compact SUV',
      price: '45',
      features: ['Auto', 'AC', '5 Seats'],
      rating: 4.6,
    },
    {
      id: 2,
      name: 'Kia Sonet',
      image:
        'https://stimg.cardekho.com/images/carexteriorimages/930x620/Kia/Sonet/9783/1705036728978/front-left-side-47.jpg',
      category: 'SUV',
      price: '50',
      features: ['Auto', 'AC', '5 Seats'],
      rating: 4.5,
    }
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section - Enhanced overlay & interactions */}
      <section
        className="relative h-[600px] bg-cover bg-bottom bg-fixed"
        style={{ backgroundImage: `url('${HERO_BG_URL}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/50 backdrop-blur-sm flex flex-col items-center justify-end pb-24 text-center px-6">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
              Explore Jordan
              <span className="block text-amber-400 mt-3">Your Way</span>
            </h1>

            <p className="text-lg md:text-2xl text-gray-200">
              Discover the wonders of Jordan with our premium car rental service.
              From ancient Petra to the mystical Wadi Rum, embark on an unforgettable journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center pt-6">
              <button
                className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-4 rounded-xl font-semibold transition transform hover:scale-105 duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-amber-700/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                onClick={() => {
                  onNavigate('fleet');
                  document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Book Your Car</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                className="border-2 border-white text-white px-10 py-4 rounded-xl font-semibold transition transform hover:scale-105 duration-300 hover:bg-white hover:text-gray-900 shadow-lg hover:shadow-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                onClick={() => onNavigate('destinations')}
              >
                Explore Destinations
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Elevated cards with scale effect */}
      <section className="py-20 px-4 md:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-14">Why Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { icon: Users, title: 'Easy Booking', text: 'Book in under 2 minutes with our simple process' },
              { icon: Shield, title: 'Fully Insured', text: 'Comprehensive coverage for peace of mind' },
              { icon: Clock, title: '24/7 Support', text: 'Always here to help you on your journey' },
              { icon: Star, title: 'Top Rated', text: '4.8 average rating from our customers' },
            ].map(({ icon: Icon, title, text }, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-8 rounded-2xl hover:shadow-xl hover:scale-105 transform transition duration-300 text-center"
              >
                <div className="bg-amber-100 ring-2 ring-amber-300 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-10 w-10 text-amber-600" />
                </div>
                <h3 className="font-semibold text-xl mb-3">{title}</h3>
                <p className="text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations - Interactive cards */}
      <section className="py-20 px-4 md:px-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4">Featured Destinations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover Jordan's most breathtaking locations with our curated selection of must-visit destinations
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredDestinations.map((dest) => (
              <div
                key={dest.id}
                className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transform transition duration-300 bg-white"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      <span className="text-white font-medium">{dest.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{dest.name}</h3>
                  <p className="text-gray-600 mb-4">{dest.description}</p>
                  <button
                    className="text-amber-600 font-semibold hover:text-amber-700 transition transform hover:translate-x-1 duration-300 flex items-center space-x-2 group-hover:underline focus:outline-none"
                    onClick={() => onNavigate('destinations')}
                  >
                    <span>Discover More</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <button
              className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-4 rounded-xl font-semibold transition transform hover:scale-105 duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              onClick={() => onNavigate('destinations')}
            >
              View All Destinations
            </button>
          </div>
        </div>
      </section>

      {/* Featured Cars - Polished card layout */}
      <section className="py-20 px-4 md:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4">Featured Vehicles</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our premium selection of vehicles for your Jordan adventure
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-10">
            {featuredCars.map((car) => (
              <div
                key={car.id}
                className="w-full sm:w-[calc(50%-40px)] lg:w-[calc(40%-40px)] group rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-300 bg-white border border-gray-100"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-amber-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    ${car.price}/day
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-2xl font-bold">{car.name}</h3>
                      <p className="text-gray-500">{car.category}</p>
                    </div>
                    <div className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium">{car.rating}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-4 mb-6">
                    {car.features.map((feature, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-800 text-xs px-4 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <button
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl font-semibold transition transform hover:scale-105 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                    onClick={() => onNavigate('fleet')}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <button
              className="bg-gray-900 hover:bg-gray-800 text-white px-10 py-4 rounded-xl font-semibold transition transform hover:scale-105 duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              onClick={() => onNavigate('fleet')}
            >
              View Full Fleet
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action - Subtle animation */}
      <section className="py-20 px-4 md:px-16 bg-gradient-to-r from-amber-600 to-amber-500 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready for Your Jordan Adventure?</h2>
          <p className="text-xl md:text-2xl">
            Book your perfect vehicle today and start exploring Jordan's wonders with confidence
          </p>
          <button
            className="bg-white text-amber-600 hover:bg-gray-100 px-10 py-4 rounded-xl font-semibold text-lg transition transform hover:scale-105 duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
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
