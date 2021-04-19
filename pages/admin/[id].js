import React, { useState, useEffect } from 'react';
import firebaseClient from '../lib/firebaseClient';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import emailjs from 'emailjs-com';



import { Box, Flex, Text, Divider, Input, FormControl,Button, FormLabel, FormHelperText, Stack, Heading, useToast, Linkst, Select,
                AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody,
                AlertDialogFooter, useDisclosure  } from "@chakra-ui/react";


// function renderDates(bookings) {
//     const [passedDate, setPassedDate] = useState([]);
    

//     return passedDate;

// }

function details({name, bookings, id, adminEmail}) {

    const db = firebase.firestore();

    const [ date1, SetDate1 ] = useState('');
    const [fetchedTime, setFetchedTime] = useState([]);
    const [p, setP] = useState(0);

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
                break;
            }
            else {
                setFetchedTime([]);
                setP(0);
            }
        }
    }
    },[date1])
    
    const handleDateChange = (e) => {        
        SetDate1(e);   
    }

    const handleSubmit = () => {
        const useMe = document.getElementById('time').selectedOptions[0].value;
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
                    console.log('in p==0');
                    bookings.push({
                            date: date1.toString(),
                            timings: [useMe]
                            });
                            console.log(bookings);
                        break;
                }
                else if(booking.date==date1){
                    console.log('in p==' + p);
                    booking.timings.push(useMe);
                    break;
                }
            }
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

            emailjs.send('service_qr4ri5c', 'template_cny1zke', emailToAdmin, 'user_gXqAxI680FcdwuvFzF1T2')
                .then(() => {
                    alert('booked');
                    window.location.href = '/admin/' + id;
                },);
        }

    }

    firebaseClient();

    return(
        <Flex>
            <Box w={600} p={4} my={12} mx='auto'>
                <Text fontSize="3xl"> Welcome to admin page of {name}</Text>
                <Divider />
                <Text fontSize="2xl">Bookings:</Text>
                <Text>Past Bookings:</Text>
            {
                bookings.map((booking, id) =>{ 
                    const past_d = moment(new Date()).subtract(1, 'days')._d;
                    if (Date.parse(booking.date)<Date.parse(past_d)){
                    return(
                    <Box w={300} p={4} my={12} mx='auto' bg='lightgray' key={id}>
                        <Text>{booking.date}</Text>
                        {
                            booking.timings.map((time,id) => (
                                <Box key={id} borderRadius="md" bg="tomato" color="white" >
                                    <Text>{ time }</Text>
                                    <Divider />
                                </Box>
                            ))
                        }
                    </Box>)}
                })
            }
            <Text>Upcoming Bookings:</Text>
            {
                bookings.map((booking, id) =>{ 
                    const past_d = moment(new Date()).subtract(1, 'days')._d;
                    if (Date.parse(booking.date)>Date.parse(past_d)){
                    return(
                    <Box w={300} p={4} my={12} mx='auto' bg='lightgray' key={id}>
                        <Text>{booking.date}</Text>
                        {
                            booking.timings.map((time,id) => (
                                <Box key={id} borderRadius="md" bg="tomato" color="white" >
                                    <Text>{ time }</Text>
                                    <Divider />
                                </Box>
                            ))
                        }
                    </Box>)}
                })
            }
            </Box>

            <Box>
                <Text>Book</Text>
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
                    <Button onClick={handleSubmit} >Book</Button>
                </FormControl>
            </Box>
        </Flex>
    )
}

export const getServerSideProps = async (context) =>{
    const content = {}
    var db = firebase.firestore();

    await db.collection('turfData').doc(context.query.id).get().then(result => {
        content['name'] = result.data().name;
        content['bookings'] = result.data().bookings;
        content['adminEmail'] = result.data().email;
    });


    return {
        props: {
            name: content.name,
            bookings: content.bookings,
            id: context.query.id,
            adminEmail: content.adminEmail
        }
    }
}

export default details;