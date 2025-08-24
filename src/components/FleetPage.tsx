// src/pages/FleetPage.tsx
import React, { useEffect, useState } from 'react'
import {
  FaCar,
  FaMapMarkerAlt,
  FaPalette,
  FaCalendarAlt,
  FaUserAlt,
  FaInfoCircle,
} from 'react-icons/fa'
import { FiArrowRight } from 'react-icons/fi'
import TermsAndConditions from './TermsAndConditions'
import { fetchCars, createBooking, Car } from '../airtable'

const FleetPage: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [mode, setMode] = useState<'rental' | 'transfer'>('rental')
  const [activeTab, setActiveTab] = useState<string>('all')
  const [dateError, setDateError] = useState<string>('')
  const [formErrors, setFormErrors] = useState<{ terms: boolean; age: boolean }>({
    terms: false,
    age: false,
  })
  const [bookingForm, setBookingForm] = useState({
    pickupDate: '',
    returnDate: '',
    pickupLocation: 'Aqaba Office',
    selectedCar: '',
    color: '',
    transferDesc: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    agreeTerms: false,
    ageConfirmed: false,
  })

  useEffect(() => {
    setLoading(true)
    fetchCars()
      .then((data) => setCars(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const validateDates = (pickup: string, returnDate: string): boolean => {
    if (!pickup || !returnDate) {
      setDateError('')
      return true
    }
    const start = new Date(pickup)
    const end = new Date(returnDate)
    const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    if (diff < 2) {
      setDateError('Minimum rental period is 2 days')
      return false
    }
    setDateError('')
    return true
  }

  const handleDateChange = (
    field: 'pickupDate' | 'returnDate',
    value: string
  ) => {
    const updated = { ...bookingForm, [field]: value }
    setBookingForm(updated)
    if (field === 'pickupDate' && updated.returnDate) {
      validateDates(value, updated.returnDate)
    } else if (field === 'returnDate' && updated.pickupDate) {
      validateDates(updated.pickupDate, value)
    }
  }

  const handleBookingClick = (carId: string) => {
    setMode('rental')
    setBookingForm((f) => ({ ...f, selectedCar: carId }))
    document.getElementById('booking-form')?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!bookingForm.agreeTerms) {
      setFormErrors((prev) => ({ ...prev, terms: true }))
      alert('Please agree to the terms and conditions')
      return
    } else {
      setFormErrors((prev) => ({ ...prev, terms: false }))
    }

    if (mode === 'rental') {
      if (!bookingForm.ageConfirmed) {
        setFormErrors((prev) => ({ ...prev, age: true }))
        alert('You must confirm you are 24 years or older to rent a vehicle')
        return
      } else {
        setFormErrors((prev) => ({ ...prev, age: false }))
      }
      if (!validateDates(bookingForm.pickupDate, bookingForm.returnDate)) {
        return
      }
      try {
        await createBooking({
          customerName: `${bookingForm.firstName} ${bookingForm.lastName}`,
          email: bookingForm.email,
          phone: bookingForm.phone,
          carId: bookingForm.selectedCar,
          startDate: bookingForm.pickupDate,
          endDate: bookingForm.returnDate,
          type: 'rental',
          ageConfirmed: bookingForm.ageConfirmed,
          termsConfirmed: bookingForm.agreeTerms,
        })
        alert('Booking confirmed! Check your email for details.')
        const updated = await fetchCars()
        setCars(updated)
        setBookingForm({
          pickupDate: '',
          returnDate: '',
          pickupLocation: 'Aqaba Office',
          selectedCar: '',
          color: '',
          transferDesc: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          agreeTerms: false,
          ageConfirmed: false,
        })
      } catch (err: any) {
        alert('Error: ' + err.message)
      }
    } else {
      try {
        const res = await fetch(
          '/.netlify/functions/request-transfer',
          {
            method: 'POST',
            body: JSON.stringify({
              customerName: `${bookingForm.firstName} ${bookingForm.lastName}`,
              email: bookingForm.email,
              phone: bookingForm.phone,
              pickupLocation: bookingForm.pickupLocation,
              description: bookingForm.transferDesc,
            }),
          }
        )
        if (res.ok) {
          alert(
            'Transfer request sent! We will get back to you within 24 hours.'
          )
          setBookingForm({
            pickupDate: '',
            returnDate: '',
            pickupLocation: 'Aqaba Office',
            selectedCar: '',
            color: '',
            transferDesc: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            agreeTerms: false,
            ageConfirmed: false,
          })
        } else {
          const errorData = await res.json()
          alert('Error: ' + errorData.error)
        }
      } catch (err: any) {
        alert('Error: ' + err.message)
      }
    }
  }

  const filteredCars =
    activeTab === 'all'
      ? cars
      : cars.filter((c) => c.category.toLowerCase() === activeTab)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 px-6 py-12">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Hero */}
        <header className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold text-gray-900">
            Our <span className="text-blue-600">Premium</span> Fleet
          </h1>
          <p className="text-lg text-gray-600">
            Luxury vehicles for rent or bespoke transfer services with pro
            drivers.
          </p>
        </header>

        {/* Mode Toggle */}
        <div className="flex justify-center gap-6">
          {(['rental', 'transfer'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold uppercase transition-all ${
                mode === m
                  ? 'bg-blue-600 text-white shadow-lg transform hover:scale-105'
                  : 'bg-white text-gray-700 border border-gray-200 hover:shadow-md'
              }`}
            >
              {m === 'rental' ? <FaCar /> : <FaMapMarkerAlt />}
              {m === 'rental' ? 'Car Rental' : 'Private Transfer'}
            </button>
          ))}
        </div>

        {/* Category Tabs */}
        {mode === 'rental' && (
          <nav className="flex flex-wrap justify-center gap-4">
            {['All', 'SUV', 'Sedan', 'Hatchback', 'Compact', 'Luxury'].map(
              (tab) => {
                const key = tab.toLowerCase()
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      activeTab === key
                        ? 'bg-blue-600 text-white shadow'
                        : 'bg-white text-gray-600 hover:bg-blue-50'
                    }`}
                  >
                    {tab}
                  </button>
                )
              }
            )}
          </nav>
        )}

        {/* Fleet Grid */}
        {mode === 'rental' ? (
          loading ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white p-6 shadow animate-pulse"
                >
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-10 bg-gray-200 rounded mt-4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCars.map((car) => (
                <div
                  key={car.id}
                  className="group flex flex-col bg-white rounded-2xl shadow transition-transform hover:-translate-y-2 hover:shadow-lg"
                >
                  <div className="relative h-56 overflow-hidden rounded-t-2xl bg-gradient-to-br from-blue-50 to-white">
                    <img
                      src={car.imageUrl || '/car-placeholder.png'}
                      alt={car.name}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                      style={{
                        filter: car.count < 1 ? 'grayscale(80%)' : 'none',
                        opacity: car.count < 1 ? 0.6 : 1,
                      }}
                      onError={(e) =>
                        ((e.target as HTMLImageElement).src =
                          '/car-placeholder.png')
                      }
                    />
                    {car.count < 1 && (
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                          Sold Out
                        </span>
                      </div>
                    )}
                    <span className="absolute top-3 left-3 bg-white bg-opacity-90 px-3 py-1 rounded-full text-xs font-semibold">
                      {car.category}
                    </span>
                  </div>
                  <div className="flex-1 p-6 flex flex-col">
                    <h3 className="text-xl font-bold mb-2 text-gray-900">
                      {car.name}
                    </h3>
                    <p className="text-gray-500 text-sm flex-1 line-clamp-2">
                      {car.features}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold text-blue-600">
                          JD{car.price}
                          <span className="text-sm font-normal text-gray-500">
                            /day
                          </span>
                        </div>
                        {car.count > 0 && (
                          <div className="text-xs text-green-600 font-medium">
                            {car.count} available
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleBookingClick(car.id)}
                        disabled={car.count < 1}
                        className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                          car.count > 0
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {car.count > 0 ? (
                          <>
                            Book Now <FiArrowRight />
                          </>
                        ) : (
                          'Unavailable'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : null}

        {/* Booking / Transfer Form */}
        <section
          id="booking-form"
          className="bg-white rounded-2xl shadow-lg p-10 max-w-3xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {mode === 'rental'
                ? 'Complete Your Reservation'
                : 'Request a Transfer'}
            </h2>
            <div className="mt-2 h-1 w-16 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Pickup Date */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <FaCalendarAlt className="mr-2 text-blue-600" />
                  Pickup Date
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={bookingForm.pickupDate}
                  onChange={(e) =>
                    handleDateChange('pickupDate', e.target.value)
                  }
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
              {/* Return Date */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <FaCalendarAlt className="mr-2 text-blue-600" />
                  Return Date
                </label>
                <input
                  type="date"
                  required
                  min={
                    bookingForm.pickupDate ||
                    new Date().toISOString().split('T')[0]
                  }
                  value={bookingForm.returnDate}
                  onChange={(e) =>
                    handleDateChange('returnDate', e.target.value)
                  }
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                {dateError && (
                  <p className="mt-1 text-sm text-red-600">{dateError}</p>
                )}
              </div>
            </div>

            {/* Pickup Location */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <FaMapMarkerAlt className="mr-2 text-blue-600" />
                Pickup Location
              </label>
              <input
                type="text"
                readOnly
                value={bookingForm.pickupLocation}
                className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed"
              />
              <p className="mt-1 text-xs text-gray-500">
                All pickups from our Aqaba Office
              </p>
            </div>

            {/* Customer Info */}
            <div className="pt-6 border-t border-gray-200 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Your Information
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingForm.firstName}
                    onChange={(e) =>
                      setBookingForm((f) => ({
                        ...f,
                        firstName: e.target.value,
                      }))
                    }
                    placeholder="John"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingForm.lastName}
                    onChange={(e) =>
                      setBookingForm((f) => ({
                        ...f,
                        lastName: e.target.value,
                      }))
                    }
                    placeholder="Doe"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={bookingForm.email}
                    onChange={(e) =>
                      setBookingForm((f) => ({
                        ...f,
                        email: e.target.value,
                      }))
                    }
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={bookingForm.phone}
                    onChange={(e) =>
                      setBookingForm((f) => ({
                        ...f,
                        phone: e.target.value,
                      }))
                    }
                    placeholder="+962 7X XXX XXXX"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* Rental vs Transfer Fields */}
            {mode === 'rental' ? (
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                      <FaCar className="mr-2 text-blue-600" />
                      Vehicle *
                    </label>
                    <select
                      required
                      value={bookingForm.selectedCar}
                      onChange={(e) =>
                        setBookingForm((f) => ({
                          ...f,
                          selectedCar: e.target.value,
                          color: '',
                        }))
                      }
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="">Select a vehicle</option>
                      {cars.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} – JD{c.price}/day
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                      <FaPalette className="mr-2 text-blue-600" />
                      Color *
                    </label>
                    <select
                      required
                      value={bookingForm.color}
                      onChange={(e) =>
                        setBookingForm((f) => ({
                          ...f,
                          color: e.target.value,
                        }))
                      }
                      disabled={!bookingForm.selectedCar}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="">Select a color</option>
                      {cars
                        .find((c) => c.id === bookingForm.selectedCar)
                        ?.colors.split(',')
                        .map((col) => (
                          <option key={col.trim()} value={col.trim()}>
                            {col.trim()}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div
                  className={`flex items-start p-4 rounded-lg transition-all ${
                    formErrors.age
                      ? 'bg-red-50 border border-red-200'
                      : 'bg-blue-50'
                  }`}
                >
                  <input
                    id="age-confirm"
                    type="checkbox"
                    checked={bookingForm.ageConfirmed}
                    onChange={(e) => {
                      setBookingForm((f) => ({
                        ...f,
                        ageConfirmed: e.target.checked,
                      }))
                      setFormErrors((prev) => ({ ...prev, age: false }))
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="age-confirm"
                      className="font-medium text-gray-700 flex items-center"
                    >
                      <FaUserAlt className="mr-1 text-blue-600" />
                      I confirm I am 24 years or older *
                    </label>
                    <p className="text-gray-500">
                      Minimum driving age requirement.
                    </p>
                    {formErrors.age && (
                      <p className="mt-1 text-red-600">
                        You must confirm you are 24+.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transfer Details *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Pick-up/drop-off, passengers, luggage, special requests..."
                  value={bookingForm.transferDesc}
                  onChange={(e) =>
                    setBookingForm((f) => ({
                      ...f,
                      transferDesc: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
                />
              </div>
            )}

            {/* Terms & Conditions */}
            <div
              className={`flex items-start p-4 rounded-lg transition-all ${
                formErrors.terms
                  ? 'bg-red-50 border border-red-200'
                  : 'bg-blue-50'
              }`}
            >
              <input
                id="terms"
                type="checkbox"
                checked={bookingForm.agreeTerms}
                onChange={(e) => {
                  setBookingForm((f) => ({
                    ...f,
                    agreeTerms: e.target.checked,
                  }))
                  setFormErrors((prev) => ({ ...prev, terms: false }))
                }}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-gray-700">
                  I agree to the{' '}
                  <a
                    href="#terms"
                    className="text-blue-600 hover:underline"
                  >
                    Terms & Conditions *
                  </a>
                </label>
                {formErrors.terms && (
                  <p className="mt-1 text-red-600">
                    You must agree to the terms.
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 font-semibold rounded-lg bg-blue-600 text-white transition-transform hover:scale-105"
            >
              {mode === 'rental'
                ? 'Confirm Reservation'
                : 'Request Transfer Quote'}
              <FiArrowRight />
            </button>
          </form>
        </section>

        {/* Info Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: <FaInfoCircle />,
              title: 'Flexible Options',
              desc:
                'Hourly, daily or weekly rentals with unlimited mileage.',
            },
            {
              icon: <FaMapMarkerAlt />,
              title: 'Pickup Locations',
              desc:
                'Airports, hotels, downtown and more across the city.',
            },
            {
              icon: <FaInfoCircle />,
              title: '24/7 Support',
              desc:
                'Our team is available around the clock.',
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-transform hover:-translate-y-1"
            >
              <div className="text-blue-600 mb-4 text-2xl">
                {card.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">
                {card.title}
              </h3>
              <p className="text-gray-600 text-sm">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Terms & Policies */}
        <TermsAndConditions />
      </div>
    </div>
  )
}

export default FleetPage
