
import {
    Flex,
    Stack,
    Heading,
    Text,
    Input,
    Button,
    Icon,
    Box,
    useColorModeValue,
    createIcon,
    Container,
    Divider,
    useToast,
    Link
  } from '@chakra-ui/react';
  import React,{ useState, useEffect} from 'react';
import nookies from "nookies";
import {verifyIdToken} from '../lib/firebaseAdmin';
// import firebaseClient from '../lib/firebaseClient';
import 'firebase/auth';
import firebase from 'firebase';
import 'firebase/firestore';
import Layout from '../components/Container';

function renderTurf(email){
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

const temp = ({email}) => {

    const turf = renderTurf(email);
    return (
        <Layout>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        py={12}
        >
        <Container maxW={'container.sm'}>
        <Stack
          boxShadow={'2xl'}
          bg={useColorModeValue('rgba(255,255,255,0.1)', 'rgba(0,0,0,0.6)')}
          rounded={'xl'}
          p={10}
          spacing={8}
          align={'center'}>
          <Stack align={'center'} spacing={2}>
            <Heading
              textTransform={'uppercase'}
              fontSize={'3xl'}
              color={useColorModeValue('gray.800', 'gray.200')}>
             My Bookings:
            </Heading>
          </Stack>
          <Stack spacing={4} direction={{ base: 'column', md: 'column' }} w={'full'}>
            
          {
                    turf.map((item, id) => (
                        <Box key={id}
                        >
                            {
                                item.bookings.map((res,id) => (
                                  <>
                                    <Box key={id}
                                    bg={useColorModeValue('rgba(255,255,255,0)', 'rgba(0,0,0,0.1)')} boxShadow={'2xl'} rounded={'xl'}
                                    p={10}
                                    spacing={8}
                                    >
                                    <Text>{res.date}</Text>
                                    <Text ><Text fontWeight={'700'} as={'span'}>Turf Name:</Text>&nbsp; {res.turfName}  </Text>
                                    <Text ><Text fontWeight={'700'} as={'span'}>Timings</Text>&nbsp; {res.timings}  </Text>
                                    </Box>
                                    <Divider />
                                    </>
                                ))
                            }
                        </Box>
                    )) 
                }

          </Stack>
        </Stack>
        </Container>
      </Flex>
      </Layout>
    );
}

export async function getServerSideProps(context){
        
        const cookies = nookies.get(context);
        const token = await verifyIdToken(cookies.token);
        const {email} = token;
        return {
            props: {
                email: email,
            }
        };
}

export default temp;