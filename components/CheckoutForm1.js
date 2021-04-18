import { 
    Box, 
    SimpleGrid, 
    GridItem, 
    Heading, 
    Text, 
    chakra, 
    Stack, 
    FormControl, 
    FormLabel, 
    Input, 
    Select, 
    Button, 
    useColorModeValue,
    Container,
    Table, 
    Thead, 
    Tbody, 
    Tfoot, 
    Tr, 
    Th, 
    Td,
    Skeleton
} from '@chakra-ui/react';
import { destroyCookie } from "nookies";

import { useRouter } from 'next/router';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';


const initialFormData = Object.freeze({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    town_city: "",
    county_state: "",
    postal_zip_code: "",
    country: "",
})

const checkoutForm1 = ({ paymentIntent,setPaymentDone }) => {

    const [checkout, setCheckout] = useState();
    const [showSkeleton, setShowSkeleton] = useState(true);
    const [formData, updateFormData] = useState(initialFormData);
    const [shipOption, setShipOption] = useState();
    const [cart, setCart] = useState();
    const [isProcessing, setIsProcessing] = useState(false);

    const router = useRouter();

    const [checkoutError, setCheckoutError] = useState();
    const [checkoutSuccess, setCheckoutSuccess] = useState();

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const {
        error,
        paymentIntent: { status }
      } = await stripe.confirmCardPayment(paymentIntent.client_secret, { 
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });
  
      if (error) throw new Error(error.message);
  
      if (status === "succeeded") {
        setCheckoutSuccess(true);
        destroyCookie(null, "paymentIntentId");
        setPaymentDone(1);
        
      }
    } catch (err) {
      alert(err.message);
      setCheckoutError(err.message);
    }
  }
  

    return(
        <chakra.form
              action="#"
              method="POST"
              shadow="base"
              rounded={[null, "md"]}
              overflow={{ sm: "hidden" }}
            >
              <Stack
                px={4}
                py={5}
                p={[null, 6]}
                bg={useColorModeValue("white", "gray.700")}
                spacing={6}
                mt={'10px'}
              >
                <SimpleGrid columns={6} spacing={6}>
                  <FormControl as={GridItem} colSpan={[6, 3]}>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Name
                    </FormLabel>

                    <Input
                    mt={100}
                      type="text"
                      name="firstname"
                      id="firstname"
                      autoComplete="given-name"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      
                    />
                  </FormControl>

                 
                  <FormControl as={GridItem} colSpan={[6, 4]}>
                    <FormLabel
                      for="email_address"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Email address
                    </FormLabel>
                    <Input
                      type="text"
                      name="email"
                      id="email"
                      autoComplete="email"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      
                    />
                  </FormControl>


                  <FormControl as={GridItem} colSpan={6}>
                    <FormLabel
                      for="street_address"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Street address
                    </FormLabel>
                    <Input
                      type="text"
                      name="street"
                      id="street"
                      autoComplete="street-address"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      
                    />
                  </FormControl>

                 
                  
                  <FormControl as={GridItem} colSpan={6}>
                    <FormLabel
                        for="card_details"
                        fontSize="sm"
                        fontWeight="md"
                        color={useColorModeValue("gray.700", "gray.50")}
                        >
                      Credit/Debit Card
                    </FormLabel>
                    <CardElement
                        options={{
                            style: {
                            base: {
                                fontSize: '20px',
                                color: '#424770',
                                '::placeholder': {
                                color: '#aab7c4',
                                },
                                marginTop: '10px',
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                            },
                        }}
                        />
                        
                  </FormControl>
                </SimpleGrid>
              </Stack>
              <Box
                px={{ base: 4, sm: 6 }}
                py={3}
                bg={useColorModeValue("gray.50", "gray.900")}
                textAlign="right"
              >
                <Button
                  type="submit"
                  bgGradient={'linear(to-r, red.500 ,orange.400)'}
                  _hover={{
                      bgGradient: 'linear(to-r, red.700 ,orange.600)',
                      boxShadow: 'md',
                      transition: 'all .2s ease',
                  }}
                  onClick={(e)=>{handleSubmit(e)}}
                  color={'white'}
                  _focus={{ shadow: "" }}
                  fontWeight="md"
                  isLoading={isProcessing == true ? true : false}
                >
                  Place Order
                </Button>
              </Box>
              </chakra.form>
    )
}

export default checkoutForm1;