import React, { useState, useEffect } from 'react';
import firebaseCLient from '../firebaseCLient';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import Link from 'next/Link';
import Layout from '../components/Container';

import { Box, Flex, Text, Button, Input, FormControl, FormLabel, FormHelperText, Stack, Heading, useToast, Linkst } from "@chakra-ui/react";

function renderTurf(){
    const [Link, setLink] = useState([]);

    useEffect(() => {
        var db = firebase.firestore();
        var ref = db.collection('turfData');

        ref.onSnapshot((snapshot) => {
            const newTurfs = snapshot.docs.map((doc) => ({
                id:doc.id,
                ...doc.data()
            }))

            setLink(newTurfs);
        })
    }, []);

    return Link
}

export default function Home() {
  firebaseCLient();
  const turfs = renderTurf();

  return (
    <Layout>
      <Flex>
        <Box w={500} rounded={'20'} p={4} my={12} mx='auto'>
          {turfs.map((item) =>(
            <Link href={'/' + item.id} key={item.id}>
            <Box w={300} p={4} my={12} mx='auto' bg='tomato'>
              <Text>{item.name}</Text>
              <Text>{item.location}</Text>
            </Box>
            </Link>
            ))}
            </Box>
        </Flex>
    </Layout>
  )
}