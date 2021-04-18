import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import firebaseClient from '../firebaseClient';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

import {
    Box,
    Flex,
    Stack,
    Heading,
    Text,
    Container,
    Input,
    Button,
    SimpleGrid,
    Avatar,
    AvatarGroup,
    useBreakpointValue,
    IconProps,
    Icon,
    FormControl, FormLabel, FormHelperText, useToast, Image, useColorModeValue, Spacer
  } from '@chakra-ui/react';

  
  export default function JoinOurTeam() {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    firebaseClient();
    const toast = useToast();

    return (
      <Box minH={'100vh'} position={'relative'} bg={['url("/signbg.jpg") fixed','none']} >
        <Container
          as={SimpleGrid}
          maxW={'7xl'}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, lg: 32 }}
          py={{ base: 10, sm: 20, lg: 32 }}
          
          bgSize={'100%'} 
          minH={'100vh'} display={{base: 'block', md: 'none'}} >
          <Stack spacing={{ base: 10, md: 20 }}>
            <Heading
              lineHeight={1.1}
              fontSize={{ base: '5xl', sm: '4xl', md: '5xl', lg: '6xl' }}
              zIndex={'10'}
              >
              Lets Get{' '}
              <Text
                as={'span'}
                bgGradient="linear(to-r, red.700, red.500 ,orange.400)"
                bgClip="text">
                Turfed Up!
              </Text>
            </Heading>
            <Stack direction={'row'} spacing={4} align={'center'}>
            </Stack>
          </Stack>
          <Stack 
              bg={'white'}
              h={'100%'}
              w={'100%'}
          >

          </Stack>
          <Stack
            display={{base: 'flex', md: 'none'}}>
            <Box className={'glass-mobile'} h={'100%'} w={'100%'} bg={'rgba( 0, 0, 0, 0.65 )'} boxShadow={'0 8px 32px 0 rgba( 0,0,0, 0.47 )'} rounded={'10px'} p={10} > 
            <Stack spacing={4}>
              <Heading
                color={'gray.800'}
                lineHeight={1.1}
                fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
                color={useColorModeValue('gray.800','white')}>
                Sign In&nbsp;
                <Text
                  as={'span'}
                  bgGradient="linear(to-r, red.700, red.500 ,orange.400)"
                  bgClip="text">
                  !
                </Text>
              </Heading>
              
            </Stack>
            <Box as={'form'} mt={10} >
              <Stack spacing={4}>

              <FormControl isRequired>
                <Input
                  placeholder="Email"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                    type='email' 
                    id='emailAddress' 
                    value={email}
                    aria-describedby='email-helper-text'
                />
                </FormControl>
                <FormControl isRequired>
                <Input
                  placeholder="Password"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  onChange={(e) => setPass(e.target.value)}
                    type='password' id='pass' value={pass}
                    aria-describedby='password-helper-text'
                />
                </FormControl>
              </Stack>
              <Button
              fontFamily={'heading'}
                mt={8}
                w={'full'}
                bgGradient="linear(to-r, red.500 ,orange.400)"
                color={'white'}
                _hover={{
                  bgGradient: 'linear(to-r, red.600 ,orange.500)',
                  boxShadow: 'xl',
                }}
                isDisabled={email === '' || pass === '' }
                onClick={async () => {
                            await firebase.auth().signInWithEmailAndPassword(email,pass).then(function() {
                            window.location.href = '/'
                            }).catch(function (error) {
                                const message = error.message;
                                toast({
                                    title: message,
                                    descripion: message,
                                    status: 'error',
                                    duration: 9000,
                                    isClosed: true
                                });
                            });
                        }}>
                  Sign In
              </Button>
              <Box alignSelf={'end'} >
                <br/>
              <Text fontWeight={'600'} color={'white'} >Don't have an account?</Text>
              <Link href={'/signup'} >
                <Text color={'white'}  textDecor={'underline'} cursor={'pointer'} >Sign Up</Text>
              </Link>
            </Box>
            </Box>
            </Box>
          </Stack>
        </Container>
        <Box display={{base: 'none', md: 'block'}} >
        <Stack minH={'100vh'} diplay={{base:'none',md: 'block'}} direction={{ base: 'column', md: 'row' }}>
        
        <Flex flex={1} bg={'url("/images/wallpapersign.jpg") no-repeat'} bgSize={'cover'} rounded={'0px 30px 30px 0px'} p={10} justifyContent={'center'} alignItems={'center'} >
          <Box className={'glass'} h={'100%'} w={'80%'} bg={'rgba( 0, 0, 0, 0.35 )'} boxShadow={'0 8px 32px 0 rgba( 0,0,0, 0.47 )'} rounded={'10px'} p={10} > 
            <Stack direction={'column'} justifyContent={'space-between'} h={'100%'} >
          <Heading
              lineHeight={1.1}
              fontSize={{ base: '5xl', sm: '4xl', md: '5xl', lg: '6xl' }}
              zIndex={'10'}
              color={'white'}
              >
              Lets Get<br />
              <Text
                as={'span'}
                bgGradient="linear(to-r, red.700, red.500 ,orange.400)"
                bgClip="text">
                Turfed Up!
              </Text>
            </Heading>
            <Box alignSelf={'end'} >
              <Text fontWeight={'600'} color={'white'} >Don't have an account?</Text>
              <Link href={'/signup'} >
                <Text color={'white'} textDecor={'underline'} cursor={'pointer'} >Sign Up</Text>
              </Link>
            </Box>
            </Stack>
          </Box>
        </Flex>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={6} w={'full'} maxW={'lg'}>
            
            <Box as={'form'} mt={10} p={10} boxShadow={'md'} >
            <Stack mb={8}>
              <Heading
                color={'gray.800'}
                lineHeight={1.1}
                fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
                color={useColorModeValue('gray.800','white')}>
                Sign In&nbsp;
                <Text
                  as={'span'}
                  bgGradient="linear(to-r, red.700, red.500 ,orange.400)"
                  bgClip="text">
                  !
                </Text>
              </Heading>
              
            </Stack>
              <Stack spacing={4}>
              <FormControl isRequired>
                <Input
                  placeholder="Email"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                    type='email' 
                    id='emailAddress' 
                    value={email}
                    aria-describedby='email-helper-text'
                />
                </FormControl>
                <FormControl isRequired>
                <Input
                  placeholder="Password"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  onChange={(e) => setPass(e.target.value)}
                    type='password' id='pass' value={pass}
                    aria-describedby='password-helper-text'
                />
                </FormControl>
              </Stack>
              <Button
              fontFamily={'heading'}
                mt={8}
                w={'full'}
                bgGradient="linear(to-r, red.500 ,orange.400)"
                color={'white'}
                _hover={{
                  bgGradient: 'linear(to-r, red.600 ,orange.500)',
                  boxShadow: 'xl',
                }}
                isDisabled={email === '' || pass === '' }
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
                        }}>
                  Sign In
              </Button>
            </Box>
          </Stack>
        </Flex>
      </Stack>
      </Box>
        <Blur
          position={'absolute'}
          top={-10}
          left={-10}
          style={{ filter: 'blur(70px)' }}
          display={'none'}
        />
      </Box>
    );
  }
  
  export const Blur = (props) => {
    return (
      <Icon
        width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
        zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
        height="560px"
        viewBox="0 0 528 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}>
        <circle cx="71" cy="61" r="111" fill="#F56565" />
        <circle cx="244" cy="106" r="139" fill="#ED64A6" />
        <circle cy="291" r="139" fill="#ED64A6" />
        <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
        <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
        <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
        <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
      </Icon>
    );
  };