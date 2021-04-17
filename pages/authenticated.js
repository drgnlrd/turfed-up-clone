import React from 'react';
import nookies from "nookies";
import {verifyIdToken} from '../firebaseAdmin';
import firebaseClient from '../firebaseClient';
import firebase from 'firebase';
import 'firebase/firestore';
import {Box, Flex, Text, Heading, Button} from '@chakra-ui/react';

function Authenticated({session}) {
    firebaseClient();
    var db = firebase.firestore();
    var ref = db.collection('turfData');

    const email = 'Your email is nasirvalyani04@gmail.com and your';

    const res1 = session.match(/(?<=is ).*[a-zA-Z0-9](?=@)/g)
    const res2 = session.match(/(?<=@).*[a-zA-Z0-9](?= and)/g)

    const res = res1 + '@' + res2;

    
    console.log(res);

    if(session){
        return(
            <Flex>
                 <Box w={500} p={4} my={12} mx='auto'>
                    <Heading as='h2' textAlign='center'>
                        Authenticated
                    </Heading>
                    <Text textAlign='center' >{session}</Text>
                    <Text textAlign='center'> You do anything now you are Authenticated</Text>
                </Box>
                <Box w={500} p={4} my={12} mx='auto'>
                    <Button width='100%' variant='solid' variantcolor='red' 
                    onClick={async () => {
                        await firebase.auth().signOut();
                        window.location.href = '/' 
                        }}>
                            Sign Out
                        </Button>
                </Box>
            </Flex>
        );
    } else {
        return (
            <Box>
                <Text>
                    Loading
                </Text>
            </Box>
        )
    }
}

export async function getServerSideProps(context){
    try {
        const cookies = nookies.get(context);
        const token = await verifyIdToken(cookies.token);
        const {uid, email} = token;
        return {
            props: {session: `Your email is ${email} and your UID is ${uid}.`},
        };
    } catch (err){
        context.res.writeHead(302, { location: '/login' });
        context.res.end();
        return { props : [] };
    }
}

export default Authenticated;