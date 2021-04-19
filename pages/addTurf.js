import React, { useState,useEffect } from 'react';
import firebaseClient from '../lib/firebaseClient';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import { Box, Flex, Button, Input, FormControl, FormLabel, FormHelperText, Stack, Heading, useToast, Text } from "@chakra-ui/react";

export default function addTurf() {

    firebaseClient();
    const toast = useToast();
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [price, setPrice] = useState([]);

    var db = firebase.firestore();
    var storage = firebase.storage();

    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        setImage(e.target.files[0]);
    }

    const handleSumbit = async() => {

        const storageRef = storage.ref('turfs');
                const fileRef = storageRef.child(image.name);
                await fileRef.put(image).then(()=> {
                    storageRef.child(image.name).getDownloadURL().then(async (res) => {
                        console.log(res);
                        await db.collection("turfData").add({
                            name: name,
                            location: location,
                            imageUrl:[res],
                            bookings: "",
                            facilities: {
                                parking: true,
                                washroom: true,
                                football: true,
                                bibs: false,
                                shower: false,
                                stumps: false,
                            },
                            email : email,
                            mobile: mobile,
                            price:[price]
                        })
                        .then(function() {
                        window.location.href = '/'
                        })
                        .then(() => {
                            toast({
                                title: 'Turf added',
                                descripion: message,
                                status: 'added',
                                duration: 5000,
                                isClosed: true
                            })
                        })
                        // .catch(function (error) {
                        //     toast({
                        //         title: error,
                        //         status: 'error',
                        //         duration: 9000,
                        //         isClosed: true
                        //     });
                        // });
                    })
                })
       
            
        
    }

    return(
        <Flex>
             <Box w={500} p={4} my={12} mx='auto'>
                 <Heading as='h2' textAlign='center'>
                     Add Turf
                 </Heading>
                <FormControl isRequired>
                     <FormLabel htmlFor='name'> Turf Name</FormLabel>
                     <Input onChange={(e) => setName(e.target.value)}
                    type='text' id='turfName' value={name}
                    aria-describedby='name-helper-text' />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor='location'> Location</FormLabel>
                    <Input onChange={(e) => setLocation(e.target.value)}
                    type='text' id='location' value={location}
                    aria-describedby='location-helper-text' />
                </FormControl>
                <FormControl isRequired>
                        <FormLabel htmlFor='email'> Turf-admin email</FormLabel>
                        <Input onChange={(e) => setEmail(e.target.value)}
                            type='email' id='turf-email'
                            aria-describedby='email-helper-text' />
                        </FormControl>
                        <FormControl isRequired>
                        <FormLabel htmlFor='mobile'> Turf-admin Mobile</FormLabel>
                        <Input onChange={(e) => setMobile(e.target.value)}
                            type='tel' id='turf-mobile' maxLength='10'
                            aria-describedby='mobile-helper-text' />
                        </FormControl>
                        <FormControl isRequired>
                    <FormLabel htmlFor='price'> Price/hr</FormLabel>
                    <Input onChange={(e) => setPrice(e.target.value)}
                    type='text' id='price' value={price}
                    aria-describedby='price-helper-text' />
                </FormControl>
                <FormControl isRequired>
                        <FormLabel htmlFor='image'> Turf Image</FormLabel>
                        <Input 
                        onChange={handleChange}
                            type='file' id='turf-img'
                            aria-describedby='image-helper-text' />
                        </FormControl>
                <Stack justify='center' mt={6} isinLine spacing={10}>
                    <Button minWidth='40%' variant='solid' variantcolor='blue'
                    isDisabled={name === '' || location === '' || email === '' || mobile === ''}
                        onClick={handleSumbit}
                        >
                            Create Turf
                        </Button>
                        </Stack>
            </Box>
        </Flex>
    )
}