import React,{ useState, useEffect} from 'react';
import nookies from "nookies";
import {verifyIdToken} from '../firebaseAdmin';
import firebaseClient from '../firebaseClient';
import 'firebase/auth';
import firebase from 'firebase';
import 'firebase/firestore';
import {Box, Flex, Text, Heading, Button, Link} from '@chakra-ui/react';
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

const myBookings = ({email}) => {
    
    const turf = renderTurf(email);
    turf.map(res => {
        console.log(res.bookings);
        res.bookings.map(booking => {
            console.log(booking);
        })
    })
    
    console.log(turf);

    return (
        <Layout>
        <Flex>
            <Box w={600} p={4} my={12} mx='auto'>
                <Text>Your bookings:</Text>
                {/* {
                    link.map((booking, id) => (
                        <Box key={id}>
                            <Text>{booking.date}</Text>
                            <Text>{booking.turfId}</Text>
                        </Box>
                    ))
                } */}

                {
                    turf.map((item, id) => (
                        <Box key={id}>
                            {
                                item.bookings.map((res,id) => (
                                    <Box key={id}>
                                    <Text>{res.date}</Text>
                                    <Text> {res.turfName} </Text>
                                    <Text> {res.timings} </Text>
                                    </Box>
                                ))
                            }
                        </Box>
                    )) 
                }

            </Box>
        </Flex>
        </Layout>
    )

}

export async function getServerSideProps(context){
    // try {
        
        const cookies = nookies.get(context);
        const token = await verifyIdToken(cookies.token);
        const {email} = token;
        // const link = {}
        // const db = firebase.firestore();

        // db.collection('userData').where('email','==',email).onSnapshot((snapshot) => {
        //     const newUsers = snapshot.docs.map((doc) => ({
        //         id:doc.id,
        //     }))
        //     link['url'] = newUsers;
        // })

        // db.collection('userData').doc(link.url).get().then((snapshot) => {
        //     link['users'] = snapshot.data();
        // })
        // if(link.users == undefined) {
        //     return { props: {
        //         link: null
        //     }
        //     }
        // }
        // else{
        return {
            props: {
                email: email,
            }
        };
    // }
    // } 
    // catch (err){
    //     // context.res.writeHead(302, { location: '/login' });
    //     context.res.end();
    //     return { props : [] };
    // }
}

export default myBookings;