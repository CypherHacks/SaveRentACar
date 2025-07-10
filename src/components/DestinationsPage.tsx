import React, { useState } from 'react';
import { Star, MapPin, Clock, Car, Mountain, Castle, Leaf, Globe } from 'lucide-react';

const DestinationsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Destinations' },
    { id: 'historical', name: 'Historical Sites' },
    { id: 'natural', name: 'Natural Wonders' },
    { id: 'adventure', name: 'Adventure' },
    { id: 'cultural', name: 'Cultural' },
  ];

  const destinations = [
    {
      id: 1,
      name: 'Umm Qais',
      category: 'historical',
      image: 'https://tourism-villages.unwto.org/wp-content/uploads/2022/11/qais01.jpg',
      description: 'Perched on a hilltop with panoramic views of three countries, Umm Qais offers a journey through layered civilizations from the Roman Decapolis to Ottoman eras.',
      location: 'Irbid Governorate',
      duration: 'Half Day',
      rating: 4.7,
      highlights: ['Roman Theater', 'Ottoman Village', 'Sea of Galilee Views', 'Decapolis Ruins'],
      drivingTime: '2 hours from Amman',
      bestTime: 'March to May, September to November',
      detailedDescription: 'Walk through colonnaded streets where Roman philosophers once debated, then stand at the edge of the plateau where Jesus performed the miracle of the Gadarene swine. The black basalt ruins contrast dramatically with the lush Jordan Valley below, creating unforgettable vistas perfect for sunset photography.'
    },
    {
      id: 2,
      name: 'Ajloun Forest Reserve',
      category: 'natural',
      image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/456668602.jpg?k=16cb4306495fcc38081f235ff333a75e704238f5b218af701850c71a3ef68f44&o=&hp=1',
      description: 'A lush green sanctuary in Jordan\'s northern highlands, home to rare wildlife and the majestic Ajloun Castle watching over the forest.',
      location: 'Ajloun Governorate',
      duration: 'Full Day',
      rating: 4.6,
      highlights: ['Hiking Trails', 'Roe Deer Sanctuary', 'Soap Making Workshops', 'Castle Views'],
      drivingTime: '1.5 hours from Amman',
      bestTime: 'April to October',
      detailedDescription: 'Wander through oak and pistachio forests where the air carries the scent of wild herbs. This ecological haven shelters golden jackals, striped hyenas, and over 100 bird species. Stay overnight in eco-lodges to experience the forest\'s nocturnal magic and wake to mist-shrouded valleys that feel worlds away from Jordan\'s deserts.'
    },
    {
      id: 3,
      name: 'Shobak Castle',
      category: 'historical',
      image: 'https://i0.wp.com/www.touristjordan.com/wp-content/uploads/2017/11/shutterstock_1673828665-scaled.jpg?fit=6000%2C4000&ssl=1',
      description: 'Saladin\'s mountain fortress standing sentinel on the ancient King\'s Highway, with secret passages and Crusader-era inscriptions.',
      location: 'Ma\'an Governorate',
      duration: '2-3 Hours',
      rating: 4.5,
      highlights: ['Underground Tunnels', 'Crusader Chapel', 'Defensive Walls', 'Panoramic Vistas'],
      drivingTime: '2.5 hours from Amman',
      bestTime: 'October to April',
      detailedDescription: 'Climb through time in this rugged Crusader castle where weathered stones whisper tales of Saladin\'s siege. Explore the dark, dripping passageways that plunge seven levels underground - a marvel of medieval engineering. From the battlements, gaze across the vast Wadi Araba where caravans once carried frankincense to the Mediterranean.'
    },
    {
      id: 4,
      name: 'Wadi Bin Hammad',
      category: 'adventure',
      image: 'https://media-cdn.tripadvisor.com/media/photo-p/19/49/8c/00/wadi-bin-hammad.jpg',
      description: 'A hidden canyon oasis with year-round waterfalls, hanging gardens, and natural pools perfect for canyoning adventures.',
      location: 'Karak Governorate',
      duration: 'Full Day',
      rating: 4.8,
      highlights: ['Canyon Swimming', 'Abseiling', 'Tropical Vegetation', 'Hot Springs'],
      drivingTime: '2 hours from Amman',
      bestTime: 'April to October',
      detailedDescription: 'Descend into a geological wonderland where warm mineral springs cascade down fern-covered cliffs into emerald pools. This "jungle in the desert" surprises with its biodiversity - watch for iridescent kingfishers diving between palm groves as you wade through turquoise waters. The canyon\'s narrowest sections reveal hanging gardens of wild mint and maidenhair ferns clinging to vertical walls.'
    },
    {
      id: 5,
      name: 'Pella',
      category: 'historical',
      image: 'https://jordan-car-and-driver.com/wp-content/uploads/2021/09/Pella-Jordan-Day-Tour-More-Driver-in-Jordan-Jordan-Tour-Car-Driver-in-Jordan.3.jpg',
      description: 'One of the Decapolis cities with continuous habitation from the Neolithic era, revealing layers of Canaanite, Roman, and Byzantine civilizations.',
      location: 'Jordan Valley',
      duration: 'Half Day',
      rating: 4.4,
      highlights: ['Roman Odeon', 'Byzantine Churches', 'Bronze Age Temples', 'Ancient Water Systems'],
      drivingTime: '1.5 hours from Amman',
      bestTime: 'October to April',
      detailedDescription: 'Wander through 6,000 years of history where archaeologists still uncover new treasures each season. See the ghostly outline of a Chalcolithic temple beneath Byzantine church mosaics, then examine Roman baths where engineers perfected underfloor heating. Don\'t miss the onsite museum displaying perfectly preserved Bronze Age pottery excavated just meters away.'
    },
    {
      id: 6,
      name: 'Dibeen Forest',
      category: 'natural',
      image: 'https://welcomejordan.com/images/Dibeen-3.jpg',
      description: 'Jordan\'s northern pine forest sanctuary, home to endangered Persian squirrels and ancient oak ecosystems.',
      location: 'Jerash Governorate',
      duration: 'Half Day',
      rating: 4.3,
      highlights: ['Nature Walks', 'Birdwatching', 'Picnic Areas', 'Wildflower Meadows'],
      drivingTime: '1 hour from Amman',
      bestTime: 'March to May',
      detailedDescription: 'Breathe deeply in this fragrant pine woodland where dappled sunlight filters through Aleppo pines - some over 500 years old. Spring transforms the forest floor into a tapestry of wild orchids and anemones. Listen for the drumming of Syrian woodpeckers and watch for the flash of a Persian squirrel\'s russet tail, one of the last viable populations in the Middle East.'
    },
    {
      id: 7,
      name: 'Al-Maghtas',
      category: 'cultural',
      image: 'https://i.natgeofe.com/n/9697668b-5e85-4465-9bcc-656775e84cf2/baptism-world-heritage-jordan.jpg',
      description: 'The Baptism Site of Jesus Christ, a UNESCO World Heritage location on the Jordan River with ancient churches and pilgrimage routes.',
      location: 'Bethany Beyond the Jordan',
      duration: '2-3 Hours',
      rating: 4.9,
      highlights: ['John the Baptist Church', 'Byzantine Monasteries', 'Pilgrim Baptism Pools', 'Mosaic Floors'],
      drivingTime: '45 minutes from Amman',
      bestTime: 'Year Round',
      detailedDescription: 'Walk the same paths where prophets baptized pilgrims for millennia in this spiritual sanctuary. Float in the mineral-rich waters where Jesus was baptized, surrounded by reeds and tamarisk trees. Marvel at newly excavated Byzantine churches with perfectly preserved mosaic floors depicting desert animals. The palpable sense of sacred history makes this one of Jordan\'s most moving experiences.'
    },
    {
      id: 8,
      name: 'Feynan Ecolodge',
      category: 'adventure',
      image: 'https://www.meda.org/wp-content/uploads/2021/05/Ecolodge.png',
      description: 'Award-winning solar-powered desert lodge offering immersive Bedouin experiences under pristine starry skies.',
      location: 'Dana Biosphere Reserve',
      duration: '2-3 Days',
      rating: 4.9,
      highlights: ['Stargazing', 'Copper Mine Hikes', 'Bedouin Cuisine', 'Candlelit Nights'],
      drivingTime: '3 hours from Amman',
      bestTime: 'October to April',
      detailedDescription: 'Experience sustainable luxury in this candlelit oasis completely off-grid. By day, hike through copper-mining canyons with Bedouin guides who point out medicinal plants and Neolithic flint tools. At night, climb to the rooftop to see the Milky Way undimmed by light pollution while sipping sage tea. The lodge\'s architecture incorporates ancient Nabatean cooling techniques, maintaining perfect temperatures without electricity.'
    },
  ];

  const filteredDestinations = selectedCategory === 'all' 
    ? destinations 
    : destinations.filter(dest => dest.category === selectedCategory);

  // Category icons mapping
  const categoryIcons = {
    historical: <Castle className="h-4 w-4" />,
    natural: <Leaf className="h-4 w-4" />,
    adventure: <Mountain className="h-4 w-4" />,
    cultural: <Globe className="h-4 w-4" />,
    default: <Star className="h-4 w-4" />
  };

  function onNavigate(arg0: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-amber-50">
      {/* Enhanced Header */}
      <section className="bg-gradient-to-br from-amber-700 via-amber-600 to-amber-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight">
              Discover Jordan's Hidden Treasures
            </h1>
            <p className="text-xl lg:text-2xl text-amber-100 max-w-3xl mx-auto leading-relaxed">
              Journey beyond the familiar to uncover ancient stories, ecological wonders, 
              and cultural encounters that will transform your understanding of the Middle East
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter with Icons */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Find Your Perfect Experience
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-amber-50 border border-amber-200'
                }`}
              >
                {categoryIcons[category.id as keyof typeof categoryIcons] || categoryIcons.default}
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {filteredDestinations.map((destination) => (
            <div
              key={destination.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-amber-100"
            >
              <div className="relative overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-amber-500/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center">
                  {categoryIcons[destination.category as keyof typeof categoryIcons] || categoryIcons.default}
                  <span className="text-sm font-semibold capitalize text-white ml-2">
                    {destination.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur px-3 py-1 rounded-full flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-300 fill-current" />
                  <span className="text-sm font-semibold text-white">{destination.rating}</span>
                </div>
              </div>

              <div className="p-7">
                <div className="mb-5">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{destination.name}</h3>
                    <span className="flex items-center text-sm bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">
                      <MapPin className="h-4 w-4 mr-1" />
                      {destination.location}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {destination.description}
                  </p>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4 mb-5 text-sm bg-amber-50 p-4 rounded-xl">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Clock className="h-5 w-5 text-amber-600" />
                    <div>
                      <p className="font-medium">Duration</p>
                      <p>{destination.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Car className="h-5 w-5 text-amber-600" />
                    <div>
                      <p className="font-medium">Drive Time</p>
                      <p>{destination.drivingTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Star className="h-5 w-5 text-amber-600" />
                    <div>
                      <p className="font-medium">Best Time</p>
                      <p>{destination.bestTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Mountain className="h-5 w-5 text-amber-600" />
                    <div>
                      <p className="font-medium">Experience</p>
                      <p className="capitalize">{destination.category}</p>
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-5">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center text-lg">
                    <span className="bg-gradient-to-r from-amber-400 to-amber-600 text-white p-1 rounded mr-2">
                      ✨
                    </span>
                    Unforgettable Moments
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {destination.highlights.map((highlight, index) => (
                      <span 
                        key={index} 
                        className="bg-gradient-to-r from-amber-50 to-amber-100 text-amber-800 px-3 py-1.5 rounded-full text-sm border border-amber-200"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Persuasive Description */}
                <div className="mt-6 bg-gradient-to-br from-blue-50 to-white p-5 rounded-xl border border-blue-100">
                  <p className="text-gray-700 leading-relaxed italic">
                    {destination.detailedDescription}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-800 to-blue-900 rounded-2xl overflow-hidden shadow-2xl">
  <div className="p-10 text-center text-white">
    <h2 className="text-3xl font-bold mb-4">Craft Your Jordanian Adventure</h2>
    <p className="text-xl mb-6 text-blue-100 max-w-2xl mx-auto leading-relaxed">
      With diverse landscapes spanning ancient forests, desert canyons, and archaeological 
      wonders, Jordan invites you to create a journey as unique as its heritage
    </p>
    <button
      onClick={() => onNavigate('fleet')}
      className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-blue-900 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 duration-300 shadow-lg"
    >
      Start Your Journey Today
    </button>
    <p className="mt-4 text-blue-200">
      Local experts available 24/7 to personalize your itinerary
    </p>
  </div>
</div>

      </div>
    </div>
  );
};

export default DestinationsPage;