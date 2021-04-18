import Layout from '../components/Container';
import {
    SimpleGrid,
    Flex,
    Badge,
    chakra,
    VisuallyHidden,
    Box,
    Input,
    Button,
    InputGroup,
    InputRightElement,
    Image,
    Stack,
    useColorModeValue,
    Text,
    IconButton,
    Icon,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react';

import Carousel from '../components/carousel';

import {
    FaPhoneAlt,
    FaDirections,
    FaShower,
    FaParking,
    FaRestroom
} from 'react-icons/fa'

import {
  IoIosShirt,
  IoMdFootball
} from 'react-icons/io';

import {
  BsConeStriped
} from 'react-icons/bs';

import { 
  GrRestroom
} from 'react-icons/gr'

import moment from 'moment';
import DatePicker from 'react-datepicker';
const KuttyHero = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
     <Layout> 
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      spacing={0}
      _after={{
        bg: "brand.500",
        opacity: 0.25,
        pos: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: -1,
        content: '" "',
      }}
    >
    <Box
      bg={'url("https://images.unsplash.com/photo-1531548731165-c6ae86ff6491?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80") no-repeat'}
      bgSize={'cover'}
      bgPosition={'center'}
      h={'60vh'}
      display={{base: 'block', md: 'none'}}
      rounded={'0 0 30px 30px'}
      position={'relative'}
      onClick={onOpen}
    >
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Carousel />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Box alignSelf={'end'} w={'full'} minH={'120px'} bg={useColorModeValue('rgba( 255,255,255, 0.55 )','rgba( 0,0,0, 0.5)')} rounded={'30px'} pos={'absolute'} bottom={0} className={'glass'} px={3} py={5} >
          <Flex justify={'space-between'} >
              <Box>
                <Text fontSize={'2xl'} fontWeight={'700'} >Name Of Turf</Text>
                <Text>Location Of Turf</Text>
              </Box>
              <Box>
                  <Stack gap={5} direction={'row'} mb={2}>
                      <IconButton bg={useColorModeValue('rgba( 255,255,255, 0.2 )','rgba( 0,0,0, 0.8)')}  icon={<Icon as={FaPhoneAlt} w={6} h={6} />}  />
                      <IconButton bg={useColorModeValue('rgba( 255,255,255, 0.2 )','rgba( 0,0,0, 0.8)')} icon={<Icon as={FaDirections} w={6} h={6} /> }   />
                  </Stack>
                  <Badge rounded={'md'} color={'white'} py={1} px={7} bg={'rgba( 58, 107, 5, 0.55 )'}>
                    Open
                  </Badge>
              </Box>
          </Flex>
      </Box>
    
        {/* <Image
          src="https://images.unsplash.com/photo-1531548731165-c6ae86ff6491?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
          alt="3 women looking at a laptop"
          objectFit="cover"
          w="full"
          h={{ base: '60vh', md: "full" }}
          bg="gray.100"
          loading="lazy"
        /> */}
      </Box>
      <Flex
        direction="column"
        alignItems="start"
        justifyContent="center"
        px={{ base: 4, lg: 20 }}
        py={[10,24]}
      >
      <SimpleGrid columns={2} spacing={3} w={'100%'}>
          <Badge bg={'rgba(150,34,40,0.2)'} w={'full'} border={'1px solid'} borderColor={useColorModeValue('rgba(255,255,255,0.7)','rgba(0,0,0,0.6)')} rounded={'10px'} height="60px">
            <Flex justify={'center'} textAlign={'center'} alignItems={'center'} direction={'row'} h={'100%'}>
              <Icon as={IoIosShirt} w={6} h={6} mr={3} />
              <Text>Bibs</Text>
            </Flex>
          </Badge>
          <Badge bg={'rgba(150,34,40,0.2)'} w={'full'} border={'1px solid'} borderColor={useColorModeValue('rgba(255,255,255,0.7)','rgba(0,0,0,0.6)')} rounded={'10px'} height="60px">
            <Flex justify={'center'} textAlign={'center'} alignItems={'center'} direction={'row'} h={'100%'}>
              <Icon as={FaShower} w={6} h={6} mr={3} />
              <Text>Shower</Text>
            </Flex>
          </Badge>
          <Badge bg={'rgba(150,34,40,0.2)'} w={'full'} border={'1px solid'} borderColor={useColorModeValue('rgba(255,255,255,0.7)','rgba(0,0,0,0.6)')} rounded={'10px'} height="60px">
            <Flex justify={'center'} textAlign={'center'} alignItems={'center'} h={'100%'}>
              <Icon as={IoMdFootball} w={6} h={6} mr={3} />
              <Text>Football</Text>
            </Flex>
          </Badge>
          <Badge bg={'rgba(150,34,40,0.2)'} w={'full'} border={'1px solid'} borderColor={useColorModeValue('rgba(255,255,255,0.7)','rgba(0,0,0,0.6)')} rounded={'10px'} height="60px">
            <Flex justify={'center'} textAlign={'center'} alignItems={'center'} h={'100%'}>
              <Icon as={FaParking} w={6} h={6} mr={3} />
              <Text>Parking</Text>
            </Flex>
          </Badge>
          <Badge bg={'rgba(150,34,40,0.2)'} w={'full'} border={'1px solid'} borderColor={useColorModeValue('rgba(255,255,255,0.7)','rgba(0,0,0,0.6)')} rounded={'10px'} height="60px">
            <Flex justify={'center'} textAlign={'center'} alignItems={'center'} h={'100%'}>
              <Icon as={BsConeStriped} w={6} h={6} mr={3} />
              <Text>Stumps</Text>
            </Flex>
          </Badge>
          <Badge bg={'rgba(150,34,40,0.7)'} w={'full'} border={'1px solid'} borderColor={useColorModeValue('rgba(255,255,255,0.7)','rgba(0,0,0,0.6)')} rounded={'10px'} height="60px"
          boxShadow={'0px 0px 40px 0px rgba(150,34,40,0.6)'} color={'white'}>
            <Flex justify={'center'} textAlign={'center'} alignItems={'center'} direction={'row'} h={'100%'}>
              <Icon color="white" as={FaRestroom} w={6} h={6} mr={3} />
              <Text>Washroom</Text>
            </Flex>
          </Badge>
          
          
      </SimpleGrid>
      
      <Input 
        as={DatePicker} 
        id={"date"} 
        minDate={new Date()} 
        maxDate={moment().add(15, 'days')._d}  
        size="lg"
        color="gray.900"
        placeholder="Select Date."
        bg="white"/>
        
        <chakra.h1
          mb={6}
          fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}
          fontWeight="bold"
          color={useColorModeValue("brand.600", "gray.300")}
          lineHeight="shorter"
        >
          Great customer relationships start here.
        </chakra.h1>
        <chakra.form w="full" mb={6}>
          <VisuallyHidden>Your Email</VisuallyHidden>
          <Box display={{ base: "block", lg: "none" }}>
            <Input
              size="lg"
              color="brand.900"
              type="email"
              placeholder="Enter your email..."
              bg="white"
              required="true"
            />
            <Button
              w="full"
              mt={2}
              color="white"
              variant="solid"
              colorScheme="brand"
              size="lg"
              type="submit"
            >
              Get Started
            </Button>
          </Box>
          <InputGroup size="lg" w="full" display={{ base: "none", lg: "flex" }}>
            <Input
              size="lg"
              color="brand.900"
              type="email"
              placeholder="Enter your email..."
              bg="white"
              required="true"
            />
            <InputRightElement w="auto">
              <Button
                color="white"
                variant="solid"
                colorScheme="brand"
                size="lg"
                type="submit"
                roundedLeft={0}
              >
                Get Started
              </Button>
            </InputRightElement>
          </InputGroup>
        </chakra.form>
        <chakra.p
          pr={{ base: 0, lg: 16 }}
          mb={4}
          fontSize="sm"
          color={useColorModeValue("brand.600", "gray.400")}
          letterSpacing="wider"
        >
          Get the #1 Business Messenger and start delivering personalized
          experiences at every stage of the customer journey.
        </chakra.p>
      </Flex>
      
    </SimpleGrid>
    </Layout>
  );
};

export default KuttyHero;