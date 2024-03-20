import React from "react"
import { useParams } from "react-router-dom"
import { API } from "@/libs/api"
import { IUserForm } from "@/types/user"
import { useEditUser } from "./hook/useEditUser"
import { FormControl, FormLabel, Input, Button, Box, Text, InputGroup, InputRightElement } from "@chakra-ui/react"

export default function EditUser() {
    const { form, handleChange, handleEdit } = useEditUser()
    const { id } = useParams()
    const [user, setUser] = React.useState<IUserForm | null>(null)
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    async function getUser() {
        try {
            const response = await API.get(`/user/${id}`)
            console.log(response.data)
            setUser(response.data.data)
        } catch(err) {
            console.log(err)
        }
    }

    React.useEffect(() => {
        getUser()
    }, [])

    return (
        <Box
            mx={"auto"}
            my={"50px"}
            width={"80vw"}
        >
            <form>
                <Text fontSize={"2xl"} fontWeight={"bold"} mb={"40px"} borderBottom={"2px solid black"}>
                    Form Perubahan User
                </Text>
                <FormControl width={"350px"}>
                    <FormLabel>Nama</FormLabel>
                    <Input 
                        type="text"
                        placeholder="Isi dengan nama ..." 
                        name="username"
                        onChange={handleChange} 
                        value={form.username !== "" ? form.username : (user?.username || "")}
                    />
                </FormControl>
                <FormControl my={"30px"} width={"350px"}>
                    <FormLabel>Password</FormLabel>
                    <InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Isi dengan password anda ...'
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
                    onClick={() => handleEdit(Number(id))}
                >
                    Submit
                </Button>
            </form>
        </Box>
    )
}