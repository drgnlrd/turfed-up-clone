import React, { useState, useEffect } from 'react';
import firebaseCLient from '../../firebaseCLient';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import nookies,{parseCookies, setCookie} from "nookies";
import {verifyIdToken} from '../../firebaseAdmin';
import Layout from '../../components/Container';
import {
    SimpleGrid,
    Flex,
    Badge,
    chakra,
    VisuallyHidden,
    Box,
    Input,
    Button,
    InputGroup,
    InputRightElement,
    Image,
    Stack,
    useColorModeValue,
    Text,
    IconButton,
    Icon,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Select,
    Container,
    AlertDialog,AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody,
    AlertDialogFooter
} from '@chakra-ui/react';

import Carousel from '../../components/carousel';

import {
    FaPhoneAlt,
    FaDirections,
    FaShower,
    FaParking,
    FaRestroom
} from 'react-icons/fa'

import {
  IoIosShirt,
  IoMdFootball
} from 'react-icons/io';

import {
  BsConeStriped
} from 'react-icons/bs';

import { 
  GrRestroom
} from 'react-icons/gr'

import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import emailjs from 'emailjs-com';
import CheckoutForm1 from '../../components/CheckoutForm1';
import Stripe from "stripe";


const KuttyHero = ({name,location,bookings,id,url,email,price,adminEmail,paymentIntent, facilities}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log(facilities[0].shower);
    firebaseCLient();
    const [ date1, SetDate1 ] = useState('');
    const [fetchedTime, setFetchedTime] = useState([]);
    const [p, setP] = useState(0);
    const [usersLink, setUsersLink] = useState([]);
    const [paymentDone,setPaymentDone ] = useState(0);

    var db = firebase.firestore();

    const existingTimes = [
        "10:00-11:00",
        "11:00-12:00",
        "12:00-13:00",
        "13:00-14:00",
        "14:00-15:00",
        "15:00-16:00",
        "16:00-17:00",
        "17:00-18:00",
        "18:00-19:00",
        "19:00-20:00",
        "20:00-21:00",
        
    ];

    useEffect(async()=>{
        console.log(bookings);
        if (bookings == ""){
            console.log('bookings is empty');
            setP(2);
        }
        else{
        for(const [i, booking] of bookings.entries()){
            if(booking.date == date1) {
                setFetchedTime(booking.timings);
                setP(1);
                console.log('set p = 1', p)
                break;
            }
            else {
                setFetchedTime([]);
                setP(0);
                console.log('set p = 0')
            }
        }
    }

          db.collection('userData').where('email','==',email).onSnapshot((snapshot) => {
            const newUsers = snapshot.docs.map((doc) => ({
                id:doc.id,
                ...doc.data()
            }))
            setUsersLink(newUsers);
        })
    },[date1])

    if(paymentDone == 1) {
        setPaymentDone(0);
        handleSubmit();
    }


    function handleSubmit () {
    const useMe = document.getElementById('time').selectedOptions[0].value
        console.log('useMe' + useMe);

    const emailToUser = {
         to_name : usersLink[0].name,
         to_email : email,
         turf_booked : name,
         booked_time : useMe,
         booked_date : date1.toString() ,
    }

    const emailToAdmin = {
        to_name: name,
        to_email: adminEmail,
        turf_booked: name,
        booked_time: useMe,
        booked_date : date1.toString(),
    }
        if(p!=2){
        for(const [i, booking] of bookings.entries()) {
            if(p==0) {
                bookings.push({
                        date: date1.toString(),
                        timings: [useMe]
                        });
                        console.log(bookings);
                    break;
            }
            else if(booking.date==date1){
                booking.timings.push(useMe);
                break;
            }
        }
    }

        const userBookings = {
            date: date1.toString(),
            turfId: id,
            turfName:name,
            timings: [useMe]
        }

        if(p==2){
            db.collection('turfData').doc(id).set({
                bookings: [
                    {
                        date: date1.toString(),
                        timings: [useMe]
                    }
                ]
            }, { merge: true }).then(() => {afterQuery()})
        }
        else {
            db.collection('turfData').doc(id).set({
                bookings: bookings
            }, { merge: true }).then(() => {afterQuery()})
        }

        function afterQuery() {
            db.collection('userData').doc(usersLink[0].id).update({
                bookings: firebase.firestore.FieldValue.arrayUnion(userBookings)
            })

        .then(()=> {
                emailjs.send('service_qr4ri5c', 'template_3tb8ndo', emailToUser, 'user_gXqAxI680FcdwuvFzF1T2')
                .then(() => {
                    emailjs.send('service_qr4ri5c', 'template_cny1zke', emailToAdmin, 'user_gXqAxI680FcdwuvFzF1T2')
                })
                .then(() => {
                    window.location.href='./success'
                },);
        })
        }
       
    }

    const handleDateChange = (e) => {        
        SetDate1(e);   
    }

    // const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    

  return (
     <Layout> 
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      spacing={0}
      _after={{
        bg: "brand.500",
        opacity: 0.25,
        pos: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: -1,
        content: '" "',
      }}
    >

    {/* url has the download link of a turf image from firebase you can use it! */}
    <Box
      bg={'url("https://images.unsplash.com/photo-1531548731165-c6ae86ff6491?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80") no-repeat'}
      bgSize={'cover'}
      bgPosition={'center'}
      h={'60vh'}
      display={{base: 'block', md: 'none'}}
      rounded={'0 0 30px 30px'}
      position={'relative'}
      onClick={onOpen}
    >
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Carousel />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Box alignSelf={'end'} w={'full'} minH={'120px'} bg={useColorModeValue('rgba( 255,255,255, 0.55 )','rgba( 0,0,0, 0.5)')} rounded={'30px'} pos={'absolute'} bottom={0} className={'glass'} px={3} py={5} >
          <Flex justify={'space-between'} >
              <Box>
                <Text fontSize={'2xl'} fontWeight={'700'} >{name}</Text>
                <Text>{location}</Text>
              </Box>
              <Box>
                  <Stack gap={5} direction={'row'} mb={2}>
                      <IconButton bg={useColorModeValue('rgba( 255,255,255, 0.2 )','rgba( 0,0,0, 0.8)')}  icon={<Icon as={FaPhoneAlt} w={6} h={6} />}  />
                      <IconButton bg={useColorModeValue('rgba( 255,255,255, 0.2 )','rgba( 0,0,0, 0.8)')} icon={<Icon as={FaDirections} w={6} h={6} /> }   />
                  </Stack>
                  <Badge rounded={'md'} color={'white'} py={1} px={7} bg={'rgba( 58, 107, 5, 0.55 )'}>
                    Open
                  </Badge>
              </Box>
          </Flex>
      </Box>
    
        {/* <Image
          src="https://images.unsplash.com/photo-1531548731165-c6ae86ff6491?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
          alt="3 women looking at a laptop"
          objectFit="cover"
          w="full"
          h={{ base: '60vh', md: "full" }}
          bg="gray.100"
          loading="lazy"
        /> */}
      </Box>
      <Flex
        direction="column"
        alignItems="start"
        justifyContent="center"
        px={{ base: 4, lg: 20 }}
        py={[10,24]}
      >
      <SimpleGrid columns={2} spacing={3} w={'100%'}>
          <Badge bg={facilities[0].bibs? 'rgba(150,34,40,0.7)': 'rgba(150,34,40,0.2)'} 
          boxShadow={facilities[0].bibs? '0px 0px 40px 0px rgba(150,34,40,0.6)' : null} w={'full'} border={'1px solid'} borderColor={useColorModeValue('rgba(255,255,255,0.7)','rgba(0,0,0,0.6)')} rounded={'10px'} height="60px">
            <Flex justify={'center'} textAlign={'center'} alignItems={'center'} direction={'row'} h={'100%'}>
              <Icon as={IoIosShirt} w={6} h={6} mr={3} />
              <Text>Bibs</Text>
            </Flex>
          </Badge>
          <Badge bg={facilities[0].shower? 'rgba(150,34,40,0.7)': 'rgba(150,34,40,0.2)'} 
          boxShadow={facilities[0].shower? '0px 0px 40px 0px rgba(150,34,40,0.6)' : null} w={'full'} border={'1px solid'} borderColor={useColorModeValue('rgba(255,255,255,0.7)','rgba(0,0,0,0.6)')} rounded={'10px'} height="60px">
            <Flex justify={'center'} textAlign={'center'} alignItems={'center'} direction={'row'} h={'100%'}>
              <Icon as={FaShower} w={6} h={6} mr={3} />
              <Text>Shower</Text>
            </Flex>
          </Badge>
          <Badge bg={facilities[0].football? 'rgba(150,34,40,0.7)': 'rgba(150,34,40,0.2)'} 
          boxShadow={facilities[0].football? '0px 0px 40px 0px rgba(150,34,40,0.6)' : null} w={'full'} border={'1px solid'} borderColor={useColorModeValue('rgba(255,255,255,0.7)','rgba(0,0,0,0.6)')} rounded={'10px'} height="60px">
            <Flex justify={'center'} textAlign={'center'} alignItems={'center'} h={'100%'}>
              <Icon as={IoMdFootball} w={6} h={6} mr={3} />
              <Text>Football</Text>
            </Flex>
          </Badge>
          <Badge bg={facilities[0].parking? 'rgba(150,34,40,0.7)': 'rgba(150,34,40,0.2)'} w={'full'} 
          boxShadow={facilities[0].parking? '0px 0px 40px 0px rgba(150,34,40,0.6)' : null} border={'1px solid'} borderColor={useColorModeValue('rgba(255,255,255,0.7)','rgba(0,0,0,0.6)')} rounded={'10px'} height="60px">
            <Flex justify={'center'} textAlign={'center'} alignItems={'center'} h={'100%'}>
              <Icon as={FaParking} w={6} h={6} mr={3} />
              <Text>Parking</Text>
            </Flex>
          </Badge>
          <Badge bg={facilities[0].stumps? 'rgba(150,34,40,0.7)': 'rgba(150,34,40,0.2)'} 
          boxShadow={facilities[0].stumps? '0px 0px 40px 0px rgba(150,34,40,0.6)' : null} w={'full'} border={'1px solid'} borderColor={useColorModeValue('rgba(255,255,255,0.7)','rgba(0,0,0,0.6)')} rounded={'10px'} height="60px">
            <Flex justify={'center'} textAlign={'center'} alignItems={'center'} h={'100%'}>
              <Icon as={BsConeStriped} w={6} h={6} mr={3} />
              <Text>Stumps</Text>
            </Flex>
          </Badge>
            <Badge bg={facilities[0].washroom? 'rgba(150,34,40,0.7)': 'rgba(150,34,40,0.2)'} w={'full'} border={'1px solid'} 
                  borderColor={useColorModeValue('rgba(255,255,255,0.7)','rgba(0,0,0,0.6)')} rounded={'10px'} height="60px"
              boxShadow={facilities[0].washroom? '0px 0px 40px 0px rgba(150,34,40,0.6)' : null} color={'white'}>
            <Flex justify={'center'} textAlign={'center'} alignItems={'center'} direction={'row'} h={'100%'}>
              <Icon color="white" as={FaRestroom} w={6} h={6} mr={3} />
              <Text>Washroom</Text>
            </Flex>
          </Badge>
                

          
          
          
      </SimpleGrid>
      
      
        
        <chakra.h1
          mb={6}
          fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}
          fontWeight="bold"
          color={useColorModeValue("brand.600", "gray.300")}
          lineHeight="shorter"
        >
          Book Now
        </chakra.h1>
        <chakra.form w="full" mb={6}>
          <Box display={{ base: "block", lg: "block" }}>
          <Input 
        as={DatePicker} 
        id={"date"} 
        minDate={new Date()} 
        maxDate={moment().add(15, 'days')._d}  
        size="lg"
        color="gray.900"
        placeholder="Select Date."
        selected={date1} minDate={new Date()} maxDate={moment().add(15, 'days')._d}  onChange={e => handleDateChange(e)}
        bg="white" p={5} />
          
          <Select id={'time'} isDisabled={date1 === ''}
            size="lg" color="gray.900" bg="white" p={5}
           >
            {existingTimes.map((time, id)=>{
              if(fetchedTime.includes(time)){
                return(
                  <option key={id} value={time} textColor="black" style={{ background: 'lightgray'}} disabled >{time} &nbsp;&nbsp; -booked</option>
                )
              }
              else {
                return(
                  <option key={id} textColor="black" style={{ background: 'white'}}value={time}>{time}</option>
                    ) }
                        })}        
                    </Select>

            <Button
              w="full"
              mt={2}
              color="white"
              variant="solid"
              colorScheme="brand"
              size="lg"
              onClick={onOpen} isDisabled={ date1 === '' }
            >
              Proceed to checkout
            </Button>
          </Box>
          <InputGroup size="lg" w="full" display={{ base: "none", lg: "none" }}>
            <Input
              size="lg"
              color="brand.900"
              type="email"
              placeholder="Enter your email..."
              bg="white"
              required="true"
            />
            <InputRightElement w="auto">
              <Button
                color="white"
                variant="solid"
                colorScheme="brand"
                size="lg"
                type="submit"
                roundedLeft={0}
              >
                Get Started
              </Button>
              <Container maxW={'container.lg'}>
                    <AlertDialog
                    mt={10}
                        motionPreset="slideInBottom"
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                        isOpen={isOpen}
                        isCentered
                    >
                        <AlertDialogOverlay />

                        <AlertDialogContent>
                        <AlertDialogHeader>Book Turf?</AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                            Are you sure you want to proceed with booking? Once booked it wont be cancelled.
                            <CheckoutForm1 paymentIntent={paymentIntent} setPaymentDone={setPaymentDone}/>
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                            No
                            </Button>
                        </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    </Container>


            </InputRightElement>
          </InputGroup>
        </chakra.form>
        {/* <chakra.p
          pr={{ base: 0, lg: 16 }}
          mb={4}
          fontSize="sm"
          color={useColorModeValue("brand.600", "gray.400")}
          letterSpacing="wider"
        >
          Get the #1 Business Messenger and start delivering personalized
          experiences at every stage of the customer journey.
        </chakra.p> */}
      </Flex>
      
    </SimpleGrid>
    </Layout>
  );
};

