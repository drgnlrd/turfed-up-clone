import React, { useState, useEffect } from 'react';
import firebaseCLient from '../firebaseCLient';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import nookies,{parseCookies, setCookie} from "nookies";
import {verifyIdToken} from '../firebaseAdmin';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import emailjs from 'emailjs-com';
import Layout from '../components/Container';
import CheckoutForm from "../components/CheckoutForm";
import Stripe from "stripe";




import { Box, Flex, Text, Button, Input, FormControl, FormLabel, FormHelperText, Stack, Heading, useToast, Linkst, Select,
                AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody,
                AlertDialogFooter, useDisclosure  } from "@chakra-ui/react";

function Details ({name,location,bookings,id,url,email,price,adminEmail,paymentIntent, facilities}) {
    
    console.log(facilities);
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

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    
    return(
        <Layout>
        <Flex>
            <Box w={500} p={4} my={12} mx='auto'>
                <FormControl>
                    <Input as={DatePicker} id={"date"} selected={date1} minDate={new Date()} maxDate={moment().add(15, 'days')._d} onChange={e => handleDateChange(e)}/>
                    <Select id={'time'} isDisabled={date1 === ''}>
                        {existingTimes.map((time, id)=>{
                            if(fetchedTime.includes(time)){
                                return(
                                    <option key={id} value={time} style={{ background: 'lightgray'}} disabled >{time} &nbsp;&nbsp; -booked</option>
                                )
                            }
                            else {
                            return(
                                <option key={id} value={time}>{time}</option>
                            ) }
                        })}        
                    </Select>
                    
                    <Button onClick={onOpen} isDisabled={ date1 === '' } >Book Now</Button>
                    <AlertDialog
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
                            <CheckoutForm paymentIntent={paymentIntent} setPaymentDone={setPaymentDone}/>
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                            No
                            </Button>
                        </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                </FormControl>
            </Box>
            <Box w={500} p={4} my={12} mx='auto'>
            <Text>{name} + {location} + {price} </Text>
            </Box>
        </Flex> 
        </Layout>
    )
}

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
        amount: 1000,
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

export default Details;