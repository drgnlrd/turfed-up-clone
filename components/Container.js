import React from 'react';
import {Flex, Box, useColorModeValue} from '@chakra-ui/react';
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
        <Box className={'main-bg'}>
            <WithSubnavigation />
            <Flex as='main' className={'glass'} bg={useColorModeValue('rgba( 255, 255, 255, 0.85 );','rgba( 0, 0, 0, 0.85 );')} minH={'100vh'} pt={'60px'} justifyContent='center' flexDirection='column'>
                {children}
            </Flex>
        </Box>
    );
}
