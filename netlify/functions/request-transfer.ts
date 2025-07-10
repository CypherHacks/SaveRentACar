// netlify/functions/request-transfer.ts
import { Handler } from '@netlify/functions'
import { Client } from '@neondatabase/serverless'


export const handler: Handler = async (event) => {
     const client = new Client({
    connectionString: process.env.DATABASE_URL!,
  })
  await client.connect()
  try {
    const {
      pickupDate,
      customerName,
      customerEmail,
      customerPhone,
      transferDescription,
    } = JSON.parse(event.body || '{}')

    await client.query(
      `INSERT INTO transfer_requests
         (pickup_date, customer_name, customer_email, customer_phone, description)
       VALUES ($1,$2,$3,$4,$5)`,
      [pickupDate, customerName, customerEmail, customerPhone, transferDescription],
    )

    return { statusCode: 201, body: JSON.stringify({ success: true }) }
  } catch (err: any) {
    return { statusCode: 400, body: JSON.stringify({ error: err.message }) }
  }
}
