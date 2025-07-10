// netlify/functions/book-car.ts
import { Handler } from '@netlify/functions'
import Airtable from 'airtable'

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY! })
  .base(process.env.AIRTABLE_BASE_ID!)

export const handler: Handler = async (event) => {
  try {
    const {
      customerName,
      email,
      phone,
      carId,
      startDate,
      endDate,
      type,
      ageConfirmed,
      termsConfirmed,
    } = JSON.parse(event.body || '{}')

    // create a new booking record
    const created = await base('Bookings').create([{
      fields: {
        CustomerName: customerName,
        Email: email,
        Phone: phone,
        Car: [carId],
        StartDate: startDate,
        EndDate: endDate,
        Type: type,
        AgeConfirmed: ageConfirmed,
        TermsConfirmed: termsConfirmed,
      }
    }])

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, id: created[0].id }),
    }
  } catch (err: any) {
    return { statusCode: 500, body: err.message }
  }
}
