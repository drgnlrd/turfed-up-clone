import React, { useState } from 'react';
import Link from 'next/Link';
import firebaseClient from '../firebaseClient';
import firebase from 'firebase';
import 'firebase/auth';

import { Box, Flex, Button, Input, FormControl, FormLabel, FormHelperText, Stack, Heading, useToast } from "@chakra-ui/react";

export default function Login(){
    firebaseClient();
    const toast = useToast();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    var provider = new firebase.auth.GoogleAuthProvider();

    // function googleLogin() {
    //     firebase.auth().signInWithPopup(provider).then(function() {
    //         window.location.href = '/'
    //         }).catch(function (error) {
    //             const message = error.message;
    //             toast({
    //                 title: 'An error occured',
    //                 descripion: message,
    //                 status: 'error',
    //                 duration: 9000,
    //                 isClosed: true
    //             });
    //         });
    // }

    return(
        <Flex>
            <Box w={500} p={4} my={12} mx='auto'>
                <Heading as='h2' textAlign='center'>
                    Login
                </Heading>
                <FormControl isRequired>
                    <FormLabel htmlFor='email'> Email Address</FormLabel>
                    <Input onChange={(e) => setEmail(e.target.value)}
                    type='email' id='emailAddress' value={email}
                    aria-describedby='email-helper-text' autoComplete={'email'} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor='password'> Password</FormLabel>
                    <Input onChange={(e) => setPass(e.target.value)}
                    type='password' id='pass' value={pass}
                    aria-describedby='password-helper-text' />
                </FormControl>
                <Stack justify='center' mt={6} isinLine spacing={10}>
                    <Button minWidth='40%' variant='solid' variantcolor='blue'>
                        <Link href='./signup'>
                        <a>Create Account </a>
                        </Link>
                    </Button>
                    <Button minWidth='40%' variant='solid' variantColor='blue'
                        isDisabled={email === '' || pass === ''}
                        onClick={async () => {
                            await firebase.auth().signInWithEmailAndPassword(email,pass).then(function() {
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
                        }}
                        >
                            Login
                        </Button>
                        {/* <Button minWidth='40%' variant='solid' variantcolor='blue' onClick={ () => googleLogin()}>
                        Login With Google
                    </Button> */}
                </Stack>
            </Box>
        </Flex>
    )
}