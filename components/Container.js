import React from 'react';
import {Flex} from '@chakra-ui/react';
import firebase from 'firebase';
import {useAuth} from '../auth';
import {useRouter} from 'next/router';
import WithSubnavigation from './Nav';

export default function Layout ({children}){

    const { user } = useAuth();
    const router = useRouter();
    

    firebase.auth().onAuthStateChanged((user) => {
        if(!user){
          router.push('/login');
        }
      })

    return(
        <>
            <WithSubnavigation />
            <Flex as='main' mt={'70px'} justifyContent='center' flexDirection='column'>
                {children}
            </Flex>
        </>
    );
}
