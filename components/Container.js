import React from 'react';
import {Flex, Box, useColorModeValue} from '@chakra-ui/react';
import firebase from 'firebase';
import {useAuth} from '../auth';
import {useRouter} from 'next/router';
import WithSubnavigation from './Nav';
import Head from 'next/head';

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
            <Head>
                <meta charset='utf-8' />
                <meta http-equiv='X-UA-Compatible' content='IE=edge' />
                <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
                <meta name='description' content='Description' />
                <title>Turfed Up!</title>
                <link rel="manifest" href="/manifest.json" />
                <link href='/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
                <link href='/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>
                <meta name="theme-color" content="#317EFB"/>
            </Head>
            <WithSubnavigation />
            <Flex as='main' className={'glass'} bg={useColorModeValue('rgba( 255, 255, 255, 0.85 );','rgba( 0, 0, 0, 0.85 );')} minH={'100vh'} pt={'60px'} justifyContent='center' flexDirection='column'>
                {children}
            </Flex>
        </Box>
    );
}
