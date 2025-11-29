import React from 'react';
import { loadStripe } from '@stripe/stripe-js';



export const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);


// const stripePromise = loadStripe(import.meta.env.VITE_stripe_key);
// const StripePay = () => {
//     return (
//         <Elements stripe={stripePromise}>
//             <PaymentForm></PaymentForm>
//         </Elements>
//     );
// };

// export default StripePay;