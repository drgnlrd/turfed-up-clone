import React, { useState, useEffect } from 'react';
import Link from 'next/Link';
import firebaseClient from '../../firebaseClient';
import firebase from 'firebase';
import 'firebase/auth';

import { Box, Flex, Button, Input, FormControl, FormLabel, FormHelperText, Stack, Heading, useToast } from "@chakra-ui/react";

export default function Login(){
    firebaseClient();
    const toast = useToast();
    const [unique, setUnique] = useState("");
    const [pass, setPass] = useState("");
    const [p, setP] = useState(0);

    // const handleSubmit = () => {
    //     admin.forEach(data => {
    //         const adminId = data.turfId;
    //         const password = data.password;

    //         if(adminId == unique && password == password) {
    //             setP(1);
    //         }
    //     })

    //     if(p==0){
    //         toast({
    //             title: 'An error occured',
    //             descripion: "message",
    //             status: 'error',
    //             duration: 9000,
    //             isClosed: true
    //         });
    //     }
    //     () => {
    //         window.location.href='/admin';
    //     }

    // }

    const [admin, setAdmin] = useState([]);

    // useEffect(() => {
    //     var db = firebase.firestore();
    //     var ref = db.collection('adminAuth');

    //     ref.onSnapshot((snapshot) => {
    //         const newTurfs = snapshot.docs.map((doc) => ({
    //             id:doc.id,
    //             ...doc.data()
    //         }))

    //         setAdmin(newTurfs);
    //     })
    // }, []);


    return(
        <Flex>
            <Box w={500} p={4} my={12} mx='auto'>
                <Heading as='h2' textAlign='center'>
                    Login
                </Heading>
                <FormControl isRequired>
                    <FormLabel htmlFor='unique'> unique id</FormLabel>
                    <Input onChange={(e) => setUnique(e.target.value)}
                    type='text' id='uniqueId' value={unique}
                    aria-describedby='unique-helper-text' />
                </FormControl>
                {/* <FormControl isRequired>
                    <FormLabel htmlFor='password'> Password</FormLabel>
                    <Input onChange={(e) => setPass(e.target.value)}
                    type='password' id='pass' value={pass}
                    aria-describedby='password-helper-text' />
                </FormControl> */}
                <Stack justify='center' mt={6} isinLine spacing={10}>
                    <Link href={'/admin/' + unique} >
                    <Button minWidth='40%' variant='solid'
                        isDisabled={unique === ''}
                        >
                            Login
                        </Button>
                    </Link>
                </Stack>
            </Box>
        </Flex>
    )
}