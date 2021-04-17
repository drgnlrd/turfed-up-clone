import React,{useEffect} from 'react'
import Link from 'next/link';
import {useAuth} from '../auth';
import Container from '../components/Container';
import {useRouter} from 'next/router';
import {Flex, Box, Button, Text, Heading, Stack} from '@chakra-ui/react';
import firebase from 'firebase';

export default function Home() {
  
  const { user } = useAuth();


  // firebase.auth().languageCode = 'it';
// To apply the default browser preference instead of explicitly setting it.
// firebase.auth().useDeviceLanguage();

  return (
    <Container>
      <Flex>
        <Box w={500} p={4} my={12} mx='auto'>
          <Heading as='h2' textAlign='center'>
            Welcome to the home page.
          </Heading>
          <Text mt={8} textAlign='center'>
            {`User ID: ${user ? user.uid : "No user signed in"
            }`}
          </Text>
          <Stack 
          mt={8} alignItems='center' justifyContent='center' inInline width='100%'>
            <Button variant='solid' variantColor='blue' width='100%' >
              <Link href='/authenticated'>
                <a isDisabled={!user}> Go to authentication route</a>
              </Link>
            </Button>
            <Button variant='solid' variantColor='green' width='100%' >
              <Link href='/login'>
                <a> Login</a>
              </Link>
            </Button>
          </Stack>
        </Box>
      </Flex>
    </Container>
  )
}
