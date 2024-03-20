import React from "react"
import { AUTH_LOGOUT } from "@/store/rootReducer"
import { useDispatch } from 'react-redux'
import { API } from "@/libs/api"
import { IUserForm, IUserSearch } from "@/types/user"
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Input, InputGroup, InputLeftElement, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import { IoSearch } from "react-icons/io5"

export default function Home() {
    const session = JSON.parse(localStorage.user)
    const dispatch = useDispatch()
    const [user, setUser] = React.useState<IUserForm | null>(null)
    const [users, setUsers] = React.useState<IUserSearch[]>([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedUserId, setSelectedUserId] = React.useState<number | null>(null)
    const cancelRef = React.useRef<HTMLButtonElement | null>(null)

    function logout() {
        dispatch(AUTH_LOGOUT())
        window.location.reload()
    }

    function navToFibonacci() {
        window.location.href = '/fibonacci'
    }

    function navToEditUser(id: number) {
        window.location.href = `/edit_user/${id}`
    }

    function navToAddUser() {
        window.location.href = `/add_user`
    }

    async function getUser() {
        try {
            const response = await API.get(`/user/${session.id}`)
            console.log(response.data)
            setUser(response.data.data)
        } catch(err) {
            console.log(err)
        }
    }

    async function getUsers() {
        try {
            const response = await API.get(`/users`)
            console.log(response.data)
            setUsers(response.data.data)
        } catch(err) {
            console.log(err)
        }
    }

    async function searchUser(key: string) {
        try {
            const response = await API.get(`/search/${key}`)
            console.log(response.data)
            setUsers(response.data.data)
        } catch(err) {
            console.log(err)
        }
    }

    async function deleteUser(id: number) {
        try {
            const response = await API.delete(`/deleteUser/${id}`)
            window.location.reload()
            console.log(response.data)
        } catch(err) {
            console.log(err)
        }
    }

    React.useEffect(() => {
        getUser()
        getUsers()
    }, [])

    return (
        <Box
            mx={"auto"}
            my={"50px"}
            width={"80vw"}
        >
            <Text fontSize={"2xl"} fontWeight={"bold"} mb={"20px"} borderBottom={"2px solid black"}>
                Daftar User
            </Text>
            <Text fontSize='lg' mb={"10px"}>Halo, @{user?.username} Selamat Datang di Phiraka</Text>
            <Box display={"flex"}>
                <Button colorScheme='green' size='md' mr={"10px"} mb={"20px"} onClick={navToAddUser}>Tambah User</Button>
                <InputGroup width={"300px"}>
                    <InputLeftElement pointerEvents='none'>
                        <IoSearch color='gray.300'/>
                    </InputLeftElement>
                    <Input type='text' placeholder='Cari user ...' onChange={(e) => searchUser(e.target.value)} />
                </InputGroup>
            </Box>
            <Button colorScheme='green' size='md' mr={"10px"} mb={"20px"} onClick={navToFibonacci}>Fibonacci</Button>
            <Button colorScheme='red' size='md' mb={"20px"} onClick={logout}>Logout</Button>
            <TableContainer>
                <Table variant='simple'>
                    <TableCaption>Data User</TableCaption>
                    <Thead>
                        <Tr>
                            <Th isNumeric>No</Th>
                            <Th>Nama</Th>
                            <Th>Password</Th>
                            <Th>Dibuat pada</Th>
                            <Th>Terakhir Diupdate</Th>
                            <Th>Aksi</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                    {users.map((user, index) => (
                    <Tr key={index}>
                    <Td isNumeric>{index + 1}</Td>
                    <Td>{user.username}</Td>
                    <Td>{user.password}</Td>
                    <Td>{user.created_at}</Td>
                    <Td>{user.updated_at}</Td>
                    <Td>
                        <Button colorScheme='blue' size='sm' mr={"10px"} onClick={() => navToEditUser(user.id)}>Edit</Button>
                        |
                        <Button colorScheme='red' size='sm' ml={"10px"} onClick={() => {
                      setSelectedUserId(user.id);
                      onOpen();
                    }}>Delete</Button>
                        <AlertDialog
                        isOpen={isOpen && selectedUserId === user.id}
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                        >
                        <AlertDialogOverlay>
                            <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                Delete User
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                Apakah kamu yakin? ingin menghapus data {user.username}
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                                </Button>
                                <Button colorScheme='red' onClick={() => deleteUser(user.id)} ml={3}>
                                Delete
                                </Button>
                            </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                        </AlertDialog>
                    </Td>
                    </Tr>
                ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}