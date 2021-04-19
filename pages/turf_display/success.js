import { Flex, Button, Box, Text } from '@chakra-ui/react';
import Link from 'next/link';

const success = () => {
    return (
        <Flex>
        <Text>
            Success!!!!
        </Text>
        <Link href='/'>
            <Button as='a'>
                Back to Home
            </Button>
        </Link>
        </Flex>

    )
}

export default success;