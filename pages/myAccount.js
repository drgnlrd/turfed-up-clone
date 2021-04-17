import React,{ useState, useEffect} from 'react';
import nookies from "nookies";
import {verifyIdToken} from '../firebaseAdmin';
import firebaseClient from '../firebaseClient';
import 'firebase/auth';
import firebase from 'firebase';
import 'firebase/firestore';
import {Box, Flex, Text, Heading, Button, Link, FormControl, FormLabel, Input, Avatar, 
    AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody,
    AlertDialogFooter, useDisclosure, Select} from '@chakra-ui/react';
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
    var db = firebase.firestore();
    const handleSubmit = () => {
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
                <FormControl isRequired>
                </FormControl>

                    <Button onClick={handleSubmit} disabled={mobile === '' || name === ''}>
                        Update
                    </Button>
                    </Box>
                    
                    ))
                }
                <Button onClick={onOpen}>
                    Delete Account
                </Button>
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