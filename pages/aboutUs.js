import React,{useState} from 'react';
import Layout from '../components/Container';
import {FormControl, Input, Textarea, useToast, Button, Box} from '@chakra-ui/react'
import emailjs from 'emailjs-com';
import {useRouter} from 'next/router';

const aboutUs = () => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [mobile, setMobile] = useState("");

    const toast = useToast();
    const router = useRouter();

    const UsertoUs = {
        from_name: name,
        from_email: email,
        message: message,
        contact_no: mobile,
    }

    const handleSubmit = () => {
        emailjs.send('service_z6cltgd', 'template_vybe1se', UsertoUs, 'user_2aLKtYP7rnIjbt16dV8lj')
        .then(()=> {
                toast({
                    description: 'Your email has been received, thankyou for reaching out to us',
                    status: 'success',
                    duration: 3000,
                    onClose: true
                })
                    router.push('/')
                
            }
        )
    }

    return(
        <Layout>
        <Box>
            <FormControl isRequired>
                <Input placeholder="email" type="email" id= 'email' onChange={(e) => setEmail(e.target.value)} 
                    
                    aria-describedby='email-helper-text'
                />
            </FormControl>
            <FormControl isRequired>
                <Input placeholder="name" type="name" id= 'name' onChange={(e) => setName(e.target.value)} 
                    
                    aria-describedby='name-helper-text'
                />
            </FormControl>
            <FormControl isRequired>
                <Textarea placeholder="message"  id= 'message' onChange={(e) => setMessage(e.target.value)} 
                    aria-describedby='message-helper-text'
                />
            </FormControl>
            <Input
                  placeholder="Mobile Number"
                  onChange={(e) => setMobile(e.target.value)}
                    type='text' id='pass' maxLength='10'
                    aria-describedby='mobile-helper-text'
                />
            <Button onClick={handleSubmit}>Submit</Button>
            </Box>
        </Layout>
    )
}

export default aboutUs;