// src/airtable.ts

export interface Car {
  id: string
  name: string
  category: string
  imageUrl: string | null
  price: number
  features: string
  count: number
  colors: string
  bookings: string[]       // array of Booking record IDs
}

export async function fetchCars(): Promise<Car[]> {
  const res = await fetch('/.netlify/functions/get-cars')
  if (!res.ok) throw new Error('Failed to fetch cars')
  return res.json()
}

export interface BookingPayload {
  customerName: string
  email: string
  phone: string
  carId: string
  startDate: string
  endDate?: string
  type: 'rental' | 'transfer'
  ageConfirmed: boolean
  termsConfirmed: boolean
}

export async function createBooking(payload: BookingPayload) {
  const res = await fetch('/.netlify/functions/book-car', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Booking failed')
  return res.json()
}
