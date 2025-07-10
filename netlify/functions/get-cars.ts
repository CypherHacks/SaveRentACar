// netlify/functions/get-cars.ts
import { Handler } from '@netlify/functions'
import Airtable from 'airtable'

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY!
}).base(process.env.AIRTABLE_BASE_ID!)

export const handler: Handler = async () => {
  try {
    const records = await base('Cars')
      .select({ view: 'Grid view' })
      .all()

    const cars = records.map((rec) => {
      // handle Image as URL string or Attachment array
      let imageUrl: string | null = null
      const imgField = rec.get('Image')
      if (Array.isArray(imgField)) {
        // attachment field
        imageUrl = (imgField as any[])[0]?.url ?? null
      } else if (typeof imgField === 'string') {
        // URL field
        imageUrl = imgField
      }

      return {
        id: rec.id,
        name: rec.get('Name') as string,
        category: rec.get('Category') as string,
        imageUrl,
        price: rec.get('Price') as number,
        features: rec.get('Features') as string,
        count: rec.get('Count') as number,
        colors: rec.get('Colors') as string,
        // bookings will be an array of linked-record IDs
        bookings: (rec.get('Bookings') as string[]) || [],
      }
    })

    return {
      statusCode: 200,
      body: JSON.stringify(cars),
    }
  } catch (err: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    }
  }
}
