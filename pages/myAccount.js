import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import firebaseClient from '../lib/firebaseClient';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import nookies from "nookies";
import {verifyIdToken} from '../firebaseAdmin';
import Layout from '../components/Container';

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
    FormControl, FormLabel, FormHelperText, useToast, Image, useColorModeValue, Spacer, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody,
    AlertDialogFooter, useDisclosure, Select
  } from '@chakra-ui/react';

  
  function renderUser(email){
    const [Link, setLink] = useState([]);

    useEffect(() => {
        var db = firebase.firestore();
        var ref = db.collection('userData').where('email','==',email);

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

  export default function JoinOurTeam({email}) {

    const myUser = renderUser(email);
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const toast = useToast();

    var db = firebase.firestore();
    const handleSubmit = () => {
        var ref = db.collection('userData');
        myUser.map(res=> {
            ref.doc(res.id).update({
                name: name,
                mobile: mobile,
            }).then(() =>{
                toast({
                    description: 'Account updated',
                    status: 'success',
                    duration: 3000,
                    onClose: true
                })
            })
        })  
    }

    const handleDelete = () => {
        var ref = db.collection('userData');
        myUser.map((res) => {
            ref.doc(res.id).delete().then(()=> {
                window.location.href = '/login'
            })
        })
    }

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();

    return (
        <Layout>
      <Box minH={'90vh'} position={'relative'}  >
        <Container
          as={SimpleGrid}
          maxW={'7xl'}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, lg: 32 }}
          py={{ base: 10, sm: 20, lg: 32 }}
          
          bgSize={'100%'} 
          minH={'90vh'} display={{base: 'block', md: 'none'}} >
          <Stack spacing={{ base: 10, md: 20 }}>
            
            {
                    myUser.map((res, id) =>(
                        <Box key={id}>
                        <Flex justifyContent='center' alignItems='center' >
                            <Avatar name={res.name} size='xl' src={res.avatar}/>
                         </Flex><br/>
                            <Text><Text fontWeight={'700'} as={'span'} bgGradient={'linear(to-r, red.700, red.500 ,orange.400)'} bgClip={'text'} >Name:</Text> {res.name}</Text>
                            <Text><Text fontWeight={'700'} as={'span'} bgGradient={'linear(to-r, red.700, red.500 ,orange.400)'} bgClip={'text'} >Email:</Text> {res.email}</Text>
                            <Text><Text fontWeight={'700'} as={'span'} bgGradient={'linear(to-r, red.700, red.500 ,orange.400)'} bgClip={'text'} >Mobile:</Text> {res.mobile}</Text>
                        </Box>
                    ))
                }
           
            
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
            <Box className={'glass-mobile'} h={'100%'} w={'100%'} bg={useColorModeValue('rgba(0,0,0,0.35)','rgba( 0, 0, 0, 0.65 )')} boxShadow={'0 8px 32px 0 rgba( 0,0,0, 0.47 )'} rounded={'10px'} p={10} > 
            <Stack spacing={4}>
              <Heading
                color={'gray.800'}
                lineHeight={1.1}
                fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
                color={useColorModeValue('gray.800','white')}>
                Update Details&nbsp;
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
                    type='name' id='name' 
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
                  
                    type='text' 
                    id='mobile' 
                    aria-describedby='mobile-helper-text'
                    onChange={(e) => setMobile(e.target.value)}
                />
                </FormControl>
                
              </Stack>
              <Button onClick={handleSubmit} disabled={mobile === '' || name === ''}
              fontFamily={'heading'}
                mt={8}
                w={'full'}
                bgGradient="linear(to-r, red.700, red.500 ,orange.400)"
                color={'white'}
                _hover={{
                  bgGradient: 'linear(to-r, red.800, red.600 ,orange.500)',
                  boxShadow: 'xl',
                }}
                >
                  Update
              </Button>
              <Button onClick={onOpen}
              fontFamily={'heading'}
                mt={8}
                w={'full'}
                bgGradient="linear(to-r ,red.500,red.800)"
                color={'white'}
                _hover={{
                  bgGradient: 'linear(to-r ,red.600,red.900)',
                  boxShadow: 'xl',
                }}> 
                    Delete Account
                </Button>
                <Container maxW={'container.xl'}>
                <AlertDialog
                        motionPreset="slideInBottom"
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                        isOpen={isOpen}
                        isCentered
                    >
                        <AlertDialogOverlay />

                        <AlertDialogContent>
                        <AlertDialogHeader>Delete Account?</AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                            Are you sure you want to delete your account? Any pending bookings will still be valid.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                            No
                            </Button>
                            <Button colorScheme="red" ml={3} onClick={handleDelete} >
                            Yes
                            </Button>
                        </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    </Container>
            </Box>
            </Box>
          </Stack>
        </Container>
        <Box display={{base: 'none', md: 'block'}} >
        <Stack minH={'90vh'} diplay={{base:'none',md: 'block'}} direction={{ base: 'column', md: 'row' }}>
        
        <Flex flex={1} rounded={'0px 30px 30px 0px'} p={10} justifyContent={'center'} alignItems={'center'} >
          <Box className={'glass'} h={'100%'} w={'80%'} bg={useColorModeValue('rgba(0,0,0,0.25)','rgba( 0, 0, 0, 0.65 )')} boxShadow={'0 8px 32px 0 rgba( 0,0,0, 0.47 )'} rounded={'10px'} p={10} > 
            <Stack direction={'column'} justifyContent={'space-between'} h={'100%'} >
            <Stack spacing={{ base: 10, md: 20 }}>
            
            {
                    myUser.map((res, id) =>(
                        <Box key={id} textAlign={'center'}>
                        <Flex justifyContent='center' alignItems='center' >
                            <Avatar name={res.name} size='2xl' src={res.avatar}/>
                         </Flex><br/>
                            <Text fontSize={'2xl'}><Text fontWeight={'700'}  as={'span'} bgGradient={'linear(to-r, red.700, red.500 ,orange.400)'} bgClip={'text'} >Name:</Text> {res.name}</Text><br/>
                            <Text fontSize={'2xl'}><Text fontWeight={'700'} as={'span'} bgGradient={'linear(to-r, red.700, red.500 ,orange.400)'} bgClip={'text'} >Email:</Text> {res.email}</Text><br/>
                            <Text fontSize={'2xl'}><Text fontWeight={'700'} as={'span'} bgGradient={'linear(to-r, red.700, red.500 ,orange.400)'} bgClip={'text'} >Mobile:</Text> {res.mobile}</Text>
                        </Box>
                    ))
                }
           
            
            <Stack direction={'row'} spacing={4} align={'center'}>
            </Stack>
          </Stack>
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
                Update Details&nbsp;
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
                    type='text' 
                    id='name' 
                    
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
                    type='text' id='mobile' 
                    aria-describedby='mobile-helper-text'
                />
                </FormControl>
              </Stack>
              <Button onClick={handleSubmit} disabled={mobile === '' || name === ''}
              fontFamily={'heading'}
                mt={8}
                w={'full'}
                bgGradient="linear(to-r, red.500 ,orange.400)"
                color={'white'}
                _hover={{
                  bgGradient: 'linear(to-r, red.600 ,orange.500)',
                  boxShadow: 'xl',
                }}

                >
                Update
              </Button>
              <Button onClick={onOpen}
              fontFamily={'heading'}
                mt={8}
                w={'full'}
                bgGradient="linear(to-r ,red.500,red.800)"
                color={'white'}
                _hover={{
                  bgGradient: 'linear(to-r ,red.600,red.900)',
                  boxShadow: 'xl',
                }}> 
                    Delete Account
                </Button>
                <Container maxW={'container.xl'}>
                <AlertDialog
                        motionPreset="slideInBottom"
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                        isOpen={isOpen}
                        isCentered
                    >
                        <AlertDialogOverlay />

                        <AlertDialogContent>
                        <AlertDialogHeader>Delete Account?</AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                            Are you sure you want to delete your account? Any pending bookings will still be valid.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                            No
                            </Button>
                            <Button colorScheme="red" ml={3} onClick={handleDelete} >
                            Yes
                            </Button>
                        </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    </Container>
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
      </Layout>
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

  export async function getServerSideProps(context) {
    const cookies = nookies.get(context);
        const token = await verifyIdToken(cookies.token);
        const {email} = token;

        return{
            props: {
                email: email,
            }
        }
}