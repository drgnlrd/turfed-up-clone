import React, { useState, useEffect } from 'react';
import firebaseCLient from '../firebaseCLient';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import Link from 'next/Link';
import Layout from '../components/Container';

import { 
  Box,
  Flex, 
  Text, 
  Button, 
  Input, 
  FormControl, 
  FormLabel, 
  FormHelperText, 
  Stack, 
  Heading, 
  useToast, 
  Linkst, 
  chakra,
  Image,
  Icon,
  useColorModeValue } from "@chakra-ui/react";

  import { FaRupeeSign } from 'react-icons/fa'

  import { MdLocationOn, MdEmail } from 'react-icons/md'

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
        <Box w={500} p={4} rounded={'20'}my={12} mx='auto'>
          {turfs.map((item) =>(
            <Box
              key={item.id}
              w="full"
              mx="auto"
              mb={10}
              boxShadow={useColorModeValue('0 0px 32px 0 rgba( 255,255,255, 0.07 )','0 0px 32px 0 rgba( 255,255,255, 0.1 )')}
              bg={useColorModeValue('rgba( 100, 100, 100, 0.25 )','rgba( 255, 255, 255, 0.25 )')}
              rounded="lg"
              overflow="hidden"
            >
              <Image
                w="full"
                h={56}
                fit="cover"
                objectPosition="center"
                src={item.imageUrl}
                alt="turf"
                opacity={'0.7'}
              />

              <Flex alignItems="center" px={6} justify={'space-between'} py={3} bg={useColorModeValue('rgba( 100, 100, 100, 0.85 )','rgba( 0, 0, 0, 0.45 )')}>
                <Box>
                  <Text color="white" fontWeight="bold" fontSize="lg">
                  {item.name}
                  </Text>
                </Box>
                <Button
                as={'a'}
                  bgGradient="linear(to-r, red.500 ,orange.400)"
                  color={'white'}
                  href={'/' + item.id}
                  _hover={{
                    bgGradient: 'linear(to-r, red.600 ,orange.500)',
                    boxShadow: 'xl',
                  }}
                  py={0}
                >
                  Book Now
                </Button>
              </Flex>

              <Box py={4} px={6}>

                <Flex
                  alignItems="center"
                  color={useColorModeValue("gray.700", "gray.200")}
                >
                  <Icon as={MdLocationOn} h={6} w={6} mr={2} />

                  <Text px={2} fontWeight={'medium'} fontSize="lg">
                    {item.location}
                  </Text>
                </Flex>
                <Flex
                  alignItems="center"
                  mt={2}
                  color={useColorModeValue("gray.700", "gray.200")}
                >
                  <Icon as={FaRupeeSign} h={6} w={6} mr={2} />

                  <Text px={2} fontWeight={'medium'} fontSize="lg">
                    {parseInt(item.price).toFixed(2)}&nbsp;/per Hour
                  </Text>
                </Flex>
                
              </Box>
            </Box>
            
            ))}

            
            </Box>
        </Flex>
        
    </Layout>
  )
}