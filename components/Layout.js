// Partial of components/Layout.tsx
// ...
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const Layout = ({children}) => {
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

    return(
        <Elements stripe={stripePromise}>
                {/* {} */}

        </Elements>
    )

}

export default Layout;