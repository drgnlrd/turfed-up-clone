import { Box, Flex, Text, Container, Button, useColorModeValue } from '@chakra-ui/react';
import Layout from '../components/Container';

const success = () => {
    return (
        <Layout>
        <Box mt={'70px'} >
            <Container maxW={'container.xl'} >
                <Flex my={'auto'} justifyContent={'center'} direction={'column'} alignItems={'center'} textAlign={'center'} >
                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                    <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
                    <Text fontWeight={'700'} fontSize={'3xl'} >Your Order Has Been Placed!</Text>
                    <Text fontWeight={'500'} fontSize={'lg'} >You will receieve your receipt through mail!</Text>
                    <Button
                        as={'a'}
                        href={'/products'}
                        color={'white'}
                        mt={10}
                        bgGradient={'linear(to-r, red.500 ,orange.400)'}
                        _hover={{
                            bgGradient: 'linear(to-r, red.500 ,orange.400)',
                        }}
                    >
                        Enjoy Turfing
                    </Button>
                </Flex>
            </Container>
            
        </Box>
        </Layout>
    )
}

export default success;