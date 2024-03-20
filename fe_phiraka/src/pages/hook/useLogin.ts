import React from "react"
import { useNavigate } from "react-router-dom"
import { API } from "@/libs/api"
import { IUserForm } from "@/types/user"
import { useDispatch } from "react-redux"
import { AUTH_LOGIN } from "@/store/rootReducer"
import { useToast } from '@chakra-ui/react'

export function useLogin() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toast = useToast()

  const [form, setForm] = React.useState<IUserForm>({
    username: "",
    password: ""
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  async function handleLogin() {
    try {
      const response = await API.post('/auth/login', form)
      
      dispatch(AUTH_LOGIN(response.data))
      navigate("/")
      toast({
        title: 'Berhasil.',
        description: 'LOGIN SUKSES',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Gagal.',
        description: 'LOGIN GAGAL',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return {
    handleChange,
    handleLogin
  }
}