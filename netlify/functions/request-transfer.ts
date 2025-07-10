// netlify/functions/request-transfer.ts
import { Handler } from '@netlify/functions'
import Airtable from 'airtable'

// initialize Airtable
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY! })
  .base(process.env.AIRTABLE_BASE_ID!)

export const handler: Handler = async (event) => {
  try {
    // parse incoming POST body
    const {
      firstName,
      lastName,
      email,
      phone,
      pickupLocation,
      transferDesc,
    } = JSON.parse(event.body || '{}')

    // create a new record in your Bookings table
    const created = await base('Bookings').create([
      {
        fields: {
          CustomerName: `${firstName} ${lastName}`,
          Email: email,
          Phone: phone,
          // no car link for transfers:
          Car: [],
          // use today’s date as “StartDate” so you have a date
          StartDate: new Date().toISOString().split('T')[0],
          // leave EndDate empty
          // set the type to “transfer”
          Type: 'transfer',
          AgeConfirmed: false,
          TermsConfirmed: true,
          // put your description into a Long Text field,
          // make sure you created this field in Airtable named "TransferDesc"
          TransferDesc: transferDesc,
        },
      },
    ])

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, id: created[0].id }),
    }
  } catch (err: any) {
    console.error(err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    }
  }
}
