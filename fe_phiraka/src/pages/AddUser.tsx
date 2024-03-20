import React from "react"
import { useAddUser } from "./hook/useAddUser"
import { FormControl, FormLabel, Input, Button, Box, Text, InputGroup, InputRightElement } from "@chakra-ui/react"

export default function AddUser() {
    const { form, handleChange, handleAdd } = useAddUser()
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    return (
        <Box
            mx={"auto"}
            my={"50px"}
            width={"80vw"}
        >
            <form>
                <Text fontSize={"2xl"} fontWeight={"bold"} mb={"40px"} borderBottom={"2px solid black"}>
                    Form Penambahan User
                </Text>
                <FormControl width={"350px"}>
                    <FormLabel>Nama</FormLabel>
                    <Input 
                        type="text"
                        placeholder="Isi dengan nama ..." 
                        name="username"
                        onChange={handleChange} 
                        value={form.username}
                    />
                </FormControl>
                <FormControl my={"30px"} width={"350px"}>
                    <FormLabel>Password</FormLabel>
                    <InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Isi dengan password ...'
                            name="password"
                            onChange={handleChange} 
                            value={form.password}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <Button 
                    backgroundColor={"green"} 
                    color={"white"} 
                    colorScheme="green" 
                    onClick={handleAdd}
                >
                    Submit
                </Button>
            </form>
        </Box>
    )
}