import React from 'react';

const TermsAndConditions: React.FC = () => (
  <section id="terms" className="max-w-4xl mx-auto mt-16 prose prose-amber">
    <h2>Terms &amp; Conditions</h2>

    <h3>1. Driver's License</h3>
    <ul>
      <li>A valid driver's license from your country of origin is required and must have been held for at least one year.</li>
      <li>An International Driving Permit (IDP) is recommended if your license is not in English or Arabic, as it provides an official translation.</li>
    </ul>

    <h3>2. Age Requirements</h3>
    <ul>
      <li>Minimum rental age is generally 21, but some companies may require drivers to be 23 or 25.</li>
      <li>Drivers under 25 may incur an underage driver fee.</li>
    </ul>

    <h3>3. Payment &amp; Deposit</h3>
    <ul>
      <li>A major credit card in the renter's name is required for payment and security deposit.</li>
      <li>Debit cards may be accepted for rental charges but not for the deposit.</li>
      <li>A refundable security deposit is held and returned when the vehicle is returned in good condition.</li>
    </ul>

    <h3>4. Rental Agreement Obligations</h3>
    <ul>
      <li>The rental agreement outlines the rental period, fees, and renter responsibilities.</li>
      <li>Renter pays for all fuel consumed during the rental period.</li>
      <li>Renter is responsible for any traffic fines or speeding tickets incurred.</li>
      <li>Collision Damage Waiver (CDW) and Theft Protection may be included; without CDW, renter may be liable for full vehicle value.</li>
      <li>Vehicle must be returned in the same condition it was received.</li>
    </ul>

    <h3>5. Other Important Terms</h3>
    <ul>
      <li>Vehicles may not be used for illegal activities or to transport goods/passengers for payment.</li>
      <li>Only authorized drivers listed on the agreement are permitted to drive.</li>
      <li>Familiarize yourself with local traffic laws and regulations.</li>
    </ul>

    <h3>6. Private Transfer Services</h3>
    <p>
      All the above terms and conditions also apply to our private transfer services.
      By booking a transfer, you agree to the same driver, age, payment, and liability requirements as the car rental.
    </p>

    <h3>7. Privacy Policy</h3>
    <p>
      We collect personal information (name, contact details, pickup/drop-off location) solely to process your booking or transfer request. We do not share your data with third parties except as necessary to fulfill your reservation (e.g., payment gateway, local authorities).
    </p>
  </section>
);

export default TermsAndConditions;
