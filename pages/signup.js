import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import firebaseClient from '../firebaseClient';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import emailjs from 'emailjs-com';
import otpGenerator from 'otp-generator';

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
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [verifyId, setVerifyId] = useState("");

    var db = firebase.firestore();
    firebaseClient();
    const toast = useToast();

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
                  bookings: [],
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
              
              {/* <Text fontFamily={'heading'} fontSize={{ base: '4xl', md: '6xl' }}>
                +
              </Text>
              <Flex
                align={'center'}
                justify={'center'}
                fontFamily={'heading'}
                fontSize={{ base: 'sm', md: 'lg' }}
                bg={'gray.800'}
                color={'white'}
                rounded={'full'}
                width={useBreakpointValue({ base: '44px', md: '60px' })}
                height={useBreakpointValue({ base: '44px', md: '60px' })}
                position={'relative'}
                _before={{
                  content: '""',
                  width: 'full',
                  height: 'full',
                  rounded: 'full',
                  transform: 'scale(1.125)',
                  bgGradient: 'linear(to-bl, orange.400,yellow.400)',
                  position: 'absolute',
                  zIndex: -1,
                  top: 0,
                  left: 0,
                }}>
                YOU
              </Flex> */}
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
                Sign Up&nbsp;
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
                  placeholder="Name"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  onChange={(e) => setName(e.target.value)}
                    type='input' 
                    id='name' 
                    value={name}
                    aria-describedby='name-helper-text'
                />
                </FormControl>
                <FormControl isRequired>
                <Input
                  placeholder="Mobile Number"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  onChange={(e) => setMobile(e.target.value)}
                    type='text' id='pass' value={mobile}
                    aria-describedby='mobile-helper-text'
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
                  placeholder="Generate OTP"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  onChange={(e) => setOtp(e.target.value)}
                    type='text' 
                    id='otp' 
                    value={otp}
                    aria-describedby='otp-helper-text'
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
                isDisabled={email === '' || pass === '' || name === '' || mobile === ''} 
                onClick = {() => {
                    emailjs.send('service_z6cltgd', 'template_jtkla8g', emailToUser, 'user_2aLKtYP7rnIjbt16dV8lj')
                }}>
                Generate OTP
              </Button>
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
                isDisabled={email === '' || pass === '' || name === '' || mobile === '' || otp === '' }
                onClick={handleSubmit}>
                  Sign In
              </Button>
              <Box alignSelf={'end'} >
                <br/>
              <Text fontWeight={'600'} color={'white'} >Already have an account?</Text>
              <Link href={'/login'} >
                <Text color={'white'}  textDecor={'underline'} cursor={'pointer'} >Sign In</Text>
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
              <Text fontWeight={'600'} color={'white'} >Already have an account?</Text>
              <Link href={'/login'} >
                <Text color={'white'} textDecor={'underline'} cursor={'pointer'} >Sign In</Text>
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
                Sign Up&nbsp;
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
                  placeholder="Name"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  onChange={(e) => setName(e.target.value)}
                    type='input' 
                    id='name' 
                    value={name}
                    aria-describedby='name-helper-text'
                />
                </FormControl>
                <FormControl isRequired>
                <Input
                  placeholder="Mobile Number"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  onChange={(e) => setMobile(e.target.value)}
                    type='text' id='pass' value={mobile}
                    aria-describedby='mobile-helper-text'
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
                  placeholder="Generate OTP"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  onChange={(e) => setOtp(e.target.value)}
                    type='text' 
                    id='otp' 
                    value={otp}
                    aria-describedby='otp-helper-text'
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
                isDisabled={email === '' || pass === '' || name === '' || mobile === ''} 
                onClick = {() => {
                    emailjs.send('service_z6cltgd', 'template_jtkla8g', emailToUser, 'user_2aLKtYP7rnIjbt16dV8lj')
                }}>
                Generate OTP
              </Button>
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
                isDisabled={email === '' || pass === '' || name === '' || mobile === '' || otp === '' }
                onClick={handleSubmit}>
                  Sign In
              </Button>
              {/* <Button
              fontFamily={'heading'}
                mt={8}
                w={'full'}
                bgGradient="linear(to-r, red.400,pink.400)"
                color={'white'}
                _hover={{
                  bgGradient: 'linear(to-r, red.400,pink.400)',
                  boxShadow: 'xl',
                }}>
                  <Link href='./login'>
                    <a>Login</a>
                  </Link>
                </Button> */}
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