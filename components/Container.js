import React from 'react';
import {Flex} from '@chakra-ui/react';
import firebase from 'firebase';
import {useAuth} from '../auth';
import {useRouter} from 'next/router';

export default function Container ({children}){

    const { user } = useAuth();
    const router = useRouter();
    

    firebase.auth().onAuthStateChanged((user) => {
        if(!user){
          router.push('/login');
        }
      })

    return(
        <>
            <Flex as='main' justifyContent='center' flexDirection='column' px={8}>
                {children}
            </Flex>
        </>
    );
}