export const getServerSideProps = async (context) =>{
  const content = {}
  var db = firebase.firestore();
  const cookies = nookies.get(context);
  const token = await verifyIdToken(cookies.token);
  const {email} = token;
  const facilities = [];

  await db.collection('turfData').doc(context.query.id).get().then(result => {
      content['name'] = result.data().name;
      content['location'] = result.data().location;
      content['bookings'] = result.data().bookings;
      content['imageUrl'] = result.data().imageUrl;
      content['price'] = result.data().price;
      content['adminEmail'] = result.data().email;
      facilities[0] = result.data().facilities;
  });

  //stripe
  const stripe = new Stripe('sk_test_51Ifj2ESIx03WM52JVP64h9S6mjSJlSGIp2V9SqHGbMUV6JBINUiur7pYZKOZVFUu2f6KoFOjCQsqGBq88h3NI7kv00HRMscnis');

  let paymentIntent;

  const { paymentIntentId } = await parseCookies(context);

  if (paymentIntentId) {
    paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    return {
      props: {
        paymentIntent,
        name: content.name,
          location: content.location,
          bookings: content.bookings,
          id: context.query.id,
          url: content.imageUrl,
          email: email,
          price: content.price,
          adminEmail: content.adminEmail,
          facilities: facilities
      }
    };
  }
  paymentIntent = await stripe.paymentIntents.create({
      amount: content.price *100,
      currency: "inr"
    });
  
    setCookie(context, "paymentIntentId", paymentIntent.id);
  
    return {
      props: {
        paymentIntent: paymentIntent,
        name: content.name,
          location: content.location,
          bookings: content.bookings,
          id: context.query.id,
          url: content.imageUrl,
          email: email,
          price: content.price,
          adminEmail: content.adminEmail,
          facilities: facilities,
      }
    };
}

export default KuttyHero;