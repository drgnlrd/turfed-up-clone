import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import firebaseClient from '../firebaseClient';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import shortid from 'shortid'
import emailjs from 'emailjs-com';
import otpGenerator from 'otp-generator';

import { Box, Flex, Button, Input, FormControl, FormLabel, FormHelperText, Stack, Heading, useToast } from "@chakra-ui/react";

export default function signup() {
    firebaseClient();
    const toast = useToast();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [verifyId, setVerifyId] = useState("");

    var db = firebase.firestore();

    useEffect(() => {
        setVerifyId(otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false }));
    }, [])

    
    const emailToUser = {
        to_name : name,
        to_email : email,
        message: verifyId,
   }

   const handleSubmit = async() => {
    console.log(verifyId);
    if(otp == verifyId) {
        await firebase.auth().createUserWithEmailAndPassword(email,pass).then(() => {
            db.collection('userData').add({
                name: name,
                email: email,
                mobile: mobile,
                bookings:"",
            })
        })
        .then(function() {
            window.location.href = '/'
        }).catch(function (error) {
            const message = error.message;
            toast({
                title: 'An error occured',
                descripion: message,
                status: 'error',
                duration: 9000,
                isClosed: true
            });
        });
        console.log('otp verified');
    } 
    else {
        alert('wrong otp!!');
    }    
}

    return(
        <Flex>
            <Box w={500} p={4} my={12} mx='auto'>
                <Heading as='h2' textAlign='center'>
                    SignUp
                </Heading>
                <FormControl isRequired>
                    <FormLabel htmlFor='email'> Email Address</FormLabel>
                    <Input onChange={(e) => setEmail(e.target.value)}
                    type='email' id='emailAddress' value={email}
                    aria-describedby='email-helper-text' />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor='password'> Password</FormLabel>
                    <Input onChange={(e) => setPass(e.target.value)}
                    type='password' id='pass' value={pass}
                    aria-describedby='password-helper-text' />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor='name'> Name</FormLabel>
                    <Input onChange={(e) => setName(e.target.value)}
                    type='input' id='name' value={name}
                    aria-describedby='name-helper-text' />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor='mobile'> Mobile Number</FormLabel>
                    <Input onChange={(e) => setMobile(e.target.value)}
                    type='text' id='pass' value={mobile}
                    aria-describedby='mobile-helper-text' />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel htmlFor='otp'> Enter otp</FormLabel>
                    <Input onChange={(e) => setOtp(e.target.value)}
                    type='text' id='otp' value={otp}
                    aria-describedby='otp-helper-text' />
                </FormControl>

                <Button isDisabled={email === '' || pass === '' || name === '' || mobile === ''} 
                onClick = {() => {
                    emailjs.send('service_z6cltgd', 'template_jtkla8g', emailToUser, 'user_2aLKtYP7rnIjbt16dV8lj')
                }} >
                    Generate Otp
                </Button>
                
                <Stack justify='center' mt={6} isinLine spacing={10}>
                    <Button minWidth='40%' variant='solid' variantcolor='blue'
                    isDisabled={email === '' || pass === '' || name === '' || mobile === '' || otp === '' }
                        onClick={handleSubmit}
                        >
                            Create Account
                        </Button>
                        <Button minWidth='40%' variant='solid' variantColor='blue'>
                            <Link href='./login'>
                                <a>Login</a>
                            </Link>
                        </Button>
                </Stack>
            </Box>
        </Flex>
    )
}