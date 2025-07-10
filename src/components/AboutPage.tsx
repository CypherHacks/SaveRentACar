import React from 'react';
import { Award, Users, Shield, Heart, Star } from 'lucide-react';

const AboutPage: React.FC = () => {
  // Updated stats section
  const stats = [
    { icon: Users, value: '10,000+', label: 'Happy Customers' },
    { icon: Award, value: '20+', label: 'Years Experience' },
    { icon: Shield, value: '100%', label: 'Insured Fleet' },
  ];

  // Values section remains unchanged
  const values = [
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Every decision we make puts our customers\' needs and satisfaction at the center.',
    },
    {
      icon: Shield,
      title: 'Safety & Reliability',
      description: 'All our vehicles undergo rigorous maintenance and safety checks regularly.',
    },
    {
      icon: Star,
      title: 'Quality Service',
      description: 'We strive for excellence in every interaction and go above and beyond expectations.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Modern Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-amber-600">Save Rent A Car</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We're Aqaba's trusted car rental partner, providing exceptional service and reliable vehicles for over two decades. 
              Our journey is built on a foundation of customer satisfaction and local expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section - Modernized */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-amber-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section - Revised */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Our Journey
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  We've witnessed Aqaba transform from a quiet port town to Jordan's vibrant coastal destination. 
                  Throughout these changes, our commitment to serving both locals and visitors has remained constant.
                </p>
                <p>
                  Our longevity comes from understanding what matters most: reliable vehicles, fair pricing, 
                  and treating every customer with the respect they deserve. We take pride in being your 
                  trusted transportation partner in Aqaba.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1614772067419-1452cf9aeaa3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Aqaba landscape"
                className="rounded-2xl shadow-2xl object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Enhanced */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core principles guide everything we do and shape every interaction we have
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-b from-amber-50 to-white p-8 rounded-xl border border-amber-100 hover:shadow-lg transition-all"
              >
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section - Updated */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">Our Commitment</h2>
            <p className="text-xl leading-relaxed mb-8">
              To be Aqaba's most trusted car rental service by providing well-maintained vehicles, 
              transparent pricing, and personalized support that makes every journey seamless.
            </p>
            <div className="mt-10">
              <div className="inline-block bg-white bg-opacity-20 rounded-full px-6 py-3">
                <p className="text-lg text-amber-100 font-medium">
                  Serving Aqaba with pride for generations
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;