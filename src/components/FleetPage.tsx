// src/pages/FleetPage.tsx
import React, { useEffect, useState } from 'react'
import { FaCar, FaMapMarkerAlt, FaPalette, FaCalendarAlt, FaUserAlt, FaInfoCircle } from 'react-icons/fa'
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

  const handleDateChange = (field: 'pickupDate' | 'returnDate', value: string) => {
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
    document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // terms
    if (!bookingForm.agreeTerms) {
      setFormErrors((prev) => ({ ...prev, terms: true }))
      alert('Please agree to the terms and conditions')
      return
    } else {
      setFormErrors((prev) => ({ ...prev, terms: false }))
    }

    if (mode === 'rental') {
      // age
      if (!bookingForm.ageConfirmed) {
        setFormErrors((prev) => ({ ...prev, age: true }))
        alert('You must confirm you are 24 years or older to rent a vehicle')
        return
      } else {
        setFormErrors((prev) => ({ ...prev, age: false }))
      }
      // dates
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
      // transfer
      try {
        const res = await fetch('/.netlify/functions/request-transfer', {
          method: 'POST',
          body: JSON.stringify({
            customerName: `${bookingForm.firstName} ${bookingForm.lastName}`,
            email: bookingForm.email,
            phone: bookingForm.phone,
            pickupLocation: bookingForm.pickupLocation,
            description: bookingForm.transferDesc,
          }),
        })
        if (res.ok) {
          alert('Transfer request sent! We will get back to you within 24 hours.')
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Our Premium Fleet
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our luxury vehicles or request a custom transfer service
            with professional drivers
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center gap-4 mb-8">
          {(['rental', 'transfer'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-6 py-3 rounded-full font-medium text-sm uppercase tracking-wider flex items-center gap-2 transition-all ${
                mode === m
                  ? 'bg-amber-600 text-white shadow-md transform hover:scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
              }`}
            >
              {m === 'rental' ? (
                <>
                  <FaCar /> Car Rental
                </>
              ) : (
                <>
                  <FaMapMarkerAlt /> Private Transfer
                </>
              )}
            </button>
          ))}
        </div>

        {/* Category Tabs */}
        {mode === 'rental' && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['All', 'SUV', 'Sedan', 'Hatchback', 'Compact', 'Luxury'].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`px-4 py-2 rounded-full font-medium text-sm flex items-center gap-1 transition-all ${
                    activeTab === tab.toLowerCase()
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm hover:-translate-y-0.5'
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>
        )}

        {/* Fleet Grid */}
        {mode === 'rental' &&
          (loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse"
                >
                  <div className="h-64 bg-gray-200"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-10 bg-gray-200 rounded mt-6"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCars.map((car) => (
                <div
                  key={car.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative h-64 bg-gray-100 flex items-center justify-center p-4">
                    {car.imageUrl ? (
                      <img
                        src={car.imageUrl}
                        alt={car.name}
                        className="object-contain max-h-full max-w-full transition-transform duration-300 hover:scale-105"
                      />
                    ) : (
                      <div className="text-gray-400">No Image</div>
                    )}
                    {car.count < 1 && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-4 py-1 rounded-full font-bold text-sm">
                          Sold Out
                        </span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-white bg-opacity-90 rounded-full px-3 py-1 text-xs font-semibold shadow-sm">
                      {car.category}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {car.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      {car.features}
                    </p>
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-xl font-bold text-amber-600">
                            JD{car.price}
                            <span className="text-sm font-normal text-gray-500">
                              /day
                            </span>
                          </div>
                          {car.count > 0 && (
                            <div className="text-xs text-green-600">
                              {car.count} available
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => handleBookingClick(car.id)}
                          disabled={car.count < 1}
                          className={`px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-1 transition-all ${
                            car.count > 0
                              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 transform hover:scale-105'
                              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
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
                </div>
              ))}
            </div>
          ))}

        {/* Booking / Transfer Form */}
        <div
          id="booking-form"
          className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl mt-16 border border-gray-200"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
            {mode === 'rental'
              ? 'Complete Your Reservation'
              : 'Custom Transfer Request'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pickup Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FaCalendarAlt className="mr-2 text-amber-500" /> Pickup Date
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={bookingForm.pickupDate}
                  onChange={(e) =>
                    handleDateChange('pickupDate', e.target.value)
                  }
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              {/* Return Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FaCalendarAlt className="mr-2 text-amber-500" /> Return Date
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
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
                {dateError && (
                  <p className="mt-1 text-sm text-red-600">{dateError}</p>
                )}
              </div>
            </div>

            {/* Pickup Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-amber-500" /> Pickup Location
              </label>
              <input
                type="text"
                required
                readOnly
                value={bookingForm.pickupLocation}
                className="w-full border border-gray-300 px-4 py-3 rounded-lg bg-gray-100 cursor-not-allowed"
              />
              <p className="mt-1 text-xs text-gray-500">
                All pickups are from our Aqaba Office location
              </p>
            </div>

            {/* Customer Information */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Your Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="John"
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
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Doe"
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
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="john@example.com"
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
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="+962 7X XXX XXXX"
                  />
                </div>
              </div>
            </div>

            {/* Rental vs Transfer Fields */}
            {mode === 'rental' ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FaCar className="mr-2 text-amber-500" /> Vehicle *
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
                      className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FaPalette className="mr-2 text-amber-500" /> Color *
                    </label>
                    <select
                      required
                      value={bookingForm.color}
                      onChange={(e) =>
                        setBookingForm((f) => ({ ...f, color: e.target.value }))
                      }
                      disabled={!bookingForm.selectedCar}
                      className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
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
                  className={`flex items-start pt-2 p-4 rounded-lg ${
                    formErrors.age ? 'bg-red-50 border border-red-200' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center h-5">
                    <input
                      id="age-confirm"
                      name="age-confirm"
                      type="checkbox"
                      required
                      checked={bookingForm.ageConfirmed}
                      onChange={(e) => {
                        setBookingForm((f) => ({
                          ...f,
                          ageConfirmed: e.target.checked,
                        }))
                        setFormErrors((prev) => ({ ...prev, age: false }))
                      }}
                      className={`focus:ring-amber-500 h-4 w-4 text-amber-600 border-gray-300 rounded ${
                        formErrors.age ? 'border-red-500' : ''
                      }`}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="age-confirm"
                      className="font-medium text-gray-700 flex items-center"
                    >
                      <FaUserAlt className="mr-1 text-amber-500" /> I confirm I am
                      24 years or older *
                    </label>
                    <p className="text-gray-500">
                      Minimum driving age requirement for all rentals.
                    </p>
                    {formErrors.age && (
                      <p className="text-red-600 mt-1">
                        You must confirm you are 24+ to rent a vehicle
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
                  placeholder="Please include: Pick-up/drop-off addresses, passengers, luggage, special requests..."
                  value={bookingForm.transferDesc}
                  onChange={(e) =>
                    setBookingForm((f) => ({ ...f, transferDesc: e.target.value }))
                  }
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
            )}

            {/* Terms & Conditions */}
            <div
              className={`flex items-start p-4 rounded-lg ${
                formErrors.terms ? 'bg-red-50 border border-red-200' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  checked={bookingForm.agreeTerms}
                  onChange={(e) => {
                    setBookingForm((f) => ({
                      ...f,
                      agreeTerms: e.target.checked,
                    }))
                    setFormErrors((prev) => ({ ...prev, terms: false }))
                  }}
                  className={`focus:ring-amber-500 h-4 w-4 text-amber-600 border-gray-300 rounded ${
                    formErrors.terms ? 'border-red-500' : ''
                  }`}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-gray-700">
                  I agree to the{' '}
                  <a
                    href="#terms"
                    className="text-amber-600 hover:text-amber-700 underline"
                  >
                    Terms and Conditions *
                  </a>
                </label>
                {formErrors.terms && (
                  <p className="text-red-600 mt-1">
                    You must agree to the terms and conditions
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-lg font-semibold bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-lg transform hover:scale-[1.01]"
            >
              {mode === 'rental'
                ? 'Confirm Reservation'
                : 'Request Transfer Quote'}{' '}
              <FiArrowRight />
            </button>
          </form>
        </div>

        {/* Additional Info Section */}
        <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-amber-500 mb-3">
              <FaInfoCircle className="text-2xl" />
            </div>
            <h3 className="font-bold text-lg mb-2">Flexible Rental Options</h3>
            <p className="text-gray-600 text-sm">
              Choose from hourly, daily, or weekly rentals with unlimited
              mileage options.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-amber-500 mb-3">
              <FaMapMarkerAlt className="text-2xl" />
            </div>
            <h3 className="font-bold text-lg mb-2">Multiple Pickup Locations</h3>
            <p className="text-gray-600 text-sm">
              Convenient locations across the city including airports,
              hotels, and downtown.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-amber-500 mb-3">
              <FaInfoCircle className="text-2xl" />
            </div>
            <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
            <p className="text-gray-600 text-sm">
              Our customer service team is available round the clock to assist
              with your needs.
            </p>
          </div>
        </div>

        {/* Terms & Policies */}
        <TermsAndConditions />
      </div>
    </div>
  )
}

export default FleetPage
