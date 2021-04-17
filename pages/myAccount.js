import React,{ useState, useEffect} from 'react';
import nookies from "nookies";
import {verifyIdToken} from '../firebaseAdmin';
import firebaseClient from '../firebaseClient';
import 'firebase/auth';
import firebase from 'firebase';
import 'firebase/firestore';
import {Box, Flex, Text, Heading, Button, Link, FormControl, FormLabel, Input, Avatar} from '@chakra-ui/react';
import Layout from '../components/Container';

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

const myAccount = ({email}) => {

    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");

    const myUser = renderUser(email);

    const handleSubmit = () => {
        var db = firebase.firestore();
        var ref = db.collection('userData');
        myUser.map(res=> {
            ref.doc(res.id).update({
                name: name,
                mobile: mobile,
            }).then(() =>{
                alert('updated');
            })
        })

        
        
    }



    return(
        <Layout>
        <Flex>
        <Box>
            <Text>My Account</Text>
            
                {
                    myUser.map((res, id) =>(
                        <Box key={id}>
                            <Text>Name: {res.name}</Text>
                            <Text>Email: {res.email}</Text>
                            <Text>Mobile: {res.mobile}</Text>
                            <Avatar size='lg' name={res.name} src={'res.avatar'}></Avatar>
                        </Box>
                    ))
                }
            </Box>

            <Box>
                <Text>Change Details:</Text>
                {
                    myUser.map((res, id) =>(
                        <Box key={id}>
                        <FormControl isRequired>
                    <FormLabel htmlFor='email'> Email Address</FormLabel>
                    <Input width={'300px'} disabled
                    //  onChange={(e) => setEmail(e.target.value)}
                    type='email' id='emailAddress' value={res.email}
                    aria-describedby='email-helper-text' />
                    </FormControl>
                    <FormControl isRequired>
                    <FormLabel htmlFor='name'> Name</FormLabel>
                    <Input placeholder={res.name}
                    onChange={(e) => setName(e.target.value)}
                    type='input' id='name' 
                    value={name}
                    aria-describedby='name-helper-text' />
                    </FormControl>
                    <FormControl isRequired>
                    <FormLabel htmlFor='mobile'> Mobile Number</FormLabel>
                    <Input 
                    onChange={(e) => setMobile(e.target.value)}
                    type='text' id='pass' value={mobile} placeholder={res.mobile}
                    aria-describedby='mobile-helper-text' />
                </FormControl>
                    <Button onClick={handleSubmit} disabled={mobile === '' || name === ''}>
                        Update
                    </Button>
                    </Box>
                    
                    ))
                }
            </Box>
        </Flex>
        </Layout>
    )
}

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

export default myAccount;