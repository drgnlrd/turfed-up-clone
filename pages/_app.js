import { AuthProvider } from '../auth';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


function MyApp({ Component, pageProps }) {

  const stripePromise = loadStripe('pk_test_51Ifj2ESIx03WM52JePxXMsPgAvhZ9fuviLPJH6qZYxpHENXCFM5YX3xakkscxUbbYtqFAwxZkGeoLxYBynifXmaD00V1dUxera');

  return (
    <ChakraProvider>
      <CSSReset />
      <AuthProvider>
       <Elements stripe={stripePromise}>
        <Component {...pageProps} />
        </Elements>
      </AuthProvider>
    </ChakraProvider>
    
  );
}

export default MyApp
