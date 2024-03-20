import React from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { useLogin } from "./hook/useLogin"
import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react"

export default function Login() {
    const { handleChange, handleLogin } = useLogin()
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const [isCaptchaVerified, setIsCaptchaVerified] = React.useState(false)

    function onChange(value: any) {
        console.log("Captcha value:", value)
        setIsCaptchaVerified(true)
    }

    return (
        <Box
            mx={"auto"}
            my={"50px"}
            width={"350px"}
        >
            <form>
                <Text fontSize={"2xl"} fontWeight={"bold"} mb={"40px"} borderBottom={"2px solid black"}>
                    Form Login
                </Text>
                <FormControl>
                    <FormLabel>Nama</FormLabel>
                    <Input 
                        type="text"
                        placeholder="Isi dengan nama anda ..." 
                        name="username"
                        onChange={handleChange} 
                    />
                </FormControl>
                <FormControl my={"30px"}>
                    <FormLabel>Password</FormLabel>
                    <InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Isi dengan password anda ...'
                            name="password"
                            onChange={handleChange} 
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <ReCAPTCHA
                    sitekey="6Lf2-IspAAAAAJIubl9W73pW4WM7Zn6HMQHqdgVi"
                    onChange={onChange}
                />
                <Button 
                    backgroundColor={"green"} 
                    color={"white"} 
                    colorScheme="green" 
                    onClick={handleLogin}
                    isDisabled={!isCaptchaVerified}
                >
                    Submit
                </Button>
            </form>
        </Box>
    )
}