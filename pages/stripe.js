import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
// import { createCheckoutSession } from 'next-stripe/client';
import { loadStripe } from '@stripe/stripe-js';
import {Flex, Box, Text, Button} from '@chakra-ui/react';

 function stripe() {

    const handleToken = (token,addresses) => {
        console.log({token , addresses});


    }

    return(
        <Flex>
            <Text> Payment Using Stripe </Text>
            <Box>
                <StripeCheckout stripeKey="pk_test_51Ifj2ESIx03WM52JePxXMsPgAvhZ9fuviLPJH6qZYxpHENXCFM5YX3xakkscxUbbYtqFAwxZkGeoLxYBynifXmaD00V1dUxera"
                    token ={handleToken} amount = '69'
                /> 
            </Box>
        </Flex>
    )
}

export default stripe;